import React from 'react'
import { NavLink } from 'react-router-dom'

// Import icons for navigation items
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

import { SidebarItem } from './sidebar-item'
import { navItems } from '@/app/nav-items'

/**
 * Sidebar Navigation Container
 *
 * This component renders the vertical navigation menu containing all
 * application sections. It maps over the navigation items defined in
 * nav-items.ts and renders each as a SidebarItem.
 *
 * Responsibilities:
 * - Provide container for navigation items with proper spacing
 * - Map navigation configuration to UI components
 * - Maintain consistent styling and spacing
 * - Handle active route indication through SidebarItem
 *
 * Design:
 * - Vertical list of navigation items
 * - Consistent height and spacing for each item
 * - No borders or dividers between items (clean look)
 * - Full width of sidebar container
 *
 * The navigation structure is defined in nav-items.ts to keep
 * configuration separate from presentation.
 */
export const SidebarNav = () => {
  return (
    <nav className="mt-6 space-y-1">
      {navItems.map((item) => (
        <SidebarItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          to={item.path}
        />
      ))}
    </nav>
  )
}