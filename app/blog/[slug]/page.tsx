import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link'; // Import Link
import Image from 'next/image'; // Import Image
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

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    coverImage?: string;
  };
}

// Define the page props interface
interface PageProps {
  params: Promise<{ // This should be `Promise` if generateStaticParams or similar returns a Promise
    slug: string
  }>
}

async function getAllPosts(): Promise<Post[]> {
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

  posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return {
    content,
    frontmatter: data,
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getPost(slug);

  // Combine post-specific details with general keywords
  const generalKeywords = 'Leads Österreich, Firmenadressen kaufen, B2B Leads, Direktmarketing Österreich, Unternehmensdaten';
  const postKeywords = `${frontmatter.title}, ${frontmatter.description}`;
  const combinedKeywords = `${postKeywords}, ${generalKeywords}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: combinedKeywords,
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
        <p className="text-gray-600 text-sm mb-6">
          {new Date(frontmatter.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })} von {frontmatter.author}
        </p>
        <MDXRemote source={content} components={components} />
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Weitere interessante Beiträge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((post) => (
              <div key={post.slug} className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 border-l-4 border-[var(--color-primary)] border-r-4">
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
                    <span className="inline-block mt-4 text-gray-900 font-medium hover:text-[var(--color-accent)] transition-colors duration-200">Weiterlesen &rarr;</span>
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