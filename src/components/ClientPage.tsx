// components/ClientPage.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ClientPage({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return <>{children}</>;
}
