import * as React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/features/tasks/services/task.service';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Check } from 'lucide-react';
import { Star } from 'lucide-react';
import { Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/lib/database';

interface TaskTableProps {
  onEdit: (taskId: string) => void;
}

export const TaskTable = ({ onEdit }: TaskTableProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-destructive p-4">Error loading tasks</div>;

  const tasks = data?.tasks ?? [];

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      sortable: true,
      className: 'w-20',
    },
    {
      accessorKey: 'title',
      header: 'Title',
      sortable: true,
      className: 'w-40',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      sortable: true,
      className: 'w-20',
      cell: (row: { original: Task }) => {
        const status = row.original.status;
        let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
        switch (status) {
          case 'todo': variant = 'default'; break;
          case 'in-progress': variant = 'secondary'; break;
          case 'blocked': variant = 'destructive'; break;
          case 'completed': variant = 'success'; break;
          default: variant = 'default';
        }
        return (
          <Badge variant={variant}>{status}</Badge>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      sortable: true,
      className: 'w-20',
      cell: (row: { original: Task }) => {
        const priority = row.original.priority;
        let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
        switch (priority) {
          case 'critical': variant = 'destructive'; break;
          case 'high': variant = 'destructive'; break;
          case 'medium': variant = 'warning'; break;
          case 'low': variant = 'secondary'; break;
          default: variant = 'default';
        }
        return (
          <Badge variant={variant}>{priority}</Badge>
        );
      },
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      sortable: true,
      className: 'w-24',
      cell: (row: { original: Task }) => {
        const dueDate = row.original.dueDate;
        if (!dueDate) return '-';
        const date = new Date(dueDate);
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      sortable: false,
      className: 'w-32',
      cell: (row: { original: Task }) => {
        const tags = row.original.tags ?? [];
        if (tags.length === 0) return '-';
        return (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span key={index} className="bg-muted px-2 py-0.5 text-xs rounded">{tag}</span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      sortable: false,
      className: 'w-24',
      cell: (row: { original: Task }) => {
        const task = row.original;
        return (
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Actions">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task.id)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    taskService.toggleTaskCompletion(task.id).then(() => {
                      queryClient.invalidateQueries({ queryKey: ['tasks'] });
                    });
                  }}
                >
                  {task.status === 'completed' ? 'Mark as Todo' : 'Mark as Complete'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    taskService.toggleFavorite(task.id).then(() => {
                      queryClient.invalidateQueries({ queryKey: ['tasks'] });
                    });
                  }}
                >
                  {task.favorite ? 'Remove Favorite' : 'Add Favorite'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this task?')) {
                      taskService.deleteTask(task.id).then(() => {
                        queryClient.invalidateQueries({ queryKey: ['tasks'] });
                      });
                    }
                  }}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={tasks}
      showSelection={false}
    />
  );
};