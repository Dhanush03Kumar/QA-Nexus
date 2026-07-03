# CLAUDE.md — QA Nexus (Personal QA Workspace)

## Mission
Contributing to an existing production app. Implement exactly what's requested, preserve existing architecture/design. Act like a senior engineer making a small PR — never redesign or rearchitect unless asked.

## Project
Local-first QA workspace for ONE user (not multi-tenant). Replaces personal notes, sticky notes, OneNote, mail templates, meeting/defect notes, SQL snippets, testing knowledge. Does NOT replace Jira, Azure DevOps, TestRail, Confluence.

## Stack
React + TypeScript + Vite | Tailwind + shadcn/ui + Lucide | IndexedDB + Dexie | React Hook Form + Zod | React Router

## Principles
Simplicity > Maintainability > Readability > Consistency. No enterprise architecture — single user. Small changes/PRs/commits. Simple > Clever, Readable > Smart.

## Design
`/Design` folder is source of truth — follow closely, don't redesign without explicit instruction. 8px spacing, consistent radius/typography/palette — no random spacing/colors/fonts.
Note: Claude Code cannot see rendered browser output. Do not claim something
"matches the design" from reading component code alone — that can only be
confirmed by the user via screenshot (see /ui-check skill).

## Rules
1. Only touch files required for the task — no unrelated refactoring
2. Don't rewrite existing components — improve incrementally
3. Don't rename files or move between folders unless asked
4. Don't add new libraries without justification — use existing deps
5. No premature abstraction — only abstract after 3+ repeats; no single-use helpers/hooks
6. Local component state preferred. Context only for Theme, Notifications, Global Search. No Redux/Zustand.
7. Preserve current folder structure
8. No useMemo/useCallback/memo unless measurable benefit
9. Before declaring any task finished, you MUST run `npx tsc --noEmit` and
   `npm run build`, and paste the actual command output in your response.
   Never state "no errors" or "builds successfully" without that output
   shown in the same response. A build that fails means the task isn't done,
   regardless of how correct the code looks on read-through.
10. No task-tracking files. Do not create current_task.md, sprint docs, or
    any progress-log file. Feature work is tracked via git history and
    /build-feature plans only. If you feel the urge to log progress
    somewhere, don't — just report it in your response.

## Data & backups
This app is used across multiple machines and will go through versions.
Data lives only in browser IndexedDB — it does not travel with the code.
- Export/Import (backup to JSON / restore from JSON) is a core feature, not
  optional polish. Keep it working at all times.
- Any schema change to the Dexie database must bump the version number and,
  where feasible, include a migration — not silently require the user to
  clear their data. If a migration isn't feasible for a given change, say
  so explicitly and explain what the user needs to do.

## UI feel
Like Linear / Notion / Raycast / GitHub Desktop — minimal, professional, spacious, fast.

## Components
Prefer reusable, clearly-named components (TaskTable, PageHeader, DataTable — not TaskTableV2, UniversalManager). Aim 150–250 lines; split only if it improves readability. Tailwind utilities only — no inline styles, hardcoded colors, magic numbers. Comment WHY not WHAT. Always handle empty/error/loading/invalid/missing states.

## Available skills
Use these instead of ad-hoc prompting where they fit:
- `/build-feature` — plan → approve → implement → build-verify a new feature
- `/fix-error` — fix one specific pasted error, minimal scope
- `/code-check` — read-only build verification, no fixes
- `/ui-check` — compare rendered UI against Design folder (needs user screenshot)
- `/resume` — recover accurate state after a crash/timeout, before continuing

## Response format
Summary → Files Modified → Verification output (tsc + build, actual text) → Why (short). Stop after the requested task — don't touch unrelated parts.

## If unsure
Stop. Explain options. Ask before architectural decisions.

## File creation policy — STRICT
- Before creating any new file, search the codebase for existing files that
  already do this or something similar. Prefer extending/refactoring an
  existing file over creating a new one.
- Do NOT create a new component/page/util/service if one with similar
  purpose already exists, even under a different name. If you find one,
  ask whether to refactor it or explain why a new file is genuinely needed.
- Never create a second version of something that already exists
  (e.g. TaskTable, TaskTableV2, TaskTableNew, tasks-updated.tsx). If the
  existing implementation is wrong/incomplete, fix it in place — do not
  create a parallel version "to be safe."
- If a new file is genuinely necessary (new feature, no reasonable existing
  home for it), state why before creating it, as part of your plan/response.