import { Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import type { RelatedItem } from '@/@types/application-component';

type RelatedItemsListProps = {
  title: string;
  items: RelatedItem[];
  emptyMessage?: string;
  onAdd?: () => void;
  showBadges?: boolean;
};

export function RelatedItemsList({ title, items, emptyMessage = 'No items', onAdd, showBadges = false }: RelatedItemsListProps) {
  return (
    <div className="border border-border/50 rounded-lg overflow-hidden bg-card/30">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          <Badge variant="secondary" className="text-xs">
            {items.length}
          </Badge>
        </div>
        {onAdd && (
          <Button variant="ghost" size="sm" onClick={onAdd} className="h-7 text-xs">
            <Plus className="size-3 mr-1" />
            Add
          </Button>
        )}
      </div>

      {/* List */}
      <div className="divide-y divide-border/30">
        {items.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground italic">
            {emptyMessage}
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 hover:bg-accent/10 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm truncate">
                      {item.name}
                    </span>
                    <ExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  {item.code && (
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                      {item.code}
                    </p>
                  )}
                </div>
                {showBadges && item.state && (
                  <Badge
                    variant="outline"
                    className="text-xs shrink-0"
                    style={{
                      borderColor: item.state.color,
                      color: item.state.color,
                    }}
                  >
                    {item.state.name}
                  </Badge>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
