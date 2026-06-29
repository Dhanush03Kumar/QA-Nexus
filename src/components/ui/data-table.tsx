import * as React from 'react';
import { Filter, Search, Loader2, Trash2, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispose } from '@/hooks/use-dispose';

interface DataTableColumn<T> {
  accessorKey: string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  showSelection?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (item: T) => void;
}

export const DataTable = <T extends { id: string }>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data found',
  showSelection = false,
  onSelectionChange,
  onDelete,
  onEdit,
}: DataTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    null
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Dispose effect to clean up subscriptions if needed
  useDispose(() => {
    // Cleanup logic would go here if needed
  }, []);

  const sortedData = useMemo(() => {
    let sortedData = [...data];

    // Apply search filter
    if (searchQuery) {
      const searchableFields = columns
        .map((col) => col.accessorKey)
        .filter((key): key is keyof T => typeof key === 'string');

      searchedData = data.filter((item) =>
        searchableFields.some((key) =>
          String(item[key as keyof T])
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    } else {
      searchedData = data;
    }

    // Apply sorting
    if (sortConfig) {
      const { key, direction } = sortConfig;
      searchedData.sort((a, b) => {
        const aValue = a[key as keyof T];
        const bValue = b[key as keyof T];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Handle numbers, dates, etc.
        const numA = Number(aValue);
        const numB = Number(bValue);

        if (!isNaN(numA) && !isNaN(numB)) {
          return direction === 'asc' ? numA - numB : numB - numA;
        }

        const dateA = new Date(aValue as any).getTime();
        const dateB = new Date(bValue as any).getTime();

        if (!isNaN(dateA) && !isNaN(dateB)) {
          return direction === 'asc' ? dateA - dateB : dateB - dateA;
        }

        return 0;
      });
    }

    return searchedData;
  }, [data, searchQuery, sortConfig]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(sortedData.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }

    onSelectionChange?.(selectedIds);
  };

  const handleToggleSelect = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }

    onSelectionChange?.(selectedIds);
  };

  const handleDelete = async (id: string) => {
    if (onDelete) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Error deleting item:', error);
        // TODO: Show error toast/notification
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {showSelection && (
            <div className="flex items-center">
              <Checkbox
                checked={selectedIds.length === sortedData.length && sortedData.length > 0}
                indeterminate={selectedIds.length > 0 && selectedIds.length < sortedData.length}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
              <span className="text-sm text-muted-foreground">
                {selectedItemsCount} of {sortedData.length} selected
              </span>
            </div>
          )}

          <div className="relative w-full min-w-[200px] sm:w-auto">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-3"
              aria-label="Search table"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSelection && selectedIds.length > 0 && (
            <button
              onClick={() => {
                // Handle bulk delete
                Promise.all(selectedIds.map(id => onDelete?.(id))).finally(() => {
                  setSelectedIds([]);
                  onSelectionChange?.([]);
                });
              }}
              className="btn btn-ghost btn-sm text-destructive hover:bg-destructive/10"
              disabled={loading}
            >
              Delete Selected
            </button>
          )}

          {showSelection && selectedIds.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => {
              // Handle bulk actions
            }}>
              Actions
            </Button>
          )}

          {!showSelection && (
            <Button variant="outline" size="sm">
              Actions
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : sortedData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-muted">
                {showSelection && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-4">
                    <Checkbox
                      checked={selectedIds.length === sortedData.length && sortedData.length > 0}
                      indeterminate={selectedIds.length > 0 && selectedIds.length < sortedData.length}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.accessorKey}
                    className={`px-4 py-3 text-left text-xs font-medium text-muted-foreground ${column.className} ${
                      sortable ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''
                    }`}
                    onClick={column.sortable ? () => {
                      const direction =
                        sortConfig?.key === column.accessorKey && sortConfig.direction === 'asc'
                          ? 'desc'
                          : 'asc';
                      setSortConfig({ key: column.accessorKey, direction });
                    } : undefined}
                  >
                    {column.header}
                    {column.sortable && (
                      <span className="ml-1 h-4 w-4 opacity-50">
                        {sortConfig?.key === column.accessorKey ? (
                          sortConfig.direction === 'asc' ?
                            <ChevronUp className="h-4 w-4" /> :
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                          <>
                            <ChevronUp className="h-4 w-4 opacity-0" />
                            <ChevronDown className="h-4 w-4 opacity-0" />
                          </>
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedData.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                  {showSelection && (
                    <td className="px-4 py-4 text-left w-4">
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onCheckedChange={(e) => handleToggleSelect(item.id, e)}
                        aria-label={`Select item ${item.id}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={`${item.id}-${column.accessorKey}`}
                      className={`px-4 py-4 text-sm ${column.className}`}
                    >
                      {column.cell ? column.cell(item) : (
                        // Handle different data types for display
                        ((value) => {
                          if (value === null || value === undefined) return '-';
                          if (value instanceof Date) return value.toLocaleDateString();
                          if (typeof value === 'boolean') return <Badge variant={variant} size="xs">{value ? 'Yes' : 'No'}</Badge>;
                          if (Array.isArray(value)) return value.map((v, i) => (
                            <span key={i} className="inline-block mb-1">{v}{i < value.length - 1 ? ', ' : ''}</span>
                          ));
                          return String(value);
                        })(item[column.accessorKey as keyof T])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};