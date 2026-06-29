import * as React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/features/tasks/services/task.service';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Check } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/components/ui/toast';
import { Task } from '@/lib/database';
import { TaskForm } from '@/features/tasks/components/task-form';

interface TaskTableFilters {
  status?: string;
  priority?: string;
  search?: string;
}

const TaskTable = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [filters, setFilters] = React.useState<TaskTableFilters>({
    status: undefined,
    priority: undefined,
    search: '',
  });
  const [selectedTaskId, setSelectedTaskId] = React.useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const {
    data: { tasks, total } = { tasks: [], total: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () =>
      taskService.getTasks({
        status: filters.status,
        priority: filters.priority,
        search: filters.search || undefined,
      }),
  });

  const handleDelete = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    } catch (err) {
      console.error('Error deleting task:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'id',
        header: () => (
          <div className="flex items-center space-x-2">
            <Checkbox
              checkedIdx={-1} // We'll handle selection differently
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }: { row: { original: Task } }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={selectedTaskId === row.original.id}
              onCheckedChange={(checked) =>
                checked ? setSelectedTaskId(row.original.id) : setSelectedTaskId(null)
              }
              aria-label={`Select task ${row.original.title}`}
            />
          </div>
        ),
        sortable: false,
        className: 'w-8',
      },
      {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }: { row: { original: Task } }) => (
          <div className="font-medium">{row.original.title}</div>
        ),
        sortable: true,
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }: { row: { original: Task } }) => {
          const priorityColors: Record<string, string> = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-orange-100 text-orange-800',
            critical: 'bg-red-100 text-red-800',
          };
          return (
            <Badge variant="secondary" className={priorityColors[row.original.priority]}>
              {row.original.priority.charAt(0).toUpperCase() + row.original.priority.slice(1)}
            </Badge>
          );
        },
        sortable: true,
        className: 'text-center',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: { row: { original: Task } }) => {
          const statusColors: Record<string, string> = {
            todo: 'bg-gray-100 text-gray-800',
            'in-progress': 'bg-blue-100 text-blue-800',
            blocked: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-green-100 text-green-800',
          };
          return (
            <Badge variant="secondary" className={statusColors[row.original.status]}>
              {row.original.status.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </Badge>
          );
        },
        sortable: true,
        className: 'text-center',
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: ({ row }: { row: { original: Task } }) => {
          if (!row.original.dueDate) return <span className="text-muted-foreground">—</span>;

          const dueDate = new Date(row.original.dueDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const isOverdue = dueDate < today && row.original.status !== 'completed';

          return (
            <span className={`font-mono text-sm ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`}>
              {dueDate.toLocaleDateString()}
            </span>
          );
        },
        sortable: true,
        className: 'text-center',
      },
      {
        accessorKey: 'project',
        header: 'Project',
        cell: ({ row }: { row: { original: Task } }) => (
          <span className="text-sm text-muted-foreground">{row.original.project || '—'}</span>
        ),
        sortable: true,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }: { row: { original: Task } }) => (
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="More actions">
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                  setSelectedTaskId(row.original.id);
                }}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setSelectedTaskId(row.original.id);
                  setIsDeleteModalOpen(true);
                }}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  // Toggle completion
                  const newStatus = row.original.status === 'completed' ? 'todo' : 'completed';
                  taskService.updateTask(row.original.id, { status: newStatus });
                }}>
                  {row.original.status === 'completed' ? 'Mark as Todo' : 'Mark as Complete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        sortable: false,
        className: 'text-center w-24',
      },
    ],
    []
  );

  if (isLoading) return <div className="text-center py-8">Loading tasks...</div>;
  if (error) return <div className="text-center text-destructive py-8">Error loading tasks</div>;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1">Status</label>
          <Select
            value={filters.status ?? ''}
            onValueChange={(value) => setFilters(prev => ({ ...prev, status: value || undefined }))}
            placeholder="All statuses"
          >
            <SelectValue placeholder="All statuses" />
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1">Priority</label>
          <Select
            value={filters.priority ?? ''}
            onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value || undefined }))}
            placeholder="All priorities"
          >
            <SelectValue placeholder="All priorities" />
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1">Search</label>
          <Input
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            placeholder="Search tasks..."
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => {
            // Clear filters
            setFilters({ status: undefined, priority: undefined, search: '' });
          }}
        >
          Clear Filters
        </Button>
        <Button onClick={() => setSelectedTaskId('new')}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {/* Data Grid */}
      <div>
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No tasks found. Click "Add Task" to get started.
            </p>
          </div>
        ) : (
          <DataTable<Task>
            data={tasks}
            columns={columns}
            showSelection={false}
            loading={isLoading}
            emptyMessage="No tasks found"
          />
        )}
      </div>

      {/* Modals */}
      {selectedTaskId && (
        <>
          {selectedTaskId === 'new' ? (
            <TaskForm onClose={() => setSelectedTaskId(null)} />
          ) : (
            <>
              <TaskForm
                taskId={selectedTaskId}
                onClose={() => setSelectedTaskId(null)}
              />
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                <div
                  className="relative bg-popover p-6 rounded-lg shadow-xl w-96 max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="mb-4 text-lg font-semibold">Delete Task</h3>
                  <p className="mb-6">
                    Are you sure you want to delete this task? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        if (selectedTaskId) {
                          await handleDelete(selectedTaskId);
                          setSelectedTaskId(null);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TaskTable;