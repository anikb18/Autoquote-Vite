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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Sample payment data - in a real app, this would come from an API
const payments = [
  {
    id: 1,
    date: '2025-01-18',
    customer: 'John Doe',
    amount: 2500.00,
    status: 'completed',
    method: 'credit_card',
    reference: 'PAY-1234567',
  },
  {
    id: 2,
    date: '2025-01-17',
    customer: 'Jane Smith',
    amount: 1800.00,
    status: 'pending',
    method: 'bank_transfer',
    reference: 'PAY-1234568',
  },
  // Add more sample payments as needed
];

export default function PaymentsPage() {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('payments.totalRevenue')}</CardTitle>
            <CardDescription className="text-2xl font-bold">
              $45,250.00
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('payments.pendingPayments')}</CardTitle>
            <CardDescription className="text-2xl font-bold">
              $3,800.00
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('payments.successRate')}</CardTitle>
            <CardDescription className="text-2xl font-bold">
              98.5%
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1">
          <Input
            placeholder={t('payments.searchPlaceholder')}
            className="max-w-xs"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('payments.statusFilter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('payments.all')}</SelectItem>
              <SelectItem value="completed">{t('payments.completed')}</SelectItem>
              <SelectItem value="pending">{t('payments.pending')}</SelectItem>
              <SelectItem value="failed">{t('payments.failed')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>{t('payments.exportData')}</Button>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('payments.recentPayments')}</CardTitle>
          <CardDescription>
            {t('payments.recentPaymentsDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('payments.date')}</TableHead>
                <TableHead>{t('payments.customer')}</TableHead>
                <TableHead>{t('payments.amount')}</TableHead>
                <TableHead>{t('payments.status')}</TableHead>
                <TableHead>{t('payments.method')}</TableHead>
                <TableHead>{t('payments.reference')}</TableHead>
                <TableHead>{t('payments.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.reference}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      {t('payments.viewDetails')}
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