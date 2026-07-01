# CLAUDE.md

# QA Nexus - Personal QA Workspace

## Mission

You are contributing to an existing production-quality project.

Your job is NOT to redesign or rearchitect the application.

Your job is to implement exactly what is requested while preserving the existing architecture and design.

Think like a senior software engineer making a small pull request.

---

# Project Overview

QA Nexus is a Personal QA Workspace.

It is a local-first productivity application built specifically for one QA Engineer.

It replaces:

- Personal Notes
- Sticky Notes
- OneNote
- Mail Templates
- Meeting Notes
- Defect Notes
- SQL Snippets
- Testing Knowledge

It DOES NOT replace:

- Jira
- Azure DevOps
- TestRail
- Confluence

---

# Project Principles

Always prioritize

1. Simplicity
2. Maintainability
3. Readability
4. Consistency

Never optimize for thousands of users.

This application has only ONE user.

Avoid enterprise architecture.

---

# Tech Stack

Frontend

- React
- TypeScript
- Vite

UI

- Tailwind CSS
- shadcn/ui
- Lucide Icons

Storage

- IndexedDB
- Dexie

Forms

- React Hook Form
- Zod

Routing

- React Router

---

# Design Source of Truth

The design images located inside

/designs

are the source of truth.

When implementing pages

Follow the designs as closely as possible.

Do not redesign the UI unless explicitly instructed.

---

# Development Philosophy

Prefer

- Small changes
- Small pull requests
- Small commits

Avoid

- Massive refactoring
- Rewriting working code
- Unnecessary abstractions
- Premature optimization
- Fancy code

Always choose

Simple > Clever

Readable > Smart

Maintainable > Generic

---

# Golden Rules

## Rule 1

Only modify files required for the task.

Never refactor unrelated code.

---

## Rule 2

Never rewrite an existing component unless explicitly requested.

Improve it incrementally.

---

## Rule 3

Never rename files unless asked.

---

## Rule 4

Never move files between folders unless instructed.

---

## Rule 5

Never introduce new libraries without justification.

Use existing project dependencies whenever possible.

---

## Rule 6

Do not create abstractions for future possibilities.

Only abstract after the same logic appears at least three times.

---

## Rule 7

Avoid generic helper functions that are only used once.

---

## Rule 8

Do not create custom hooks unless the logic is shared across multiple components.

---

## Rule 9

Prefer local component state.

Use Context only for

- Theme
- Notifications
- Global Search

Do not introduce Redux, Zustand or other state libraries.

---

## Rule 10

Always preserve the current folder structure.

---

# UI Guidelines

The application should feel like

- Linear
- Notion
- Raycast
- GitHub Desktop

Characteristics

- Minimal
- Professional
- Spacious
- Clean
- Fast

---

# Design Rules

Use

- 8px spacing system
- Consistent border radius
- Consistent typography
- Existing color palette

Avoid

- Random spacing
- Random colors
- Random font sizes

---

# Components

Prefer reusable components.

Examples

Good

TaskTable

TaskDrawer

TaskForm

PageHeader

Badge

DataTable

Drawer

Card

Avoid

TaskTableV2

TaskTableNew

TaskComponentBase

UniversalManager

MegaComponent

---

# Component Size

Aim for

150–250 lines

Split only when it improves readability.

Do NOT split components excessively.

---

# Styling

Use

Tailwind utilities

Avoid

Inline styles

Hardcoded colors

Magic numbers

Duplicate utility classes

---

# Comments

Document

- Components
- Complex functions
- Business logic

Do not comment obvious code.

Comments should explain WHY not WHAT.

---

# Error Handling

Always consider

- Empty state
- Error state
- Loading state
- Invalid data
- Missing data

---

# Performance

Optimize only when necessary.

Do NOT use

- useMemo
- useCallback
- memo

unless there is a measurable benefit.

---

# Before Finishing

Always

- Check TypeScript errors
- Check lint errors
- Ensure imports are clean
- Remove unused code

---

# Response Format

When completing a task provide

## Summary

What changed

## Files Modified

List modified files

## Why

Explain architectural decisions

Keep explanations short.

Stop after completing the requested task.

Do not continue improving unrelated parts of the application.

---

# If Unsure

Stop.

Explain the options.

Ask before making architectural decisions.