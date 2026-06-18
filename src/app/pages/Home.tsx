import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { Helmet } from "react-helmet";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";

const WHATSAPP_URL = "https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project.";


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
        "name": "ARCHORA, Healthcare Infrastructure Partner",
        "publisher": { "@id": "https://archora.in/#organization" }
      },
      {
        "@type": "WebPage",
        "@id": "https://archora.in/#webpage",
        "url": "https://archora.in",
        "name": "ARCHORA, India's Dedicated Healthcare Infrastructure Partner",
        "description": "ARCHORA designs, builds, and delivers hospitals, clinics, modular OTs, ICUs, laboratories, and medical colleges across India under one roof. NABH-compliant from day one.",
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
      <title>ARCHORA, India's Dedicated Healthcare Infrastructure Partner</title>
      <meta name="description" content="ARCHORA designs, builds, and delivers hospitals, clinics, modular OTs, ICUs, laboratories, and medical colleges across India, NABH-compliant from day one, under one roof." />
      <meta name="keywords" content="hospital design India, healthcare infrastructure, NABH compliant hospital, modular OT design, hospital construction India, ICU infrastructure, medical college design, turnkey hospital, hospital architecture India, MEP engineering healthcare" />
      <link rel="canonical" href="https://archora.in" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://archora.in" />
      <meta property="og:title" content="ARCHORA, India's Dedicated Healthcare Infrastructure Partner" />
      <meta property="og:description" content="We design, build, and deliver hospitals, clinics, modular OTs, ICUs, and medical colleges across India. NABH-compliant architecture. Full turnkey. One team." />
      <meta property="og:image" content="https://archora.in/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="ARCHORA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ARCHORA, India's Dedicated Healthcare Infrastructure Partner" />
      <meta name="twitter:description" content="Hospital design, construction, modular OT & ICU, NABH compliance, delivered under one roof across India." />
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
function BlueprintGrid({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="bp-sm" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0L0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
        <pattern id="bp-lg" width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill="url(#bp-sm)" />
          <path d="M120 0L0 0 0 120" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-lg)" opacity={opacity} />
    </svg>
  );
}

function Crosshair({ size = 48, spin = true }: { size?: number; spin?: boolean }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 48 48" fill="none"
      animate={spin ? { rotate: 360 } : {}}
      transition={spin ? { duration: 50, repeat: Infinity, ease: "linear" } : {}}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="9" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" />
      <line x1="24" y1="0" x2="24" y2="13" stroke="currentColor" strokeWidth="1" />
      <line x1="24" y1="35" x2="24" y2="48" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="24" x2="13" y2="24" stroke="currentColor" strokeWidth="1" />
      <line x1="35" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.4" />
    </motion.svg>
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
  { num: "01", title: "Feasibility Studies & DPRs", desc: "Data-backed project planning before you commit capital. Site assessment, demand analysis, bed capacity planning, and cost estimation.", icon: "📊" },
  { num: "02", title: "Healthcare Architecture & Space Planning", desc: "Compliance-integrated architectural design for hospitals, clinics, diagnostic centres, and medical colleges.", icon: "🏛️" },
  { num: "03", title: "Regulatory Compliance & Accreditation-Ready Design", desc: "NABH, NABL, INC, NMC, AERB, PCPNDT, NBC, and fire safety standards integrated into every design from day one.", icon: "✅" },
  { num: "04", title: "Hospital Licensing & Approvals Support", desc: "Expert navigation of all statutory licences and approvals required to open and operate a healthcare facility in India.", icon: "📋" },
  { num: "05", title: "Structural Design for Healthcare", desc: "Healthcare-specific structural engineering for heavy equipment loads, seismic compliance, and clinical environments.", icon: "🏗️" },
  { num: "06", title: "MEP Engineering for Healthcare", desc: "Hospital-grade HVAC, medical gas pipeline systems, electrical, plumbing, fire safety, and building management.", icon: "⚙️" },
  { num: "07", title: "Modular OT & ICU Infrastructure", desc: "Design, supply, and installation of modular operating theatres and ICUs with laminar airflow and cleanroom standards.", icon: "🔬" },
  { num: "08", title: "Turnkey Civil & Interior Execution", desc: "Complete healthcare construction and interior fit-out through a single point of accountability.", icon: "🔑" },
  { num: "09", title: "Medical Equipment Planning & Procurement", desc: "Department-wise planning, budget optimisation, vendor evaluation, procurement support, and installation coordination.", icon: "🩺" },
  { num: "10", title: "Project Management & Commissioning", desc: "End-to-end project management from planning through to commissioning and handover: protecting your timeline.", icon: "🗂️" },
];

const pillars = [
  {
    num: "01",
    title: "Healthcare Only. Always.",
    desc: "We do not design offices, residences, or commercial spaces. Healthcare infrastructure is all we do, our knowledge, processes, and vendor relationships are entirely built around one outcome.",
    stat: "100%",
    statLabel: "Healthcare Focus",
  },
  {
    num: "02",
    title: "Compliance Built In. Not Bolted On.",
    desc: "NABH, NABL, INC, NMC, AERB, fire safety, part of our design process from day one, not an afterthought discovered during inspection.",
    stat: "Zero",
    statLabel: "Retrofits Needed",
  },
  {
    num: "03",
    title: "Single-Window Accountability.",
    desc: "One team, one contract, one point of accountability, from architecture and engineering through construction, equipment, and commissioning.",
    stat: "1",
    statLabel: "Point of Contact",
  },
  {
    num: "04",
    title: "Global Standards. India-Wide Delivery.",
    desc: "NHS-level hospital planning expertise meets India-specific clinical realities. International best practices, delivered in every corner of the country.",
    stat: "NHS",
    statLabel: "Standard Expertise",
  },
];

const audiences = [
  { icon: "🩺", label: "Doctors & Clinicians", desc: "Planning your first clinic, nursing home, or hospital? Infrastructure that matches your clinical vision, ready to operate from day one." },
  { icon: "🏥", label: "Hospital Owners & Chains", desc: "Expanding an existing facility or building a new branch? Brownfield upgrades and greenfield projects with the same depth of expertise." },
  { icon: "💼", label: "Healthcare Investors", desc: "Feasibility studies, DPRs, and turnkey delivery that protect your capital and your timeline, before and after you commit." },
  { icon: "🎓", label: "Medical & Nursing Colleges", desc: "Building or expanding a campus? ARCHORA designs and delivers INC and NMC-compliant educational and clinical infrastructure." },
  { icon: "🔬", label: "Diagnostic Centres & Labs", desc: "NABL-compliant spaces with the right technical infrastructure for every department and imaging modality." },
  { icon: "🤝", label: "Healthcare Consultants", desc: "The infrastructure partner your clients need. We work collaboratively with consultants and advisors across India." },
];

// ─── UPDATED PROJECTS DATA (real ongoing projects from PDF) ───
type Project = {
  id: string;
  name: string;
  location: string;
  type: string;
  image: string;
  status: string;
  statusColor: string;
  details: Record<string, string>;
  description: string;
  scopeItems: string[];
};

const projects: Project[] = [
  {
    id: "suresh-matre",
    name: "Suresh Matre Multispecialty Hospital",
    location: "Mankoli, Mumbai, Maharashtra",
    type: "300-bed · Full Turnkey",
    image: "/images/projects/suresh-matre-hospital.jpg",
    status: "Design Phase, In Progress",
    statusColor: "#f59e0b",
    details: {
      "Capacity": "300 Beds",
      "Area": "2,00,000 Sq Ft",
      "Project Value": "₹150 Crore+",
      "Location": "Mankoli, Mumbai, Maharashtra",
      "Key Department": "Oncology and Multispecialty",
      "Scope": "Full Turnkey",
      "Commissioned By": "Shri Suresh Matre, MP, 18th Lok Sabha",
    },
    description:
      "A landmark charitable multispecialty hospital commissioned by MP Shri Suresh Matre, one of the most significant healthcare infrastructure projects currently underway in Maharashtra. ARCHORA is delivering the complete turnkey scope, from master planning and clinical space design through to oncology department planning and final commissioning.",
    scopeItems: [
      "Master Planning and Clinical Space Planning",
      "Architecture and Structural Design",
      "MEP Engineering, Medical Gas, HVAC, Fire Suppression",
      "Modular OT and ICU Infrastructure",
      "Oncology Department Planning",
      "NABH-Compliant Design Framework",
      "Interior Design and Execution",
      "Medical Equipment Planning and Procurement",
      "End-to-End Project Management and Commissioning",
    ],
  },
  {
    id: "binar-mp",
    name: "Multispecialty Hospital",
    location: "Binar, Madhya Pradesh",
    type: "110-bed · Architecture & Design",
    image: "/images/projects/binar-mp-hospital.jpg",
    status: "Design Phase, In Progress",
    statusColor: "#f59e0b",
    details: {
      "Facility Type": "Multispecialty Hospital",
      "Capacity": "110 Beds",
      "Area": "60,000 Sq Ft",
      "Location": "Binar, Madhya Pradesh",
      "Scope": "Architecture and Clinical Space Design",
    },
    description:
      "A growing multispecialty hospital serving central India, designed for clinical efficiency, future scalability, and regulatory compliance from day one. ARCHORA is providing full architectural and clinical space design for this 110-bed facility.",
    scopeItems: [
      "Architecture and Clinical Space Design",
      "NABH-Compliant Design Framework",
      "Structural Engineering",
      "Future Scalability Planning",
    ],
  },
  {
    id: "jogeshwari-redevelopment",
    name: "Multispecialty Hospital Redevelopment",
    location: "Jogeshwari, Mumbai, Maharashtra",
    type: "20–25 Beds · Full Redevelopment",
    image: "/images/projects/jogeshwari-redevelopment.jpg",
    status: "Design Phase, In Progress",
    statusColor: "#f59e0b",
    details: {
      "Facility Type": "Multispecialty Hospital, Full Redevelopment",
      "Capacity": "20 to 25 Beds",
      "Location": "Jogeshwari, Mumbai, Maharashtra",
      "Scope": "Full Turnkey, Design and Execution",
    },
    description:
      "An existing facility acquired by a healthcare investor, completely reimagined and rebuilt as a modern multispecialty hospital. ARCHORA is delivering full turnkey, from ground zero to operational hospital.",
    scopeItems: [
      "Full Architectural Redesign",
      "Clinical Workflow Optimisation",
      "Structural and MEP Engineering",
      "Interior Design and Execution",
      "NABH-Compliant Design Framework",
      "Turnkey Execution and Commissioning",
    ],
  },
  {
    id: "chembur-conversion",
    name: "Commercial Suite Conversion",
    location: "Chembur, Mumbai, Maharashtra",
    type: "Floor Renovation · NABH Compliant",
    image: "/images/projects/chembur-conversion.jpg",
    status: "Design and Execution, In Progress",
    statusColor: "#f59e0b",
    details: {
      "Facility Type": "Charitable Hospital, Floor Renovation",
      "Location": "Chembur, Mumbai, Maharashtra",
      "Work Type": "5th Floor → Commercial Suites & Private Rooms",
      "Scope": "NABH-Compliant Redesign and Execution",
    },
    description:
      "A smart infrastructure upgrade, converting an underutilised hospital floor into revenue-generating private suites and single rooms, fully compliant with NABH standards. A model for how existing healthcare facilities can unlock new revenue streams through intelligent space redesign.",
    scopeItems: [
      "Clinical Space Reprogramming",
      "NABH-Compliant Redesign",
      "Interior Design and Fit-Out",
      "MEP Upgrades",
      "Project Execution and Commissioning",
    ],
  },
];

const team = [
  { name: "Prasad Patil", role: "Founder & CEO", initial: "PP", color: "#1b6ca8" },
  { name: "Ar. Vivek Patil", role: "Director & Principal Architect", initial: "VP", color: "#0f4a75" },
  { name: "Aditya Kashikar", role: "Senior Advisor, Healthcare Infrastructure", initial: "AK", color: "#0a2e47" },
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
        fontFamily: "monospace",
        fontSize: 13,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: light ? "rgba(75,204,212,0.7)" : C.blue,
      }}>{text}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECT MODAL
// ─────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            role="button"
            aria-label="Close project details"
            style={{
              position: "fixed", inset: 0, background: "rgba(4,28,46,0.88)",
              zIndex: 9999, backdropFilter: "blur(6px)", cursor: "pointer",
            }}
          />

          {/* Modal panel */}
          <motion.div
  role="dialog"
  aria-modal="true"
  aria-label={`${project.name} project details`}
  initial={{ opacity: 0, y: 60, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 40, scale: 0.96 }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  style={{
    position: "fixed",
    top: "5vh",
    left: 0,
    right: 0,
    margin: "0 auto",
    width: "min(860px, 94vw)",
    maxHeight: "90vh",
    background: "#0a1628",
    border: "1px solid rgba(75,204,212,0.15)",
    zIndex: 10000,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  }}
>
            {/* Hero image */}
            <div style={{ position: "relative", height: 260, flexShrink: 0, overflow: "hidden" }}>
              <img
                src={project.image} alt={`${project.name}, ${project.location}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.25) 60%)" }} />

              {/* Corner brackets */}
              <div style={{ position: "absolute", top: 16, left: 16, width: 32, height: 32, borderLeft: "2px solid rgba(75,204,212,0.5)", borderTop: "2px solid rgba(75,204,212,0.5)" }} />

              {/* Status badge */}
              <div style={{
                position: "absolute", top: 16, right: 56,
                background: "rgba(10,22,40,0.85)", border: "1px solid rgba(75,204,212,0.2)",
                padding: "5px 12px", display: "flex", alignItems: "center", gap: 6,
                backdropFilter: "blur(8px)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.statusColor, flexShrink: 0, display: "inline-block" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.14em" }}>
                  {project.status}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: "absolute", top: 14, right: 14,
                  width: 36, height: 36, border: "1px solid rgba(75,204,212,0.3)",
                  background: "rgba(10,22,40,0.8)", color: "rgba(255,255,255,0.6)",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, lineHeight: 1, backdropFilter: "blur(4px)", transition: "all 0.2s",
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = "#4bccd4"; b.style.borderColor = "rgba(75,204,212,0.6)"; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = "rgba(255,255,255,0.6)"; b.style.borderColor = "rgba(75,204,212,0.3)"; }}
              >×</button>

              {/* Title */}
              <div style={{ position: "absolute", bottom: 22, left: 28, right: 28 }}>
                <p style={{ color: "rgba(75,204,212,0.65)", fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", fontFamily: "monospace", margin: "0 0 7px" , fontWeight: 600 }}>
                  {project.location}
                </p>
                <h2 style={{
                  color: "#ffffff", fontSize: 27,
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  fontWeight: 400, margin: 0, lineHeight: 1.15,
                }}>
                  {project.name}
                </h2>
              </div>
            </div>

            {/* Scrollable body */}
            <div style={{ overflowY: "auto", padding: "28px 32px 36px", flex: 1 }}>

              {/* Description */}
              <p style={{ color: "rgba(255,255,255,0.95)", fontSize: 19, lineHeight: 1.85, margin: "0 0 30px" , fontWeight: 600 }}>
                {project.description}
              </p>

              {/* Two-column: Details + Scope */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>

                {/* Project details table */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 20, height: 1, background: "rgba(75,204,212,0.5)" }} />
                    <span style={{ color: "rgba(75,204,212,0.6)", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", fontFamily: "monospace" }}>
                      Project Details
                    </span>
                  </div>
                  <div style={{ border: "1px solid rgba(75,204,212,0.1)" }}>
                    {Object.entries(project.details).map(([key, val], i, arr) => (
                      <div
                        key={key}
                        style={{
                          display: "grid", gridTemplateColumns: "1fr 1.4fr",
                          borderBottom: i < arr.length - 1 ? "1px solid rgba(75,204,212,0.08)" : "none",
                          padding: "10px 14px",
                        }}
                      >
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "monospace", letterSpacing: "0.04em" }}>{key}</span>
                        <span style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.5 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope of work */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 20, height: 1, background: "rgba(75,204,212,0.5)" }} />
                    <span style={{ color: "rgba(75,204,212,0.6)", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", fontFamily: "monospace" }}>
                      Scope of Work
                    </span>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                    {project.scopeItems.map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ color: C.red, fontSize: 12, marginTop: 3, flexShrink: 0 }}>✦</span>
                        <span style={{ color: "rgba(255,255,255,0.95)", fontSize: 17, lineHeight: 1.65 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer CTAs */}
              <div style={{ marginTop: 30, paddingTop: 22, borderTop: "1px solid rgba(75,204,212,0.1)", display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button onClick={() => { onClose(); navigate("/contact"); }} style={{
                  padding: "12px 28px", background: C.blue, color: C.white,
                  border: "none", fontSize: 13, letterSpacing: "0.18em",
                  textTransform: "uppercase", fontFamily: "monospace", cursor: "pointer", transition: "background 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = C.navy; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.blue; (e.currentTarget as HTMLButtonElement).style.color = C.white; }}
                >
                  Discuss a Similar Project
                </button>
                <button onClick={() => { onClose(); navigate("/services"); }} style={{
                  padding: "12px 28px", background: "transparent",
                  color: "rgba(75,204,212,0.75)", border: "1px solid rgba(75,204,212,0.28)",
                  fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase",
                  fontFamily: "monospace", cursor: "pointer",
                }}>
                  Explore Our Services →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function Home() {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
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

      <div style={{ fontFamily: "'Georgia', serif", overflowX: "hidden", background: C.cream }}>

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

          <div style={{ position: "absolute", inset: 0, color: C.teal, pointerEvents: "none" }}>
            <BlueprintGrid opacity={0.07} />
          </div>

          <div style={{ position: "absolute", top: "14%", right: "8%", color: C.teal, opacity: 0.2 }}>
            <Crosshair size={90} />
          </div>
          <div style={{ position: "absolute", bottom: "20%", right: "16%", color: C.teal, opacity: 0.12 }}>
            <Crosshair size={52} spin={false} />
          </div>
          <motion.div
            style={{ position: "absolute", top: "40%", right: "35%", color: C.teal, opacity: 0.07 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            <Crosshair size={160} spin={false} />
          </motion.div>

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
                  color: "rgba(255,255,255,0.92)", fontFamily: "monospace",
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
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, fontFamily: "monospace" }}>0{heroIndex + 1}</span>
                <div style={{ position: "relative", height: 1, width: 60, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                  <motion.div
                    key={heroIndex}
                    style={{ position: "absolute", inset: 0, background: C.teal, transformOrigin: "left" }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                </div>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14, fontFamily: "monospace" }}>0{heroSlides.length}</span>
              </motion.div>

              <motion.div
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span style={{ color: "rgba(255,255,255,0.90)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", fontFamily: "monospace" }}>
                  Healthcare Infrastructure
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
                    fontSize: "clamp(2.4rem, 4.8vw, 4rem)", color: C.white,
                    marginBottom: 24, lineHeight: 1.06,
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {heroSlides[heroIndex].headline}
                </motion.h1>
              </AnimatePresence>

              <motion.p
                key={`sub-${heroIndex}`}
                style={{ fontSize: 19, color: "#ffffff", marginBottom: 44, lineHeight: 1.75, maxWidth: 520, fontFamily: "'DM Sans', sans-serif" }}
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
                style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", fontFamily: "monospace" }}
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
                textTransform: "uppercase", fontFamily: "monospace",
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
          <div style={{ position: "absolute", inset: 0, color: C.teal, pointerEvents: "none" }}>
            <BlueprintGrid opacity={0.05} />
          </div>
          <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", fontFamily: "monospace", fontSize: "22vw", color: "rgba(75,204,212,0.025)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
            01
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>

              <motion.div {...fadeUp}>
                <SectionLabel text="The Problem We Solve" light />
                <h2 id="problem-heading" style={{ color: C.white, fontSize: "clamp(1.9rem, 3.2vw, 3rem)", lineHeight: 1.12, marginBottom: 32, fontWeight: 400, fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                  Most Healthcare Facilities in India Are Built by the Wrong Team
                </h2>

                {[
                  "Building a hospital is not the same as building a commercial space. Clinical workflows, infection control, regulatory compliance, patient safety, and 24×7 operational demands make healthcare construction one of the most specialised disciplines in the built environment.",
                  "Yet most hospitals in India are designed by general architects, built by general contractors, and coordinated by promoters left managing 15 different vendors on their own.",
                ].map((text, i) => (
                  <p key={i} style={{ color: "rgba(255,255,255,0.95)", lineHeight: 1.85, marginBottom: 18, fontSize: 19 }}>{text}</p>
                ))}

                <div style={{ borderLeft: `3px solid ${C.red}`, paddingLeft: 20, marginBottom: 32, marginTop: 28 }}>
                  <p style={{ color: "rgba(192,57,43,0.85)", lineHeight: 1.8, fontStyle: "italic", margin: 0, fontSize: 19 , fontWeight: 600 }}>
                    Facilities that fail NABH audits. Departments that don't function as clinicians need. Projects that run over budget and time.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: "rgba(75,204,212,0.06)", border: "1px solid rgba(75,204,212,0.15)" }}>
                  <MedicalCross size={22} color={C.teal} opacity={0.7} />
                  <p style={{ color: C.teal, fontStyle: "italic", fontSize: 20, margin: 0, opacity: 0.85 , fontWeight: 600 }}>ARCHORA was founded to change that.</p>
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
                      <text key={i} x={x} y={y} textAnchor="middle" fill="#4bccd4" fontSize="7" fontFamily="monospace" opacity="0.45">{t}</text>
                    ))}
                    <rect x="310" y="125" width="74" height="22" rx="2" fill="none" stroke="#4bccd4" strokeWidth="0.8" opacity="0.5" />
                    <text x="347" y="140" textAnchor="middle" fill="#4bccd4" fontSize="7.5" fontFamily="monospace" opacity="0.65">NABH READY</text>
                    <circle cx="42" cy="308" r="16" fill="none" stroke="#4bccd4" strokeWidth="0.6" opacity="0.25" />
                    <line x1="42" y1="323" x2="42" y2="340" stroke="#4bccd4" strokeWidth="0.8" opacity="0.25" />
                    <circle cx="398" cy="308" r="16" fill="none" stroke="#4bccd4" strokeWidth="0.6" opacity="0.25" />
                    <line x1="398" y1="323" x2="398" y2="340" stroke="#4bccd4" strokeWidth="0.8" opacity="0.25" />
                  </svg>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                    <span style={{ color: "rgba(75,204,212,0.35)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "monospace" }}>
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
                <h2 id="whoweare-heading" style={{ color: C.navy, fontSize: "clamp(1.9rem, 3.2vw, 3rem)", lineHeight: 1.12, marginBottom: 28, fontWeight: 400, fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                  A Team That Works Exclusively in Healthcare Infrastructure
                </h2>
                <p style={{ color: "#111111", lineHeight: 1.85, marginBottom: 18, fontSize: 19, fontWeight: 600 }}>
                  ARCHORA is not a general architecture or construction firm that also takes healthcare projects. Every architect, every engineer, and every project manager works exclusively on healthcare facilities.
                </p>
                <p style={{ color: "#111111", lineHeight: 1.85, marginBottom: 36, fontSize: 19, fontWeight: 600 }}>
                  This focus means we understand the compliance standards, the clinical workflows, the infection control requirements, and the operational realities that make healthcare infrastructure different from every other building type.
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 22px", background: C.navy, marginBottom: 40 }}>
                  <div style={{ width: 2, height: 36, background: C.teal, flexShrink: 0 }} />
                  <p style={{ color: C.teal, fontSize: 20, fontStyle: "italic", margin: 0, opacity: 0.9, lineHeight: 1.5 , fontWeight: 600 }}>
                    One team. One point of accountability. From concept to commissioning.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
                  {[["20+", "Years Collective Experience"], ["Pan India", "Delivery"], ["NHS-Level", "UK Expertise"]].map(([val, lbl]) => (
                    <div key={lbl} style={{ borderTop: `2px solid ${C.blue}`, paddingTop: 14 }}>
                      <div style={{ fontSize: 22, color: C.navy, fontFamily: "'Cormorant Garamond', 'Georgia', serif", marginBottom: 6, lineHeight: 1 }}>{val}</div>
                      <p style={{ fontSize: 13, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.14em", lineHeight: 1.5, margin: 0 , fontWeight: 600 }}>{lbl}</p>
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
                  <p style={{ color: C.white, fontSize: 17, margin: 0, fontFamily: "monospace" , fontWeight: 600 }}>Healthcare Only. Always.</p>
                  <p style={{ color: "rgba(255,255,255,0.90)", fontSize: 13, margin: "4px 0 0", fontFamily: "monospace", letterSpacing: "0.1em" , fontWeight: 600 }}>Nothing outside infrastructure.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            METRICS STRIP
        ══════════════════════════════════════════ */}
        <div style={{ background: C.blue, padding: "56px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <BlueprintGrid opacity={0.07} />
          </div>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ textAlign: "center", padding: "0 32px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.18)" : "none" }}
              >
                <div style={{ fontSize: 48, color: C.white, fontFamily: "'Cormorant Garamond', 'Georgia', serif", lineHeight: 1, marginBottom: 10 }}>
                  <AnimatedCounter to={m.val} suffix={m.suffix} />
                </div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.18em", lineHeight: 1.5, margin: 0, fontFamily: "monospace" , fontWeight: 600 }}>
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
          <div style={{ position: "absolute", inset: 0, color: C.teal, pointerEvents: "none" }}>
            <BlueprintGrid opacity={0.04} />
          </div>
          <div style={{ position: "absolute", left: -30, top: "50%", transform: "translateY(-50%)", fontFamily: "monospace", fontSize: "20vw", color: "rgba(75,204,212,0.02)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
            02
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
            <motion.div style={{ marginBottom: 72, textAlign: "center" }} {...fadeUp}>
              <SectionLabel text="What We Do" light />
              <h2 id="services-heading" style={{ color: C.white, fontSize: "clamp(1.9rem, 3.2vw, 3rem)", fontWeight: 400, fontFamily: "'Cormorant Garamond', 'Georgia', serif", margin: "0 auto 16px" }}>
                Everything You Need to Design, Build & Deliver
              </h2>
              <p style={{ color: "rgba(255,255,255,0.90)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75, fontSize: 19 , fontWeight: 600 }}>
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
                  style={{ background: "#0a1628", padding: "36px 36px", cursor: "default", transition: "background 0.35s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#0d1f38"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "#0a1628"; }}
                >
                  <span style={{ position: "absolute", right: 20, top: 12, color: "rgba(75,204,212,0.04)", fontFamily: "monospace", fontSize: 56, lineHeight: 1, pointerEvents: "none" }} aria-hidden="true">{s.num}</span>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 32, paddingTop: 2 }}>
                      <span style={{ color: "rgba(75,204,212,0.35)", fontSize: 13, fontFamily: "monospace", letterSpacing: "0.05em" }}>{s.num}</span>
                      <div style={{ width: 1, height: 32, background: "rgba(75,204,212,0.15)" }} />
                    </div>
                    <div>
                      <h3 style={{ color: C.white, fontSize: 20, marginBottom: 10, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, lineHeight: 1.3 }}>{s.title}</h3>
                      <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 20, lineHeight: 1.75, margin: 0 , fontWeight: 600 }}>{s.desc}</p>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.teal, fontSize: 13, marginTop: 16, letterSpacing: "0.16em", fontFamily: "monospace", opacity: 0.75 }}>
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
            WHY ARCHORA
        ══════════════════════════════════════════ */}
        <section aria-labelledby="why-heading" style={{ background: C.creamAlt, padding: "120px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", fontFamily: "monospace", fontSize: "20vw", color: "rgba(27,108,168,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
            03
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
            <motion.div style={{ marginBottom: 72 }} {...fadeUp}>
              <SectionLabel text="Why ARCHORA" />
              <h2 id="why-heading" style={{ color: C.navy, fontSize: "clamp(1.9rem, 3.2vw, 3rem)", fontWeight: 400, fontFamily: "'Cormorant Garamond', 'Georgia', serif", maxWidth: 640 }}>
                Why Healthcare Promoters Across India Choose ARCHORA
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  style={{ background: C.white, padding: "44px 44px", position: "relative", overflow: "hidden", cursor: "default", transition: "transform 0.4s ease, box-shadow 0.4s ease", borderTop: `3px solid ${C.blue}` }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 60px rgba(15,74,117,0.1)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
                >
                  <span style={{ position: "absolute", right: 24, top: 16, color: "rgba(27,108,168,0.05)", fontFamily: "monospace", fontSize: 72, lineHeight: 1 }} aria-hidden="true">{p.num}</span>
                  <div style={{ display: "inline-flex", alignItems: "baseline", gap: 6, marginBottom: 28 }}>
                    <span style={{ fontSize: 30, color: C.blue, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400 }}>{p.stat}</span>
                    <span style={{ fontSize: 12, color: C.blue, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace", opacity: 0.6 }}>{p.statLabel}</span>
                  </div>
                  <h3 style={{ color: C.navy, fontSize: 20, marginBottom: 14, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, lineHeight: 1.25 }}>{p.title}</h3>
                  <p style={{ color: "#111111", fontSize: 20, lineHeight: 1.8, margin: 0 , fontWeight: 600 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WHO WE SERVE
        ══════════════════════════════════════════ */}
        <section aria-labelledby="serve-heading" style={{ background: C.white, padding: "120px 0", position: "relative" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
            <motion.div style={{ marginBottom: 72, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end" }} {...fadeUp}>
              <div>
                <SectionLabel text="Who We Work With" />
                <h2 id="serve-heading" style={{ color: C.navy, fontSize: "clamp(1.9rem, 3.2vw, 3rem)", fontWeight: 400, fontFamily: "'Cormorant Garamond', 'Georgia', serif", margin: 0 }}>
                  Who We Serve
                </h2>
              </div>
              <p style={{ color: "#1a1a1a", lineHeight: 1.8, fontSize: 19, margin: 0 , fontWeight: 600 }}>
                Whether you are starting from scratch or need specialist expertise at a specific stage, ARCHORA brings the same depth of healthcare infrastructure knowledge to every client.
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "rgba(27,108,168,0.06)" }}>
              {audiences.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  style={{ background: C.white, padding: "36px 32px", transition: "all 0.3s", cursor: "default" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "#f0f7ff"; el.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = C.white; el.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 18, lineHeight: 1 }} aria-hidden="true">{a.icon}</div>
                  <h3 style={{ color: C.navy, fontSize: 20, marginBottom: 10, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400 }}>{a.label}</h3>
                  <p style={{ color: "#1a1a1a", fontSize: 20, lineHeight: 1.75, margin: 0 , fontWeight: 600 }}>{a.desc}</p>
                  <div style={{ marginTop: 20, height: 1, background: "rgba(27,108,168,0.12)" }} />
                  <span style={{ display: "inline-block", marginTop: 14, color: C.blue, fontSize: 13, letterSpacing: "0.16em", fontFamily: "monospace", opacity: 0.7 }}>Learn More →</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROJECTS, ONGOING PORTFOLIO
        ══════════════════════════════════════════ */}
        <section aria-labelledby="projects-heading" style={{ background: C.cream, padding: "120px 0", position: "relative" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>

            <motion.div style={{ marginBottom: 72, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }} {...fadeUp}>
              <div>
                <SectionLabel text="Ongoing Portfolio" />
                <h2 id="projects-heading" style={{ color: C.navy, fontSize: "clamp(1.9rem, 3.2vw, 3rem)", fontWeight: 400, fontFamily: "'Cormorant Garamond', 'Georgia', serif", margin: 0 }}>
                  Healthcare Infrastructure<br />Projects Across India
                </h2>
              </div>
              <OutlineBtn dark onClick={() => navigate("/facilities")}>View All Projects →</OutlineBtn>
            </motion.div>

            {/* Featured hero project, Suresh Matre */}
            <motion.article
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              onClick={() => setActiveProject(projects[0])}
              aria-label={`View details: ${projects[0].name}`}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setActiveProject(projects[0]); }}
              style={{ position: "relative", overflow: "hidden", cursor: "pointer", height: 460, marginBottom: 16, outline: "none" }}
              onMouseEnter={e => { const img = (e.currentTarget as HTMLElement).querySelector("img")!; img.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { const img = (e.currentTarget as HTMLElement).querySelector("img")!; img.style.transform = "scale(1)"; }}
            >
              <img
                src={projects[0].image}
                alt={`${projects[0].name}, ${projects[0].location}, ${projects[0].type}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", transition: "transform 0.8s ease", display: "block" }}
                loading="lazy"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(4,28,46,0.92) 0%, rgba(4,28,46,0.35) 65%)" }} />

              {/* Hero Project badge */}
              <div style={{ position: "absolute", top: 20, left: 20, background: C.red, padding: "5px 14px" }}>
                <span style={{ color: C.white, fontSize: 12, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}>Hero Project</span>
              </div>
              <div style={{ position: "absolute", top: 52, left: 20, background: "rgba(27,108,168,0.8)", padding: "5px 12px", backdropFilter: "blur(6px)" }}>
                <span style={{ color: C.white, fontSize: 13, fontFamily: "monospace", letterSpacing: "0.12em" }}>{projects[0].type}</span>
              </div>

              {/* Status */}
              <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(4,28,46,0.7)", border: "1px solid rgba(75,204,212,0.3)", padding: "6px 14px", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: projects[0].statusColor, display: "inline-block" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.14em" }}>{projects[0].status}</span>
              </div>

              {/* Click hint */}
              <div style={{ position: "absolute", bottom: 28, right: 28, border: "1px solid rgba(75,204,212,0.35)", padding: "7px 16px", backdropFilter: "blur(6px)", background: "rgba(4,28,46,0.5)" }}>
                <span style={{ color: "rgba(75,204,212,0.8)", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.18em" }}>View Full Details ↗</span>
              </div>

              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "36px 40px" }}>
                <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 , fontWeight: 600 }}>
                  {projects[0].location}
                </p>
                <h3 style={{ color: C.white, fontSize: 30, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, margin: "0 0 20px", maxWidth: 600 }}>
                  {projects[0].name}
                </h3>
                <div style={{ display: "flex", gap: 36 }}>
                  {[["300 Beds", "Capacity"], ["₹150 Cr+", "Project Value"], ["2,00,000 Sq Ft", "Built Area"], ["Full Turnkey", "Scope"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <div style={{ color: C.teal, fontSize: 20, fontFamily: "'Cormorant Garamond', 'Georgia', serif", marginBottom: 3 }}>{val}</div>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.14em", textTransform: "uppercase" }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Three smaller project cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {projects.slice(1).map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
                  onClick={() => setActiveProject(p)}
                  aria-label={`View details: ${p.name}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setActiveProject(p); }}
                  style={{ position: "relative", overflow: "hidden", cursor: "pointer", height: 300, outline: "none" }}
                  onMouseEnter={e => {
                    const img = (e.currentTarget as HTMLElement).querySelector("img")!;
                    img.style.transform = "scale(1.06)";
                    const hint = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".hint");
                    if (hint) hint.style.opacity = "1";
                  }}
                  onMouseLeave={e => {
                    const img = (e.currentTarget as HTMLElement).querySelector("img")!;
                    img.style.transform = "scale(1)";
                    const hint = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".hint");
                    if (hint) hint.style.opacity = "0";
                  }}
                >
                  <img
                    src={p.image} alt={`${p.name}, ${p.location}, ${p.type}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease", display: "block" }}
                    loading="lazy"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,28,46,0.92) 0%, rgba(4,28,46,0.1) 55%)" }} />

                  {/* Type badge */}
                  <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(27,108,168,0.8)", padding: "5px 10px", backdropFilter: "blur(6px)" }}>
                    <span style={{ color: C.white, fontSize: 12, fontFamily: "monospace", letterSpacing: "0.1em" }}>{p.type}</span>
                  </div>

                  {/* Status dot */}
                  <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(4,28,46,0.7)", border: "1px solid rgba(75,204,212,0.2)", padding: "4px 10px", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.statusColor, display: "inline-block" }} />
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em" }}>Ongoing</span>
                  </div>

                  {/* Hover hint */}
                  <div className="hint" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }}>
                    <div style={{ border: "1px solid rgba(75,204,212,0.5)", padding: "8px 18px", background: "rgba(4,28,46,0.7)", backdropFilter: "blur(6px)" }}>
                      <span style={{ color: "rgba(75,204,212,0.9)", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.2em" }}>View Details ↗</span>
                    </div>
                  </div>

                  {/* Card info */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px" }}>
                    <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6 , fontWeight: 600 }}>{p.location}</p>
                    <h3 style={{ color: C.white, fontSize: 20, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, margin: "0 0 10px", lineHeight: 1.25 }}>{p.name}</h3>
                    <span style={{ color: "rgba(75,204,212,0.6)", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.16em" }}>View Details ↗</span>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Experience strip */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ marginTop: 48, padding: "32px 40px", background: C.navy, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <MedicalCross size={24} color={C.teal} opacity={0.6} />
                <div>
                  <p style={{ color: C.white, fontSize: 20, fontFamily: "'Cormorant Garamond', 'Georgia', serif", margin: 0, lineHeight: 1.3 , fontWeight: 600 }}>
                    The Experience Behind Every Project
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.90)", fontSize: 17, margin: "4px 0 0", lineHeight: 1.5 , fontWeight: 600 }}>
                    50+ healthcare infrastructure projects delivered across India, the UK, and Europe.
                  </p>
                </div>
              </div>
              <OutlineBtn light onClick={() => navigate("/facilities")}>View All Projects →</OutlineBtn>
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            LEADERSHIP
        ══════════════════════════════════════════ */}
        <section aria-labelledby="leadership-heading" style={{ background: C.navy, padding: "120px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, color: C.teal, pointerEvents: "none" }}>
            <BlueprintGrid opacity={0.05} />
          </div>
          <div style={{ position: "absolute", right: -30, top: "50%", transform: "translateY(-50%)", fontFamily: "monospace", fontSize: "20vw", color: "rgba(75,204,212,0.025)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
            04
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
            <motion.div style={{ marginBottom: 80, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end" }} {...fadeUp}>
              <div>
                <SectionLabel text="Leadership" light />
                <h2 id="leadership-heading" style={{ color: C.white, fontSize: "clamp(1.9rem, 3.2vw, 3rem)", fontWeight: 400, fontFamily: "'Cormorant Garamond', 'Georgia', serif", margin: 0 }}>
                  Built by People Who Know Healthcare Infrastructure
                </h2>
              </div>
              <p style={{ color: "rgba(255,255,255,0.90)", lineHeight: 1.85, fontSize: 19, margin: 0 , fontWeight: 600 }}>
                Our leadership combines deep architectural expertise, hands-on construction experience, and senior-level NHS healthcare infrastructure knowledge from the United Kingdom.
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {team.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${t.name}'s profile`}
                  onClick={() => navigate("/about")}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") navigate("/about"); }}
                  style={{ padding: "44px 36px", border: "1px solid rgba(75,204,212,0.1)", transition: "all 0.4s", cursor: "pointer", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(75,204,212,0.35)"; el.style.background = "rgba(75,204,212,0.04)"; el.style.transform = "translateY(-6px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(75,204,212,0.1)"; el.style.background = "transparent"; el.style.transform = "translateY(0)"; }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.color}, transparent)` }} />
                  <div style={{ width: 76, height: 76, background: t.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 0 24px", fontSize: 27, color: C.white, fontFamily: "'Cormorant Garamond', 'Georgia', serif", letterSpacing: "0.05em" }}>
                    {t.initial}
                  </div>
                  <h3 style={{ color: C.white, fontSize: 20, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, marginBottom: 6 }}>{t.name}</h3>
                  <p style={{ color: "rgba(75,204,212,0.65)", fontSize: 17, lineHeight: 1.5, margin: "0 0 20px" , fontWeight: 600 }}>{t.role}</p>
                  <div style={{ borderTop: "1px solid rgba(75,204,212,0.15)", paddingTop: 16 }}>
                    <span style={{ color: "rgba(75,204,212,0.4)", fontSize: 13, letterSpacing: "0.16em", fontFamily: "monospace" }}>View Profile ↗</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 48 }}>
              <OutlineBtn light onClick={() => navigate("/about")}>Meet the Full Leadership Team →</OutlineBtn>
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

          <div style={{ position: "absolute", inset: 0, color: C.teal, pointerEvents: "none" }}>
            <BlueprintGrid opacity={0.04} />
          </div>

          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 80px", textAlign: "center", position: "relative", zIndex: 10 }}>
            <motion.div {...fadeUp}>
              <SectionLabel text="Get In Touch" light />

              <h2 id="cta-heading" style={{ color: C.white, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", marginBottom: 24, fontWeight: 400, lineHeight: 1.1, fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Planning a Healthcare Facility?<br />
                <em style={{ color: C.teal, fontStyle: "italic" }}>Let's Talk.</em>
              </h2>

              <p style={{ color: "rgba(255,255,255,0.42)", marginBottom: 52, lineHeight: 1.85, maxWidth: 520, margin: "0 auto 52px", fontSize: 20 , fontWeight: 600 }}>
                Whether you are starting from zero or need expert support at any stage, ARCHORA is ready to help you design, build, and deliver infrastructure that works.
              </p>

              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <HeroBtn primary onClick={() => navigate("/contact")}>Book a Free Consultation</HeroBtn>
                <HeroBtn onClick={() => window.open(WHATSAPP_URL, "_blank")}>💬 WhatsApp Us</HeroBtn>
                <HeroBtn onClick={() => navigate("/contact")}>Send an Enquiry →</HeroBtn>
              </div>

              <p style={{ color: "rgba(255,255,255,0.2)", marginTop: 28, fontSize: 14, fontFamily: "monospace", letterSpacing: "0.1em" , fontWeight: 600 }}>
                No obligation · No sales pressure · Honest advice from healthcare infrastructure specialists
              </p>
            </motion.div>
          </div>
        </section>

      </div>

      {/* Project modal, rendered outside main div so it overlays everything */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
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
        textTransform: "uppercase", cursor: "pointer", fontFamily: "monospace",
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

function OutlineBtn({ children, dark, light, onClick }: { children: React.ReactNode; dark?: boolean; light?: boolean; onClick?: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? (dark ? C.navy : "rgba(75,204,212,0.12)") : "transparent",
        color: dark ? (hover ? C.white : C.navy) : "rgba(75,204,212,0.75)",
        border: `1px solid ${dark ? "rgba(4,28,46,0.5)" : "rgba(75,204,212,0.3)"}`,
        padding: "11px 26px", fontSize: 14, letterSpacing: "0.15em",
        textTransform: "uppercase", fontFamily: "monospace", cursor: "pointer",
        transition: "all 0.25s ease", whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function ProjectBadge({ type }: { type: string }) {
  return (
    <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(27,108,168,0.75)", padding: "5px 12px", backdropFilter: "blur(6px)" }}>
      <span style={{ color: C.white, fontSize: 13, fontFamily: "monospace", letterSpacing: "0.12em" }}>{type}</span>
    </div>
  );
}