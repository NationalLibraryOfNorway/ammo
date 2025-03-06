'use client';

import {AuthProvider} from '@/providers/AuthProvider';
import {HeroUIProvider} from '@heroui/react';
import {ReactNode, StrictMode} from 'react';

export function Providers({children}: { children: ReactNode }) {
  return (
    <AuthProvider>
      <StrictMode>
        <HeroUIProvider locale='nb-NO'>
          {children}
        </HeroUIProvider>
      </StrictMode>
    </AuthProvider>
  );
}
