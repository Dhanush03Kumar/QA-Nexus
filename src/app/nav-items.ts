import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  Mail,
  Calendar,
  AlertTriangle,
  Folder,
  Zap,
  Activity,
  Settings
} from 'lucide-react'

/**
 * Navigation Configuration
 *
 * This file defines the structure of the application's sidebar navigation.
 * Each entry represents a top-level section of the application that users
 * can navigate to.
 *
 * By keeping this configuration separate from the UI components, we make
 * it easy to:
 * - Modify the navigation structure without touching components
 * - Reuse the same configuration in different contexts (e.g., mobile menu)
 * - Clearly see all available routes in one place
 *
 * Each navigation item requires:
 * - label: Display text for the navigation item
 * - path: Route path for navigation (must match routes in routes.tsx)
 * - icon: Lucide icon component for visual representation
 *
 * The order of items in this array determines their appearance in the sidebar
 * from top to bottom.
 */
export const navItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: ClipboardList,
  },
  {
    label: 'Knowledge Base',
    path: '/knowledge-base',
    icon: BookOpen,
  },
  {
    label: 'Mail Templates',
    path: '/mail-templates',
    icon: Mail,
  },
  {
    label: 'Meetings',
    path: '/meetings',
    icon: Calendar,
  },
  {
    label: 'Defects',
    path: '/defects',
    icon: AlertTriangle,
  },
  {
    label: 'Projects & Releases',
    path: '/projects-releases',
    icon: Folder,
  },
  {
    label: 'Automation Hub',
    path: '/automation',
    icon: Zap,
  },
  {
    label: 'Activity Log',
    path: '/activity-log',
    icon: Activity,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]