import { useState } from 'react';
import { Search, Filter, Download, RefreshCw, Plus, MoreVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

interface Component {
  id: string;
  code: string;
  name: string;
  type: string;
  status: string;
  owner: string;
  lastModified: string;
}

const mockData: Component[] = [
  { id: 'comp-001', code: 'CRM-001', name: 'Customer Relationship Management System', type: 'Core System', status: 'Active', owner: 'Sales Team', lastModified: '2026-02-10' },
  { id: '2', code: 'ERP-001', name: 'Enterprise Resource Planning', type: 'Core System', status: 'Active', owner: 'Operations', lastModified: '2026-02-09' },
  { id: '3', code: 'BI-001', name: 'Business Intelligence Platform', type: 'Analytics', status: 'Active', owner: 'Data Team', lastModified: '2026-02-08' },
  { id: '4', code: 'HR-001', name: 'Human Resources Management', type: 'Support System', status: 'Active', owner: 'HR Team', lastModified: '2026-02-07' },
  { id: '5', code: 'FIN-001', name: 'Financial Accounting System', type: 'Core System', status: 'Active', owner: 'Finance', lastModified: '2026-02-06' },
  { id: '6', code: 'SCM-001', name: 'Supply Chain Management', type: 'Core System', status: 'Planning', owner: 'Logistics', lastModified: '2026-02-05' },
  { id: '7', code: 'CMS-001', name: 'Content Management System', type: 'Support System', status: 'Active', owner: 'Marketing', lastModified: '2026-02-04' },
  { id: '8', code: 'API-001', name: 'API Gateway', type: 'Infrastructure', status: 'Active', owner: 'IT Ops', lastModified: '2026-02-03' },
  { id: '9', code: 'AUTH-001', name: 'Authentication Service', type: 'Infrastructure', status: 'Active', owner: 'Security', lastModified: '2026-02-02' },
  { id: '10', code: 'DATA-001', name: 'Data Warehouse', type: 'Analytics', status: 'Active', owner: 'Data Team', lastModified: '2026-02-01' },
  { id: '11', code: 'MOB-001', name: 'Mobile Application', type: 'Frontend', status: 'Active', owner: 'Mobile Team', lastModified: '2026-01-31' },
  { id: '12', code: 'WEB-001', name: 'Web Portal', type: 'Frontend', status: 'Active', owner: 'Web Team', lastModified: '2026-01-30' },
];

interface DataTableProps {
  onCreateNew: () => void;
  onRowClick?: (id: string) => void;
}

export function DataTable({ onCreateNew, onRowClick }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredData = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((item) => item.id)));
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-14 border-b border-border flex items-center justify-between px-6 shrink-0">
        <div>
          <h1 className="text-lg text-foreground">Application Components</h1>
          <p className="text-xs text-muted-foreground">Manage your enterprise application components</p>
        </div>
        <Button onClick={onCreateNew} size="sm">
          <Plus />
          New Component
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="h-14 border-b border-border flex items-center gap-3 px-6 shrink-0">
        <div className="flex-1 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm">
            <RefreshCw className="size-4" />
          </Button>
          <Button variant="outline" size="icon-sm">
            <Download className="size-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-card">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>CODE</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>OWNER</TableHead>
              <TableHead>LAST MODIFIED</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => onRowClick?.(item.id)}
                className="cursor-pointer"
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedRows.has(item.id)}
                    onCheckedChange={() => toggleRow(item.id)}
                  />
                </TableCell>
                <TableCell className="text-primary">{item.code}</TableCell>
                <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                <TableCell className="text-foreground">{item.type}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'Active' ? 'success' : 'muted'}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">{item.owner}</TableCell>
                <TableCell className="text-foreground">{item.lastModified}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon-sm">
                    <MoreVertical className="size-4 text-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="h-14 border-t border-border flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${filteredData.length} items`}
          </span>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}