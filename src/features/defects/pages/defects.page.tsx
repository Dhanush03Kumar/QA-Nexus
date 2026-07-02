import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const placeholderDefects = [
  {
    id: 'D-1001',
    title: 'Login page fails on Safari 14',
    severity: 'high',
    status: 'open',
    module: 'Frontend',
    assignedTo: 'Alice Smith',
    updatedAt: new Date(Date.now() - 86400000), // yesterday
  },
  {
    id: 'D-1002',
    title: 'API timeout when uploading large attachments',
    severity: 'medium',
    status: 'in-progress',
    module: 'Backend',
    assignedTo: 'Bob Johnson',
    updatedAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: 'D-1003',
    title: 'Incorrect defect count on dashboard',
    severity: 'low',
    status: 'blocked',
    module: 'Dashboard',
    assignedTo: 'Carol Lee',
    updatedAt: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: 'D-1004',
    title: 'Export to PDF generates blank pages',
    severity: 'high',
    status: 'open',
    module: 'Reporting',
    assignedTo: 'David Brown',
    updatedAt: new Date(Date.now() - 432000000), // 5 days ago
  },
  {
    id: 'D-1005',
    title: 'Email notification missing for reassigned defects',
    severity: 'medium',
    status: 'todo',
    module: 'Notifications',
    assignedTo: 'Emma Wilson',
    updatedAt: new Date(Date.now() - 604800000), // 1 week ago
  },
  {
    id: 'D-1006',
    title: 'Search results not filtering by tags',
    severity: 'low',
    status: 'completed',
    module: 'Search',
    assignedTo: 'Frank Miller',
    updatedAt: new Date(Date.now() - 1209600000), // 2 weeks ago
  },
];

export const DefectsPage = () => {
  // Helper to get severity badge color
  const getSeverityProps = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-800' };
      case 'high': return { bg: 'bg-orange-100', text: 'text-orange-800' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'low': return { bg: 'bg-green-100', text: 'text-green-800' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  // Helper to get status badge color
  const getStatusProps = (status: string) => {
    switch (status) {
      case 'open': return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'in-progress': return { bg: 'bg-purple-100', text: 'text-purple-800' };
      case 'blocked': return { bg: 'bg-gray-100', text: 'text-gray-800' };
      case 'todo': return { bg: 'bg-gray-100', text: 'text-gray-800' };
      case 'completed': return { bg: 'bg-green-100', text: 'text-green-800' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Defects</h1>
          <p className="text-muted-foreground">
            Track and analyze software defects
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}} disabled>
            <Plus className="mr-2 h-4 w-4" />
            New Defect
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
              placeholder="Search defects..."
              defaultValue=""
              readOnly
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Status
          </label>

          <select
            defaultValue=""
            readOnly
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="open">Open</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex items-end">
          <span className="text-sm text-muted-foreground">
            {placeholderDefects.length} defects
          </span>
        </div>
      </div>

      {/* Defects Grid */}
      <div>
        <div className="gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {placeholderDefects.map((d) => {
            const severity = getSeverityProps(d.severity);
            const status = getStatusProps(d.status);
            return (
              <div key={d.id} className="rounded-lg border border-border p-6 shadow-sm flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-2">{d.title}</h2>

                    {/* Defect ID */}
                    <p className="mb-2 text-xs text-muted-foreground">{d.id}</p>

                    {/* Severity and Status badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`${severity.bg} ${severity.text} px-2 py-0.5 rounded text-xs font-medium`}>
                        {d.severity}
                      </span>
                      <span className={`${status.bg} ${status.text} px-2 py-0.5 rounded text-xs font-medium`}>
                        {d.status}
                      </span>
                    </div>

                    {/* Module and Assigned To */}
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Module: {d.module}</span>
                      <span>Assigned To: {d.assignedTo}</span>
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Last updated: {d.updatedAt.toLocaleDateString()}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};