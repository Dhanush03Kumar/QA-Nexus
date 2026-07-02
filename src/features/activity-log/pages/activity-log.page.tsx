import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const placeholderActivities = [
  {
    id: '1',
    action: 'Task Created',
    entityType: 'task',
    entityId: 'T-1001',
    entityTitle: 'Fix login page Safari issue',
    timestamp: new Date(Date.now() - 86400000), // yesterday
  },
  {
    id: '2',
    action: 'Task Updated',
    entityType: 'task',
    entityId: 'T-1002',
    entityTitle: 'Update test cases for release v2.3',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: '3',
    action: 'Knowledge Entry Created',
    entityType: 'knowledge-entry',
    entityId: 'K-2001',
    entityTitle: 'How to handle flaky tests',
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: '4',
    action: 'Defect Logged',
    entityType: 'defect',
    entityId: 'D-3001',
    entityTitle: 'API timeout on large file upload',
    timestamp: new Date(Date.now() - 432000000), // 5 days ago
  },
  {
    id: '5',
    action: 'Meeting Scheduled',
    entityType: 'meeting',
    entityId: 'M-4001',
    entityTitle: 'Sprint Planning for Q4',
    timestamp: new Date(Date.now() - 604800000), // 1 week ago
  },
  {
    id: '6',
    action: 'Mail Template Used',
    entityType: 'mail-template',
    entityId: 'MT-5001',
    entityTitle: 'Defect Raised Notification',
    timestamp: new Date(Date.now() - 1209600000), // 2 weeks ago
  },
];

export const ActivityLogPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Activity Log</h1>
          <p className="text-muted-foreground">
            View audit trail of all user actions
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}} disabled>
            <Plus className="mr-2 h-4 w-4" />
            Export
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
              placeholder="Search activity..."
              defaultValue=""
              readOnly
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Activity Type
          </label>

          <select
            defaultValue=""
            readOnly
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Types</option>
            <option value="task">Task</option>
            <option value="knowledge-entry">Knowledge Entry</option>
            <option value="defect">Defect</option>
            <option value="meeting">Meeting</option>
            <option value="mail-template">Mail Template</option>
            <option value="project">Project</option>
            <option value="release">Release</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Date Range
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Select date range..."
              defaultValue=""
              readOnly
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-end">
          <span className="text-sm text-muted-foreground">
            {placeholderActivities.length} activities
          </span>
        </div>
      </div>

      {/* Activities List */}
      <div>
        <div className="gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {placeholderActivities.map((a) => (
            <div key={a.id} className="rounded-lg border border-border p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-2">{a.action}</h2>

                  {/* Entity info */}
                  <div className="mb-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>Entity: {a.entityType}</span>
                    <span>ID: {a.entityId}</span>
                    {a.entityTitle && (
                      <span className="ml-2">Title: {a.entityTitle}</span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Timestamp: {a.timestamp.toLocaleString()}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Details"
                  disabled
                >
                  {/* No icon needed for placeholder */}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};