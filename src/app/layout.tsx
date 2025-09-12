import './globals.css';
import SessionProviderWrapper from '../providers/SessionProviderWrapper'
import Head from 'next/head';
export const metadata = {
  title: 'Danial Arif Store',
  icons: {
    icon: '/Danial.png', // must be in public/
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
