# Sprint 9.2B — Wrap Existing TaskForm in Dialog

## Objective
Use the reusable Dialog component added in Sprint 9.1.1.

## Files to modify
- src/features/tasks/pages/task-table.tsx

## Changes

1. Wrap the existing TaskForm with:
   - DialogRoot
   - DialogContent

2. Reuse the existing state that currently controls opening the TaskForm.
   - Do NOT create new state.
   - Do NOT create new handlers.

3. Keep the existing New Task button behavior.
   - Clicking "New Task" should still perform exactly the same action.
   - The only difference is that the TaskForm appears inside DialogContent instead of wherever it currently renders.

4. Do not modify TaskForm.

5. Do not modify services.

6. Do not modify database logic.

7. Do not add React Hook Form.

8. Do not add Zod.

9. Do not redesign the UI.

10. Stop after the dialog opens successfully.

## Files not to touch

- src/features/tasks/components/task-form.tsx
- src/lib/*
- src/features/tasks/services/*
- src/components/ui/*
- Any other feature

## Verification

- Clicking "New Task" opens the Dialog.
- TaskForm is rendered inside DialogContent.
- Closing the dialog restores the previous behavior.
- No CRUD logic added.
- No form changes.
- Stop after this.