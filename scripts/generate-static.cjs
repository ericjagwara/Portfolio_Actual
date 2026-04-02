#!/usr/bin/env node
/**
 * Static Site Generator for Netlify SEO
 * 
 * This script runs AFTER vite build. It reads the built index.html,
 * then creates per-route copies with REAL content injected so that
 * search engines see actual text, metadata, and structured data
 * without needing JavaScript.
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
// Use the correct domain
const BASE_URL = "https://ericjagwara.com";

// Read the built index.html template
const baseHtml = fs.readFileSync(INDEX_HTML, 'utf8');

// ── Helpers ──────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Strip markdown formatting to plain text */
function stripMarkdown(md) {
  return md
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Convert markdown content to basic semantic HTML for SEO */
function markdownToHtml(md) {
  const blocks = md.split(/\n\n+/);
  let html = '';

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const h3Match = trimmed.match(/^### (.+)/);
    const h2Match = trimmed.match(/^## (.+)/);
    if (h2Match) {
      html += `<h2>${escapeHtml(h2Match[1])}</h2>\n`;
      continue;
    }
    if (h3Match) {
      html += `<h3>${escapeHtml(h3Match[1])}</h3>\n`;
      continue;
    }

    if (trimmed.match(/^[-*]\s/) || trimmed.match(/^\d+\.\s/)) {
      const items = trimmed.split('\n').filter(l => l.trim());
      html += '<ul>\n';
      for (const item of items) {
        const text = item.replace(/^[-*\d.]\s*/, '').trim();
        html += `<li>${escapeHtml(text)}</li>\n`;
      }
      html += '</ul>\n';
      continue;
    }

    if (trimmed.startsWith('```')) continue;

    html += `<p>${escapeHtml(stripMarkdown(trimmed))}</p>\n`;
  }

  return html;
}

/**
 * Inject per-page content into the base HTML template.
 * 
 * 1. Replace <title> with page-specific title
 * 2. Replace <meta name="description"> 
 * 3. Add/replace <link rel="canonical">
 * 4. Add Open Graph and Twitter meta tags
 * 5. Add JSON-LD structured data
 * 6. Add a <noscript> block with the actual page content as semantic HTML
 */
function injectContent({ title, description, url, content, jsonLd, lang }) {
  let html = baseHtml;

  // 1. Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  // 2. Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // 3. Add/replace canonical URL
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${escapeHtml(url)}" />`
    );
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${escapeHtml(url)}" />\n  </head>`);
  }

  // 4. Add/replace Open Graph tags
  const ogTags = `
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${BASE_URL}/images/blog-og.png" />
    <meta property="og:site_name" content="Eric Jagwara" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${BASE_URL}/images/blog-og.png" />`;

  // Remove existing OG/Twitter tags to avoid duplicates
  html = html.replace(/<meta property="og:[^"]*" content="[^"]*"\s*\/?>\s*/g, '');
  html = html.replace(/<meta name="twitter:[^"]*" content="[^"]*"\s*\/?>\s*/g, '');

  html = html.replace('</head>', `${ogTags}\n  </head>`);

  // 5. Add JSON-LD structured data before </head>
  if (jsonLd) {
    const ldScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
    html = html.replace('</head>', `    ${ldScript}\n  </head>`);
  }

  // 6. Set lang attribute
  if (lang) {
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  }

  // 7. Add <noscript> block with real content
  // This is the KEY fix — crawlers see real text even without JS
  if (content) {
    const noscriptBlock = `
    <noscript>
      <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:system-ui,-apple-system,sans-serif;color:#c8ccd4;background:#07090e;">
        <nav style="margin-bottom:32px;">
          <a href="/" style="color:#c8973e;text-decoration:none;margin-right:16px;">Home</a>
          <a href="/experience" style="color:#c8973e;text-decoration:none;margin-right:16px;">Experience</a>
          <a href="/research" style="color:#c8973e;text-decoration:none;margin-right:16px;">Research</a>
          <a href="/community" style="color:#c8973e;text-decoration:none;margin-right:16px;">Community</a>
          <a href="/open-source" style="color:#c8973e;text-decoration:none;margin-right:16px;">Open Source</a>
          <a href="/blog" style="color:#c8973e;text-decoration:none;margin-right:16px;">Blog</a>
          <a href="/events" style="color:#c8973e;text-decoration:none;">Events</a>
        </nav>
        <article>
          <h1>${escapeHtml(title)}</h1>
          <p><em>${escapeHtml(description)}</em></p>
          ${content}
        </article>
        <footer style="margin-top:48px;padding-top:24px;border-top:1px solid #1e222e;">
          <p>&copy; ${new Date().getFullYear()} Jagwara Eric Ofuono &mdash; Kampala, Uganda</p>
        </footer>
      </div>
    </noscript>`;

    html = html.replace('<div id="root"></div>', `<div id="root"></div>${noscriptBlock}`);
  }

  return html;
}

// ── Parse blog posts from posts.ts ──────────────────────────────────

const postsFile = path.join(__dirname, '..', 'src', 'content', 'blog', 'posts.ts');
const postsRaw = fs.readFileSync(postsFile, 'utf8');

// Extract post objects using regex
const postRegex = /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*tags:\s*\[([^\]]*)\][\s\S]*?readingTime:\s*(\d+)[\s\S]*?language:\s*"([^"]+)"[\s\S]*?content:\s*`([\s\S]*?)`/g;

const posts = [];
let m;
while ((m = postRegex.exec(postsRaw)) !== null) {
  posts.push({
    slug: m[1],
    title: m[2],
    date: m[3],
    description: m[4],
    tags: m[5].replace(/"/g, '').split(',').map(t => t.trim()).filter(Boolean),
    readingTime: parseInt(m[6], 10),
    language: m[7],
    content: m[8],
  });
}

console.log(`\nFound ${posts.length} blog posts`);

// ── Generate blog index HTML for the /blog page ─────────────────────

function generateBlogIndexHtml() {
  let html = '<h2>All Articles</h2>\n<ul>\n';
  for (const post of posts) {
    html += `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a> &mdash; <time datetime="${post.date}">${post.date}</time></li>\n`;
  }
  html += '</ul>';
  return html;
}

// ── Static pages ────────────────────────────────────────────────────

const STATIC_PAGES = [
  {
    route: '/experience',
    title: 'Experience & Education | Eric Jagwara',
    description: 'Professional experience in AI engineering, embedded systems, freelance web development, cybersecurity consulting, and competitive machine learning.',
    contentHtml: `
      <h2>Professional Experience</h2>
      <p>Eric Jagwara is a multidisciplinary AI and Embedded Systems Engineer based in Kampala, Uganda. His career spans artificial intelligence, machine learning, embedded systems, web development, cybersecurity consulting, and competitive data science on Zindi.</p>
      <h3>Key Roles</h3>
      <ul>
        <li>AI and Embedded Systems Engineer</li>
        <li>Freelance Web Developer and UI/UX Designer</li>
        <li>Cybersecurity Consultant at Solid Elf Security</li>
        <li>Competitive Data Scientist on Zindi</li>
      </ul>
      <h3>Education</h3>
      <ul>
        <li>ISBAT University</li>
        <li>Ndejje University</li>
      </ul>`,
  },
  {
    route: '/research',
    title: 'Research & Publications | Eric Jagwara',
    description: 'Research across assistive technology, agricultural AI, health AI, NLP for African languages, climate geospatial AI, and public health data science.',
    contentHtml: `
      <h2>Research and Publications</h2>
      <p>Eric Jagwara conducts research across assistive technology, agricultural AI, health AI, NLP for African languages, climate and geospatial AI, and public health data science. His work focuses on applying machine learning to real-world problems in African contexts.</p>`,
  },
  {
    route: '/community',
    title: 'Community & Leadership | Eric Jagwara',
    description: 'Zindi Uganda Country Ambassador, Young AI Leaders Kampala Hub Leader, Deep Learning Indaba, IndabaX Uganda, and Data Science Africa.',
    contentHtml: `
      <h2>Community and Leadership</h2>
      <p>Eric Jagwara serves as Zindi Uganda Country Ambassador and Young AI Leaders Kampala Hub Leader. He is an active member of Deep Learning Indaba, IndabaX Uganda, and Data Science Africa, contributing to the growth of the AI ecosystem across the continent.</p>`,
  },
  {
    route: '/open-source',
    title: 'Open Source Projects | Eric Jagwara',
    description: 'WordPress plugins, cybersecurity tools, Zindi ML competition notebooks, AIoT firmware, and Responsible AI training resources.',
    contentHtml: `
      <h2>Open Source and Projects</h2>
      <p>Open source contributions including WordPress plugins, cybersecurity tools, Zindi machine learning competition notebooks, AIoT firmware for embedded systems, and Responsible AI training resources.</p>`,
  },
  {
    route: '/blog',
    title: 'Blog | Eric Jagwara — AI, Technology & Africa',
    description: 'Technical deep-dive articles on AI engineering, machine learning, cybersecurity, and technology in African markets. Written in English, Portuguese, and French.',
    contentHtml: generateBlogIndexHtml(),
  },
  {
    route: '/events',
    title: 'Events | Eric Jagwara',
    description: 'Conference talks, AI workshops, community gatherings, and training sessions across Uganda and globally.',
    contentHtml: `
      <h2>Events</h2>
      <p>Upcoming and past events including conference talks, AI workshops, community gatherings, and training sessions across Uganda and globally.</p>`,
  },
];

// ── Generate static pages ───────────────────────────────────────────

console.log('\nGenerating static pages...');

for (const page of STATIC_PAGES) {
  const routeDir = path.join(DIST_DIR, page.route.slice(1));
  const routeIndex = path.join(routeDir, 'index.html');

  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  const html = injectContent({
    title: page.title,
    description: page.description,
    url: `${BASE_URL}${page.route}`,
    content: page.contentHtml,
    lang: 'en',
  });

  fs.writeFileSync(routeIndex, html);
  console.log(`  ✓ ${page.route}`);
}

// ── Generate blog post pages ────────────────────────────────────────

console.log('\nGenerating blog post pages...');

const blogDir = path.join(DIST_DIR, 'blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

let generated = 0;
for (const post of posts) {
  const postDir = path.join(blogDir, post.slug);
  const postIndex = path.join(postDir, 'index.html');

  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  const contentHtml = markdownToHtml(post.content);

  const fullContentHtml = `
    <p style="color:#6e7585;font-size:14px;">
      <time datetime="${post.date}">${post.date}</time> &middot; ${post.readingTime} min read &middot; 
      ${post.tags.map(t => escapeHtml(t)).join(' &middot; ')}
    </p>
    ${contentHtml}
    <p style="margin-top:32px;"><a href="/blog" style="color:#c8973e;">&larr; Back to all posts</a></p>`;

  const langCode = post.language === 'pt' ? 'pt-AO' : post.language === 'fr' ? 'fr-CD' : 'en';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Eric Jagwara",
      "url": BASE_URL,
    },
    "publisher": {
      "@type": "Person",
      "name": "Eric Jagwara",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    "url": `${BASE_URL}/blog/${post.slug}`,
    "image": `${BASE_URL}/images/blog-og.png`,
    "keywords": post.tags.join(", "),
    "inLanguage": langCode,
    "wordCount": post.content.split(/\s+/).length,
  };

  const html = injectContent({
    title: `${post.title} | Eric Jagwara`,
    description: post.description,
    url: `${BASE_URL}/blog/${post.slug}`,
    content: fullContentHtml,
    jsonLd,
    lang: post.language || 'en',
  });

  fs.writeFileSync(postIndex, html);
  generated++;
}

console.log(`  ✓ Generated ${generated} blog post pages with full content`);
console.log(`\n✅ Static site generation complete!`);
console.log(`Total pages: ${STATIC_PAGES.length + generated + 1} (including homepage)`);
