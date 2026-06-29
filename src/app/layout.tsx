import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './theme-provider'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { contentClasses } from '@/app/layout-styles'

/**
 * Main Application Layout
 *
 * This component serves as the root layout for the entire application.
 * It provides the consistent structure across all pages:
 * - Theme provider for light/dark mode switching
 * - Sidebar state management (collapsed/expanded)
 * - Fixed header at the top
 * - Collapsible sidebar on the left
 * - Main content area where page content is rendered
 *
 * The layout uses Outlet from react-router-dom to render child routes
 * in the main content area, allowing navigation without losing the
 * persistent header and sidebar.
 *
 * Responsibilities:
 * - Wrap application in ThemeProvider
 * - Manage sidebar collapsed/expanded state
 * - Provide sidebar toggle function to header
 * - Render persistent header and sidebar
 * - Provide outlet for route content
 * - Apply base styling and layout structure
 *
 * Design Features:
 * - Responsive layout: sidebar hidden on mobile, shown as overlay
 * - Sidebar state managed locally in this component
 * - Header receives toggle function as prop
 * - Mobile sidebar appears as overlay with backdrop when open
 * - Smooth transitions for all state changes
 * - Proper z-index stacking for layering
 */
export const AppLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar - Desktop */}
        <aside className={`hidden md:block ${!isSidebarCollapsed ? 'w-64' : 'w-16'} transition-width duration-200 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="z-20 sticky top-0">
            <Header toggleSidebar={toggleSidebar} />
          </header>

          {/* Page content */}
          <main className={`${contentClasses.base} flex-1 overflow-y-auto`}>
            <Outlet />
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-20 bg-black/50 backdrop-blur-sm ${isSidebarCollapsed ? 'hidden' : 'flex'}`}
            onClick={toggleSidebar}
          />
          {/* Sidebar */}
          <div className={`fixed left-0 top-0 h-full z-30 w-64 transition-transform duration-200 ${isSidebarCollapsed ? '-translate-x-full' : 'translate-x-0'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
            <Sidebar isCollapsed={false} onToggle={toggleSidebar} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}