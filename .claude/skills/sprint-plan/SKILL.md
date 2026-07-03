---
name: sprint-plan
description: Plans a sprint task without writing code. Reads CLAUDE.md and docs/current_task.md, inspects relevant existing code, and produces an implementation plan for review. Use when the user wants to start a new sprint task, asks to plan an implementation, or types /sprint-plan.
---

# Sprint Task Planning

Follow these steps in order:

1. Read `docs/CLAUDE.md` and `docs/current_task.md` to understand what needs to be built.
2. Inspect the existing, relevant code in the codebase (search for related components, hooks, types, or files already touching this feature).
3. Produce an implementation plan that includes:
   - **Summary**: what is being built, in 2-3 sentences
   - **Files to edit/create**: exact file paths
   - **Approach**: how you'll build it with minimal code, reusing existing patterns/components where possible
   - **Risks/unknowns**: anything ambiguous or that needs a decision

4. Do NOT write, edit, or create any code or files.
5. Stop after presenting the plan and wait for explicit approval before implementing anything.