# Phase 1: Application Shell - Implementation Plan

## Overview
We will create the main application layout with a collapsible sidebar, top navigation bar, and main content area. We'll set up React Router with placeholder pages for all modules and implement a theme switcher.

## Components to Create

### 1. Layout Structure
- `src/app/layout.tsx`: Root layout component that combines Sidebar, Header, and main content area
- `src/app/routes.tsx`: Route definitions for all modules using lazy loading
- `src/app/theme-provider.tsx`: React Context for managing light/dark theme

### 2. Layout Components
- `src/components/layout/Sidebar.tsx`: 
  - Collapsible sidebar with expand/collapse functionality
  - Navigation items for each module (Dashboard, Tasks, etc.)
  - Active route highlighting
  - Smooth transition animations
  - Responsive behavior (collapsible to icon-only on desktop, hidden on mobile with hamburger menu)
  - Uses Lucide React for icons

- `src/components/layout/Header.tsx`:
  - Top navigation bar
  - Application title/logo
  - Theme switcher toggle (Light/Dark mode)
  - Space for future user controls/notifications

- `src/components/layout/NavItem.tsx` (optional):
  - Individual navigation item component for reuse in Sidebar

### 3. Theme Management
- Theme context using React Context (allowed per CLAUDE.md for Theme)
- Stores theme preference in localStorage for persistence
- Provides theme to entire application via ThemeProvider
- Theme switcher in Header toggles between light and dark
- Tailwind CSS uses `dark:` variants for dark mode styling

### 4. Routing Setup
- React Router v6 with `<BrowserRouter>`
- Lazy loading for each feature page to improve initial load time
- Route paths:
  - `/` → Dashboard
  - `/tasks` → Tasks
  - `/knowledge-base` → Knowledge Base
  - `/mail-templates` → Mail Templates
  - `/meetings` → Meetings
  - `/defects` → Defects
  - `/projects-releases` → Projects & Releases
  - `/automation` → Automation Hub
  - `/activity-log` → Activity Log
  - `/settings` → Settings
  - `*` → NotFound page

### 5. Placeholder Pages
For each module, we'll create a simple placeholder component in the feature's directory:
- `src/features/dashboard/DashboardPage.tsx`
- `src/features/tasks/TasksPage.tsx`
- etc.

Each placeholder will contain:
- Module title
- Brief description
- Visual indicator that this is a placeholder
- No business logic (just static UI)

### 6. Styling Approach
- Tailwind CSS for utility-first styling
- shadcn/ui components for buttons, toggles, etc. (we'll initialize shadcn/ui in this phase)
- Lucide React for icons
- Consistent spacing system (using Tailwind's default spacing)
- Dark mode support via Tailwind's `dark:` variants
- Smooth transitions for sidebar collapse/expand

### 7. State Management
- **Sidebar state**: Local state in Layout component (collapsed/expanded)
- **Theme state**: React Context (ThemeProvider) with localStorage persistence
- **No global state** for feature data (to be implemented in later phases with Dexie.js)

### 8. Interaction Between Modules
- Layout components (Sidebar, Header) are completely independent of feature modules
- Sidebar only knows about route paths for navigation
- Theme context is consumed by any component that needs to know the theme
- Feature modules are isolated and only interact via routing

## Files to Be Created

```
src/
├── app/
│   ├── layout.tsx
│   ├── routes.tsx
│   └── theme-provider.tsx
├── components/
│   └── layout/
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       └── NavItem.tsx
├── features/
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   ├── tasks/
│   │   └── TasksPage.tsx
│   ├── knowledge-base/
│   │   └── KnowledgeBasePage.tsx
│   ├── mail-templates/
│   │   └── MailTemplatesPage.tsx
│   ├── meetings/
│   │   └── MeetingsPage.tsx
│   ├── defects/
│   │   └── DefectsPage.tsx
│   ├── projects-releases/
│   │   └── ProjectsReleasesPage.tsx
│   ├── automation/
│   │   └── AutomationPage.tsx
│   ├── activity-log/
│   │   └── ActivityLogPage.tsx
│   └── settings/
│       └── SettingsPage.tsx
└── ... (existing structure from Phase 0)
```

## How to Verify
After implementation, running `npm run dev` should show:
1. Application layout with sidebar, header, and main content
2. Sidebar with navigation items and icons
3. Theme switcher in header
4. Clicking navigation items changes the URL and shows the corresponding placeholder page
5. Sidebar collapse/expand functionality works
6. Theme persists between page reloads
7. Responsive behavior (sidebar adapts to screen size)

## Compliance with CLAUDE.md
- ✅ No backend (pure frontend)
- ✅ Local-first approach (theme stored in localStorage, future data in IndexedDB)
- ✅ Beginner-friendly code with detailed comments in every file
- ✅ Minimal necessary abstractions
- ✅ Feature-based architecture maintained
- ✅ No business logic in Phase 1 (only placeholder pages)
- ✅ Readability and maintainability prioritized
- ✅ Uses approved stack (React, TypeScript, Vite, Tailwind, shadcn/ui, Lucide Icons, React Router)