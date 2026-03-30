import { C } from "@/constants/theme";
import { FadeIn, Tag, Cd } from "@/components/common";

export function HeroSection() {
  const currentYear = new Date().getFullYear();
  const stats = [
    { id: "ai-ml", value: `${currentYear - 2021}+`, label: "Years", desc: "AI & ML experience" },
    { id: "app-dev", value: `${currentYear - 2016}+`, label: "Years", desc: "App Development & Design" },
    { id: "research", value: `${currentYear - 2022}+`, label: "Years", desc: "Active Research Contribution" },
  ];
  const socials = [
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/ericjagwara" },
    { id: "github", label: "GitHub", href: "https://github.com/ericjagwara" },
    { id: "zindi", label: "Zindi", href: "https://zindi.africa/users/Jagwara" },
    { id: "orcid", label: "ORCID", href: "https://orcid.org/0009-0003-4935-3667" },
    { id: "medium", label: "Medium", href: "https://medium.com/@ericjagwara_65224" },
    { id: "credly", label: "Credly", href: "https://www.credly.com/users/eric-jagwara" },
  ];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden px-6 pt-28 pb-20">
      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <div className="flex flex-wrap gap-2 mb-6">
            <Tag color={C.purple}>Security</Tag>
            <Tag>AI & Embedded Systems</Tag>
            <Tag color={C.teal}>Visual & Motion Design</Tag>
            <Tag color={C.blue}>Community & Research</Tag>
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2"
            style={{ fontFamily: "'Instrument Serif',serif", lineHeight: 1.05, color: C.bright }}
          >
            Jagwara Eric <span style={{ color: C.accent }}>Ofuono</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.18}>
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mb-9 leading-relaxed"
            style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}
          >
            Multidisciplinary Researcher, AI and Embedded Systems engineer, Visual and motion designer and community builder who enjoys building technology with people and for people by combining code, design, and local context. Beyond tech, I love creating in many forms, from visual design to paintings and crafts.
          </p>
        </FadeIn>
        <FadeIn delay={0.24}>
          <div className="flex flex-wrap gap-2.5 mb-12">
            {socials.map((social, i) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80"
                style={{ border: `1px solid ${C.border}`, color: C.text, background: "rgba(255,255,255,.02)" }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {stats.map((stat, i) => (
            <FadeIn key={stat.id} delay={0.28 + i * 0.05}>
              <Cd className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ fontFamily: "'Instrument Serif',serif", color: C.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-semibold mt-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {stat.label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                  {stat.desc}
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
