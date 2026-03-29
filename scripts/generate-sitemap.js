// Sitemap generator - runs at build time
// Generates sitemap.xml with all pages and blog posts
// Uses relative URLs for Netlify compatibility

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use environment variable or default to relative URLs for Netlify
const BASE_URL = process.env.SITE_URL || '';
const TODAY = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'monthly' },
  { loc: '/experience', priority: '0.9', changefreq: 'monthly' },
  { loc: '/research', priority: '0.9', changefreq: 'monthly' },
  { loc: '/community', priority: '0.8', changefreq: 'monthly' },
  { loc: '/open-source', priority: '0.8', changefreq: 'monthly' },
  { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
  { loc: '/events', priority: '0.7', changefreq: 'weekly' },
];

// Read and parse blog posts
const postsPath = join(__dirname, '../src/content/blog/posts.ts');
const postsContent = readFileSync(postsPath, 'utf-8');

// Extract slugs and dates using regex
const postMatches = postsContent.matchAll(/slug:\s*["']([^"']+)["'][\s\S]*?date:\s*["']([^"']+)["']/g);
const blogPosts = Array.from(postMatches).map(match => ({
  slug: match[1],
  date: match[2]
}));

// Generate XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Static Pages -->
${staticPages.map(page => `  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}

  <!-- Blog Posts -->
${blogPosts.map(post => `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}

</urlset>
`;

// Write to public folder
const outputPath = join(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, sitemap);

console.log(`✓ Sitemap generated with ${staticPages.length} pages and ${blogPosts.length} blog posts`);
