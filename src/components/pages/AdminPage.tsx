import { useState, useEffect } from "react";
import { C } from "@/constants/theme";
import { adminFetch } from "@/lib/supabase";
import { LogOut, Plus, Edit2, Trash2, Eye, EyeOff, FileText, BookOpen, Save, X } from "lucide-react";

type Tab = "blogs"|"papers";
interface Blog { id:string;slug:string;title:string;date:string;description:string;tags:string[];content:string;reading_time:number;language:string;published:boolean; }
interface Paper { id:string;title:string;authors:string;journal_or_venue:string;year:number;doi:string;url:string;abstract:string;tags:string[];display_order:number;published:boolean; }

const I = (p:{value:string;onChange:(v:string)=>void;placeholder:string;className?:string;type?:string}) =>
  <input type={p.type||"text"} placeholder={p.placeholder} value={p.value} onChange={e=>p.onChange(e.target.value)} className={`px-3 py-2 rounded-lg text-sm outline-none ${p.className||''}`} style={{background:C.bg,color:C.bright,border:`1px solid ${C.border}`}} />;

export function AdminPage() {
  const [loggedIn,setLoggedIn] = useState(!!localStorage.getItem("admin_token"));
  const [email,setEmail] = useState(""); const [pw,setPw] = useState(""); const [loginErr,setLoginErr] = useState(""); const [loginLoad,setLoginLoad] = useState(false);
  const [tab,setTab] = useState<Tab>("blogs");
  const [blogs,setBlogs] = useState<Blog[]>([]); const [papers,setPapers] = useState<Paper[]>([]); const [loading,setLoading] = useState(false);
  const [editBlog,setEditBlog] = useState<Blog|null>(null); const [editPaper,setEditPaper] = useState<Paper|null>(null); const [showNew,setShowNew] = useState(false);

  const login = async () => { setLoginLoad(true);setLoginErr(""); try { const r=await adminFetch("login",{method:"POST",body:JSON.stringify({email,password:pw})}); if(r.token){localStorage.setItem("admin_token",r.token);setLoggedIn(true);}else setLoginErr(r.error||"Login failed"); } catch{setLoginErr("Network error");} setLoginLoad(false); };
  const logout = () => { localStorage.removeItem("admin_token"); setLoggedIn(false); };
  const loadBlogs = async () => { setLoading(true); const r=await adminFetch("blogs"); setBlogs(r.posts||[]); setLoading(false); };
  const loadPapers = async () => { setLoading(true); const r=await adminFetch("papers"); setPapers(r.papers||[]); setLoading(false); };
  useEffect(() => { if(loggedIn){loadBlogs();loadPapers();} }, [loggedIn]);

  const saveBlog = async (b:Blog) => { const body={slug:b.slug,title:b.title,date:b.date,description:b.description,tags:b.tags,content:b.content,reading_time:b.reading_time,language:b.language,published:b.published};
    if(!b.id) await adminFetch("blogs",{method:"POST",body:JSON.stringify(body)}); else await adminFetch(`blogs/${b.id}`,{method:"PUT",body:JSON.stringify(body)}); setEditBlog(null);setShowNew(false);loadBlogs(); };
  const delBlog = async (id:string) => { if(!confirm("Delete this post?"))return; await adminFetch(`blogs/${id}`,{method:"DELETE"}); loadBlogs(); };
  const togBlog = async (b:Blog) => { await adminFetch(`blogs/${b.id}`,{method:"PUT",body:JSON.stringify({published:!b.published})}); loadBlogs(); };
  const savePaper = async (p:Paper) => { const body={title:p.title,authors:p.authors,journal_or_venue:p.journal_or_venue,year:p.year,doi:p.doi,url:p.url,abstract:p.abstract,tags:p.tags,display_order:p.display_order,published:p.published};
    if(!p.id) await adminFetch("papers",{method:"POST",body:JSON.stringify(body)}); else await adminFetch(`papers/${p.id}`,{method:"PUT",body:JSON.stringify(body)}); setEditPaper(null);setShowNew(false);loadPapers(); };
  const delPaper = async (id:string) => { if(!confirm("Delete?"))return; await adminFetch(`papers/${id}`,{method:"DELETE"}); loadPapers(); };

  if(!loggedIn) return (
    <section className="min-h-screen flex items-center justify-center px-6" style={{background:C.bg}}>
      <div className="w-full max-w-sm"><div className="text-center mb-8"><span className="text-3xl font-bold" style={{fontFamily:"'Instrument Serif',serif",color:C.accent}}>EJ</span><h1 className="text-xl font-bold mt-2" style={{color:C.bright}}>Admin Dashboard</h1><p className="text-xs mt-1" style={{color:C.muted}}>Sign in to manage your portfolio</p></div>
        <div className="rounded-xl p-6" style={{background:C.card,border:`1px solid ${C.border}`}}>
          <I placeholder="Email" value={email} onChange={setEmail} className="w-full mb-3" />
          <input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-4" style={{background:C.bg,color:C.bright,border:`1px solid ${C.border}`}} />
          {loginErr&&<p className="text-xs mb-3" style={{color:"#e55"}}>{loginErr}</p>}
          <button onClick={login} disabled={loginLoad} className="w-full py-3 rounded-lg text-sm font-bold hover:opacity-90 disabled:opacity-50" style={{background:C.accent,color:C.bg}}>{loginLoad?"Signing in...":"Sign In"}</button>
        </div></div>
    </section>);

  const BlogEd = ({blog,onSave,onCancel}:{blog:Blog;onSave:(b:Blog)=>void;onCancel:()=>void}) => {
    const [b,setB]=useState(blog); const [ts,setTs]=useState(blog.tags.join(", "));
    return <div className="rounded-xl p-6 mb-4" style={{background:C.card,border:`1px solid ${C.border}`}}>
      <div className="flex justify-between items-center mb-4"><h3 className="text-base font-bold" style={{color:C.bright}}>{blog.id?"Edit Post":"New Post"}</h3><button onClick={onCancel} style={{color:C.muted}}><X size={18}/></button></div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <I placeholder="Title" value={b.title} onChange={v=>setB({...b,title:v})} className="col-span-2" />
        <I placeholder="Slug" value={b.slug} onChange={v=>setB({...b,slug:v})} />
        <I placeholder="Date" value={b.date} onChange={v=>setB({...b,date:v})} type="date" />
        <select value={b.language} onChange={e=>setB({...b,language:e.target.value})} className="px-3 py-2 rounded-lg text-sm outline-none" style={{background:C.bg,color:C.bright,border:`1px solid ${C.border}`}}><option value="en">English</option><option value="pt">Português</option><option value="fr">Français</option></select>
        <I placeholder="Reading time" value={String(b.reading_time)} onChange={v=>setB({...b,reading_time:parseInt(v)||8})} type="number" />
      </div>
      <I placeholder="Tags (comma separated)" value={ts} onChange={v=>{setTs(v);setB({...b,tags:v.split(",").map(t=>t.trim()).filter(Boolean)});}} className="w-full mb-3" />
      <textarea placeholder="Description" value={b.description} onChange={e=>setB({...b,description:e.target.value})} rows={2} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-3 resize-y" style={{background:C.bg,color:C.bright,border:`1px solid ${C.border}`}} />
      <textarea placeholder="Content (Markdown)" value={b.content} onChange={e=>setB({...b,content:e.target.value})} rows={12} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-3 resize-y" style={{background:C.bg,color:C.bright,border:`1px solid ${C.border}`,fontFamily:"'Space Mono',monospace"}} />
      <div className="flex gap-2"><button onClick={()=>onSave(b)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold" style={{background:C.accent,color:C.bg}}><Save size={14}/>Save</button><button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm" style={{background:C.border,color:C.text}}>Cancel</button></div>
    </div>;
  };

  const PaperEd = ({paper,onSave,onCancel}:{paper:Paper;onSave:(p:Paper)=>void;onCancel:()=>void}) => {
    const [p,setP]=useState(paper); const [ts,setTs]=useState(paper.tags.join(", "));
    return <div className="rounded-xl p-6 mb-4" style={{background:C.card,border:`1px solid ${C.border}`}}>
      <div className="flex justify-between items-center mb-4"><h3 className="text-base font-bold" style={{color:C.bright}}>{paper.id?"Edit Paper":"New Paper"}</h3><button onClick={onCancel} style={{color:C.muted}}><X size={18}/></button></div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <I placeholder="Title" value={p.title} onChange={v=>setP({...p,title:v})} className="col-span-2" />
        <I placeholder="Authors" value={p.authors} onChange={v=>setP({...p,authors:v})} className="col-span-2" />
        <I placeholder="Journal / Venue" value={p.journal_or_venue} onChange={v=>setP({...p,journal_or_venue:v})} />
        <I placeholder="Year" value={String(p.year)} onChange={v=>setP({...p,year:parseInt(v)||2025})} type="number" />
        <I placeholder="DOI" value={p.doi} onChange={v=>setP({...p,doi:v})} />
        <I placeholder="URL" value={p.url} onChange={v=>setP({...p,url:v})} />
        <I placeholder="Display Order" value={String(p.display_order)} onChange={v=>setP({...p,display_order:parseInt(v)||0})} type="number" />
      </div>
      <I placeholder="Tags (comma separated)" value={ts} onChange={v=>{setTs(v);setP({...p,tags:v.split(",").map(t=>t.trim()).filter(Boolean)});}} className="w-full mb-3" />
      <textarea placeholder="Abstract" value={p.abstract} onChange={e=>setP({...p,abstract:e.target.value})} rows={4} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-3 resize-y" style={{background:C.bg,color:C.bright,border:`1px solid ${C.border}`}} />
      <div className="flex gap-2"><button onClick={()=>onSave(p)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold" style={{background:C.accent,color:C.bg}}><Save size={14}/>Save</button><button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm" style={{background:C.border,color:C.text}}>Cancel</button></div>
    </div>;
  };

  const emptyBlog:Blog = {id:"",slug:"",title:"",date:new Date().toISOString().split("T")[0],description:"",tags:[],content:"",reading_time:8,language:"en",published:true};
  const emptyPaper:Paper = {id:"",title:"",authors:"",journal_or_venue:"",year:new Date().getFullYear(),doi:"",url:"",abstract:"",tags:[],display_order:0,published:true};

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6" style={{background:C.bg}}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div><span className="text-2xl font-bold" style={{fontFamily:"'Instrument Serif',serif",color:C.accent}}>EJ</span><span className="text-xs tracking-widest font-medium ml-2" style={{color:C.bright,opacity:0.75,fontFamily:"'Space Mono',monospace"}}>ADMIN</span></div>
          <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{background:C.border,color:C.muted}}><LogOut size={14}/>Logout</button>
        </div>
        <div className="flex gap-2 mb-6">
          <button onClick={()=>{setTab("blogs");setShowNew(false);setEditBlog(null);}} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold ${tab==="blogs"?"":"opacity-60"}`} style={{background:tab==="blogs"?C.accent:C.border,color:tab==="blogs"?C.bg:C.text}}><BookOpen size={16}/>Blog Posts ({blogs.length})</button>
          <button onClick={()=>{setTab("papers");setShowNew(false);setEditPaper(null);}} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold ${tab==="papers"?"":"opacity-60"}`} style={{background:tab==="papers"?C.accent:C.border,color:tab==="papers"?C.bg:C.text}}><FileText size={16}/>Research Papers ({papers.length})</button>
        </div>
        <button onClick={()=>{setShowNew(true);setEditBlog(null);setEditPaper(null);}} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold mb-4" style={{background:C.teal,color:"#fff"}}><Plus size={16}/>New {tab==="blogs"?"Blog Post":"Research Paper"}</button>

        {showNew&&tab==="blogs"&&<BlogEd blog={emptyBlog} onSave={saveBlog} onCancel={()=>setShowNew(false)}/>}
        {showNew&&tab==="papers"&&<PaperEd paper={emptyPaper} onSave={savePaper} onCancel={()=>setShowNew(false)}/>}
        {editBlog&&<BlogEd blog={editBlog} onSave={saveBlog} onCancel={()=>setEditBlog(null)}/>}
        {editPaper&&<PaperEd paper={editPaper} onSave={savePaper} onCancel={()=>setEditPaper(null)}/>}
        {loading&&<div className="text-center py-8" style={{color:C.muted}}>Loading...</div>}

        {tab==="blogs"&&!loading&&<div className="space-y-2">{blogs.map(b=>(
          <div key={b.id} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{background:C.card,border:`1px solid ${C.border}`}}>
            <div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><span className={`w-2 h-2 rounded-full ${b.published?"bg-green-500":"bg-gray-500"}`}/><h4 className="text-sm font-bold truncate" style={{color:C.bright}}>{b.title}</h4></div>
              <div className="flex items-center gap-2 text-xs" style={{color:C.muted}}><span>{b.date}</span><span className="px-1.5 py-0.5 rounded" style={{background:C.border}}>{b.language}</span><span>{b.tags.slice(0,2).join(", ")}</span></div></div>
            <div className="flex gap-1.5 flex-shrink-0">
              <button onClick={()=>togBlog(b)} className="p-1.5 rounded-lg hover:opacity-80" style={{background:C.border}} title={b.published?"Unpublish":"Publish"}>{b.published?<Eye size={14} style={{color:C.teal}}/>:<EyeOff size={14} style={{color:C.muted}}/>}</button>
              <button onClick={()=>{setEditBlog(b);setShowNew(false);}} className="p-1.5 rounded-lg hover:opacity-80" style={{background:C.border}}><Edit2 size={14} style={{color:C.accent}}/></button>
              <button onClick={()=>delBlog(b.id)} className="p-1.5 rounded-lg hover:opacity-80" style={{background:C.border}}><Trash2 size={14} style={{color:"#e55"}}/></button>
            </div>
          </div>))}</div>}

        {tab==="papers"&&!loading&&<div className="space-y-2">{papers.map(p=>(
          <div key={p.id} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{background:C.card,border:`1px solid ${C.border}`}}>
            <div className="flex-1 min-w-0"><h4 className="text-sm font-bold truncate mb-1" style={{color:C.bright}}>{p.title}</h4>
              <div className="flex items-center gap-2 text-xs" style={{color:C.muted}}><span>{p.authors}</span><span>({p.year})</span>{p.journal_or_venue&&<span className="italic">{p.journal_or_venue}</span>}</div></div>
            <div className="flex gap-1.5 flex-shrink-0">
              <button onClick={()=>{setEditPaper(p);setShowNew(false);}} className="p-1.5 rounded-lg hover:opacity-80" style={{background:C.border}}><Edit2 size={14} style={{color:C.accent}}/></button>
              <button onClick={()=>delPaper(p.id)} className="p-1.5 rounded-lg hover:opacity-80" style={{background:C.border}}><Trash2 size={14} style={{color:"#e55"}}/></button>
            </div>
          </div>))}
          {papers.length===0&&<div className="text-center py-8 rounded-xl" style={{background:C.card,border:`1px solid ${C.border}`,color:C.muted}}><FileText size={32} className="mx-auto mb-2 opacity-40"/><p className="text-sm">No research papers yet. Add your first one!</p></div>}
        </div>}
      </div>
    </section>);
}
