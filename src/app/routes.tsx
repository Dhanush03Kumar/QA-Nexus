import { useRoutes } from 'react-router-dom'
import { AppLayout } from './layout'
import { typography, contentClasses } from '@/app/layout-styles'
import { TasksPage } from '@/features/tasks/pages/tasks.page'
import { KnowledgeBasePage } from '@/features/knowledge-base/pages/knowledge-base.page'
import { FuturePage } from '@/components/ui/future-page'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { MailTemplatesPage } from '@/features/mail-templates/pages/mail-templates.page'
import { MeetingsPage } from '@/features/meetings/pages/meetings.page'
import { DefectsPage } from '@/features/defects/pages/defects.page'
import { ProjectsReleasesPage } from '@/features/projects-releases/pages/projects-releases.page'
import { AutomationPage } from '@/features/automation/pages/automation.page'
import { ActivityLogPage } from '@/features/activity-log/pages/activity-log.page'

export const useAppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <AppLayout />,
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
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);
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