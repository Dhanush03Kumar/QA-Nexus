import Dexie, { Table } from 'dexie';

// Define entity interfaces based on architecture specs
export interface Task {
  id: string;
  title: string;
  description?: string;
  externalId?: string;
  project?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'blocked' | 'completed';
  tags?: string[];
  dueDate?: Date;
  followUpComments?: string;
  notes?: string;
  attachments?: File[]; // Note: IndexedDB can't store File objects directly, we'll store as base64 or references
  createdAt: Date;
  updatedAt: Date;
  favorite?: boolean;
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  category: 'environment-details' | 'test-data' | 'sql-queries' | 'troubleshooting' | 'learning-notes' | 'release-notes' | 'sharepoint-references';
  content: string; // Will store HTML from Tiptap
  tags?: string[];
  favorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MailTemplate {
  id: string;
  templateName: string;
  category: 'daily-status' | 'defect-clarification' | 'follow-up' | 'escalation' | 'environment-issues' | 'release-signoff';
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  favorite?: boolean;
}

export interface Meeting {
  id: string;
  meetingName: string;
  date: Date;
  time: string;
  attendees: string;
  agenda: string;
  preparationNotes: string;
  referenceDocuments: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingActionItem {
  id: string;
  title: string;
  meetingReference: string; // Meeting ID
  dueDate: Date;
  status: 'todo' | 'in-progress' | 'blocked' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
}

export interface Defect {
  id: string;
  defectId: string; // External ID like JIRA ticket
  summary: string;
  jiraLink?: string;
  project: string;
  module?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'need-rca';
  rca?: string;
  workaround?: string;
  lessonLearned?: string;
  screenshots?: string[]; // Store as base64 or file references
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  projectName: string;
  description?: string;
  projectIds?: string; // Comma-separated or JSON string
  currentPhase?: string;
  plannedDates?: string;
  releaseDate?: Date;
  teamContacts?: string;
  importantLinks?: string;
  environmentDetails?: string;
  risks?: string;
  // Metrics (calculated or stored)
  totalTestCases?: number;
  passed?: number;
  failed?: number;
  blocked?: number;
  openDefects?: number;
  passPercentage?: number;
  active?: boolean; // Only one project can be active
  createdAt: Date;
  updatedAt: Date;
}

export interface Release {
  id: string;
  releaseName: string;
  plannedDate: Date;
  actualDate?: Date;
  featuresIncluded?: string;
  risks?: string;
  dependencies?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AutomationItem {
  id: string;
  title: string;
  type: 'coverage-info' | 'pending-fixes' | 'framework-notes' | 'learning-notes' | 'snippets' | 'todo-items';
  description?: string;
  language?: string; // For snippets
  code?: string; // For snippets
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityLog {
  id: string;
  action: string; // e.g., 'Task Created', 'Task Updated', 'Note Added'
  entityType: 'task' | 'knowledge-entry' | 'mail-template' | 'meeting' | 'defect' | 'project' | 'release' | 'automation-item';
  entityId: string;
  entityTitle?: string;
  timestamp: Date;
}

// Define the database schema
class QAWorkspaceDB extends Dexie {
  // Tables
  tasks!: Table<Task, string>;
  knowledgeEntries!: Table<KnowledgeEntry, string>;
  mailTemplates!: Table<MailTemplate, string>;
  meetings!: Table<Meeting, string>;
  meetingActionItems!: Table<MeetingActionItem, string>;
  defects!: Table<Defect, string>;
  projects!: Table<Project, string>;
  releases!: Table<Release, string>;
  automationItems!: Table<AutomationItem, string>;
  activityLogs!: Table<ActivityLog, string>;
  settings!: Table<{ key: string; value: string }, string>;

  constructor() {
    super('qa-workspace-db');
    this.version(1).stores({
      tasks: '++id, title, priority, status, dueDate, favorite, createdAt, updatedAt',
      knowledgeEntries: '++id, title, category, tags, favorite, createdAt, updatedAt',
      mailTemplates: '++id, templateName, category, favorite, createdAt, updatedAt',
      meetings: '++id, meetingName, date, createdAt, updatedAt',
      meetingActionItems: '++id, title, meetingReference, status, priority, dueDate, createdAt, updatedAt',
      defects: '++id, defectId, summary, project, severity, status, createdAt, updatedAt',
      projects: '++id, projectName, active, createdAt, updatedAt',
      releases: '++id, releaseName, plannedDate, actualDate, createdAt, updatedAt',
      automationItems: '++id, title, type, createdAt, updatedAt',
      activityLogs: '++id action, entityType, entityId, timestamp',
      settings: '++key'
    });

    // Define types for table properties (this helps with TypeScript)
    // this.tasks.mapToClass(Task);
    // this.knowledgeEntries.mapToClass(KnowledgeEntry);
    // this.mailTemplates.mapToClass(MailTemplate);
    // this.meetings.mapToClass(Meeting);
    // this.meetingActionItems.mapToClass(MeetingActionItem);
    // this.defects.mapToClass(Defect);
    // this.projects.mapToClass(Project);
    // this.releases.mapToClass(Release);
    // this.automationItems.mapToClass(AutomationItem);
    // this.activityLogs.mapToClass(ActivityLog);
  }
}

export const db = new QAWorkspaceDB();

// Database service functions for common operations
export const dbService = {
  // Task operations
  async getTasks(): Promise<Task[]> {
    return await db.tasks.reverse().sortBy('createdAt');
  },

  async getTask(id: string): Promise<Task | undefined> {
    return await db.tasks.get(id);
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const taskWithTimestamps = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };
    await db.tasks.add(taskWithTimestamps);
    return taskWithTimestamps.id;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    const updatesWithTimestamp = {
      ...updates,
      updatedAt: new Date()
    };
    await db.tasks.update(id, updatesWithTimestamp);
  },

  async deleteTask(id: string): Promise<void> {
    await db.tasks.delete(id);
  },

  // Knowledge base operations
  async getKnowledgeEntries(): Promise<KnowledgeEntry[]> {
    return await db.knowledgeEntries.reverse().sortBy('createdAt');
  },

  async getKnowledgeEntry(id: string): Promise<KnowledgeEntry | undefined> {
    return await db.knowledgeEntries.get(id);
  },

  async createKnowledgeEntry(entry: Omit<KnowledgeEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const entryWithTimestamps = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };
    await db.knowledgeEntries.add(entryWithTimestamps);
    return entryWithTimestamps.id;
  },

  async updateKnowledgeEntry(id: string, updates: Partial<KnowledgeEntry>): Promise<void> {
    const updatesWithTimestamp = {
      ...updates,
      updatedAt: new Date()
    };
    await db.knowledgeEntries.update(id, updatesWithTimestamp);
  },

  async deleteKnowledgeEntry(id: string): Promise<void> {
    await db.knowledgeEntries.delete(id);
  },

  // Mail template operations
  async getMailTemplates(): Promise<MailTemplate[]> {
    return await db.mailTemplates.reverse().sortBy('createdAt');
  },

  async getMailTemplate(id: string): Promise<MailTemplate | undefined> {
    return await db.mailTemplates.get(id);
  },

  async createMailTemplate(template: Omit<MailTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const templateWithTimestamps = {
      ...template,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };
    await db.mailTemplates.add(templateWithTimestamps);
    return templateWithTimestamps.id;
  },

  async updateMailTemplate(id: string, updates: Partial<MailTemplate>): Promise<void> {
    const updatesWithTimestamp = {
      ...updates,
      updatedAt: new Date()
    };
    await db.mailTemplates.update(id, updatesWithTimestamp);
  },

  async deleteMailTemplate(id: string): Promise<void> {
    await db.mailTemplates.delete(id);
  },

  // Activity log operations
  async addActivityLog(log: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<void> {
    const logWithTimestamp = {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };
    await db.activityLogs.add(logWithTimestamp);
  },

  async getActivityLogs(limit = 50): Promise<ActivityLog[]> {
    return await db.activityLogs.orderBy('timestamp').reverse().limit(limit).toArray();
  },

  // Settings operations
  async getSetting(key: string): Promise<string | undefined> {
    const setting = await db.settings.get(key)
    return setting?.value
  },

  async setSetting(key: string, value: string): Promise<void> {
    await db.settings.put({ key, value });
  }
};

export default db;