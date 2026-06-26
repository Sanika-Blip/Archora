import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

const WHATSAPP_URL = "https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project.";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import {
  Target,
  Eye,
  Award,
  Users,
  X,
  BookOpen,
  Briefcase,
  Star,
  ArrowRight,
  Shield,
  TrendingUp,
  Heart,
  ChevronDown,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const leaders = [
  {
    id: 0,
    name: "Prasad Patil",
    role: "Founder & CEO",
    education: "Based in Mumbai, Maharashtra",
    tagline: "One partner, one outcome, one standard of accountability",
    image: "/images/team/prasad-patil.png",
    accentColor: "#7eb8f7",
    stats: [{ label: "Focus", value: "100%" }, { label: "Healthcare", value: "Only" }, { label: "Accountability", value: "Full" }],
    shortBio: "Prasad founded ARCHORA to replace India's fragmented, multi-vendor hospital infrastructure model with one accountable, single-window delivery system.",
    fullBio: [
      "Prasad Patil founded ARCHORA Healthcare Infrastructure to fix what he saw as a structurally broken industry, hospital projects in India are typically split across disconnected vendors for design, compliance, and construction, with no single party accountable for the outcome. ARCHORA was built as the alternative: one team, one contract, one point of accountability from the first brief to final handover.",
      "His academic foundation in supply chain management and global operations (an MSc from Rennes School of Business in France, complemented by an Advanced Strategy programme at Kozminski University in Poland) shaped a systems-level understanding of how complex, multi-party delivery processes fail and how they can be redesigned for accountability. His operational experience managing global vehicle logistics at Stellantis reinforced that thinking at scale, across complex, multicultural operating environments.",
      "As CEO, Prasad leads ARCHORA's strategy, business development, and client relationships, working directly with every client from first enquiry through to delivery. ARCHORA is currently delivering projects across India and expanding toward the MENA region.",
    ],
    credentials: ["Founder & CEO, ARCHORA Healthcare Infrastructure", "MSc Supply Chain Management, Rennes School of Business, France", "Advanced Strategy, Kozminski University, Poland", "Based in Mumbai, Maharashtra"],
    expertise: ["Business Strategy", "Client Relations", "Global Operations", "Single-Window Delivery Model"],
    linkedin: "linkedin.com/in/prasad-patil",
  },
  {
    id: 1,
    name: "Ar. Vivek Patil",
    role: "Director & Principal Architect",
    education: "Based in Kalwa, Thane",
    tagline: "Every design clinically functional, compliant, and buildable",
    image: "/images/team/vivek-patil.png",
    accentColor: "#7eb8f7",
    stats: [{ label: "Focus", value: "100%" }, { label: "Healthcare", value: "Only" }, { label: "Compliance", value: "First" }],
    shortBio: "Ar. Vivek Patil is ARCHORA's Principal Architect, a Registered Architect leading clinical design, NABH-compliant planning, and project delivery across every facility ARCHORA builds.",
    fullBio: [
      "Ar. Vivek Patil is ARCHORA's Director and Principal Architect, leading architecture, clinical design, and project delivery across every facility type the company builds. A Registered Architect with the Council of Architecture India, his early career at Megarch Plus in Thane (working with clients including Reliance Industries, Godrej, and L&T, and contributing to the Navi Mumbai International Airport project) built the large-scale coordination discipline he now applies to healthcare projects.",
      "He later focused his practice entirely on healthcare, developing specialist expertise in NABH and JCI standards, infection control planning, and hospital workflow design. Working freelance with healthcare consultancies across India, he designed everything from small clinics and diagnostic centres to large multi- and super-speciality hospitals.",
      "At ARCHORA, Vivek leads the full design and delivery function (hospital architecture, clinical zone planning, modular OT and ICU design, healthcare MEP engineering, turnkey execution, and equipment planning) guided by one principle: a healthcare facility must first be a clinical instrument.",
    ],
    credentials: ["Director & Principal Architect, ARCHORA", "Registered Architect, Council of Architecture India", "Bachelor of Architecture, Mumbai University", "Based in Kalwa, Thane"],
    expertise: ["Hospital Architecture", "Modular OT & ICU Design", "NABH & JCI Compliance", "Clinical Workflow Planning"],
    linkedin: "linkedin.com/in/ar-vivek-patil",
  },
  {
    id: 2,
    name: "Ar. Aditya Kashikar",
    role: "SME & Head Healthcare Consultant",
    education: "Based in London, United Kingdom",
    tagline: "NHS-level capital planning rigour, rare in the Indian healthcare sector",
    image: "/images/team/aditya-kashikar.png",
    accentColor: "#7eb8f7",
    stats: [{ label: "Experience", value: "17+" }, { label: "NHS", value: "Projects" }, { label: "Countries", value: "2" }],
    shortBio: "Aditya brings 17 years of NHS healthcare capital programme leadership to ARCHORA, currently serving as Associate Director at WSP UK.",
    fullBio: [
      "Ar. Aditya Kashikar is ARCHORA's SME and Head Healthcare Consultant, bringing 17 years of healthcare capital planning and infrastructure programme leadership from the UK's National Health Service to the Indian market. An architect by training with an MSc in Construction Management, Development Economics and International Development from the University of Greenwich, he is also a NEC3/4 Accredited Project Manager and a Member of both the Association for Project Management and the Association of Construction Quality Professionals.",
      "As Associate Director at WSP, one of the world's leading engineering and professional services firms, his portfolio has spanned new-build inpatient facilities, a COVID-19 Lighthouse Testing Laboratory, pathology service centralisation, and ward remodelling and bed capacity programmes across NHS trusts including Imperial College Healthcare, Barts Health, and St George's University Hospitals, plus a secondment to the Palace of Westminster Restoration and Renewal Programme.",
      "At ARCHORA, Aditya provides the advisory layer behind every project's capital planning, clinical briefing, governance, and risk management, bringing the same standard of programme discipline applied to NHS hospital projects for nearly two decades to ARCHORA's clients in India.",
    ],
    credentials: ["Associate Director, WSP (UK)", "NEC3/4 Accredited Project Manager", "MAPM & MACQP", "Based in London, United Kingdom"],
    expertise: ["Healthcare Capital Planning", "NHS Programme Governance", "Contract & Procurement Strategy", "Risk & Change Management"],
    linkedin: "linkedin.com/in/aditya-kashikar",
  },
  {
    id: 3,
    name: "Dr. Kalpesh Tarmale",
    role: "Healthcare Advisor",
    education: "Based in Vasind, Thane District",
    tagline: "The practitioner's voice behind every clinical design decision",
    image: "/images/team/kalpesh.png",
    accentColor: "#7eb8f7",
    stats: [{ label: "Experience", value: "20+" }, { label: "Hospital", value: "Founder" }, { label: "Villages", value: "45+" }],
    shortBio: "Dr. Tarmale founded and runs a 36-bed multispeciality hospital in rural Thane, bringing two decades of frontline clinical and hospital operations experience to ARCHORA.",
    fullBio: [
      "Dr. Kalpesh Kashinath Tarmale brings over two decades of frontline clinical and healthcare operations experience to his role as Healthcare Advisor at ARCHORA. As Founder and Medical Director of Niramaya Life Hospital in Vasind, Shahapur Taluka (a 36-bed multispeciality hospital with a 4-bed ICU, 3-bed NICU, dedicated operation theatre, and dialysis unit, serving a catchment of more than 45 villages across Thane District), he has built, operated, and grown a healthcare facility from the ground up.",
      "After completing his BAMS from Maharashtra University of Health Sciences in 2004 and beginning practice in Vasind the following year, Dr. Tarmale established Niramaya Life Hospital in 2019 to meet the region's acute need for quality multispeciality care. The hospital is empanelled under Ayushman Bharat and the Mahatma Jyotiba Phule Jan Arogya Yojana, and runs weekly medical camps across surrounding villages. During the pandemic, it served as the only private COVID-19 treatment facility in Shahapur Taluka, work recognised with the Government of Maharashtra's COVID Yodha award in 2021.",
      "At ARCHORA, Dr. Tarmale contributes the practitioner's perspective, validating clinical workflows, advising on rural and tier-2/tier-3 hospital infrastructure, and ensuring every design reflects the lived reality of running a hospital, not just the standards written on paper.",
    ],
    credentials: ["Founder & Medical Director, Niramaya Life Hospital", "BAMS, Maharashtra University of Health Sciences", "COVID Yodha Award, Govt. of Maharashtra (2021)", "Based in Vasind, Thane District"],
    expertise: ["Clinical Workflow Validation", "Rural & Tier-2/3 Hospital Advisory", "Government Scheme Compliance", "Community Health Infrastructure"],
    linkedin: "",
  },
];

const missionPillars = [
  { icon: <Shield size={16} />, text: "Evidence-based spatial planning for clinical excellence" },
  { icon: <Users size={16} />, text: "Optimised workflows for medical professionals" },
  { icon: <Award size={16} />, text: "Safety, compliance, and dignity at every scale" },
];

const visionPillars = [
  { icon: <TrendingUp size={16} />, text: "India's most trusted healthcare infrastructure partner" },
  { icon: <Shield size={16} />, text: "Facilities that protect patients and empower clinicians" },
  { icon: <Award size={16} />, text: "Sustainable returns for promoters" },
];

const milestones = [
  { year: "Founded", chapter: "Chapter I", title: "ARCHORA is Born", description: "Founded with a simple but powerful conviction: India's healthcare infrastructure crisis is not a funding problem alone. It is an expertise problem. Too many hospitals are built by teams that do not understand the clinical, regulatory, and operational demands of healthcare environments.", num: "01" },
  { year: "Year 1", chapter: "Chapter II", title: "First Projects Delivered", description: "Completed projects across hospital design, modular OT delivery, clinic renovations, nursing college infrastructure, and diagnostic centre fit-outs. Pipeline spans greenfield hospital projects, brownfield expansions, and infrastructure upgrades for existing healthcare facilities across India.", num: "02" },
  { year: "Today", chapter: "Chapter III", title: "Growing Across India", description: "ARCHORA is growing: learning from every project and building into the infrastructure partner that doctors, investors, and healthcare promoters across India can trust completely. One team, one point of contact, full accountability from the first meeting to the day you open your doors.", num: "03", isCurrent: true },
];

const philosophy = [
  {
    icon: <Shield size={22} />,
    number: "01",
    title: "Healthcare Only. Always.",
    description: "We do not design offices, residences, or commercial spaces. Every member of our team works exclusively on healthcare projects.",
    detail: "Our knowledge, our processes, and our vendor relationships are entirely focused on one outcome, delivering better healthcare facilities across India.",
  },
  {
    icon: <Heart size={22} />,
    number: "02",
    title: "Compliance Built In.",
    description: "Every design integrates NABH, NABL, INC, NMC, AERB, fire safety standards from the very first drawing. Never an afterthought.",
    detail: "No retrofitting. No last-minute corrections. Every standard integrated from the very first drawing, protecting your timeline, your budget, and your patients.",
  },
  {
    icon: <TrendingUp size={22} />,
    number: "03",
    title: "Single-Window Accountability.",
    description: "One team, one contract, one point of accountability, from concept to commissioning. You manage one relationship, not fifteen vendors.",
    detail: "From feasibility study and architecture through structural engineering, MEP, construction, equipment planning, and commissioning, ARCHORA owns it all.",
  },
];

const statsData = [
  { value: "20+", label: "Years Collective Experience" },
  { value: "100%", label: "Healthcare Focus" },
  { value: "10", label: "Core Service Disciplines" },
  { value: "35+", label: "Facility Type Specialisations" },
];

const services = [
  "Feasibility Studies & DPRs",
  "Healthcare Architecture & Space Planning",
  "Regulatory Compliance & Accreditation-Ready Design",
  "Hospital Licensing & Approvals Support",
  "Structural Design for Healthcare",
  "MEP Engineering for Healthcare",
  "Modular OT & ICU Infrastructure",
  "Turnkey Civil & Interior Execution",
  "Medical Equipment Planning & Procurement",
  "Project Management & Commissioning",
];

// Global font constant for Calibri
const FONT = "Calibri, 'Calibri', Arial, sans-serif";

// ─────────────────────────────────────────────
// SECTION LABEL (shared eyebrow-text component)
// Change the default fontSize below to resize
// every section label on this page in one place:
// Who We Are, Leadership, Our Foundation,
// Our Mission, Our Vision, Our Story,
// What We Do, Get In Touch.
// ─────────────────────────────────────────────
function SectionLabel({
  text,
  color,
  dotColor,
  fontSize = 39,
  letterSpacing = "3px",
  marginBottom = "12px",
  centered = true,
  showDots = true,
  dotWidth = 28,
}: {
  text: string;
  color: string;
  dotColor?: string;
  fontSize?: number;
  letterSpacing?: string;
  marginBottom?: string | number;
  centered?: boolean;
  showDots?: boolean;
  dotWidth?: number;
}) {
  const dot = dotColor || color;
  return (
    <p style={{
      fontFamily: FONT, fontSize, letterSpacing, textTransform: "uppercase",
      color, marginBottom, display: "flex", alignItems: "center",
      justifyContent: centered ? "center" : "flex-start", gap: "12px", fontWeight: 600,
    }}>
      {showDots && <span style={{ display: "block", width: dotWidth, height: "0.5px", background: dot }} />}
      {text}
      {showDots && centered && <span style={{ display: "block", width: dotWidth, height: "0.5px", background: dot }} />}
    </p>
  );
}

function LeaderModal({ leader, onClose }: { leader: (typeof leaders)[0]; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: "rgba(4,18,30,0.88)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{ background: "#071e2e", border: "1px solid rgba(126,184,247,0.18)" }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-5 right-5 z-20 flex items-center justify-center w-9 h-9 rounded-full transition-all" style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}>
            <X size={18} />
          </button>
          <div className="relative px-8 pt-8 pb-6" style={{ borderBottom: `0.5px solid rgba(126,184,247,0.18)` }}>
            <div className="flex items-start justify-between gap-6 pr-12">
              <div>
                <div className="text-base font-semibold tracking-widest uppercase mb-2" style={{ color: leader.accentColor, fontFamily: FONT }}>{leader.role}</div>
                <h2 className="text-3xl font-light text-white" style={{ fontFamily: FONT }}>{leader.name}</h2>
                <p className="text-lg mt-1" style={{ color: "rgba(255,255,255,0.75)", fontFamily: FONT }}>{leader.education}</p>
              </div>
              <div
                className="flex-shrink-0 rounded-xl overflow-hidden"
                style={{ width: 160, height: 160, border: `2px solid ${leader.accentColor}55`, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}
              >
                <ImageWithFallback src={leader.image} alt={leader.name} className="w-full h-full object-cover" style={{ objectPosition: "center top" }} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5" style={{ width: 96, background: `linear-gradient(to right, ${leader.accentColor}, transparent)` }} />
          </div>
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-base font-semibold uppercase tracking-widest mb-3" style={{ color: leader.accentColor, fontFamily: FONT }}><Award size={13} />Credentials</div>
                <ul className="space-y-2">
                  {leader.credentials.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-xl" style={{ color: "#ffffff", fontFamily: FONT }}>
                      <Star size={11} className="mt-1 flex-shrink-0" style={{ color: leader.accentColor }} />{c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 text-base font-semibold uppercase tracking-widest mb-3" style={{ color: leader.accentColor, fontFamily: FONT }}><Briefcase size={13} />Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {leader.expertise.map((e) => (
                    <span key={e} className="text-base px-2.5 py-1 rounded-full" style={{ background: `${leader.accentColor}15`, border: `1px solid ${leader.accentColor}30`, color: leader.accentColor, fontFamily: FONT }}>{e}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-base font-semibold uppercase tracking-widest mb-4" style={{ color: leader.accentColor, fontFamily: FONT }}><BookOpen size={13} />Full Profile</div>
              {leader.fullBio.map((para, i) => (
                <p key={i} className="text-xl leading-relaxed" style={{ color: "#ffffff", fontFamily: FONT, fontWeight: 400 }}>{para}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function LeaderCard({ leader, isActive, onHover, onClick }: { leader: (typeof leaders)[0]; isActive: boolean; onHover: (id: number | null) => void; onClick: (leader: (typeof leaders)[0]) => void }) {
  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer"
      style={{ width: isActive ? "420px" : "260px", borderRadius: "16px", overflow: "hidden", transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)", border: `1px solid ${isActive ? leader.accentColor + "60" : "rgba(255,255,255,0.08)"}` }}
      onMouseEnter={() => onHover(leader.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(leader)}
    >
      <div className="relative h-[420px] overflow-hidden">
        <ImageWithFallback src={leader.image} alt={leader.name} className="w-full h-full object-cover transition-transform duration-700" style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,14,26,1) 0%, rgba(4,14,26,0.6) 45%, rgba(4,14,26,0.1) 75%)" }} />
        <motion.div className="absolute inset-0" animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.4 }} style={{ background: `linear-gradient(135deg, ${leader.accentColor}18 0%, transparent 60%)` }} />
        <motion.div className="absolute top-0 left-0 right-0 h-0.5" animate={{ scaleX: isActive ? 1 : 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ background: `linear-gradient(to right, ${leader.accentColor}, transparent)`, transformOrigin: "left" }} />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="text-base font-semibold tracking-widest uppercase mb-1" style={{ color: leader.accentColor, fontFamily: FONT }}>{leader.role}</div>
          <h3 className="text-3xl text-white font-light mb-1" style={{ fontFamily: FONT }}>{leader.name}</h3>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.92)", fontFamily: FONT }}>{leader.education}</p>
          <motion.div animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }} transition={{ duration: 0.35, delay: isActive ? 0.1 : 0 }} className="overflow-hidden" style={{ height: isActive ? "auto" : 0 }}>
            <p className="text-xl mt-3 leading-relaxed" style={{ color: "#ffffff", fontFamily: FONT, fontWeight: 400 }}>{leader.shortBio}</p>
            <button className="flex items-center gap-2 mt-4 text-lg font-medium group" style={{ color: leader.accentColor, fontFamily: FONT }} onClick={(e) => { e.stopPropagation(); onClick(leader); }}>
              Read Full Profile <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function MilestoneItem({ milestone, index }: { milestone: (typeof milestones)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className="relative flex gap-7" initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }} style={{ paddingBottom: index < milestones.length - 1 ? "44px" : 0 }}>
      <div className="flex-shrink-0 flex flex-col items-center" style={{ width: "52px", position: "relative", zIndex: 2 }}>
        <span style={{ fontFamily: FONT, fontSize: "16px", letterSpacing: "1.5px", color: milestone.isCurrent ? "#7eb8f7" : "#4bd1d9", marginBottom: "8px", whiteSpace: "nowrap" }}>{milestone.year}</span>
        <div style={{ width: "11px", height: "11px", borderRadius: "50%", border: `1.5px solid ${milestone.isCurrent ? "#7eb8f7" : "#4bd1d9"}`, background: milestone.isCurrent ? "rgba(75,209,217,0.15)" : "#040e1a" }} />
      </div>
      <motion.div className="flex-1 relative overflow-hidden cursor-pointer" style={{ padding: "18px 20px", borderRadius: "2px", border: `0.5px solid ${milestone.isCurrent ? "rgba(126,184,247,0.25)" : "rgba(75,209,217,0.12)"}`, background: "rgba(255,255,255,0.025)" }} whileHover={{ x: 5, borderColor: milestone.isCurrent ? "rgba(126,184,247,0.4)" : "rgba(75,209,217,0.3)", background: "rgba(75,209,217,0.04)", transition: { duration: 0.25 } }}>
        <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: `linear-gradient(90deg, ${milestone.isCurrent ? "#7eb8f7" : "#4bd1d9"}, transparent)`, transformOrigin: "left" }} />
        <div style={{ fontFamily: FONT, fontSize: "15px", letterSpacing: "3px", textTransform: "uppercase", color: milestone.isCurrent ? "#7eb8f7" : "#378ADD", marginBottom: "5px" }}>{milestone.chapter}</div>
        <div style={{ fontFamily: FONT, fontSize: "1.5rem", fontWeight: 600, color: "#fff", marginBottom: "5px", lineHeight: 1.2 }}>{milestone.title}</div>
        <div style={{ fontFamily: FONT, fontSize: "17px", lineHeight: 1.8, color: "rgba(255,255,255,0.95)", fontWeight: 400 }}>{milestone.description}</div>
      </motion.div>
    </motion.div>
  );
}

function PhilCard({ item, index, expanded, onToggle }: { item: (typeof philosophy)[0]; index: number; expanded: boolean; onToggle: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={onToggle}
      style={{
        padding: "2.8rem 2.2rem 3rem",
        border: "0.5px solid rgba(181,212,244,0.6)",
        background: expanded ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.65)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        ...(expanded ? { boxShadow: "0 20px 50px rgba(4,44,83,0.12)", transform: "translateY(-6px)" } : {}),
      }}
      whileHover={{ y: -6, background: "rgba(255,255,255,0.95)", boxShadow: "0 20px 50px rgba(4,44,83,0.12)", borderColor: "rgba(56,138,221,0.35)", transition: { duration: 0.25 } }}
    >
      <motion.div initial={{ scaleX: 0 }} animate={expanded ? { scaleX: 1 } : { scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #185FA5, #378ADD)", transformOrigin: "left" }} />
      <motion.div
        animate={expanded ? { background: "linear-gradient(135deg, #185FA5, #378ADD)", color: "#fff" } : { background: "linear-gradient(135deg, #E6F1FB, #fff)", color: "#185FA5" }}
        whileHover={{ background: "linear-gradient(135deg, #185FA5, #378ADD)", color: "#fff" }}
        transition={{ duration: 0.3 }}
        style={{ width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.8rem", border: "0.5px solid rgba(181,212,244,0.8)", borderRadius: "2px" }}
      >
        {item.icon}
      </motion.div>
      <div style={{ fontFamily: FONT, fontSize: "15px", letterSpacing: "3px", textTransform: "uppercase", color: "#85B7EB", marginBottom: "10px" }}>{item.number}, Principle</div>
      <div style={{ fontFamily: FONT, fontSize: "1.7rem", fontWeight: 600, color: "#042C53", marginBottom: "14px", lineHeight: 1.25 }}>{item.title}</div>
      <div style={{ fontFamily: FONT, fontSize: "18px", lineHeight: 1.9, color: "#185FA5", fontWeight: 400 }}>{item.description}</div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "0.5px solid rgba(181,212,244,0.6)", fontFamily: FONT, fontSize: "18px", lineHeight: 1.9, color: "#378ADD", fontWeight: 400 }}>{item.detail}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div animate={{ opacity: expanded ? 0 : 1, x: expanded ? -6 : 0 }} whileHover={{ opacity: 1, x: 0 }} style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "20px", fontFamily: FONT, fontSize: "16px", letterSpacing: "2px", textTransform: "uppercase", color: "#378ADD" }}>
        {expanded ? "Close" : "Explore"}
        <motion.div animate={{ width: expanded ? "8px" : "16px" }} whileHover={{ width: "24px" }} transition={{ duration: 0.3 }} style={{ height: "1px", background: "#378ADD" }} />
      </motion.div>
    </motion.div>
  );
}

function ServiceItem({ service, index }: { service: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }} className="group flex items-start gap-4 py-4 border-b" style={{ borderColor: "rgba(75,209,217,0.1)", cursor: "default" }} whileHover={{ x: 6, transition: { duration: 0.2 } }}>
      <span style={{ fontFamily: FONT, fontSize: "16px", color: "rgba(75,209,217,0.45)", letterSpacing: "1px", flexShrink: 0, marginTop: "2px", minWidth: "28px" }}>{String(index + 1).padStart(2, "0")}</span>
      <motion.div className="flex-1 flex items-center justify-between" whileHover={{ color: "#4bd1d9" }}>
        <span style={{ fontFamily: FONT, fontSize: "18px", color: "#ffffff", lineHeight: 1.6, transition: "color 0.2s", fontWeight: 400 }} className="group-hover:text-teal-300">{service}</span>
        <motion.div initial={{ opacity: 0, x: -4 }} whileHover={{ opacity: 1, x: 0 }} style={{ color: "#4bd1d9", flexShrink: 0, marginLeft: "12px" }}><ArrowRight size={13} /></motion.div>
      </motion.div>
    </motion.div>
  );
}

export function About() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<(typeof leaders)[0] | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (!spineRef.current || !timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = Math.max(0, windowH - rect.top);
      const total = rect.height + windowH;
      const pct = Math.min(100, (scrolled / total) * 180);
      spineRef.current.style.height = `${pct}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = { initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, ease: "easeOut" } } as const;

  return (
    <div className="min-h-screen pt-20 archora-page-scope" style={{ overflowX: "hidden", fontFamily: FONT }}>
      <style>{`
        .archora-page-scope * { font-family: Calibri, 'Calibri', Arial, sans-serif !important; }
        .mv-card{position:relative;overflow:hidden;transition:transform .45s cubic-bezier(.22,1,.36,1),box-shadow .45s cubic-bezier(.22,1,.36,1);}
        .mv-card:hover{transform:translateY(-8px);box-shadow:0 32px 64px rgba(4,44,83,.2);}
        .mv-card-bar{position:absolute;top:0;left:0;right:0;height:3px;transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.22,1,.36,1);}
        .mv-card:hover .mv-card-bar{transform:scaleX(1);}
        .mv-icon-box{display:flex;align-items:center;justify-content:center;transition:all .4s ease;}
        .mv-pillar-row{display:flex;align-items:flex-start;gap:14px;padding:13px 16px;transition:background .3s ease,border-color .3s ease;cursor:default;}
        .mv-pillar-row:hover{background:rgba(55,138,221,0.08);}
        .mv-divider{height:1px;margin:1.5rem 0;width:56px;transition:width .4s cubic-bezier(.22,1,.36,1);}
        .mv-card:hover .mv-divider{width:110px;}
        .blueprint-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(24,95,165,.07) 1px,transparent 1px);background-size:22px 22px;opacity:0;pointer-events:none;transition:opacity .4s ease;}
        .mv-card:hover .blueprint-dots{opacity:1;}
        .corner-mark{position:absolute;width:16px;height:16px;opacity:0;transition:opacity .4s ease;}
        .corner-tl{top:12px;left:12px;border-top:1px solid;border-left:1px solid;}
        .corner-br{bottom:12px;right:12px;border-bottom:1px solid;border-right:1px solid;}
        .mv-card:hover .corner-mark{opacity:1;}
        .mv-stat-item{position:relative;padding:2.25rem 1.75rem;text-align:center;transition:background .3s ease;overflow:hidden;}
        .mv-stat-item::after{content:'';position:absolute;bottom:0;left:0;height:2px;width:0;background:linear-gradient(90deg,#85B7EB,#378ADD);transition:width .5s cubic-bezier(.22,1,.36,1);}
        .mv-stat-item:hover::after{width:100%;}
        .mv-stat-item:hover{background:rgba(255,255,255,.06);}
        .timeline-spine{position:absolute;left:25px;top:8px;bottom:8px;width:1px;background:rgba(75,209,217,.12);z-index:1;}
        .timeline-spine-fill{position:absolute;left:0;top:0;width:100%;background:linear-gradient(to bottom,#4bd1d9,#378ADD);height:0%;transition:height 1.6s cubic-bezier(.22,1,.36,1);}
        .hero-section{cursor:crosshair;}
        @keyframes scrollBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
        .scroll-bounce{animation:scrollBounce 1.8s ease-in-out infinite;}

      `}</style>

      {/* ── Hero ── */}
      <section ref={heroRef} className="hero-section relative overflow-hidden" style={{ height: "85vh", minHeight: "600px" }}>
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <ImageWithFallback src="/images/about/team-professionals.jpg" alt="ARCHORA, Healthcare Infrastructure" className="w-full h-full object-cover" style={{ scale: 1.04 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(4,28,46,0.6) 0%, rgba(4,28,46,0.3) 55%, rgba(4,28,46,0.08) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,28,46,0.4) 0%, transparent 45%)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(75,209,217,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </motion.div>
        <motion.div className="absolute" style={{ top: "18%", right: "12%", opacity: 0.12, color: "#4bd1d9" }} animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}>
          <svg width="120" height="120" viewBox="0 0 48 48" fill="none" stroke="currentColor"><circle cx="24" cy="24" r="9" strokeWidth="0.8" /><circle cx="24" cy="24" r="18" strokeWidth="0.4" strokeDasharray="3 4" /><line x1="24" y1="0" x2="24" y2="13" strokeWidth="0.8" /><line x1="24" y1="35" x2="24" y2="48" strokeWidth="0.8" /><line x1="0" y1="24" x2="13" y2="24" strokeWidth="0.8" /><line x1="35" y1="24" x2="48" y2="24" strokeWidth="0.8" /></svg>
        </motion.div>
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
          <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,0.12)" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4bd1d9" }} />
          <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,0.12)" }} />
        </div>
        <motion.div className="relative h-full max-w-7xl mx-auto px-16 flex items-center z-10" style={{ opacity: heroOpacity }}>
          <div style={{ maxWidth: "680px" }}>
            <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <span style={{ fontFamily: FONT, fontSize: "18px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.90)" }}>Healthcare Infrastructure</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 36, clipPath: "inset(100% 0 0 0)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: FONT, fontSize: "clamp(3rem,5.5vw,5rem)", fontWeight: 600, color: "#fff", lineHeight: 1.06, marginBottom: "24px", letterSpacing: "-0.01em" }}>
              We Build the Infrastructure<br /><em style={{ fontStyle: "italic", color: "#4bccd4" }}>That Heals India.</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }} style={{ fontSize: "18px", color: "rgba(255,255,255,0.97)", marginBottom: "40px", lineHeight: 1.85, maxWidth: "520px", fontFamily: FONT, fontWeight: 400 }}>
              ARCHORA is India's dedicated healthcare infrastructure partner. We do not do residential. We do not do commercial. We do not do retail.{" "}
              <strong style={{ color: "rgba(75,204,212,0.85)", fontWeight: 600 }}>We do one thing. We do it completely. We do it right.</strong>
            </motion.p>
            <motion.div className="flex gap-4 flex-wrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }}>
              <button onClick={() => navigate("/contact")} style={{ padding: "13px 30px", fontSize: "17px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .25s" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>Book a Free Consultation</button>
              <button onClick={() => navigate("/services")} style={{ padding: "13px 30px", fontSize: "17px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", transition: "all .25s" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(75,204,212,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#4bccd4"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>Explore Our Services →</button>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <span style={{ fontFamily: FONT, fontSize: "15px", letterSpacing: "0.28em", color: "rgba(75,204,212,0.4)", textTransform: "uppercase" }}>Scroll</span>
          <div className="scroll-bounce" style={{ color: "rgba(75,204,212,0.4)" }}><ChevronDown size={16} /></div>
        </motion.div>
      </section>

      {/* ── Firm Introduction ── */}
      <section className="py-24" style={{ background: "linear-gradient(160deg,#ffffff 0%,#e8f4fd 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center" {...fadeInUp}>
            <SectionLabel text="Who We Are" color="#185FA5" marginBottom="14px" />
            <h2 className="mb-8" style={{ fontFamily: FONT, fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 600, color: "#042C53", lineHeight: 1.1 }}>India's Dedicated Healthcare Infrastructure Partner</h2>
            <p className="mb-6" style={{ color: "#0a1a2a", fontFamily: FONT, fontSize: "18px", lineHeight: 1.9, fontWeight: 400 }}>Healthcare infrastructure in India is broken in one critical way, most hospitals are designed by general architects who understand buildings but not clinical workflows, infection control, regulatory compliance, or the lived reality of running a hospital 24 hours a day.</p>
            <p className="mb-6" style={{ color: "#0a1a2a", fontFamily: FONT, fontSize: "18px", lineHeight: 1.9, fontWeight: 400 }}>ARCHORA was founded to fix that. We are a team of healthcare infrastructure specialists, architects, engineers, and project managers who work exclusively in healthcare. From a doctor planning a 10-bed clinic in a tier-2 city to a healthcare investor building a 500-bed multispeciality hospital campus, ARCHORA is the single-window partner that takes full responsibility for designing, building, and delivering the infrastructure.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-24 relative" style={{ background: "linear-gradient(160deg,#040e1a 0%,#071e30 60%,#04141f 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: "80vw", height: "80vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(75,209,217,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div className="mb-14 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel text="Leadership" color="rgba(75,209,217,0.6)" dotColor="rgba(75,209,217,0.4)" />
            <h2 className="text-white font-light" style={{ fontFamily: FONT, fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 600 }}>Built by People Who Know Healthcare Infrastructure</h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#ffffff", fontFamily: FONT, fontSize: "18px", lineHeight: 1.8, fontWeight: 400 }}>A founding team that has designed and delivered healthcare facilities at every scale, from primary care clinics to large NHS hospitals in the United Kingdom.</p>
          </motion.div>
          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 justify-center" style={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: 8, paddingRight: 8, paddingTop: 8 }}>
            {leaders.map((leader) => (<LeaderCard key={leader.id} leader={leader} isActive={hoveredId === leader.id} onHover={setHoveredId} onClick={setSelectedLeader} />))}
          </div>
        </div>
        {selectedLeader && <LeaderModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />}
      </section>

      {/* ── Mission & Vision ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#daeef9 50%,#e8f4fd 100%)", padding: "7rem 0 8rem", fontFamily: FONT }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3.5rem" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: "5rem" }}>
            <SectionLabel text="Our Foundation" color="#185FA5" marginBottom={14} dotWidth={40} />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 600, color: "#042C53", lineHeight: 1.06, marginBottom: 18 }}>
              Purpose Built.{" "}<em style={{ fontStyle: "italic", color: "#185FA5" }}>Precision Driven.</em>
            </h2>
            <p style={{ fontFamily: FONT, fontSize: "18px", color: "#378ADD", maxWidth: 520, margin: "0 auto", lineHeight: 1.9, fontWeight: 400 }}>The guiding principles behind every hospital, clinic, and care facility we design.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
            {/* Mission */}
            <motion.div className="mv-card" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ background: "linear-gradient(145deg,#042C53 0%,#0C447C 55%,#185FA5 100%)", borderRadius: 4, padding: "3.5rem 3rem", border: "0.5px solid rgba(133,183,235,0.2)" }}>
              <div className="blueprint-dots" />
              <div className="mv-card-bar" style={{ background: "linear-gradient(90deg,#85B7EB,#378ADD,#B5D4F4)" }} />
              <div className="corner-mark corner-tl" style={{ borderColor: "rgba(133,183,235,0.5)" }} />
              <div className="corner-mark corner-br" style={{ borderColor: "rgba(133,183,235,0.5)" }} />
              <SectionLabel text="Our Mission" color="#85B7EB" showDots={false} centered={false} marginBottom={12} />
              <h3 style={{ fontFamily: FONT, fontSize: "clamp(2.8rem, 4.5vw, 4.2rem)", fontWeight: 600, color: "#E6F1FB", lineHeight: 1.1, marginBottom: 6 }}>
                To design spaces that{" "}<em style={{ fontStyle: "italic", color: "#85B7EB" }}>actively heal</em>
              </h3>
              <div className="mv-divider" style={{ background: "linear-gradient(90deg,#85B7EB,#378ADD,transparent)" }} />
              <p style={{ fontFamily: FONT, fontSize: "18px", lineHeight: 1.95, color: "#daeef9", marginBottom: "2rem", fontWeight: 400 }}>To give every healthcare promoter in India access to world-class infrastructure expertise, so that the facilities they build are safe, compliant, efficient, and built to last.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {missionPillars.map((p, i) => (
                  <div key={i} className="mv-pillar-row" style={{ border: "0.5px solid rgba(55,138,221,0.25)", borderRadius: 2 }}>
                    <span style={{ color: "#378ADD", marginTop: 2, flexShrink: 0 }}>{p.icon}</span>
                    <span style={{ fontFamily: FONT, fontSize: "17px", color: "#e8f4fd", lineHeight: 1.65, fontWeight: 400 }}>{p.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div className="mv-card" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ background: "linear-gradient(145deg,#ffffff 0%,#E6F1FB 55%,#daeef9 100%)", borderRadius: 4, padding: "3.5rem 3rem", border: "0.5px solid #B5D4F4" }}>
              <div className="blueprint-dots" />
              <div className="mv-card-bar" style={{ background: "linear-gradient(90deg,#185FA5,#378ADD,#85B7EB)" }} />
              <div className="corner-mark corner-tl" style={{ borderColor: "#85B7EB" }} />
              <div className="corner-mark corner-br" style={{ borderColor: "#85B7EB" }} />
              <SectionLabel text="Our Vision" color="#185FA5" showDots={false} centered={false} marginBottom={12} />
              <h3 style={{ fontFamily: FONT, fontSize: "clamp(2.8rem, 4.5vw, 4.2rem)", fontWeight: 600, color: "#042C53", lineHeight: 1.1, marginBottom: 6 }}>
                India's most{" "}<em style={{ fontStyle: "italic", color: "#185FA5" }}>trusted</em> design partner
              </h3>
              <div className="mv-divider" style={{ background: "linear-gradient(90deg,#185FA5,#378ADD,transparent)" }} />
              <p style={{ fontFamily: FONT, fontSize: "18px", lineHeight: 1.95, color: "#185FA5", marginBottom: "2rem", fontWeight: 400 }}>To become India's most trusted healthcare infrastructure partner, known for delivering facilities that protect patients, empower clinicians, and generate sustainable returns for promoters.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {visionPillars.map((p, i) => (
                  <div key={i} className="mv-pillar-row" style={{ border: "0.5px solid #B5D4F4", background: "rgba(230,241,251,0.6)", borderRadius: 2 }}>
                    <span style={{ color: "#185FA5", marginTop: 2, flexShrink: 0 }}>{p.icon}</span>
                    <span style={{ fontFamily: FONT, fontSize: "17px", color: "#0C447C", lineHeight: 1.65, fontWeight: 400 }}>{p.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "linear-gradient(135deg,#042C53 0%,#0C447C 50%,#185FA5 100%)", border: "0.5px solid rgba(133,183,235,0.2)", borderRadius: 2, overflow: "hidden" }}>
            {statsData.map((s, i) => (
              <div key={i} className="mv-stat-item" style={{ borderRight: i < statsData.length - 1 ? "0.5px solid rgba(133,183,235,0.15)" : "none" }}>
                <div style={{ fontFamily: FONT, fontSize: "2.8rem", fontWeight: 600, color: "#E6F1FB", lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontFamily: FONT, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", color: "#85B7EB", fontWeight: 400 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section style={{ background: "linear-gradient(170deg, #040e1a 0%, #071e30 55%, #04141f 100%)", padding: "88px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(75,209,217,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: "64px" }}>
            <SectionLabel text="Our Story" color="#4bd1d9" letterSpacing="4px" />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 600, color: "#fff", marginBottom: "10px" }}>Our Journey</h2>
            <p style={{ fontFamily: FONT, fontSize: "18px", color: "rgba(255,255,255,0.92)", lineHeight: 1.8, fontWeight: 400 }}>Milestones in healthcare architecture excellence</p>
          </motion.div>
          <div ref={timelineRef} style={{ position: "relative" }}>
            <div className="timeline-spine"><div className="timeline-spine-fill" ref={spineRef} /></div>
            {milestones.map((m, i) => (<MilestoneItem key={m.year} milestone={m} index={i} />))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "88px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: "56px" }}>
            <SectionLabel text="What We Do" color="#4bd1d9" letterSpacing="4px" centered={false} />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 600, color: "#fff", maxWidth: "560px" }}>Everything You Need to Design, Build & Deliver</h2>
            <p style={{ fontFamily: FONT, fontSize: "18px", color: "rgba(255,255,255,0.92)", marginTop: "12px", maxWidth: "480px", lineHeight: 1.8, fontWeight: 400 }}>ARCHORA provides the complete range of healthcare infrastructure services, from the first feasibility study to the day you open your doors.</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 48px" }}>
            {services.map((s, i) => (<ServiceItem key={s} service={s} index={i} />))}
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} style={{ marginTop: "48px", display: "flex", gap: "14px" }}>
            <button onClick={() => navigate("/services")} style={{ padding: "13px 28px", fontSize: "17px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .25s" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>Explore All Services →</button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#060f1e", padding: "120px 0", position: "relative", overflow: "hidden" }}>
        {[800, 580, 380, 220].map((size, i) => (
          <motion.div key={size} style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: "50%", border: `1px solid rgba(75,204,212,${0.02 + i * 0.01})`, pointerEvents: "none" }} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }} />
        ))}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 48px", textAlign: "center", position: "relative", zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: FONT, fontSize: "20px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(75,204,212,0.55)", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", fontWeight: 600 }}>
              <span style={{ display: "block", width: "28px", height: "0.5px", background: "rgba(75,204,212,0.4)" }} />Get In Touch<span style={{ display: "block", width: "28px", height: "0.5px", background: "rgba(75,204,212,0.4)" }} />
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: "22px" }}>
              Planning a Healthcare Facility?<br /><em style={{ fontStyle: "italic", color: "#4bccd4" }}>Let's Talk.</em>
            </h2>
            <p style={{ fontFamily: FONT, fontSize: "18px", color: "rgba(255,255,255,0.90)", marginBottom: "44px", lineHeight: 1.85, maxWidth: "500px", margin: "0 auto 44px", fontWeight: 400 }}>Whether you are starting from zero or need expert support at any stage, ARCHORA is ready to help you design, build, and deliver infrastructure that works.</p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/contact")} style={{ padding: "14px 32px", fontSize: "17px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .25s" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>Book a Free Consultation</button>
              <button onClick={() => window.open(WHATSAPP_URL, "_blank")} style={{ padding: "14px 32px", fontSize: "17px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all .25s" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(75,204,212,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#4bccd4"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>WhatsApp Us</button>
              <button onClick={() => navigate("/contact")} style={{ padding: "14px 32px", fontSize: "17px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all .25s" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(75,204,212,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#4bccd4"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}>Send an Enquiry →</button>
            </div>
            <p style={{ fontFamily: FONT, fontSize: "16px", color: "rgba(255,255,255,0.75)", marginTop: "28px", letterSpacing: "0.1em", fontWeight: 400 }}>No obligation · No sales pressure · Honest advice from healthcare infrastructure specialists</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}