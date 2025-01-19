import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';

interface Quote {
  id: string;
  vehicle: {
    make: string;
    model: string;
    year: string;
    type: string;
  };
  status: 'pending' | 'active' | 'expired' | 'completed';
  createdAt: string;
  expiresAt: string;
  dealerQuotes: {
    dealerName: string;
    price: number;
    isLowest: boolean;
    hasMessage: boolean;
    submittedAt: string;
  }[];
}

export default function QuotesPage() {
  const { t } = useTranslation();

  // Sample data - replace with actual data fetching
  const quotes: Quote[] = [
    {
      id: '1',
      vehicle: {
        make: 'Toyota',
        model: 'RAV4',
        year: '2024',
        type: 'SUV',
      },
      status: 'active',
      createdAt: '2024-01-14T12:00:00',
      expiresAt: '2024-01-21T12:00:00',
      dealerQuotes: [
        {
          dealerName: 'Toyota Montreal',
          price: 35000,
          isLowest: true,
          hasMessage: true,
          submittedAt: '2024-01-14T14:00:00',
        }
      ]
    }
  ];

  const getStatusBadgeVariant = (status: Quote['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'expired':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('quotes.title')}</h1>
          <p className="text-muted-foreground">{t('quotes.all')}</p>
        </div>
        <Link to="/dashboard/quotes/new">
          <Button>{t('quotes.new')}</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input 
          placeholder={t('common.search')}
          className="max-w-xs"
        />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('quotes.status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('common.all')}</SelectItem>
            <SelectItem value="active">{t('quotes.approved')}</SelectItem>
            <SelectItem value="pending">{t('quotes.pending')}</SelectItem>
            <SelectItem value="expired">{t('quotes.rejected')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quotes.all')}</CardTitle>
          <CardDescription>{t('quotes.title')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('quotes.vehicle')}</TableHead>
                <TableHead>{t('quotes.customer')}</TableHead>
                <TableHead>{t('quotes.amount')}</TableHead>
                <TableHead>{t('quotes.status')}</TableHead>
                <TableHead>{t('quotes.date')}</TableHead>
                <TableHead>{t('quotes.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    {quote.vehicle.year} {quote.vehicle.make} {quote.vehicle.model}
                  </TableCell>
                  <TableCell>
                    {quote.dealerQuotes[0]?.dealerName || 'N/A'}
                  </TableCell>
                  <TableCell>
                    ${quote.dealerQuotes[0]?.price.toLocaleString() || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(quote.status)}>
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      {t('common.view')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}