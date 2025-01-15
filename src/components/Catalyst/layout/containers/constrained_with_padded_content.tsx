'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ConstrainedWithPaddedContentProps {
  children: ReactNode;
  className?: string;
}

export function ConstrainedWithPaddedContent({ children, className }: ConstrainedWithPaddedContentProps) {
  return (
    <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}

// Re-export as Container for convenience
export { ConstrainedWithPaddedContent as Container };
