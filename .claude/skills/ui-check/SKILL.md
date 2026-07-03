---
name: ui-check
description: Compares a rendered feature's screenshot against its Figma reference and fixes styling gaps. Requires the user to provide a screenshot — cannot verify UI without one. Use after code-check passes and the user has tested the feature in browser.
---

# UI Check — visual correctness, screenshot-driven

This skill CANNOT run without the user providing a screenshot of the 
actual rendered page. Do not attempt to assess UI correctness by reading 
component code alone — Tailwind classes existing in code doesn't confirm
they're actually rendering correctly.

## Steps
1. Ask for (if not already provided): a screenshot of the current rendered 
   feature, and the corresponding Figma reference image.
2. Compare directly: spacing, colors, typography, component styling 
   (are shadcn/ui components actually being used, or plain HTML elements 
   with no classes?), layout structure.
3. List concrete gaps — not vague "needs polish," but specific: 
   "Input fields are unstyled — missing className, likely because the 
   component isn't importing/using the shared Input/Card components."
4. Fix only styling — className/Tailwind/component usage. Do not touch 
   logic, state, or data handling.
5. After fixing, tell the user exactly what to screenshot again to confirm.

## What to compare
$ARGUMENTS