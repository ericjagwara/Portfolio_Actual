import { C } from "@/constants/theme";

// Background Pattern Component
export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${C.accent} 1px, transparent 1px),
            linear-gradient(90deg, ${C.accent} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${C.accent}08 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 80%, ${C.teal}05 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 50%, ${C.blue}03 0%, transparent 70%)`,
        }}
      />
      {/* Floating orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{
          background: `radial-gradient(circle, ${C.accent}40 0%, transparent 70%)`,
          top: "10%",
          left: "-10%",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-8"
        style={{
          background: `radial-gradient(circle, ${C.teal}40 0%, transparent 70%)`,
          top: "60%",
          right: "-5%",
          animation: "float 25s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-8"
        style={{
          background: `radial-gradient(circle, ${C.purple}40 0%, transparent 70%)`,
          bottom: "20%",
          left: "30%",
          animation: "float 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}
