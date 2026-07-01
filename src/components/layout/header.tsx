import React from 'react'
import { Menu, Search, Sun, Moon } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@/app/theme-provider'
import { headerClassNames } from '@/app/layout-styles'

/**
 * Route to Page Title Mapping
 *
 * Maps URL pathnames to human-readable page titles for display in the header.
 * This provides a dynamic title that updates based on the current route.
 */
const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/tasks': 'Tasks',
  '/knowledge-base': 'Knowledge Base',
  '/mail-templates': 'Mail Templates',
  '/meetings': 'Meetings',
  '/defects': 'Defects',
  '/projects-releases': 'Projects & Releases',
  '/automation': 'Automation Hub',
  '/activity-log': 'Activity Log',
  '/settings': 'Settings',
  // Default fallback
  default: 'QA Nexus'
}

/**
 * Get Page Title from Pathname
 *
 * @param pathname - Current URL pathname
 * @returns Human-readable page title
 */
const getPageTitle = (pathname: string): string => {
  return PAGE_TITLES[pathname] || PAGE_TITLES.default
}

/**
 * Application Header
 *
 * The header appears at the top of every page and contains:
 * - Application branding/logo area with sidebar toggle
 * - Global search input (editable, non-functional placeholder)
 * - User controls (theme toggle, user avatar/badge)
 *
 * This component is persistent across all routes and provides
 * consistent navigation and user controls.
 *
 * Responsibilities:
 * - Display application identity and navigation controls
 * - Show dynamic page title based on current route
 * - Provide editable global search input (functionality to be implemented later)
 * - Offer theme switching between light and dark modes
 * - Maintain consistent height, spacing, and visual hierarchy
 * - Respond to theme changes from context
 *
 * Design Features:
 * - Three-column flex layout: Branding | Search | Controls
 * - Dynamic page title that updates with route changes
 * - Search input with proper styling and placeholder
 * - Theme toggle with sun/moon icons
 * - Responsive behavior: adjusts spacing at breakpoints
 * - Smooth transitions for all interactive state changes
 * - Accessible touch targets and focus states
 *
 * Layout:
 * - Left: Logo + App Name + Sidebar Toggle Button
 * - Center: Global Search Input (takes available space)
 * - Right: Theme Toggle + User Indicator
 */
export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { pathname } = useLocation()
  const { theme, toggleTheme, isDarkMode } = useTheme()
  const pageTitle = getPageTitle(pathname)

  return (
    <header className={`${headerClassNames.base} ${headerClassNames.height}`}>
      <div className="flex items-center w-full">
        {/* Left Section: Branding and Navigation Toggle */}
        <div className="flex-shrink-0 md:flex-1 items-center space-x-3">
          {/* Sidebar Toggle Button (hamburger) - always in DOM but visually hidden on desktop */}
          <button
            onClick={toggleSidebar}
            className="opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto p-2 rounded-hover hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            aria-label="Toggle navigation sidebar"
            title="Toggle navigation sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {/* Center Section: Global Search Input */}
        <div className="flex-1 min-w-0 flex justify-center">
          <div className="flex-1 relative max-w-[480px] sm:max-w-[520px] lg:max-w-[560px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search QA Nexus..."
              className="flex-1 pl-10 pr-4 py-2 h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-all duration-200"
              // Note: onChange intentionally left empty as per requirements
              // Search functionality will be implemented in later phases
              onChange={(e) => {}}
              aria-label="Search QA Nexus"
            />
          </div>
        </div>

        {/* Right Section: User Controls */}
        <div className="flex-shrink-0 md:flex-1 items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-hover hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* User Indicator (Avatar/Initials) */}
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary">U</span>
          </div>
        </div>
      </div>
    </header>
  )
}