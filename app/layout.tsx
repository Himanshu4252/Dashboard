'use client';

import localFont from 'next/font/local';
import './globals.css';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';

// Load local fonts
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Wrapper to hook into Redux and set the class
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useSelector((state: any) => state.dashboard.darkMode);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-[#000000] dark:text-white`}
      >
        <Provider store={store}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </Provider>
      </body>
    </html>
  );
}

