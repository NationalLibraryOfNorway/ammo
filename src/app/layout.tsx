import type {Metadata} from 'next';
import './globals.css';
import {Providers} from '@/app/providers';

export const metadata: Metadata = {
  title: 'AMMO',
  description: 'Alt Mulig-MOttak',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
