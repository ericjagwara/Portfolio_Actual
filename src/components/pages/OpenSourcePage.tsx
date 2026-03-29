import { C } from "@/constants/theme";
import { FadeIn, Tag, Cd, SH, EL, IL } from "@/components/common";
import { SEO, PAGE_SEO } from "@/components/common/SEO";

interface OpenSourcePageProps {
  setPage: (page: string) => void;
}

export function OpenSourcePage({ setPage }: OpenSourcePageProps) {
  const repos = [
    { id: "svg-ninja", title: "SVG-Ninja", desc: "WordPress plugin for secure SVG uploads with automatic metadata cleaning and zero frontend footprint.", tags: ["WordPress", "PHP", "SVG", "Security"], pub: true },
    { id: "notice-blocker", title: "Classic-Notice-Blocker", desc: "Classic Notice Blocker gives you full control over the admin notices cluttering your WordPress dashboard.", tags: ["WordPress", "PHP", "Admin UI"], pub: true },
    { id: "canarydrop", title: "CanaryDrop CLI", desc: "A lightweight cybersecurity terminal tool for creating and managing canary tokens, tripwires that alert you when attackers access them.", tags: ["Python", "Cybersecurity", "CLI"] },
    { id: "datasets", title: "Various Datasets", desc: "Curated datasets for ML competitions and research, spanning agriculture, health, NLP, and geospatial domains.", tags: ["Data", "ML", "Open Data"] },
    { id: "zindi-solutions", title: "Zindi Competition Solutions", desc: "Notebooks and pipelines from 80+ competitions spanning fraud detection, NLP, CV, time series, and geospatial tasks.", tags: ["Python", "LightGBM", "XGBoost"] },
    { id: "aiot", title: "AIoT Prototypes", desc: "Firmware and control code for AI-guided agricultural rovers, assistive devices, and sensor data pipelines.", tags: ["Arduino", "Raspberry Pi", "C"] },
    { id: "ml-training", title: "ML Training Materials", desc: "Course content covering Python, R, SQL, and core ML algorithms.", tags: ["Education", "Jupyter"] },
    { id: "responsible-ai", title: "Responsible AI Resources", desc: "Workshop materials for Microsoft Responsible AI coaching across Uganda, Kenya, and Nigeria.", tags: ["Ethics", "Governance"] },
  ];

  return (
    <section className="min-h-screen py-24 px-6">
      <SEO {...PAGE_SEO.openSource} />
      <div className="max-w-6xl mx-auto">
        <SH title="Open Source & Projects" sub="Plugins, tools, datasets, and community resources" />

        <FadeIn>
          <Cd className="mb-7 flex flex-wrap gap-4 items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "#1a1e2a" }}
            >
              ⌨
            </div>
            <div className="flex-1 min-w-48">
              <div className="text-base font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                GitHub · <strong>Eric Jagwara</strong>
              </div>
              <div className="text-xs mt-1" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                Plugins, ML solutions, AIoT prototypes
              </div>
            </div>
            <EL href="https://github.com/ericjagwara">View Profile</EL>
          </Cd>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {repos.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.03}>
              <Cd className="h-full">
                <div className="flex gap-2 items-center mb-1.5">
                  <h4 className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                    {p.title}
                  </h4>
                  {p.pub && <Tag color={C.teal}>Public</Tag>}
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((tag) => (
                    <Tag key={`${p.id}-${tag}`} color={C.blue}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              View my <IL page="Research" setPage={setPage}>Research</IL> · Explore my <IL page="Experience" setPage={setPage}>Experience</IL>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
