import Head from "next/head";
import { Poppins } from "next/font/google";
import { HeroHeader as Header } from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { MarqueeDemo } from "@/components/ui/marquee";
import LeadSearchSection from "@/components/ui/LeadSearchSection";
import Faqs from "@/components/faqs-2";
import WordRotate from "@/components/magicui/word-rotate";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import ProcessFlow from "@/components/ui/ProcessFlow";
import LeistungsSection from "@/components/LeistungsSection";
import CallToAction2 from "@/components/ui/CallToAction2";
import ContactForm from "@/components/ui/ContactForm";
import { Toaster } from "sonner";
import fs from 'fs'; // Import fs
import path from 'path'; // Import path
import matter from 'gray-matter'; // Import gray-matter
import Link from 'next/link'; // Import Link
import Image from 'next/image'; // Import Image
import { truncateText } from '@/lib/utils'; // Import truncateText

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    coverImage?: string; // coverImage is optional
  };
}

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = fileName.replace(/\.mdx$/, '');

    return {
      slug,
      frontmatter: data as Post['frontmatter'],
    };
  });

  // Sort posts by date in descending order
  posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

interface LinzPageProps {
  posts: Post[];
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

const currentCity = {
  name: 'Linz',
  slug: 'linz',
};

const seo = {
  title: `Firmenadressen kaufen Linz | B2B Leads - Leadify.at`,
  description: `Firmenadressen in Linz kaufen: Präzise B2B Leads mit Telefon, E-Mail & Ansprechpartnern. DSGVO-konform, sofortiger Download in Excel/CSV. Ideal für Marketing & Vertrieb in Linz.`,
  ogTitle: `Firmenadressen kaufen aus Linz | B2B Adressen aus Linz kaufen`,
  ogDescription: `Firmenadressen mit unlimitierter Nutzung günstig kaufen aus Linz. Starte die Suche für Linz Adressen. Kostenloses Angebot &amp; sofortiger Excel &amp; CSV Download`,
  keywords: `Leads Linz, Firmenadressen kaufen Linz, B2B Leads Linz, Direktmarketing Linz, Unternehmensdaten Linz`,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.leadify.at";

export default function LinzPage({ posts }: LinzPageProps) {
  const dynamicBranchesWords = [
    "Softwareentwickler", "Kreativagenturen", "Unternehmensberater", "IT-Dienstleister",
    "Architekturbüros", "Einzelhändler", "Hotels", "Restaurants", "Steuerberater",
    "Ärzte", "Rechtsanwälte", "Webdesigner", "Immobilienmakler", "Eventplaner",
  ];

  const dynamicCitiesWords = [
    "Wels", "Steyr", "Leonding", "Traun",
  ];

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={seo.keywords} />
        <link rel="icon" href="/fav.ico" />
        <link rel="canonical" href={`${BASE_URL}/firmenadressen/stadt/${currentCity.slug}`} />
      </Head>
      <div
        className={`${poppins.className} grid grid-rows-[auto_1fr_auto] min-h-screen bg-[var(--background)] overflow-x-hidden`}
      >
        <Header />
        <main className="pt-20 md:pt-30 lg:pt-40 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] mb-4 break-words text-center">
                Firmenadressen kaufen <br/> {currentCity.name}
              </h1>
              <p className="text-base md:text-sm text-[var(--foreground)] max-w-2xl mx-auto mb-6">
                Firmenadressen günstig kaufen in {currentCity.name}. Starte jetzt die Suche nach B2B Adressen. Kostenloses Angebot & Sofortiger Kauf und Download in Excel, CSV und DSGVO konform. Daten aus {currentCity.name} mit Qualität.
              </p>

              <div className="flex gap-4 mb-10 justify-center mx-auto">
                <button
                  className="button-21"
                  role="button"
                  onClick={() => document.getElementById('firmensuche')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text">
                    Jetzt Firmensuche starten in {currentCity.name}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-6 mb-16 mx-auto w-full max-w-[160px] md:max-w-[160px] flex justify-center">
              <Image src="/img/website-badges-dsgvo-austria.png" alt="Trust Badges" width={150} height={75} className="w-[120px] h-auto md:w-full" />
            </div>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              <section className="w-full my-8 md:my-16">
                <p className="text-base text-center font-medium text-[var(--foreground)]">Unternehmen die uns vertrauen in {currentCity.name}</p>
                <MarqueeDemo />
              </section>
            </div>

            <section id="firmensuche">
              <LeadSearchSection className="my-8 md:my-16" defaultState={currentCity.name}></LeadSearchSection>
            </section>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center my-8 md:my-16 text-center flex-wrap w-full">
                <h2 className="text-2xl md:text-5xl font-bold text-[var(--foreground)] leading-tight flex items-center justify-center flex-wrap">
                  Ich suche alle
                  <WordRotate
                    words={dynamicBranchesWords}
                    duration={4000}
                    className="inline-block text-[var(--color-primary)] align-baseline"
                  />
                  <span className="inline-block align-baseline">aus</span>
                  <WordRotate
                    words={dynamicCitiesWords}
                    duration={4000}
                    className="inline-block text-[var(--color-primary)] align-baseline"
                  />
                </h2>
              </div>

              <section id="ablauf" className=" w-full">
                  <ProcessFlow />
              </section>
            </div>

            <LeistungsSection id="leistungen" className="my-4 md:my-8" />

            <section id="kunden" className="py-8 md:py-16 w-full">
                <Testimonials />
            </section>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              <CallToAction2 className="my-8 md:my-16" />

              <section id="preise" className="py-8 md:py-16 w-full">
                  <Pricing />
              </section>

              <section id="faq" className="py-8 md:py-16 w-full">
                  <Faqs />
              </section>

              {/* Blog Section - Start */}
              <section id="blog" className="py-8 md:py-16 w-full">
                <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl text-[var(--foreground)] mb-4">Blog</h2>
                <p className="text-base text-center text-gray-600 mb-8">Bleiben Sie auf dem Laufenden mit unseren neuesten Artikeln zu Lead-Generierung und Marketingstrategien.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.slug} className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 border-l-4 border-l-[#30E87A]">
                      <Link href={`/blog/${post.slug}`}>
                        {post.frontmatter.coverImage && (
                          <div className="relative w-full h-48">
                            <Image
                              src={post.frontmatter.coverImage}
                              alt={post.frontmatter.title}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="object-center"
                            />
                          </div>
                        )}
                        <div className="p-6 text-left">
                          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.frontmatter.title}</h2>
                          <p className="text-gray-600 text-sm mb-4">
                            {new Date(post.frontmatter.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })} von {post.frontmatter.author}
                          </p>
                          <p className="text-gray-700">{truncateText(post.frontmatter.description, 150)}</p>
                          <span className="inline-block mt-4 text-[#30E87A] font-medium">Weiterlesen →</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-12">
                  <Link href="/blog" className="button-21">Alle Blogs ansehen →</Link>
                </div>
              </section>
              {/* Blog Section - End */}

              <ContactForm />
            </div>
          </div>
        </main>

        <Footer />
      </div>
      <Toaster />
    </>
  );
} 