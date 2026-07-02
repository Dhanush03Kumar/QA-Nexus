import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { TagInput } from '@/components/ui/tag-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

/**
 * Task Form UI - Sprint 2.4
 *
 * This component provides the Task Form UI only, with realistic placeholder values.
 * No business logic, validation, or state management is included as per requirements.
 *
 * Responsibilities:
 * - Display form fields with placeholder values
 * - Maintain the visual structure and layout of the task form
 * - Use existing UI components (Input, Textarea, Select, DatePicker, TagInput, Checkbox, Button)
 *
 * Does NOT include:
 * - Form state management (React Hook Form, useState, etc.)
 * - Validation (Zod or otherwise)
 * - Event handlers (onSubmit, onChange, etc.)
 * - API calls or data persistence
 * - Business logic of any kind
 */
export const TaskForm = () => {
  return (
    <form className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Title
        </label>
        <Input
          defaultValue="Implement user login feature"
          placeholder="Enter task title"
          className="h-10"
          readOnly
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Description
        </label>
        <Textarea
          defaultValue="Create a secure login system with email verification and password reset functionality. Include frontend validation and backend API endpoints."
          placeholder="Enter task description"
          className="min-h-[80px]"
          readOnly
        />
      </div>

      {/* Project and External ID */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Project
          </label>
          <Input
            defaultValue="Web Application Redesign"
            placeholder="Project name or ID"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            External ID (Optional)
          </label>
          <Input
            defaultValue="PROJ-1234"
            placeholder="JIRA, Ticket ID, etc."
            readOnly
          />
        </div>
      </div>

      {/* Priority and Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Priority
          </label>
          <Select>
            <SelectTrigger readOnly>
              <SelectValue placeholder="Select priority">High</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high" selected>High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Status
          </label>
          <Select>
            <SelectTrigger readOnly>
              <SelectValue placeholder="Select status">In Progress</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress" selected>In Progress</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Due Date
        </label>
        <DatePicker
          defaultValue="2026-07-15"
          placeholder="Select due date"
          readOnly
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Tags
        </label>
        <TagInput
          defaultValue={['frontend', 'backend', 'security']}
          placeholder="Add tags"
          readOnly
        />
      </div>

      {/* Follow-up Comments */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Follow-up Comments
        </label>
        <Textarea
          defaultValue="Initial implementation complete. Needs review from security team before deployment."
          placeholder="Add follow-up notes or comments"
          className="min-h-[60px]"
          readOnly
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Notes
        </label>
        <Textarea
          defaultValue="Consider using OAuth 2.0 for authentication. Ensure password policies comply with organizational standards."
          placeholder="Additional notes"
          className="min-h-[80px]"
          readOnly
        />
      </div>

      {/* Favorite Checkbox */}
      <div className="flex items-center space-x-3">
        <Checkbox
          defaultChecked
          readOnly
        />
        <span className="text-sm text-muted-foreground">
          Mark as favorite
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end pt-4 space-x-3">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            // Intentionally left empty - no business logic as per requirements
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            // Intentionally left empty - no business logic as per requirements
          }}
          className="btn-primary"
        >
          Save Task
        </Button>
      </div>
    </form>
  );
};