import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const placeholderMeetings = [
  {
    id: '1',
    title: 'Sprint Planning',
    type: 'Planning',
    preview: 'Discuss sprint goals, select backlog items, and estimate effort for the upcoming two-week sprint.',
    date: new Date(Date.now() - 86400000), // yesterday
  },
  {
    id: '2',
    title: 'Defect Triage',
    type: 'Review',
    preview: 'Review newly reported defects, assign priority, and assign owners for fixing.',
    date: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: '3',
    title: 'Daily Standup',
    type: 'Sync',
    preview: 'Quick 15-minute standup to share progress, blockers, and plans for the day.',
    date: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: '4',
    title: 'Release Go/No-Go',
    type: 'Decision',
    preview: 'Evaluate release readiness based on test results, open defects, and stakeholder sign-off.',
    date: new Date(Date.now() - 604800000), // 1 week ago
  },
  {
    id: '5',
    title: 'Client Sync',
    type: 'Sync',
    preview: 'Weekly sync with client to discuss progress, upcoming milestones, and gather feedback.',
    date: new Date(Date.now() - 1209600000), // 2 weeks ago
  },
  {
    id: '6',
    title: 'Retrospective',
    type: 'Retrospective',
    preview: 'Reflect on the past sprint: what went well, what could be improved, and action items for next sprint.',
    date: new Date(Date.now() - 1814400000), // 3 weeks ago
  },
];

export const MeetingsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Meetings</h1>
          <p className="text-muted-foreground">
            Schedule and track QA meetings, standups, and syncs
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}} disabled>
            <Plus className="mr-2 h-4 w-4" />
            New Meeting
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
              placeholder="Search meetings..."
              defaultValue=""
              readOnly
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Meeting Type
          </label>

          <select
            defaultValue=""
            readOnly
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Types</option>
            <option value="Planning">Planning</option>
            <option value="Review">Review</option>
            <option value="Sync">Sync</option>
            <option value="Decision">Decision</option>
            <option value="Retrospective">Retrospective</option>
          </select>
        </div>

        <div className="flex items-end">
          <span className="text-sm text-muted-foreground">
            {placeholderMeetings.length} meetings
          </span>
        </div>
      </div>

      {/* Meetings Grid */}
      <div>
        <div className="gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {placeholderMeetings.map((m) => (
            <div key={m.id} className="rounded-lg border border-border p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-2">{m.title}</h2>

                  {/* Type */}
                  <div className="mt-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{m.type}</span>
                  </div>

                  {/* Preview */}
                  <p className="mt-3 text-xs text-muted-foreground line-clamp-3">
                    {m.preview}
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground">
                    Last updated: {m.date.toLocaleDateString()}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Edit"
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