import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'], // Multiple weights
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.className} w-full max-w-screen-xl mx-auto flex flex-col items-center`}>
      <Component {...pageProps} />
    </main>
  );
}
