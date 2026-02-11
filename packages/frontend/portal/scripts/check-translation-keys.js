#!/usr/bin/env node
/**
 * Check that all translation keys used in the portal code exist in message files.
 * Extracts t("key") and t('key') from src, flattens JSON messages, reports missing keys.
 */
const fs = require('fs');
const path = require('path');

const PORTAL_ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(PORTAL_ROOT, 'src');
const MESSAGES_DIR = path.join(PORTAL_ROOT, 'messages');

// Known dynamic keys (from configs, not literal strings - we add their possible values)
const DYNAMIC_KEYS = [
  // From sheet-configs tableKey
  'technologies.system-software',
  'application.data-objects',
  'hierarchy.parent',
  'hierarchy.children',
  'application.functions',
  'application.interfaces',
  'application.events',
  'technologies.nodes',
  'technologies.networks',
  'relation.flows',
  'application.components',
  'solution.solutions',
  // From component-detail-v3 index layers
  'tab.business',
  'tab.business.actors',
  'tab.business.processes',
  'tab.business.roles',
  'tab.application',
  'tab.functions',
  'tab.interfaces',
  'tab.events',
  'tab.data-objects',
  'tab.technology',
  'tab.technology.system-software',
  'tab.technology.nodes',
  'tab.technology.networks',
  // Dynamic: table.component.${key}.no-results (key = children|data-objects|events|flows|functions|interfaces|networks|nodes|parents|stakeholders|system-software)
  'table.component.children.no-results',
  'table.component.children.no-results.description',
  'table.component.data-objects.no-results',
  'table.component.data-objects.no-results.description',
  'table.component.events.no-results',
  'table.component.events.no-results.description',
  'table.component.flows.no-results',
  'table.component.flows.no-results.description',
  'table.component.functions.no-results',
  'table.component.functions.no-results.description',
  'table.component.interfaces.no-results',
  'table.component.interfaces.no-results.description',
  'table.component.networks.no-results',
  'table.component.networks.no-results.description',
  'table.component.nodes.no-results',
  'table.component.nodes.no-results.description',
  'table.component.parents.no-results',
  'table.component.parents.no-results.description',
  'table.component.stakeholders.no-results',
  'table.component.stakeholders.no-results.description',
  'table.component.system-software.no-results',
  'table.component.system-software.no-results.description',
];

// Directory kind slugs -> titleKey = directory.${kind} from contract
const DIRECTORY_KINDS = [
  'directory.node.type',
  'directory.license.type',
  'directory.protocol.type',
  'directory.software.type',
  'directory.security.zone',
  'directory.critical.level',
  'directory.component.state',
  'directory.stakeholder.role',
  'directory.architecture.style',
  'directory.failure.handling',
  'directory.failover.type',
  'directory.recovery.time',
  'directory.redundancy.type',
  'directory.monitoring.level',
  'directory.scaling.type',
];

function flattenObject(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      Object.assign(result, flattenObject(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

// Valid translation keys: contain a dot (namespace.key) or known prefixes
function isValidKey(key) {
  if (typeof key !== 'string' || key.length < 3) return false;
  if (key.includes('${') || key.includes('`')) return false;
  // Reject paths, imports, etc
  if (key.startsWith('/') || key.startsWith('@/') || key.startsWith('.')) return false;
  if (/^[a-z]{2}-[A-Z]{2}$/.test(key)) return false; // locale like en-US
  if (/^[;#?=@\-\s\n\t\\]/.test(key)) return false;
  if (key.includes('node_modules') || key.includes('import')) return false;
  // Must look like a namespaced key
  return key.includes('.') || /^(action|tab|table|directory|auth|flow|profile|nav|upload|repository|form|error|item|application|solution|technologies|hierarchy|relation|search|select|sheet|description)\./.test(key);
}

function extractKeysFromSource(dir) {
  const keys = new Set();
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const fullPath = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name !== 'node_modules' && f.name !== '.next') {
        extractKeysFromSource(fullPath).forEach((k) => keys.add(k));
      }
    } else if (/\.(tsx?|jsx?)$/.test(f.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const re = /t\s*\(\s*["']([^"']+)["']/g;
      let m;
      while ((m = re.exec(content)) !== null) {
        const key = m[1];
        if (isValidKey(key)) keys.add(key);
      }
    }
  }
  return keys;
}

function main() {
  const enPath = path.join(MESSAGES_DIR, 'en.json');
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const enKeys = new Set(Object.keys(flattenObject(en)));

  const codeKeys = extractKeysFromSource(SRC_DIR);
  DYNAMIC_KEYS.forEach((k) => codeKeys.add(k));
  DIRECTORY_KINDS.forEach((k) => codeKeys.add(k));

  const missingEn = [];
  for (const key of codeKeys) {
    if (!enKeys.has(key)) {
      missingEn.push(key);
    }
  }
  missingEn.sort();
  if (missingEn.length > 0) {
    console.error('Missing in en.json:\n');
    missingEn.forEach((k) => console.error('  -', k));
    process.exit(1);
  }

  const locales = ['ru-RU', 'es-ES', 'sr'];
  let hasErrors = false;
  for (const loc of locales) {
    const locPath = path.join(MESSAGES_DIR, `${loc}.json`);
    const data = JSON.parse(fs.readFileSync(locPath, 'utf8'));
    const locKeys = new Set(Object.keys(flattenObject(data)));
    const missing = [];
    for (const key of enKeys) {
      if (codeKeys.has(key) && !locKeys.has(key)) {
        missing.push(key);
      }
    }
    if (missing.length > 0) {
      hasErrors = true;
      console.error(`\nMissing in ${loc}.json (${missing.length}):`);
      missing.sort().forEach((k) => console.error('  -', k));
    }
  }
  if (hasErrors) process.exit(1);
  console.log('All translation keys have values in en.json, ru-RU.json, es-ES.json, sr.json');
}

main();
