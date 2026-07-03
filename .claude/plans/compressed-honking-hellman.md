# Onboarding Findings and Task Dialog UI Plan

## Codebase Structure Overview

**Project Root:**
- `/src` - Main application code
- `/Design` - UI mockups (PNG files)
- `/docs` - Documentation (CLAUDE.md, current_task.md)
- `/node_modules` - Dependencies
- `/dist` - Built output

**Architecture (per CLAUDE.md):**
- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui + Lucide icons
- **State Management:** Local component state (Context only for Theme/Notifications/Global Search)
- **Data Layer:** IndexedDB + Dexie
- **Forms:** React Hook Form + Zod
- **Routing:** React Router

**Key Dependencies:**
- `@tanstack/react-table` (implied by table implementation)
- `dexie` for IndexedDB wrapper
- `lucide-react` for icons
- Various UI components from `@/components/ui/*`

## Current State of Task Dialog UI

**File Examined:** `src/features/tasks/pages/tasks.page.tsx`

**What's IMPLEMENTED (per current_task.md requirements):**
✅ Data fetching from `taskService.getTasks()` via `useEffect`
✅ Loading state display ("Loading..." message)
✅ Error state handling
✅ Empty state display ("No tasks found." message)
✅ Task table populated with real data from service
✅ Summary cards updated with calculated values:
   - Total Tasks: `tasks.length`
   - Open Tasks: count where status !== 'completed'
   - In Progress: count where status === 'in-progress'
   - Completed: count where status === 'completed'
✅ Existing non-functional UI preserved (filter toolbar, search, sort as static)

**What's MISSING / NOT YET COMPLIANT:**
❌ **Task Details Panel** still shows hardcoded placeholder data instead of dynamic data from `tasks[0]`:
   - Title: Hardcoded "Login validation test"
   - Status: Hardcoded "Done" badge
   - Priority: Hardcoded "Medium" badge
   - Due Date: Hardcoded "Jun 28, 2026"
   - Assignee: Hardcoded "Alex Morgan"
   - Tags: Hardcoded ["UI", "Validation", "Form"]
   - Description: Hardcoded text

**Database & Service Layer:**
- `src/features/tasks/services/task.service.ts` - Fully functional with Dexie-backed CRUD operations
- `src/lib/database.ts` - Proper Dexie setup with Task interface and all required fields
- Service returns `{ tasks: Task[], total: number }` as expected

## Implementation Plan: Complete Task Dialog UI

**Goal:** Make Task Details Panel show real data from `tasks[0]` when available, per current_task.md Section 5.

**Changes Needed ONLY in:** `src/features/tasks/pages/tasks.page.tsx`

### Specific Modifications:

1. **Replace hardcoded task details with dynamic data mapping:**
   - When `tasks.length > 0`: Show data from `tasks[0]`
   - When `tasks.length === 0`: Show empty/placeholder state (muted text/hidden fields)

2. **Fields to make dynamic (using existing helper functions):**
   - Title: `{tasks[0]?.title || ''}`
   - Status: Use `formatStatus(tasks[0]?.status)` with `getStatusBgColor/TextColor`
   - Priority: Use `formatPriority(tasks[0]?.priority)` with `getPriorityBgColor/TextColor`
   - Due Date: `{tasks[0]?.dueDate ? tasks[0].dueDate.toLocaleDateString(...) : ''}`
   - Assignee: *(Note: Assignee not in Task interface - may need to show placeholder or handle missing field)*
   - Tags: Map `tasks[0]?.tags || []` to badge elements
   - Description: `{tasks[0]?.description || ''}`

3. **Preserve all existing:
   - HTML structure and classNames
   - Accessibility attributes
   - Component hierarchy
   - Styling approach (Tailwind utilities only)**

### Implementation Approach:
- Use conditional rendering based on `tasks.length`
- Reuse existing helper functions (`formatStatus`, `getStatusBgColor`, etc.) for consistency
- Handle undefined/null values gracefully with fallback placeholders
- Follow ponytail principle: minimal changes, reuse existing patterns

### Files to Modify:
- **Only:** `src/features/tasks/pages/tasks.page.tsx` (as specified in current_task.md)

### No Cleanup Needed:
- No dead code to remove
- No inconsistent patterns to fix
- No architectural changes required
- Current implementation follows CLAUDE.md principles well

### Verification Steps:
1. Confirm tasks load from service and populate table
2. Verify task details panel updates when tasks array changes
3. Check empty state shows appropriate placeholder in details panel
4. Ensure loading/error states don't break details panel
5. Validate all existing table/summary card functionality remains intact
6. Confirm no TS/Eslint errors introduced
7. Verify UI matches Design/Tasks.png mockup structure

## Risk Assessment
- **Low risk:** Changes confined to single file, reusing existing patterns
- **No breaking changes:** Preserves all existing structure and styling
- **Performance:** No impact (same data already fetched for table)
- **Edge cases handled:** Empty/null field fallbacks using existing patterns

## Why This Approach Follows Ponytail/Lazy Principles:
1. **Reuse existing:** Uses same state variables (`tasks`, `loading`, `error`) already fetched for table
2. **Reuse helpers:** Leverages existing formatting/helper functions
3. **Minimal delta:** Only touches the specific non-compliant section (task details panel)
4. **Stdlib first:** Uses native JS/TS features (optional chaining, array methods)
5. **YAGNI:** Doesn't implement disallowed features (dialogs, forms, search, etc.)
6. **One file:** Limits changes to only the specified file per current_task.md