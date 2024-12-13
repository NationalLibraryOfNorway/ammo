import type {Metadata} from 'next';
import './globals.css';
import {Providers} from '@/app/providers';
import Header from '@/components/ui/Header';
import {ReactNode} from 'react';
import {ThemeLayout} from '@/components/layouts/ThemeLayout';
import {ThemeProvider} from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'AMMO',
  description: 'Alt Mulig-MOttak',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ThemeProvider>
      <ThemeLayout>
        <Providers>
          <main>
            <div className="min-h-screen flex flex-col text-center">
              <Header/>
              <div className="flex justify-center pt-6">
                {children}
              </div>
              <footer className="flex-grow py-3 flex justify-center items-end">
                <p className="text-sm">Nasjonalbiblioteket &copy; 2024</p>
              </footer>
            </div>
          </main>
        </Providers>
      </ThemeLayout>
    </ThemeProvider>

  );
}
