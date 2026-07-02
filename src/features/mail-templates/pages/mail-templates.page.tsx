import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";

const placeholderTemplates = [
  {
    id: "1",
    name: "Test Execution Completed",
    category: "daily-status",
    subject: "Test Execution Completed for Build #{{buildNumber}}",
    preview:
      "Hi Team, please find below the test execution summary for the latest build...",
    updatedAt: new Date(Date.now() - 86400000), // yesterday
  },
  {
    id: "2",
    name: "Defect Raised",
    category: "defect-clarification",
    subject: "Defect Raised: {{defectId}} - {{summary}}",
    preview:
      "A new defect has been logged in the system. Details are as follows:",
    updatedAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: "3",
    name: "Defect Retest Passed",
    category: "follow-up",
    subject: "Retest Passed for Defect {{defectId}}",
    preview:
      "The retest for the aforementioned defect has passed. Please see the attached logs...",
    updatedAt: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: "4",
    name: "Environment Request",
    category: "environment-issues",
    subject: "Environment Request: {{envName}} for Testing",
    preview:
      "Kindly provision the following environment for upcoming test cycle:",
    updatedAt: new Date(Date.now() - 432000000), // 5 days ago
  },
  {
    id: "5",
    name: "Build Validation Report",
    category: "escalation",
    subject: "Build Validation Report - Version {{versionNumber}}",
    preview:
      "The build has been validated against the smoke test suite. Results:",
    updatedAt: new Date(Date.now() - 604800000), // 1 week ago
  },
  {
    id: "6",
    name: "Release Sign-off",
    category: "release-signoff",
    subject: "Release Sign-off Required: {{releaseName}}",
    preview: "Please review and sign off on the upcoming release. Details:",
    updatedAt: new Date(Date.now() - 1209600000), // 2 weeks ago
  },
];

export const MailTemplatesPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Mail Templates</h1>
          <p className="text-muted-foreground">
            Manage reusable email templates for QA communications
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}} disabled>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              defaultValue=""
              readOnly
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Category
          </label>

          <select
            defaultValue=""
            readOnly
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Categories</option>
            <option value="daily-status">Daily Status</option>
            <option value="defect-clarification">Defect Clarification</option>
            <option value="follow-up">Follow-up</option>
            <option value="environment-issues">Environment Issues</option>
            <option value="escalation">Escalation</option>
            <option value="release-signoff">Release Sign-off</option>
          </select>
        </div>

        <div className="flex items-end">
          <span className="text-sm text-muted-foreground">
            {placeholderTemplates.length} templates
          </span>
        </div>
      </div>

      {/* Templates Grid */}
      <div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderTemplates.map((t) => (
            <div
              key={t.id}
              className="rounded-lg border border-border p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{t.name}</h2>

                  {/* Category */}
                  <div className="mt-3">
                    <span className="rounded bg-muted px-2 py-1 text-xs">
                      {t.category}
                    </span>
                  </div>

                  {/* Subject */}
                  <p className="mt-2 text-sm font-medium">{t.subject}</p>

                  {/* Preview */}
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {t.preview}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Last updated: {t.updatedAt.toLocaleDateString()}
                  </p>
                </div>

                <Button variant="ghost" size="icon" aria-label="Edit" disabled>
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
