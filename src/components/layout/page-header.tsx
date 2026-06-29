import * as React from 'react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: Array<{
    onClick: () => void;
    label: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }>;
}

export const PageHeader = ({
  title,
  description,
  actions = [],
}: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant ?? 'default'}
              onClick={action.onClick}
            >
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};