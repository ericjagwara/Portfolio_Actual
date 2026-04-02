import { C } from "@/constants/theme";
import { FadeIn, Cd } from "@/components/common";

export function AboutSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Main Intro */}
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "'Instrument Serif',serif", color: C.bright }}
              >
                Who is <span style={{ color: C.accent }}>Eric Jagwara?</span>
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Jagwara Eric Ofuono commonly known as Eric Jagwara's path into technology began through engineering and hands-on experimentation.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Originally trained in civil engineering, he had developed a strong foundation in technical design and systems thinking. But while providing support at Intellisys, a friend's startup in Uganda, he was introduced to embedded systems engineering and began working on integrating artificial intelligence into IoT systems. What started as simple technical support quickly evolved into a deeper commitment to building intelligent technologies.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                After several years of hands-on work with embedded systems and hardware development, Eric explored various short courses until he eventually chose to go deeper with Bachelor of Science in Artificial Intelligence and Machine Learning at ISBAT University and from which onwards built on to further studies in tech and data. His engineering background continues to shape how he approaches complex problems, combining structural thinking with practical innovation.
              </p>
            </div>
            <FadeIn delay={0.1}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${C.border}` }}
              >
                <img
                  src="/images/Eric_Jagwara.jpg"
                  alt="Eric Jagwara"
                  className="w-full h-auto object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Three Subsections */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Technology, Research and Trainings */}
          <FadeIn delay={0.15}>
            <Cd className="h-full">
              <div
                className="rounded-xl overflow-hidden mb-5"
                style={{ border: `1px solid ${C.border}` }}
              >
                <img
                  src="/images/Technology_and_Research.jpg"
                  alt="Technology, Research and Trainings"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}
              >
                Technology, Research and Trainings
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Eric operates at the forefront of technology, blending embedded systems, IoT, machine learning, cybersecurity, and intelligent software. His work combines technical precision, creativity, and practical insight, producing solutions that are innovative, reliable, and designed to make a real difference.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                He has contributed to cutting-edge research, mentorship programs, and data-driven initiatives, collaborating with global communities to advance AI and intelligent systems. Eric's approach emphasizes interdisciplinary thinking, bringing together engineering, AI, and design to build technology that works, inspires, and scales.
              </p>
            </Cd>
          </FadeIn>

          {/* Startups and Ecosystem */}
          <FadeIn delay={0.25}>
            <Cd className="h-full">
              <div
                className="rounded-xl overflow-hidden mb-5"
                style={{ border: `1px solid ${C.border}` }}
              >
                <img
                  src="/images/Startups_and_Ecosystem.jpg"
                  alt="Startups and Ecosystem"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}
              >
                Startups and Ecosystem
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Eric's entrepreneurial journey spans AI, cybersecurity, and open-source development. He co-founded Solid Elf Security and Data Research Lab.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                At TechBuzz Hub, Eric has served as an AI mentor and product advisor, helping startups prototype intelligent systems, validate ideas, and build technically sound products. His approach blends technical depth with strategic thinking, supporting founders from concept to execution.
              </p>
            </Cd>
          </FadeIn>

          {/* Community and Leadership */}
          <FadeIn delay={0.35}>
            <Cd className="h-full">
              <div
                className="rounded-xl overflow-hidden mb-5"
                style={{ border: `1px solid ${C.border}` }}
              >
                <img
                  src="/images/Community_and_Leadership.jpg"
                  alt="Community and Leadership"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}
              >
                Community and Leadership
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Eric is a driving force in Africa's technology ecosystem, building networks, mentoring talent, and creating opportunities that matter. As Zindi's Country Ambassador for Uganda, he connects local data scientists to a community of over 100,000 practitioners, linking them to competitions, mentorship, and real-world AI projects.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                He leads the Young AI Leaders Kampala Hub under the AI for Good initiative, supporting innovators in applying technology for social impact. Beyond these roles, he contributes to Africa's most prominent AI and data science networks, including Deep Learning Indaba, IndabaX Uganda, Data Science Africa, DS-I Africa, the Data Science Network, CoARA, and Tonative, fostering collaboration, ethical innovation, and growth across the continent.
              </p>
            </Cd>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
