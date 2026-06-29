# Personal QA Workspace - Architecture

# 1. Technical Overview

Personal QA Workspace is a fully client-side application.

The application runs entirely in the browser.

No backend services are used.

No deployment is required.

All data is stored locally in the browser using IndexedDB.

Application should work completely offline.

---

# 2. Technology Stack

## Core Stack

* React
* TypeScript
* Vite

## UI

* Tailwind CSS
* shadcn/ui
* Lucide Icons

## Routing

* React Router

## Forms

* React Hook Form
* Zod

## Local Storage

* IndexedDB
* Dexie.js (wrapper around IndexedDB)

## Rich Text Editing

* Tiptap Editor

---

# 3. Architecture Principles

## Local First

All user data must remain on the local machine.

No external communication should occur.

No API calls should be made.

No telemetry.

No analytics.

---

## Offline First

Application must continue functioning without network connectivity.

All features should work offline.

---

## Single User

Application supports only one user.

No authentication.

No role management.

No permissions.

---

# 4. Folder Structure

src/

app/
components/
features/
hooks/
lib/
services/
types/
utils/

---

# 5. Feature Organization

Each feature should have its own folder.

Example:

features/

dashboard/
tasks/
knowledge-base/
mail-templates/
meetings/
defects/
projects/
automation/
activity-log/

Each feature contains:

components/
pages/
hooks/
services/
types/

---

# 6. IndexedDB Design

Database Name:

qa-workspace-db

All application data must be stored in IndexedDB.

Suggested stores:

* tasks
* knowledgeEntries
* mailTemplates
* meetings
* meetingActionItems
* defects
* projects
* releases
* automationItems
* activityLogs
* settings
* attachments

---

# 7. Common Entity Structure

Every entity should contain:

* id
* createdAt
* updatedAt

Optional:

* tags
* favorite

Example:

{
id: string
createdAt: Date
updatedAt: Date
tags?: string[]
favorite?: boolean
}

IDs should be generated using:

crypto.randomUUID()

---

# 8. Routing

Application routes:

/dashboard
/tasks
/knowledge-base
/mail-templates
/meetings
/defects
/projects
/automation
/activity-log

---

# 9. State Management

Use local component state whenever possible.

Use React Context only for:

* Theme
* Global Search
* Notifications

Avoid Redux, Zustand or other complex state libraries.

---

# 10. Global Search

Global search should search across:

* Tasks
* Notes
* Templates
* Meetings
* Defects
* Projects

Search should be performed entirely in memory.

No external search engine required.

Keyboard Shortcut:

Ctrl + K

---

# 11. Activity Logging

Activity logs must be automatically generated.

Examples:

* Task Created
* Task Updated
* Note Added
* Meeting Created
* Defect Logged

Activity logs are read-only.

Users cannot edit them.

---

# 12. Backup & Restore

Export:

Entire IndexedDB → JSON file

Import:

JSON file → Restore IndexedDB

User should be able to backup data periodically.

No cloud backup.

---

# 13. Editing Experience

Avoid excessive modal usage.

Preferred patterns:

* Right-side drawer
* Full-page editor
* Inline editing

---

# 14. Rich Text Areas

Use Tiptap editor for:

* Knowledge Base
* Meeting MOM
* RCA
* Learning Notes
* Detailed Notes

Support:

* Headings
* Lists
* Images
* Code blocks
* Tables
* Links

---

# 15. Theme

Dark mode is default.

Theme preference should persist in localStorage.

Support:

* Dark Mode
* Light Mode

---

# 16. Performance Goals

Application should feel instantaneous.

Target:

* Initial load < 2 seconds
* Navigation < 200ms
* Search results < 300ms

Use lazy loading for routes when appropriate.

Since data volume is relatively small, optimize for simplicity over complexity.
