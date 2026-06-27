import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";

// ─────────────────────────────────────────────────────────────────────────────
// SEO
// ─────────────────────────────────────────────────────────────────────────────
function SEOHead() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://archora.in/journal#blog",
    "name": "ARCHORA Journal, Healthcare Infrastructure Insights",
    "description": "Expert insights on hospital design, NABH compliance, modular OT design, hospital licensing, and healthcare infrastructure in India.",
    "url": "https://archora.in/journal",
    "publisher": {
      "@type": "Organization",
      "name": "ARCHORA Healthcare Infrastructure",
      "url": "https://archora.in"
    },
    "blogPost": [
      {
        "@type": "BlogPosting",
        "headline": "Healing by Design: How Hospital Architecture Directly Influences Patient Recovery",
        "url": "https://archora.in/journal/healing-by-design-how-architecture-influences-patient-recovery",
        "datePublished": "2025-06-27",
        "author": { "@type": "Organization", "name": "Team ARCHORA" },
        "keywords": "biophilic design, NABH, patient recovery, hospital architecture"
      },
      {
        "@type": "BlogPosting",
        "headline": "Hospital Licenses & Approvals in India: A Complete Design-to-Commissioning Guide (2025)",
        "url": "https://archora.in/journal/hospital-licenses-approvals-india-complete-guide",
        "datePublished": "2025-07-01",
        "author": { "@type": "Organization", "name": "Team ARCHORA" },
        "keywords": "NABH, hospital licensing India, building approvals, healthcare compliance"
      },
      {
        "@type": "BlogPosting",
        "headline": "Hospital Zoning & Circulation Planning: Designing for Safety, Hygiene, and Efficiency",
        "url": "https://archora.in/journal/hospital-zoning-circulation-planning-guide",
        "datePublished": "2025-07-04",
        "author": { "@type": "Organization", "name": "Team ARCHORA" },
        "keywords": "hospital zoning, infection control, NABH, circulation planning"
      },
      {
        "@type": "BlogPosting",
        "headline": "How to Design a Modular OT That Meets NABH Standards: Complete Guide (2025)",
        "url": "https://archora.in/journal/modular-ot-design-nabh-standards-guide",
        "datePublished": "2025-07-11",
        "author": { "@type": "Organization", "name": "Team ARCHORA" },
        "keywords": "modular OT, laminar airflow, NABH OT standards, HVAC"
      },
      {
        "@type": "BlogPosting",
        "headline": "Digitally Integrated OTs: What Modern Surgeons Expect & How to Design for It",
        "url": "https://archora.in/journal/digitally-integrated-ot-design-smart-operation-theatre",
        "datePublished": "2025-07-18",
        "author": { "@type": "Organization", "name": "Team ARCHORA" },
        "keywords": "smart OT, PACS integration, digital OT, NABH, MEP"
      },
      {
        "@type": "BlogPosting",
        "headline": "5 Common Mistakes in Hospital Layout Planning (And How to Avoid Them)",
        "url": "https://archora.in/journal/common-mistakes-hospital-layout-planning",
        "datePublished": "2025-07-22",
        "author": { "@type": "Organization", "name": "Team ARCHORA" },
        "keywords": "hospital planning, workflow design, NABH, emergency department, master planning"
      },
      {
        "@type": "BlogPosting",
        "headline": "Hospital Fire Safety Norms: NBC 2016, NABH Compliance & Evacuation Design Guide",
        "url": "https://archora.in/journal/hospital-fire-safety-norms-nbc-nabh-design-guide",
        "datePublished": "2025-07-26",
        "author": { "@type": "Organization", "name": "Team ARCHORA" },
        "keywords": "fire safety, NBC 2016, NABH, evacuation design, fire NOC"
      },
      {
        "@type": "BlogPosting",
        "headline": "Why Your Hospital Startup Timeline Will Double (And How ARCHORA Prevents It)",
        "url": "https://archora.in/journal/why-hospital-startup-timeline-doubles-how-archora-prevents-it",
        "datePublished": "2026-02-20",
        "author": { "@type": "Person", "name": "Prasad Patil" },
        "keywords": "hospital timeline, NABH-first design, turnkey delivery, project planning"
      }
    ]
  };

  return (
    <Helmet>
      <title>Journal, Healthcare Infrastructure Insights | ARCHORA</title>
      <meta name="description" content="Expert insights on hospital design, NABH compliance, modular OT design, hospital licensing, and healthcare infrastructure across India. Written by Team ARCHORA." />
      <meta name="keywords" content="hospital design India, NABH compliance, modular OT design, healthcare infrastructure, hospital licensing India, hospital zoning, biophilic design healthcare" />
      <link rel="canonical" href="https://archora.in/journal" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://archora.in/journal" />
      <meta property="og:title" content="ARCHORA Journal, Healthcare Infrastructure Insights" />
      <meta property="og:description" content="Expert insights on hospital design, NABH compliance, modular OT, and healthcare infrastructure in India." />
      <meta property="og:image" content="https://archora.in/og-image.jpg" />
      <meta property="og:locale" content="en_IN" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  navy:    "#041c2e",
  blue:    "#1b6ca8",
  teal:    "#4bccd4",
  cream:   "#f5f1eb",
  red:     "#c0392b",
  white:   "#ffffff",
  dark:    "#0a1628",
  ink:     "#0d2b40",
  mid:     "#2d4a5e",
  muted:   "#4a7a9b",
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE DATA
// ─────────────────────────────────────────────────────────────────────────────
export interface ArticleMeta {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  image: string;
}

export const articlesMeta: ArticleMeta[] = [
  {
    id: 1,
    slug: "healing-by-design-how-architecture-influences-patient-recovery",
    category: "Hospital Design",
    title: "Healing by Design: How Hospital Architecture Directly Influences Patient Recovery",
    excerpt: "Every corridor, window orientation, ceiling height, and material choice has a measurable impact on how quickly patients recover. The built environment is a silent but powerful caregiver.",
    date: "June 27, 2025",
    readTime: "7–8 min read",
    author: "Team ARCHORA",
    tags: ["Biophilic Design", "NABH", "Patient Recovery", "Acoustics", "HVAC"],
    image: "/images/journal/healing-by-design.jpg",
  },
  {
    id: 2,
    slug: "hospital-licenses-approvals-india-complete-guide",
    category: "Healthcare Compliance",
    title: "Hospital Licenses & Approvals in India: A Complete Design-to-Commissioning Guide (2025)",
    excerpt: "From Land Use Clearance to NABH accreditation, a practitioner's guide to every regulatory approval required, and how your design decisions directly determine how smoothly you move through each stage.",
    date: "July 1, 2025",
    readTime: "9–10 min read",
    author: "Team ARCHORA",
    tags: ["NABH", "Licensing", "Compliance", "Building Approval", "Biomedical Waste"],
    image: "/images/journal/hospital-licenses-approvals.jpg",
  },
  {
    id: 3,
    slug: "hospital-zoning-circulation-planning-guide",
    category: "Hospital Design",
    title: "Hospital Zoning & Circulation Planning: Designing for Safety, Hygiene, and Efficiency",
    excerpt: "Patients moving through the wrong corridors. Waste crossing clean zones. Sterile areas compromised by inadequate air pressure differentials. These are not hypothetical problems, they are the daily reality of hospitals designed without rigorous zoning strategy.",
    date: "July 4, 2025",
    readTime: "8–9 min read",
    author: "Team ARCHORA",
    tags: ["Zoning", "Infection Control", "NABH", "Circulation", "Spatial Planning"],
    image: "/images/journal/hospital-zoning-circulation.jpg",
  },
  {
    id: 4,
    slug: "modular-ot-design-nabh-standards-guide",
    category: "Modular OT",
    title: "How to Design a Modular OT That Meets NABH Standards: Complete Guide (2025)",
    excerpt: "The operating theatre is the most demanding space in any hospital. A well-designed modular OT makes doing the right thing easy, the right air pressure differentials, zoning, surface finishes, and MEP integration, all working invisibly.",
    date: "July 11, 2025",
    readTime: "9–10 min read",
    author: "Team ARCHORA",
    tags: ["Modular OT", "Laminar Airflow", "HVAC", "NABH", "MEP"],
    image: "/images/journal/modular-ot-design.jpg",
  },
  {
    id: 5,
    slug: "digitally-integrated-ot-design-smart-operation-theatre",
    category: "Modular OT",
    title: "Digitally Integrated OTs: What Modern Surgeons Expect & How to Design for It",
    excerpt: "Modern surgeons work within a digital ecosystem. An OT that cannot support real-time imaging, electronic records, smart environmental controls, and seamless communication is not just inconvenient, it is a clinical liability.",
    date: "July 18, 2025",
    readTime: "9–10 min read",
    author: "Team ARCHORA",
    tags: ["Smart OT", "PACS Integration", "Digital OT", "NABH", "MEP"],
    image: "/images/journal/digitally-integrated-ot.jpg",
  },
  {
    id: 6,
    slug: "common-mistakes-hospital-layout-planning",
    category: "Hospital Design",
    title: "5 Common Mistakes in Hospital Layout Planning (And How to Avoid Them)",
    excerpt: "Poor hospital layout planning costs money, delays commissioning, and endangers patients. These five mistakes appear consistently across projects of every scale, and every one of them is preventable at the design stage.",
    date: "July 22, 2025",
    readTime: "9–10 min read",
    author: "Team ARCHORA",
    tags: ["Hospital Planning", "Workflow Design", "NABH", "Emergency Department", "Master Planning"],
    image: "/images/journal/hospital-layout-mistakes.jpg",
  },
  {
    id: 7,
    slug: "hospital-fire-safety-norms-nbc-nabh-design-guide",
    category: "Healthcare Compliance",
    title: "Hospital Fire Safety Norms: NBC 2016, NABH Compliance & Evacuation Design Guide",
    excerpt: "Fire safety in hospitals is a life-safety obligation, not a checkbox. The design decisions made during planning (compartmentalisation, evacuation routes, suppression systems, materials) directly determine whether patients and staff survive a fire event.",
    date: "July 26, 2025",
    readTime: "10–11 min read",
    author: "Team ARCHORA",
    tags: ["Fire Safety", "NBC 2016", "NABH", "Evacuation Design", "Fire NOC"],
    image: "/images/journal/fire-safety-norms.jpg",
  },
  {
    id: 8,
    slug: "why-hospital-startup-timeline-doubles-how-archora-prevents-it",
    category: "Hospital Planning",
    title: "Why Your Hospital Startup Timeline Will Double (And How ARCHORA Prevents It)",
    excerpt: "Most hospital projects in India take 30+ months and blow their budget. The losses are avoidable, and they happen before a single wall is built, in the planning assumptions and sequencing choices made in the earliest weeks of the project.",
    date: "February 20, 2026",
    readTime: "10–11 min read",
    author: "Prasad Patil, Founder & CEO, ARCHORA",
    tags: ["Hospital Timeline", "NABH-First Design", "Turnkey Delivery", "Project Planning", "Single-Window"],
    image: "/images/journal/hospital-startup-timeline.jpg",
  },
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Hospital Design":       { bg: "rgba(27,108,168,0.1)",  text: "#1b6ca8", border: "rgba(27,108,168,0.2)" },
  "Healthcare Compliance": { bg: "rgba(26,107,60,0.1)",   text: "#1a6b3c", border: "rgba(26,107,60,0.2)" },
  "Modular OT":            { bg: "rgba(192,57,43,0.1)",   text: "#a0390d", border: "rgba(192,57,43,0.2)" },
  "Hospital Planning":     { bg: "rgba(74,26,110,0.1)",   text: "#4a1a6e", border: "rgba(74,26,110,0.2)" },
  "Trends":                { bg: "rgba(74,26,110,0.1)",   text: "#4a1a6e", border: "rgba(74,26,110,0.2)" },
};

const allCategories = ["All", ...Array.from(new Set(articlesMeta.map(a => a.category)))];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED DECORATIONS
// ─────────────────────────────────────────────────────────────────────────────
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
      <span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 13, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: light ? "rgba(75,204,212,0.7)" : C.blue }}>
        {text}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE CARD
// ─────────────────────────────────────────────────────────────────────────────
function ArticleCard({ article, featured = false, index = 0 }: { article: ArticleMeta; featured?: boolean; index?: number }) {
  const cat = categoryColors[article.category] ?? { bg: "rgba(27,108,168,0.1)", text: C.blue, border: "rgba(27,108,168,0.2)" };

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to={`/journal/${article.slug}`}
          style={{ textDecoration: "none", display: "block" }}
          aria-label={`Read article: ${article.title}`}
        >
          <div
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              border: "1px solid rgba(27,108,168,0.12)",
              overflow: "hidden", background: C.white,
              transition: "box-shadow 0.4s ease, transform 0.4s ease",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 24px 64px rgba(15,76,117,0.12)"; el.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
          >
            {/* Image */}
            <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/11" }}>
              <img
                src={article.image} alt={article.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease" }}
                loading="eager"
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(4,28,46,0.15) 0%, transparent 60%)" }} />
            </div>

            {/* Content */}
            <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(192,57,43,0.1)", color: C.red, border: "1px solid rgba(192,57,43,0.2)", padding: "4px 12px", fontSize: 12, fontFamily: "Calibri, Arial, sans-serif", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Featured
                </span>
                <span style={{ background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`, padding: "4px 12px", fontSize: 12, fontFamily: "Calibri, Arial, sans-serif", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  {article.category}
                </span>
              </div>

              <h2 style={{ color: C.ink, fontSize: "clamp(1.4rem, 2vw, 1.9rem)", fontFamily: "Calibri, Arial, sans-serif", fontWeight: 600, lineHeight: 1.2, marginBottom: 16 }}>
                {article.title}
              </h2>

              <p style={{ color: C.mid, fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                {article.excerpt}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                <span style={{ color: C.muted, fontSize: 13, fontFamily: "Calibri, Arial, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                  <Calendar size={13} /> {article.date}
                </span>
                <span style={{ color: C.muted, fontSize: 13, fontFamily: "Calibri, Arial, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                  <Clock size={13} /> {article.readTime}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.blue, fontSize: 13, fontFamily: "Calibri, Arial, sans-serif", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                <span>Read Article</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Standard card
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/journal/${article.slug}`}
        style={{ textDecoration: "none", display: "block", height: "100%" }}
        aria-label={`Read article: ${article.title}`}
      >
        <div
          style={{
            border: "1px solid rgba(27,108,168,0.1)", overflow: "hidden",
            background: C.white, height: "100%", display: "flex", flexDirection: "column",
            transition: "box-shadow 0.35s ease, transform 0.35s ease",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 16px 48px rgba(15,76,117,0.1)"; el.style.transform = "translateY(-5px)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
        >
          {/* Image */}
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10", flexShrink: 0 }}>
            <img
              src={article.image} alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease", display: "block" }}
              loading="lazy"
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            {/* Category on image */}
            <div style={{ position: "absolute", top: 14, left: 14 }}>
              <span style={{ background: "rgba(4,28,46,0.8)", color: C.teal, fontSize: 12, fontFamily: "Calibri, Arial, sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 10px", backdropFilter: "blur(6px)" }}>
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
              <span style={{ color: C.muted, fontSize: 13, fontFamily: "Calibri, Arial, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                <Calendar size={12} /> {article.date}
              </span>
              <span style={{ color: C.muted, fontSize: 13, fontFamily: "Calibri, Arial, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                <Clock size={12} /> {article.readTime}
              </span>
            </div>

            <h3 style={{ color: C.ink, fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", fontFamily: "Calibri, Arial, sans-serif", fontWeight: 600, lineHeight: 1.25, marginBottom: 12, flex: 1 }}>
              {article.title}
            </h3>

            <p style={{ color: C.mid, fontSize: 15, lineHeight: 1.75, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {article.excerpt}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {article.tags.slice(0, 3).map(tag => (
                <span key={tag} style={{ background: "rgba(15,76,117,0.06)", color: C.muted, border: "1px solid rgba(15,76,117,0.12)", padding: "3px 8px", fontSize: 12, fontFamily: "Calibri, Arial, sans-serif", letterSpacing: "0.08em" }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.blue, fontSize: 13, fontFamily: "Calibri, Arial, sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", borderTop: "1px solid rgba(27,108,168,0.1)", paddingTop: 16, marginTop: "auto" }}>
              <span>Read Article</span>
              <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function Journal() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe() {
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  }

  const filtered = activeCategory === "All"
    ? articlesMeta
    : articlesMeta.filter(a => a.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const fadeUp = {
    initial: { opacity: 0, y: 48 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <>
      <SEOHead />

      <div style={{ fontFamily: "Calibri, Arial, sans-serif", overflowX: "hidden", background: "#f8fbfe" }}>
        <style>{`
          @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        `}</style>

        {/* ── HERO ── */}
        <section style={{ position: "relative", height: "52vh", minHeight: 380, overflow: "hidden" }}>
          <img
            src="/images/hero/journal-hero.jpg"
            alt="ARCHORA Healthcare Infrastructure Journal"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
            fetchPriority="high"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(4,28,46,0.6) 0%, rgba(4,28,46,0.36) 60%, rgba(4,28,46,0.14) 100%)" }} />

          <div style={{ position: "relative", height: "100%", maxWidth: 1280, margin: "0 auto", padding: "60px 80px 0", display: "flex", alignItems: "center", zIndex: 10 }}>
            <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ color: "rgba(255,255,255,0.90)", fontSize: 15, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", fontFamily: "Calibri, Arial, sans-serif" }}>
                  Healthcare Infrastructure Partner
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(2.6rem, 4.5vw, 4.4rem)", color: C.white, fontFamily: "Calibri, Arial, sans-serif", fontWeight: 600, lineHeight: 1.06, marginBottom: 16, letterSpacing: "-0.01em" }}>
                The ARCHORA Journal
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, lineHeight: 1.75, maxWidth: 500, fontFamily: "Calibri, Arial, sans-serif" }}>
                Insights on hospital design, NABH compliance, modular OT infrastructure, and healthcare architecture in India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CATEGORY FILTER ── */}
        <div style={{ background: C.white, borderBottom: "1px solid rgba(27,108,168,0.1)", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
            <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "16px 20px", fontSize: 13, fontFamily: "Calibri, Arial, sans-serif", letterSpacing: "0.18em",
                    textTransform: "uppercase", border: "none", cursor: "pointer",
                    background: "transparent", whiteSpace: "nowrap",
                    color: activeCategory === cat ? C.blue : C.muted,
                    borderBottom: activeCategory === cat ? `2px solid ${C.blue}` : "2px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── ARTICLE GRID ── */}
        <section style={{ padding: "80px 0 100px", position: "relative" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                {/* Article count */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
                  <div>
                    <SectionLabel text="Latest Articles" />
                    <p style={{ color: C.muted, fontSize: 14, fontFamily: "Calibri, Arial, sans-serif", margin: 0 }}>
                      {filtered.length} article{filtered.length !== 1 ? "s" : ""}{activeCategory !== "All" ? ` in ${activeCategory}` : ""}
                    </p>
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "80px 0", color: C.muted }}>
                    <p style={{ fontSize: 18, fontFamily: "Calibri, Arial, sans-serif" }}>No articles in this category yet.</p>
                  </div>
                ) : (
                  <>
                    {/* Featured first article */}
                    {featured && (
                      <div style={{ marginBottom: 48 }}>
                        <ArticleCard article={featured} featured />
                      </div>
                    )}

                    {/* Remaining articles, 3-column grid */}
                    {rest.length > 0 && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                        {rest.map((article, i) => (
                          <ArticleCard key={article.id} article={article} index={i} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </section>

        {/* ── NEWSLETTER CTA ── */}
        <section style={{ background: C.dark, padding: "100px 0", position: "relative", overflow: "hidden" }}>
          {[500, 360].map((size, i) => (
            <div
              key={size} aria-hidden="true"
              style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: "50%", border: `1px solid rgba(75,204,212,${0.03 + i * 0.01})`, pointerEvents: "none", willChange: "transform", animation: `${i % 2 === 0 ? "spinCW" : "spinCCW"} ${60 + i * 15}s linear infinite` }}
            />
          ))}

          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 80px", textAlign: "center", position: "relative", zIndex: 10 }}>
            <motion.div {...fadeUp}>
              <SectionLabel text="Stay Informed" light />
              <h2 style={{ color: C.white, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontFamily: "Calibri, Arial, sans-serif", fontWeight: 400, lineHeight: 1.1, marginBottom: 16 }}>
                Healthcare Infrastructure<br />
                <em style={{ color: C.teal, fontStyle: "italic" }}>Insights in Your Inbox</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.58)", fontSize: 16, lineHeight: 1.85, marginBottom: 40 }}>
                Subscribe for expert articles on hospital design, NABH compliance, modular OT infrastructure, and more, written by practicing healthcare infrastructure specialists.
              </p>
              <div style={{ display: "flex", gap: 0, maxWidth: 460, margin: "0 auto" }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleSubscribe(); }}
                  placeholder="your@email.com"
                  aria-label="Email address for newsletter"
                  style={{
                    flex: 1, padding: "13px 18px", background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(75,204,212,0.2)", borderRight: "none",
                    color: C.white, fontFamily: "Calibri, Arial, sans-serif", fontSize: 15,
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  style={{
                    padding: "13px 24px", background: C.blue, color: C.white,
                    border: "none", fontSize: 13, letterSpacing: "0.16em",
                    textTransform: "uppercase", fontFamily: "Calibri, Arial, sans-serif", cursor: "pointer",
                    whiteSpace: "nowrap", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.teal; (e.currentTarget as HTMLButtonElement).style.color = C.navy; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.blue; (e.currentTarget as HTMLButtonElement).style.color = C.white; }}
                >
                  Subscribe
                </button>
              </div>
              <p style={{ color: subscribed ? C.teal : "rgba(255,255,255,0.28)", marginTop: 16, fontSize: 13, fontFamily: "Calibri, Arial, sans-serif" }}>
                {subscribed ? "Thanks! You're subscribed." : "No spam. Unsubscribe anytime."}
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Re-export
// ─────────────────────────────────────────────────────────────────────────────
export { JournalPost as BlogPost } from "./JournalPost";