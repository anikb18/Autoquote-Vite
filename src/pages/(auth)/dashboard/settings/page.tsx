import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Lock, User, Globe, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {t('settings.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="profile"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              <User className="h-4 w-4 mr-2" />
              {t('settings.tabs.profile')}
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              <Bell className="h-4 w-4 mr-2" />
              {t('settings.tabs.notifications')}
            </TabsTrigger>
            <TabsTrigger 
              value="security"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              <Lock className="h-4 w-4 mr-2" />
              {t('settings.tabs.security')}
            </TabsTrigger>
            <TabsTrigger 
              value="billing"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {t('settings.tabs.billing')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">{t('settings.profile.title')}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {t('settings.profile.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dealerName" className="text-sm font-medium text-gray-700">{t('settings.profile.dealerName')}</Label>
                    <Input 
                      id="dealerName" 
                      placeholder="AutoQuote Motors"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700">{t('settings.profile.email')}</Label>
                    <Input 
                      id="contactEmail" 
                      type="email" 
                      placeholder="contact@autoquote.com"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">{t('settings.profile.phone')}</Label>
                    <Input 
                      id="phone" 
                      placeholder="(555) 123-4567"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium text-gray-700">{t('settings.profile.website')}</Label>
                    <Input 
                      id="website" 
                      placeholder="https://www.autoquote.com"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">{t('settings.profile.address')}</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Dealer Street"
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  {t('settings.save')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">{t('settings.notifications.title')}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {t('settings.notifications.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium text-gray-900">{t('settings.notifications.newQuotes')}</Label>
                      <p className="text-sm text-gray-500">
                        {t('settings.notifications.newQuotesDesc')}
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium text-gray-900">{t('settings.notifications.quoteUpdates')}</Label>
                      <p className="text-sm text-gray-500">
                        {t('settings.notifications.quoteUpdatesDesc')}
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium text-gray-900">{t('settings.notifications.marketing')}</Label>
                      <p className="text-sm text-gray-500">
                        {t('settings.notifications.marketingDesc')}
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  {t('settings.save')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">{t('settings.security.title')}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {t('settings.security.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">{t('settings.security.currentPassword')}</Label>
                    <Input 
                      id="currentPassword" 
                      type="password"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">{t('settings.security.newPassword')}</Label>
                    <Input 
                      id="newPassword" 
                      type="password"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">{t('settings.security.confirmPassword')}</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  {t('settings.security.changePassword')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">{t('settings.billing.title')}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {t('settings.billing.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{t('settings.billing.currentPlan')}</h3>
                        <p className="text-sm text-gray-500">Pro Plan</p>
                      </div>
                      <Button 
                        variant="outline"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        {t('settings.billing.upgrade')}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{t('settings.billing.paymentMethod')}</h3>
                        <p className="text-sm text-gray-500">Visa ending in 4242</p>
                      </div>
                      <Button 
                        variant="outline"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        {t('settings.billing.update')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
