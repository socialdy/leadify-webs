import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link'; // Import Link
import Image from 'next/image'; // Import Image
import { getAllPosts, getPost } from '@/lib/blog'; // Import from lib/blog
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Metadata } from 'next';

// Import any custom components you might use in your MDX posts
// import CallToAction2 from '@/components/your-ui-library/CallToAction2';
// import LeadSearchSection from '@/components/your-ui-library/LeadSearchSection';

const components = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
};

// Define the page props interface
interface PageProps {
  params: Promise<{ // This should be `Promise` if generateStaticParams or similar returns a Promise
    slug: string
  }>
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getPost(slug);

  // Combine post-specific details with general keywords
  const generalKeywords = 'firmenadressen kaufen österreich, firmenadressen kaufen, adressen kaufen, leads kaufen, Leads Österreich, Firmenadressen, B2B Leads, Direktmarketing Österreich, Unternehmensdaten';
  const combinedKeywords = `${generalKeywords}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: combinedKeywords,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://leadify.at/blog/${slug}`,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      images: frontmatter.coverImage
        ? [{
            url: `https://leadify.at${frontmatter.coverImage}`,
            alt: frontmatter.title,
          }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      creator: '@leadifyat',
      images: frontmatter.coverImage
        ? [`https://leadify.at${frontmatter.coverImage}`]
        : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const { content, frontmatter } = await getPost(slug);
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter(post => post.slug !== slug).slice(0, 3); // Max 3 verwandte Beiträge

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mt-20">{frontmatter.title}</h1>
        <p className="text-gray-600 text-sm mb-6 mt-3">
          {new Date(frontmatter.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })} von {frontmatter.author}
        </p>
        <MDXRemote source={content} components={components} />
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Weitere interessante Beiträge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((post) => (
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
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.frontmatter.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {new Date(post.frontmatter.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })} von {post.frontmatter.author}
                    </p>
                    <p className="text-gray-700">{post.frontmatter.description}</p>
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
      )}
    </div>
  );
} 