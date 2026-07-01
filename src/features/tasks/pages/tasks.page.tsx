import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Folder,
  AlertTriangle,
  Loader,
  CheckCircle,
  Plus
} from 'lucide-react';

export const TasksPage = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0">
            <Folder className="h-5 w-5" />
          </div>
          <div className="space-y-2 text-left">
            <p className="text-sm font-medium text-muted-foreground">
              Tasks Overview
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Manage your QA tasks
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            aria-disabled="true"
            className="whitespace-nowrap"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Tasks */}
        <Card className="hover:bg-muted/50 transition-colors">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0">
                <Folder className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Tasks
                </p>
                <p className="text-2xl font-bold tracking-tight">
                  24
                </p>
                <p className="text-sm text-green-500">
                  +2% vs last week
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Open Tasks */}
        <Card className="hover:bg-muted/50 transition-colors">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Open Tasks
                </p>
                <p className="text-2xl font-bold tracking-tight">
                  5
                </p>
                <p className="text-sm text-red-500">
                  -10% vs last week
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* In Progress */}
        <Card className="hover:bg-muted/50 transition-colors">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 w-8 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0">
                <Loader className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  In Progress
                </p>
                <p className="text-2xl font-bold tracking-tight">
                  10
                </p>
                <p className="text-sm text-blue-500">
                  +5% vs last week
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Completed */}
        <Card className="hover:bg-muted/50 transition-colors">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-2xl font-bold tracking-tight">
                  9
                </p>
                <p className="text-sm text-green-500">
                  +1% vs last week
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Toolbar and Task Table */}
      <div className="mt-6">
        <div className="space-y-4">
          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-xs font-medium text-muted-foreground">Status:</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded">All</span>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-xs font-medium text-muted-foreground">Priority:</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded">All</span>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-xs font-medium text-muted-foreground">Due Date:</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded">This Week</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-muted-foreground">Search:</span>
              <input type="text" placeholder="Search tasks..." className="border border-gray-300 rounded px-2 py-0.5 w-64" />
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-xs font-medium text-muted-foreground">Sort:</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded">Due Date ▼</span>
            </div>
          </div>

          {/* Task Table */}
          <Card>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Tasks</h2>
              <div className="overflow-hidden">
                <table className="w-full text-sm text-left rtl:text-right rtl:whitespace-nowrap">
                  <thead className="text-xs font-medium text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-4 py-3">ID</th>
                      <th scope="col" className="px-4 py-3">Title</th>
                      <th scope="col" className="px-4 py-3">Status</th>
                      <th scope="col" className="px-4 py-3">Priority</th>
                      <th scope="col" className="px-4 py-3">Due Date</th>
                      <th scope="col" className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        #1001
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        Login validation test
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Done
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Medium
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                        Jun 28, 2026
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      Edit
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      #1002
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      API error handling
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        High
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      Jul 2, 2026
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      Edit
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      #1003
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      UI regression suite
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Todo
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        Low
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      Jul 5, 2026
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      Edit
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};