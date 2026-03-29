import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Link2, Globe, BookOpen } from "lucide-react";
import { C } from "@/constants/theme";
import { FadeIn, Cd, EL } from "@/components/common";
import { getPostBySlug, getRelatedPosts, blogPosts, type BlogPost } from "@/content/blog/posts";
import { useState, useMemo } from "react";

interface BlogPostPageProps {
  setPage: (page: string) => void;
}

const languageNames: Record<string, string> = {
  en: "English",
  pt: "Português",
  fr: "Français",
};

const languageFlags: Record<string, string> = {
  en: "🇬🇧",
  pt: "🇦🇴",
  fr: "🇨🇩",
};

export function BlogPostPage({ setPage }: BlogPostPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = useMemo(() => slug ? getRelatedPosts(slug, 4) : [], [slug]);
  
  if (!post) {
    return (
      <section className="min-h-screen py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl mb-4" style={{ color: C.bright }}>Post not found</h1>
          <button
            onClick={() => { setPage("Blog"); navigate("/blog"); }}
            className="text-sm hover:underline"
            style={{ color: C.accent }}
          >
            ← Back to Blog
          </button>
        </div>
      </section>
    );
  }

  const postUrl = `https://ericjagwara.github.io/blog/${post.slug}`;
  const shareText = `${post.title} by Eric Jagwara`;
  const postLang = (post as BlogPost & { language?: string }).language || "en";

  // Extract FAQs from content (sections with question-like headers)
  const extractFAQs = (content: string): Array<{ question: string; answer: string }> => {
    const faqs: Array<{ question: string; answer: string }> = [];
    const sections = content.split(/\n## /);
    
    sections.forEach(section => {
      const lines = section.trim().split('\n\n');
      const header = lines[0]?.trim();
      
      // Check if header looks like a question or a "How to" / "Why" / "What" section
      if (header && (
        header.endsWith('?') ||
        header.toLowerCase().startsWith('how ') ||
        header.toLowerCase().startsWith('why ') ||
        header.toLowerCase().startsWith('what ') ||
        header.toLowerCase().startsWith('when ')
      )) {
        const answer = lines.slice(1).join(' ').replace(/\n/g, ' ').trim().substring(0, 500);
        if (answer.length > 50) {
          faqs.push({ question: header, answer });
        }
      }
    });
    
    return faqs.slice(0, 5); // Max 5 FAQs
  };

  const faqs = extractFAQs(post.content);

  // Article schema for Google
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "@id": "https://ericjagwara.github.io/#person",
      "name": "Eric Jagwara",
      "url": "https://ericjagwara.github.io"
    },
    "publisher": {
      "@type": "Person",
      "@id": "https://ericjagwara.github.io/#person"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "url": postUrl,
    "image": "https://ericjagwara.github.io/images/blog-og.png",
    "keywords": post.tags.join(", "),
    "inLanguage": postLang === "pt" ? "pt-AO" : postLang === "fr" ? "fr-CD" : "en",
    "wordCount": post.content.split(/\s+/).length,
    "articleSection": post.tags[0] || "Technology",
    "about": post.tags.map(tag => ({ "@type": "Thing", "name": tag }))
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ericjagwara.github.io" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://ericjagwara.github.io/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": postUrl }
    ]
  };

  // FAQ schema (only if FAQs exist)
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Enhanced markdown to HTML with link support
  const renderContent = (content: string) => {
    // Helper to render inline elements (links, bold, etc.)
    const renderInline = (text: string, keyPrefix: string = '') => {
      const elements: React.ReactNode[] = [];
      let remaining = text;
      let keyIndex = 0;

      while (remaining.length > 0) {
        // Check for markdown links [text](url)
        const mdLinkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
        // Check for angle bracket links <url>
        const angleLinkMatch = remaining.match(/<(https?:\/\/[^>]+)>/);
        // Check for bold **text**
        const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

        // Find the earliest match
        const matches = [
          mdLinkMatch ? { type: 'mdlink', match: mdLinkMatch, index: remaining.indexOf(mdLinkMatch[0]) } : null,
          angleLinkMatch ? { type: 'anglelink', match: angleLinkMatch, index: remaining.indexOf(angleLinkMatch[0]) } : null,
          boldMatch ? { type: 'bold', match: boldMatch, index: remaining.indexOf(boldMatch[0]) } : null,
        ].filter(Boolean).sort((a, b) => a!.index - b!.index);

        if (matches.length === 0) {
          elements.push(remaining);
          break;
        }

        const earliest = matches[0]!;
        
        // Add text before the match
        if (earliest.index > 0) {
          elements.push(remaining.substring(0, earliest.index));
        }

        // Process the match
        if (earliest.type === 'mdlink') {
          const [, linkText, linkUrl] = earliest.match!;
          const isInternal = linkUrl.startsWith('/');
          if (isInternal) {
            elements.push(
              <Link
                key={`${keyPrefix}-link-${keyIndex++}`}
                to={linkUrl}
                className="underline hover:opacity-80"
                style={{ color: C.accent }}
              >
                {linkText}
              </Link>
            );
          } else {
            elements.push(
              <a
                key={`${keyPrefix}-link-${keyIndex++}`}
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: C.accent }}
              >
                {linkText}
              </a>
            );
          }
          remaining = remaining.substring(earliest.index + earliest.match![0].length);
        } else if (earliest.type === 'anglelink') {
          const [, linkUrl] = earliest.match!;
          // Extract domain for display
          const displayUrl = linkUrl.replace(/^https?:\/\//, '').split('/')[0];
          elements.push(
            <a
              key={`${keyPrefix}-link-${keyIndex++}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
              style={{ color: C.accent }}
            >
              {displayUrl}
            </a>
          );
          remaining = remaining.substring(earliest.index + earliest.match![0].length);
        } else if (earliest.type === 'bold') {
          const [, boldText] = earliest.match!;
          elements.push(
            <strong key={`${keyPrefix}-bold-${keyIndex++}`} style={{ color: C.bright }}>
              {boldText}
            </strong>
          );
          remaining = remaining.substring(earliest.index + earliest.match![0].length);
        }
      }

      return elements;
    };

    return content
      .split('\n\n')
      .map((block, i) => {
        const trimmed = block.trim();
        
        // Headers
        if (trimmed.startsWith('## ')) {
          return (
            <h2 
              key={i} 
              id={trimmed.replace('## ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              className="text-xl font-bold mt-8 mb-4" 
              style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}
            >
              {renderInline(trimmed.replace('## ', ''), `h2-${i}`)}
            </h2>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3 
              key={i}
              id={trimmed.replace('### ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              className="text-lg font-bold mt-6 mb-3" 
              style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}
            >
              {renderInline(trimmed.replace('### ', ''), `h3-${i}`)}
            </h3>
          );
        }
        
        // Code blocks (simple handling)
        if (trimmed.startsWith('```')) {
          const codeContent = trimmed.replace(/^```\w*\n?/, '').replace(/```$/, '');
          return (
            <pre 
              key={i} 
              className="text-xs p-4 rounded-lg overflow-x-auto mb-4"
              style={{ background: C.card, color: C.text, fontFamily: "'Space Mono',monospace" }}
            >
              {codeContent}
            </pre>
          );
        }

        // Tables (basic support)
        if (trimmed.includes('|') && trimmed.split('\n').length > 1) {
          const rows = trimmed.split('\n').filter(r => r.includes('|') && !r.match(/^\|?[-:]+\|/));
          if (rows.length > 0) {
            return (
              <div key={i} className="overflow-x-auto mb-4">
                <table className="text-xs w-full" style={{ color: C.text }}>
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr key={ri} style={{ borderBottom: `1px solid ${C.border}` }}>
                        {row.split('|').filter(Boolean).map((cell, ci) => (
                          <td 
                            key={ci} 
                            className={`p-2 ${ri === 0 ? 'font-bold' : ''}`}
                            style={{ color: ri === 0 ? C.bright : C.text }}
                          >
                            {renderInline(cell.trim(), `table-${i}-${ri}-${ci}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.match(/^\d+\. /)) {
          const items = trimmed.split('\n').filter(line => line.trim());
          const isOrdered = trimmed.match(/^\d+\. /);
          const ListTag = isOrdered ? 'ol' : 'ul';
          return (
            <ListTag key={i} className={`${isOrdered ? 'list-decimal' : 'list-disc'} ml-6 mb-4 space-y-2`} style={{ color: C.text }}>
              {items.map((item, j) => (
                <li key={j} className="text-sm leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>
                  {renderInline(item.replace(/^[-*\d.]\s*/, ''), `list-${i}-${j}`)}
                </li>
              ))}
            </ListTag>
          );
        }
        
        // Horizontal rule
        if (trimmed.startsWith('---')) {
          return <hr key={i} className="my-8" style={{ borderColor: C.border }} />;
        }
        
        // Blockquote
        if (trimmed.startsWith('>')) {
          return (
            <blockquote 
              key={i} 
              className="border-l-4 pl-4 my-4 italic"
              style={{ borderColor: C.accent, color: C.muted }}
            >
              {renderInline(trimmed.replace(/^>\s*/, ''), `quote-${i}`)}
            </blockquote>
          );
        }

        // Regular paragraph
        if (trimmed) {
          return (
            <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
              {renderInline(trimmed, `p-${i}`)}
            </p>
          );
        }
        return null;
      });
  };

  return (
    <section className="min-h-screen py-24 px-6">
      <Helmet>
        {/* Primary Meta */}
        <title>{post.title} | Eric Jagwara</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="author" content="Eric Jagwara" />
        <link rel="canonical" href={postUrl} />
        
        {/* Language */}
        <html lang={postLang} />
        <meta property="og:locale" content={postLang === "pt" ? "pt_AO" : postLang === "fr" ? "fr_CD" : "en_US"} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content="https://ericjagwara.github.io/images/blog-og.png" />
        <meta property="og:site_name" content="Eric Jagwara" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.date} />
        <meta property="article:author" content="https://ericjagwara.github.io" />
        <meta property="article:section" content={post.tags[0] || "Technology"} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ericjagwara" />
        <meta name="twitter:creator" content="@ericjagwara" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content="https://ericjagwara.github.io/images/blog-og.png" />
        
        {/* Schema */}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <FadeIn>
          <button
            onClick={() => { setPage("Blog"); navigate("/blog"); }}
            className="flex items-center gap-2 text-sm mb-8 hover:underline"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </button>
        </FadeIn>

        {/* Article header */}
        <FadeIn delay={0.05}>
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Language badge */}
              <span
                className="text-xs px-3 py-1 rounded-full flex items-center gap-1"
                style={{ background: C.accent + '20', color: C.accent, fontFamily: "'Inter',sans-serif" }}
              >
                {languageFlags[postLang]} {languageNames[postLang]}
              </span>
              {post.tags.filter(t => !['Português', 'Français', 'English'].includes(t)).map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: C.border, color: C.text, fontFamily: "'Inter',sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl leading-tight mb-4"
              style={{ fontFamily: "'Instrument Serif',serif", color: C.bright }}
            >
              {post.title}
            </h1>
            <p className="text-base mb-6" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
              {post.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readingTime} min read
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} />
                {post.content.split(/\s+/).length.toLocaleString()} words
              </span>
            </div>
          </header>
        </FadeIn>

        {/* Share buttons */}
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-3 mb-8 pb-8" style={{ borderBottom: `1px solid ${C.border}` }}>
            <span className="text-xs" style={{ color: C.muted }}>Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ background: C.card }}
              title="Share on Twitter"
            >
              <Twitter size={16} style={{ color: C.text }} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ background: C.card }}
              title="Share on LinkedIn"
            >
              <Linkedin size={16} style={{ color: C.text }} />
            </a>
            <button
              onClick={copyLink}
              className="p-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ background: C.card }}
              title="Copy link"
            >
              <Link2 size={16} style={{ color: copied ? C.accent : C.text }} />
            </button>
            {copied && <span className="text-xs" style={{ color: C.accent }}>Copied!</span>}
          </div>
        </FadeIn>

        {/* Article content */}
        <FadeIn delay={0.15}>
          <article className="prose-custom">
            {renderContent(post.content)}
          </article>
        </FadeIn>

        {/* Tags */}
        <FadeIn delay={0.18}>
          <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${C.border}` }}>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs" style={{ color: C.muted }}>Tags:</span>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: C.border, color: C.text, fontFamily: "'Inter',sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <h3 className="text-lg font-bold mb-4" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                Related Articles
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((related) => {
                  const relatedLang = (related as BlogPost & { language?: string }).language || "en";
                  return (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="block"
                    >
                      <Cd className="h-full hover:border-opacity-50 transition-all" style={{ borderColor: C.borderLight }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">{languageFlags[relatedLang]}</span>
                          <span className="text-xs" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                            {new Date(related.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold hover:underline mb-2" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                          {related.title}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {related.tags.slice(0, 2).map(tag => (
                            <span 
                              key={tag}
                              className="text-xs px-1.5 py-0.5 rounded"
                              style={{ background: C.border, color: C.muted, fontFamily: "'Inter',sans-serif" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Cd>
                    </Link>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Author box */}
        <FadeIn delay={0.25}>
          <Cd className="mt-10">
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{ background: C.accent, color: C.bg, fontFamily: "serif" }}
              >
                EJ
              </div>
              <div>
                <h4 className="font-bold text-base mb-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  Eric Jagwara
                </h4>
                <p className="text-xs mb-3" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                  AI & Embedded Systems Engineer · Zindi Uganda Ambassador · Young AI Leaders Kampala Hub Leader
                </p>
                <div className="flex gap-3">
                  <EL href="https://twitter.com/ericjagwara">Twitter</EL>
                  <EL href="https://linkedin.com/in/ericjagwara">LinkedIn</EL>
                  <EL href="https://github.com/ericjagwara">GitHub</EL>
                </div>
              </div>
            </div>
          </Cd>
        </FadeIn>
      </div>
    </section>
  );
}
