'use client';

import {AuthProvider} from '@/providers/AuthProvider';
import {NextUIProvider} from '@nextui-org/react';
import {ReactNode, StrictMode} from 'react';

export function Providers({children}: { children: ReactNode }) {
  return (
    <AuthProvider>
      <StrictMode>
        <NextUIProvider locale='nb-NO'>
          {children}
        </NextUIProvider>
      </StrictMode>
    </AuthProvider>
  );
}
