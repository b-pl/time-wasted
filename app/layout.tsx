import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Providers} from '@/app/providers';

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
        {children}
      </Providers>
      </body>
    </html>
  );
}
