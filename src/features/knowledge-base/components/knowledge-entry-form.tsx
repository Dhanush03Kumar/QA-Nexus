import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface KnowledgeEntryFormProps {
  onClose: () => void;
  entryId?: string | null;
}

export const KnowledgeEntryForm = ({
  onClose,
  entryId,
}: KnowledgeEntryFormProps) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      title,
      summary,
      content,
      entryId,
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">
          Title
        </label>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Knowledge entry title"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Summary
        </label>

        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full rounded-md border p-2"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Content
        </label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border p-2"
          rows={8}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button type="submit">
          Save Entry
        </Button>
      </div>
    </form>
  );
};