import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SidebarNav } from './sidebar-nav'
import { sidebarClasses, sidebarToggleClasses } from '@/app/layout-styles'

/**
 * Application Sidebar
 *
 * The sidebar provides persistent navigation for the application and can be
 * collapsed to save horizontal screen space. It contains the navigation menu
 * and controls for expanding/collapsing the sidebar.
 *
 * Responsibilities:
 * - Display application navigation menu
 * - Handle expand/collapse state with smooth transitions
 * - Provide visual feedback for active navigation items
 * - Maintain consistent width and styling
 * - Respond to user interactions for collapsing/expanding
 *
 * Design Features:
 * - Flexible width that changes between expanded and collapsed states
 * - Smooth transition between states using CSS transitions
 * - Dark mode support via tailwind dark: variants
 * - Hover effects on navigation items
 * - Active route highlighting
 *
 * State Management:
 * - Uses local useState to track collapsed/expanded state
 * - State is not persisted (resets on page reload) - this keeps
 *   the implementation simple as requested
 *
 * Structure:
 * - Outer container applies width and transition styles
 * - Inner content holds the navigation and toggle button
 * - Toggle button positioned at bottom of sidebar
 */
export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`${sidebarClasses.base} ${sidebarClasses.transition} ${sidebarClasses.width.expanded} ${!isCollapsed ? sidebarClasses.width.expanded : sidebarClasses.width.collapsed}`}
      aria-label="Main navigation"
    >
      <div className="flex h-full flex-col">
        {/* Navigation Menu */}
        <nav className="flex-1 pt-4">
          <SidebarNav />
        </nav>

        {/* Collapse/Expand Toggle */}
        <div className="mt-auto pb-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={sidebarToggleClasses.base}
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            title={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            {isCollapsed ? (
              // Expand icon - chevron right
              <ChevronRight className="h-4 w-4" />
            ) : (
              // Collapse icon - chevron left
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}