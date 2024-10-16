'use client';

import {AuthProvider} from '@/app/AuthProvider';
import {NextUIProvider} from '@nextui-org/react';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </AuthProvider>
  );
}
