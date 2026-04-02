import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zbifymfxbbtlorzexylh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiaWZ5bWZ4YmJ0bG9yemV4eWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTI5ODUsImV4cCI6MjA5MDU2ODk4NX0.YtlHeJHG62WXAB2wB_6kMtfqQBUBb3SLQfxEpwNA_eE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ADMIN_API = `${supabaseUrl}/functions/v1/admin-api`;

export async function adminFetch(path: string, opts: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  return fetch(`${ADMIN_API}/${path}`, { ...opts, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...opts.headers } }).then(r => r.json());
}

export interface BlogPost { id: string; slug: string; title: string; date: string; description: string; tags: string[]; content: string; reading_time: number; language: string; published: boolean; created_at: string; updated_at: string; }
export interface ResearchPaper { id: string; title: string; authors: string; journal_or_venue: string | null; year: number; doi: string | null; url: string | null; abstract: string | null; tags: string[]; display_order: number; published: boolean; }

export async function fetchBlogPosts() {
  const { data, error } = await supabase.from('blog_posts').select('id,slug,title,date,description,tags,reading_time,language,published').eq('published', true).order('date', { ascending: false });
  if (error) throw error; return data as BlogPost[];
}
export async function fetchBlogPost(slug: string) {
  const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).eq('published', true).single();
  if (error) throw error; return data as BlogPost;
}
export async function fetchRelatedPosts(slug: string, tags: string[], limit = 4) {
  const { data } = await supabase.from('blog_posts').select('id,slug,title,date,description,tags,reading_time,language').eq('published', true).neq('slug', slug).overlaps('tags', tags).order('date', { ascending: false }).limit(limit);
  return (data || []) as BlogPost[];
}
export async function fetchResearchPapers() {
  const { data, error } = await supabase.from('research_papers').select('*').eq('published', true).order('display_order', { ascending: true });
  if (error) throw error; return data as ResearchPaper[];
}
