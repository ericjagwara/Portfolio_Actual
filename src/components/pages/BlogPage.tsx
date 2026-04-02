import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Clock, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { C } from "@/constants/theme";
import { FadeIn, Cd, SH, EL, IL } from "@/components/common";
import { SEO, PAGE_SEO } from "@/components/common/SEO";
import { fetchBlogPosts, type BlogPost } from "@/lib/supabase";

interface BlogPageProps {
  setPage: (page: string) => void;
}

const PER_PAGE = 12;
const langLabel: Record<string, string> = { all: "All Languages", en: "English", pt: "Português", fr: "Français" };
const langFlag: Record<string, string> = { en: "🇬🇧", pt: "🇦🇴", fr: "🇨🇩" };
const BASE = "https://ericjagwara.online";

export function BlogPage({ setPage }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [medium, setMedium] = useState<Array<{ title: string; link: string; pubDate: string; description?: string; content?: string; thumbnail?: string }>>([]);
  const [mLoading, setMLoading] = useState(true);
  const [mErr, setMErr] = useState(false);
  const [lang, setLang] = useState("all");
  const [page, setP] = useState(1);

  useEffect(() => {
    fetchBlogPosts()
      .then((p) => { setPosts(p); setPostsLoading(false); })
      .catch(() => setPostsLoading(false));
  }, []);

  useEffect(() => {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent("https://medium.com/feed/@ericjagwara_65224")}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "ok" && d.items?.length) setMedium(d.items.slice(0, 6));
        else setMErr(true);
        setMLoading(false);
      })
      .catch(() => { setMErr(true); setMLoading(false); });
  }, []);

  const filtered = useMemo(() => lang === "all" ? posts : posts.filter((p) => p.language === lang), [lang, posts]);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = useMemo(() => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE), [filtered, page]);
  useEffect(() => { setP(1); }, [lang]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: posts.length, en: 0, pt: 0, fr: 0 };
    posts.forEach((p) => { const l = p.language || "en"; if (c[l] !== undefined) c[l]++; });
    return c;
  }, [posts]);

  const strip = (h: string) => {
    const t = h.replace(/<[^>]*>/g, "").replace(/&\w+;/g, " ").replace(/\s+/g, " ").trim();
    return t.substring(0, 220) + (t.length > 220 ? "..." : "");
  };

  const schema = {
    "@context": "https://schema.org", "@type": "Blog",
    "name": "Eric Jagwara's Blog",
    "description": "Technical writing on AI, machine learning, and technology for African markets.",
    "url": `${BASE}/blog`, "author": { "@id": `${BASE}/#person` }, "inLanguage": ["en", "pt", "fr"],
    "blogPost": posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting", "headline": p.title, "description": p.description,
      "datePublished": p.date, "author": { "@id": `${BASE}/#person` },
      "url": `${BASE}/blog/${p.slug}`, "keywords": p.tags.join(", "),
    })),
  };

  return (
    <section className="min-h-screen py-24 px-6">
      <SEO {...PAGE_SEO.blog} />
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
      <div className="max-w-6xl mx-auto">
        <SH title="Blog" sub="AI Engineering & African Markets — Technical Articles in EN, PT, FR" />

        <FadeIn>
          <Cd className="mb-7 flex flex-wrap gap-4 items-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white flex-shrink-0" style={{ background: "#1a1e2a", fontFamily: "serif" }}>M</div>
            <div className="flex-1 min-w-48">
              <div className="text-base font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>Medium — <strong>@ericjagwara</strong></div>
              <div className="text-xs mt-1" style={{ color: C.muted }}>Personal essays and technical writing</div>
            </div>
            <EL href="https://medium.com/@ericjagwara_65224">View Profile</EL>
          </Cd>
        </FadeIn>

        {mLoading && <div className="text-center py-6" style={{ color: C.muted }}><div className="text-sm">Loading Medium posts...</div></div>}
        {mErr && !mLoading && (
          <FadeIn><Cd className="text-center py-6 mb-8"><p className="text-sm mb-3" style={{ color: C.muted }}>Could not load Medium feed.</p><EL href="https://medium.com/@ericjagwara_65224">Read on Medium</EL></Cd></FadeIn>
        )}
        {!mLoading && !mErr && medium.length > 0 && (
          <div className="flex flex-col gap-4 mb-10">
            {medium.map((p, i) => (
              <FadeIn key={p.link || `m-${i}`} delay={i * 0.04}>
                <Cd className="flex flex-wrap gap-5">
                  {p.thumbnail && <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0" style={{ background: C.border }}><img src={p.thumbnail} alt="" className="w-full h-full object-cover" /></div>}
                  <div className="flex-1 min-w-48">
                    <h4 className="text-base font-bold mb-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>{p.title}</h4>
                    <div className="text-xs mb-2" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>{new Date(p.pubDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</div>
                    <p className="text-sm leading-relaxed mb-2.5" style={{ color: C.text }}>{strip(p.description || p.content || "")}</p>
                    <EL href={p.link}>Read on Medium</EL>
                  </div>
                </Cd>
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn>
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <h3 className="text-lg font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
              <Globe size={18} className="inline mr-2" style={{ verticalAlign: "text-bottom" }} />
              Technical Articles ({filtered.length})
            </h3>
            <div className="flex gap-2 flex-wrap">
              {(["all", "en", "pt", "fr"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all ${lang === l ? "ring-1" : "opacity-70 hover:opacity-100"}`}
                  style={{ background: lang === l ? C.border : "transparent", color: lang === l ? C.accent : C.muted, borderColor: C.accent, fontFamily: "'Inter',sans-serif" }}>
                  {l !== "all" && langFlag[l]} {langLabel[l]} ({counts[l]})
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {postsLoading ? (
          <div className="text-center py-12" style={{ color: C.muted }}>Loading articles...</div>
        ) : (
          <div className="flex flex-col gap-4 mb-8">
            {paginated.map((post, i) => {
              const pl = post.language || "en";
              return (
                <FadeIn key={post.slug} delay={i * 0.03}>
                  <Link to={`/blog/${post.slug}`} className="block">
                    <Cd className="flex flex-wrap gap-5 hover:border-opacity-50 transition-all" style={{ borderColor: C.borderLight }}>
                      <div className="flex-1 min-w-48">
                        <h4 className="text-base font-bold mb-1 hover:underline" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                          {langFlag[pl] && <span className="mr-2">{langFlag[pl]}</span>}{post.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 items-center mb-2">
                          <span className="text-xs" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                          {post.reading_time && <span className="text-xs flex items-center gap-1" style={{ color: C.muted }}><Clock size={12} /> {post.reading_time} min</span>}
                          {post.tags.slice(0, 3).map((tag) => <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: C.border, color: C.accent }}>{tag}</span>)}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: C.text }}>{post.description}</p>
                      </div>
                    </Cd>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <FadeIn>
            <div className="flex justify-center items-center gap-4 mb-8">
              <button onClick={() => setP((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg disabled:opacity-30" style={{ background: C.border, color: C.bright }}><ChevronLeft size={20} /></button>
              <div className="flex gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pn: number;
                  if (totalPages <= 5) pn = i + 1;
                  else if (page <= 3) pn = i + 1;
                  else if (page >= totalPages - 2) pn = totalPages - 4 + i;
                  else pn = page - 2 + i;
                  return (
                    <button key={pn} onClick={() => setP(pn)}
                      className={`w-10 h-10 rounded-lg text-sm ${page === pn ? "ring-1" : "opacity-70 hover:opacity-100"}`}
                      style={{ background: page === pn ? C.accent : C.border, color: page === pn ? C.bg : C.text, fontFamily: "'Space Mono',monospace" }}>
                      {pn}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setP((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg disabled:opacity-30" style={{ background: C.border, color: C.bright }}><ChevronRight size={20} /></button>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted }}>
              Check upcoming <IL page="Events" setPage={setPage}>Events</IL> · View my <IL page="Community" setPage={setPage}>Community</IL> work
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
