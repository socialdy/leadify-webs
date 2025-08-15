import '../styles/globals.css'; // Adjust path if your global CSS is elsewhere
import { HeroHeader } from '@/components/ui/Header'; // Corrected import
import Footer from '@/components/ui/Footer';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], // Combined weights
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${poppins.variable}`}>
      <head>
        <title>Leadify - Finden Sie Ihre Leads</title>
        <meta name="description" content="Finden und kaufen Sie hochwertige Firmenadressen und Leads für Ihr Direktmarketing in Österreich." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.ico" />
      </head>
      <body className={`${poppins.className} w-full max-w-screen-xl mx-auto flex flex-col items-center`}>
        <HeroHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
} 