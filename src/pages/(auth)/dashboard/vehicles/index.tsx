import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Catalyst/button';
import { Input } from '@/components/Catalyst/input';
import { Plus, Filter, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Catalyst/table";

const vehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 29999,
    status: 'Available',
  },
  {
    id: 2,
    make: 'Honda',
    model: 'CR-V',
    year: 2024,
    price: 34999,
    status: 'Pending',
  },
];

export default function VehiclesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t('vehicles.title')}</h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="text-sm">
              <Filter className="h-4 w-4 mr-2" />
              {t('vehicles.filter')}
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('vehicles.addVehicle')}
            </Button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder={t('vehicles.search')}
            className="w-full pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm font-medium text-gray-700">{t('vehicles.make')}</TableHead>
                <TableHead className="text-sm font-medium text-gray-700">{t('vehicles.model')}</TableHead>
                <TableHead className="text-sm font-medium text-gray-700">{t('vehicles.year')}</TableHead>
                <TableHead className="text-sm font-medium text-gray-700">{t('vehicles.price')}</TableHead>
                <TableHead className="text-sm font-medium text-gray-700">{t('vehicles.status')}</TableHead>
                <TableHead className="text-sm font-medium text-gray-700 text-right">{t('vehicles.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="hover:bg-gray-50">
                  <TableCell className="text-sm text-gray-900">{vehicle.make}</TableCell>
                  <TableCell className="text-sm text-gray-900">{vehicle.model}</TableCell>
                  <TableCell className="text-sm text-gray-900">{vehicle.year}</TableCell>
                  <TableCell className="text-sm text-gray-900">${vehicle.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vehicle.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {t('vehicles.edit')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
