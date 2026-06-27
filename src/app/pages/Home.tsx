import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";

const WHATSAPP_URL = "https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project.";

const FONT = "Calibri, Arial, sans-serif";

// ─────────────────────────────────────────────
// DESIGN TOKENS
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
// SEO COMPONENT
// ─────────────────────────────────────────────
function SEOHead() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://archora.in/#organization",
        "name": "ARCHORA",
        "url": "https://archora.in",
        "logo": "https://archora.in/logo.png",
        "description": "India's dedicated healthcare infrastructure partner, hospital design, construction, modular OT & ICU, NABH-compliant architecture, and turnkey delivery across India.",
        "areaServed": "IN",
        "knowsAbout": [
          "Hospital Architecture",
          "Healthcare Infrastructure",
          "NABH Compliance",
          "Modular OT Design",
          "ICU Infrastructure",
          "Medical Equipment Planning",
          "Hospital Construction",
          "MEP Engineering"
        ],
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": "https://archora.in/#website",
        "url": "https://archora.in",
        "name": "ARCHORA, Healthcare Architecture Partner",
        "publisher": { "@id": "https://archora.in/#organization" }
      },
      {
        "@type": "WebPage",
        "@id": "https://archora.in/#webpage",
        "url": "https://archora.in",
        "name": "ARCHORA, Healthcare Architecture Partner",
        "description": "ARCHORA is a healthcare architecture firm designing NABH-compliant hospitals, clinics, OTs, ICUs, and labs across India, from planning to installation.",
        "isPartOf": { "@id": "https://archora.in/#website" },
        "about": { "@id": "https://archora.in/#organization" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://archora.in" }]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://archora.in/#localbusiness",
        "name": "ARCHORA Healthcare Infrastructure",
        "description": "Full-service healthcare infrastructure firm, hospital architecture, MEP engineering, modular OT & ICU, NABH compliance, turnkey delivery across India.",
        "url": "https://archora.in",
        "priceRange": "₹₹₹",
        "areaServed": [
          { "@type": "Country", "name": "India" }
        ],
        "serviceType": [
          "Hospital Design and Architecture",
          "Healthcare Construction",
          "Modular OT Infrastructure",
          "ICU Design",
          "NABH Compliance Consulting",
          "Medical Equipment Planning",
          "MEP Engineering for Healthcare",
          "Hospital Project Management"
        ]
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>ARCHORA, Healthcare Architecture Partner</title>
      <meta name="description" content="ARCHORA is a healthcare architecture firm designing NABH-compliant hospitals, clinics, OTs, ICUs, and labs across India, from planning to installation." />
      <meta name="keywords" content="hospital design India, healthcare infrastructure, NABH compliant hospital, modular OT design, hospital construction India, ICU infrastructure, medical college design, turnkey hospital, hospital architecture India, MEP engineering healthcare" />
      <link rel="canonical" href="https://archora.in" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://archora.in" />
      <meta property="og:title" content="ARCHORA, Healthcare Architecture Partner" />
      <meta property="og:description" content="ARCHORA is a healthcare architecture firm designing NABH-compliant hospitals, clinics, OTs, ICUs, and labs across India, from planning to installation." />
      <meta property="og:image" content="https://archora.in/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="ARCHORA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ARCHORA, Healthcare Architecture Partner" />
      <meta name="twitter:description" content="ARCHORA is a healthcare architecture firm designing NABH-compliant hospitals, clinics, OTs, ICUs, and labs across India, from planning to installation." />
      <meta name="twitter:image" content="https://archora.in/og-image.jpg" />

      {/* Geo & Language */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-IN" />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
    </Helmet>
  );
}

// ─────────────────────────────────────────────
// SHARED SVG DECORATIONS
// ─────────────────────────────────────────────
function MedicalCross({ size = 20, color = C.red, opacity = 0.85 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="6.5" y="1" width="7" height="18" rx="1.5" fill={color} opacity={opacity} />
      <rect x="1" y="6.5" width="18" height="7" rx="1.5" fill={color} opacity={opacity} />
    </svg>
  );
}

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(ease * to));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setCount(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const heroSlides = [
  {
    src: "/images/hero/hero-slide-1.jpg",
    label: "01, Architecture",
    tag: "India's Dedicated Partner",
    headline: "India's Dedicated Healthcare Infrastructure Partner",
    sub: "We design, build, and deliver hospitals, clinics, modular OTs, ICUs, laboratories, and medical colleges across India, under one roof.",
  },
  {
    src: "/images/hero/hero-slide-2.jpg",
    label: "02, Compliance",
    tag: "NABH From Day One",
    headline: "NABH-Compliant Design. From Day One.",
    sub: "No retrofitting. No last-minute corrections. Every standard integrated from the very first drawing.",
  },
  {
    src: "/images/hero/hero-slide-3.jpg",
    label: "03, Delivery",
    tag: "Single Accountability",
    headline: "One Team. One Contract. Full Accountability.",
    sub: "From concept to commissioning, ARCHORA takes complete responsibility so you don't manage 15 vendors alone.",
  },
  {
    src: "/images/hero/hero-slide-4.jpg",
    label: "04, Innovation",
    tag: "Global Standards",
    headline: "Global Standards. Pan-India Delivery.",
    sub: "NHS-level healthcare infrastructure expertise meets India-specific clinical realities, in every project we deliver.",
  },
];

const services = [
  { num: "01", slug: "feasibility-studies", title: "Feasibility Studies & DPRs", desc: "Data-backed project planning before you commit capital. Site assessment, demand analysis, bed capacity planning, and cost estimation." },
  { num: "02", slug: "healthcare-architecture", title: "Healthcare Architecture & Space Planning", desc: "Compliance-integrated architectural design for hospitals, clinics, diagnostic centres, and medical colleges." },
  { num: "03", slug: "regulatory-compliance", title: "Regulatory Compliance & Accreditation-Ready Design", desc: "NABH, NABL, INC, NMC, AERB, PCPNDT, NBC, and fire safety standards integrated into every design from day one." },
  { num: "04", slug: "hospital-licensing", title: "Hospital Licensing & Approvals Support", desc: "Expert navigation of all statutory licences and approvals required to open and operate a healthcare facility in India." },
  { num: "05", slug: "structural-design", title: "Structural Design for Healthcare", desc: "Healthcare-specific structural engineering for heavy equipment loads, seismic compliance, and clinical environments." },
  { num: "06", slug: "mep-engineering", title: "MEP Engineering for Healthcare", desc: "Hospital-grade HVAC, medical gas pipeline systems, electrical, plumbing, fire safety, and building management." },
  { num: "07", slug: "modular-ot-icu", title: "Modular OT & ICU Infrastructure", desc: "Design, supply, and installation of modular operating theatres and ICUs with laminar airflow and cleanroom standards." },
  { num: "08", slug: null, title: "Turnkey Civil & Interior Execution", desc: "Complete healthcare construction and interior fit-out through a single point of accountability." },
  { num: "09", slug: null, title: "Medical Equipment Planning & Procurement", desc: "Department-wise planning, budget optimisation, vendor evaluation, procurement support, and installation coordination." },
  { num: "10", slug: null, title: "Project Management & Commissioning", desc: "End-to-end project management from planning through to commissioning and handover: protecting your timeline." },
];

const metrics = [
  { val: 20, suffix: "+", label: "Years Collective Experience" },
  { val: 100, suffix: "%", label: "Healthcare Projects Only" },
  { val: 10, suffix: "", label: "Core Service Disciplines" },
  { val: 35, suffix: "+", label: "Facility Type Specialisations" },
];

// ─────────────────────────────────────────────
// ANIMATION PRESETS
// ─────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

// ─────────────────────────────────────────────
// SECTION LABEL
// ─────────────────────────────────────────────
function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
      <span style={{ width: 28, height: 1, background: light ? "rgba(75,204,212,0.6)" : C.blue, display: "block" }} />
      <span style={{
        fontFamily: FONT,
        fontSize: 29,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: light ? "rgba(75,204,212,0.7)" : C.blue,
      }}>{text}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function Home() {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setHeroIndex(idx);
  }, []);
  const next = useCallback(() => goTo((heroIndex + 1) % heroSlides.length, 1), [heroIndex, goTo]);
  const prev = useCallback(() => goTo((heroIndex - 1 + heroSlides.length) % heroSlides.length, -1), [heroIndex, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 7000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);

  return (
    <>
      <SEOHead />

      <div style={{ fontFamily: FONT, overflowX: "hidden", background: C.cream }}>

        {/* ══════════════════════════════════════════
            HERO, IMMERSIVE CAROUSEL
        ══════════════════════════════════════════ */}
        <section ref={heroRef} aria-label="Hero" style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden" }}>

          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={heroIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", inset: 0 }}
            >
              <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
                <img
                  src={heroSlides[heroIndex].src}
                  alt={heroSlides[heroIndex].headline}
                  style={{ width: "100%", height: "110%", objectFit: "cover", objectPosition: "center" }}
                  fetchPriority="high"
                />
              </motion.div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(4,28,46,0.6) 0%, rgba(4,28,46,0.34) 50%, rgba(4,28,46,0.08) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,28,46,0.38) 0%, transparent 45%)" }} />
            </motion.div>
          </AnimatePresence>

          {/* Left nav dots */}
          <div style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, zIndex: 20 }}>
            <div style={{ width: 1, height: 80, background: "rgba(255,255,255,0.12)" }} />
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > heroIndex ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: 6, height: 6, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
                  background: i === heroIndex ? C.teal : "rgba(255,255,255,0.25)",
                  transform: i === heroIndex ? "scale(1.5)" : "scale(1)",
                  transition: "all 0.3s",
                }}
              />
            ))}
            <div style={{ width: 1, height: 80, background: "rgba(255,255,255,0.12)" }} />
          </div>

          {/* Slide label top right */}
          <div style={{ position: "absolute", top: 88, right: 32, zIndex: 20 }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={heroIndex}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35 }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.92)", fontFamily: FONT,
                  border: "1px solid rgba(255,255,255,0.15)", padding: "6px 14px",
                  backdropFilter: "blur(8px)",
                }}
              >
                {heroSlides[heroIndex].label}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Main hero content */}
          <div style={{ position: "relative", height: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 80px", display: "flex", alignItems: "center", zIndex: 10 }}>
            <div style={{ maxWidth: 680 }}>
              <motion.div
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              >
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, fontFamily: FONT }}>0{heroIndex + 1}</span>
                <div style={{ position: "relative", height: 1, width: 60, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                  <motion.div
                    key={heroIndex}
                    style={{ position: "absolute", inset: 0, background: C.teal, transformOrigin: "left" }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                </div>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14, fontFamily: FONT }}>0{heroSlides.length}</span>
              </motion.div>

              <motion.div
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span style={{ color: "rgba(255,255,255,0.90)", fontSize: 15, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", fontFamily: FONT }}>
                  Healthcare Infrastructure Partner
                </span>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.h1
                  key={heroIndex}
                  initial={{ opacity: 0, y: 36, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontSize: "clamp(2.6rem, 4.5vw, 4.4rem)", color: C.white,
                    marginBottom: 24, lineHeight: 1.06,
                    fontFamily: FONT, fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {heroSlides[heroIndex].headline}
                </motion.h1>
              </AnimatePresence>

              <motion.p
                key={`sub-${heroIndex}`}
                style={{ fontSize: 18, color: "#ffffff", marginBottom: 44, lineHeight: 1.75, maxWidth: 520, fontFamily: FONT, fontWeight: 400 }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
              >
                {heroSlides[heroIndex].sub}
              </motion.p>

              <motion.div
                style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.58 }}
              >
                <HeroBtn primary onClick={() => navigate("/contact")}>Book a Free Consultation</HeroBtn>
                <HeroBtn onClick={() => navigate("/services")}>Explore Our Services</HeroBtn>
              </motion.div>

              <motion.p
                style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", fontFamily: FONT }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              >
                No obligation · No sales pressure · Honest expert advice
              </motion.p>
            </div>
          </div>

          {/* Bottom carousel controls */}
          <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 12, zIndex: 20 }}>
            <NavBtn onClick={prev} aria-label="Previous slide">‹</NavBtn>
            <div style={{ display: "flex", gap: 6 }} role="tablist" aria-label="Slide navigation">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === heroIndex}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goTo(i, i > heroIndex ? 1 : -1)}
                  style={{
                    height: 2, border: "none", cursor: "pointer", padding: 0,
                    width: i === heroIndex ? 44 : 18,
                    background: i === heroIndex ? C.teal : "rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
            <NavBtn onClick={next} aria-label="Next slide">›</NavBtn>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MARQUEE TICKER
        ══════════════════════════════════════════ */}
        <div
          aria-hidden="true"
          style={{ background: C.navy, padding: "13px 0", overflow: "hidden", borderBottom: `1px solid rgba(75,204,212,0.12)`, position: "relative" }}
        >
          <motion.div
            style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {Array(6).fill(["Hospital Planning", "Modular OT Design", "ICU Infrastructure", "NABH Compliance", "MEP Engineering", "Turnkey Delivery", "Medical Equipment Planning", "Pan India Projects"]).flat().map((item, i) => (
              <span key={i} style={{
                color: "rgba(75,204,212,0.45)", fontSize: 13, letterSpacing: "0.26em",
                textTransform: "uppercase", fontFamily: FONT,
                paddingRight: 48, display: "inline-flex", alignItems: "center", gap: 48,
              }}>
                {item}
                <span style={{ color: "rgba(75,204,212,0.18)", fontSize: 11 }}>◆</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            PROBLEM SECTION
        ══════════════════════════════════════════ */}
        <section aria-labelledby="problem-heading" style={{ background: C.navy, padding: "120px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>

              <motion.div {...fadeUp}>
                <SectionLabel text="The Problem We Solve" light  />
                <h2 id="problem-heading" style={{ color: C.white, fontSize: "clamp(2.1rem, 3.6vw, 3.4rem)", lineHeight: 1.12, marginBottom: 32, fontWeight: 400, fontFamily: FONT }}>
                  Most Healthcare Facilities in India Are Built by the Wrong Team
                </h2>

                {[
                  "Building a hospital is not the same as building a commercial space. Clinical workflows, infection control, regulatory compliance, patient safety, and 24×7 operational demands make healthcare construction one of the most specialised disciplines in the built environment.",
                  "Yet most hospitals in India are designed by general architects, built by general contractors, and coordinated by promoters left managing 15 different vendors on their own.",
                ].map((text, i) => (
                  <p key={i} style={{ color: "rgba(255,255,255,0.95)", lineHeight: 1.85, marginBottom: 18, fontSize: 17, fontWeight: 400, fontFamily: FONT }}>{text}</p>
                ))}

                <div style={{ borderLeft: `3px solid ${C.red}`, paddingLeft: 20, marginBottom: 32, marginTop: 28 }}>
                  <p style={{ color: "rgba(192,57,43,0.85)", lineHeight: 1.8, fontStyle: "italic", margin: 0, fontSize: 17, fontWeight: 400, fontFamily: FONT }}>
                    Facilities that fail NABH audits. Departments that don't function as clinicians need. Projects that run over budget and time.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: "rgba(75,204,212,0.06)", border: "1px solid rgba(75,204,212,0.15)" }}>
                  <MedicalCross size={22} color={C.teal} opacity={0.7} />
                  <p style={{ color: C.teal, fontStyle: "italic", fontSize: 18, margin: 0, opacity: 0.85, fontWeight: 400, fontFamily: FONT }}>ARCHORA was founded to change that.</p>
                </div>
              </motion.div>

              {/* Blueprint illustration */}
              <motion.div
                initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ position: "relative", border: `1px solid rgba(75,204,212,0.15)`, padding: 32, background: "rgba(75,204,212,0.02)" }}>
                  <div style={{ position: "absolute", top: -1, left: -1, width: 40, height: 40, borderLeft: `2px solid ${C.teal}`, borderTop: `2px solid ${C.teal}`, opacity: 0.5 }} />
                  <div style={{ position: "absolute", bottom: -1, right: -1, width: 40, height: 40, borderRight: `2px solid ${C.teal}`, borderBottom: `2px solid ${C.teal}`, opacity: 0.5 }} />
                  <svg viewBox="0 0 440 380" style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg" aria-label="Hospital schematic floor plan">
                    <line x1="20" y1="340" x2="420" y2="340" stroke="#4bccd4" strokeWidth="1" opacity="0.35" />
                    <rect x="80" y="110" width="280" height="230" fill="none" stroke="#4bccd4" strokeWidth="1.5" opacity="0.6" />
                    <rect x="160" y="60" width="120" height="55" fill="none" stroke="#4bccd4" strokeWidth="1" opacity="0.5" />
                    {[0,1,2,3].map(row => [0,1,2,3,4].map(col => (
                      <rect key={`${row}-${col}`} x={96+col*48} y={126+row*46} width="28" height="24"
                        fill="none" stroke="#4bccd4" strokeWidth="0.7" opacity={0.25 + (row+col) % 3 * 0.06} />
                    )))}
                    <rect x="196" y="298" width="48" height="42" fill="none" stroke="#4bccd4" strokeWidth="1.2" opacity="0.75" />
                    <line x1="220" y1="298" x2="220" y2="340" stroke="#4bccd4" strokeWidth="0.6" opacity="0.4" />
                    <rect x="210" y="72" width="20" height="7" rx="1.5" fill={C.red} opacity="0.85" />
                    <rect x="214" y="68" width="12" height="15" rx="1.5" fill={C.red} opacity="0.85" />
                    <line x1="55" y1="110" x2="55" y2="340" stroke="#4bccd4" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
                    <line x1="49" y1="110" x2="61" y2="110" stroke="#4bccd4" strokeWidth="0.5" opacity="0.3" />
                    <line x1="49" y1="340" x2="61" y2="340" stroke="#4bccd4" strokeWidth="0.5" opacity="0.3" />
                    {([
                      [130, 42, "OT Block"], [220, 42, "ICU / HDU"], [310, 42, "Admin"],
                      [130, 88, "Emergency"], [220, 88, "Radiology"], [310, 88, "Pharmacy"],
                    ] as [number, number, string][]).map(([x, y, t], i) => (
                      <text key={i} x={x} y={y} textAnchor="middle" fill="#4bccd4" fontSize="7" fontFamily="Calibri, Arial, sans-serif" opacity="0.45">{t}</text>
                    ))}
                    <rect x="310" y="125" width="74" height="22" rx="2" fill="none" stroke="#4bccd4" strokeWidth="0.8" opacity="0.5" />
                    <text x="347" y="140" textAnchor="middle" fill="#4bccd4" fontSize="7.5" fontFamily="Calibri, Arial, sans-serif" opacity="0.65">NABH READY</text>
                    <circle cx="42" cy="308" r="16" fill="none" stroke="#4bccd4" strokeWidth="0.6" opacity="0.25" />
                    <line x1="42" y1="323" x2="42" y2="340" stroke="#4bccd4" strokeWidth="0.8" opacity="0.25" />
                    <circle cx="398" cy="308" r="16" fill="none" stroke="#4bccd4" strokeWidth="0.6" opacity="0.25" />
                    <line x1="398" y1="323" x2="398" y2="340" stroke="#4bccd4" strokeWidth="0.8" opacity="0.25" />
                  </svg>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                    <span style={{ color: "rgba(75,204,212,0.35)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: FONT }}>
                      Schematic Floor Plan, Archora Standard
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WHO WE ARE
        ══════════════════════════════════════════ */}
        <section aria-labelledby="whoweare-heading" style={{ background: C.cream, padding: "120px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>
              <motion.div
                initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel text="Who We Are" />
                <h2 id="whoweare-heading" style={{ color: C.navy, fontSize: "clamp(2.1rem, 3.6vw, 3.4rem)", lineHeight: 1.12, marginBottom: 28, fontWeight: 400, fontFamily: FONT }}>
                  A Team That Works Exclusively in Healthcare Infrastructure
                </h2>
                <p style={{ color: "#111111", lineHeight: 1.85, marginBottom: 18, fontSize: 17, fontWeight: 400, fontFamily: FONT }}>
                  ARCHORA is not a general architecture or construction firm that also takes healthcare projects. Every architect, every engineer, and every project manager works exclusively on healthcare facilities.
                </p>
                <p style={{ color: "#111111", lineHeight: 1.85, marginBottom: 36, fontSize: 17, fontWeight: 400, fontFamily: FONT }}>
                  This focus means we understand the compliance standards, the clinical workflows, the infection control requirements, and the operational realities that make healthcare infrastructure different from every other building type.
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 22px", background: C.navy, marginBottom: 40 }}>
                  <div style={{ width: 2, height: 36, background: C.teal, flexShrink: 0 }} />
                  <p style={{ color: C.teal, fontSize: 18, fontStyle: "italic", margin: 0, opacity: 0.9, lineHeight: 1.5, fontWeight: 400, fontFamily: FONT }}>
                    One team. One point of accountability. From concept to commissioning.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
                  {[["20+", "Years Collective Experience"], ["Pan India", "Delivery"], ["NHS-Level", "UK Expertise"]].map(([val, lbl]) => (
                    <div key={lbl} style={{ borderTop: `2px solid ${C.blue}`, paddingTop: 14 }}>
                      <div style={{ fontSize: 24, color: C.navy, fontFamily: FONT, marginBottom: 6, lineHeight: 1, fontWeight: 400 }}>{val}</div>
                      <p style={{ fontSize: 13, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.14em", lineHeight: 1.5, margin: 0, fontWeight: 400, fontFamily: FONT }}>{lbl}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                style={{ position: "relative" }}
                initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ position: "absolute", top: -16, left: -16, right: 16, bottom: 16, border: `1px solid rgba(27,108,168,0.2)` }} />
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src="/images/about/team-at-work.jpg"
                    alt="ARCHORA healthcare infrastructure team at work"
                    style={{ width: "100%", height: 500, objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,28,46,0.4) 0%, transparent 60%)" }} />
                </div>
                {[
                  { top: -1, left: -1, borderLeft: `2px solid ${C.blue}`, borderTop: `2px solid ${C.blue}` },
                  { bottom: -1, right: -1, borderRight: `2px solid ${C.blue}`, borderBottom: `2px solid ${C.blue}` },
                ].map((style, i) => (
                  <div key={i} style={{ position: "absolute", width: 44, height: 44, ...style }} />
                ))}
                <div style={{ position: "absolute", bottom: 24, left: 24, background: C.navy, padding: "12px 18px", borderLeft: `3px solid ${C.red}` }}>
                  <p style={{ color: C.white, fontSize: 16, margin: 0, fontFamily: FONT, fontWeight: 400 }}>Healthcare Only. Always.</p>
                  <p style={{ color: "rgba(255,255,255,0.90)", fontSize: 13, margin: "4px 0 0", fontFamily: FONT, letterSpacing: "0.1em", fontWeight: 400 }}>Nothing outside infrastructure.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            METRICS STRIP
        ══════════════════════════════════════════ */}
        <div style={{ background: C.blue, padding: "56px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ textAlign: "center", padding: "0 32px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.18)" : "none" }}
              >
                <div style={{ fontSize: 48, color: C.white, fontFamily: FONT, lineHeight: 1, marginBottom: 10, fontWeight: 400 }}>
                  <AnimatedCounter to={m.val} suffix={m.suffix} />
                </div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.18em", lineHeight: 1.5, margin: 0, fontFamily: FONT, fontWeight: 400 }}>
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SERVICES
        ══════════════════════════════════════════ */}
        <section aria-labelledby="services-heading" style={{ background: "#0a1628", padding: "120px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
            <motion.div style={{ marginBottom: 72, textAlign: "center" }} {...fadeUp}>
              <SectionLabel text="What We Do" light />
              <h2 id="services-heading" style={{ color: C.white, fontSize: "clamp(2.1rem, 3.6vw, 3.4rem)", fontWeight: 400, fontFamily: FONT, margin: "0 auto 16px" }}>
                Everything You Need to Design, Build & Deliver
              </h2>
              <p style={{ color: "rgba(255,255,255,0.90)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75, fontSize: 17, fontWeight: 400, fontFamily: FONT }}>
                ARCHORA provides the complete range of healthcare infrastructure services under one roof.
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "rgba(75,204,212,0.06)" }}>
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(s.slug ? `/services/${s.slug}` : "/services")}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") navigate(s.slug ? `/services/${s.slug}` : "/services"); }}
                  style={{ background: "#0a1628", padding: "36px 36px", cursor: "pointer", transition: "background 0.35s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#0d1f38"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "#0a1628"; }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 32, paddingTop: 2 }}>
                      <span style={{ color: "rgba(75,204,212,0.35)", fontSize: 13, fontFamily: FONT, letterSpacing: "0.05em" }}>{s.num}</span>
                      <div style={{ width: 1, height: 32, background: "rgba(75,204,212,0.15)" }} />
                    </div>
                    <div>
                      <h3 style={{ color: C.white, fontSize: 28, marginBottom: 12, fontFamily: FONT, fontWeight: 700, lineHeight: 1.3 }}>{s.title}</h3>
                      <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 17, lineHeight: 1.75, margin: 0, fontWeight: 400, fontFamily: FONT }}>{s.desc}</p>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.teal, fontSize: 13, marginTop: 16, letterSpacing: "0.16em", fontFamily: FONT, opacity: 0.75 }}>
                        Learn More <span>→</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════ */}
        <section aria-labelledby="cta-heading" style={{ background: "#060f1e", padding: "140px 0", position: "relative", overflow: "hidden" }}>
          {[800, 600, 420, 280].map((size, i) => (
            <motion.div
              key={size}
              aria-hidden="true"
              style={{
                position: "absolute", top: "50%", left: "50%",
                width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2,
                borderRadius: "50%", border: `1px solid rgba(75,204,212,${0.02 + i * 0.01})`, pointerEvents: "none",
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}

          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 80px", textAlign: "center", position: "relative", zIndex: 10 }}>
            <motion.div {...fadeUp}>
              <SectionLabel text="Get In Touch" light />

              <h2 id="cta-heading" style={{ color: C.white, fontSize: "clamp(2.4rem, 5vw, 4.2rem)", marginBottom: 24, fontWeight: 400, lineHeight: 1.1, fontFamily: FONT }}>
                Planning a Healthcare Facility?<br />
                <em style={{ color: C.teal, fontStyle: "italic" }}>Let's Talk.</em>
              </h2>

              <p style={{ color: "rgba(255,255,255,0.42)", marginBottom: 52, lineHeight: 1.85, maxWidth: 520, margin: "0 auto 52px", fontSize: 18, fontWeight: 400, fontFamily: FONT }}>
                Whether you are starting from zero or need expert support at any stage, ARCHORA is ready to help you design, build, and deliver infrastructure that works.
              </p>

              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <HeroBtn primary onClick={() => navigate("/contact")}>Book a Free Consultation</HeroBtn>
                <HeroBtn onClick={() => window.open(WHATSAPP_URL, "_blank")}>WhatsApp Us</HeroBtn>
                <HeroBtn onClick={() => navigate("/contact")}>Send an Enquiry →</HeroBtn>
              </div>

              <p style={{ color: "rgba(255,255,255,0.2)", marginTop: 28, fontSize: 14, fontFamily: FONT, letterSpacing: "0.1em", fontWeight: 400 }}>
                No obligation · No sales pressure · Honest advice from healthcare infrastructure specialists
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
function HeroBtn({ children, primary, style: extraStyle, onClick }: { children: React.ReactNode; primary?: boolean; style?: React.CSSProperties; onClick?: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "14px 32px", fontSize: 14, letterSpacing: "0.18em",
        textTransform: "uppercase", cursor: "pointer", fontFamily: FONT,
        border: "none", transition: "all 0.25s ease",
        ...(primary ? {
          background: hover ? "#4bccd4" : "#1b6ca8",
          color: hover ? "#041c2e" : "#ffffff",
        } : {
          background: hover ? "rgba(255,255,255,0.12)" : "transparent",
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.35)",
        }),
        ...extraStyle,
      }}
    >
      {children}
    </button>
  );
}

function NavBtn({ onClick, children, "aria-label": ariaLabel }: { onClick: () => void; children: React.ReactNode; "aria-label"?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 40, height: 40, border: "1px solid rgba(255,255,255,0.2)",
        background: "transparent", color: "rgba(255,255,255,0.55)",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)", fontSize: 22, transition: "all 0.2s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(75,204,212,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#4bccd4"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; }}
    >
      {children}
    </button>
  );
}