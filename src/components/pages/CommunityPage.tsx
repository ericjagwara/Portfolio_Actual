import { C } from "@/constants/theme";
import { FadeIn, Tag, Cd, SH, IL } from "@/components/common";
import { SEO, PAGE_SEO } from "@/components/common/SEO";

interface CommunityPageProps {
  setPage: (page: string) => void;
}

export function CommunityPage({ setPage }: CommunityPageProps) {
  const roles = [
    { id: "zindi", org: "Zindi Africa", role: "Country Ambassador, Uganda", period: "Oct 2024 – Present", link: "https://zindi.africa", desc: "Growing Uganda's data science community. Previously Community Ambassador (Aug 2023)." },
    { id: "ai-for-good", org: "UN AI for Good, Young AI Leaders", role: "Hub Leader, Kampala", period: "2024 – Present", link: "https://aiforgood.itu.int/young-ai-leaders-community/", desc: "Leading Kampala hub fostering AI talent and awareness." },
    { id: "dli-mentor", org: "Deep Learning Indaba", role: "Mentor", period: "2024 – Present", link: "https://deeplearningindaba.com", desc: "Mentoring teams on ethical AI-driven community projects." },
    { id: "indabax-ug", org: "IndabaX Uganda", role: "Community Engagement Chair", period: "2025", link: "https://indabaxug.github.io", desc: "Chairing community engagement for Uganda's Indaba chapter." },
    { id: "dsa", org: "Data Science Africa", role: "Member", period: "2022+", link: "https://www.datascienceafrica.org", desc: "Training in data science and ML across the continent." },
    { id: "dsi-africa", org: "DS-I Africa (NIH)", role: "Member", period: "2024+", link: "https://dsi-africa.org/", desc: "Data Science for Health Discovery & Innovation in Africa." },
    { id: "coara", org: "CoARA-ERIP", role: "Member", period: "2024+", link: "https://www.coara.org/working-groups/wg-erip/", desc: "Ethics & Research Integrity Policy." },
    { id: "tonative", org: "Tonative", role: "Member", period: "2025+", link: "https://tonative.org/", desc: "Language technology and NLP initiatives." },
    { id: "dsn", org: "Data Science Network", role: "Member", period: "2022+", link: "https://datasciencenigeria.org/", desc: "AI/ML certification and community workshops." },
  ];

  return (
    <section className="min-h-screen py-24 px-6">
      <SEO {...PAGE_SEO.community} />
      <div className="max-w-6xl mx-auto">
        <SH title="Community & Leadership" sub="Building AI capacity across Africa" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {roles.map((r, i) => (
            <FadeIn key={r.id} delay={i * 0.03}>
              <Cd className="h-full">
                <h4 className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {r.link ? (
                    <a href={r.link} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: C.bright }}>
                      {r.org}
                    </a>
                  ) : (
                    r.org
                  )}
                </h4>
                <div className="mt-1">
                  <Tag color={C.teal}>{r.role}</Tag>
                </div>
                <div className="text-xs mt-1" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                  {r.period}
                </div>
                <p className="text-xs leading-relaxed mt-2" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                  {r.desc}
                </p>
              </Cd>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Read more on my <IL page="Blog" setPage={setPage}>Blog</IL> · Check upcoming <IL page="Events" setPage={setPage}>Events</IL>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
