import { db, dbService, KnowledgeEntry } from '@/lib/database';

export const knowledgeBaseService = {
  // Get all knowledge entries with optional filtering
  async getKnowledgeEntries({
    category,
    tags,
    search,
    favoriteOnly,
    limit,
    offset
  }: {
    category?: string;
    tags?: string[];
    search?: string;
    favoriteOnly?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ entries: KnowledgeEntry[]; total: number }> {
    let query = db.knowledgeEntries;

    // Apply filters
    if (category) {
      query = query.filter((entry) => entry.category === category);
    }
    if (tags && tags.length > 0) {
      query = query.filter((entry) =>
        entry.tags &&
        tags.some(tag => entry.tags?.includes(tag))
      );
    }
    if (favoriteOnly) {
      query = query.filter((entry) => entry.favorite);
    }
    if (search) {
      const lowerSearch = search.toLowerCase();
      query = query.filter((entry) =>
        entry.title.toLowerCase().includes(lowerSearch) ||
        entry.content?.toLowerCase().includes(lowerSearch) ||
        entry.summary?.toLowerCase().includes(lowerSearch)
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

    // Sort by updatedAt descending (most recently updated first)
    const entries = await query.reverse().sortBy('updatedAt');

    return { entries, total };
  },

  // Get a single knowledge entry by ID
  async getKnowledgeEntryById(id: string): Promise<KnowledgeEntry | undefined> {
    return await db.knowledgeEntries.get(id);
  },

  // Create a new knowledge entry
  async createKnowledgeEntry(data: Omit<KnowledgeEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const entry = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      version: 1,
    };

    await db.knowledgeEntries.add(entry);

    // Log activity
    await dbService.addActivityLog({
      action: 'Knowledge Entry Created',
      entityType: 'knowledge-entry',
      entityId: entry.id,
      entityTitle: entry.title,
    });

    return entry.id;
  },

  // Update an existing knowledge entry
  async updateKnowledgeEntry(id: string, updates: Partial<KnowledgeEntry>): Promise<void> {
    const existing = await db.knowledgeEntries.get(id);
    if (!existing) {
      throw new Error(`Knowledge entry with id ${id} not found`);
    }

    const now = new Date();
    const updateData = {
      ...updates,
      updatedAt: now,
      version: (existing.version || 0) + 1, // Increment version
    };

    await db.knowledgeEntries.update(id, updateData);

    // Log activity
    await dbService.addActivityLog({
      action: 'Knowledge Entry Updated',
      entityType: 'knowledge-entry',
      entityId: id,
      entityTitle: updates.title ?? existing.title,
    });
  },

  // Delete a knowledge entry
  async deleteKnowledgeEntry(id: string): Promise<void> {
    const existing = await db.knowledgeEntries.get(id);
    if (!existing) {
      throw new Error(`Knowledge entry with id ${id} not found`);
    }

    await db.knowledgeEntries.delete(id);

    // Log activity
    await dbService.addActivityLog({
      action: 'Knowledge Entry Deleted',
      entityType: 'knowledge-entry',
      entityId: id,
      entityTitle: existing.title,
    });
  },

  // Toggle favorite status
  async toggleFavorite(id: string): Promise<void> {
    const entry = await db.knowledgeEntries.get(id);
    if (!entry) {
      throw new Error(`Knowledge entry with id ${id} not found`);
    }

    await this.updateKnowledgeEntry(id, { favorite: !entry.favorite });
  },

  // Get categories for filtering
  async getCategories(): Promise<string[]> {
    const entries = await db.knowledgeEntries.toArray();
    const categories = [...new Set(entries.map(entry => entry.category).filter(Boolean))];
    return categories.sort();
  },

  // Get all tags for filtering
  async getTags(): Promise<string[]> {
    const entries = await db.knowledgeEntries.toArray();
    const tags = entries
      .flatMap(entry => entry.tags || [])
      .filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates
    return tags.sort();
  },

  // Get favorite entries
  async getFavoriteEntries(): Promise<KnowledgeEntry[]> {
    return await db.knowledgeEntries
      .filter((entry) => entry.favorite)
      .reverse()
      .sortBy('updatedAt');
  },

  // Get recent entries
  async getRecentEntries(limit: number = 5): Promise<KnowledgeEntry[]> {
    return await db.knowledgeEntries
      .reverse()
      .sortBy('updatedAt')
      .limit(limit);
  }
};

export default knowledgeBaseService;