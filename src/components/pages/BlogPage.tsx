import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Clock, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { C } from "@/constants/theme";
import { FadeIn, Cd, SH, EL, IL } from "@/components/common";
import { SEO, PAGE_SEO } from "@/components/common/SEO";
import { blogPosts, type BlogPost } from "@/content/blog/posts";

interface BlogPageProps {
  setPage: (page: string) => void;
}

const POSTS_PER_PAGE = 12;

const languageLabels: Record<string, string> = {
  all: "All Languages",
  en: "English",
  pt: "Português",
  fr: "Français",
};

const languageFlags: Record<string, string> = {
  en: "🇬🇧",
  pt: "🇦🇴",
  fr: "🇨🇩",
};

const BASE_URL = "https://ericjagwara.com";

export function BlogPage({ setPage }: BlogPageProps) {
  const [mediumPosts, setMediumPosts] = useState<{ title: string; link: string; pubDate: string; description?: string; content?: string; thumbnail?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts by language
  const filteredPosts = useMemo(() => {
    if (selectedLang === "all") return blogPosts;
    return blogPosts.filter((post: BlogPost) => 
      (post as BlogPost & { language?: string }).language === selectedLang
    );
  }, [selectedLang]);

  // Paginate
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset to page 1 when language changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLang]);

  // Count posts by language
  const langCounts = useMemo(() => {
    const counts: Record<string, number> = { all: blogPosts.length, en: 0, pt: 0, fr: 0 };
    blogPosts.forEach((post: BlogPost) => {
      const lang = (post as BlogPost & { language?: string }).language || "en";
      if (counts[lang] !== undefined) counts[lang]++;
    });
    return counts;
  }, []);

  useEffect(() => {
    const mediumUser = "@ericjagwara_65224";
    const rssUrl = `https://medium.com/feed/${mediumUser}`;

    const tryRss2json = () =>
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.status === "ok" && data.items?.length) {
            setMediumPosts(data.items.slice(0, 6));
            setLoading(false);
            return true;
          }
          return false;
        })
        .catch(() => false);

    const tryAllOrigins = () =>
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`)
        .then((r) => r.json())
        .then((data) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data.contents, "text/xml");
          const items = Array.from(xml.querySelectorAll("item")).slice(0, 6);
          if (!items.length) return false;
          const parsed = items.map((item) => ({
            title: item.querySelector("title")?.textContent || "",
            link: item.querySelector("link")?.textContent || "",
            pubDate: item.querySelector("pubDate")?.textContent || "",
            description: item.querySelector("description")?.textContent || "",
            thumbnail: item.querySelector("thumbnail")?.getAttribute("url") ||
              item.querySelector("enclosure")?.getAttribute("url") || undefined,
          }));
          setMediumPosts(parsed);
          setLoading(false);
          return true;
        })
        .catch(() => false);

    tryRss2json().then((ok) => {
      if (!ok) {
        tryAllOrigins().then((ok2) => {
          if (!ok2) {
            setErr(true);
            setLoading(false);
          }
        });
      }
    });
  }, []);

  const stripHtml = (html: string) => {
    const text = html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
    return text.substring(0, 220) + (text.length > 220 ? "..." : "");
  };

  // Generate Article schema for local posts (first 20 for performance)
  const articleListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Eric Jagwara's Blog",
    "description": "Technical writing on AI, machine learning, and technology for African markets. 100 articles in English, Portuguese, and French.",
    "url": `${BASE_URL}/blog`,
    "author": { "@id": `${BASE_URL}/#person` },
    "inLanguage": ["en", "pt", "fr"],
    "blogPost": blogPosts.slice(0, 20).map((post: BlogPost) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": post.date,
      "author": { "@id": `${BASE_URL}/#person` },
      "url": `${BASE_URL}/blog/${post.slug}`,
      "keywords": post.tags.join(", ")
    }))
  };

  return (
    <section className="min-h-screen py-24 px-6">
      <SEO {...PAGE_SEO.blog} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleListSchema)}
        </script>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <SH title="Blog" sub="AI Engineering & African Markets — 100 Technical Articles in EN, PT, FR" />

        {/* Medium Posts Section - At Top */}
        <FadeIn>
          <Cd className="mb-7 flex flex-wrap gap-4 items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
              style={{ background: "#1a1e2a", fontFamily: "serif" }}
            >
              M
            </div>
            <div className="flex-1 min-w-48">
              <div className="text-base font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                Medium — <strong>@ericjagwara</strong>
              </div>
              <div className="text-xs mt-1" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                Personal essays and technical writing
              </div>
            </div>
            <EL href="https://medium.com/@ericjagwara_65224">View Profile</EL>
          </Cd>
        </FadeIn>

        {loading && (
          <div className="text-center py-6" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
            <div className="text-sm">Loading posts from Medium...</div>
          </div>
        )}

        {err && !loading && (
          <FadeIn>
            <Cd className="text-center py-6 mb-8">
              <p className="text-sm mb-3" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                Could not load Medium feed right now.
              </p>
              <EL href="https://medium.com/@ericjagwara_65224">Read directly on Medium</EL>
            </Cd>
          </FadeIn>
        )}

        {!loading && !err && mediumPosts.length > 0 && (
          <div className="flex flex-col gap-4 mb-10">
            {mediumPosts.map((p, i) => (
              <FadeIn key={p.link || `medium-${i}`} delay={i * 0.04}>
                <Cd className="flex flex-wrap gap-5">
                  {p.thumbnail && (
                    <div
                      className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0"
                      style={{ background: C.border }}
                    >
                      <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-48">
                    <h4 className="text-base font-bold mb-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                      {p.title}
                    </h4>
                    <div className="text-xs mb-2" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                      {new Date(p.pubDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <p className="text-sm leading-relaxed mb-2.5" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                      {stripHtml(p.description || p.content || "")}
                    </p>
                    <EL href={p.link}>Read on Medium</EL>
                  </div>
                </Cd>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Local Articles Section */}
        <FadeIn>
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <h3 className="text-lg font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
              <Globe size={18} className="inline mr-2" style={{ verticalAlign: 'text-bottom' }} />
              Technical Articles ({filteredPosts.length})
            </h3>
            
            {/* Language Filter */}
            <div className="flex gap-2 flex-wrap">
              {(["all", "en", "pt", "fr"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                    selectedLang === lang ? "ring-1" : "opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    background: selectedLang === lang ? C.border : "transparent",
                    color: selectedLang === lang ? C.accent : C.muted,
                    borderColor: C.accent,
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  {lang !== "all" && languageFlags[lang]} {languageLabels[lang]} ({langCounts[lang]})
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Article Grid */}
        <div className="flex flex-col gap-4 mb-8">
          {paginatedPosts.map((post: BlogPost, i: number) => {
            const postLang = (post as BlogPost & { language?: string }).language || "en";
            return (
              <FadeIn key={post.slug} delay={i * 0.03}>
                <Link to={`/blog/${post.slug}`} className="block">
                  <Cd className="flex flex-wrap gap-5 hover:border-opacity-50 transition-all" style={{ borderColor: C.borderLight }}>
                    <div className="flex-1 min-w-48">
                      <h4 className="text-base font-bold mb-1 hover:underline" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                        {languageFlags[postLang] && <span className="mr-2">{languageFlags[postLang]}</span>}
                        {post.title}
                      </h4>
                      <div className="flex flex-wrap gap-2 items-center mb-2">
                        <span className="text-xs" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        {post.readingTime && (
                          <span className="text-xs flex items-center gap-1" style={{ color: C.muted }}>
                            <Clock size={12} /> {post.readingTime} min
                          </span>
                        )}
                        {post.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ background: C.border, color: C.accent, fontFamily: "'Inter',sans-serif" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                        {post.description}
                      </p>
                    </div>
                  </Cd>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <FadeIn>
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg transition-all disabled:opacity-30"
                style={{ background: C.border, color: C.bright }}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg text-sm transition-all ${
                        currentPage === pageNum ? "ring-1" : "opacity-70 hover:opacity-100"
                      }`}
                      style={{
                        background: currentPage === pageNum ? C.accent : C.border,
                        color: currentPage === pageNum ? C.bg : C.text,
                        fontFamily: "'Space Mono',monospace",
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg transition-all disabled:opacity-30"
                style={{ background: C.border, color: C.bright }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Check upcoming <IL page="Events" setPage={setPage}>Events</IL> · View my <IL page="Community" setPage={setPage}>Community</IL> work
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
