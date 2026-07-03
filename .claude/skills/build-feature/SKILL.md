---
name: build-feature
description: Plans and implements a feature or task completely, following project conventions, with no duplicate files and build-verified correctness. Use when the user wants to build, implement, or complete a specific feature.
---

# Build Feature — plan, confirm, implement, verify

## Step 1 — Understand before planning
Read docs/CLAUDE.md and docs/current_task.md as background context, not
assumed-accurate status. Read the actual relevant source files yourself —
do not trust prior session summaries or plan files as current truth without
spot-checking them.

## Step 2 — Search before creating
Before proposing any new file, search the codebase for existing
files/components/services that already do this or something similar.
Prefer extending or refactoring an existing file over creating a new one.
If a new file is genuinely necessary, state exactly why in the plan.

## Step 3 — Propose a plan, then stop
Present:
- What the feature requires, in plain terms
- Exactly which files will be created vs. modified (and why, per Step 2)
- The approach — reusing existing patterns/helpers/state wherever possible
- Anything ambiguous or requiring a decision

Do not write code yet. Wait for explicit approval.

## Step 4 — Implement in one continuous pass
Once approved, implement the whole feature without stopping for
check-ins, unless you hit something genuinely ambiguous that wasn't
covered in the plan. Stay strictly within the approved file list —
if you find you need to touch something not in the plan, stop and ask.

## Step 5 — Verify by actually running the build, not by reading
Never declare something working based on reading the code. You must:
1. Run the project's type-check command (e.g. `npx tsc --noEmit`) — show
   the actual output.
2. Run the build command (e.g. `npm run build`) — show the actual output.
3. Only report success if both actually pass, with evidence shown.
If either fails, fix and re-run until both pass cleanly before reporting.

## Step 6 — Report cleanly
End with:
- Files created / modified (should match the approved plan exactly)
- Confirmation both type-check and build passed, with output shown
- Anything the user should manually verify in the browser (things you
  cannot check yourself, e.g. visual rendering, browser console errors)

## What this skill requires as input
$ARGUMENTS