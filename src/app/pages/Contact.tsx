import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Helmet } from "react-helmet";

// ─────────────────────────────────────────────
// DESIGN TOKENS (matching Home.tsx)
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
  dark:    "#0a1628",
};

// ─────────────────────────────────────────────
// SEO
// ─────────────────────────────────────────────
function SEOHead() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://archora.in/contact#webpage",
        "url": "https://archora.in/contact",
        "name": "Contact ARCHORA | Hospital Design & Healthcare Infrastructure Enquiries",
        "description": "Planning a hospital, clinic, modular OT, or healthcare facility? Contact ARCHORA for expert healthcare infrastructure consultation. Based in Thane, serving pan-India.",
        "isPartOf": { "@id": "https://archora.in/#website" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://archora.in" },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://archora.in/contact" }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://archora.in/#localbusiness",
        "name": "ARCHORA Healthcare Infrastructure",
        "url": "https://www.archora.in",
        "logo": "https://www.archora.in/logo.png",
        "image": "https://www.archora.in/office-image.jpg",
        "telephone": "+917218344700",
        "email": "contact@archora.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "903 Niramaya Heights, Parsik Nagar, Kalwa",
          "addressLocality": "Thane East",
          "addressRegion": "Maharashtra",
          "postalCode": "400605",
          "addressCountry": "IN"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "10:00",
          "closes": "19:00"
        },
        "areaServed": "India",
        "description": "ARCHORA is India's trusted healthcare infrastructure company specialising in hospital design, construction, modular OTs, ICU setup, IVF labs, and NABH-compliant healthcare facilities.",
        "priceRange": "₹₹₹",
        "sameAs": ["https://wa.me/917218344700"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What types of healthcare projects does ARCHORA handle?",
            "acceptedAnswer": { "@type": "Answer", "text": "ARCHORA handles hospitals, multispeciality clinics, modular OTs, ICU setups, IVF labs, diagnostic centres, medical colleges, and healthcare renovation projects across India." }
          },
          {
            "@type": "Question",
            "name": "Does ARCHORA work outside Maharashtra?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. We provide healthcare infrastructure services pan-India. Remote consultations are available and our team can visit project sites anywhere in India." }
          },
          {
            "@type": "Question",
            "name": "How quickly will ARCHORA respond to my enquiry?",
            "acceptedAnswer": { "@type": "Answer", "text": "Our team responds to all project enquiries within 24 working hours. For urgent queries, you can reach us directly on WhatsApp at +91 72184 44700." }
          },
          {
            "@type": "Question",
            "name": "What is the first step to start a project with ARCHORA?",
            "acceptedAnswer": { "@type": "Answer", "text": "Simply fill in the enquiry form or WhatsApp us. Our team will schedule an initial consultation call to understand your project requirements — completely free of charge." }
          },
          {
            "@type": "Question",
            "name": "Does ARCHORA provide NABH-compliant designs?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. All our hospital and healthcare facility designs are planned in alignment with NABH standards to support your accreditation process." }
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <title>Contact ARCHORA | Hospital Design & Healthcare Infrastructure Enquiries</title>
      <meta name="description" content="Planning a hospital, clinic, modular OT, or healthcare facility? Contact ARCHORA for expert healthcare infrastructure consultation. Based in Thane, serving pan-India." />
      <meta name="keywords" content="contact ARCHORA, hospital design enquiry, healthcare infrastructure India, NABH hospital design consultation, modular OT enquiry, hospital construction India, Thane healthcare infrastructure" />
      <link rel="canonical" href="https://archora.in/contact" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://archora.in/contact" />
      <meta property="og:title" content="Contact ARCHORA | Hospital Design & Healthcare Infrastructure Enquiries" />
      <meta property="og:description" content="Planning a hospital, clinic, modular OT, or healthcare facility? Contact ARCHORA — India's dedicated healthcare infrastructure partner. Based in Thane, pan-India delivery." />
      <meta property="og:image" content="https://archora.in/og-image.jpg" />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact ARCHORA | Hospital Design & Healthcare Infrastructure" />
      <meta name="twitter:description" content="Get in touch with India's dedicated healthcare infrastructure partner. Free initial consultation." />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Thane, Maharashtra, India" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ─────────────────────────────────────────────
// SHARED DECORATIONS
// ─────────────────────────────────────────────
function BlueprintGrid({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="bp-sm-c" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0L0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
        <pattern id="bp-lg-c" width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill="url(#bp-sm-c)" />
          <path d="M120 0L0 0 0 120" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-lg-c)" opacity={opacity} />
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
// ANIMATED FIELD WRAPPER
// ─────────────────────────────────────────────
function FieldGroup({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// FORM INPUT STYLES
// ─────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(75,204,212,0.18)",
  color: C.white,
  fontFamily: "'Georgia', serif",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "rgba(255,255,255,0.45)",
  fontSize: 9,
  fontFamily: "monospace",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  marginBottom: 8,
};

function FormInput({ id, label, type = "text", placeholder, required }: { id: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{required && <span style={{ color: C.red, marginLeft: 4 }}>*</span>}</label>
      <input
        id={id} name={id} type={type} placeholder={placeholder} required={required}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...inputStyle, borderColor: focused ? "rgba(75,204,212,0.6)" : "rgba(75,204,212,0.18)", background: focused ? "rgba(75,204,212,0.05)" : "rgba(255,255,255,0.04)" }}
      />
    </div>
  );
}

function FormSelect({ id, label, options, required }: { id: string; label: string; options: string[]; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{required && <span style={{ color: C.red, marginLeft: 4 }}>*</span>}</label>
      <select
        id={id} name={id} required={required}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...inputStyle, appearance: "none", cursor: "pointer", borderColor: focused ? "rgba(75,204,212,0.6)" : "rgba(75,204,212,0.18)", background: focused ? "#0a2540" : "#091525" }}
      >
        <option value="" style={{ background: "#091525" }}>Select…</option>
        {options.map(o => <option key={o} value={o} style={{ background: "#091525" }}>{o}</option>)}
      </select>
    </div>
  );
}

function FormTextarea({ id, label, placeholder, rows = 5, required }: { id: string; label: string; placeholder?: string; rows?: number; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{required && <span style={{ color: C.red, marginLeft: 4 }}>*</span>}</label>
      <textarea
        id={id} name={id} placeholder={placeholder} rows={rows} required={required}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.75, borderColor: focused ? "rgba(75,204,212,0.6)" : "rgba(75,204,212,0.18)", background: focused ? "rgba(75,204,212,0.05)" : "rgba(255,255,255,0.04)" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const projectTypes = [
  "Hospital / Multispeciality Hospital",
  "Clinic / Polyclinic",
  "Modular Operation Theatre (OT)",
  "ICU Setup",
  "IVF Lab",
  "Diagnostic Centre / Pathology Lab",
  "Medical College / Healthcare Institution",
  "Healthcare Interior / Renovation",
  "Other",
];

const projectStages = [
  "Just Planning / Exploring",
  "Land / Space Identified",
  "Design & Approvals Stage",
  "Construction Ready",
  "Under Construction",
  "Renovation / Expansion",
];

const services = [
  { title: "Hospital Design & Architecture", desc: "Functional, patient-centric, NABH-ready layouts" },
  { title: "Turnkey Hospital Construction", desc: "End-to-end execution from concept to commissioning" },
  { title: "Modular OT & ICU Setup", desc: "Plug-and-play surgical and critical care infrastructure" },
  { title: "Healthcare Interiors", desc: "Clinical-grade interiors for hospitals, clinics, and diagnostic centres" },
  { title: "MEP Services", desc: "Medical-grade mechanical, electrical, and plumbing systems" },
  { title: "IVF Labs & Diagnostic Centres", desc: "Specialised infrastructure for fertility and diagnostics" },
  { title: "NABH Compliance Consulting", desc: "Facility planning aligned to NABH standards" },
  { title: "Project Management", desc: "Professional oversight for healthcare construction projects" },
];

const faqs = [
  {
    q: "What types of healthcare projects does ARCHORA handle?",
    a: "ARCHORA handles hospitals, multispeciality clinics, modular OTs, ICU setups, IVF labs, diagnostic centres, medical colleges, and healthcare renovation projects across India."
  },
  {
    q: "Does ARCHORA work outside Maharashtra?",
    a: "Yes. We provide healthcare infrastructure services pan-India. Remote consultations are available and our team can visit project sites anywhere in India."
  },
  {
    q: "How quickly will ARCHORA respond to my enquiry?",
    a: "Our team responds to all project enquiries within 24 working hours. For urgent queries, you can reach us directly on WhatsApp at +91 72184 44700."
  },
  {
    q: "What is the first step to start a project with ARCHORA?",
    a: "Simply fill in the enquiry form or WhatsApp us. Our team will schedule an initial consultation call to understand your project requirements — completely free of charge."
  },
  {
    q: "Does ARCHORA provide NABH-compliant designs?",
    a: "Yes. All our hospital and healthcare facility designs are planned in alignment with NABH standards to support your accreditation process."
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead />

      <div style={{ fontFamily: "'Georgia', serif", overflowX: "hidden", background: C.navy }}>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section style={{ position: "relative", height: "52vh", minHeight: 400, overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1716698288651-b0b8698ea2f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
            alt="ARCHORA healthcare infrastructure office — contact us"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
            fetchPriority="high"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(4,28,46,0.96) 0%, rgba(4,28,46,0.7) 55%, rgba(4,28,46,0.45) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, color: C.teal }}>
            <BlueprintGrid opacity={0.07} />
          </div>

          {/* Decorative cross */}
          <div style={{ position: "absolute", top: "20%", right: "8%", opacity: 0.1 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ width: 120, height: 120 }}
            >
              <svg viewBox="0 0 48 48" fill="none" width={120} height={120}>
                <circle cx="24" cy="24" r="9" stroke={C.teal} strokeWidth="1" />
                <circle cx="24" cy="24" r="17" stroke={C.teal} strokeWidth="0.5" strokeDasharray="3 4" />
                <line x1="24" y1="0" x2="24" y2="13" stroke={C.teal} strokeWidth="1" />
                <line x1="24" y1="35" x2="24" y2="48" stroke={C.teal} strokeWidth="1" />
                <line x1="0" y1="24" x2="13" y2="24" stroke={C.teal} strokeWidth="1" />
                <line x1="35" y1="24" x2="48" y2="24" stroke={C.teal} strokeWidth="1" />
              </svg>
            </motion.div>
          </div>

          <div style={{ position: "relative", height: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 80px", display: "flex", alignItems: "center", zIndex: 10 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <MedicalCross size={16} />
                <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", fontFamily: "monospace" }}>
                  Healthcare Infrastructure
                </span>
              </div>
              <h1 style={{
                fontSize: "clamp(2.4rem, 5vw, 4.2rem)", color: C.white,
                fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400,
                lineHeight: 1.06, marginBottom: 16, letterSpacing: "-0.01em",
              }}>
                Let's Build Your<br />
                <em style={{ color: C.teal, fontStyle: "italic" }}>Healthcare Facility</em> Together
              </h1>
              <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 15, lineHeight: 1.75, maxWidth: 520, fontFamily: "sans-serif" }}>
                Tell us about your project and our team will get back to you within 24 working hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MAIN: FORM + CONTACT INFO
        ══════════════════════════════════════════ */}
        <section aria-labelledby="enquiry-heading" style={{ background: C.dark, padding: "100px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, color: C.teal }}>
            <BlueprintGrid opacity={0.04} />
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "start" }}>

              {/* ── ENQUIRY FORM ── */}
              <div>
                <motion.div {...fadeUp}>
                  <SectionLabel text="Send Us an Enquiry" light />
                  <h2 id="enquiry-heading" style={{ color: C.white, fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)", fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, marginBottom: 12, lineHeight: 1.15 }}>
                    Start a Conversation
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.75, marginBottom: 44 }}>
                    We work with doctors, hospital owners, healthcare investors, and chains across India.
                    Fill in the details below — no sales pressure, just honest expert advice.
                  </p>
                </motion.div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        padding: "60px 48px", border: "1px solid rgba(75,204,212,0.25)",
                        background: "rgba(75,204,212,0.04)", textAlign: "center",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                        <div style={{ width: 56, height: 56, border: `2px solid ${C.teal}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <h3 style={{ color: C.white, fontSize: 22, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, marginBottom: 12 }}>
                        Enquiry Received
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.75, maxWidth: 360, margin: "0 auto 28px" }}>
                        Our team will get back to you within 24 working hours. For urgent queries, WhatsApp us directly.
                      </p>
                      <a
                        href="https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project."
                        target="_blank" rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "11px 26px", background: "#25d366", color: C.white,
                          border: "none", fontSize: 10, letterSpacing: "0.16em",
                          textTransform: "uppercase", fontFamily: "monospace",
                          cursor: "pointer", textDecoration: "none",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Chat on WhatsApp
                      </a>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      style={{ display: "flex", flexDirection: "column", gap: 24 }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                    >
                      {/* Row 1: Name + Phone */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        <FieldGroup delay={0.05}>
                          <FormInput id="fullName" label="Full Name" placeholder="Dr. Rajesh Sharma" required />
                        </FieldGroup>
                        <FieldGroup delay={0.1}>
                          <FormInput id="phone" label="Phone Number" type="tel" placeholder="+91 98765 43210" required />
                        </FieldGroup>
                      </div>

                      {/* Row 2: Email + City */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        <FieldGroup delay={0.15}>
                          <FormInput id="email" label="Email Address" type="email" placeholder="dr.sharma@hospital.com" required />
                        </FieldGroup>
                        <FieldGroup delay={0.2}>
                          <FormInput id="city" label="City / Project Location" placeholder="Mumbai, Maharashtra" required />
                        </FieldGroup>
                      </div>

                      {/* Row 3: Type + Stage */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        <FieldGroup delay={0.25}>
                          <FormSelect id="projectType" label="Type of Project" options={projectTypes} required />
                        </FieldGroup>
                        <FieldGroup delay={0.3}>
                          <FormSelect id="projectStage" label="Project Stage" options={projectStages} required />
                        </FieldGroup>
                      </div>

                      {/* Message */}
                      <FieldGroup delay={0.35}>
                        <FormTextarea
                          id="message" label="Message / Project Brief"
                          placeholder="Tell us about your project — bed count, services planned, timeline, site details, or anything you'd like us to know..."
                          rows={5}
                        />
                      </FieldGroup>

                      {/* Submit */}
                      <FieldGroup delay={0.4}>
                        <SubmitButton />
                        <p style={{ marginTop: 16, fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "monospace", lineHeight: 1.7 }}>
                          🔒 Your information is safe with us. We never share your details with third parties.{" "}
                          <a href="/privacy-policy" style={{ color: "rgba(75,204,212,0.5)", textDecoration: "underline" }}>Privacy Policy</a>
                        </p>
                      </FieldGroup>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* ── CONTACT INFO SIDEBAR ── */}
              <motion.div
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Prefer to Talk Directly */}
                <div style={{ marginBottom: 36, padding: "28px 28px", border: "1px solid rgba(75,204,212,0.15)", background: "rgba(75,204,212,0.03)", position: "relative" }}>
                  <div style={{ position: "absolute", top: -1, left: -1, width: 28, height: 28, borderLeft: `2px solid ${C.teal}`, borderTop: `2px solid ${C.teal}`, opacity: 0.5 }} />
                  <SectionLabel text="Prefer to Talk Directly?" light />
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>
                    Healthcare infrastructure projects involve serious decisions. If you prefer a direct conversation — we are just a call or message away.
                  </p>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project."
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "14px 20px", background: "#25d366", color: C.white,
                      textDecoration: "none", marginBottom: 20, transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                    aria-label="Chat on WhatsApp with ARCHORA"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "monospace" }}>Chat on WhatsApp</div>
                      <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>+91 72184 44700 — Click to open directly</div>
                    </div>
                  </a>

                  {/* Contact rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      {
                        icon: (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.27 9.09a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.36 6.36l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                          </svg>
                        ),
                        label: "Call Us",
                        value: "+91 72184 44700",
                        href: "tel:+917218444700",
                      },
                      {
                        icon: (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                          </svg>
                        ),
                        label: "Email",
                        value: "contact@archora.in",
                        href: "mailto:contact@archora.in",
                      },
                      {
                        icon: (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                        ),
                        label: "Working Hours",
                        value: "Mon – Sat, 10:00 AM – 7:00 PM",
                        href: undefined,
                      },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0", borderBottom: "1px solid rgba(75,204,212,0.08)" }}>
                        <div style={{ width: 32, height: 32, background: "rgba(27,108,168,0.2)", border: "1px solid rgba(27,108,168,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: C.teal, flexShrink: 0 }}>
                          {item.icon}
                        </div>
                        <div>
                          <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 3 }}>{item.label}</div>
                          {item.href ? (
                            <a href={item.href} style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, textDecoration: "none", fontFamily: "monospace" }}>{item.value}</a>
                          ) : (
                            <span style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, fontFamily: "monospace" }}>{item.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visit Our Office */}
                <div style={{ padding: "24px 28px", border: "1px solid rgba(75,204,212,0.1)", background: "rgba(75,204,212,0.02)", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: -1, right: -1, width: 28, height: 28, borderRight: `2px solid ${C.teal}`, borderBottom: `2px solid ${C.teal}`, opacity: 0.4 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 32, height: 32, background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MedicalCross size={14} color={C.red} opacity={0.8} />
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}>Visit Our Office</span>
                  </div>
                  <address style={{ fontStyle: "normal", color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.85 }}>
                    <strong style={{ color: C.white, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, fontSize: 15 }}>ARCHORA Healthcare Infrastructure</strong><br />
                    903 Niramaya Heights, Parsik Nagar, Kalwa,<br />
                    Thane East, Thane — 400605,<br />
                    Maharashtra, India
                  </address>
                  <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, color: "rgba(75,204,212,0.6)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.14em" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#25d366", display: "inline-block" }} />
                    In-person consultations by appointment · Remote consultations available pan-India
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MAP
        ══════════════════════════════════════════ */}
        <motion.section
          aria-label="Office location map"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ height: 420, position: "relative", overflow: "hidden" }}
        >
          <iframe
            title="ARCHORA Healthcare Infrastructure office location — Thane, Maharashtra"
            src="https://maps.google.com/maps?q=903+Niramaya+Heights+Parsik+Nagar+Kalwa+Thane&output=embed"
            style={{ width: "100%", height: "100%", border: "none", filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.85)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Address overlay */}
          <div style={{ position: "absolute", bottom: 24, left: 24, background: C.navy, padding: "14px 20px", borderLeft: `3px solid ${C.red}`, backdropFilter: "blur(8px)" }}>
            <p style={{ color: C.white, fontSize: 12, margin: 0, fontFamily: "monospace" }}>ARCHORA — Thane East, Maharashtra</p>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, margin: "4px 0 0", fontFamily: "monospace", letterSpacing: "0.1em" }}>903 Niramaya Heights · Mon–Sat 10AM–7PM</p>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════
            WHAT WE HELP WITH
        ══════════════════════════════════════════ */}
        <section aria-labelledby="services-heading" style={{ background: C.navy, padding: "100px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, color: C.teal }}>
            <BlueprintGrid opacity={0.05} />
          </div>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
            <motion.div style={{ marginBottom: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end" }} {...fadeUp}>
              <div>
                <SectionLabel text="What We Help With" light />
                <h2 id="services-heading" style={{ color: C.white, fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)", fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, margin: 0 }}>
                  We Work With Doctors, Investors & Healthcare Chains Across India
                </h2>
              </div>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                Whatever stage you are at — from first idea to final commissioning — ARCHORA brings the same depth of healthcare infrastructure expertise to every project.
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(75,204,212,0.06)" }}>
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                  style={{ background: C.navy, padding: "28px 24px", transition: "background 0.3s", cursor: "default", position: "relative" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#0a2035"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = C.navy; }}
                >
                  <div style={{ width: 4, height: 4, background: C.red, marginBottom: 16, opacity: 0.7 }} />
                  <h3 style={{ color: C.white, fontSize: 13, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, lineHeight: 1.3, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11.5, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════ */}
        <section aria-labelledby="faq-heading" style={{ background: C.dark, padding: "100px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, color: C.teal }}>
            <BlueprintGrid opacity={0.04} />
          </div>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 80px", position: "relative" }}>
            <motion.div style={{ textAlign: "center", marginBottom: 64 }} {...fadeUp}>
              <SectionLabel text="Frequently Asked Questions" light />
              <h2 id="faq-heading" style={{ color: C.white, fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)", fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, margin: 0 }}>
                Common Questions About Working With ARCHORA
              </h2>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    style={{
                      width: "100%", textAlign: "left", background: openFaq === i ? "rgba(75,204,212,0.06)" : "rgba(255,255,255,0.02)",
                      border: "none", borderBottom: "1px solid rgba(75,204,212,0.1)",
                      padding: "22px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20,
                      transition: "background 0.25s",
                    }}
                  >
                    <span style={{ color: C.white, fontSize: 14, fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ color: C.teal, fontSize: 20, lineHeight: 1, flexShrink: 0, opacity: 0.7 }}
                    >+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ padding: "16px 24px 22px", background: "rgba(75,204,212,0.03)", borderBottom: "1px solid rgba(75,204,212,0.1)" }}>
                          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, lineHeight: 1.85, margin: 0 }}>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════ */}
        <section aria-labelledby="final-cta" style={{ background: "#060f1e", padding: "120px 0", position: "relative", overflow: "hidden" }}>
          {[700, 520, 360].map((size, i) => (
            <motion.div
              key={size} aria-hidden="true"
              style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: "50%", border: `1px solid rgba(75,204,212,${0.02 + i * 0.01})`, pointerEvents: "none" }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 70 + i * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <div style={{ position: "absolute", inset: 0, color: C.teal }}>
            <BlueprintGrid opacity={0.04} />
          </div>

          <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 80px", textAlign: "center", position: "relative", zIndex: 10 }}>
            <motion.div {...fadeUp}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
                <MedicalCross size={36} color={C.red} opacity={0.7} />
              </div>
              <SectionLabel text="Ready to Start?" light />
              <h2 id="final-cta" style={{ color: C.white, fontSize: "clamp(2rem, 4vw, 3.4rem)", fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400, lineHeight: 1.1, marginBottom: 20 }}>
                Planning a Healthcare Facility?<br />
                <em style={{ color: C.teal, fontStyle: "italic" }}>Let's Talk.</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.85, maxWidth: 480, margin: "0 auto 44px" }}>
                Whether you are starting from zero or need expert support at any stage — ARCHORA is ready to help you design, build, and deliver.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="#enquiry-heading"
                  style={{ padding: "14px 32px", background: C.blue, color: C.white, textDecoration: "none", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace", transition: "background 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.teal; (e.currentTarget as HTMLAnchorElement).style.color = C.navy; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.blue; (e.currentTarget as HTMLAnchorElement).style.color = C.white; }}
                >
                  Send an Enquiry
                </a>
                <a
                  href="https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project."
                  target="_blank" rel="noopener noreferrer"
                  style={{ padding: "14px 32px", background: "transparent", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace", display: "flex", alignItems: "center", gap: 8 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Us
                </a>
              </div>
              <p style={{ color: "rgba(255,255,255,0.18)", marginTop: 28, fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em" }}>
                No obligation · No sales pressure · Free initial consultation
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// SUBMIT BUTTON
// ─────────────────────────────────────────────
function SubmitButton() {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "15px 40px", background: hover ? C.teal : C.blue,
        color: hover ? C.navy : C.white,
        border: "none", fontSize: 10, letterSpacing: "0.2em",
        textTransform: "uppercase", fontFamily: "monospace",
        cursor: "pointer", transition: "all 0.25s ease",
        display: "flex", alignItems: "center", gap: 10,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
      Submit Enquiry — We respond within 24 working hours
    </button>
  );
}