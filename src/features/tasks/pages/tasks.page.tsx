import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export const TasksPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks and follow-ups
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            aria-disabled="true"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Summary Cards Placeholder */}
        <Card className="col-span-1">
          <div className="p-6">
            <h3 className="font-medium mb-2">[Summary Card]</h3>
            <p className="text-muted-foreground text-sm">
              Summary metric placeholder
            </p>
          </div>
        </Card>
        <Card className="col-span-1">
          <div className="p-6">
            <h3 className="font-medium mb-2">[Summary Card]</h3>
            <p className="text-muted-foreground text-sm">
              Summary metric placeholder
            </p>
          </div>
        </Card>
        <Card className="col-span-1">
          <div className="p-6">
            <h3 className="font-medium mb-2">[Summary Card]</h3>
            <p className="text-muted-foreground text-sm">
              Summary metric placeholder
            </p>
          </div>
        </Card>
        <Card className="col-span-1">
          <div className="p-6">
            <h3 className="font-medium mb-2">[Summary Card]</h3>
            <p className="text-muted-foreground text-sm">
              Summary metric placeholder
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4">
        {/* Filters Placeholder */}
        <Card className="col-span-1">
          <div className="p-6">
            <h3 className="font-medium mb-2">[Filters]</h3>
            <p className="text-muted-foreground text-sm">
              Filter controls placeholder
            </p>
          </div>
        </Card>

        {/* Task Table Placeholder */}
        <Card className="col-span-1">
          <div className="p-6">
            <h3 className="font-medium mb-2">[Task Table]</h3>
            <p className="text-muted-foreground text-sm">
              Task table placeholder
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};