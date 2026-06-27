import React from 'react'
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
 * - Fixed header at the top
 * - Collapsible sidebar on the left
 * - Main content area where page content is rendered
 *
 * The layout uses Outlooklet from react-router-dom to render child routes
 * in the main content area, allowing navigation without losing the
 * persistent header and sidebar.
 *
 * Responsibilities:
 * - Wrap application in ThemeProvider
 * - Render persistent header and sidebar
 * - Provide outlet for route content
 * - Apply base styling and layout structure
 */
export const AppLayout = () => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="z-20 sticky top-0">
            <Header />
          </header>

          {/* Page content */}
          <main className={`${contentClasses.base} flex-1 overflow-y-auto`}>
            <Outlet />
          </main>
        </div>

        {/* Mobile sidebar overlay */}
        <div className="md:hidden">
          <Sidebar />
        </div>
      </div>
    </ThemeProvider>
  )
}