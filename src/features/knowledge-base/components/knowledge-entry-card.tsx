import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Menu } from 'lucide-react';
import { KnowledgeEntry } from '@/lib/database';

interface KnowledgeEntryCardProps {
  entry: KnowledgeEntry;
  onEdit: (id: string) => void;
}

export const KnowledgeEntryCard = ({
  entry,
  onEdit,
}: KnowledgeEntryCardProps) => {
  return (
    <div className="rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {entry.title}
          </h2>

          {/* Category */}
          <div className="mt-3">
            <Badge>
              {entry.category}
            </Badge>
          </div>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded bg-muted px-2 py-1 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <p className="mt-3 text-xs text-muted-foreground">
            Created: {new Date(entry.createdAt).toLocaleDateString()}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Actions"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onEdit(entry.id)}
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
};