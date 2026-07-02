# Sprint 8.1 — Activity Log Skeleton

## Objective

Create a UI-only skeleton for the Activity Log feature.

This sprint is only for visual structure.
No business logic, APIs, IndexedDB, React Query, localStorage, dialogs, exports, pagination, filtering logic, or timeline calculations.

---

## Requirements

Build a page containing:

- Header
- Subtitle
- Disabled Search input
- Disabled Activity Type filter
- Disabled Date Range filter
- Disabled Export button
- Responsive list/timeline of realistic QA activity entries
- Static placeholder data only
- Consistent styling with all previously completed modules

---

## Rules

- Reuse existing shared UI components.
- Do not create reusable ActivityCard components.
- Keep everything inside activity-log.page.tsx.
- No CRUD.
- No dialogs.
- No state.
- No hooks.
- No services.
- No storage.
- No APIs.

---

## Files to Create

src/features/activity-log/pages/activity-log.page.tsx

---

## Files to Modify

src/app/routes.tsx

Replace:

<FuturePage feature="Activity Log" />

with

<ActivityLogPage />

---

## Files NOT to Modify

Everything else.

---

## Definition of Done

- Page renders successfully.
- Route works.
- Uses static placeholder data.
- Layout matches the design language of all previous feature skeletons.
- Responsive.
- Zero business logic.