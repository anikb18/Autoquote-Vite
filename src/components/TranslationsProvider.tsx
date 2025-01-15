'use client';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

interface TranslationsProviderProps {
  children: React.ReactNode;
}

export function TranslationsProvider({
  children,
}: TranslationsProviderProps) {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
