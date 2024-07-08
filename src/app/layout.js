import './globals.css';
import { Inter } from 'next/font/google';
import ClientProvider from '../component/ClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js with Cognito ',
  description: 'Authentication example with AWS Cognito and Redux in Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}