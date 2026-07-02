import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const placeholderAutomation = [
  {
    id: '1',
    name: 'API Test Suite',
    type: 'API',
    framework: 'ReadyAPI',
    status: 'Active',
    updatedAt: new Date(Date.now() - 86400000), // yesterday
  },
  {
    id: '2',
    name: 'UI Regression Tests',
    type: 'UI',
    framework: 'Playwright',
    status: 'In Development',
    updatedAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: '3',
    name: 'Smoke Test Sanity',
    type: 'Smoke',
    framework: 'Selenium',
    status: 'Active',
    updatedAt: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: '4',
    name: 'Performance Benchmark',
    type: 'Performance',
    framework: 'JMeter',
    status: 'Active',
    updatedAt: new Date(Date.now() - 432000000), // 5 days ago
  },
  {
    id: '5',
    name: 'Utility Scripts Library',
    type: 'Utility',
    framework: 'Node.js',
    status: 'Maintenance',
    updatedAt: new Date(Date.now() - 432000000),
  },
  {
    id: '6',
    name: 'Load Test Suite',
    type: 'Performance',
    framework: 'Gatling',
    status: 'Testing',
    updatedAt: new Date(Date.now() - 604800000), // 1 week ago
  },
];

export const AutomationPage = () => {
  // Helper to get status badge color
  const getStatusProps = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'in development':
      case 'in-development':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'maintenance':
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
      case 'testing':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Automation Hub</h1>
          <p className="text-muted-foreground">
            Manage test automation frameworks and scripts
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}} disabled>
            <Plus className="mr-2 h-4 w-4" />
            New Automation
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
              placeholder="Search automation items..."
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
            <option value="API">API</option>
            <option value="UI">UI</option>
            <option value="Smoke">Smoke</option>
            <option value="Performance">Performance</option>
            <option value="Utility">Utility</option>
            <option value="Regression">Regression</option>
          </select>
        </div>

        <div className="flex items-end">
          <span className="text-muted-foreground">
            {placeholderAutomation.length} items
          </span>
        </div>
      </div>

      {/* Automation Grid */}
      <div>
        <div className="gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {placeholderAutomation.map((item) => {
            const status = getStatusProps(item.status);
            return (
              <div key={item.id} className="rounded-lg border border-border p-6 shadow-sm flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-2">{item.name}</h2>

                    {/* Type and Badge */}
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        item.type === 'API' ? 'bg-indigo-100 text-indigo-800' :
                        item.type === 'UI' ? 'bg-pink-100 text-pink-800' :
                        item.type === 'Smoke' ? 'bg-green-100 text-green-800' :
                        item.type === 'Performance' ? 'bg-purple-100 text-purple-800' :
                        item.type === 'Utility' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.type}
                      </span>

                      {/* Framework */}
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {item.framework}
                      </span>

                      {/* Status badge */}
                      <span className={`${status.bg} ${status.text} px-2 py-0.5 rounded text-xs font-medium`}>
                        {item.status}
                      </span>
                    </div>

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