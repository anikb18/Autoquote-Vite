'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/Container';
import { Button } from '@/components/Catalyst/button';
import { Input } from '@/components/Catalyst/input';
import { Badge } from '@/components/Catalyst/badge';
import { Select } from '@/components/Catalyst/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Catalyst/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Catalyst/dropdown';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
} from 'lucide-react';
import { format } from 'date-fns';

// Mock data - replace with real data from your API
const mockQuotes = [
  {
    id: '1',
    customer: 'John Smith',
    vehicle: '2024 Toyota Camry',
    price: 32500,
    status: 'pending',
    date: new Date('2024-01-08'),
  },
  {
    id: '2',
    customer: 'Sarah Johnson',
    vehicle: '2024 Honda CR-V',
    price: 38900,
    status: 'accepted',
    date: new Date('2024-01-07'),
  },
  {
    id: '3',
    customer: 'Michael Brown',
    vehicle: '2024 Ford F-150',
    price: 45600,
    status: 'rejected',
    date: new Date('2024-01-06'),
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  accepted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
};

export default function DealerQuotesPage() {
  const t = useTranslations('DealerQuotes');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredQuotes = mockQuotes.filter((quote) => {
    const matchesSearch =
      quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Container>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="card-header">
              <div>
                <h1 className="card-title">{t('title')}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('description')}
                </p>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t('newQuote')}
              </Button>
            </div>

            {/* Filters */}
            <div className="card">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t('search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  defaultValue="all"
                >
                  <option value="all">{t('status.all')}</option>
                  <option value="pending">{t('status.pending')}</option>
                  <option value="accepted">{t('status.accepted')}</option>
                  <option value="rejected">{t('status.rejected')}</option>
                  <option value="expired">{t('status.expired')}</option>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quotes Table */}
            <div className="card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('table.customer')}</TableHead>
                    <TableHead>{t('table.vehicle')}</TableHead>
                    <TableHead>{t('table.price')}</TableHead>
                    <TableHead>{t('table.status')}</TableHead>
                    <TableHead>{t('table.date')}</TableHead>
                    <TableHead className="w-[100px]">{t('table.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {t('empty.title')}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {t('empty.description')}
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredQuotes.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell>{quote.customer}</TableCell>
                        <TableCell>{quote.vehicle}</TableCell>
                        <TableCell>
                          ${quote.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={statusColors[quote.status]}
                          >
                            {t(`status.${quote.status}`)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(quote.date, 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                {t('actions.view')}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit2 className="h-4 w-4 mr-2" />
                                {t('actions.edit')}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t('actions.delete')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
