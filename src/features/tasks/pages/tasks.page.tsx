import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TaskForm } from '@/features/tasks/components/task-form';
import { TaskTable } from '@/features/tasks/components/task-table';
import { Plus } from 'lucide-react';

export const TasksPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const handleCreateTask = () => {
    setEditingTaskId(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (taskId: string) => {
    setEditingTaskId(taskId);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTaskId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your daily tasks and follow-ups
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleCreateTask}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <TaskTable
        onEdit={handleEditTask}
      />

      {/* Task Form Modal / Drawer */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-md max-h-[90vh] overflow-hidden">
          <div className="flex h-full flex-col bg-popover text-popover-foreground shadow-xl ring-1 ring-border">
            {/* Header */}
            <div className="flex flex-shrink-0 items-center justify-between px-6 py-4 border-b border-muted">
              <h2 className="text-lg font-semibold">
                {editingTaskId ? 'Edit Task' : 'New Task'}
              </h2>
              <button
                onClick={handleCloseForm}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-popover-foreground"
                aria-label="Close"
              >
                {/* X icon would go here */}
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <TaskForm
                taskId={editingTaskId}
                onClose={handleCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};