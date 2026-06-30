import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { typography, contentClasses } from '@/app/layout-styles';

/**
 * Future Page Placeholder Component
 *
 * This component serves as a placeholder for features that are planned
 * for implementation in later phases. It provides a consistent layout
 * with relevant information based on the feature type.
 *
 * Props:
 *   feature: The name of the feature (matches navigation items)
 *   description: Brief description of what the feature will do
 *   features: Array of feature descriptions to display
 *   actionLabel: Text for the primary action button (optional)
 *   onAction: Callback for when the primary action button is clicked (optional)
 */
interface FuturePageProps {
  feature: string;
  description?: string;
  features?: string[];
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Gets feature-specific information based on the feature name
 * @param feature The feature name
 * @returns Object containing description and features arrays
 */
const getFeatureInfo = (feature: string) => {
  switch (feature) {
    case 'Mail Templates':
      return {
        description: 'Store and manage reusable email templates for QA communications',
        features: [
          'Create, edit, and delete email templates',
          'Organize templates by category (Daily Status, Defect Clarification, etc.)',
          'Mark templates as favorites for quick access',
          'Duplicate existing templates to save time',
          'Copy template content to clipboard with one click',
          'Preview templates before use'
        ]
      };
    case 'Meetings':
      return {
        description: 'Schedule meetings and track meeting outcomes',
        features: [
          'Manage upcoming meetings with date, time, attendees, and agenda',
          'Record meeting minutes with discussion points, decisions, and action items',
          'Track action items with due dates, status, and priority',
          'Automatically create tasks from action items',
          'Link reference documents and preparation notes'
        ]
      };
    case 'Defects':
      return {
        description: 'Track and analyze software defects',
        features: [
          'Record defect details including ID, summary, severity, and status',
          'Link defects to Jira tickets for traceability',
          'Track root cause analysis, workarounds, and lessons learned',
          'Attach screenshots and supporting documents',
          'Filter defects by status (Open, In Progress, Resolved, Closed)',
          'Identify defects needing root cause analysis'
        ]
      };
    case 'Projects & Releases':
      return {
        description: 'Manage QA projects and release cycles',
        features: [
          'Track project details including description, phases, and timelines',
          'Manage release information with planned vs. actual dates',
          'Monitor key metrics: test cases, pass/fail rates, open defects',
          'Only one project can be marked as active at a time',
          'Track environment details and team contacts',
          'Identify and monitor project risks'
        ]
      };
    case 'Automation Hub':
      return {
        description: 'Manage test automation frameworks and scripts',
        features: [
          'Track automation coverage information',
          'Manage pending fixes and enhancements to automation frameworks',
          'Store framework notes and learning resources',
          'Save and organize code snippets by language',
          'Track TODO items for automation improvements'
        ]
      };
    case 'Activity Log':
      return {
        description: 'View audit trail of all user actions',
        features: [
          'Automatically logged activities: task creation, defect updates, note modifications',
          'Search and filter log entries by date range',
          'Filter activities by module (Tasks, Knowledge Base, etc.)',
          'View read-only audit trail for compliance and tracking',
          'See timestamps and user actions for accountability'
        ]
      };
    case 'Settings':
      return {
        description: 'Configure application preferences',
        features: [
          'Toggle between light and dark mode themes',
          'Configure keyboard shortcuts for frequently used actions',
          'Manage application backup and restore functionality',
          'Configure notification preferences',
          'Set global application preferences',
          'Manage data export and import settings'
        ]
      };
    default:
      return {
        description: `Manage ${feature.toLowerCase()}`,
        features: [
          `Create, read, update, and delete ${feature.toLowerCase()}`,
          `Search and filter ${feature.toLowerCase()}`,
          `Organize ${feature.toLowerCase()} by categories or tags`,
          `Mark important items as favorites`,
          `Export and import ${feature.toLowerCase()} data`
        ]
      };
  }
};

export const FuturePage = ({
  feature,
  description,
  features,
  actionLabel = `Create New ${feature}`,
  onAction
}: FuturePageProps) => {
  // Use provided description/features or get defaults based on feature name
  const {
  description: featureDescription,
  features: featureFeatures,
} =
  features && features.length > 0
    ? {
        description:
          description ||
          `Manage ${feature.toLowerCase()}`,
        features,
      }
    : getFeatureInfo(feature);
  return (
    <div className={`${contentClasses.base}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`${typography.headline} mb-4`}>{feature}</h1>
          <p className={`${typography.body} text-muted-foreground`}>
            {featureDescription}
          </p>
        </div>
        {onAction && (
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onAction}>
              <Plus className="mr-2 h-4 w-4" />
              {actionLabel}
            </Button>
          </div>
        )}
      </div>

      {!features || features.length === 0 ? (
        <p className="text-muted-foreground mt-4">
          This feature is planned for implementation in a future phase.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          <h2 className={typography.title}>Planned Features:</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {featureFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};