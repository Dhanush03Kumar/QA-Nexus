import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { KnowledgeEntryCard } from './components/knowledge-entry-card';
import { knowledgeBaseService } from '@/services/knowledge-base.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { KnowledgeEntryForm } from './components/knowledge-entry-form';
import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';

export const KnowledgeBasePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['knowledge-entries', searchQuery, selectedCategory],
    queryFn: () =>
      knowledgeBaseService.getKnowledgeEntries({
        search: searchQuery,
        category: selectedCategory || undefined,
      }),
  });

  const handleCreateEntry = () => {
    setEditingEntryId(null);
    setShowForm(true);
  };

  const handleEditEntry = (id: string) => {
    setEditingEntryId(id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEntryId(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(e.target.value);
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        Error loading knowledge entries
      </div>
    );
  }

  const entries = data?.entries ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Store and retrieve organizational knowledge, best
            practices, and documentation
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleCreateEntry}>
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search knowledge entries..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Category
          </label>

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="process">Process</option>
            <option value="troubleshooting">Troubleshooting</option>
            <option value="best-practice">Best Practice</option>
            <option value="reference">Reference</option>
          </select>
        </div>

        <div className="flex items-end">
          <span className="text-sm text-muted-foreground">
            {entries.length} entries
          </span>
        </div>
      </div>

      {/* Entries Grid */}
      <div>
        {entries.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-muted-foreground">
              No knowledge entries found. Try adjusting your search
              or filters, or create a new entry.
            </p>

            <Button variant="outline" onClick={handleCreateEntry}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Entry
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <KnowledgeEntryCard
                key={entry.id}
                entry={entry}
                onEdit={handleEditEntry}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-hidden rounded-lg">
            <div className="flex h-full flex-col bg-popover text-popover-foreground shadow-xl ring-1 ring-border">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-muted px-6 py-4">
                <h2 className="text-lg font-semibold">
                  {editingEntryId
                    ? 'Edit Knowledge Entry'
                    : 'New Knowledge Entry'}
                </h2>

                <button
                  onClick={handleCloseForm}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-popover-foreground"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <KnowledgeEntryForm
                  onClose={handleCloseForm}
                  entryId={editingEntryId}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};