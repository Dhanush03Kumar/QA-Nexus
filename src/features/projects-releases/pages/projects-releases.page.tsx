import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const placeholderItems = [
  {
    id: '1',
    name: 'Project Apollo',
    type: 'Project',
    status: 'In Progress',
    description: 'End-to-end testing platform for web applications.',
    updatedAt: new Date(Date.now() - 86400000), // yesterday
  },
  {
    id: '2',
    name: 'Release v2.3.0',
    type: 'Release',
    status: 'Ready',
    description: 'Quarterly release with new features and bug fixes.',
    updatedAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: '3',
    name: 'Project Mercury',
    type: 'Project',
    status: 'Planning',
    description: 'Mobile test automation framework.',
    updatedAt: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: '4',
    name: 'Release v2.2.5',
    type: 'Release',
    status: 'Deployed',
    description: 'Hotfix release for critical security patches.',
    updatedAt: new Date(Date.now() - 432000000), // 5 days ago
  },
  {
    id: '5',
    name: 'Project Gemini',
    type: 'Project',
    status: 'On Hold',
    description: 'Performance testing suite for backend services.',
    updatedAt: new Date(Date.now() - 604800000), // 1 week ago
  },
  {
    id: '6',
    name: 'Release v2.3.1',
    type: 'Release',
    status: 'Testing',
    description: 'Patch release addressing UI responsiveness.',
    updatedAt: new Date(Date.now() - 1209600000), // 2 weeks ago
  },
];

export const ProjectsReleasesPage = () => {
  // Helper to get status badge color
  const getStatusProps = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
      case 'in-progress':
        return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'ready':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'planning':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'deployed':
        return { bg: 'bg-purple-100', text: 'text-purple-800' };
      case 'on hold':
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
      case 'testing':
        return { bg: 'bg-indigo-100', text: 'text-indigo-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects & Releases</h1>
          <p className="text-muted-foreground">
            Manage QA projects and release cycles
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}} disabled>
            <Plus className="mr-2 h-4 w-4" />
            New Item
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
              placeholder="Search projects/releases..."
              defaultValue=""
              readOnly
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Type
          </label>

          <select
            defaultValue=""
            readOnly
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Types</option>
            <option value="Project">Project</option>
            <option value="Release">Release</option>
          </select>
        </div>

        <div className="flex items-end">
          <span className="text-sm text-muted-foreground">
            {placeholderItems.length} items
          </span>
        </div>
      </div>

      {/* Items Grid */}
      <div>
        <div className="gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {placeholderItems.map((item) => {
            const status = getStatusProps(item.status);
            return (
              <div key={item.id} className="rounded-lg border border-border p-6 shadow-sm flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="flex-2-4"></h2>
                    <h2 className="text-lg font-semibold mb-2">{item.name}</h2>

                    {/* Type badge */}
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        item.type === 'Project' ? 'bg-indigo-100 text-indigo-800' : 'bg-pink-100 text-pink-800'
                      }`}>
                        {item.type}
                      </span>

                      {/* Status badge */}
                      <span className={`${status.bg} ${status.text} px-2 py-0.5 rounded text-xs font-medium`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Last updated: {item.updatedAt.toLocaleDateString()}
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