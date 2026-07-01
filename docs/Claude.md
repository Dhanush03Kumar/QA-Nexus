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
`/designs` folder is source of truth — follow closely, don't redesign without explicit instruction. 8px spacing, consistent radius/typography/palette — no random spacing/colors/fonts.

## Rules
1. Only touch files required for the task — no unrelated refactoring
2. Don't rewrite existing components — improve incrementally
3. Don't rename files or move between folders unless asked
4. Don't add new libraries without justification — use existing deps
5. No premature abstraction — only abstract after 3+ repeats; no single-use helpers/hooks
6. Local component state preferred. Context only for Theme, Notifications, Global Search. No Redux/Zustand.
7. Preserve current folder structure
8. No useMemo/useCallback/memo unless measurable benefit
9. Before finishing: check TS errors, lint errors, clean imports, remove unused code

## UI feel
Like Linear / Notion / Raycast / GitHub Desktop — minimal, professional, spacious, fast.

## Components
Prefer reusable, clearly-named components (TaskTable, PageHeader, DataTable — not TaskTableV2, UniversalManager). Aim 150–250 lines; split only if it improves readability. Tailwind utilities only — no inline styles, hardcoded colors, magic numbers. Comment WHY not WHAT. Always handle empty/error/loading/invalid/missing states.

## Response format
Summary → Files Modified → Why (short). Stop after the requested task — don't touch unrelated parts.

## If unsure
Stop. Explain options. Ask before architectural decisions.