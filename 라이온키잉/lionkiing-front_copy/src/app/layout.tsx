import type { Metadata } from 'next';
import '../styles/globals.css';
import GNB from './_common/components/gnb';

export const metadata: Metadata = {
  title: 'SKYST LionKiing',
  description: 'SKYST LionKiing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='w-screen h-screen'>
        <main className='min-w-[360px] max-w-[415px] lg:max-w-[375px] h-screen mx-auto rounded-4xl'>
          {children}
          <GNB />
        </main>
      </body>
    </html>
  );
}
