import { C } from "@/constants/theme";
import { FadeIn, Tag, Cd, SH, EL, IL } from "@/components/common";
import { SEO, PAGE_SEO } from "@/components/common/SEO";

interface ResearchPageProps {
  setPage: (page: string) => void;
}

export function ResearchPage({ setPage }: ResearchPageProps) {
  const areas = [
    {
      id: "assistive-tech",
      title: "Assistive Technology & Accessibility",
      desc: "Exploring how embedded AI and sensor systems can enhance daily life for people with disabilities, focusing on affordable solutions in resource-constrained settings.",
      tags: ["Accessibility", "Embedded AI", "HCI"],
    },
    {
      id: "agri-iot",
      title: "Agricultural Intelligence & IoT",
      desc: "Investigating the application of machine learning and IoT sensor networks to improve agricultural productivity, crop health monitoring, and food security across Africa.",
      tags: ["AIoT", "Agriculture", "Sensor Networks"],
    },
    {
      id: "health-ai",
      title: "Health AI & Medical Imaging",
      desc: "Contributing to the intersection of AI and healthcare through mentorship, review work, and research into deep learning methods for diagnostics and clinical decision support.",
      tags: ["Medical Imaging", "Health AI", "Clinical ML"],
    },
    {
      id: "nlp",
      title: "Natural Language Processing",
      desc: "Working on NLP tasks relevant to African languages, including speech recognition, text classification, and efficient approaches for low-resource language contexts.",
      tags: ["NLP", "Low-Resource Languages", "ASR"],
    },
    {
      id: "climate-geo",
      title: "Climate, Environment & Geospatial AI",
      desc: "Applying geospatial analysis, remote sensing, and machine learning to environmental monitoring, climate adaptation, and sustainable development challenges.",
      tags: ["Climate AI", "GeoAI", "Remote Sensing"],
    },
    {
      id: "public-health",
      title: "Public Health & Epidemiology",
      desc: "Integrating data science and biostatistical methods into public health research, surveillance systems, and population-level health analytics.",
      tags: ["Epidemiology", "Biostatistics", "Public Health"],
    },
  ];

  const reviews = [
    { id: "chi-2026", title: "CHI 2026: AI Across Cultures Workshop", role: "Paper Reviewer", venue: "Portugal", link: "https://chi2026.acm.org" },
    { id: "miccai-2025", title: "MICCAI 2025", role: "Conference Mentor", venue: "Daejeon, South Korea", link: "https://conferences.miccai.org/2025/en/MENTORS.html" },
    { id: "mena-ml", title: "MENA ML Winter School 2024–2026", role: "Application Reviewer", venue: "KAUST, Saudi Arabia" },
    { id: "dsawh", title: "DSAWH Fellowship 2025", role: "Proposal Reviewer", venue: "Women's Health AI" },
    { id: "meta-llama", title: "Meta Llama Impact Hackathon", role: "Application Reviewer", venue: "2024" },
    { id: "unido", title: "UNIDO Breakout Session", role: "Facilitator & Speaker", venue: "Riyadh, 2025" },
  ];

  return (
    <section className="min-h-screen py-24 px-6">
      <SEO {...PAGE_SEO.research} />
      <div className="max-w-6xl mx-auto">
        <SH title="Research & Publications" sub="Bridging AI research with real-world African contexts" />

        <FadeIn>
          <Cd className="mb-8 flex flex-wrap gap-4 items-center">
            <div
              className="w-13 h-13 rounded-lg flex items-center justify-center text-xl font-extrabold text-white flex-shrink-0"
              style={{ background: C.teal, fontFamily: "'Inter',sans-serif" }}
            >
              iD
            </div>
            <div className="flex-1 min-w-48">
              <div className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                ORCID · <strong>Jagwara Eric Ofuono</strong>
              </div>
              <div className="text-xs mt-1" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                0009-0003-4935-3667
              </div>
            </div>
            <EL href="https://orcid.org/0009-0003-4935-3667">View on ORCID</EL>
          </Cd>
        </FadeIn>

        <h3
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
        >
          Research Areas
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-11">
          {areas.map((a, i) => (
            <FadeIn key={a.id} delay={i * 0.03}>
              <Cd className="h-full">
                <h4 className="text-sm font-bold mb-1.5" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {a.title}
                </h4>
                <p className="text-xs leading-relaxed mb-3" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                  {a.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {a.tags.map((tag) => (
                    <Tag key={`${a.id}-${tag}`} color={C.teal}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>

        <h3
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
        >
          Review & Conference Activity
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {reviews.map((c, i) => (
            <FadeIn key={c.id} delay={i * 0.03}>
              <Cd>
                <div className="text-sm font-bold mb-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {c.title}
                </div>
                <Tag color={C.purple}>{c.role}</Tag>
                <div className="text-xs mt-1.5" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                  {c.venue}
                </div>
                {c.link && (
                  <div className="mt-1.5">
                    <EL href={c.link}>View</EL>
                  </div>
                )}
              </Cd>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Explore my <IL page="Experience" setPage={setPage}>Experience</IL> · View my <IL page="Open Source" setPage={setPage}>Open Source</IL> projects
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
