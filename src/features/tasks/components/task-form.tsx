import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectItem } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { TagInput } from '@/components/ui/tag-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Task } from '@/lib/database';

interface TaskFormProps {
  onClose?: () => void;
  onSave?: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const TaskForm = ({ onClose, onSave }: TaskFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const projectRef = useRef<HTMLInputElement>(null);
  const externalIdRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const followUpCommentsRef = useRef<HTMLTextAreaElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const favoriteRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dueDateStr = dueDateRef.current?.value;
    const dueDate = dueDateStr ? new Date(dueDateStr) : undefined;
    const taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      title: titleRef.current?.value ?? '',
      description: descriptionRef.current?.value ?? '',
      project: projectRef.current?.value ?? '',
      externalId: externalIdRef.current?.value ?? '',
      priority: (priorityRef.current?.value as 'low' | 'medium' | 'high' | 'critical') ?? 'medium',
      status: (statusRef.current?.value as 'todo' | 'in-progress' | 'blocked' | 'completed') ?? 'todo',
      dueDate,
      tags: [], // TagInput not captured
      followUpComments: followUpCommentsRef.current?.value ?? '',
      notes: notesRef.current?.value ?? '',
      favorite: favoriteRef.current?.checked ?? false,
    };
    if (onSave) {
      onSave(taskData);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Title</label>
        <Input
          ref={titleRef}
          placeholder="Enter task title"
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Description</label>
        <Textarea
          ref={descriptionRef}
          placeholder="Enter task description"
          className="min-h-[80px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Project</label>
          <Input
            ref={projectRef}
            placeholder="Project name or ID"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">External ID (Optional)</label>
          <Input
            ref={externalIdRef}
            placeholder="JIRA, Ticket ID, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Priority</label>
          <Select
            ref={priorityRef}
          >
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <Select
            ref={statusRef}
          >
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Due Date</label>
        <DatePicker
          ref={dueDateRef}
          placeholder="Select due date"
          onChange={(_e) => {
            // No-op; we read value on submit
          }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Tags</label>
        <TagInput
          placeholder="Add tags"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Follow-up Comments</label>
        <Textarea
          ref={followUpCommentsRef}
          placeholder="Add follow-up notes or comments"
          className="min-h-[60px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Notes</label>
        <Textarea
          ref={notesRef}
          placeholder="Additional notes"
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Favorite</label>
        <Checkbox
          ref={favoriteRef}
        />
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            onClose?.();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="btn-primary"
        >
          Save Task
        </Button>
      </div>
    </form>
  );
};