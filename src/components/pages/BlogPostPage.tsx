import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Link2, BookOpen } from "lucide-react";
import { C } from "@/constants/theme";
import { FadeIn, Cd, EL } from "@/components/common";
import { fetchBlogPost, fetchRelatedPosts, type BlogPost } from "@/lib/supabase";
import { useState, useEffect } from "react";

interface BlogPostPageProps { setPage: (page: string) => void; }
const LN: Record<string,string> = { en:"English", pt:"Português", fr:"Français" };
const LF: Record<string,string> = { en:"🇬🇧", pt:"🇦🇴", fr:"🇨🇩" };
const BASE = "https://ericjagwara.online";

export function BlogPostPage({ setPage }: BlogPostPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const nav = useNavigate();
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState<BlogPost|null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => { if(!slug) return; setLoading(true);
    fetchBlogPost(slug).then(p => { setPost(p); setLoading(false); return fetchRelatedPosts(slug, p.tags, 4); }).then(r => setRelated(r||[])).catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) return <section className="min-h-screen py-24 px-6"><div className="max-w-3xl mx-auto text-center" style={{color:C.muted}}>Loading...</div></section>;
  if (notFound||!post) return <section className="min-h-screen py-24 px-6"><div className="max-w-3xl mx-auto text-center"><h1 className="text-2xl mb-4" style={{color:C.bright}}>Post not found</h1><button onClick={()=>{setPage("Blog");nav("/blog");}} className="text-sm hover:underline" style={{color:C.accent}}>← Back to Blog</button></div></section>;

  const url = `${BASE}/blog/${post.slug}`;
  const pl = post.language||"en";
  const wc = post.content.split(/\s+/).length;
  const schema = {"@context":"https://schema.org","@type":"BlogPosting","headline":post.title,"description":post.description,"datePublished":post.date,"dateModified":post.date,"author":{"@type":"Person","@id":`${BASE}/#person`,"name":"Eric Jagwara","url":BASE},"publisher":{"@type":"Person","@id":`${BASE}/#person`},"mainEntityOfPage":{"@type":"WebPage","@id":url},"url":url,"image":`${BASE}/images/blog-og.png`,"keywords":post.tags.join(", "),"inLanguage":pl==="pt"?"pt-AO":pl==="fr"?"fr-CD":"en","wordCount":wc,"articleSection":post.tags[0]||"Technology","about":post.tags.map(t=>({"@type":"Thing","name":t}))};
  const bread = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":BASE},{"@type":"ListItem","position":2,"name":"Blog","item":`${BASE}/blog`},{"@type":"ListItem","position":3,"name":post.title,"item":url}]};

  const copy = () => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  const renderInline = (text: string, kp='') => {
    const els: React.ReactNode[] = []; let rem = text; let ki = 0;
    while (rem.length > 0) {
      const ml = rem.match(/\[([^\]]+)\]\(([^)]+)\)/); const bl = rem.match(/\*\*([^*]+)\*\*/);
      const ms = [ml?{t:'l',m:ml,i:rem.indexOf(ml[0])}:null,bl?{t:'b',m:bl,i:rem.indexOf(bl[0])}:null].filter(Boolean).sort((a,b)=>a!.i-b!.i);
      if(!ms.length){els.push(rem);break;}
      const e=ms[0]!; if(e.i>0)els.push(rem.substring(0,e.i));
      if(e.t==='l'){const[,lt,lu]=e.m!;const int=lu.startsWith('/');els.push(int?<Link key={`${kp}-${ki++}`} to={lu} className="underline hover:opacity-80" style={{color:C.accent}}>{lt}</Link>:<a key={`${kp}-${ki++}`} href={lu} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80" style={{color:C.accent}}>{lt}</a>);}
      else els.push(<strong key={`${kp}-${ki++}`} style={{color:C.bright}}>{e.m![1]}</strong>);
      rem=rem.substring(e.i+e.m![0].length);
    } return els;
  };

  const render = (c: string) => c.split('\n\n').map((b,i) => {
    const t=b.trim();
    if(t.startsWith('### ')) return <h3 key={i} className="text-lg font-bold mt-6 mb-3" style={{color:C.bright,fontFamily:"'Inter',sans-serif"}}>{renderInline(t.replace('### ',''),`h3-${i}`)}</h3>;
    if(t.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-8 mb-4" style={{color:C.bright,fontFamily:"'Inter',sans-serif"}}>{renderInline(t.replace('## ',''),`h2-${i}`)}</h2>;
    if(t.startsWith('```')){const cd=t.replace(/^```\w*\n?/,'').replace(/```$/,'');return <pre key={i} className="text-xs p-4 rounded-lg overflow-x-auto mb-4" style={{background:C.card,color:C.text,fontFamily:"'Space Mono',monospace"}}>{cd}</pre>;}
    if(t.startsWith('- ')||t.startsWith('* ')){const items=t.split('\n').filter(l=>l.trim());return <ul key={i} className="list-disc ml-6 mb-4 space-y-2" style={{color:C.text}}>{items.map((x,j)=><li key={j} className="text-sm leading-relaxed" style={{fontFamily:"'Inter',sans-serif"}}>{renderInline(x.replace(/^[-*]\s*/,''),`li-${i}-${j}`)}</li>)}</ul>;}
    if(t.startsWith('---')) return <hr key={i} className="my-8" style={{borderColor:C.border}} />;
    if(t.startsWith('>')) return <blockquote key={i} className="border-l-4 pl-4 my-4 italic" style={{borderColor:C.accent,color:C.muted}}>{renderInline(t.replace(/^>\s*/,''),`q-${i}`)}</blockquote>;
    if(t) return <p key={i} className="text-sm leading-relaxed mb-4" style={{color:C.text,fontFamily:"'Inter',sans-serif"}}>{renderInline(t,`p-${i}`)}</p>;
    return null;
  });

  return (
    <section className="min-h-screen py-24 px-6">
      <Helmet>
        <title>{post.title} | Eric Jagwara</title><meta name="description" content={post.description}/><meta name="keywords" content={post.tags.join(", ")}/><meta name="author" content="Eric Jagwara"/><link rel="canonical" href={url}/>
        <html lang={pl}/><meta property="og:locale" content={pl==="pt"?"pt_AO":pl==="fr"?"fr_CD":"en_US"}/>
        <meta property="og:type" content="article"/><meta property="og:title" content={post.title}/><meta property="og:description" content={post.description}/><meta property="og:url" content={url}/><meta property="og:image" content={`${BASE}/images/blog-og.png`}/><meta property="og:site_name" content="Eric Jagwara"/><meta property="article:published_time" content={post.date}/><meta property="article:author" content={BASE}/><meta property="article:section" content={post.tags[0]||"Technology"}/>
        {post.tags.map(tag=><meta key={tag} property="article:tag" content={tag}/>)}
        <meta name="twitter:card" content="summary_large_image"/><meta name="twitter:site" content="@ericjagwara"/><meta name="twitter:creator" content="@ericjagwara"/><meta name="twitter:title" content={post.title}/><meta name="twitter:description" content={post.description}/><meta name="twitter:image" content={`${BASE}/images/blog-og.png`}/>
        <script type="application/ld+json">{JSON.stringify(schema)}</script><script type="application/ld+json">{JSON.stringify(bread)}</script>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <FadeIn><button onClick={()=>{setPage("Blog");nav("/blog");}} className="flex items-center gap-2 text-sm mb-8 hover:underline" style={{color:C.muted}}><ArrowLeft size={16}/>Back to Blog</button></FadeIn>
        <FadeIn delay={0.05}><header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4"><span className="text-xs px-3 py-1 rounded-full flex items-center gap-1" style={{background:C.accent+'20',color:C.accent}}>{LF[pl]} {LN[pl]}</span>
            {post.tags.filter(t=>!['Português','Français','English'].includes(t)).map(tag=><span key={tag} className="text-xs px-3 py-1 rounded-full" style={{background:C.border,color:C.text}}>{tag}</span>)}</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl leading-tight mb-4" style={{fontFamily:"'Instrument Serif',serif",color:C.bright}}>{post.title}</h1>
          <p className="text-base mb-6" style={{color:C.text,fontFamily:"'Inter',sans-serif"}}>{post.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs" style={{color:C.muted,fontFamily:"'Space Mono',monospace"}}>
            <span className="flex items-center gap-1.5"><Calendar size={14}/>{new Date(post.date).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</span>
            {post.reading_time&&<span className="flex items-center gap-1.5"><Clock size={14}/>{post.reading_time} min read</span>}
            <span className="flex items-center gap-1.5"><BookOpen size={14}/>{wc.toLocaleString()} words</span></div>
        </header></FadeIn>
        <FadeIn delay={0.1}><div className="flex items-center gap-3 mb-8 pb-8" style={{borderBottom:`1px solid ${C.border}`}}>
          <span className="text-xs" style={{color:C.muted}}>Share:</span>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title+' by Eric Jagwara')}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:opacity-80" style={{background:C.card}}><Twitter size={16} style={{color:C.text}}/></a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:opacity-80" style={{background:C.card}}><Linkedin size={16} style={{color:C.text}}/></a>
          <button onClick={copy} className="p-2 rounded-lg hover:opacity-80" style={{background:C.card}}><Link2 size={16} style={{color:copied?C.accent:C.text}}/></button>
          {copied&&<span className="text-xs" style={{color:C.accent}}>Copied!</span>}
        </div></FadeIn>
        <FadeIn delay={0.15}><article>{render(post.content)}</article></FadeIn>
        <FadeIn delay={0.18}><div className="mt-8 pt-6" style={{borderTop:`1px solid ${C.border}`}}><div className="flex flex-wrap gap-2 items-center"><span className="text-xs" style={{color:C.muted}}>Tags:</span>{post.tags.map(tag=><span key={tag} className="text-xs px-2 py-1 rounded" style={{background:C.border,color:C.text}}>{tag}</span>)}</div></div></FadeIn>
        {related.length>0&&<FadeIn delay={0.2}><div className="mt-10"><h3 className="text-lg font-bold mb-4" style={{color:C.bright,fontFamily:"'Inter',sans-serif"}}>Related Articles</h3><div className="grid gap-4 sm:grid-cols-2">
          {related.map(r=>{const rl=r.language||"en";return <Link key={r.slug} to={`/blog/${r.slug}`} className="block"><Cd className="h-full hover:border-opacity-50 transition-all" style={{borderColor:C.borderLight}}>
            <div className="flex items-center gap-2 mb-2"><span className="text-sm">{LF[rl]}</span><span className="text-xs" style={{color:C.muted,fontFamily:"'Space Mono',monospace"}}>{new Date(r.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span></div>
            <h4 className="text-sm font-bold hover:underline mb-2" style={{color:C.bright,fontFamily:"'Inter',sans-serif"}}>{r.title}</h4>
            <div className="flex flex-wrap gap-1">{r.tags.slice(0,2).map(tag=><span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{background:C.border,color:C.muted}}>{tag}</span>)}</div>
          </Cd></Link>;})}</div></div></FadeIn>}
        <FadeIn delay={0.25}><Cd className="mt-10"><div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0" style={{background:C.accent,color:C.bg,fontFamily:"serif"}}>EJ</div>
          <div><h4 className="font-bold text-base mb-1" style={{color:C.bright}}>Eric Jagwara</h4><p className="text-xs mb-3" style={{color:C.muted}}>AI & Embedded Systems Engineer · Zindi Uganda Ambassador · Young AI Leaders Kampala Hub Leader</p>
            <div className="flex gap-3"><EL href="https://twitter.com/ericjagwara">Twitter</EL><EL href="https://linkedin.com/in/ericjagwara">LinkedIn</EL><EL href="https://github.com/ericjagwara">GitHub</EL></div></div>
        </div></Cd></FadeIn>
      </div>
    </section>);
}
