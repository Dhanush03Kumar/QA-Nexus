import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectItem } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { TagInput } from '@/components/ui/tag-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface TaskFormProps {
  taskId?: string;
  onClose?: () => void;
}

export const TaskForm = ({ taskId, onClose }: TaskFormProps) => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Title</label>
        <Input
          placeholder="Enter task title"
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Description</label>
        <Textarea
          placeholder="Enter task description"
          className="min-h-[80px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Project</label>
          <Input placeholder="Project name or ID" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">External ID (Optional)</label>
          <Input placeholder="JIRA, Ticket ID, etc." />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Priority</label>
          <Select>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <Select>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Due Date</label>
        <DatePicker placeholder="Select due date" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Tags</label>
        <TagInput placeholder="Add tags" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Follow-up Comments</label>
        <Textarea
          placeholder="Add follow-up notes or comments"
          className="min-h-[60px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Notes</label>
        <Textarea
          placeholder="Additional notes"
          className="min-h-[80px]"
        />
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox />
        <span className="text-sm text-muted-foreground">Mark as favorite</span>
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <Button
          variant="outline"
          onClick={(event) => {
            event.preventDefault();
            onClose?.();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            onClose?.();
          }}
          className="btn-primary"
        >
          Save Task
        </Button>
      </div>
    </form>
  );
};