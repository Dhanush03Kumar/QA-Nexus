import { db, dbService, Task } from '@/lib/database';

export const taskService = {
  // Get all tasks with optional filtering
  async getTasks({
    status,
    priority,
    tags,
    search,
    limit,
    offset
  }: {
    status?: string;
    priority?: string;
    tags?: string[];
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ tasks: Task[]; total: number }> {
    let query = db.tasks;

    // Apply filters
    if (status) {
      query = query.filter((task) => task.status === status);
    }
    if (priority) {
      query = query.filter((task) => task.priority === priority);
    }
    if (tags && tags.length > 0) {
      query = query.filter((task) =>
        task.tags &&
        tags.some(tag => task.tags?.includes(tag))
      );
    }
    if (search) {
      const lowerSearch = search.toLowerCase();
      query = query.filter((task) =>
        task.title.toLowerCase().includes(lowerSearch) ||
        task.description?.toLowerCase().includes(lowerSearch) ||
        task.notes?.toLowerCase().includes(lowerSearch)
      );
    }

    // Get total count for pagination
    const total = await query.count();

    // Apply pagination
    if (offset !== undefined) {
      query = query.offset(offset);
    }
    if (limit !== undefined) {
      query = query.limit(limit);
    }

    // Sort by createdAt descending (newest first)
    const tasks = await query.reverse().sortBy('createdAt');

    return { tasks, total };
  },

  // Get a single task by ID
  async getTaskById(id: string): Promise<Task | undefined> {
    return await db.tasks.get(id);
  },

  // Create a new task
  async createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const task = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    await db.tasks.add(task);

    // Log activity
    await dbService.addActivityLog({
      action: 'Task Created',
      entityType: 'task',
      entityId: task.id,
      entityTitle: task.title,
    });

    return task.id;
  },

  // Update an existing task
  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    const existing = await db.tasks.get(id);
    if (!existing) {
      throw new Error(`Task with id ${id} not found`);
    }

    const now = new Date();
    const updateData = {
      ...updates,
      updatedAt: now,
    };

    await db.tasks.update(id, updateData);

    // Log activity
    await dbService.addActivityLog({
      action: 'Task Updated',
      entityType: 'task',
      entityId: id,
      entityTitle: updates.title ?? existing.title,
    });
  },

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    const existing = await db.tasks.get(id);
    if (!existing) {
      throw new Error(`Task with id ${id} not found`);
    }

    await db.tasks.delete(id);

    // Log activity
    await dbService.addActivityLog({
      action: 'Task Deleted',
      entityType: 'task',
      entityId: id,
      entityTitle: existing.title,
    });
  },

  // Toggle task completion status
  async toggleTaskCompletion(id: string): Promise<void> {
    const task = await db.tasks.get(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    await this.updateTask(id, { status: newStatus });
  },

  // Toggle favorite status
  async toggleFavorite(id: string): Promise<void> {
    const task = await db.tasks.get(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    await this.updateTask(id, { favorite: !task.favorite });
  },

  // Get tasks for today (due today or no due date)
  async getTodayTasks(): Promise<Task[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const tasks = await db.tasks
      .filter((task) =>
        (!task.dueDate ||
         (task.dueDate >= today && task.dueDate < tomorrow)) &&
        task.status !== 'completed'
      )
      .sortBy('priority'); // Sort by priority (custom sort needed)

    // Custom sort for priority: critical > high > medium > low
    return tasks.sort((a, b) => {
      const priorityOrder: Record<string, number> = {
        critical: 4,
        high: 3,
        medium: 2,
        low: 1
      };
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    });
  },

  // Get overdue tasks
  async getOverdueTasks(): Promise<Task[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await db.tasks
      .filter((task) =>
        task.dueDate &&
        task.dueDate < today &&
        task.status !== 'completed'
      )
      .sortBy('dueDate');
  }
};

export default taskService;