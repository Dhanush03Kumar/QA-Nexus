import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { TagInput } from '@/components/ui/tag-input';
import { taskService } from '@/features/tasks/services/task.service';
import { useToast } from '@/components/ui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '@/lib/database';

const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  externalId: z.string().optional().or(z.literal('')),
  project: z.string().optional().or(z.literal('')),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['todo', 'in-progress', 'blocked', 'completed']),
  tags: z.array(z.string()).default([]),
  dueDate: z.date().optional(),
  followUpComments: z.string().optional(),
  notes: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  onClose: () => void;
  taskId?: string; // If provided, edits existing task
}

export const TaskForm = ({ onClose, taskId }: TaskFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      externalId: '',
      project: '',
      priority: 'medium',
      status: 'todo',
      tags: [],
      dueDate: undefined,
      followUpComments: '',
      notes: '',
    },
  });

  const { mutate: createTask, isPending: isCreating } = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: (data) => {
      toast({
        title: 'Success',
        description: 'Task created successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose();
    },
    onError: (error) => {
      console.error('Error creating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to create task',
        variant: 'destructive',
      });
    },
  });

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: (data: { id: string; values: TaskFormValues }) =>
      taskService.updateTask(data.id, data.values),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Task updated successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose();
    },
    onError: (error) => {
      console.error('Error updating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    const taskData = {
      ...values,
      // Convert empty strings to undefined for optional fields
      externalId: values.externalId || undefined,
      project: values.project || undefined,
      followUpComments: values.followUpComments || undefined,
      notes: values.notes || undefined,
    };

    if (taskId) {
      updateTask({ id: taskId, values: taskData });
    } else {
      createTask(taskData);
    }
  });

  // Load existing task data if editing
  React.useEffect(() => {
    if (taskId) {
      const loadTask = async () => {
        try {
          const task = await taskService.getTaskById(taskId);
          if (task) {
            form.reset({
              title: task.title,
              description: task.description || '',
              externalId: task.externalId || '',
              project: task.project || '',
              priority: task.priority,
              status: task.status,
              tags: task.tags || [],
              dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
              followUpComments: task.followUpComments || '',
              notes: task.notes || '',
            });
          }
        } catch (error) {
          console.error('Error loading task:', error);
          toast({
            title: 'Error',
            description: 'Failed to load task',
            variant: 'destructive',
          });
          onClose();
        }
      };

      loadTask();
    }
  }, [taskId, form, toast, onClose]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Title
        </label>
        <Input
          {...form.register('title')}
          placeholder="Enter task title"
          className="h-10"
        />
        {form.formState.errors.title && (
          <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Description
        </label>
        <Textarea
          {...form.register('description')}
          placeholder="Enter task description"
          className="min-h-[80px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Project
          </label>
          <Input
            {...form.register('project')}
            placeholder="Project name or ID"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            External ID (Optional)
          </label>
          <Input
            {...form.register('externalId')}
            placeholder="JIRA, Ticket ID, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Priority
          </label>
          <Select
            {...form.register('priority')}
          >
            <SelectValue placeholder="Select priority" />
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Status
          </label>
          <Select
            {...form.register('status')}
          >
            <SelectValue placeholder="Select status" />
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Due Date
        </label>
        <DatePicker
          {...form.register('dueDate')}
          placeholder="Select due date"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Tags
        </label>
        <TagInput
          {...form.register('tags')}
          placeholder="Add tags"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Follow-up Comments
        </label>
        <Textarea
          {...form.register('followUpComments')}
          placeholder="Add follow-up notes or comments"
          className="min-h-[60px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Notes
        </label>
        <Textarea
          {...form.register('notes')}
          placeholder="Additional notes"
          className="min-h-[80px]"
        />
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox
          {...form.register('favorite')}
        />
        <span className="text-sm text-muted-foreground">
          Mark as favorite
        </span>
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={form.isSubmitting || isCreating || isUpdating}
          className="btn-primary"
        >
          {form.isSubmitting || isCreating || isUpdating ? 'Saving...' : taskId ? 'Update' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};