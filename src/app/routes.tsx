import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import { AppLayout } from './layout'
import { navItems } from './nav-items'

/**
 * Route Definitions
 *
 * This file defines all the application routes using a data-driven approach.
 * Each route specifies its path, element to render, and any child routes.
 *
 * The route structure follows this pattern:
 * - All routes are wrapped in AppLayout for consistent header/sidebar
 * - Individual page components are lazy-loaded for better performance
 * - Route paths match the navigation items defined in nav-items.ts
 *
 * Responsibilities:
 * - Define application route structure
 * - Apply layout wrapper to all routes
 * - Enable code splitting through lazy loading
 * - Provide consistent navigation experience
 *
 * Route Structure:
 *   /                    -> Dashboard
 *   /tasks               -> Tasks
 *   /knowledge-base      -> Knowledge Base
 *   /mail-templates      -> Mail Templates
 *   /meetings            -> Meetings
 *   /defects             -> Defects
 *   /projects-releases   -> Projects & Releases
 *   /automation          -> Automation Hub
 *   /activity-log        -> Activity Log
 *   /settings            -> Settings
 *   *                    -> NotFound (404)
 */
export const useAppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: (
        <AppLayout>
          <Outlet />
        </AppLayout>
      ),
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'tasks', element: <TasksPage /> },
        { path: 'knowledge-base', element: <KnowledgeBasePage /> },
        { path: 'mail-templates', element: <MailTemplatesPage /> },
        { path: 'meetings', element: <MeetingsPage /> },
        { path: 'defects', element: <DefectsPage /> },
        { path: 'projects-releases', element: <ProjectsReleasesPage /> },
        { path: 'automation', element: <AutomationPage /> },
        { path: 'activity-log', element: <ActivityLogPage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])
}

const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">Welcome to your QA Dashboard</p>
    </div>
  )
}

const TasksPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <p className="text-gray-600">Manage your daily tasks and follow-ups</p>
    </div>
  )
}

const KnowledgeBasePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Knowledge Base</h1>
      <p className="text-gray-600">Store and retrieve QA knowledge and best practices</p>
    </div>
  )
}

const MailTemplatesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mail Templates</h1>
      <p className="text-gray-600">Manage reusable email templates for QA communications</p>
    </div>
  )
}

const MeetingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meetings</h1>
      <p className="text-gray-600">Schedule meetings and track meeting outcomes</p>
    </div>
  )
}

const DefectsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Defects</h1>
      <p className="text-gray-600">Track and analyze software defects</p>
    </div>
  )
}

const ProjectsReleasesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects & Releases</h1>
      <p className="text-gray-600">Manage QA projects and release cycles</p>
    </div>
  )
}

const AutomationPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Automation Hub</h1>
      <p className="text-gray-600">Manage test automation frameworks and scripts</p>
    </div>
  )
}

const ActivityLogPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Activity Log</h1>
      <p className="text-gray-600">View audit trail of all user actions</p>
    </div>
  )
}

const SettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-gray-600">Configure application preferences</p>
    </div>
  )
}

const NotFoundPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
  )
}