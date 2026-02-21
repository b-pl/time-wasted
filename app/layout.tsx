import type { Metadata } from "next";
import "./globals.css";
import {Providers} from '@/app/providers';
import {WatchTimeProvider} from '@/app/contexts/WatchTimeContext';

export const metadata: Metadata = {
  title: "How much time You've wasted watching TV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body>
      <Providers>
          <WatchTimeProvider>
            {children}
          </WatchTimeProvider>
      </Providers>
      </body>
    </html>
  );
}
