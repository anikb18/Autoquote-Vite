import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { MapPin, Clock, Phone, Globe, Mail } from 'lucide-react';

export default function DealershipPage() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();

  if (viewMode !== 'dealer') {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">{t('common.unauthorized')}</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('dealership.title')}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {t('dealership.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('dealership.basicInfo.title')}</CardTitle>
              <CardDescription>
                {t('dealership.basicInfo.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dealershipName">
                    {t('dealership.basicInfo.name')}
                  </Label>
                  <Input
                    id="dealershipName"
                    placeholder="AutoQuote Motors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealershipLicense">
                    {t('dealership.basicInfo.license')}
                  </Label>
                  <Input
                    id="dealershipLicense"
                    placeholder="ABC123456"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dealershipDescription">
                  {t('dealership.basicInfo.description')}
                </Label>
                <Textarea
                  id="dealershipDescription"
                  placeholder={t('dealership.basicInfo.descriptionPlaceholder')}
                  className="h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dealershipPhone">
                    {t('dealership.contact.phone')}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="dealershipPhone"
                      placeholder="(514) 555-0123"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealershipEmail">
                    {t('dealership.contact.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="dealershipEmail"
                      type="email"
                      placeholder="contact@autoquote.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dealershipWebsite">
                  {t('dealership.contact.website')}
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="dealershipWebsite"
                    placeholder="https://www.autoquote.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button className="w-full">
                {t('dealership.actions.save')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dealership.location.title')}</CardTitle>
              <CardDescription>
                {t('dealership.location.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dealershipAddress">
                  {t('dealership.location.address')}
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="dealershipAddress"
                    placeholder="123 Dealer Street"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dealershipCity">
                    {t('dealership.location.city')}
                  </Label>
                  <Input
                    id="dealershipCity"
                    placeholder="Montreal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealershipProvince">
                    {t('dealership.location.province')}
                  </Label>
                  <Input
                    id="dealershipProvince"
                    placeholder="Quebec"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealershipPostal">
                    {t('dealership.location.postal')}
                  </Label>
                  <Input
                    id="dealershipPostal"
                    placeholder="H1A 1A1"
                  />
                </div>
              </div>

              <Button className="w-full">
                {t('dealership.actions.save')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Side Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('dealership.hours.title')}</CardTitle>
              <CardDescription>
                {t('dealership.hours.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id={`${day}-open`} />
                      <Label htmlFor={`${day}-open`} className="capitalize">
                        {t(`dealership.hours.days.${day}`)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Input
                        type="time"
                        defaultValue="09:00"
                        className="w-24"
                      />
                      <span>-</span>
                      <Input
                        type="time"
                        defaultValue="17:00"
                        className="w-24"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full">
                {t('dealership.actions.save')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dealership.visibility.title')}</CardTitle>
              <CardDescription>
                {t('dealership.visibility.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('dealership.visibility.showInSearch')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('dealership.visibility.showInSearchDesc')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('dealership.visibility.allowMessages')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('dealership.visibility.allowMessagesDesc')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
