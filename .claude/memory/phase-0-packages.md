---
name: phase-0-packages
description: Packages and explanation for Phase 0 setup
metadata:
  type: reference
---

# Phase 0: Project Setup - Packages and Explanation

## Packages to Install

### Core Dependencies
1. **React (react)** - Core library for building user interfaces
2. **React DOM (react-dom)** - Entry point for DOM operations
3. **TypeScript (typescript)** - For static type checking
4. **React TypeScript types (@types/react, @types/react-dom)** - TypeScript definitions for React

### Build Tools
5. **Vite (@vitejs/plugin-react)** - Next-generation frontend tooling for fast builds

### Styling
6. **Tailwind CSS (tailwindcss)** - Utility-first CSS framework
7. **PostCSS (postcss)** - Tool for transforming CSS with JavaScript
8. **Autoprefixer (autoprefixer)** - PostCSS plugin to parse CSS and add vendor prefixes

### UI Components
9. **shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS
10. **class-variance-authority (cva)** - Utility for creating component variants
11. **clsx** - Utility for constructing className strings conditionally
12. **tailwind-merge** - Utility for tailwind class merging to avoid conflicts

### Routing
13. **React Router (react-router-dom)** - Declarative routing for React applications

### Icons
14. **Lucide Icons (lucide-react)** - Simply beautiful open-source icons

## Why Each Package Is Required

### Core Dependencies
- **React/ReactDOM**: The foundation of our user interface. We're building a React application as specified in the approved stack.
- **TypeScript**: Required by the approved stack. Provides type safety which helps maintainability for a beginner/intermediate developer.
- **React TypeScript types**: Necessary for TypeScript to understand React component types and props.

### Build Tools
- **Vite**: Required by approved stack. Provides fast development server and build process.
- **@vitejs/plugin-react**: Enables React support in Vite.

### Styling
- **Tailwind CSS**: Required by approved stack. Provides utility-first styling that promotes consistency and rapid development.
- **PostCSS**: Required for processing Tailwind CSS directives.
- **Autoprefixer**: Automatically adds vendor prefixes to CSS rules for browser compatibility.

### UI Components
- **shadcn/ui**: Required by approved stack. Provides accessible, customizable components that follow modern design principles.
- **class-variance-authority**: Used by shadcn/ui to create component variants with different styles.
- **clsx**: Used by shadcn/ui and our components to conditionally apply CSS classes.
- **tailwind-merge**: Used by shadcn/ui to merge Tailwind classes without conflicts (important for class overrides).

### Routing
- **React Router**: Required by approved stack. Enables client-side routing for our single-page application.

### Icons
- **Lucide Icons**: Required by approved stack via shadcn/ui. Provides consistent, beautiful icons for our UI.

## Development Dependencies
These will be installed as devDependencies:
- @types/react
- @types/react-dom
- @vitejs/plugin-react
- typescript
- tailwindcss
- postcss
- autoprefixer

## Additional Configuration Files
We'll also need to create:
- tailwind.config.js - Configuration for Tailwind CSS
- postcss.config.js - Configuration for PostCSS
- tsconfig.paths.json - For absolute imports (we'll extend the base tsconfig.json)

This setup gives us a solid foundation that follows the approved stack and development philosophy.