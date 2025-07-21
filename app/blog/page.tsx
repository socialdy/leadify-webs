import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image'; // Importiere Image Komponente

export const metadata = {
  title: 'Leadify Blog | Einblicke, Tipps & Neuigkeiten zur Lead-Generierung',
  description: 'Entdecken Sie wertvolle Einblicke, praktische Tipps und aktuelle Neuigkeiten rund um die Themen Lead-Generierung, Firmendaten und effektive Vertriebsstrategien für Ihr B2B-Geschäft in Österreich.',
  keywords: 'Leads Österreich, Firmenadressen kaufen, B2B Leads, Direktmarketing Österreich, Unternehmensdaten, Blog Österreich, Lead-Generierung Blog, Vertriebsstrategien, B2B Marketing Blog',
};

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    coverImage?: string; // coverImage ist optional
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

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className=" text-gray-600">Entdecken Sie wertvolle Einblicke, Tipps und Neuigkeiten rund um das Thema Lead-Generierung, Firmendaten und Vertriebsstrategien.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.frontmatter.title}</h2>
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
    </div>
  );
} 