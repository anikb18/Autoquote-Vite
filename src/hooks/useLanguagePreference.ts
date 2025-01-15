import { useEffect, useState } from 'react';

const LANGUAGE_KEY = 'preferred_language';

export function useLanguagePreference() {
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Get the language from local storage or default to 'en-US'
    const storedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en-US';
    setLanguage(storedLanguage);
  }, []);

  const updateLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
  };

  return { language, updateLanguage };
}
