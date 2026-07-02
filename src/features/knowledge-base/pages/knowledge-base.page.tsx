import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { KnowledgeEntryCard } from "../components/knowledge-entry-card";
import { Input } from '@/components/ui/input';

export const KnowledgeBasePage = () => {
  // placeholder data for display
  const placeholderEntries = [
    {
      id: '1',
      title: 'Sample Knowledge Entry 1',
      category: 'test-data',
      tags: ['sample', 'example'],
      favorite: false,
      createdAt: new Date(Date.now() - 86400000), // yesterday
      updatedAt: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      title: 'SQL Query Tips',
      category: 'sql-queries',
      tags: ['sql', 'tips'],
      favorite: true,
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      updatedAt: new Date(Date.now() - 86400000), // yesterday
    },
    {
      id: '3',
      title: 'Environment Setup Guide',
      category: 'environment-details',
      tags: ['setup', 'guide'],
      favorite: false,
      createdAt: new Date(Date.now() - 432000000), // 5 days
      updatedAt: new Date(Date.now() - 432000000),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Store and retrieve organizational knowledge, best practices, and documentation
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}} disabled>
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
              defaultValue=""
              readOnly
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Category
          </label>

          <select
            defaultValue=""
            readOnly
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
            {placeholderEntries.length} entries
          </span>
        </div>
      </div>

      {/* Entries Grid */}
      <div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderEntries.map((entry) => (
            <KnowledgeEntryCard
              key={entry.id}
              entry={entry as any}
              onEdit={() => {}} // disabled
            />
          ))}
        </div>
      </div>
    </div>
  );
};