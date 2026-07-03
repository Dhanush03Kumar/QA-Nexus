import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Folder,
  AlertTriangle,
  Loader,
  CheckCircle,
  Plus
} from 'lucide-react';
import { taskService } from '@/features/tasks/services/task.service';
import { Task } from '@/lib/database';
import { TaskForm } from '@/features/tasks/components/task-form';

export const TasksPage = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showTaskForm, setShowTaskForm] = React.useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks();
      setTasks(data.tasks);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await taskService.createTask(taskData);
      setShowTaskForm(false);
      await fetchTasks(); // refresh list
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create task');
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  // Compute stats from tasks
  const totalTasks = tasks.length;
  const openTasks = tasks.filter(t => t.status !== 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

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
            onClick={() => setShowTaskForm(true)}
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
                  {totalTasks}
                </p>
                <p className="text-sm text-green-500">
                  vs last week
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
                  {openTasks}
                </p>
                <p className="text-sm text-red-500">
                  vs last week
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* In Progress */}
        <Card className="hover:bg-muted/50 transition-colors">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0">
                <Loader className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  In Progress
                </p>
                <p className="text-2xl font-bold tracking-tight">
                  {inProgressTasks}
                </p>
                <p className="text-sm text-blue-500">
                  vs last week
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
                  {completedTasks}
                </p>
                <p className="text-sm text-green-500">
                  vs last week
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Toolbar and Main Content (Table + Details) */}
      <div className="mt-6">
        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Status:</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded">All</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Priority:</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded">All</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Due Date:</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded">This Week</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Search:</span>
            <input type="text" placeholder="Search tasks..." className="border border-gray-300 rounded px-2 py-0.5 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Sort:</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded">Due Date ▼</span>
          </div>
        </div>

        {/* Main Content: Task Table and Details Panel */}
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {/* Task Table (takes 2/3 width) */}
          <Card className="col-span-2 md:col-span-2">
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
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-3 text-center text-muted-foreground">
                          Loading...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-3 text-center text-muted-foreground">
                          Error: {error}
                        </td>
                      </tr>
                    ) : tasks.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-3 text-center text-muted-foreground">
                          No tasks found.
                        </td>
                      </tr>
                    ) : (
                      tasks.map((task) => (
                        <tr key={task.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            #{task.id.substring(0, 4)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            {task.title}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBgColor(task.status)} ${getStatusTextColor(task.status)}`}>
                              {formatStatus(task.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBgColor(task.priority)} ${getPriorityTextColor(task.priority)}`}>
                              {formatPriority(task.priority)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {task.dueDate ? task.dueDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                            Edit
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Task Details Panel (takes 1/3 width) */}
          <Card className="col-span-1 md:col-span-1">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Task Details</h2>
              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Title</p>
                  <p className="font-medium">{tasks[0]?.title || ''}</p>
                </div>
                {/* Status */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  {tasks[0]?.status && (
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBgColor(tasks[0].status)} ${getStatusTextColor(tasks[0].status)}`}>
                      {formatStatus(tasks[0].status)}
                    </span>
                  )}
                </div>
                {/* Priority */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Priority</p>
                  {tasks[0]?.priority && (
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityBgColor(tasks[0].priority)} ${getPriorityTextColor(tasks[0].priority)}`}>
                      {formatPriority(tasks[0].priority)}
                    </span>
                  )}
                </div>
                {/* Due Date */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                  <p className="text-sm">
                    {tasks[0]?.dueDate ? tasks[0].dueDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                  </p>
                </div>
                {/* Tags */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {tasks[0]?.tags?.map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 text-xs font-medium bg-muted rounded">
                        {tag}
                      </span>
                    )) || (
                      <>
                        {/* Empty state for tags */}
                      </>
                    )}
                  </div>
                </div>
                {/* Description */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-sm text-muted-foreground">
                    {tasks[0]?.description || ''}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Task Form Modal / Drawer */}
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

// Helper functions to keep same styling as original (hardcoded values)
function getStatusBgColor(status: string): string {
  switch (status) {
    case 'todo': return 'bg-gray-100';
    case 'in-progress': return 'bg-blue-100';
    case 'blocked': return 'bg-yellow-100';
    case 'completed': return 'bg-green-100';
    default: return 'bg-gray-100';
  }
}

function getStatusTextColor(status: string): string {
  switch (status) {
    case 'todo': return 'text-gray-800';
    case 'in-progress': return 'text-blue-800';
    case 'blocked': return 'text-yellow-800';
    case 'completed': return 'text-green-800';
    default: return 'text-gray-800';
  }
}

function getPriorityBgColor(priority: string): string {
  switch (priority) {
    case 'low': return 'bg-indigo-100';
    case 'medium': return 'bg-yellow-100';
    case 'high': return 'bg-red-100';
    case 'critical': return 'bg-red-200'; // approximate
    default: return 'bg-yellow-100';
  }
}

function getPriorityTextColor(priority: string): string {
  switch (priority) {
    case 'low': return 'text-indigo-800';
    case 'medium': return 'text-yellow-800';
    case 'high': return 'text-red-800';
    case 'critical': return 'text-red-800';
    default: return 'text-yellow-800';
  }
}

function formatStatus(status: string): string {
  switch (status) {
    case 'todo': return 'To Do';
    case 'in-progress': return 'In Progress';
    case 'blocked': return 'Blocked';
    case 'completed': return 'Done';
    default: return status;
  }
}

function formatPriority(priority: string): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}