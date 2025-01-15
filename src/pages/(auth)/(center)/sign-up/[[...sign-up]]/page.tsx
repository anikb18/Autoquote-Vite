'use client';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../../../providers/AuthProvider';
import { useState } from 'react';

export default function SignUpPage() {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({ email, password, firstName, lastName });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="mt-10 sm:mt-16 sm:mx-auto sm:w-full sm:max-w-[480px] animate-fade-up">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-[conic-gradient(from_0deg_at_50%_50%,#003139_0%,#0496ff_25%,#446df6_50%,#9b4bff_75%,#003139_100%)] rounded-[28px] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003139]/10 via-[#0496ff]/8 to-[#9b4bff]/5 rounded-[24px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#446df6_0%,_#0496ff_50%,_#003139_100%)] opacity-[0.08] rounded-[24px]" />
          <div className="mx-4 overflow-hidden rounded-[24px] bg-white/90 shadow-[0_4px_40px_-4px_rgba(0,49,57,0.12)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_8px_50px_-4px_rgba(4,150,255,0.25)] hover:bg-white hover:scale-[1.001] sm:mx-0">
            <div className="relative px-8 py-10 sm:px-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#003139_0%,_transparent_100%)] opacity-[0.03]" />
              
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('auth.createAccount')}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {t('auth.signUpDescription')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('auth.firstName')}</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="mt-1.5 block w-full appearance-none rounded-[14px] border border-gray-200 bg-white/90 px-4 py-3 text-[15px] placeholder-gray-400 shadow-sm transition-all duration-300 focus:border-[#446df6] focus:bg-white focus:outline-none focus:ring-[#446df6] hover:border-gray-300 focus:shadow-[0_2px_12px_-4px_rgba(68,109,246,0.16)] focus:scale-[1.001]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('auth.lastName')}</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="mt-1.5 block w-full appearance-none rounded-[14px] border border-gray-200 bg-white/90 px-4 py-3 text-[15px] placeholder-gray-400 shadow-sm transition-all duration-300 focus:border-[#446df6] focus:bg-white focus:outline-none focus:ring-[#446df6] hover:border-gray-300 focus:shadow-[0_2px_12px_-4px_rgba(68,109,246,0.16)] focus:scale-[1.001]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1.5 block w-full appearance-none rounded-[14px] border border-gray-200 bg-white/90 px-4 py-3 text-[15px] placeholder-gray-400 shadow-sm transition-all duration-300 focus:border-[#446df6] focus:bg-white focus:outline-none focus:ring-[#446df6] hover:border-gray-300 focus:shadow-[0_2px_12px_-4px_rgba(68,109,246,0.16)] focus:scale-[1.001]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1.5 block w-full appearance-none rounded-[14px] border border-gray-200 bg-white/90 px-4 py-3 text-[15px] placeholder-gray-400 shadow-sm transition-all duration-300 focus:border-[#446df6] focus:bg-white focus:outline-none focus:ring-[#446df6] hover:border-gray-300 focus:shadow-[0_2px_12px_-4px_rgba(68,109,246,0.16)] focus:scale-[1.001]"
                  />
                </div>

                {error && (
                  <div className="mt-2.5 text-[15px] text-red-600 animate-shake">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-[14px] shadow-sm text-[15px] font-medium text-white bg-[#446df6] transition-all duration-300 hover:bg-[#446df6]/90 hover:shadow-md hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#446df6] active:scale-[0.99]"
                >
                  {t('auth.signUp')}
                </Button>

                <div className="text-center">
                  <span className="text-[15px] text-gray-600">
                    {t('auth.alreadyHaveAccount')}{' '}
                  </span>
                  <Link
                    to="/login"
                    className="text-[15px] font-medium text-[#446df6] transition-all duration-300 hover:text-[#446df6]/80 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {t('auth.signIn')}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
