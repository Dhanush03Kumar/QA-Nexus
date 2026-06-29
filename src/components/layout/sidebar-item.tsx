import React from 'react'
import { NavLink } from 'react-router-dom'
import { navItemClasses } from '@/app/layout-styles'

interface SidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  to: string
  isActive?: boolean
  isCollapsed?: boolean
}

/**
 * Sidebar Navigation Item
 *
 * Represents a single navigable item in the application sidebar.
 * Each item consists of an icon and text label, and can be active
 * or inactive based on the current route.
 *
 * This component is used by SidebarNav to build the navigation menu.
 * It handles highlighting the active route and provides hover states.
 *
 * Responsibilities:
 * - Display icon and label for navigation item
 * - Apply active styling when route matches
 * - Provide hover states for visual feedback
 * - Navigate to specified route when clicked
 * - Hide text label when sidebar is collapsed (icon-only mode)
 *
 * Design Improvements:
 * - Enhanced active state with left border indicator
 * - Improved hover feedback with better contrast
 * - Consistent spacing and sizing for touch targets
 * - Clear visual hierarchy between active and inactive states
 * - Hide text when collapsed for icon-only sidebar mode
 * - Accessible via NavLink for proper routing and focus management
 *
 * Visual Design:
 * - Horizontal layout: Icon (left) | Text (right)
 * - When collapsed: only icon visible (text hidden)
 * - Active item: Left border + background tint + text emphasis
 * - Inactive item: Subtle hover background change
 * - Padding: Adequate touch target size (min 44x44px)
 * - Transitions: Smooth color/background changes
 */
export const SidebarItem = ({
  icon: Icon,
  label,
  to,
  isActive = false,
  isCollapsed = false,
}: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive: isRouteActive }) =>
        `${navItemClasses.base} ${
          (isActive ?? isRouteActive)
            ? `${navItemClasses.active} border-l-2 border-primary pl-3`
            : navItemClasses.inactive
        }`}
    >
      <div className="flex-shrink-0 h-5 w-5">
        <Icon className="h-4 w-4" />
      </div>
      {!isCollapsed && (
        <span className="ml-3">{label}</span>
      )}
    </NavLink>
  )
}