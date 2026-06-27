---
name: phase-0-explanation
description: Explanation of folder structure, routing, and scalability
metadata:
  type: reference
#

# Phase 0: Foundation Setup - Explanation

## Created Folder Structure

Following the CLAUDE.md guidelines, we implemented a feature-based architecture:

```
src/
├── app/                    # Application-level components
│   ├── layout.tsx          # Root layout (header, footer, etc.)
│   ├── routes.tsx          # Application route definitions
│   └── providers/          # React context providers (theme, notifications, etc.)
├── assets/                 # Static assets (images, icons, fonts)
├── components/             # Reusable UI components
│   ├── ui/                 # Customized shadcn/ui components
│   ├── layout/             # Layout components (header, footer, sidebar)
│   └── widgets/            # Small reusable widgets for dashboards
├── features/               # Feature modules (domain-driven design)
│   ├── dashboard/          # Dashboard overview
│   ├── tasks/              # Task management
│   ├── knowledge-base/     # Personal knowledge repository
│   ├── mail-templates/     # Email template management
│   ├── meetings/           # Meeting scheduling and minutes
│   ├── defects/            # Defect tracking and analysis
│   ├── projects-releases/  # Project and release tracking
│   ├── automation/         # Automation-related information
│   └── activity-log/       # Audit trail of user actions
├── hooks/                  # Custom React hooks shared across features
├── lib/                    # Library code (database, services, utilities)
│   ├── database/           # Dexie.js configuration and schema
│   ├── services/           # Service modules for data access
│   └── utils.ts            # Shared utility functions
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions and helpers
└── styles/                 # Global styles and CSS configuration
```

Each directory contains a README.md file explaining its purpose, following the requirement for detailed comments.

## Routing Configuration

Routing is configured using React Router v6 in `src/app/routes.tsx` (currently a placeholder). The setup includes:

1. **Router Provider**: Wrapped in the root layout
2. **Route Structure**: Each feature will have its own route path
3. **Lazy Loading**: Features will be loaded lazily for better performance
4. **Absolute Imports**: Using `@/` alias for clean imports

Example route structure (to be implemented in Phase 1):
```tsx
<Router>
  <Layout>
    <Routes>
      <Route path="/" element=<DashboardPage /> />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
      {/* ... other feature routes */}
    </Routes>
  </Layout>
</Router>
```

## Scalability for New Modules

The architecture is designed to scale horizontally as new features are added:

1. **Feature Isolation**: Each new module follows the same pattern:
   - Create a folder under `src/features/` (e.g., `new-feature/`)
   - Add components, hooks, types, and UI elements specific to that feature
   - Add route in `src/app/routes.tsx`

2. **Shared Resources**:
   - Reusable components go in `src/components/`
   - Shared hooks in `src/hooks/`
   - Shared utilities in `src/lib/` and `src/utils/`
   - Global styles in `src/styles/`

3. **Consistent Patterns**:
   - Each feature manages its own state (local component state or feature-specific hooks)
   - Features communicate through events or global context only when necessary (theme, notifications, global search)
   - Database access follows the same pattern per feature (Dexie tables or helper functions)

4. **Maintainability Benefits**:
   - Easy to locate feature-related code
   - Clear boundaries reduce coupling
   - New developers can understand one feature without needing to understand the entire application
   - Testing can be feature-focused

This structure supports the application's growth while maintaining code readability and simplicity as required in CLAUDE.md.