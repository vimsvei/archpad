/**
 * Parser for Draw.io (.drawio) XML files with ArchiMate shapes.
 * Extracts elements and edges for import into repository.
 */

export type DrawIoElementType = 'component' | 'function' | 'data' | 'software';

export type DrawIoParsedElement = {
  id: string;
  type: DrawIoElementType;
  name: string;
  description?: string;
  /** Items when type is data/software and value had comma-separated list (each becomes separate element) */
  items?: string[];
  /** Bounding box for containment detection */
  x: number;
  y: number;
  width: number;
  height: number;
  parentId?: string;
};

export type DrawIoParsedEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  /** Label on edge if any */
  label?: string;
};

export type DrawIoParsedModel = {
  elements: DrawIoParsedElement[];
  edges: DrawIoParsedEdge[];
};

function getStyleProp(style: string, key: string): string | undefined {
  const re = new RegExp(`${key}=([^;]+)`, 'i');
  const m = style.match(re);
  return m ? m[1].trim() : undefined;
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function parseValueToNameAndDescription(value: string): { name: string; description?: string } {
  const text = stripHtml(value);
  const lines = text.split(/\n/).map((s) => s.trim()).filter(Boolean);
  const name = lines[0] ?? '';
  const description = lines.slice(1).join('\n') || undefined;
  return { name, description };
}

/** Split by comma for data/software blocks; trim each. Returns array of items. */
function splitCommaSeparated(text: string): string[] {
  return text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseGeometry(match: RegExpMatchArray | null): { x: number; y: number; width: number; height: number } {
  const attr = match?.[1] ?? '';
  const x = parseFloat(attr.match(/x="([^"]*)"/)?.[1] ?? '0') || 0;
  const y = parseFloat(attr.match(/y="([^"]*)"/)?.[1] ?? '0') || 0;
  const w = parseFloat(attr.match(/width="([^"]*)"/)?.[1] ?? '0') || 0;
  const h = parseFloat(attr.match(/height="([^"]*)"/)?.[1] ?? '0') || 0;
  return { x, y, width: w, height: h };
}

/** Resolve mxGeometry - can be on mxCell or inside child mxGeometry. */
function extractGeometry(cellXml: string): { x: number; y: number; width: number; height: number } {
  const asAttr = cellXml.match(/<mxGeometry[^>]*\s(x="[^"]*")?\s*(y="[^"]*")?\s*(width="[^"]*")?\s*(height="[^"]*")?/);
  if (asAttr) {
    const all = cellXml.match(/<mxGeometry[^>]*>/)?.[0] ?? '';
    const x = parseFloat(all.match(/x="([^"]*)"/)?.[1] ?? '0') || 0;
    const y = parseFloat(all.match(/y="([^"]*)"/)?.[1] ?? '0') || 0;
    const w = parseFloat(all.match(/width="([^"]*)"/)?.[1] ?? '0') || 0;
    const h = parseFloat(all.match(/height="([^"]*)"/)?.[1] ?? '0') || 0;
    return { x, y, width: w, height: h };
  }
  const child = cellXml.match(/<mxGeometry[^>]*>[\s\S]*?<\/mxGeometry>/);
  const inner = child?.[0] ?? '';
  const geom = inner.match(/<mxGeometry\s+([^>]*)>/);
  const attr = geom?.[1] ?? '';
  const x = parseFloat(attr.match(/x="([^"]*)"/)?.[1] ?? '0') || 0;
  const y = parseFloat(attr.match(/y="([^"]*)"/)?.[1] ?? '0') || 0;
  const w = parseFloat(attr.match(/width="([^"]*)"/)?.[1] ?? '0') || 0;
  const h = parseFloat(attr.match(/height="([^"]*)"/)?.[1] ?? '0') || 0;
  return { x, y, width: w, height: h };
}

export function parseDrawIoXml(xml: string): DrawIoParsedModel {
  const elements: DrawIoParsedElement[] = [];
  const edges: DrawIoParsedEdge[] = [];

  let content = xml;
  if (xml.includes('compressed="1"')) {
    const m = xml.match(/<diagram[^>]*>([^<]+)<\/diagram>/);
    if (m?.[1]) {
      try {
        const decoded = Buffer.from(m[1], 'base64').toString('utf8');
        content = decoded.includes('mxGraphModel') ? decoded : xml;
      } catch {
        content = xml;
      }
    }
  }

  const mxCellRe = /<mxCell\s+id="([^"]+)"([^>]*)>([\s\S]*?)<\/mxCell>/g;
  let cell: RegExpExecArray | null;
  const cellsById = new Map<string, { style?: string; value?: string; parentId?: string; geo: ReturnType<typeof extractGeometry> }>();

  while ((cell = mxCellRe.exec(content)) !== null) {
    const id = cell[1];
    const attrs = cell[2];
    const inner = cell[3];
    const style = attrs.match(/style="([^"]*)"/)?.[1] ?? '';
    const value = attrs.match(/value="([^"]*)"/)?.[1] ?? inner.match(/value="([^"]*)"/)?.[1];
    const parentId = attrs.match(/parent="([^"]+)"/)?.[1];
    const edge = attrs.includes('edge="1"');
    const vertex = attrs.includes('vertex="1"');

    if (edge) {
      const sourceId = attrs.match(/source="([^"]+)"/)?.[1];
      const targetId = attrs.match(/target="([^"]+)"/)?.[1];
      if (sourceId && targetId) {
        const labelMatch = inner.match(/<mxGeometry[^>]*>[\s\S]*?<mxCell[^>]*value="([^"]*)"[^>]*>/);
        edges.push({
          id,
          sourceId,
          targetId,
          label: labelMatch?.[1] ? stripHtml(labelMatch[1]) : undefined,
        });
      }
      continue;
    }

    if (!vertex) continue;

    const hasArchimate = style.includes('mxgraph.archimate3') || style.includes('archimate');
    const appType = getStyleProp(style, 'appType');
    let type: DrawIoElementType | null = null;
    if (appType === 'comp' || appType === 'serv') type = 'component';
    else if (appType === 'func') type = 'function';
    else if (appType === 'data' || style.includes('data') && hasArchimate) type = 'data';
    else if (appType === 'software' || appType === 'soft' || (style.includes('software') && hasArchimate)) type = 'software';
    else if (hasArchimate && (appType === 'comp' || appType === 'serv' || !appType)) type = 'component';

    if (!type) continue;

    const geo = extractGeometry(`<mxCell ${attrs}>${inner}</mxCell>`);
    cellsById.set(id, { style, value, parentId, geo });

    const rawText = value ? stripHtml(value) : '';
    const { name, description } = parseValueToNameAndDescription(value ?? '');

    if (type === 'data' || type === 'software') {
      const parts = splitCommaSeparated(name || rawText);
      if (parts.length > 1) {
        for (const part of parts) {
          elements.push({
            id: `${id}:${part}`,
            type,
            name: part.trim(),
            description,
            ...geo,
            parentId,
          });
        }
        continue;
      }
    }

    if (!name && !rawText) continue;

    elements.push({
      id,
      type,
      name: name || rawText || id,
      description,
      ...geo,
      parentId,
    });
  }

  const withGeo = elements.map((el) => ({
    ...el,
    ...cellsById.get(el.id.includes(':') ? el.id.split(':')[0] : el.id)?.geo,
  }));

  const byId = new Map<string, DrawIoParsedElement>();
  for (const el of withGeo) {
    byId.set(el.id, el);
  }

  const componentsForContainment = withGeo.filter((e) => e.type === 'component');
  const sortedComponents = [...componentsForContainment].sort(
    (a, b) => b.width * b.height - a.width * a.height,
  );

  for (const child of withGeo) {
    if (child.type === 'component') {
      if (child.parentId && byId.has(child.parentId)) continue;
      const container = sortedComponents.find(
        (p) =>
          p.id !== child.id &&
          p.x <= child.x &&
          p.y <= child.y &&
          p.x + p.width >= child.x + child.width &&
          p.y + p.height >= child.y + child.height,
      );
      if (container) child.parentId = container.id;
    } else if (child.type === 'function' || child.type === 'data' || child.type === 'software') {
      const container = sortedComponents.find(
        (p) =>
          p.x <= child.x &&
          p.y <= child.y &&
          p.x + p.width >= child.x + child.width &&
          p.y + p.height >= child.y + child.height,
      );
      if (container) child.parentId = container.id;
    }
  }

  return {
    elements: withGeo,
    edges,
  };
}
