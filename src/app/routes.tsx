import { useRoutes } from 'react-router-dom'
import { AppLayout } from './layout'
import { typography, contentClasses } from '@/app/layout-styles'
import { TasksPage } from '@/features/tasks/pages/tasks.page'
import { KnowledgeBasePage } from '@/features/knowledge-base/pages/knowledge-base.page'
import { FuturePage } from '@/components/ui/future-page'

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
      element: <AppLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'tasks', element: <TasksPage /> },
        { path: 'knowledge-base', element: <KnowledgeBasePage /> },
        { path: 'mail-templates', element: <FuturePage feature="Mail Templates" /> },
        { path: 'meetings', element: <FuturePage feature="Meetings" /> },
        { path: 'defects', element: <FuturePage feature="Defects" /> },
        { path: 'projects-releases', element: <FuturePage feature="Projects & Releases" /> },
        { path: 'automation', element: <FuturePage feature="Automation Hub" /> },
        { path: 'activity-log', element: <FuturePage feature="Activity Log" /> },
        { path: 'settings', element: <FuturePage feature="Settings" /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])
}

// Dashboard component (still placeholder for now)
const DashboardPage = () => {
  return (
    <div className={`${contentClasses.base}`}>
      <h1 className={`${typography.headline} mb-4`}>Dashboard</h1>
      <p className={`${typography.body} text-muted-foreground`}>
        Welcome to your QA Dashboard
      </p>
    </div>
  )
}

// Placeholder components for other features (to be implemented in later phases)
// const KnowledgeBasePage = () => {
//   return (
//     <div className={`${contentClasses.base}`}>
//       <h1 className={`${typography.headline} mb-4`}>Knowledge Base</h1>
//       <p className={`${typography.body} text-muted-foreground`}>
//         Store and retrieve QA knowledge and best practices
//       </p>
//     </div>
//   )
// }

// const MailTemplatesPage = () => {
//   return (
//     <div className={`${contentClasses.base}`}>
//       <h1 className={`${typography.headline} mb-4`}>Mail Templates</h1>
//       <p className={`${typography.body} text-muted-foreground`}>
//         Manage reusable email templates for QA communications
//       </p>
//     </div>
//   )
// }

// const MeetingsPage = () => {
//   return (
//     <div className={`${contentClasses.base}`}>
//       <h1 className={`${typography.headline} mb-4`}>Meetings</h1>
//       <p className={`${typography.body} text-muted-foreground`}>
//         Schedule meetings and track meeting outcomes
//       </p>
//     </div>
//   )
// }

// const DefectsPage = () => {
//   return (
//     <div className={`${contentClasses.base}`}>
//       <h1 className={`${typography.headline} mb-4`}>Defects</h1>
//       <p className={`${typography.body} text-muted-foreground`}>
//         Track and analyze software defects
//       </p>
//     </div>
//   )
// }

// const ProjectsReleasesPage = () => {
//   return (
//     <div className={`${contentClasses.base}`}>
//       <h1 className={`${typography.headline} mb-4`}>Projects & Releases</h1>
//       <p className={`${typography.body} text-muted-foreground`}>
//         Manage QA projects and release cycles
//       </p>
//     </div>
//   )
// }

// const AutomationPage = () => {
//   return (
//     <div className={`${contentClasses.base}`}>
//       <h1 className={`${typography.headline} mb-4`}>Automation Hub</h1>
//       <p className={`${typography.body} text-muted-foreground`}>
//         Manage test automation frameworks and scripts
//       </p>
//     </div>
//   )
// }

// const ActivityLogPage = () => {
//   return (
//     <div className={`${contentClasses.base}`}>
//       <h1 className={`${typography.headline} mb-4`}>Activity Log</h1>
//       <p className={`${typography.body} text-muted-foreground`}>
//         View audit trail of all user actions
//       </p>
//     </div>
//   )
// }

// const SettingsPage = () => {
//   return (
//     <div className={`${contentClasses.base}`}>
//       <h1 className={`${typography.headline} mb-4`}>Settings</h1>
//       <p className={`${typography.body} text-muted-foreground`}>
//         Configure application preferences
//       </p>
//     </div>
//   )
// }

const NotFoundPage = () => {
  return (
    <div className={`${contentClasses.base}`}>
      <h1 className={`${typography.headline} mb-4`}>Page Not Found</h1>
      <p className={`${typography.body} text-muted-foreground`}>
        The page you're looking for doesn't exist.
      </p>
    </div>
  )
}