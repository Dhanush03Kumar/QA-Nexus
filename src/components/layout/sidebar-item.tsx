import React from 'react'
import { NavLink } from 'react-router-dom'
import { navItemClasses } from '@/app/layout-styles'

interface SidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  to: string
  isActive?: boolean
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
 * - Handle hover states for visual feedback
 * - Navigate to specified route when clicked
 *
 * Design:
 * - Horizontal layout with icon on left, text on right
 * - Subtle hover background for non-active items
 * - Prominent accent background for active item
 * - Consistent sizing and spacing
 * - Accessible via NavLink for proper routing
 */
export const SidebarItem = ({
  icon: Icon,
  label,
  to,
  isActive = false,
}: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive: isRouteActive }) =>
        `${navItemClasses.base} ${
          (isActive ?? isRouteActive)
            ? navItemClasses.active
            : navItemClasses.inactive
        }`}
    >
      <div className="flex-shrink-0 h-5 w-5">
        <Icon className="h-4 w-4" />
      </div>
      <span className="ml-3">{label}</span>
    </NavLink>
  )
}