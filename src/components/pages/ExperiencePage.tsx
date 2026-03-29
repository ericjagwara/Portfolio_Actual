import { useState } from "react";
import { C } from "@/constants/theme";
import { FadeIn, Tag, Cd, SH, EL, IL } from "@/components/common";
import { SEO, PAGE_SEO } from "@/components/common/SEO";

interface ExperiencePageProps {
  setPage: (page: string) => void;
}

export function ExperiencePage({ setPage }: ExperiencePageProps) {
  const [compTab, setCompTab] = useState("Top 10");

  const jobs = [
    {
      title: "Qualitative Analyst & Transcriber",
      type: "Volunteer",
      org: "Cashin Project, Roskilde Universitet",
      link: "https://ruc.dk/en",
      period: "Jun 2025 – Nov 2025",
      items: ["Transcription and translation from local languages", "Structured codebooks in MAXQDA", "Data cleaning and academic report drafting"],
    },
    {
      title: "Technology Transfer & Research Assistant",
      type: "Part Time",
      org: "Techbuzz Hub, Kampala",
      link: "https://techbuzzhub.org",
      period: "Aug 2023 – Jun 2025",
      items: ["AI/data analytics training for startups", "IoT and automation prototyping", "Grant proposals and mentorship"],
    },
    {
      title: "AI Engineer",
      type: "Contract",
      org: "Athari, New York, USA",
      link: null,
      period: "May 2024 – Jan 2025",
      items: ["ML prototypes for social impact", "Predictive models and data pipelines", "Ethical AI and model monitoring"],
    },
    {
      title: "Machine Learning Trainer",
      type: "Part Time",
      org: "Tufuna Technologies Cyber Camp",
      link: null,
      period: "Aug 2023 – Feb 2025",
      items: ["ML and data analytics curriculum", "Taught Python, R, SQL, Tableau, Power BI", "Mentored real-world ML projects"],
    },
    {
      title: "AIoT Developer",
      type: "Apprentice",
      org: "IntelliSys Uganda Ltd",
      link: "https://www.intellisysug.com",
      period: "Jun 2021 – Dec 2024",
      items: ["AI-guided assistive technology devices", "Agricultural IoT sensor systems", "Arduino & Raspberry Pi prototyping", "UI/UX with Figma, Adobe XD, Sketch"],
    },
  ];

  const freelance = [
    {
      title: "Web Designer & Developer",
      period: "2016 – Present",
      desc: "Building custom websites and web applications primarily with WordPress, JavaScript, Python, and Ruby. Delivering responsive, accessible, and performant digital experiences for organisations across East Africa and beyond.",
      sites: [
        { n: "NiaCare", u: "https://www.niacare.org" },
        { n: "Cosy Structures", u: "https://cosystructures.com" },
        { n: "Al-Umm", u: "https://al-umm.org" },
        { n: "CATREG", u: "https://catreug.org" },
        { n: "Talent for Wealth", u: "https://talentforwealth.com" },
        { n: "Fencherr", u: "https://fencherr.com" },
      ],
      tags: ["WordPress", "JavaScript", "Python", "Ruby", "PHP"],
    },
    {
      title: "Graphics Design, UI/UX & Animation",
      period: "2016 – Present",
      desc: "Visual design, branding, interface prototyping, architectural visualisation, and motion graphics for clients across multiple industries.",
      sites: null,
      tags: ["Adobe Creative Suite", "Figma", "3ds Max", "Harmony", "Revit", "Modo", "CAD"],
    },
    {
      title: "Research & Innovation Consultant",
      period: "2022 – Present",
      desc: "Independent consulting across data science, artificial intelligence, and civil engineering domains. Research design, data analysis, technical writing, and feasibility studies for academic and industry clients. Civil engineering consultancy including structural design, architectural planning, and project documentation.",
      sites: null,
      tags: ["Data Science", "AI Research", "Civil Engineering", "Structural Design", "Technical Writing", "Feasibility Studies"],
    },
    {
      title: "Cybersecurity Engineer",
      period: "2018 – Present",
      desc: "Freelance cybersecurity services including penetration testing, security auditing, compliance consulting (GDPR, ISO 27001), incident response, and malware removal for small-to-medium organisations.",
      sites: null,
      tags: ["Penetration Testing", "Security Auditing", "GDPR", "ISO 27001", "Incident Response", "Malware Removal"],
    },
  ];

  const edu = [
    ["MPH Epidemiology & Biostatistics", "ISBAT University", "Enrolled"],
    ["BSc AI & ML (2nd Class Upper)", "ISBAT University", "2025"],
    ["BEng. Civil Engineering", "Ndejje University", ""],
  ];

  const skills = [
    ["Programming", "Python, R, C, SQL, JS, PHP, Ruby"],
    ["Data Science", "STATA, NVIVO, MAXQDA, Tableau, Power BI"],
    ["IoT", "Arduino, Raspberry Pi, AIoT"],
    ["Design", "Figma, Adobe Suite, 3ds Max, Revit, Modo"],
    ["Security", "Pen Testing, GDPR, ISO 27001"],
    ["Civil Eng", "Structural Design, CAD, Project Mgmt"],
  ];

  const certs = ["IBM AI Fundamentals", "IBM Applied Data Science", "Microsoft Responsible AI Coach", "DSN AI & ML", "Zaka AI Boot Camp", "Data.org Climate & Health"];

  const compTabs: Record<string, { n: string; r: number; f: number; s?: boolean; url?: string }[]> = {
    "Top 10": [
      { n: "Grocery Store Forecasting (Azubian)", r: 1, f: 1, s: true, url: "https://zindi.africa/competitions/grocery-store-forecasting-challenge-for-azubian" },
      { n: "Yassir ETA Prediction (Azubian)", r: 2, f: 4, s: true, url: "https://zindi.africa/hackathons/umojahack-algeria-yassir-eta-prediction-challenge" },
      { n: "Movie Review Sentiment Classification", r: 2, f: 3, s: true, url: "https://zindi.africa/competitions/movie-review-sentiment-classification-challenge" },
      { n: "AI Challenge – Beginner", r: 4, f: 16, s: true, url: "https://zindi.africa/competitions/ai-challenge-beginner" },
      { n: "AI Challenge – Advanced", r: 5, f: 9, s: true, url: "https://zindi.africa/competitions/ai-challenge-advanced" },
      { n: "IndabaX-Togo Fraud Detection", r: 6, f: 9, s: true, url: "https://zindi.africa/competitions/grand-hackathon-dindabax-togo-2023" },
      { n: "Income Prediction (Azubian)", r: 8, f: 13, s: true, url: "https://zindi.africa/competitions/income-prediction-challenge-for-azubian" },
      { n: "Customer Churn (Azubian)", r: 8, f: 10, s: true, url: "https://zindi.africa/competitions/customer-churn-prediction-challenge-for-azubian" },
      { n: "Microsoft x DSN Expresso Churn", r: 8, f: 56, s: true, url: "https://zindi.africa/competitions/microsoft-x-dsn-free-ai-classes-in-every-city-hackathon-expresso-churn-prediction" },
    ],
    NLP: [
      { n: "Caribbean Voices AI Hackathon", r: 16, f: 28, url: "https://zindi.africa/competitions/caribbean-voices-ai-hackathon" },
      { n: "GeoAI Location Mention Recognition", r: 18, f: 28, url: "https://zindi.africa/competitions/geoai-location-mention-recognition" },
      { n: "Swahili News Classification", r: 27, f: 113, url: "https://zindi.africa/competitions/swahili-news-classification" },
      { n: "Tanzania ASR Challenge", r: 29, f: 34, url: "https://zindi.africa/competitions/lacuna-asr-kinyarwanda-and-swahili" },
      { n: "Lelapa LLM Compression", r: 43, f: 118, url: "https://zindi.africa/competitions/lelapa-llm-compression-challenge" },
    ],
    CV: [
      { n: "Air Pollution Susceptibility (Milan)", r: 14, f: 35, url: "https://zindi.africa/competitions/urban-air-pollution-challenge" },
      { n: "Bill Classification (Tunisia)", r: 15, f: 36, url: "https://zindi.africa/competitions/digital-transformation-of-tunisian-government-documents" },
      { n: "License Plate Recognition", r: 16, f: 90, url: "https://zindi.africa/competitions/lacuna-kenyan-license-plate-recognition-challenge" },
      { n: "Landslide Susceptibility (Alps)", r: 17, f: 20, url: "https://zindi.africa/competitions/landslide-susceptibility-mapping-in-the-alps" },
    ],
    Forecast: [
      { n: "Olympic 2024 Medal Prediction", r: 16, f: 30, url: "https://zindi.africa/competitions/paris-2024-olympics-medal-prediction" },
      { n: "Forest Cover", r: 16, f: 16, url: "https://zindi.africa/competitions/forest-cover-type-prediction" },
      { n: "QoS Prediction", r: 23, f: 129, url: "https://zindi.africa/competitions/airqo-african-air-quality-prediction-challenge" },
    ],
    Geo: [
      { n: "Soil Params Hyperspectral", r: 25, f: 62, url: "https://zindi.africa/competitions/cgiar-soil-organic-carbon-prediction-challenge" },
      { n: "Flood Prediction", r: 29, f: 46, url: "https://zindi.africa/competitions/cgiar-machine-learning-for-crop-improvement" },
      { n: "Land Cover Classification", r: 32, f: 103, url: "https://zindi.africa/competitions/esa-eurosat-land-use-and-land-cover-classification-challenge" },
    ],
    Health: [
      { n: "Life Expectancy Prediction", r: 12, f: 23, url: "https://zindi.africa/competitions/life-expectancy-prediction-challenge" },
      { n: "Cancer Staging", r: 22, f: 41, url: "https://zindi.africa/competitions/miia-breast-cancer-pathological-stage-prediction" },
      { n: "Depression Tweets", r: 25, f: 85, url: "https://zindi.africa/competitions/ai4d-lab-malawi-detecting-tweets-about-depression" },
    ],
  };

  return (
    <section className="min-h-screen py-24 px-6">
      <SEO {...PAGE_SEO.experience} />
      <div className="max-w-6xl mx-auto">
        <SH title="Experience & Education" sub="A blend of AI engineering, civil engineering, design, and community leadership" />

        <div className="grid md:grid-cols-3 gap-7 mb-10">
          {/* Timeline */}
          <div className="md:col-span-2">
            <h3
              className="text-xs uppercase tracking-widest mb-5"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Roles
            </h3>
            {jobs.map((j, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div
                  className="relative pl-5 pb-6 mb-2 border-l"
                  style={{ borderColor: C.border }}
                >
                  <div
                    className="absolute -left-1.5 top-1.5 w-2 h-2 rounded-full"
                    style={{ background: C.accent }}
                  />
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <h4 className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                      {j.title}
                    </h4>
                    <Tag color={C.teal}>{j.type}</Tag>
                  </div>
                  <div className="text-sm" style={{ fontFamily: "'Inter',sans-serif" }}>
                    {j.link ? (
                      <a href={j.link} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: C.accent }}>
                        {j.org}
                      </a>
                    ) : (
                      <span style={{ color: C.accent }}>{j.org}</span>
                    )}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                    {j.period}
                  </div>
                  <ul className="mt-2 pl-4 text-xs leading-relaxed list-disc" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                    {j.items.map((it, k) => (
                      <li key={k} className="mb-0.5">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Education & Skills */}
          <div>
            <h3
              className="text-xs uppercase tracking-widest mb-5"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Education
            </h3>
            {edu.map(([d, s, y], i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <Cd className="mb-3.5">
                  <div className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                    {d}
                  </div>
                  <div className="text-xs mt-1" style={{ color: C.accent }}>
                    {s}
                  </div>
                  {y && (
                    <div className="text-xs mt-0.5" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                      {y}
                    </div>
                  )}
                </Cd>
              </FadeIn>
            ))}

            <h3
              className="text-xs uppercase tracking-widest mt-8 mb-4"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Skills
            </h3>
            <FadeIn>
              <Cd>
                {skills.map(([k, v], i) => (
                  <div
                    key={i}
                    className="py-2 flex gap-2.5 text-xs"
                    style={{
                      borderBottom: i < skills.length - 1 ? `1px solid ${C.border}` : "none",
                      fontFamily: "'Inter',sans-serif",
                    }}
                  >
                    <span className="font-semibold min-w-24" style={{ color: C.accent }}>
                      {k}
                    </span>
                    <span style={{ color: C.text }}>{v}</span>
                  </div>
                ))}
              </Cd>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {certs.map((c, i) => (
                  <Tag key={i} color={C.blue}>
                    {c}
                  </Tag>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Freelance */}
        <h3
          className="text-xs uppercase tracking-widest mt-14 mb-5"
          style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
        >
          Freelance Work
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {freelance.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Cd className="h-full">
                <h4 className="text-base font-bold mb-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {f.title}
                </h4>
                <div className="text-xs mb-2.5" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                  {f.period}
                </div>
                <p className="text-sm leading-relaxed mb-3.5" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                  {f.desc}
                </p>
                {f.sites && (
                  <div className="mb-3.5">
                    <div className="text-xs font-semibold mb-1.5" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                      Sample Projects:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {f.sites.map((s, k) => (
                        <a
                          key={k}
                          href={s.u}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity"
                          style={{
                            color: C.accent,
                            border: `1px solid ${C.accent}30`,
                            fontFamily: "'Inter',sans-serif",
                          }}
                        >
                          {s.n}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-1">
                  {f.tags.map((t, k) => (
                    <Tag key={k} color={C.blue}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>

        {/* Competitions */}
        <h3
          className="text-xs uppercase tracking-widest mt-14 mb-5"
          style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
        >
          Competitive Machine Learning
        </h3>
        <FadeIn>
          <div className="flex flex-wrap gap-1 mb-5">
            {Object.keys(compTabs).map((t) => (
              <button
                key={t}
                onClick={() => setCompTab(t)}
                className="px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200"
                style={{
                  background: compTab === t ? C.accent : C.card,
                  color: compTab === t ? C.bg : C.muted,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <Cd className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs" style={{ fontFamily: "'Inter',sans-serif", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: C.muted }}>
                      Competition
                    </th>
                    <th className="text-center py-3 px-3 font-semibold" style={{ color: C.muted }}>
                      Rank
                    </th>
                    <th className="text-center py-3 px-3 font-semibold" style={{ color: C.muted }}>
                      Field
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compTabs[compTab].map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td className="py-2 px-4" style={{ color: C.text }}>
                        {row.s ? "⭐ " : ""}
                        {row.url ? (
                          <a 
                            href={row.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="hover:underline"
                            style={{ color: C.accent }}
                          >
                            {row.n}
                          </a>
                        ) : row.n}
                      </td>
                      <td
                        className={`text-center py-2 px-3 ${row.r <= 10 ? "font-semibold" : ""}`}
                        style={{ color: row.r <= 10 ? C.accent : C.text }}
                      >
                        #{row.r}
                      </td>
                      <td className="text-center py-2 px-3" style={{ color: C.muted }}>
                        {row.f}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Cd>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="text-center py-3.5 mt-3.5">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Full record → <EL href="https://zindi.africa/users/Jagwara/competitions/portfolio">zindi.africa/users/Jagwara</EL> · View my <IL page="Community" setPage={setPage}>Community</IL> work
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
