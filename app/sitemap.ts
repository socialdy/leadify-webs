import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'; // Import from lib/blog

const BASE_URL = "https://www.leadify.at";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllPosts();

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
    lastModified: new Date(post.frontmatter.date).toISOString(),
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