import { db, dbService, Task } from '@/lib/database';

export const taskService = {
  // Get all tasks with optional filtering
  async getTasks({
    statusF,
    priorityF,
    tagsF,
    searchF,
    limitF,
    offsetF
  }: {
    statusF?: string;
    priorityF?: string;
    tagsF?: string[];
    searchF?: string;
    limitF?: number;
    offsetF?: number;
  } = {}): Promise<{ tasks: Task[]; total: number }> {
    let q = db.tasks as any;
    if (statusF) {
      q = q.filter((t: Task) => t.status === statusF);
    }
    if (priorityF) {
      q = q.filter((t: Task) => t.priority === priorityF);
    }
    if (tagsF && tagsF.length > 0) {
      q = q.filter((t: Task) =>
        t.tags &&
        t.tags.some((tag: string) => tagsF.includes(tag))
      );
    }
    if (searchF) {
      const lowerSearch = searchF.toLowerCase();
      q = q.filter((t: Task) =>
        t.title.toLowerCase().includes(lowerSearch) ||
        t.description?.toLowerCase().includes(lowerSearch) ||
        t.notes?.toLowerCase().includes(lowerSearch)
      );
    }

    // Get total count for pagination
    const total = await q.count();

    // Apply pagination
    if (offsetF !== undefined) {
      q = q.offset(offsetF);
    }
    if (limitF !== undefined) {
      q = q.limit(limitF);
    }

    // Sort by createdAt descending (newest first)
    const tasks = await q.reverse().sortBy('createdAt');

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
  }
};

export default taskService;