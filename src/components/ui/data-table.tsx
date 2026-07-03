import * as React from 'react';
import { Search, Loader2, ChevronUp, ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface DataTableColumn<T> {
  accessorKey: string;
  header: React.ReactNode;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
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
}: DataTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const sortedData = useMemo(() => {
    let filteredData = [...data];

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter((item) =>
        columns.some((column) =>
          String(item[column.accessorKey as keyof T] ?? '')
            .toLowerCase()
            .includes(lowerQuery)
        )
      );
    }

    if (sortConfig) {
      const { key, direction } = sortConfig;
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a[key as keyof T];
        const bValue = b[key as keyof T];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        const numA = Number(aValue);
        const numB = Number(bValue);
        if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
          return direction === 'asc' ? numA - numB : numB - numA;
        }

        const dateA = new Date(aValue as string).getTime();
        const dateB = new Date(bValue as string).getTime();
        if (!Number.isNaN(dateA) && !Number.isNaN(dateB)) {
          return direction === 'asc' ? dateA - dateB : dateB - dateA;
        }

        return 0;
      });
    }

    return filteredData;
  }, [columns, data, searchQuery, sortConfig]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextIds = event.target.checked ? sortedData.map((item) => item.id) : [];
    setSelectedIds(nextIds);
    onSelectionChange?.(nextIds);
  };

  const handleToggleSelect = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const nextIds = event.target.checked
      ? [...selectedIds, id]
      : selectedIds.filter((itemId) => itemId !== id);
    setSelectedIds(nextIds);
    onSelectionChange?.(nextIds);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {showSelection && (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedIds.length > 0 && selectedIds.length === sortedData.length}
                onChange={handleSelectAll}
                aria-label="Select all"
              />
              <span className="text-sm text-muted-foreground">
                {selectedIds.length} of {sortedData.length} selected
              </span>
            </div>
          )}

          <div className="relative w-full min-w-[200px] sm:w-auto">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-10 pr-3"
              aria-label="Search table"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSelection && selectedIds.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                void Promise.all(selectedIds.map((id) => onDelete?.(id))).finally(() => {
                  setSelectedIds([]);
                  onSelectionChange?.([]);
                });
              }}
            >
              Delete Selected
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
                      checked={selectedIds.length > 0 && selectedIds.length === sortedData.length}
                      onChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={String(column.accessorKey)}
                    className={`px-4 py-3 text-left text-xs font-medium text-muted-foreground ${column.className ?? ''} ${
                      column.sortable ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''
                    }`}
                    onClick={column.sortable ? () => {
                      const direction =
                        sortConfig?.key === column.accessorKey && sortConfig.direction === 'asc'
                          ? 'desc'
                          : 'asc';
                      setSortConfig({ key: String(column.accessorKey), direction });
                    } : undefined}
                  >
                    {column.header}
                    {column.sortable && (
                      <span className="ml-1 h-4 w-4 opacity-50">
                        {sortConfig?.key === column.accessorKey ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
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
                        onChange={(event) => handleToggleSelect(item.id, event)}
                        aria-label={`Select item ${item.id}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={`${item.id}-${column.accessorKey}`} className={`px-4 py-4 text-sm ${column.className ?? ''}`}>
                      {column.cell ? (
                        column.cell(item)
                      ) : (
                        (() => {
                          const value = item[column.accessorKey as keyof T];
                          if (value === null || value === undefined) return '-';
                          if (value instanceof Date) return value.toLocaleDateString();
                          if (typeof value === 'boolean') return <Badge variant="secondary">{value ? 'Yes' : 'No'}</Badge>;
                          if (Array.isArray(value)) return value.map((entry, index) => <span key={index} className="inline-block mb-1">{entry}{index < value.length - 1 ? ', ' : ''}</span>);
                          return String(value);
                        })()
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