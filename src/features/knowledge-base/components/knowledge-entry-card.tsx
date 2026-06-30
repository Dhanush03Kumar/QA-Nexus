import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Check } from 'lucide-react';
import { Star } from 'lucide-react';
import { Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { KnowledgeEntry } from '@/lib/database';
import { knowledgeBaseService } from '@/services/knowledge-base.service';
import { useToast } from '@/components/ui/toast';
import { useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface KnowledgeEntryCardProps = {
  entry: KnowledgeEntry;
  onEdit: (id: string) => void;
};

export const KnowledgeEntryCard = ({ entry, onEdit }: KnowledgeEntryCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this knowledge entry?')) {
      try {
        await knowledgeBaseService.deleteKnowledgeEntry(entry.id);
        toast({
          title: 'Success',
          description: 'Knowledge entry deleted successfully',
          variant: 'success',
        });
        queryClient.invalidateQueries({ queryKey: ['knowledge-entries'] });
      } catch (error) {
        console.error('Error deleting knowledge entry:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete knowledge entry',
          variant: 'destructive',
        });
      }
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await knowledgeBaseService.toggleFavorite(entry.id);
      queryClient.invalidateQueries({ queryKey: ['knowledge-entries'] });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: 'Error',
        description: 'Failed to update favorite status',
        variant: 'destructive',
      });
    }
  };

  const getCategoryBadgeVariant = (category: string): 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' => {
    switch (category?.toLowerCase()) {
      case 'process': return 'secondary';
      case 'troubleshooting': return 'destructive';
      case 'best-practice': return 'success';
      case 'reference': return 'outline';
      case 'general': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="border border-muted rounded-lg p-6 hover:border-muted-hover transition-colors">
      <div className="flex items-start justify-between space-x-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline">
            <h2 className="text-lg font-semibold text-foreground">{entry.title}</h2>
            <div className="ml-2 flex items-center space-x-2">
              {entry.favorite && (
                <button
                  onClick={handleToggleFavorite}
                  className="p-1 text-warning hover:text-warning/80 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <Star className="h-4 w-4" />
                </button>
              )}
              {!entry.favorite && (
                <button
                  onClick={handleToggleFavorite}
                  className="p-1 text-muted-foreground hover:text-muted-foreground/80 transition-colors"
                  aria-label="Add to favorites"
                >
                  <Star className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {entry.summary && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{entry.summary}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {entry.category && (
              <Badge variant={getCategoryBadgeVariant(entry.category)} size="sm">
                {entry.category}
              </Badge>
            )}

            {entry.tags?.map((tag, index) => (
              <span key={index} className="bg-muted px-2 py-0.5 text-xs rounded">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-2 text-xs text-muted-foreground">
            Updated {formatDistanceToNow(new Date(entry.updatedAt), { addSuffix: true })}
          </div>
        </div>

        <div className="flex items-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Actions">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(entry.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};