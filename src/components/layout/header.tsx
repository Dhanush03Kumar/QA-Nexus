import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/app/theme-provider'
import { headerClassNames } from '@/app/layout-styles'

/**
 * Application Header
 *
 * The header appears at the top of every page and contains:
 * - Application title/branding
 * - Theme toggle button (sun/moon icon for light/dark mode)
 *
 * This component is persistent across all routes and provides
 * consistent branding and user controls.
 *
 * Responsibilities:
 * - Display application name/logo
 * - Provide theme switching functionality
 * - Maintain consistent height and styling
 * - Respond to theme changes from context
 *
 * Design:
 * - Fixed height with padding
 * - Flex layout with title on left and controls on right
 * - Clean, minimal appearance matching the application's aesthetic
 */
export const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={`${headerClassNames.base} ${headerClassNames.height}`}>
      <div className={`${headerClassNames.flex}`}>
        {/* Application Title */}
        <div className="flex items-center space-x-3">
          {/* TODO: Replace with actual logo/icon */}
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h3a.5v.5 0 010 1h-3a.5.5 0 01-.5-.5z"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">QA Dashboard</h1>
        </div>

        {/* Header Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-hover text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Placeholder for user avatar/notifications */}
          <div className="relative">
            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}