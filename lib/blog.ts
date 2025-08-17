import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    coverImage?: string;
    lastModified?: string;
  };
}

export async function getAllPosts(): Promise<Post[]> {
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

export async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return {
    content,
    frontmatter: data,
  };
} 