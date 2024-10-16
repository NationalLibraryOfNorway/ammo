'use client';

import {AuthProvider} from '@/app/AuthProvider';
import {NextUIProvider} from '@nextui-org/react';
import React from 'react';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <React.StrictMode>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </React.StrictMode>
    </AuthProvider>
  );
}
