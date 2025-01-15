import { useState, useEffect } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Bell, Globe, Mail, Phone, User, Shield } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  language: string;
  notifications_enabled: boolean;
  preferred_contact: 'email' | 'phone' | 'both';
  avatar_url?: string;
  email_verified: boolean;
  phone_verified: boolean;
  two_factor_enabled: boolean;
  marketing_emails: boolean;
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: user?.id || '',
    name: user?.user_metadata?.name || '',
    phone: user?.user_metadata?.phone || '',
    language: user?.user_metadata?.language || 'fr-CA',
    notifications_enabled: user?.user_metadata?.notifications_enabled ?? true,
    preferred_contact: user?.user_metadata?.preferred_contact || 'email',
    avatar_url: user?.user_metadata?.avatar_url,
    email_verified: user?.email_verified ?? false,
    phone_verified: user?.phone_verified ?? false,
    two_factor_enabled: user?.two_factor_enabled ?? false,
    marketing_emails: user?.user_metadata?.marketing_emails ?? true,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(t('profile.error.fetch'));
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Update profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (profileError) throw profileError;

      // Update user metadata
      const { error: userError } = await supabase.auth.updateUser({
        data: {
          name: profile.name,
          phone: profile.phone,
          language: profile.language,
          notifications_enabled: profile.notifications_enabled,
          preferred_contact: profile.preferred_contact,
          avatar_url: profile.avatar_url,
          email_verified: profile.email_verified,
          phone_verified: profile.phone_verified,
          two_factor_enabled: profile.two_factor_enabled,
          marketing_emails: profile.marketing_emails,
        },
      });

      if (userError) throw userError;

      toast.success(t('profile.success.save'));
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error(t('profile.error.save'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('profile.title')}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {t('profile.description')}
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            {t('profile.tabs.personal')}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            {t('profile.tabs.notifications')}
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            {t('profile.tabs.security')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.personal_info')}</CardTitle>
              <CardDescription>
                {t('profile.personal_info_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={() => {/* TODO: Implement avatar upload */}}>
                  {t('profile.change_avatar')}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('profile.name')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('profile.phone')}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                  {profile.phone_verified ? (
                    <span className="inline-flex items-center text-xs text-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      {t('profile.phone_verified')}
                    </span>
                  ) : (
                    <Button variant="link" className="h-auto p-0 text-xs">
                      {t('profile.verify_phone')}
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('profile.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={user?.email}
                      disabled
                      className="pl-10 bg-gray-50"
                    />
                  </div>
                  {profile.email_verified ? (
                    <span className="inline-flex items-center text-xs text-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      {t('profile.email_verified')}
                    </span>
                  ) : (
                    <Button variant="link" className="h-auto p-0 text-xs">
                      {t('profile.verify_email')}
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">{t('profile.language')}</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Select
                      value={profile.language}
                      onValueChange={(value) => setProfile((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder={t('profile.select_language')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr-CA">Français (Canada)</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.notification_preferences')}</CardTitle>
              <CardDescription>
                {t('profile.notification_preferences_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t('profile.notifications_enabled')}</Label>
                    <p className="text-sm text-gray-500">
                      {t('profile.notifications_enabled_description')}
                    </p>
                  </div>
                  <Switch
                    checked={profile.notifications_enabled}
                    onCheckedChange={(checked) => setProfile((prev) => ({ ...prev, notifications_enabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t('profile.marketing_emails')}</Label>
                    <p className="text-sm text-gray-500">
                      {t('profile.marketing_emails_description')}
                    </p>
                  </div>
                  <Switch
                    checked={profile.marketing_emails}
                    onCheckedChange={(checked) => setProfile((prev) => ({ ...prev, marketing_emails: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('profile.preferred_contact')}</Label>
                  <Select
                    value={profile.preferred_contact}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, preferred_contact: value as 'email' | 'phone' | 'both' }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('profile.select_contact_method')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">{t('profile.contact.email')}</SelectItem>
                      <SelectItem value="phone">{t('profile.contact.phone')}</SelectItem>
                      <SelectItem value="both">{t('profile.contact.both')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.security_settings')}</CardTitle>
              <CardDescription>
                {t('profile.security_settings_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t('profile.two_factor_auth')}</Label>
                    <p className="text-sm text-gray-500">
                      {t('profile.two_factor_auth_description')}
                    </p>
                  </div>
                  <Switch
                    checked={profile.two_factor_enabled}
                    onCheckedChange={(checked) => {
                      // TODO: Implement 2FA setup flow
                      setProfile((prev) => ({ ...prev, two_factor_enabled: checked }));
                    }}
                  />
                </div>

                {!profile.email_verified && (
                  <div className="rounded-lg bg-yellow-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          {t('profile.verify_email_notice')}
                        </h3>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            {t('profile.send_verification_email')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={saving}
          className="min-w-[120px]"
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('profile.saving')}
            </div>
          ) : (
            t('profile.save')
          )}
        </Button>
      </div>
    </div>
  );
}
