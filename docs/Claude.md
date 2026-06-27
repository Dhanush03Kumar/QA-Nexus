# CLAUDE.md

# Personal QA Workspace - Claude Development Instructions

You are developing a Personal QA Workspace application.

This is a personal productivity application for a Software QA Engineer.

The application will be used only by a single user on a company laptop.

The user is not an expert web developer.

Code readability and maintainability are extremely important.

---

# Project Goals

The application acts as a personal QA second brain.

It replaces:

* OneNote
* Personal trackers
* Sticky notes
* Personal mail templates
* Personal defect notes

The application DOES NOT replace Jira, TestRail or Confluence.

---

# Critical Constraints

## No Backend

Do NOT create:

* Node.js backend
* Express server
* NestJS server
* REST APIs
* GraphQL APIs

No backend is allowed.

---

## No Deployment

Do NOT add:

* Docker
* Kubernetes
* CI/CD
* Cloud configuration
* Deployment configuration

Application runs locally only.

---

## Local First

All data must remain on the user's machine.

Use:

IndexedDB + Dexie.js

only.

No other database is allowed.

---

# Approved Stack

Frontend:

* React
* TypeScript
* Vite

UI:

* Tailwind CSS
* shadcn/ui
* Lucide Icons

Storage:

* IndexedDB
* Dexie.js

Forms:

* React Hook Form
* Zod

Rich Text:

* Tiptap Editor

Tables:

* TanStack Table

Routing:

* React Router

---

# Design Source

PNG files located inside:

/designs

are the source of truth.

Implement screens as closely as possible to the provided designs.

Follow:

docs/UI_NOTES.md

for additional UX guidelines.

---

# Development Philosophy

Prefer:

* Readability
* Simplicity
* Maintainability

Avoid:

* Premature optimization
* Overengineering
* Complex abstractions
* Clever code

This project is maintained by a beginner/intermediate developer.

Code should be easy to understand.

---

# Documentation Requirements

This is extremely important.

Every generated file must contain explanatory comments.

Examples:

```ts
/**
 * TasksTable Component
 *
 * Displays all user tasks in a sortable table.
 *
 * Features:
 * - Sorting
 * - Search
 * - Row selection
 *
 * Clicking a row opens the Task Drawer.
 */
```

---

Every major function must contain comments.

Example:

```ts
/**
 * Creates a new task and saves it to IndexedDB.
 *
 * Steps:
 * 1. Validate form input.
 * 2. Generate UUID.
 * 3. Add timestamps.
 * 4. Save to Dexie store.
 */
```

---

Complex logic must always include inline comments.

Example:

```ts
// Filter only overdue tasks.
// A task is overdue when:
// - dueDate exists
// - task is not completed
// - dueDate is before current date
```

---

# Teaching Mode

While generating code:

Explain:

* Why a library is being used.
* Why a component exists.
* Why an architectural decision was made.

Whenever a new feature is implemented, provide a short explanation.

Example:

"Created a reusable Drawer component because multiple modules require side-panel editing."

---

# Folder Structure

Use feature-based architecture.

Example:

src/

app/
components/
features/
hooks/
lib/
services/
types/
utils/

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

---

# Component Guidelines

Prefer:

Small reusable components.

Examples:

Good:

* TaskTable
* TaskDrawer
* TaskForm

Avoid:

Large files exceeding 300 lines whenever possible.

Split components when necessary.

---

# State Management

Use local component state whenever possible.

Use React Context only for:

* Theme
* Notifications
* Global Search

Do not introduce Redux or complex state libraries.

---

# Styling Guidelines

Use:

Tailwind CSS + shadcn/ui

Follow existing design system.

Avoid inline styles.

Avoid hardcoded colors.

Use Tailwind utility classes.

---

# Forms

Use:

React Hook Form + Zod

for all forms.

Validation should always be implemented.

---

# Error Handling

Always handle:

* Empty states
* Missing data
* Invalid imports
* Corrupted backups

Never assume data exists.

---

# Loading States

Every async operation must include:

* Loading state
* Empty state
* Error state

Examples:

Loading tasks...

No tasks found.

Unable to load data.

---

# Activity Logging

Whenever data changes:

Automatically create Activity Log entries.

Examples:

Task Created
Task Updated
Note Deleted
Meeting Added

Users cannot edit Activity Logs.

---

# Backup

Implement:

Export JSON

Import JSON

before adding advanced features.

User data is important.

---

# Accessibility

Ensure:

* Keyboard navigation
* Focus states
* Accessible labels
* Proper semantic HTML

---

# Performance

Prefer simple solutions.

Optimize only when necessary.

Application data size is expected to remain small.

Readability is more important than micro-optimizations.

---

# If Unsure

Choose:

Simple > Complex

Readable > Clever

Maintainable > Optimized

Explain decisions clearly.
