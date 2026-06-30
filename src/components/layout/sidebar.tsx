import React from 'react'
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react'
import { SidebarNav } from './sidebar-nav'
import { sidebarClasses, sidebarToggleClasses } from '@/app/layout-styles'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

/**
 * Application Sidebar
 *
 * The sidebar provides persistent navigation for the application and can be
 * collapsed to show only icons, saving horizontal space. It features a header
 * section with app branding and toggle button, followed by navigation items.
 *
 * Responsibilities:
 * - Display application branding and navigation toggle
 * - Show navigation menu with icons and text labels
 * - Handle expand/collapse state with smooth transitions
 * - Provide visual feedback for active navigation items
 * - Maintain consistent width and styling
 * - Respond to user interactions for collapsing/expanding
 *
 * Design Features:
 * - Header section: App logo/name + collapse/expand toggle
 * - Navigation menu: Vertical list of section links
 * - Flexible width: Changes between expanded (full) and collapsed (icon-only) states
 * - Smooth transition: Animated width changes using CSS transitions
 * - Dark mode: Proper color adaptation using tailwind dark: variants
 * - Hover effects: Visual feedback on interactive elements
 * - Active route highlighting: Clear indication of current location
 *
 * Props:
 * - isCollapsed: Boolean indicating if sidebar is collapsed
 * - onToggle: Function to call when toggle button is clicked
 *
 * Structure:
 * - Outer container: Applies width and transition styles
 * - Inner content: Flex column with header and navigation sections
 * - Header section: App branding and toggle button (top)
 * - Navigation section: Vertical menu items (middle)
 * - No footer section (toggle moved to top per requirements)
 */
export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      className={`${sidebarClasses.base} ${sidebarClasses.transition} ${!isCollapsed ? sidebarClasses.width.expanded : sidebarClasses.width.collapsed}`}
      aria-label="Main navigation"
    >
      <div className="flex h-full flex-col">
        {/* Sidebar Header: Branding & Toggle Button */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {/* App Logo/Branding */}
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
            <span className={`${isCollapsed ? 'hidden' : 'block'} font-semibold text-gray-900 dark:text-gray-100`}>
              QA Nexus
            </span>
          </div>

          {/* Collapse/Expand Toggle Button (MOVED TO TOP PER REQUIREMENTS) */}
          <button
            onClick={onToggle}
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

        {/* Navigation Menu */}
        <nav className="flex-1 pt-4">
          <SidebarNav isCollapsed={isCollapsed} />
        </nav>
      </div>
    </aside>
  )
}