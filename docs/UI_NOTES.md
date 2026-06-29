# Personal QA Workspace - UI Notes

# Source of Truth

Figma PNG exports located under:

/designs

are the primary source of truth for UI implementation.

Claude should follow the PNG designs closely.

---

# Design Philosophy

Application style should resemble:

* Notion
* Linear
* Modern productivity applications

Primary goals:

* Minimal
* Clean
* Fast
* Productivity focused

Avoid enterprise dashboard clutter.

---

# Layout Structure

Application consists of:

1. Left Sidebar
2. Top Navigation Bar
3. Main Content Area

---

# Sidebar Navigation

Sidebar contains:

* Dashboard
* Tasks
* Knowledge Base
* Mail Templates
* Meetings
* Defects
* Projects & Releases
* Automation Hub
* Activity Log

Sidebar should support collapse.

---

# Top Navigation

Contains:

* Global Search
* Quick Add Button
* Notifications
* Theme Switch

Quick Add should be available globally.

---

# Editing Pattern

Preferred editing experiences:

1. Right-side Drawer
2. Full-page Editor
3. Inline Editing

Avoid excessive modal dialogs.

---

# Tables

Use tables for:

* Tasks
* Defects
* Action Items

Requirements:

* Sortable columns
* Search support
* Empty states

---

# Cards

Use cards for:

* Dashboard Widgets
* Projects
* Templates
* Knowledge Base Entries

Cards should have subtle hover effects.

---

# Rich Text Pages

Knowledge Base and MOM pages should use:

Full-page editor layout.

Inspired by Notion.

---

# Status Colors

Priority Colors:

Critical → Red
High → Orange
Medium → Yellow
Low → Gray

Task Status:

To Do → Gray
In Progress → Blue
Blocked → Red
Completed → Green

Project Status:

Planning → Blue
Active → Green
Completed → Gray
Paused → Orange

---

# Animations

Use subtle animations only.

Examples:

* Hover effects
* Drawer transitions
* Card elevation

Avoid heavy animations.

---

# Floating Action Button

Provide floating Quick Add button on pages where appropriate.

Examples:

* Dashboard
* Knowledge Base
* Automation Hub

---

# Empty States

Every page must provide meaningful empty states.

Example:

"No tasks available. Create your first task."

---

# Responsiveness

Primary target:

Desktop Laptop Screens.

Typical resolutions:

1366x768
1920x1080

Mobile responsiveness is optional.

Tablet responsiveness is optional.

---

# Accessibility

Ensure:

* Keyboard navigation
* Focus indicators
* Sufficient contrast
* Accessible labels

---

# Avoid

* Multi-step wizards
* Deep nested navigation
* Enterprise-style metrics overload
* Unnecessary popups
* Complex dashboards
* Excessive scrolling
