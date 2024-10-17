import type {Metadata} from 'next';
import './globals.css';
import {Providers} from '@/app/providers';
import Header from '@/components/Header';

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
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
