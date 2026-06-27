import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Helmet } from "react-helmet";

const WHATSAPP_URL = "https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project.";

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  navy:     "#041c2e",
  navyMid:  "#0a2e47",
  blue:     "#1b6ca8",
  teal:     "#4bccd4",
  cream:    "#f5f1eb",
  creamAlt: "#ede9e1",
  red:      "#c0392b",
  white:    "#ffffff",
  dark:     "#060f1e",
  slate:    "#0d1f30",
};

// ─────────────────────────────────────────────
// SHARED DECORATIONS
// ─────────────────────────────────────────────
function MedicalCross({ size=20, color=C.red, opacity=0.85 }: { size?:number; color?:string; opacity?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="6.5" y="1" width="7" height="18" rx="1.5" fill={color} opacity={opacity}/>
      <rect x="1" y="6.5" width="18" height="7" rx="1.5" fill={color} opacity={opacity}/>
    </svg>
  );
}

function SectionLabel({ text, light=false }: { text:string; light?:boolean }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:20 }}>
      <span style={{ width:28,height:1,background:light?"rgba(75,204,212,0.6)":C.blue,display:"block" }}/>
      <span style={{ fontFamily:"Calibri, Arial, sans-serif",fontSize:13,letterSpacing:"0.28em",textTransform:"uppercase",
        color:light?"rgba(75,204,212,0.7)":C.blue }}>
        {text}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const pillars = [
  {
    num:"01", stat:"100%", statLabel:"Healthcare Focus",
    title:"Healthcare Only. Always.",
    desc:"We do not design offices, residences, or commercial spaces. Healthcare infrastructure is all we do, our knowledge, processes, and vendor relationships are entirely built around one outcome.",
  },
  {
    num:"02", stat:"Zero", statLabel:"Retrofits Needed",
    title:"Compliance Built In. Not Bolted On.",
    desc:"NABH, NABL, INC, NMC, AERB, fire safety, part of our design process from day one, not an afterthought discovered during inspection.",
  },
  {
    num:"03", stat:"1", statLabel:"Point of Contact",
    title:"Single-Window Accountability.",
    desc:"One team, one contract, one point of accountability, from architecture and engineering through construction, equipment, and commissioning.",
  },
  {
    num:"04", stat:"NHS", statLabel:"Standard Expertise",
    title:"Global Standards. India-Wide Delivery.",
    desc:"NHS-level hospital planning expertise meets India-specific clinical realities. International best practices, delivered in every corner of the country.",
  },
];

const comparison = [
  { attr:"Healthcare specialisation",  general:"Rarely",                        archora:"Exclusively" },
  { attr:"NABH compliance knowledge",  general:"Limited",                       archora:"In-house from Day 1" },
  { attr:"MEP for healthcare",         general:"Outsourced",                    archora:"In-house specialist" },
  { attr:"OT and ICU infrastructure",  general:"Unknown vendor",                archora:"Managed by ARCHORA" },
  { attr:"Cost transparency upfront",  general:"Rarely",                        archora:"Always" },
  { attr:"Single window delivery",     general:"Multiple vendors",              archora:"One team, one contract" },
  { attr:"Retrofit risk",              general:"Very high",                     archora:"Eliminated by design" },
  { attr:"Focus area",                 general:"Residential, commercial, hospitals", archora:"Healthcare infrastructure only" },
];

const audiences = [
  { label:"Doctors & Clinicians",      desc:"Planning your first clinic, nursing home, or hospital? Infrastructure that matches your clinical vision, ready to operate from day one." },
  { label:"Hospital Owners & Chains",   desc:"Expanding an existing facility or building a new branch? Brownfield upgrades and greenfield projects with the same depth of expertise." },
  { label:"Healthcare Investors",        desc:"Feasibility studies, DPRs, and turnkey delivery that protect your capital and your timeline, before and after you commit." },
  { label:"Medical & Nursing Colleges", desc:"Building or expanding a campus? ARCHORA designs and delivers INC and NMC-compliant educational and clinical infrastructure." },
  { label:"Diagnostic Centres & Labs",  desc:"NABL-compliant spaces with the right technical infrastructure for every department and imaging modality." },
  { label:"Healthcare Consultants",     desc:"The infrastructure partner your clients need. We work collaboratively with consultants and advisors across India." },
];

const faqSections = [
  {
    id:"general", label:"General, About ARCHORA",
    questions:[
      { q:"What is ARCHORA and what does the company do?", a:"ARCHORA is a healthcare infrastructure company based in Thane, Maharashtra, serving clients pan-India. We specialise in hospital design, hospital construction, healthcare interiors, MEP services, modular OTs, ICU setup, IVF labs, diagnostic centres, NABH-compliant facility planning, and turnkey healthcare project delivery. We work exclusively in the healthcare sector." },
      { q:"Is ARCHORA only a design firm or do you also construct?", a:"ARCHORA offers both. We provide end-to-end turnkey healthcare infrastructure services, from concept design and architectural planning all the way through construction, interiors, MEP installation, and commissioning. Most of our clients prefer the turnkey model because it eliminates coordination gaps between multiple vendors." },
      { q:"Where does ARCHORA operate? Only Maharashtra or pan-India?", a:"We are headquartered in Thane, Maharashtra, but we take on healthcare infrastructure projects across India. We have worked on projects in multiple states and are fully equipped for remote consultations, site visits, and project execution outside Maharashtra." },
      { q:"What makes ARCHORA different from a regular architecture firm?", a:"ARCHORA works exclusively in healthcare infrastructure. Our team understands infection control zoning, NABH compliance requirements, clinical workflows, MEP specifications for medical-grade environments, and the operational realities of running a hospital, not just the aesthetics of the building. A general architect may not account for the difference between a clean zone and a sterile zone in an OT complex, at ARCHORA, this is our baseline." },
      { q:"Does ARCHORA handle renovation and expansion projects or only new builds?", a:"Both. We handle greenfield projects (new hospitals and facilities built from scratch) as well as renovation, expansion, and refurbishment of existing healthcare facilities. In renovation projects, we work in phases to minimise disruption to ongoing operations." },
    ],
  },
  {
    id:"design", label:"Hospital Design & Architecture",
    questions:[
      { q:"What is the first step in designing a hospital?", a:"The first step is a functional brief, a structured discussion about your clinical vision, patient volume targets, service mix, bed count, future expansion plans, and site constraints. Before any drawing is made, we need to understand what the hospital needs to do operationally. Skipping the functional brief and jumping straight to drawings is one of the most common and expensive mistakes in hospital projects." },
      { q:"How much space is required per bed in a hospital?", a:"As a general benchmark, hospitals require approximately 600 to 1,000 square feet of built-up area per bed, including all supporting spaces such as OPD, diagnostics, OT, ICU, pharmacy, admin, and circulation. The actual requirement depends on your specialty mix, bed count, NABH compliance level, and state-specific regulations." },
      { q:"What is zoning in hospital design and why does it matter?", a:"Zoning refers to the grouping of spaces based on infection risk, access levels, and operational relationships, unrestricted (public), semi-restricted (clinical), and restricted (sterile: OT, ICU). Correct zoning prevents cross-contamination, improves infection control, ensures efficient staff workflows, and is a core requirement for NABH accreditation." },
      { q:"Can ARCHORA design a hospital if we already have drawings from another firm?", a:"Yes. We can review your existing drawings and provide a detailed assessment covering clinical workflow efficiency, NABH compliance gaps, infection control zoning, MEP integration, and future scalability. In most cases, our reviews identify 10–20 critical improvements that save significant costs and prevent operational problems after the hospital opens." },
    ],
  },
  {
    id:"construction", label:"Hospital Construction & Costs",
    questions:[
      { q:"What is the cost of building a hospital in India in 2025?", a:"Hospital construction costs vary significantly. Basic 30–50 bed hospital: ₹50–70 lakh per bed (₹25–45 crore total). Mid-range multispeciality: ₹70–90 lakh per bed (₹45–90 crore). 200-bed multispeciality: ₹80 lakh–₹1 crore+ per bed (₹80–150 crore). Metro/premium specialty: ₹1 crore+ per bed. These figures exclude land cost and GST." },
      { q:"What are the hidden costs in hospital construction most people underestimate?", a:"Commonly underestimated costs include: medical gas pipeline systems, HVAC and laminar airflow, fire detection and suppression, nurse call systems, biomedical waste management, generator and UPS infrastructure (three separate power systems required), NABH compliance upgrades (typically adds 8–12% to total cost), and regulatory approvals and licensing fees. Budget approximately 10–15% of total construction cost for these essential line items." },
      { q:"How long does it take to build a hospital in India?", a:"Small clinic (500–2,000 sq ft): 3–6 months. Standalone diagnostic centre: 4–8 months. 20–30 bed hospital: 12–18 months. 50–100 bed hospital: 18–30 months. 200+ bed multispeciality hospital: 3–5 years. These timelines include design, approvals, construction, and commissioning." },
      { q:"What is a turnkey hospital project?", a:"A turnkey hospital project means ARCHORA manages the entire project from design to commissioning, architecture, structure, interiors, MEP, medical gas, OT and ICU setup, CSSD, and handover. You receive a fully operational, ready-to-use facility with a single point of accountability." },
    ],
  },
  {
    id:"modular-ot", label:"Modular Operation Theatres",
    questions:[
      { q:"What is a modular OT and how is it different from a conventional OT?", a:"A modular OT is a prefabricated, factory-manufactured operation theatre assembled on-site using interlocking wall, ceiling, and floor panels. Modular OTs are faster to install (4–8 weeks vs. months), have seamless antimicrobial surfaces, are designed to meet NABH and ASHRAE infection control standards by default, and allow future reconfiguration." },
      { q:"How much does a modular OT cost in India?", a:"Basic modular OTs start at approximately ₹50–70 lakh for a standard major OT, excluding civil works and medical equipment. Costs scale with size, HVAC integration, laminar airflow specifications, and number of OTs. ARCHORA provides detailed scope-based quotations after a site assessment." },
      { q:"Is a modular OT NABH compliant?", a:"Yes, when properly designed and installed. NABH requires seamless non-porous surfaces, dedicated AHUs with HEPA filtration, proper air pressure differentials, antifungal finishes, touchless doors, and specific minimum air changes. ARCHORA's modular OT designs are built to comply with these requirements, and post-installation validation is included." },
    ],
  },
  {
    id:"nabh", label:"NABH Compliance",
    questions:[
      { q:"What is NABH and why is it important for hospitals in India?", a:"NABH (National Accreditation Board for Hospitals & Healthcare Providers) is India's premier hospital accreditation body. NABH accreditation is required for empanelment with most insurance companies including Ayushman Bharat, builds patient trust, differentiates your facility from non-accredited competitors, and is mandatory for many government tenders and PPP healthcare contracts." },
      { q:"Does NABH compliance increase construction cost?", a:"Yes, NABH 6th Edition standards increase total hospital construction cost by approximately 8–12%. This includes requirements for digital systems, tele-ICU infrastructure, advanced HVAC, and cybersecurity provisions. However, the long-term business value, insurance empanelment, premium positioning, and operational quality, far outweighs the additional upfront investment." },
      { q:"Can ARCHORA design a facility that is ready for NABH accreditation from day one?", a:"Yes. ARCHORA designs all hospital and healthcare facilities with NABH compliance built into the design from the very beginning, not retrofitted after construction. This approach is significantly more cost-effective than completing a conventional build and then making expensive changes to meet accreditation requirements." },
    ],
  },
  {
    id:"getting-started", label:"Getting Started with ARCHORA",
    questions:[
      { q:"Is the initial consultation with ARCHORA free?", a:"Yes. Our initial project consultation is completely free of charge. We use this conversation to understand your vision, project scale, location, timeline, and budget expectations, and to give you an honest assessment of what your project involves. There is no obligation after the consultation." },
      { q:"Can ARCHORA help with a project that has already started but run into problems?", a:"Yes. We are regularly brought in to rescue projects that have stalled, run into regulatory issues, or require design corrections mid-construction. If your project is facing challenges (design, compliance, contractor, or budget related) speak to our team. We will assess the current status honestly and recommend the most efficient path forward." },
      { q:"What information should I prepare before speaking to ARCHORA?", a:"It helps to have a rough idea of: project type (hospital, clinic, OT, ICU, IVF lab), intended bed count or scale, site location and status, target timeline, approximate budget range, and any specific regulatory requirements. You do not need to have all of this ready, our team is experienced at helping clients clarify their own requirements." },
    ],
  },
];

const privacySections = [
  { num:"01", title:"Introduction", content:"Welcome to ARCHORA. We are a healthcare infrastructure company based in 903 Niramaya Heights, Parsik Nagar, Kalwa, Thane East, Thane: 400605, Maharashtra, India, operating through www.archora.in. We are committed to protecting your personal information and your right to privacy." },
  { num:"02", title:"Information We Collect", content:"When you visit our Website or contact us, we may collect: Full Name, Phone Number, Email Address (provided through enquiry forms), Project Details (voluntarily shared), and Usage Data (browser type, device, pages visited) through analytics tools. We do not collect sensitive personal data such as financial information, government identification, or medical records." },
  { num:"03", title:"How We Use Your Information", content:"We use collected information to: respond to your project enquiry or consultation request, schedule site visits, meetings, and consultations, send you relevant information about our services, improve our Website experience, and comply with legal and regulatory obligations. We do not sell, rent, or trade your personal information to any third party." },
  { num:"04", title:"Cookies", content:"Our Website may use essential cookies (necessary for Website function) and analytics cookies (to understand visitor behaviour via Google Analytics). You can control or disable cookies through your browser settings. When Google Ads and Meta Ads go live, this policy will be updated to include advertising cookies." },
  { num:"05", title:"Data Security", content:"We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, misuse, or disclosure. However, no method of internet transmission is 100% secure. While we strive to protect your data, we cannot guarantee absolute security." },
  { num:"06", title:"Your Rights", content:"You have the right to: access the personal information we hold about you, correct inaccurate or incomplete information, request deletion of your personal information, withdraw consent to our use of your data at any time, and object to how we process your data. To exercise any of these rights, contact us at contact@archora.in." },
  { num:"07", title:"Contact Us", content:"ARCHORA Healthcare Infrastructure, 903 Niramaya Heights, Parsik Nagar, Kalwa, Thane East, Thane: 400605, Maharashtra, India. Email: contact@archora.in | archoraofficial@gmail.com | Phone: +91 72184 44700 | Website: www.archora.in. Last Updated: May 2025." },
];

// ─────────────────────────────────────────────
// FAQ ACCORDION
// ─────────────────────────────────────────────
function FAQItem({ q, a, index }: { q:string; a:string; index:number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:0.45, delay:index*0.04 }}
      style={{ borderBottom:"1px solid rgba(75,204,212,0.1)" }}
    >
      <button onClick={() => setOpen(o => !o)}
        style={{ width:"100%", display:"flex", alignItems:"flex-start", justifyContent:"space-between",
          gap:16, padding:"20px 0", background:"transparent", border:"none", cursor:"pointer", textAlign:"left" }}>
        <span style={{ color:open ? C.teal : "rgba(255,255,255,0.82)", fontSize:17,
          fontFamily:"Calibri, Arial, sans-serif", fontWeight:400, lineHeight:1.4,
          transition:"color 0.3s", flex:1 }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration:0.3 }}
          style={{ color:"rgba(75,204,212,0.6)", fontSize:24, lineHeight:1, flexShrink:0,
            marginTop:1, fontFamily:"Calibri, Arial, sans-serif" }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
            exit={{ opacity:0, height:0 }} transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
            style={{ overflow:"hidden" }}>
            <p style={{ color:"rgba(255,255,255,0.65)", fontSize:16,lineHeight:1.85,
              paddingBottom:20, fontFamily:"Calibri, Arial, sans-serif" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export function WhyUs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [faqSearch, setFaqSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"faq"|"privacy">(searchParams.get("tab") === "privacy" ? "privacy" : "faq");

  useEffect(() => {
    if (searchParams.get("tab") === "privacy") setActiveTab("privacy");
  }, [searchParams]);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroY = useTransform(scrollYProgress, [0,1], ["0%","22%"]);

  const filteredSections = faqSections.map(s => ({
    ...s,
    questions: s.questions.filter(item =>
      !faqSearch ||
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
    ),
  })).filter(s => s.questions.length > 0);

  return (
    <>
      <Helmet>
        <title>Why Choose ARCHORA, Healthcare Infrastructure Specialists | India</title>
        <meta name="description" content="ARCHORA is India's dedicated healthcare infrastructure partner." />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"FAQPage",
          "mainEntity": faqSections.flatMap(s => s.questions.map(item => ({
            "@type":"Question","name":item.q,
            "acceptedAnswer":{"@type":"Answer","text":item.a}
          })))
        })}</script>
      </Helmet>

      <div style={{ fontFamily:"Calibri, Arial, sans-serif", overflowX:"hidden", background:C.cream }}>
        <style>{`
          @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        `}</style>

        {/* ══════════════════════════════════════
            1. HERO, dark navy
        ══════════════════════════════════════ */}
        <section ref={heroRef} style={{ position:"relative", minHeight:"72vh", overflow:"hidden" }}>
          <motion.div style={{ position:"absolute", inset:0, y:heroY }}>
            <img
              src="/images/hero/why-us-hero.jpg"
              alt="ARCHORA healthcare infrastructure"
              style={{ width:"100%", height:"115%", objectFit:"cover", objectPosition:"center 35%" }}
              fetchPriority="high"
            />
          </motion.div>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(115deg,rgba(4,28,46,0.6) 0%,rgba(4,28,46,0.36) 55%,rgba(4,28,46,0.1) 100%)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(4,28,46,0.42) 0%,transparent 45%)" }}/>
          {[220,140,80].map((size,i) => (
            <div key={size} style={{ position:"absolute", top:"18%", right:"9%",
              width:size, height:size, border:`1px solid rgba(75,204,212,${0.06+i*0.03})`,
              borderRadius:"50%", pointerEvents:"none",
              animation: `${i%2===0?"spinCW":"spinCCW"} ${70-i*15}s linear infinite`,
              willChange: "transform" }}/>
          ))}
          <div style={{ position:"relative", maxWidth:1280, margin:"0 auto",
            padding:"160px 80px 90px", zIndex:10 }}>
            <motion.div initial={{ opacity:0, y:48 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:1, ease:[0.22,1,0.36,1] }} style={{ maxWidth:720 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
                <span style={{ color:"rgba(255,255,255,0.90)", fontSize:15, fontWeight:700, letterSpacing:"0.32em",
                  textTransform:"uppercase", fontFamily:"Calibri, Arial, sans-serif" }}>
                  Healthcare Infrastructure Partner · India
                </span>
              </div>
              <h1 style={{ fontSize:"clamp(2.6rem, 4.5vw, 4.4rem)", color:C.white, lineHeight:1.1,
                marginBottom:24, fontFamily:"Calibri, Arial, sans-serif", fontWeight:600 }}>
                Most Hospital Projects<br />Go Wrong Before<br />
                <em style={{ color:C.teal }}>a Single Brick Is Laid.</em>
              </h1>
              <p style={{ fontSize:18, color:"rgba(255,255,255,0.72)", lineHeight:1.85, maxWidth:560, marginBottom:16 }}>
                Wrong zoning. Missing NABH requirements. MEP designed for offices, not OTs.
                Most healthcare projects are handed to architects who treat a hospital like any other
                building, and the client pays for it twice: once for the build, and again for the retrofit.
              </p>
              <p style={{ fontSize:17, color:"rgba(75,204,212,0.75)", lineHeight:1.7, maxWidth:520, marginBottom:40,
                fontFamily:"Calibri, Arial, sans-serif", fontStyle:"italic" }}>
                ARCHORA exists so that never happens to you.
              </p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <button onClick={() => navigate("/contact")} style={{ padding:"13px 30px", background:C.blue, color:C.white, border:"none",
                  fontSize:13, letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer" }}>
                  Book a Free Consultation →
                </button>
                <button onClick={() => navigate("/our-flow")} style={{ padding:"13px 30px", background:"transparent", color:"rgba(255,255,255,0.7)",
                  border:"1px solid rgba(255,255,255,0.25)", fontSize:13, letterSpacing:"0.18em",
                  textTransform:"uppercase", fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer" }}>
                  See How We Work
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            2. PILLARS, deep dark #060f1e
        ══════════════════════════════════════ */}
        <section style={{ background:C.dark, padding:"120px 0", position:"relative", overflow:"hidden" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 80px", position:"relative" }}>
            <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.8 }}
              style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between",
                marginBottom:80, borderBottom:"1px solid rgba(75,204,212,0.1)", paddingBottom:40 }}>
              <div>
                <SectionLabel text="Why ARCHORA" light/>
                <h2 style={{ color:C.white, fontSize:"clamp(2rem,3.2vw,2.8rem)", fontWeight:400, margin:0,
                  fontFamily:"Calibri, Arial, sans-serif", lineHeight:1.1 }}>
                  The Four Reasons<br /><em style={{ color:C.teal }}>Specialists Beat Generalists.</em>
                </h2>
              </div>
              <p style={{ color:"rgba(255,255,255,0.45)", fontSize:16, lineHeight:1.8,
                maxWidth:320, margin:0, textAlign:"right" }}>
                Every pillar reflects a decision we made about what kind of company ARCHORA would be, and what it would never be.
              </p>
            </motion.div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
              borderTop:"1px solid rgba(75,204,212,0.08)" }}>
              {pillars.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:"-40px" }}
                  transition={{ duration:0.7, delay:i*0.12 }}
                  style={{ padding:"48px 36px 44px",
                    borderRight: i < 3 ? "1px solid rgba(75,204,212,0.08)" : "none",
                    position:"relative", cursor:"default", transition:"background 0.4s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(75,204,212,0.04)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}>
                  <span style={{ position:"absolute", top:24, right:28, fontFamily:"Calibri, Arial, sans-serif",
                    fontSize:13, color:"rgba(75,204,212,0.2)", letterSpacing:"0.12em" }}
                    aria-hidden="true">{p.num}</span>
                  <div style={{ marginBottom:32 }}>
                    <div style={{ fontSize:"clamp(2.8rem,3.5vw,3.8rem)",
                      color: i % 2 === 0 ? C.teal : "rgba(255,255,255,0.9)",
                      fontFamily:"Calibri, Arial, sans-serif",
                      fontWeight:400, lineHeight:1, marginBottom:6 }}>{p.stat}</div>
                    <div style={{ fontSize:13, color:"rgba(75,204,212,0.5)", fontFamily:"Calibri, Arial, sans-serif",
                      letterSpacing:"0.22em", textTransform:"uppercase" }}>{p.statLabel}</div>
                  </div>
                  <div style={{ width:32, height:2, background: i % 2 === 0 ? C.teal : C.blue, marginBottom:24 }}/>
                  <h3 style={{ color:C.white, fontSize:19, marginBottom:14,
                    fontFamily:"Calibri, Arial, sans-serif", fontWeight:400, lineHeight:1.3 }}>{p.title}</h3>
                  <p style={{ color:"rgba(255,255,255,0.55)", fontSize:16, lineHeight:1.85, margin:0 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ duration:0.8, delay:0.4 }}
              style={{ borderTop:"1px solid rgba(75,204,212,0.08)", padding:"28px 0 0",
                display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
              <p style={{ color:"rgba(255,255,255,0.35)", fontSize:14, fontFamily:"Calibri, Arial, sans-serif",
                letterSpacing:"0.12em", margin:0 }}>
                Headquartered in Thane · Pan-India delivery · Healthcare only since founding
              </p>
              <button onClick={() => navigate("/facilities")} style={{ padding:"10px 24px", background:"transparent",
                color:"rgba(75,204,212,0.65)", border:"1px solid rgba(75,204,212,0.2)",
                fontSize:13, letterSpacing:"0.18em", textTransform:"uppercase",
                fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer" }}>
                See Our Projects →
              </button>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. COMPARISON, cream light
        ══════════════════════════════════════ */}
        <section style={{ background:C.creamAlt, padding:"110px 0", position:"relative", overflow:"hidden" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 80px", position:"relative" }}>
            <motion.div style={{ marginBottom:64 }}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.8 }}>
              <SectionLabel text="The ARCHORA Difference"/>
              <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:40 }}>
                <h2 style={{ color:C.navy, fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:400,
                  fontFamily:"Calibri, Arial, sans-serif", margin:0, lineHeight:1.1 }}>
                  ARCHORA vs.<br /><em>a General Architect.</em>
                </h2>
                <p style={{ color:"#4a5a6a", fontSize:16, lineHeight:1.8, maxWidth:360, margin:0 }}>
                  The difference between a specialist and a generalist learning on your project, and your budget.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.8 }}
              style={{ overflow:"hidden" }}>

              {/* Header */}
              <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", marginBottom:2 }}>
                <div style={{ padding:"14px 0" }}/>
                <div style={{ padding:"18px 28px", background:C.red, textAlign:"center" }}>
                  <span style={{ color:"rgba(255,255,255,0.9)", fontSize:13, fontFamily:"Calibri, Arial, sans-serif",
                    letterSpacing:"0.18em", textTransform:"uppercase" }}>General Architect</span>
                </div>
                <div style={{ padding:"18px 28px", background:C.blue, textAlign:"center" }}>
                  <span style={{ color:C.white, fontSize:13, fontFamily:"Calibri, Arial, sans-serif",
                    letterSpacing:"0.18em", textTransform:"uppercase" }}>ARCHORA</span>
                </div>
              </div>

              {comparison.map((row, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.05 }}
                  style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", marginBottom:2 }}>
                  {/* Attribute */}
                  <div style={{ padding:"20px 24px 20px 0", display:"flex", alignItems:"center",
                    borderBottom:`1px solid rgba(27,108,168,0.1)` }}>
                    <span style={{ color:C.navy, fontSize:16,
                      fontFamily:"Calibri, Arial, sans-serif" }}>{row.attr}</span>
                  </div>
                  {/* General */}
                  <div style={{ padding:"20px 28px", background:"rgba(192,57,43,0.05)",
                    borderBottom:"1px solid rgba(192,57,43,0.08)",
                    display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ width:18, height:18, borderRadius:"50%",
                      background:"rgba(192,57,43,0.12)", display:"flex", alignItems:"center",
                      justifyContent:"center", flexShrink:0, fontSize:12, color:C.red }}>✕</span>
                    <span style={{ color:"rgba(192,57,43,0.85)", fontSize:15 }}>{row.general}</span>
                  </div>
                  {/* ARCHORA */}
                  <div style={{ padding:"20px 28px", background:"rgba(27,108,168,0.05)",
                    borderBottom:"1px solid rgba(27,108,168,0.08)",
                    display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ width:18, height:18, borderRadius:"50%",
                      background:"rgba(27,108,168,0.12)", display:"flex", alignItems:"center",
                      justifyContent:"center", flexShrink:0, fontSize:12, color:C.blue }}>✓</span>
                    <span style={{ color:C.navy, fontSize:15, fontWeight:400 }}>{row.archora}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA strip below table */}
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:0.3 }}
              style={{ marginTop:40, padding:"28px 36px",
                background:C.navy, display:"flex", alignItems:"center",
                justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
              <p style={{ color:"rgba(255,255,255,0.7)", fontSize:16, margin:0, lineHeight:1.6,
                fontFamily:"Calibri, Arial, sans-serif", fontStyle:"italic", maxWidth:480 }}>
                "A general architect discovers NABH requirements after construction. ARCHORA builds them in from sketch one."
              </p>
              <button onClick={() => navigate("/contact")} style={{ padding:"12px 28px", background:C.blue, color:C.white, border:"none",
                fontSize:13, letterSpacing:"0.18em", textTransform:"uppercase",
                fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer", flexShrink:0 }}>
                Talk to a Specialist →
              </button>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. WHO WE SERVE, deep dark slate
        ══════════════════════════════════════ */}
        <section style={{ background:C.slate, padding:"110px 0", position:"relative", overflow:"hidden" }}>

          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 80px", position:"relative" }}>
            <motion.div style={{ marginBottom:72 }}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.8 }}>
              <SectionLabel text="Who We Work With" light/>
              <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:40 }}>
                <h2 style={{ color:C.white, fontSize:"clamp(1.9rem,3.2vw,3rem)", fontWeight:400,
                  fontFamily:"Calibri, Arial, sans-serif", margin:0, lineHeight:1.1 }}>
                  Built for Every<br /><em style={{ color:C.teal }}>Healthcare Promoter.</em>
                </h2>
                <p style={{ color:"rgba(255,255,255,0.45)", fontSize:16, lineHeight:1.8,
                  maxWidth:360, margin:0 }}>
                  Whether you're starting from scratch or need specialist expertise at a critical stage, same depth, every client.
                </p>
              </div>
            </motion.div>

            {/* 3-col cards, dark glass style */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1,
              background:"rgba(75,204,212,0.06)" }}>
              {audiences.map((a, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:"-40px" }}
                  transition={{ duration:0.6, delay:(i%3)*0.1 }}
                  style={{ background:C.slate, padding:"40px 36px 36px",
                    cursor:"default", transition:"all 0.35s", position:"relative", overflow:"hidden" }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = "#122030";
                    el.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = C.slate;
                    el.style.transform = "translateY(0)";
                  }}>
                  {/* Top accent bar */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
                    background: i % 2 === 0
                      ? "linear-gradient(90deg, rgba(75,204,212,0.6), transparent)"
                      : "linear-gradient(90deg, rgba(27,108,168,0.6), transparent)" }}/>

                  <h3 style={{ color:C.white, fontSize:19, marginBottom:12,
                    fontFamily:"Calibri, Arial, sans-serif", fontWeight:400 }}>{a.label}</h3>
                  <p style={{ color:"rgba(255,255,255,0.55)", fontSize:16, lineHeight:1.8, margin:"0 0 24px" }}>{a.desc}</p>

                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ width:20, height:1, background:"rgba(75,204,212,0.35)" }}/>
                    <span style={{ color:"rgba(75,204,212,0.65)", fontSize:13, fontFamily:"Calibri, Arial, sans-serif",
                      letterSpacing:"0.18em", textTransform:"uppercase" }}>Learn More →</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. FOUNDER QUOTE, cream break
        ══════════════════════════════════════ */}
        <section style={{ background:C.cream, padding:"96px 0", position:"relative", overflow:"hidden" }}>
          <div style={{ maxWidth:960, margin:"0 auto", padding:"0 80px", textAlign:"center", position:"relative" }}>
            <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.9 }}>
              <div style={{ display:"flex", justifyContent:"center", marginBottom:32 }}>
                <MedicalCross size={28} color={C.blue} opacity={0.4}/>
              </div>
              <blockquote style={{ fontFamily:"Calibri, Arial, sans-serif",
                fontSize:"clamp(1.7rem,2.8vw,2.6rem)", color:C.navy,
                fontWeight:400, fontStyle:"italic", lineHeight:1.55, margin:"0 0 32px" }}>
                "In tier 2 and tier 3 cities across India, brilliant doctors with real vision are hiring general architects
                and paying for it twice, once for the wrong design and once for the retrofit. That gap is why ARCHORA exists."
              </blockquote>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
                <div style={{ width:40, height:1, background:C.blue, opacity:0.3 }}/>
                <span style={{ color:C.blue, fontSize:13, fontFamily:"Calibri, Arial, sans-serif",
                  letterSpacing:"0.18em", textTransform:"uppercase", opacity:0.7 }}>
                  Prasad Patil, Founder & CEO, ARCHORA
                </span>
                <div style={{ width:40, height:1, background:C.blue, opacity:0.3 }}/>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            6. FAQ + PRIVACY, deep dark
        ══════════════════════════════════════ */}
        <section id="faq" style={{ background:C.dark, padding:"120px 0", position:"relative", overflow:"hidden" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 80px", position:"relative" }}>
            <motion.div style={{ marginBottom:56 }}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.8 }}>
              <SectionLabel text="Knowledge Centre" light/>
              <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
                <h2 style={{ color:C.white, fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:400,
                  fontFamily:"Calibri, Arial, sans-serif", margin:0, lineHeight:1.1 }}>
                  Everything You Need to Know<br /><em style={{ color:C.teal }}>About Healthcare Infrastructure.</em>
                </h2>
                <div style={{ display:"flex", gap:2 }}>
                  {(["faq","privacy"] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      style={{ padding:"10px 24px", fontSize:13, letterSpacing:"0.18em",
                        textTransform:"uppercase", fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer",
                        border:"1px solid rgba(75,204,212,0.25)", transition:"all 0.25s",
                        background: activeTab===tab ? C.blue : "transparent",
                        color: activeTab===tab ? C.white : "rgba(75,204,212,0.65)" }}>
                      {tab==="faq" ? "44 FAQs" : "Privacy Policy"}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === "faq" && (
                <motion.div key="faq" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }}>
                  <div style={{ position:"relative", marginBottom:48 }}>
                    <input type="text" placeholder="Search questions..."
                      value={faqSearch} onChange={e => setFaqSearch(e.target.value)}
                      style={{ width:"100%", padding:"16px 56px 16px 20px",
                        background:"rgba(255,255,255,0.04)", border:"1px solid rgba(75,204,212,0.2)",
                        color:C.white, fontSize:16, fontFamily:"Calibri, Arial, sans-serif",
                        outline:"none", boxSizing:"border-box" }}/>
                    <span style={{ position:"absolute", right:20, top:"50%", transform:"translateY(-50%)",
                      color:"rgba(75,204,212,0.4)", fontSize:18, fontFamily:"Calibri, Arial, sans-serif" }}>⌕</span>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:48 }}>
                    {faqSections.map(s => (
                      <button key={s.id}
                        onClick={() => { setFaqSearch(""); document.getElementById(`faq-${s.id}`)?.scrollIntoView({ behavior:"smooth", block:"start" }); }}
                        style={{ padding:"6px 14px", background:"rgba(75,204,212,0.06)",
                          border:"1px solid rgba(75,204,212,0.18)", color:"rgba(75,204,212,0.65)",
                          fontSize:13, letterSpacing:"0.16em", textTransform:"uppercase",
                          fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer", transition:"all 0.2s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(75,204,212,0.12)"; (e.currentTarget as HTMLButtonElement).style.color=C.teal; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(75,204,212,0.06)"; (e.currentTarget as HTMLButtonElement).style.color="rgba(75,204,212,0.65)"; }}
                      >{s.label}</button>
                    ))}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:40, alignItems:"start" }}>
                    <div style={{ position:"sticky", top:100 }}>
                      {faqSections.map(s => (
                        <button key={s.id} onClick={() => { setActiveSection(s.id); setFaqSearch(""); }}
                          style={{ display:"block", width:"100%", textAlign:"left",
                            padding:"12px 16px", marginBottom:2,
                            background: activeSection===s.id ? "rgba(75,204,212,0.1)" : "transparent",
                            border:`1px solid ${activeSection===s.id ? "rgba(75,204,212,0.35)" : "rgba(75,204,212,0.08)"}`,
                            color: activeSection===s.id ? C.teal : "rgba(255,255,255,0.5)",
                            fontSize:13, letterSpacing:"0.12em", textTransform:"uppercase",
                            fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer", transition:"all 0.25s" }}
                          onMouseEnter={e => { if (activeSection!==s.id) (e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.75)"; }}
                          onMouseLeave={e => { if (activeSection!==s.id) (e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.5)"; }}
                        >{s.label}</button>
                      ))}
                    </div>
                    <div>
                      {(faqSearch ? filteredSections : (activeSection ? faqSections.filter(s => s.id===activeSection) : faqSections)).map(section => (
                        <div key={section.id} id={`faq-${section.id}`} style={{ marginBottom:48 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24,
                            paddingBottom:14, borderBottom:"1px solid rgba(75,204,212,0.1)" }}>
                            <span style={{ width:24, height:1, background:"rgba(75,204,212,0.5)" }}/>
                            <span style={{ color:"rgba(75,204,212,0.75)", fontSize:13, letterSpacing:"0.24em",
                              textTransform:"uppercase", fontFamily:"Calibri, Arial, sans-serif" }}>{section.label}</span>
                          </div>
                          {section.questions.map((item, qi) => (
                            <FAQItem key={qi} q={item.q} a={item.a} index={qi}/>
                          ))}
                          <div style={{ marginTop:24, padding:"14px 20px",
                            background:"rgba(75,204,212,0.04)", border:"1px solid rgba(75,204,212,0.1)",
                            display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                            <span style={{ color:"rgba(255,255,255,0.5)", fontSize:15 }}>Still have questions?</span>
                            <button onClick={() => navigate("/contact")} style={{ padding:"8px 18px", background:"transparent",
                              color:"rgba(75,204,212,0.75)", border:"1px solid rgba(75,204,212,0.25)",
                              fontSize:13, letterSpacing:"0.16em", textTransform:"uppercase",
                              fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer" }}>
                              Talk to our team →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "privacy" && (
                <motion.div key="privacy" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:40, alignItems:"start" }}>
                    <div style={{ position:"sticky", top:100 }}>
                      <p style={{ color:"rgba(75,204,212,0.6)", fontSize:13, letterSpacing:"0.22em",
                        textTransform:"uppercase", fontFamily:"Calibri, Arial, sans-serif", marginBottom:16 }}>Contents</p>
                      {privacySections.map(s => (
                        <button key={s.num}
                          onClick={() => document.getElementById(`privacy-${s.num}`)?.scrollIntoView({ behavior:"smooth", block:"start" })}
                          style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left",
                            padding:"10px 14px", marginBottom:2, background:"transparent",
                            border:"1px solid rgba(75,204,212,0.08)", color:"rgba(255,255,255,0.5)",
                            fontSize:13, letterSpacing:"0.1em", fontFamily:"Calibri, Arial, sans-serif",
                            cursor:"pointer", transition:"all 0.25s" }}
                          onMouseEnter={e => { const b=e.currentTarget as HTMLButtonElement; b.style.color="rgba(75,204,212,0.8)"; b.style.borderColor="rgba(75,204,212,0.25)"; }}
                          onMouseLeave={e => { const b=e.currentTarget as HTMLButtonElement; b.style.color="rgba(255,255,255,0.5)"; b.style.borderColor="rgba(75,204,212,0.08)"; }}>
                          <span style={{ color:"rgba(75,204,212,0.5)", fontSize:12 }}>{s.num}</span>{s.title}
                        </button>
                      ))}
                      <div style={{ marginTop:20, padding:"14px", background:"rgba(75,204,212,0.04)",
                        border:"1px solid rgba(75,204,212,0.1)" }}>
                        <p style={{ color:"rgba(75,204,212,0.6)", fontSize:12, fontFamily:"Calibri, Arial, sans-serif",
                          letterSpacing:"0.12em", margin:"0 0 4px" }}>LAST UPDATED</p>
                        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:14, margin:0 }}>May 2025</p>
                      </div>
                    </div>
                    <div>
                      {privacySections.map((s, i) => (
                        <motion.div key={s.num} id={`privacy-${s.num}`}
                          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                          viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.05 }}
                          style={{ marginBottom:40, paddingBottom:40, borderBottom:"1px solid rgba(75,204,212,0.08)" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:16 }}>
                            <span style={{ fontFamily:"Calibri, Arial, sans-serif",
                              fontSize:32, color:"rgba(75,204,212,0.15)", lineHeight:1 }}>{s.num}</span>
                            <h3 style={{ color:C.white, fontSize:21,
                              fontFamily:"Calibri, Arial, sans-serif",
                              fontWeight:400, margin:0 }}>{s.title}</h3>
                          </div>
                          <p style={{ color:"rgba(255,255,255,0.62)", fontSize:16, lineHeight:1.85, margin:0 }}>{s.content}</p>
                        </motion.div>
                      ))}
                      <div style={{ padding:"24px 28px", background:"rgba(75,204,212,0.04)",
                        border:"1px solid rgba(75,204,212,0.12)" }}>
                        <p style={{ color:"rgba(75,204,212,0.75)", fontSize:13, letterSpacing:"0.22em",
                          textTransform:"uppercase", fontFamily:"Calibri, Arial, sans-serif", marginBottom:8 }}>Terms of Use</p>
                        <p style={{ color:"rgba(255,255,255,0.58)", fontSize:15, lineHeight:1.8, margin:"0 0 16px" }}>
                          By accessing or using www.archora.in, you agree to our Terms of Use. All content on this Website
                          is the intellectual property of ARCHORA and protected under applicable Indian and international
                          copyright laws. A formal engagement begins only upon execution of a written agreement between
                          you and ARCHORA. These Terms are governed by the laws of India and subject to the exclusive
                          jurisdiction of courts in Thane, Maharashtra.
                        </p>
                        <p style={{ color:"rgba(255,255,255,0.35)", fontSize:13, fontFamily:"Calibri, Arial, sans-serif",
                          letterSpacing:"0.08em", margin:0 }}>
                          Last Updated: May 2025 · Governing Law: India · Jurisdiction: Thane, Maharashtra
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ══════════════════════════════════════
            7. FINAL CTA, navy mid
        ══════════════════════════════════════ */}
        <section style={{ background:C.navy, padding:"120px 0", position:"relative", overflow:"hidden" }}>
          {[700,500,340].map((size,i) => (
            <div key={size} aria-hidden="true"
              style={{ position:"absolute", top:"50%", left:"50%",
                width:size, height:size, marginLeft:-size/2, marginTop:-size/2,
                borderRadius:"50%", border:`1px solid rgba(75,204,212,${0.02+i*0.01})`,
                pointerEvents:"none",
                animation: `${i%2===0?"spinCW":"spinCCW"} ${60+i*20}s linear infinite`,
                willChange: "transform" }}/>
          ))}
          <div style={{ maxWidth:720, margin:"0 auto", padding:"0 80px",
            textAlign:"center", position:"relative", zIndex:10 }}>
            <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.9 }}>
              <SectionLabel text="Get In Touch" light/>
              <h2 style={{ color:C.white, fontSize:"clamp(2.2rem,4.5vw,3.6rem)",
                marginBottom:24, fontWeight:400, lineHeight:1.1,
                fontFamily:"Calibri, Arial, sans-serif" }}>
                Your Hospital Project Deserves<br /><em style={{ color:C.teal }}>Specialists. Not Generalists.</em>
              </h2>
              <p style={{ color:"rgba(255,255,255,0.55)", lineHeight:1.85, fontSize:17,
                maxWidth:480, margin:"0 auto 48px" }}>
                Whether you are starting from zero or at any stage of your healthcare project, ARCHORA is ready to help.
              </p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={() => navigate("/contact")} style={{ padding:"14px 32px", background:C.blue, color:C.white, border:"none",
                  fontSize:13, letterSpacing:"0.18em", textTransform:"uppercase",
                  fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer" }}>
                  Book a Free Consultation →
                </button>
                <button onClick={() => window.open(WHATSAPP_URL, "_blank")} style={{ padding:"14px 32px", background:"transparent",
                  color:"rgba(75,204,212,0.75)", border:"1px solid rgba(75,204,212,0.28)",
                  fontSize:13, letterSpacing:"0.18em", textTransform:"uppercase",
                  fontFamily:"Calibri, Arial, sans-serif", cursor:"pointer" }}>
                  WhatsApp Us
                </button>
              </div>
              <p style={{ color:"rgba(255,255,255,0.25)", marginTop:28, fontSize:13,
                fontFamily:"Calibri, Arial, sans-serif", letterSpacing:"0.1em" }}>
                No obligation · No sales pressure · Honest advice from healthcare infrastructure specialists
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}