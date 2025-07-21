import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BASE_URL = "https://www.leadify.at";

async function getAllBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = fileName.replace(/\.mdx$/, '');
    
    return {
      slug,
      lastModified: new Date(data.date).toISOString(),
    };
  });
  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllBlogPosts();

  const federalStates = [
    'burgenland',
    'kaernten',
    'niederoesterreich',
    'oberoesterreich',
    'salzburg',
    'steiermark',
    'tirol',
    'vorarlberg',
    'wien',
  ];

  const cities = [
    'bregenz',
    'eisenstadt',
    'graz',
    'innsbruck',
    'klagenfurt',
    'linz',
    'salzburg',
    'st-poelten',
    'wien',
  ];

  const federalStatePages = federalStates.map((state): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}/firmenadressen-${state}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const cityPages = cities.map((city): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}/firmenadressen/stadt/${city}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/agb`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...federalStatePages,
    ...cityPages,
    ...blogPages,
  ];
} 