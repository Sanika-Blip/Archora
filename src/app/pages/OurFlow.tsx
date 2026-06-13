import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { Helmet } from "react-helmet";

// ─────────────────────────────────────────────
// DESIGN TOKENS — matches Home.tsx
// ─────────────────────────────────────────────
const C = {
  navy:    "#041c2e",
  navyMid: "#0a2e47",
  blue:    "#1b6ca8",
  teal:    "#4bccd4",
  cream:   "#f5f1eb",
  creamAlt:"#ede9e1",
  red:     "#c0392b",
  white:   "#ffffff",
};

// ─────────────────────────────────────────────
// SHARED DECORATIONS (same as Home.tsx)
// ─────────────────────────────────────────────
function BlueprintGrid({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="bp-sm-flow" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0L0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
        <pattern id="bp-lg-flow" width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill="url(#bp-sm-flow)" />
          <path d="M120 0L0 0 0 120" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-lg-flow)" opacity={opacity} />
    </svg>
  );
}

function MedicalCross({ size = 20, color = C.red, opacity = 0.85 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="6.5" y="1" width="7" height="18" rx="1.5" fill={color} opacity={opacity} />
      <rect x="1" y="6.5" width="18" height="7" rx="1.5" fill={color} opacity={opacity} />
    </svg>
  );
}

function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
      <span style={{ width: 28, height: 1, background: light ? "rgba(75,204,212,0.6)" : C.blue, display: "block" }} />
      <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: light ? "rgba(75,204,212,0.7)" : C.blue }}>
        {text}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA — 8 real steps from the PDF
// ─────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "First Conversation",
    subtitle: "You Reach Out. We Listen.",
    desc: "No sales pitch. No package presentation. Just a genuine conversation about your project — what you are building, where you are building it, what stage you are at, and what you need. We ask the right questions so we understand your vision before we say anything about our services.",
    how: ["Call or WhatsApp us directly", "Fill the project enquiry form", "Email us your brief"],
    icon: "📞",
    accent: "#4bccd4",
  },
  {
    num: "02",
    title: "Expert Consultation",
    subtitle: "You Meet the People Who Will Actually Work on Your Project.",
    desc: "A structured working session led personally by our founder — with our senior healthcare consultant and architect. We understand your clinical vision, assess your site and regulatory environment, flag potential challenges early, and give you a preliminary roadmap of the entire project journey.",
    how: ["Clinical vision and specialty focus", "Site, scale, and regulatory review", "Compliance requirements identified", "Preliminary project roadmap"],
    icon: "🏛️",
    accent: "#1b6ca8",
  },
  {
    num: "03",
    title: "Site Visit & Assessment",
    subtitle: "We Come to You. We See the Ground Reality.",
    desc: "Our team visits your site for a complete physical assessment — dimensions, orientation, access, existing structure, neighbouring infrastructure, and local regulatory context. Nothing is assumed. Everything is verified on ground.",
    how: ["Brownfield: assess existing structure, plan around constraints", "Greenfield: master planning and licensing feasibility", "Regulatory context verified on site"],
    icon: "📍",
    accent: "#c0392b",
  },
  {
    num: "04",
    title: "Feasibility Report & Cost Presentation",
    subtitle: "You Know the Full Picture Before You Commit a Single Rupee.",
    desc: "Before any design begins, we present a comprehensive feasibility report. Whether your budget is ₹1 crore or ₹150 crore — you get the same honesty. We work with what you have, not what we wish you had.",
    how: ["Realistic project cost range", "Compliance and licensing roadmap", "Green flags and red flags", "Timeline from design to commissioning"],
    icon: "📊",
    accent: "#4bccd4",
  },
  {
    num: "05",
    title: "Design & Architecture",
    subtitle: "Where Your Hospital Takes Shape.",
    desc: "Every design at ARCHORA is built with three non-negotiables: clinical workflow first, compliance by design, and future-ready. NABH, NABL, fire, and structural standards are built in from day one — never retrofitted.",
    how: ["Architectural design and space planning", "Structural and MEP engineering", "Modular OT and ICU design", "NABH-compliant layout framework"],
    icon: "📐",
    accent: "#1b6ca8",
  },
  {
    num: "06",
    title: "Licensing & Approvals",
    subtitle: "We Handle the Paperwork. You Focus on Your Practice.",
    desc: "Licensing is where most hospital projects get stuck — sometimes for years. ARCHORA manages the entire licensing and approvals process through our in-house compliance team of NABH consultants, JCI-aware advisors, and healthcare-specialised architects.",
    how: ["Architectural drawing approvals", "Fire NOC", "NABH pre-accreditation documentation", "Local municipal clearances"],
    icon: "✅",
    accent: "#c0392b",
  },
  {
    num: "07",
    title: "Construction & Execution",
    subtitle: "We Build. You Do Not Chase Anyone.",
    desc: "One team. One contract. One point of contact. Zero chaos. Most healthcare entrepreneurs are running between a contractor, MEP vendor, interior firm, OT company, and equipment planner — with no one taking overall accountability. At ARCHORA — one call handles everything.",
    how: ["Civil construction and structural execution", "MEP — Electrical, Plumbing, HVAC, Medical Gas", "Modular OT and ICU installation", "Interior fit-out and medical equipment"],
    icon: "🏗️",
    accent: "#4bccd4",
  },
  {
    num: "08",
    title: "Commissioning & Handover",
    subtitle: "Your Hospital is Ready to Operate — Not Just Ready to Look At.",
    desc: "We do not hand over a building. We hand over an operational healthcare facility. You open your doors with confidence — because every system has been tested, every compliance box has been checked, and every detail has been verified.",
    how: ["System testing — MEP, OT, ICU, medical gas", "NABH compliance final check", "Staff walkthrough and orientation support", "Final documentation and handover package"],
    icon: "🎯",
    accent: "#1b6ca8",
  },
];

const comparison = [
  { attr: "Healthcare specialisation", general: "Rarely", archora: "Exclusively" },
  { attr: "NABH compliance knowledge", general: "Limited", archora: "In-house from Day 1" },
  { attr: "MEP for healthcare", general: "Outsourced", archora: "In-house specialist" },
  { attr: "OT and ICU infrastructure", general: "Unknown vendor", archora: "Managed by ARCHORA" },
  { attr: "Cost transparency upfront", general: "Rarely", archora: "Always" },
  { attr: "Single window delivery", general: "Multiple vendors", archora: "One team, one contract" },
  { attr: "Retrofit risk", general: "Very high", archora: "Eliminated by design" },
];

const problems = [
  "They hire a local architect who has never designed a hospital",
  "No one tells them about NABH, NABL, or fire NOC requirements upfront",
  "The design gets made — and then retrofitting costs them double",
  "They are running between 6 different vendors with no accountability",
  "No one gives them a real cost picture before they commit",
  "The project drags for years with no clear timeline",
];

// ─────────────────────────────────────────────
// STEP CARD COMPONENT
// ─────────────────────────────────────────────
function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative" }}
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div style={{
          position: "absolute", left: 31, top: "100%", width: 1, height: 32,
          background: `linear-gradient(to bottom, ${step.accent}40, transparent)`,
          zIndex: 0,
        }} />
      )}

      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", gap: 0, cursor: "pointer",
          border: `1px solid ${open ? step.accent + "50" : "rgba(75,204,212,0.1)"}`,
          marginBottom: 1, position: "relative", zIndex: 1,
          background: open ? "rgba(75,204,212,0.03)" : C.navy,
          transition: "all 0.4s ease",
        }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLDivElement).style.borderColor = step.accent + "40"; }}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(75,204,212,0.1)"; }}
      >
        {/* Left accent bar */}
        <motion.div
          animate={{ scaleY: open ? 1 : 0 }}
          initial={{ scaleY: 0 }}
          style={{
            width: 3, background: step.accent, flexShrink: 0,
            transformOrigin: "bottom", transition: "all 0.4s ease",
          }}
        />

        {/* Number column */}
        <div style={{
          width: 60, flexShrink: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-start", padding: "24px 0",
          borderRight: `1px solid rgba(75,204,212,0.1)`,
          background: open ? `${step.accent}10` : "transparent",
          transition: "background 0.4s",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 20, fontWeight: 400, color: step.accent, lineHeight: 1,
          }}>{step.num}</span>
          <div style={{ width: 1, height: 24, background: "rgba(75,204,212,0.15)", margin: "8px 0" }} />
          <span style={{ fontSize: 20 }}>{step.icon}</span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "24px 48px 24px 24px", position: "relative" }}>
          <p style={{ color: step.accent, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 4 }}>
            Phase {step.num}
          </p>
          <h3 style={{ color: C.white, fontSize: 18, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, marginBottom: 4, lineHeight: 1.2 }}>
            {step.title}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.05em", margin: 0 }}>
            {step.subtitle}
          </p>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.85, margin: "18px 0 16px" }}>
                  {step.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {step.how.map((item, i) => (
                    <span key={i} style={{
                      fontSize: 10, padding: "4px 12px",
                      border: `0.5px solid ${step.accent}40`,
                      color: step.accent, fontFamily: "monospace",
                      letterSpacing: "0.06em", background: `${step.accent}08`,
                    }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand toggle */}
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
              width: 28, height: 28, border: `1px solid rgba(75,204,212,0.25)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(75,204,212,0.6)", fontSize: 18, lineHeight: 1,
            }}
          >+</motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export function OurFlow() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <>
      <Helmet>
        <title>How ARCHORA Works — Healthcare Infrastructure Process | Hospital Design to Commissioning</title>
        <meta name="description" content="From first conversation to final commissioning — discover how ARCHORA delivers hospitals, clinics, and healthcare facilities through a single-window, fully transparent, compliance-first process." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How ARCHORA Delivers a Healthcare Infrastructure Project",
          "description": "Step by step process ARCHORA follows to design and build hospitals, clinics, OTs, ICUs and healthcare facilities across India",
          "step": steps.map((s, i) => ({ "@type": "HowToStep", "position": i + 1, "name": s.title, "text": s.desc }))
        })}</script>
      </Helmet>

      <div style={{ fontFamily: "'Georgia', serif", overflowX: "hidden", background: C.navy }}>

        {/* ═══════════════════════════════════
            HERO
        ═══════════════════════════════════ */}
        <section ref={heroRef} style={{ position: "relative", height: "70vh", minHeight: 560, overflow: "hidden" }}>
          <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
            <img
              src="https://images.unsplash.com/photo-1589233361468-0128345570e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
              alt="ARCHORA process"
              style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 40%" }}
            />
          </motion.div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(4,28,46,0.95) 0%, rgba(4,28,46,0.7) 55%, rgba(4,28,46,0.4) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,28,46,0.8) 0%, transparent 50%)" }} />

          <div style={{ position: "absolute", inset: 0, color: C.teal }}>
            <BlueprintGrid opacity={0.07} />
          </div>

          {/* Decorative rotating ring */}
          <motion.div
            style={{ position: "absolute", top: "20%", right: "10%", width: 200, height: 200, border: "1px solid rgba(75,204,212,0.08)", borderRadius: "50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            style={{ position: "absolute", top: "25%", right: "12%", width: 120, height: 120, border: "1px solid rgba(75,204,212,0.12)", borderRadius: "50%" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          />

          <div style={{ position: "relative", height: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 80px", display: "flex", alignItems: "center", zIndex: 10 }}>
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: 680 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <MedicalCross size={16} />
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", fontFamily: "monospace" }}>
                  How ARCHORA Works
                </span>
              </div>
              <h1 style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)", color: C.white,
                lineHeight: 1.06, marginBottom: 20,
                fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400,
              }}>
                From First Conversation<br />
                <em style={{ color: C.teal, fontStyle: "italic" }}>to Final Commissioning.</em>
              </h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 500, marginBottom: 40 }}>
                A proven 8-step process built exclusively for healthcare infrastructure — transparent, compliance-first, and single-window accountable.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button style={{
                  padding: "13px 30px", background: C.blue, color: C.white,
                  border: "none", fontSize: 10, letterSpacing: "0.18em",
                  textTransform: "uppercase", fontFamily: "monospace", cursor: "pointer",
                }}>Start Your Consultation →</button>
                <button style={{
                  padding: "13px 30px", background: "transparent",
                  color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.25)",
                  fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                  fontFamily: "monospace", cursor: "pointer",
                }}>View Our Projects</button>
              </div>
            </motion.div>
          </div>

          {/* Step count badge */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{
              position: "absolute", bottom: 40, right: 80,
              display: "flex", alignItems: "center", gap: 14,
            }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 52, color: "rgba(75,204,212,0.15)", lineHeight: 1 }}>08</span>
            <div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 2px" }}>Total</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "monospace", margin: 0 }}>Process Steps</p>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            PROBLEM SECTION
        ═══════════════════════════════════ */}
        <section style={{ background: C.cream, padding: "100px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

              <motion.div
                initial={{ opacity: 0, x: -48 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel text="The Problem We Solve First" />
                <h2 style={{ color: C.navy, fontSize: "clamp(1.9rem, 3vw, 2.8rem)", lineHeight: 1.15, marginBottom: 24, fontWeight: 400, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Most Hospital Projects Fail Before Construction Even Begins
                </h2>
                <p style={{ color: "#4a5a6a", lineHeight: 1.85, fontSize: 14, marginBottom: 28 }}>
                  Before we talk about our process, let us be honest about what most doctors and healthcare entrepreneurs face when they start a hospital project.
                </p>
                <div style={{ padding: "20px 24px", background: C.navy, borderLeft: `4px solid ${C.red}`, marginBottom: 28 }}>
                  <p style={{ color: C.teal, fontStyle: "italic", fontSize: 14, margin: 0, lineHeight: 1.75, opacity: 0.9 }}>
                    "ARCHORA exists to make this story obsolete."
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 48 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {problems.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 16,
                        padding: "14px 18px", background: C.white,
                        borderLeft: `2px solid ${C.red}40`,
                      }}
                    >
                      <span style={{ color: C.red, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✕</span>
                      <span style={{ color: "#4a5a6a", fontSize: 13, lineHeight: 1.6 }}>{p}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            8-STEP PROCESS
        ═══════════════════════════════════ */}
        <section style={{ background: "#060f1e", padding: "120px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, color: C.teal }}>
            <BlueprintGrid opacity={0.04} />
          </div>

          {/* Large ghost number */}
          <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", fontFamily: "monospace", fontSize: "18vw", color: "rgba(75,204,212,0.02)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
            PROCESS
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ marginBottom: 72, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end" }}
            >
              <div>
                <SectionLabel text="Our Process" light />
                <h2 style={{ color: C.white, fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 400, fontFamily: "'Cormorant Garamond', Georgia, serif", margin: 0, lineHeight: 1.1 }}>
                  Step by Step.<br />
                  <em style={{ color: C.teal }}>Nothing Hidden.</em>
                </h2>
              </div>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.85, margin: 0 }}>
                Click any step to expand the full scope of work. Every project follows this exact path — no shortcuts, no surprises.
              </p>
            </motion.div>

            {/* Two-column steps layout */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {steps.slice(0, 4).map((step, i) => (
                  <StepCard key={i} step={step} index={i} />
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {steps.slice(4).map((step, i) => (
                  <StepCard key={i + 4} step={step} index={i + 4} />
                ))}
              </div>
            </div>

            {/* Timeline strip */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ marginTop: 56, padding: "32px 40px", background: "rgba(75,204,212,0.04)", border: "1px solid rgba(75,204,212,0.12)" }}
            >
              <p style={{ color: "rgba(75,204,212,0.5)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 24 }}>
                Indicative Project Timeline
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 1 }}>
                {steps.map((s, i) => {
                  const heights = [15, 20, 18, 25, 55, 35, 100, 30];
                  return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <div style={{ width: "100%", height: 64, display: "flex", alignItems: "flex-end" }}>
                        <motion.div
                          initial={{ height: 0 }} whileInView={{ height: `${heights[i]}%` }}
                          viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          style={{ width: "100%", background: s.accent, opacity: 0.7 }}
                        />
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, fontFamily: "monospace", textAlign: "center", letterSpacing: "0.1em" }}>
                        {s.num}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 1, marginTop: 12 }}>
                {["1–2 wks", "1 wk", "1–2 wks", "1 wk", "4–16 wks", "2–8 wks", "4–24 mo", "2–4 wks"].map((t, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <span style={{ color: "rgba(75,204,212,0.5)", fontSize: 8, fontFamily: "monospace" }}>{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            COMPARISON TABLE
        ═══════════════════════════════════ */}
        <section style={{ background: C.navyMid, padding: "100px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, color: C.teal }}>
            <BlueprintGrid opacity={0.05} />
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ marginBottom: 56, textAlign: "center" }}
            >
              <SectionLabel text="Why ARCHORA" light />
              <h2 style={{ color: C.white, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 12 }}>
                ARCHORA vs. a General Architect
              </h2>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, maxWidth: 480, margin: "0 auto" }}>
                Healthcare infrastructure is not a specialisation you develop on the side. It is all we do.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ border: "1px solid rgba(75,204,212,0.15)", overflow: "hidden" }}
            >
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr", background: C.navy }}>
                <div style={{ padding: "18px 24px", borderRight: "1px solid rgba(75,204,212,0.1)" }}>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}>Criteria</span>
                </div>
                <div style={{ padding: "18px 24px", borderRight: "1px solid rgba(75,204,212,0.1)", textAlign: "center" }}>
                  <span style={{ color: "rgba(192,57,43,0.7)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" }}>General Architect</span>
                </div>
                <div style={{ padding: "18px 24px", textAlign: "center" }}>
                  <span style={{ color: C.teal, fontSize: 10, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" }}>ARCHORA</span>
                </div>
              </div>

              {comparison.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{
                    display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr",
                    borderTop: "1px solid rgba(75,204,212,0.06)",
                    background: i % 2 === 0 ? "rgba(75,204,212,0.015)" : "transparent",
                  }}
                >
                  <div style={{ padding: "16px 24px", borderRight: "1px solid rgba(75,204,212,0.08)" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{row.attr}</span>
                  </div>
                  <div style={{ padding: "16px 24px", borderRight: "1px solid rgba(75,204,212,0.08)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <span style={{ color: C.red, fontSize: 12 }}>✕</span>
                    <span style={{ color: "rgba(192,57,43,0.7)", fontSize: 12 }}>{row.general}</span>
                  </div>
                  <div style={{ padding: "16px 24px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <span style={{ color: C.teal, fontSize: 12 }}>✓</span>
                    <span style={{ color: "rgba(75,204,212,0.85)", fontSize: 12 }}>{row.archora}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            FOUNDER QUOTE
        ═══════════════════════════════════ */}
        <section style={{ background: C.cream, padding: "100px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 80px", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
                <MedicalCross size={32} color={C.blue} opacity={0.5} />
              </div>
              <blockquote style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
                color: C.navy, fontWeight: 400, fontStyle: "italic",
                lineHeight: 1.5, margin: "0 0 32px",
              }}>
                "In tier 2 and tier 3 cities across India, brilliant doctors with real vision are hiring general architects and paying for it twice — once for the wrong design and once for the retrofit. That gap is why ARCHORA exists. Healthcare infrastructure is not a specialisation you develop on the side. It is all we do — and that is exactly why our clients trust us with their life's work."
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{ width: 40, height: 1, background: C.blue, opacity: 0.4 }} />
                <span style={{ color: C.blue, fontSize: 11, fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Prasad Patil — Founder & CEO, ARCHORA
                </span>
                <div style={{ width: 40, height: 1, background: C.blue, opacity: 0.4 }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════ */}
        <section style={{ background: "#060f1e", padding: "120px 0", position: "relative", overflow: "hidden" }}>
          {[700, 500, 340].map((size, i) => (
            <motion.div key={size} aria-hidden="true"
              style={{
                position: "absolute", top: "50%", left: "50%",
                width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2,
                borderRadius: "50%", border: `1px solid rgba(75,204,212,${0.02 + i * 0.01})`, pointerEvents: "none",
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <div style={{ position: "absolute", inset: 0, color: C.teal }}>
            <BlueprintGrid opacity={0.04} />
          </div>

          <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 80px", textAlign: "center", position: "relative", zIndex: 10 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
            >
              <SectionLabel text="Ready to Start" light />
              <h2 style={{ color: C.white, fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", marginBottom: 20, fontWeight: 400, lineHeight: 1.1, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Your Hospital Project Deserves<br />
                <em style={{ color: C.teal }}>Specialists. Not Generalists.</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 48, lineHeight: 1.85, fontSize: 14, maxWidth: 480, margin: "0 auto 48px" }}>
                Whether you are starting from zero or at any stage of your healthcare project — ARCHORA is ready to help.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{
                  padding: "14px 32px", background: C.blue, color: C.white,
                  border: "none", fontSize: 10, letterSpacing: "0.18em",
                  textTransform: "uppercase", fontFamily: "monospace", cursor: "pointer",
                }}>Start Your Project Consultation →</button>
                <button style={{
                  padding: "14px 32px", background: "transparent",
                  color: "rgba(75,204,212,0.75)", border: "1px solid rgba(75,204,212,0.28)",
                  fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                  fontFamily: "monospace", cursor: "pointer",
                }}>Explore Our Services →</button>
                <button style={{
                  padding: "14px 32px", background: "transparent",
                  color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.18)",
                  fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                  fontFamily: "monospace", cursor: "pointer",
                }}>View Ongoing Projects →</button>
              </div>
              <p style={{ color: "rgba(255,255,255,0.18)", marginTop: 28, fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em" }}>
                No obligation · No sales pressure · Honest advice from healthcare infrastructure specialists
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}