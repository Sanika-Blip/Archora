import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  FileText, Building2, Shield, ScrollText, Wrench, Zap,
  Activity, HardHat, Package, ClipboardList, ArrowRight,
  ChevronDown, Users, CheckCircle, Star, TrendingUp, X
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const WHATSAPP_URL = "https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project.";
const FONT = "Calibri, 'Calibri', Arial, sans-serif";

const services = [
  {
    id: "01",
    slug: "feasibility-studies",
    icon: <FileText size={22} />,
    title: "Feasibility Studies & DPRs",
    shortDesc: "Data-backed project validation before you commit capital.",
    description: "Every successful hospital begins with a sound foundation of data and planning. Before a single brick is laid, ARCHORA helps you understand the full picture.",
    whatWeDo: [
      "Site feasibility assessment and land suitability analysis",
      "Healthcare demand and gap analysis for your catchment area",
      "Bed capacity planning and department mix recommendations",
      "Capital cost estimation and infrastructure budget modelling",
      "Preparation of Detailed Project Reports (DPR) for investors, lenders, and promoters",
      "Project phasing and development roadmap",
    ],
    whoFor: "Doctors, healthcare investors, promoters, and institutions planning greenfield or brownfield hospital projects who need a clear, data-backed project plan before committing capital.",
    whyMatters: "A well-prepared DPR reduces financial risk, aligns stakeholders, and gives your project a credible foundation from day one.",
    color: "#4bd1d9",
    image: "/images/services/feasibility-studies.jpg",
  },
  {
    id: "02",
    slug: "healthcare-architecture",
    icon: <Building2 size={22} />,
    title: "Healthcare Architecture & Clinical Space Planning",
    shortDesc: "Every square foot designed to serve a clinical purpose.",
    description: "Architecture for healthcare is fundamentally different from any other building type. Every corridor, zone, and room placement directly impacts patient safety, infection control, and care delivery.",
    whatWeDo: [
      "Concept design and schematic planning for hospitals, clinics, diagnostic centres, and medical campuses",
      "Clinical space programming, department-wise area requirements and adjacency planning",
      "Patient flow and staff flow optimisation",
      "NABH, NABL, INC, NMC, AERB, PCPNDT, and all relevant compliance-integrated design",
      "Greenfield hospital design (new construction on open land)",
      "Brownfield and adaptive reuse (converting existing buildings into healthcare facilities)",
      "OPD, IPD, emergency, ICU, OT, pharmacy, laboratory, imaging, and support zone planning",
      "Nursing home, clinic, diagnostic centre, medical college, and nursing college design",
    ],
    whoFor: "Any healthcare promoter, doctor, institution, or investor building or renovating a healthcare facility of any scale, from a 200 sq ft clinic to a 1000-bed hospital campus.",
    whyMatters: "Poor space planning in hospitals costs money, compromises patient safety, and creates compliance failures that are expensive to correct after construction. Getting it right at the design stage saves crores downstream.",
    color: "#7eb8f7",
    image: "/images/services/healthcare-architecture.jpg",
  },
  {
    id: "03",
    slug: "regulatory-compliance",
    icon: <Shield size={22} />,
    title: "Regulatory Compliance & Accreditation-Ready Design",
    shortDesc: "Compliance built in from the first drawing. Never retrofitted.",
    description: "Navigating India's healthcare regulatory landscape is complex. Every type of healthcare facility requires a different set of approvals, licences, and design standards.",
    whatWeDo: [
      "NABH, compliance design for hospitals and nursing homes",
      "NABL, compliant laboratory design",
      "INC, norms-compliant design for nursing colleges",
      "NMC / MCI norms, compliant design for medical colleges",
      "AERB guidelines, radiation safety design for radiology, nuclear medicine, and imaging departments",
      "PCPNDT Act compliance for ultrasonography units",
      "NBC (National Building Code) healthcare provisions",
      "Fire NOC design and fire safety system integration",
      "Disability access and barrier-free design as per national standards",
      "Pre-design compliance gap analysis and audit of existing facilities",
    ],
    whoFor: "Any healthcare facility (new or existing) that needs to meet statutory requirements or achieve accreditation.",
    whyMatters: "Compliance is not an add-on. When it is built into the design from day one, it eliminates costly retrofits, licence delays, and accreditation failures.",
    color: "#a78bfa",
    image: "/images/services/regulatory-compliance.jpg",
  },
  {
    id: "04",
    slug: "hospital-licensing",
    icon: <ScrollText size={22} />,
    title: "Hospital Licensing & Approvals Support",
    shortDesc: "Expert guidance through every statutory approval.",
    description: "Getting a hospital project approved in India requires navigating multiple regulatory bodies, municipal, state, central, and sector-specific. ARCHORA guides you through every step.",
    whatWeDo: [
      "Identification of all applicable licences and approvals based on facility type and location",
      "Liaison with municipal corporations, state health departments, and central authorities",
      "Building plan approvals and occupancy certificates",
      "Fire NOC application and coordination",
      "Preparation and submission of licence applications",
      "Ongoing coordination and follow-up until approvals are secured",
    ],
    whoFor: "Doctors and promoters who want expert guidance through the complex and time-consuming approval process, without the delays that come from navigating it alone.",
    whyMatters: "Licencing delays are one of the most common and costly setbacks in hospital projects. Expert support from the start prevents months of lost time.",
    color: "#f59e0b",
    image: "/images/services/hospital-licensing.jpg",
  },
  {
    id: "05",
    slug: "structural-design",
    icon: <Wrench size={22} />,
    title: "Structural Design for Healthcare Facilities",
    shortDesc: "Engineering built for the unique loads of healthcare.",
    description: "Healthcare buildings carry structural demands that go far beyond standard construction, from floor load capacities for heavy medical equipment to vibration isolation for imaging suites and seismic safety requirements.",
    whatWeDo: [
      "Structural design and engineering for new healthcare buildings",
      "Structural audit and assessment of existing buildings for healthcare conversion",
      "Load-bearing design for heavy medical equipment (CT scanners, MRI machines, radiotherapy equipment, modular OT panels)",
      "Seismic zone-compliant structural planning",
      "Structural coordination with architecture, MEP, and civil execution teams",
    ],
    whoFor: "All healthcare construction projects, new builds, expansions, and adaptive reuse of existing structures.",
    whyMatters: "Structural failures in hospitals are not just costly, they are dangerous. Healthcare-specific structural design ensures safety, longevity, and equipment performance.",
    color: "#34d399",
    image: "/images/services/structural-design.jpg",
  },
  {
    id: "06",
    slug: "mep-engineering",
    icon: <Zap size={22} />,
    title: "MEP Engineering for Healthcare",
    shortDesc: "Mechanical, Electrical & Plumbing, zero tolerance for failure.",
    description: "A hospital's MEP systems are its lifeline. They must operate 24 hours a day, 365 days a year, with zero tolerance for failure. Healthcare MEP is an entirely different discipline from standard building services.",
    whatWeDo: [
      "HVAC design, positive and negative pressure zones, infection control airflow, OT-grade air handling, ICU ventilation",
      "Medical gas pipeline systems (MGPS), oxygen, nitrous oxide, medical air, vacuum, AGSS",
      "Electrical systems, hospital-grade power supply, UPS, essential and critical circuits, generator backup, earthing systems",
      "Plumbing and drainage, hot and cold water systems, medical waste drainage, infection-control compliant pipework",
      "Fire detection and suppression systems, NFPA and NBC compliant",
      "BMS (Building Management Systems), for monitoring and control of all MEP services",
      "Energy efficiency planning, reducing operational costs without compromising clinical standards",
    ],
    whoFor: "Every hospital and healthcare facility, new construction, renovation, or MEP upgrade of existing facilities.",
    whyMatters: "Substandard MEP in hospitals leads to infection outbreaks, equipment failures, fire hazards, and regulatory shutdowns. Healthcare MEP requires specialists, not generalists.",
    color: "#fb923c",
    image: "/images/services/mep-engineering.jpg",
  },
  {
    id: "07",
    slug: "modular-ot-icu",
    icon: <Activity size={22} />,
    title: "Modular OT & ICU Infrastructure",
    shortDesc: "Cleanroom-grade surgical and critical care environments.",
    description: "Operating theatres and intensive care units demand the highest level of engineering precision. They must meet cleanroom standards, support complex medical equipment, and protect patients from infection at every level.",
    whatWeDo: [
      "Modular OT design and installation, laminar flow, positive pressure, ultra-clean air systems",
      "ICU design, open bay, closed bay, single-room ICU configurations",
      "OT complex planning, clean and dirty corridor separation, scrub zones, anaesthesia bays, sterilisation interface",
      "Integrated OT panels, medical gas outlets, electrical services, data and communication points",
      "Flooring, wall, and ceiling systems, seamless, coved, infection-resistant finishes",
      "Commissioning, validation, and performance testing of OT and ICU environments",
      "Renovation and upgrade of existing OTs and ICUs to current standards",
    ],
    whoFor: "Hospitals, nursing homes, day-surgery centres, and any facility building or upgrading surgical and critical care infrastructure.",
    whyMatters: "A poorly designed OT or ICU is a direct patient safety risk. Surgical site infections (SSIs), equipment failures, and compliance shutdowns are the cost of getting this wrong. ARCHORA ensures it is done right.",
    color: "#f43f5e",
    image: "/images/services/modular-ot-icu.jpg",
  },
  {
    id: "08",
    slug: null,
    icon: <HardHat size={22} />,
    title: "Turnkey Civil & Interior Execution",
    shortDesc: "From foundation to finishing, single-window accountability.",
    description: "Design excellence means nothing without execution excellence. ARCHORA manages the full construction and interior fit-out of healthcare facilities, coordinating every trade, every vendor, and every milestone.",
    whatWeDo: [
      "Complete civil construction for healthcare facilities",
      "Healthcare interior design and fit-out",
      "False ceiling, flooring, partition, and wall systems for clinical environments",
      "Infection-control interior finishes, antimicrobial surfaces, seamless flooring, coved skirting",
      "Hospital wayfinding and signage systems",
      "Patient room, ward, OPD, lobby, and corridor interiors",
      "Bill of Quantities (BOQ) preparation and vendor management",
      "Site supervision, quality control, and progress monitoring",
      "Snagging, testing, and commissioning",
    ],
    whoFor: "Healthcare promoters and institutions who want a single point of accountability from foundation to finishing, without the complexity of managing multiple contractors independently.",
    whyMatters: "Healthcare construction requires specialists who understand clinical requirements, infection control standards, and regulatory compliance. A general contractor cannot deliver this. ARCHORA can.",
    color: "#4bd1d9",
    image: "/images/services/turnkey-execution.jpg",
  },
  {
    id: "09",
    slug: null,
    icon: <Package size={22} />,
    title: "Medical Equipment Planning & Procurement",
    shortDesc: "Right equipment, right location, right budget.",
    description: "The right medical equipment in the right location, installed correctly and on budget, is critical to a hospital's clinical performance and financial viability.",
    whatWeDo: [
      "Department-wise medical equipment planning aligned with clinical services mix",
      "Equipment space and utility requirements integrated into architectural design",
      "Budget planning and capital cost optimisation for medical equipment",
      "Vendor identification, comparative evaluation, and procurement support",
      "Installation coordination and supervision",
      "Commissioning and handover support for medical equipment",
      "Future scalability planning, designing spaces that can accommodate equipment upgrades",
    ],
    whoFor: "Hospital promoters, doctors, and investors planning new facilities or upgrading existing ones who need expert guidance on equipment selection, budgeting, and procurement.",
    whyMatters: "Medical equipment is typically 20–35% of a hospital's total capital cost. Without expert planning, promoters overspend, select wrong equipment, or discover too late that their building cannot accommodate what they have purchased.",
    color: "#7eb8f7",
    image: "/images/services/medical-equipment-planning.jpg",
  },
  {
    id: "10",
    slug: null,
    icon: <ClipboardList size={22} />,
    title: "Project Management & Commissioning",
    shortDesc: "On time. On budget. No surprises.",
    description: "Delivering a healthcare facility on time, on budget, and to the right quality standard requires dedicated project management from day one to final handover.",
    whatWeDo: [
      "Project planning, timelines, milestones, resource allocation, and critical path management",
      "Multi-vendor and multi-contractor coordination",
      "BOQ management, variation control, and cost tracking",
      "Site supervision and quality assurance",
      "Design-to-construction coordination, ensuring drawings are built as designed",
      "Regulatory inspection coordination and compliance verification on site",
      "Testing, commissioning, and validation of all building systems",
      "Facility handover documentation and as-built drawings",
      "Post-handover defect liability management",
    ],
    whoFor: "Healthcare promoters and institutions who want a professional project manager to protect their investment, manage their contractors, and deliver their facility without surprises.",
    whyMatters: "Without dedicated project management, healthcare projects routinely exceed budgets by 20–40% and timelines by 6–18 months. ARCHORA's project management protects your investment and your opening date.",
    color: "#a78bfa",
    image: "/images/services/project-management.jpg",
  },
];

const processSteps = [
  { num: "01", title: "Free Consultation", desc: "You tell us about your project, goals, budget, and timeline. We listen and give you an honest initial assessment." },
  { num: "02", title: "Feasibility & Planning", desc: "Site assessment, demand analysis, regulatory review, and cost benchmarking. Clarity before you commit capital." },
  { num: "03", title: "Design & Compliance", desc: "Full design integrating clinical requirements, regulatory compliance, operational efficiency, and budget constraints from day one." },
  { num: "04", title: "Approvals & Licensing", desc: "We support you through every statutory approval and licence, coordinating with all relevant authorities." },
  { num: "05", title: "Construction & Execution", desc: "Full site supervision, quality control, and cost management throughout the build phase." },
  { num: "06", title: "Commissioning & Handover", desc: "Every system commissioned, every environment validated. Operationally ready, fully documented, fully compliant." },
];

const DETAIL_SLUGS = new Set(["01", "02", "03", "04", "05", "06", "07"]);

function ServiceModal({ service, onClose }: { service: (typeof services)[0]; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: "rgba(4,14,26,0.92)", backdropFilter: "blur(16px)" }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto"
          style={{ background: "linear-gradient(145deg,#071e2e,#04141f)", border: `1px solid ${service.color}30`, borderRadius: 4 }}
          initial={{ opacity: 0, y: 48, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ height: "3px", background: `linear-gradient(90deg, ${service.color}, transparent)` }} />
          <button onClick={onClose} className="absolute top-5 right-5 z-10 flex items-center justify-center w-9 h-9 rounded-full" style={{ background: "rgba(255,255,255,0.07)", color: "#fff", border: "none", cursor: "pointer" }}>
            <X size={16} />
          </button>

          <div className="p-8 md:p-10">
            <div className="flex items-start gap-5 mb-8">
              <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", background: `${service.color}18`, border: `1px solid ${service.color}35`, borderRadius: 2, flexShrink: 0, color: service.color }}>
                {service.icon}
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 17, letterSpacing: "3px", textTransform: "uppercase", color: service.color, marginBottom: 8, fontWeight: 600 }}>{service.id}, Service</p>
                <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{service.title}</h2>
              </div>
            </div>

            <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.9, color: "rgba(255,255,255,0.97)", marginBottom: 32, fontWeight: 400 }}>{service.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p style={{ fontFamily: FONT, fontSize: 17, letterSpacing: "3px", textTransform: "uppercase", color: service.color, marginBottom: 16, fontWeight: 600 }}>What We Do</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {service.whatWeDo.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: service.color, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.97)", fontWeight: 400 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ padding: "20px", background: `${service.color}08`, border: `0.5px solid ${service.color}20`, borderRadius: 2 }}>
                  <p style={{ fontFamily: FONT, fontSize: 17, letterSpacing: "3px", textTransform: "uppercase", color: service.color, marginBottom: 10, fontWeight: 600 }}>Who This Is For</p>
                  <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.95)", fontWeight: 400 }}>{service.whoFor}</p>
                </div>
                <div style={{ padding: "20px", background: "rgba(75,209,217,0.05)", border: "0.5px solid rgba(75,209,217,0.15)", borderRadius: 2 }}>
                  <p style={{ fontFamily: FONT, fontSize: 17, letterSpacing: "3px", textTransform: "uppercase", color: "#4bd1d9", marginBottom: 10, fontWeight: 600 }}>Why It Matters</p>
                  <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.95)", fontStyle: "italic", fontWeight: 400 }}>{service.whyMatters}</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "0.5px solid rgba(255,255,255,0.08)", display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => { onClose(); navigate("/contact"); }} style={{ padding: "12px 24px", fontSize: 17, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: FONT, background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", borderRadius: 1 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>
                Book a Free Consultation
              </button>
              <button onClick={onClose} style={{ padding: "12px 24px", fontSize: 17, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "rgba(255,255,255,0.95)", border: "0.5px solid rgba(255,255,255,0.15)", cursor: "pointer", borderRadius: 1 }}>
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ServiceCard({ service, index, onClick }: { service: (typeof services)[0]; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const hasDetailPage = DETAIL_SLUGS.has(service.id);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "linear-gradient(145deg,#071e30,#0a2640)" : "linear-gradient(145deg,#061624,#040e1a)",
        border: `0.5px solid ${hovered ? service.color + "50" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 2,
        padding: "2.2rem 1.8rem",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 48px rgba(4,14,26,0.6), 0 0 0 0.5px ${service.color}30` : "none",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${service.color}, transparent)`, transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s ease" }} />
      <div style={{ position: "absolute", top: 12, right: 16, fontFamily: FONT, fontSize: "4rem", fontWeight: 300, color: `${service.color}08`, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{service.id}</div>

      {hasDetailPage && (
        <div style={{
          position: "absolute", top: 16, right: 16,
          fontFamily: FONT, fontSize: 13, letterSpacing: "2px",
          textTransform: "uppercase", color: service.color,
          background: `${service.color}12`, border: `0.5px solid ${service.color}30`,
          padding: "3px 8px", borderRadius: 1,
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s", fontWeight: 400,
        }}>
          Full Details →
        </div>
      )}

      <div style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", background: `${service.color}12`, border: `0.5px solid ${service.color}25`, borderRadius: 2, marginBottom: "1.5rem", color: service.color, transition: "all 0.3s ease", ...(hovered ? { background: `${service.color}22`, border: `0.5px solid ${service.color}45` } : {}) }}>
        {service.icon}
      </div>

      <p style={{ fontFamily: FONT, fontSize: 15, letterSpacing: "3px", textTransform: "uppercase", color: `${service.color}90`, marginBottom: 10, fontWeight: 600 }}>{service.id}, Service</p>
      <h3 style={{ fontFamily: FONT, fontSize: "1.7rem", fontWeight: 600, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>{service.title}</h3>
      <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.92)", marginBottom: 20, fontWeight: 400 }}>{service.shortDesc}</p>

      <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONT, fontSize: 15, letterSpacing: "2px", textTransform: "uppercase", color: service.color, opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s", fontWeight: 600 }}>
        {hasDetailPage ? "View Full Details" : "Learn More"}
        <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.25 }}>
          <ArrowRight size={13} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProcessStep({ step, index }: { step: (typeof processSteps)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
    >
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#185FA5,#4bd1d9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: 16, fontWeight: 600, color: "#fff", flexShrink: 0 }}>{step.num}</div>
        {index < processSteps.length - 1 && <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(24,95,165,0.4), rgba(24,95,165,0.05))", marginTop: 8 }} />}
      </div>
      <div style={{ paddingTop: 10, paddingBottom: index < processSteps.length - 1 ? 16 : 0 }}>
        <h4 style={{ fontFamily: FONT, fontSize: "1.5rem", fontWeight: 600, color: "#042C53", marginBottom: 8 }}>{step.title}</h4>
        <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.85, color: "#0a1a2a", fontWeight: 400 }}>{step.desc}</p>
      </div>
    </motion.div>
  );
}

export function Services() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

  function handleServiceClick(service: (typeof services)[0]) {
    if (DETAIL_SLUGS.has(service.id) && service.slug) {
      navigate(`/services/${service.slug}`);
    } else {
      setSelectedService(service);
    }
  }

  return (
    <div className="min-h-screen pt-20 archora-page-scope" style={{ overflowX: "hidden", fontFamily: FONT }}>
      <style>{`
        .archora-page-scope * { font-family: Calibri, 'Calibri', Arial, sans-serif !important; }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        .float-anim { animation: floatY 6s ease-in-out infinite; }
        .scroll-bounce { animation: scrollBounce 1.8s ease-in-out infinite; }
        .service-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .process-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 64px; }
        @media (max-width: 768px) { .process-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "72vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <ImageWithFallback
            src="/images/hero/services-hero.jpg"
            alt="Healthcare Infrastructure Services"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(4,18,30,0.6) 0%, rgba(4,18,30,0.34) 55%, rgba(4,18,30,0.1) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(75,209,217,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, zIndex: 2 }}>
          <div style={{ width: 1, height: 64, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4bd1d9" }} />
          <div style={{ width: 1, height: 64, background: "rgba(255,255,255,0.1)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 0 0 4rem", padding: "5rem 5rem 5rem 4.5rem", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ fontFamily: FONT, fontSize: 17, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>Healthcare Infrastructure Services</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: FONT, fontSize: "clamp(2.8rem,4.5vw,5rem)", fontWeight: 600, color: "#fff", lineHeight: 1.08, marginBottom: 28, maxWidth: 700, letterSpacing: "-0.01em" }}
          >
            End-to-End Healthcare Infrastructure.<br />
            <em style={{ fontStyle: "italic", color: "#4bccd4" }}>Designed. Built. Delivered.</em>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }} style={{ fontFamily: FONT, fontSize: 18, lineHeight: 1.9, color: "rgba(255,255,255,0.95)", maxWidth: 560, marginBottom: 44, fontWeight: 400 }}>
            From your first sketch to final handover, ARCHORA is your single-window partner for designing and delivering hospitals, clinics, laboratories, medical colleges, and every form of healthcare infrastructure across India.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })} style={{ padding: "13px 30px", fontSize: 17, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>
              Explore Our Services
            </button>
            <button onClick={() => navigate("/contact")} style={{ padding: "13px 30px", fontSize: 17, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all .25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(75,204,212,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#4bccd4"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>
              Talk to Our Team →
            </button>
          </motion.div>
        </div>

        <motion.div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <span style={{ fontFamily: FONT, fontSize: 15, letterSpacing: "0.28em", color: "rgba(75,204,212,0.4)", textTransform: "uppercase", fontWeight: 400 }}>Scroll</span>
          <div className="scroll-bounce" style={{ color: "rgba(75,204,212,0.4)" }}><ChevronDown size={16} /></div>
        </motion.div>
      </section>

      {/* ── Intro ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#e8f4fd 100%)", padding: "6rem 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 3rem", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p style={{ fontFamily: FONT, fontSize: 39, letterSpacing: "3px", textTransform: "uppercase", color: "#185FA5", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontWeight: 600 }}>
              <span style={{ display: "block", width: 36, height: "0.5px", background: "#185FA5" }} />Who We Are<span style={{ display: "block", width: 36, height: "0.5px", background: "#185FA5" }} />
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,4vw,4rem)", fontWeight: 600, color: "#042C53", marginBottom: 24, lineHeight: 1.15 }}>
              Not a General Architecture Firm.<br /><em style={{ fontStyle: "italic", color: "#185FA5" }}>A Dedicated Healthcare Infrastructure Partner.</em>
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 18, lineHeight: 1.95, color: "#0a1a2a", marginBottom: 16, fontWeight: 400 }}>
              Whether you are a doctor planning your first hospital, a healthcare investor building a multispeciality facility, or an existing hospital looking to expand, renovate, or achieve compliance accreditation, ARCHORA delivers the complete infrastructure solution under one roof.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 18, lineHeight: 1.95, color: "#0a1a2a", fontWeight: 400 }}>
              We combine clinical planning knowledge, regulatory compliance expertise, and full-scale execution capability to deliver facilities that are <strong style={{ color: "#042C53", fontWeight: 600 }}>safe, efficient, and future-ready.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section id="services-grid" style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "7rem 0", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "900px", borderRadius: "50%", background: "radial-gradient(circle, rgba(75,209,217,0.03) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 3rem", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ fontFamily: FONT, fontSize: 39, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(75,209,217,0.6)", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontWeight: 600 }}>
              <span style={{ display: "block", width: 36, height: "0.5px", background: "rgba(75,209,217,0.4)" }} />Our Services<span style={{ display: "block", width: 36, height: "0.5px", background: "rgba(75,209,217,0.4)" }} />
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2.6rem,4.5vw,4.4rem)", fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
              Every Phase of Healthcare Infrastructure.<br /><em style={{ fontStyle: "italic", color: "#4bccd4" }}>Covered.</em>
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 18, color: "rgba(255,255,255,0.90)", maxWidth: 540, margin: "0 auto", lineHeight: 1.85, fontWeight: 400 }}>
              Our services cover every phase of healthcare infrastructure development, from feasibility and design to construction, equipping, and commissioning.
            </p>
          </motion.div>

          <div className="service-card-grid">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
        </div>

        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </section>

      {/* ── How We Work ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#daeef9 50%,#e8f4fd 100%)", padding: "7rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3.5rem" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p style={{ fontFamily: FONT, fontSize: 39, letterSpacing: "3px", textTransform: "uppercase", color: "#185FA5", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontWeight: 600 }}>
              <span style={{ display: "block", width: 36, height: "0.5px", background: "#185FA5" }} />Our Process<span style={{ display: "block", width: 36, height: "0.5px", background: "#185FA5" }} />
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,4vw,4rem)", fontWeight: 600, color: "#042C53", lineHeight: 1.15 }}>
              How ARCHORA Delivers<br /><em style={{ fontStyle: "italic", color: "#185FA5" }}>Your Project</em>
            </h2>
          </motion.div>

          <div className="process-grid">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ marginTop: "4rem", textAlign: "center" }}>
            <button onClick={() => navigate("/contact")} style={{ padding: "14px 36px", fontSize: 17, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "linear-gradient(135deg,#042C53,#185FA5)", color: "#fff", border: "none", cursor: "pointer", transition: "all .25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg,#042C53,#185FA5)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>
              Book a Free Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: "#040e1a", padding: "120px 0", position: "relative", overflow: "hidden" }}>
        {[700, 500, 320, 180].map((size, i) => (
          <motion.div key={size} style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: "50%", border: `1px solid rgba(75,204,212,${0.02 + i * 0.01})`, pointerEvents: "none" }} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }} />
        ))}

        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 3rem", textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: FONT, fontSize: 39, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(75,204,212,0.5)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontWeight: 600 }}>
              <span style={{ display: "block", width: 28, height: "0.5px", background: "rgba(75,204,212,0.4)" }} />Not Sure Which Services You Need?<span style={{ display: "block", width: 28, height: "0.5px", background: "rgba(75,204,212,0.4)" }} />
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2.6rem,4.5vw,4.4rem)", fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>
              Ready to Build Your<br /><em style={{ fontStyle: "italic", color: "#4bccd4" }}>Healthcare Facility?</em>
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 18, color: "rgba(255,255,255,0.90)", lineHeight: 1.9, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px", fontWeight: 400 }}>
              Most of our clients come to us at different stages of their project journey. Wherever you are, talk to us. We will tell you honestly what you need and what you do not.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/contact")} style={{ padding: "14px 32px", fontSize: 17, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>
                Book a Free Consultation
              </button>
              <button onClick={() => window.open(WHATSAPP_URL, "_blank")} style={{ padding: "14px 32px", fontSize: 17, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all .25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(75,204,212,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#4bccd4"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>
                WhatsApp Us
              </button>
              <button onClick={() => navigate("/contact")} style={{ padding: "14px 32px", fontSize: 17, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all .25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(75,204,212,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#4bccd4"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>
                Send an Enquiry →
              </button>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 16, color: "rgba(255,255,255,0.18)", marginTop: 28, letterSpacing: "0.1em", fontWeight: 400 }}>
              No obligation · No sales pressure · Talk to our team today. Just clarity.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}