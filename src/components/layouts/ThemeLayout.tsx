'use client';

import {ReactNode} from 'react';
import {useTheme} from '@/providers/ThemeProvider';

export const ThemeLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <html lang="en" className={theme}>
      <body>
        {children}
      </body>
    </html>
  );
};