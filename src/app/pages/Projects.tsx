import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet";

// ─────────────────────────────────────────────
// DESIGN TOKENS, matches Home.tsx
// ─────────────────────────────────────────────
const FONT = "Calibri, Arial, sans-serif";

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
// SHARED DECORATIONS
// ─────────────────────────────────────────────
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
      <span style={{ fontFamily: "monospace", fontSize: 19, letterSpacing: "0.28em", textTransform: "uppercase", color: light ? "rgba(75,204,212,0.7)" : C.blue }}>
        {text}
      </span>
    </div>
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
        textTransform: "uppercase", fontFamily: FONT, cursor: "pointer",
        transition: "all 0.25s ease", whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────
// PROJECTS DATA (real ongoing projects from PDF)
// ─────────────────────────────────────────────
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
  gallery?: string[];
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
    gallery: [
      "/images/projects/gallery/suresh-matre-01.jpg",
      "/images/projects/gallery/suresh-matre-02.png",

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
    gallery: [
      "/images/projects/gallery/binar-mp-01.jpg",
      "/images/projects/gallery/binar-mp-02.png",
      "/images/projects/gallery/binar-mp-03.png",
      "/images/projects/gallery/binar-mp-04.png",
      "/images/projects/gallery/binar-mp-05.png",
      "/images/projects/gallery/binar-mp-06.png",
      "/images/projects/gallery/binar-mp-07.jpg",
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
// GALLERY LIGHTBOX (for full-size viewing within the modal)
// ─────────────────────────────────────────────
function GalleryLightbox({ images, index, onClose, onNav }: { images: string[]; index: number; onClose: () => void; onNav: (i: number) => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, images.length, onClose, onNav]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(2,10,18,0.96)", zIndex: 10010, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
    >
      <img
        src={images[index]}
        alt={`Gallery image ${index + 1}`}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: "88vw", maxHeight: "84vh", objectFit: "contain", cursor: "default" }}
      />
      <button
        onClick={onClose}
        aria-label="Close gallery"
        className="proj-lightbox-close"
        style={{
          position: "absolute", top: 24, right: 24, width: 40, height: 40,
          border: "1px solid rgba(75,204,212,0.3)", background: "rgba(10,22,40,0.8)",
          color: "rgba(255,255,255,0.7)", fontSize: 24, lineHeight: 1,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}
      >×</button>
      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); onNav((index - 1 + images.length) % images.length); }}
            aria-label="Previous image"
            className="proj-lightbox-nav proj-lightbox-nav-left"
            style={{
              position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
              width: 44, height: 44, border: "1px solid rgba(75,204,212,0.3)", background: "rgba(10,22,40,0.7)",
              color: "rgba(255,255,255,0.8)", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >‹</button>
          <button
            onClick={e => { e.stopPropagation(); onNav((index + 1) % images.length); }}
            aria-label="Next image"
            className="proj-lightbox-nav proj-lightbox-nav-right"
            style={{
              position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
              width: 44, height: 44, border: "1px solid rgba(75,204,212,0.3)", background: "rgba(10,22,40,0.7)",
              color: "rgba(255,255,255,0.8)", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >›</button>
          <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: FONT, letterSpacing: "0.14em" }}>
              {index + 1} / {images.length}
            </span>
          </div>
        </>
      )}
    </motion.div>,
    document.body
  );
}

// ─────────────────────────────────────────────
// PROJECT MODAL
// ─────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [project]);

  useEffect(() => {
    if (lightboxIndex !== null) return; // lightbox handles its own escape key
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, lightboxIndex]);

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
  className="proj-modal-panel"
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
            <div className="proj-modal-hero" style={{ position: "relative", height: 260, flexShrink: 0, overflow: "hidden" }}>
              <img
                src={project.image} alt={`${project.name}, ${project.location}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.25) 60%)" }} />

              {/* Corner brackets */}
              <div style={{ position: "absolute", top: 16, left: 16, width: 32, height: 32, borderLeft: "2px solid rgba(75,204,212,0.5)", borderTop: "2px solid rgba(75,204,212,0.5)" }} />

              {/* Status badge */}
              <div className="proj-modal-status-badge" style={{
                position: "absolute", top: 16, right: 56,
                background: "rgba(10,22,40,0.85)", border: "1px solid rgba(75,204,212,0.2)",
                padding: "5px 12px", display: "flex", alignItems: "center", gap: 6,
                backdropFilter: "blur(8px)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.statusColor, flexShrink: 0, display: "inline-block" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: FONT, letterSpacing: "0.14em" }}>
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
              <div className="proj-modal-title-wrap" style={{ position: "absolute", bottom: 22, left: 28, right: 28 }}>
                <p style={{ color: "rgba(75,204,212,0.65)", fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", fontFamily: FONT, margin: "0 0 7px", fontWeight: 400 }}>
                  {project.location}
                </p>
                <h2 className="proj-modal-title" style={{
                  color: "#ffffff", fontSize: 32,
                  fontFamily: FONT,
                  fontWeight: 400, margin: 0, lineHeight: 1.15,
                }}>
                  {project.name}
                </h2>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="proj-modal-body" style={{ overflowY: "auto", padding: "28px 32px 36px", flex: 1 }}>

              {/* Description */}
              <p style={{ color: "rgba(255,255,255,0.95)", fontSize: 17, lineHeight: 1.85, margin: "0 0 30px", fontWeight: 400, fontFamily: FONT }}>
                {project.description}
              </p>

              {/* Two-column: Details + Scope */}
              <div className="proj-modal-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>

                {/* Project details table */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 20, height: 1, background: "rgba(75,204,212,0.5)" }} />
                    <span style={{ color: "rgba(75,204,212,0.6)", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", fontFamily: FONT }}>
                      Project Details
                    </span>
                  </div>
                  <div style={{ border: "1px solid rgba(75,204,212,0.1)" }}>
                    {Object.entries(project.details).map(([key, val], i, arr) => (
                      <div
                        key={key}
                        className="proj-modal-detail-row"
                        style={{
                          display: "grid", gridTemplateColumns: "1fr 1.4fr",
                          borderBottom: i < arr.length - 1 ? "1px solid rgba(75,204,212,0.08)" : "none",
                          padding: "10px 14px",
                        }}
                      >
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: FONT, letterSpacing: "0.04em" }}>{key}</span>
                        <span style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.5, fontFamily: FONT }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope of work */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 20, height: 1, background: "rgba(75,204,212,0.5)" }} />
                    <span style={{ color: "rgba(75,204,212,0.6)", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", fontFamily: FONT }}>
                      Scope of Work
                    </span>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                    {project.scopeItems.map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ color: C.red, fontSize: 12, marginTop: 3, flexShrink: 0 }}>✦</span>
                        <span style={{ color: "rgba(255,255,255,0.95)", fontSize: 15, lineHeight: 1.65, fontFamily: FONT, fontWeight: 400 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 20, height: 1, background: "rgba(75,204,212,0.5)" }} />
                    <span style={{ color: "rgba(75,204,212,0.6)", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", fontFamily: FONT }}>
                      Project Gallery
                    </span>
                  </div>
                  <div className="proj-modal-gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {project.gallery.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setLightboxIndex(i)}
                        aria-label={`Open gallery image ${i + 1}`}
                        className="proj-modal-gallery-thumb"
                        style={{
                          position: "relative", padding: 0, border: "1px solid rgba(75,204,212,0.12)",
                          background: "transparent", cursor: "pointer", overflow: "hidden",
                          height: 110, display: "block",
                        }}
                        onMouseEnter={e => { const img = (e.currentTarget as HTMLElement).querySelector("img"); if (img) img.style.transform = "scale(1.07)"; }}
                        onMouseLeave={e => { const img = (e.currentTarget as HTMLElement).querySelector("img"); if (img) img.style.transform = "scale(1)"; }}
                      >
                        <img
                          src={src}
                          alt={`${project.name}, gallery image ${i + 1}`}
                          loading="lazy"
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer CTAs */}
              <div className="proj-modal-footer-ctas" style={{ marginTop: 30, paddingTop: 22, borderTop: "1px solid rgba(75,204,212,0.1)", display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button onClick={() => { onClose(); navigate("/contact"); }} style={{
                  padding: "12px 28px", background: C.blue, color: C.white,
                  border: "none", fontSize: 13, letterSpacing: "0.18em",
                  textTransform: "uppercase", fontFamily: FONT, cursor: "pointer", transition: "background 0.2s",
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
                  fontFamily: FONT, cursor: "pointer",
                }}>
                  Explore Our Services →
                </button>
              </div>
            </div>
          </motion.div>

          {/* Gallery lightbox */}
          {project.gallery && lightboxIndex !== null && (
            <GalleryLightbox
              images={project.gallery}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onNav={i => setLightboxIndex(i)}
            />
          )}
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function Projects() {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <Helmet>
        <title>Our Projects, Healthcare Infrastructure Portfolio | ARCHORA</title>
        <meta name="description" content="Explore ARCHORA's ongoing healthcare infrastructure projects across India, hospitals, multispecialty facilities, and turnkey redevelopments delivered with clinical workflow and NABH compliance at the core." />
      </Helmet>

      <div style={{ fontFamily: FONT, overflowX: "hidden", background: C.navy, paddingTop: 72 }}>
        <style>{`
          @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

          /* ============ RESPONSIVE LAYOUT RULES ============ */

          /* Page-wide horizontal padding wrappers — fixed 80px sides crush
             content on tablet/phone, scale down same as Home's .home-wrap. */
          .proj-wrap {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 80px;
            box-sizing: border-box;
          }
          @media (max-width: 1024px) {
            .proj-wrap { padding: 0 48px; }
          }
          @media (max-width: 640px) {
            .proj-wrap { padding: 0 24px; }
          }

          .proj-cta-wrap {
            max-width: 720px;
            margin: 0 auto;
            padding: 0 80px;
            text-align: center;
            position: relative;
            z-index: 10;
            box-sizing: border-box;
          }
          @media (max-width: 1024px) {
            .proj-cta-wrap { padding: 0 48px; }
          }
          @media (max-width: 640px) {
            .proj-cta-wrap { padding: 0 24px; }
          }

          /* Hero "featured project" card: fixed height + absolute badges
             collide at small widths, and the 4-stat row overflows on phones. */
          .proj-hero-card {
            height: 460px;
          }
          @media (max-width: 760px) {
            .proj-hero-card { height: auto; min-height: 420px; }
          }

          .proj-hero-content {
            padding: 36px 40px;
          }
          @media (max-width: 640px) {
            .proj-hero-content { padding: 24px 22px; }
          }

          .proj-hero-title {
            font-size: 32px;
            max-width: 600px;
          }
          @media (max-width: 640px) {
            .proj-hero-title { font-size: 24px; }
          }

          .proj-hero-stats {
            display: flex;
            gap: 36px;
            flex-wrap: wrap;
          }
          @media (max-width: 640px) {
            .proj-hero-stats { gap: 20px 28px; }
          }

          .proj-hero-badges-top {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .proj-hero-click-hint {
            position: absolute;
            bottom: 28px;
            right: 28px;
          }
          @media (max-width: 640px) {
            .proj-hero-click-hint { display: none; }
          }

          /* Three smaller project cards: 3 cols -> 2 -> 1 */
          .proj-cards-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          @media (max-width: 900px) {
            .proj-cards-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 560px) {
            .proj-cards-grid { grid-template-columns: 1fr; }
          }

          /* Experience strip: icon + text row wraps with tighter padding on phone */
          .proj-experience-strip {
            margin-top: 48px;
            padding: 32px 40px;
            background: ${C.navy};
            display: flex;
            align-items: center;
            gap: 18px;
          }
          @media (max-width: 640px) {
            .proj-experience-strip { padding: 22px 24px; }
          }

          /* CTA buttons row: 3 long uppercase buttons wrap into a stack on phone */
          .proj-cta-btn-row {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
          }
          @media (max-width: 560px) {
            .proj-cta-btn-row { flex-direction: column; align-items: stretch; }
          }

          /* ===== Modal responsiveness ===== */
          .proj-modal-panel {
            top: 5vh;
          }
          @media (max-width: 760px) {
            .proj-modal-panel { top: 0; max-height: 100vh !important; height: 100vh; }
          }

          .proj-modal-hero {
            height: 260px;
          }
          @media (max-width: 640px) {
            .proj-modal-hero { height: 200px; }
          }

          .proj-modal-title {
            font-size: 32px;
          }
          @media (max-width: 640px) {
            .proj-modal-title { font-size: 24px; }
          }

          .proj-modal-title-wrap {
            left: 28px;
            right: 28px;
          }
          @media (max-width: 640px) {
            .proj-modal-title-wrap { left: 18px; right: 18px; bottom: 16px; }
          }

          .proj-modal-status-badge {
            right: 56px;
          }
          @media (max-width: 480px) {
            .proj-modal-status-badge { display: none; }
          }

          .proj-modal-body {
            padding: 28px 32px 36px;
          }
          @media (max-width: 640px) {
            .proj-modal-body { padding: 20px 18px 28px; }
          }

          /* Details + Scope two-column layout stacks on tablet/phone */
          .proj-modal-cols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          @media (max-width: 640px) {
            .proj-modal-cols { grid-template-columns: 1fr; gap: 28px; }
          }

          .proj-modal-detail-row {
            grid-template-columns: 1fr 1.4fr;
          }
          @media (max-width: 420px) {
            .proj-modal-detail-row { grid-template-columns: 1fr; gap: 2px; }
          }

          /* Gallery grid: 3 cols -> 2 on phone */
          .proj-modal-gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          @media (max-width: 480px) {
            .proj-modal-gallery-grid { grid-template-columns: repeat(2, 1fr); }
          }

          .proj-modal-gallery-thumb {
            height: 110px;
          }
          @media (max-width: 480px) {
            .proj-modal-gallery-thumb { height: 90px; }
          }

          .proj-modal-footer-ctas {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          @media (max-width: 480px) {
            .proj-modal-footer-ctas { flex-direction: column; }
            .proj-modal-footer-ctas button { width: 100%; }
          }

          /* Lightbox nav arrows sit too close to image edges on narrow screens */
          @media (max-width: 480px) {
            .proj-lightbox-nav-left { left: 8px !important; width: 36px !important; height: 36px !important; }
            .proj-lightbox-nav-right { right: 8px !important; width: 36px !important; height: 36px !important; }
            .proj-lightbox-close { top: 12px !important; right: 12px !important; width: 34px !important; height: 34px !important; }
          }
        `}</style>

        {/* ══════════════════════════════════════════
            PROJECTS, ONGOING PORTFOLIO
        ══════════════════════════════════════════ */}
        <section aria-labelledby="projects-heading" style={{ background: C.cream, padding: "120px 0", position: "relative" }}>
          <div className="proj-wrap">

            <motion.div style={{ marginBottom: 72 }} {...fadeUp}>
              <SectionLabel text="Ongoing Portfolio" />
              <h2 id="projects-heading" style={{ color: C.navy, fontSize: "clamp(2.1rem, 3.6vw, 3.4rem)", fontWeight: 400, fontFamily: FONT, margin: 0 }}>
                Healthcare Infrastructure<br />Projects Across India
              </h2>
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
              className="proj-hero-card"
              style={{ position: "relative", overflow: "hidden", cursor: "pointer", marginBottom: 16, outline: "none" }}
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
                <span style={{ color: C.white, fontSize: 12, fontFamily: FONT, letterSpacing: "0.2em", textTransform: "uppercase" }}>Hero Project</span>
              </div>
              <div style={{ position: "absolute", top: 52, left: 20, background: "rgba(27,108,168,0.8)", padding: "5px 12px", backdropFilter: "blur(6px)" }}>
                <span style={{ color: C.white, fontSize: 13, fontFamily: FONT, letterSpacing: "0.12em" }}>{projects[0].type}</span>
              </div>

              {/* Status */}
              <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(4,28,46,0.7)", border: "1px solid rgba(75,204,212,0.3)", padding: "6px 14px", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: projects[0].statusColor, display: "inline-block" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: FONT, letterSpacing: "0.14em" }}>{projects[0].status}</span>
              </div>

              {/* Click hint */}
              <div className="proj-hero-click-hint" style={{ border: "1px solid rgba(75,204,212,0.35)", padding: "7px 16px", backdropFilter: "blur(6px)", background: "rgba(4,28,46,0.5)" }}>
                <span style={{ color: "rgba(75,204,212,0.8)", fontSize: 12, fontFamily: FONT, letterSpacing: "0.18em" }}>View Full Details ↗</span>
              </div>

              {/* Content */}
              <div className="proj-hero-content" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: FONT, marginBottom: 10, fontWeight: 400 }}>
                  {projects[0].location}
                </p>
                <h3 className="proj-hero-title" style={{ color: C.white, fontFamily: FONT, fontWeight: 400, margin: "0 0 20px" }}>
                  {projects[0].name}
                </h3>
                <div className="proj-hero-stats">
                  {[["300 Beds", "Capacity"], ["₹150 Cr+", "Project Value"], ["2,00,000 Sq Ft", "Built Area"], ["Full Turnkey", "Scope"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <div style={{ color: C.teal, fontSize: 22, fontFamily: FONT, marginBottom: 3, fontWeight: 400 }}>{val}</div>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: FONT, letterSpacing: "0.14em", textTransform: "uppercase" }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Three smaller project cards */}
            <div className="proj-cards-grid">
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
                    <span style={{ color: C.white, fontSize: 12, fontFamily: FONT, letterSpacing: "0.1em" }}>{p.type}</span>
                  </div>

                  {/* Status dot */}
                  <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(4,28,46,0.7)", border: "1px solid rgba(75,204,212,0.2)", padding: "4px 10px", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.statusColor, display: "inline-block" }} />
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: FONT, letterSpacing: "0.1em" }}>Ongoing</span>
                  </div>

                  {/* Hover hint */}
                  <div className="hint" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }}>
                    <div style={{ border: "1px solid rgba(75,204,212,0.5)", padding: "8px 18px", background: "rgba(4,28,46,0.7)", backdropFilter: "blur(6px)" }}>
                      <span style={{ color: "rgba(75,204,212,0.9)", fontSize: 12, fontFamily: FONT, letterSpacing: "0.2em" }}>View Details ↗</span>
                    </div>
                  </div>

                  {/* Card info */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px" }}>
                    <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: FONT, marginBottom: 6, fontWeight: 400 }}>{p.location}</p>
                    <h3 style={{ color: C.white, fontSize: 22, fontFamily: FONT, fontWeight: 400, margin: "0 0 10px", lineHeight: 1.25 }}>{p.name}</h3>
                    <span style={{ color: "rgba(75,204,212,0.6)", fontSize: 12, fontFamily: FONT, letterSpacing: "0.16em" }}>View Details ↗</span>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Experience strip */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="proj-experience-strip"
            >
              <MedicalCross size={24} color={C.teal} opacity={0.6} />
              <div>
                <p style={{ color: C.white, fontSize: 18, fontFamily: FONT, margin: 0, lineHeight: 1.3, fontWeight: 400 }}>
                  The Experience Behind Every Project
                </p>
                <p style={{ color: "rgba(255,255,255,0.90)", fontSize: 15, margin: "4px 0 0", lineHeight: 1.5, fontWeight: 400, fontFamily: FONT }}>
                  50+ healthcare infrastructure projects delivered across India, the UK, and Europe.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════════════════
            FINAL CTA, READY TO START
        ═══════════════════════════════════ */}
        <section style={{ background: "#060f1e", padding: "120px 0", position: "relative", overflow: "hidden" }}>
          {[700, 500, 340].map((size, i) => (
            <div key={size} aria-hidden="true"
              style={{
                position: "absolute", top: "50%", left: "50%",
                width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2,
                borderRadius: "50%", border: `1px solid rgba(75,204,212,${0.02 + i * 0.01})`, pointerEvents: "none", willChange: "transform",
                animation: `${i % 2 === 0 ? "spinCW" : "spinCCW"} ${60 + i * 20}s linear infinite`,
              }}
            />
          ))}

          <div className="proj-cta-wrap">
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
            >
              <SectionLabel text="Ready to Start" light />
              <h2 style={{ color: C.white, fontSize: "clamp(2.2rem, 4.5vw, 4.68rem)", marginBottom: 20, fontWeight: 400, lineHeight: 1.1, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Your Hospital Project Deserves<br />
                <em style={{ color: C.teal }}>Specialists. Not Generalists.</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.92)", marginBottom: 48, lineHeight: 1.85, fontSize: 18, maxWidth: 480, margin: "0 auto 48px" , fontFamily: "Calibri, Arial, sans-serif", fontWeight: 700 }}>
                Whether you are starting from zero or at any stage of your healthcare project, ARCHORA is ready to help.
              </p>
              <div className="proj-cta-btn-row">
                <button onClick={() => navigate("/contact")} style={{
                  padding: "14px 32px", background: C.blue, color: C.white,
                  border: "none", fontSize: 19, letterSpacing: "0.18em",
                  textTransform: "uppercase", fontFamily: "monospace", cursor: "pointer",
                }}>Start Your Project Consultation →</button>
                <button onClick={() => navigate("/services")} style={{
                  padding: "14px 32px", background: "transparent",
                  color: "rgba(75,204,212,0.75)", border: "1px solid rgba(75,204,212,0.28)",
                  fontSize: 19, letterSpacing: "0.18em", textTransform: "uppercase",
                  fontFamily: "monospace", cursor: "pointer",
                }}>Explore Our Services →</button>
                <button onClick={() => navigate("/facilities")} style={{
                  padding: "14px 32px", background: "transparent",
                  color: "rgba(255,255,255,0.95)", border: "1px solid rgba(255,255,255,0.18)",
                  fontSize: 19, letterSpacing: "0.18em", textTransform: "uppercase",
                  fontFamily: "monospace", cursor: "pointer",
                }}>View Ongoing Projects →</button>
              </div>
              <p style={{ color: "rgba(255,255,255,0.18)", marginTop: 28, fontSize: 19, fontFamily: "monospace", letterSpacing: "0.1em" }}>
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