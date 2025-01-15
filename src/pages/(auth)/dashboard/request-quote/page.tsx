import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarFront, DollarSign, Gauge, Calendar, Info } from 'lucide-react';

export default function RequestQuotePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isTradeIn, setIsTradeIn] = useState(false);

  const vehicleTypes = [
    { value: 'suv', label: t('requestQuote.vehicleTypes.suv') },
    { value: 'sedan', label: t('requestQuote.vehicleTypes.sedan') },
    { value: 'truck', label: t('requestQuote.vehicleTypes.truck') },
    { value: 'van', label: t('requestQuote.vehicleTypes.van') },
  ];

  const makes = [
    { value: 'toyota', label: 'Toyota' },
    { value: 'honda', label: 'Honda' },
    { value: 'ford', label: 'Ford' },
    { value: 'chevrolet', label: 'Chevrolet' },
  ];

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle>{t('requestQuote.vehicleInfo.title')}</CardTitle>
        <CardDescription>
          {t('requestQuote.vehicleInfo.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="vehicleType">
              {t('requestQuote.vehicleInfo.type')}
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('requestQuote.vehicleInfo.selectType')} />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="make">
              {t('requestQuote.vehicleInfo.make')}
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('requestQuote.vehicleInfo.selectMake')} />
              </SelectTrigger>
              <SelectContent>
                {makes.map((make) => (
                  <SelectItem key={make.value} value={make.value}>
                    {make.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">
              {t('requestQuote.vehicleInfo.model')}
            </Label>
            <Input id="model" placeholder="RAV4" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">
              {t('requestQuote.vehicleInfo.year')}
            </Label>
            <Input id="year" placeholder="2024" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">
            {t('requestQuote.vehicleInfo.additionalInfo')}
          </Label>
          <Textarea
            id="additionalInfo"
            placeholder={t('requestQuote.vehicleInfo.additionalInfoPlaceholder')}
            className="h-24"
          />
        </div>

        <Button onClick={() => setStep(2)} className="w-full">
          {t('requestQuote.actions.next')}
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle>{t('requestQuote.preferences.title')}</CardTitle>
        <CardDescription>
          {t('requestQuote.preferences.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="budget">
              {t('requestQuote.preferences.budget')}
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="budget"
                placeholder="35,000"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeframe">
              {t('requestQuote.preferences.timeframe')}
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('requestQuote.preferences.selectTimeframe')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">{t('requestQuote.preferences.timeframes.immediate')}</SelectItem>
                <SelectItem value="1month">{t('requestQuote.preferences.timeframes.1month')}</SelectItem>
                <SelectItem value="3months">{t('requestQuote.preferences.timeframes.3months')}</SelectItem>
                <SelectItem value="6months">{t('requestQuote.preferences.timeframes.6months')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('requestQuote.preferences.tradeIn')}</Label>
              <p className="text-sm text-gray-500">
                {t('requestQuote.preferences.tradeInDesc')}
              </p>
            </div>
            <Switch
              checked={isTradeIn}
              onCheckedChange={setIsTradeIn}
            />
          </div>

          {isTradeIn && (
            <div className="space-y-4 border-l-2 border-blue-200 pl-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tradeInMake">
                    {t('requestQuote.tradeIn.make')}
                  </Label>
                  <Input id="tradeInMake" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tradeInModel">
                    {t('requestQuote.tradeIn.model')}
                  </Label>
                  <Input id="tradeInModel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tradeInYear">
                    {t('requestQuote.tradeIn.year')}
                  </Label>
                  <Input id="tradeInYear" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tradeInMileage">
                    {t('requestQuote.tradeIn.mileage')}
                  </Label>
                  <div className="relative">
                    <Gauge className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="tradeInMileage"
                      placeholder="50,000"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tradeInCondition">
                  {t('requestQuote.tradeIn.condition')}
                </Label>
                <Textarea
                  id="tradeInCondition"
                  placeholder={t('requestQuote.tradeIn.conditionPlaceholder')}
                  className="h-24"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="flex-1"
          >
            {t('requestQuote.actions.back')}
          </Button>
          <Button
            onClick={() => setStep(3)}
            className="flex-1"
          >
            {t('requestQuote.actions.next')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle>{t('requestQuote.confirmation.title')}</CardTitle>
        <CardDescription>
          {t('requestQuote.confirmation.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {t('requestQuote.confirmation.notice')}
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>{t('requestQuote.confirmation.noticeDetails')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>{t('requestQuote.confirmation.fee')}</Label>
            <p className="font-medium">$40.00 CAD</p>
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('requestQuote.confirmation.dealers')}</Label>
            <p className="font-medium">5-10</p>
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('requestQuote.confirmation.response')}</Label>
            <p className="font-medium">{t('requestQuote.confirmation.responseTime')}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setStep(2)}
            className="flex-1"
          >
            {t('requestQuote.actions.back')}
          </Button>
          <Button
            onClick={() => {
              // TODO: Submit quote request
              navigate('/dashboard/quotes');
            }}
            className="flex-1"
          >
            {t('requestQuote.actions.submit')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('requestQuote.title')}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {t('requestQuote.description')}
        </p>
      </div>

      <div className="mb-8">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center">
            {[
              { id: 1, name: t('requestQuote.steps.vehicle') },
              { id: 2, name: t('requestQuote.steps.preferences') },
              { id: 3, name: t('requestQuote.steps.confirmation') },
            ].map((s, idx) => (
              <li key={s.id} className={`relative ${idx !== 0 ? 'pl-6 ml-6' : ''} ${idx !== 2 ? 'pr-6 mr-6' : ''}`}>
                <div className="flex items-center">
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full
                      ${step > s.id ? 'bg-blue-600' :
                        step === s.id ? 'border-2 border-blue-600' : 'border-2 border-gray-300'}`}
                  >
                    <span className={`text-sm font-medium
                      ${step > s.id ? 'text-white' :
                        step === s.id ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                      {s.id}
                    </span>
                  </div>
                  {idx !== 2 && (
                    <div className={`absolute right-0 h-0.5 w-full translate-x-6
                      ${step > s.id ? 'bg-blue-600' : 'bg-gray-300'}`}
                    />
                  )}
                </div>
                <span className="absolute -bottom-6 w-max text-sm font-medium text-gray-500">
                  {s.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}
