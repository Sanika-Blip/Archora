import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: "cat-1",
    label: "Hospitals",
    color: "#4bd1d9",
    facilities: [
      { id: "F-01", title: "Multi-Speciality Hospital", primary: "NABH HCO Accreditation", secondary: "CEA Registration, Fire NOC, BCP" },
      { id: "F-02", title: "Super-Speciality Hospital", primary: "NABH HCO Accreditation", secondary: "AERB (if radiation), CEA, Fire NOC" },
      { id: "F-03", title: "Oncology & Cancer Hospital", primary: "NABH HCO + AERB Radiation Facility Licence", secondary: "AERB eLORA, CEA, Fire NOC" },
      { id: "F-04", title: "Nursing Home & Small Hospital", primary: "NABH SHCO or Entry Level Certification", secondary: "CEA Registration, Fire NOC" },
      { id: "F-05", title: "Eye Care Hospital & Clinic", primary: "NABH Eye Care Organisation (ECO)", secondary: "CEA Registration, Fire NOC" },
      { id: "F-06", title: "Dental Hospital & Clinic", primary: "NABH Dental Healthcare Accreditation", secondary: "CEA Registration, Fire NOC" },
      { id: "F-07", title: "AYUSH Hospital", primary: "NABH AYUSH Hospital Accreditation", secondary: "AYUSH Ministry Registration, CEA" },
      { id: "F-08", title: "Rehabilitation & Care Home", primary: "NABH Care Homes Accreditation", secondary: "CEA Registration, Fire NOC" },
      { id: "F-09", title: "Cardiac Hospital & Cath Lab", primary: "NABH HCO + AERB (Cath Lab)", secondary: "AERB eLORA, CEA, Fire NOC" },
    ],
  },
  {
    id: "cat-2",
    label: "Diagnostic & Imaging",
    color: "#7eb8f7",
    facilities: [
      { id: "F-10", title: "Diagnostic Centre", primary: "NABH MIS Accreditation + NABL", secondary: "AERB eLORA for X-ray, CT, MRI, CEA" },
      { id: "F-11", title: "Radiology & Imaging Centre", primary: "NABH MIS Accreditation", secondary: "AERB eLORA (X-ray, CT, MRI, Fluoroscopy)" },
      { id: "F-12", title: "Nuclear Medicine Centre", primary: "AERB Radiation Facility Licence", secondary: "NABH MIS, eLORA, CEA" },
      { id: "F-13", title: "PET-CT & Advanced Imaging Centre", primary: "AERB Radiation Facility Licence", secondary: "NABH MIS, eLORA, CEA" },
    ],
  },
  {
    id: "cat-3",
    label: "Laboratories",
    color: "#a78bfa",
    facilities: [
      { id: "F-14", title: "Clinical Pathology Laboratory", primary: "NABL Accreditation (ISO 15189)", secondary: "NABH Medical Laboratory Certification, CEA" },
      { id: "F-15", title: "Biochemistry & Microbiology Laboratory", primary: "NABL Accreditation (ISO 15189)", secondary: "CEA Registration, Biosafety Compliance" },
      { id: "F-16", title: "Blood Bank", primary: "NABH Blood Bank Accreditation", secondary: "Drugs & Cosmetics Act Licence, CEA" },
      { id: "F-17", title: "Molecular & Genetics Laboratory", primary: "NABL Accreditation (ISO 15189)", secondary: "Biosafety Level Compliance, CEA" },
      { id: "F-18", title: "Research & Clinical Trial Laboratory", primary: "NABL Accreditation", secondary: "NABH Ethics Committee Accreditation, CEA" },
    ],
  },
  {
    id: "cat-4",
    label: "Fertility & Reproductive Health",
    color: "#34d399",
    facilities: [
      { id: "F-19", title: "IVF Lab & Fertility Centre", primary: "ART (Regulation) Act 2021 + ICMR Registration", secondary: "CEA Registration, Fire NOC, NABH SHCO" },
      { id: "F-20", title: "Surrogacy Centre", primary: "Surrogacy (Regulation) Act 2021 + State Surrogacy Board", secondary: "ART Registration, CEA" },
    ],
  },
  {
    id: "cat-5",
    label: "Medical & Nursing Education",
    color: "#f59e0b",
    facilities: [
      { id: "F-21", title: "Medical College & Teaching Hospital", primary: "NMC (National Medical Commission) Approval", secondary: "University Affiliation, CEA, Fire NOC, NABH" },
      { id: "F-22", title: "Nursing College & School of Nursing", primary: "INC Approval + State Nursing Council", secondary: "University Affiliation, CEA, Fire NOC" },
      { id: "F-23", title: "Pharmacy College", primary: "PCI (Pharmacy Council of India) Approval", secondary: "University Affiliation, CEA, Fire NOC" },
      { id: "F-24", title: "Allied Health Sciences College", primary: "State Health University Affiliation", secondary: "CEA Registration, Fire NOC" },
      { id: "F-25", title: "Dental College", primary: "DCI (Dental Council of India) Approval", secondary: "University Affiliation, CEA, Fire NOC" },
    ],
  },
  {
    id: "cat-6",
    label: "Primary & Ambulatory Care",
    color: "#fb923c",
    facilities: [
      { id: "F-26", title: "Clinic & Polyclinic", primary: "NABH Allopathic Clinics Accreditation", secondary: "CEA Registration, State Medical Council" },
      { id: "F-27", title: "Day Care Surgery Centre", primary: "NABH SHCO Accreditation", secondary: "CEA Registration, Fire NOC" },
      { id: "F-28", title: "Dialysis Centre", primary: "NABH SHCO Accreditation", secondary: "CEA Registration, Water Quality Compliance" },
      { id: "F-29", title: "Primary Health Centre (PHC)", primary: "Government NHM Standards", secondary: "NABH PHC Accreditation, CEA" },
      { id: "F-30", title: "Stroke Care Centre", primary: "NABH Primary & Advanced Stroke Centre Certification", secondary: "NABH HCO, CEA, Fire NOC" },
    ],
  },
  {
    id: "cat-7",
    label: "Specialised & Emerging",
    color: "#f43f5e",
    facilities: [
      { id: "F-31", title: "Psychiatry & Mental Health Hospital", primary: "Mental Healthcare Act 2017 + State MHA Registration", secondary: "NABH HCO or SHCO, CEA" },
      { id: "F-32", title: "Addiction & Rehabilitation Centre", primary: "IRCA Accreditation (NABH)", secondary: "Ministry of Social Justice Registration, CEA" },
      { id: "F-33", title: "Palliative Care Centre", primary: "NABH Care Homes Accreditation", secondary: "CEA Registration, Fire NOC" },
      { id: "F-34", title: "Wellness & Preventive Health Centre", primary: "NABH Certification", secondary: "CEA Registration" },
      { id: "F-35", title: "Hospital Hotel & Medical Tourism Facility", primary: "NABH MVTF Empanelment", secondary: "Ministry of Tourism, CEA, Fire NOC" },
    ],
  },
];

// ─── Facility Card ─────────────────────────────────────────────────────────────
function FacilityCard({ facility, index, color }: {
  facility: { id: string; title: string; primary: string; secondary: string };
  index: number;
  color: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/facilities/${facility.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "linear-gradient(145deg,#071e30,#0a2640)" : "linear-gradient(145deg,#061624,#040e1a)",
        border: `0.5px solid ${hovered ? color + "55" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 3,
        padding: "1.8rem 1.6rem",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.32s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 40px rgba(4,14,26,0.55), 0 0 0 0.5px ${color}25` : "none",
      }}
    >
      {/* top accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${color}, transparent)`, transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s ease" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, gap: 8 }}>
        <span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 17, letterSpacing: "2.5px", textTransform: "uppercase", color: `${color}90`, flexShrink: 0 }}>{facility.id}</span>
        <motion.div animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.4 }} transition={{ duration: 0.22 }} style={{ color }}>
          <ArrowRight size={13} />
        </motion.div>
      </div>

      <h3 style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "1.9rem", fontWeight: 300, color: "#fff", lineHeight: 1.35, marginBottom: 14, letterSpacing: "0.01em" }}>{facility.title}</h3>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 8 }}>
        <span style={{ width: 4, height: 4, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 4 }} />
        <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.90)" , fontWeight: 400 }}>{facility.primary}</p>
      </div>

      {/* "View Details" hint on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}
      >
        <span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 17, letterSpacing: "2px", textTransform: "uppercase", color: `${color}80` }}>View Details</span>
        <ArrowRight size={10} style={{ color }} />
      </motion.div>
    </motion.div>
  );
}

// ─── Category Section ──────────────────────────────────────────────────────────
function CategorySection({ category }: { category: typeof categories[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ marginBottom: "5rem" }}>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "2.2rem", paddingBottom: "1.4rem", borderBottom: `0.5px solid ${category.color}20` }}
      >
        <h2 style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "clamp(1.95rem, 2.5vw, 2.6rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.01em" }}>{category.label}</h2>
        <span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 18, letterSpacing: "2px", color: `${category.color}70`, background: `${category.color}12`, border: `0.5px solid ${category.color}30`, padding: "3px 10px", borderRadius: 20 }}>
          {category.facilities.length} types
        </span>
        <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, ${category.color}20, transparent)` }} />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
        {category.facilities.map((f, i) => (
          <FacilityCard
            key={f.id}
            facility={f}
            index={i}
            color={category.color}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function Facilities() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories
    .filter(c => activeFilter === "all" || c.id === activeFilter)
    .map(c => ({
      ...c,
      facilities: c.facilities.filter(f =>
        searchQuery === "" ||
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.primary.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(c => c.facilities.length > 0);

  return (
    <div className="min-h-screen pt-20" style={{ overflowX: "hidden" }}>
      <style>{`

        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes pulseRing { 0%,100%{transform:scale(1);opacity:0.15} 50%{transform:scale(1.08);opacity:0.25} }

        .scroll-bounce { animation: scrollBounce 1.8s ease-in-out infinite; }

        .filter-pill {
          font-family: Calibri, Arial, sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
          border: 0.5px solid transparent;
        }
        .filter-pill.inactive {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.35);
        }
        .filter-pill.inactive:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.65);
        }

        .search-input {
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(75,209,217,0.2);
          border-radius: 2px;
          padding: 10px 14px 10px 38px;
          font-family: Calibri, Arial, sans-serif;
          font-size: 15px;
          color: rgba(255,255,255,0.75);
          outline: none;
          transition: all 0.2s ease;
          width: 240px;
          letter-spacing: 0.05em;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.22); letter-spacing: 1px; }
        .search-input:focus { border-color: rgba(75,209,217,0.45); background: rgba(75,209,217,0.04); }

        .stat-chip { display: flex; flex-direction: column; align-items: center; gap: 4px; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "68vh", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(160deg, #040e1a 0%, #071e30 60%, #04141f 100%)" }}>

        {[600, 440, 290].map((size, i) => (
          <div key={size} style={{ position: "absolute", top: "50%", left: "22%", width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: "50%", border: `1px solid rgba(75,204,212,${0.03 + i * 0.015})`, pointerEvents: "none", animation: `pulseRing ${5 + i * 2}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }} />
        ))}

        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(75,209,217,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, zIndex: 2 }}>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.08)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4bd1d9", opacity: 0.6 }} />
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.08)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "5rem 5rem 5rem 6rem", zIndex: 2, width: "100%" }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}
          >
            <span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.90)" }}>Healthcare Facility Types</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.95, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "clamp(2.6rem, 4.5vw, 4.4rem)", fontWeight: 600, color: "#fff", lineHeight: 1.05, marginBottom: 24, maxWidth: 680, letterSpacing: "-0.01em" }}
          >
            Every Healthcare Facility<br />
            <em style={{ fontStyle: "italic", color: "#4bccd4" }}>We Design & Build.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 19, lineHeight: 1.95, color: "rgba(255,255,255,0.92)", maxWidth: 520, marginBottom: 44 }}
          >
            35 facility types across 7 categories, from a 200 sq ft clinic to a 1000-bed hospital campus. ARCHORA brings the same compliance rigour and clinical planning precision to every one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ display: "flex", gap: 36, flexWrap: "wrap", marginBottom: 44 }}
          >
            {[
              { num: "35", label: "Facility Types" },
              { num: "7", label: "Categories" },
              { num: "15+", label: "Compliance Bodies" },
            ].map((stat, i) => (
              <div key={i} className="stat-chip">
                <span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "2.6rem", fontWeight: 300, color: "#4bccd4", lineHeight: 1 }}>{stat.num}</span>
                <span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 17, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.80)" }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <Link to="/contact">
              <button
                style={{ padding: "13px 28px", fontSize: 19, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "Calibri, Arial, sans-serif", background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              >
                Discuss Your Facility →
              </button>
            </Link>
            <Link to="/services">
              <button
                style={{ padding: "13px 28px", fontSize: 19, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "Calibri, Arial, sans-serif", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", transition: "all .25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(75,204,212,0.45)"; (e.currentTarget as HTMLButtonElement).style.color = "#4bccd4"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              >
                View Our Services
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 7, letterSpacing: "0.28em", color: "rgba(75,204,212,0.35)", textTransform: "uppercase" }}>Scroll</span>
          <div className="scroll-bounce" style={{ color: "rgba(75,204,212,0.35)" }}><ChevronDown size={15} /></div>
        </motion.div>
      </section>

      {/* ── Filter + Search Bar ── */}
      <div style={{ position: "sticky", top: 72, zIndex: 40, background: "rgba(4,14,26,0.97)", backdropFilter: "blur(16px)", borderBottom: "0.5px solid rgba(75,204,212,0.1)", padding: "14px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 3rem", display: "flex", alignItems: "center", gap: 12, overflowX: "auto" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(75,204,212,0.5)", pointerEvents: "none" }} />
            <input
              className="search-input"
              placeholder="Search facilities..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ width: "0.5px", height: 20, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
            <button
              className={`filter-pill ${activeFilter === "all" ? "" : "inactive"}`}
              onClick={() => setActiveFilter("all")}
              style={activeFilter === "all" ? { background: "rgba(75,209,217,0.12)", borderColor: "rgba(75,209,217,0.35)", color: "#4bd1d9" } : {}}
            >
              All
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                className={`filter-pill ${activeFilter === c.id ? "" : "inactive"}`}
                onClick={() => setActiveFilter(c.id)}
                style={activeFilter === c.id ? { background: `${c.color}15`, borderColor: `${c.color}40`, color: c.color } : {}}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Facilities Grid ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "6rem 0 8rem", minHeight: "60vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 3rem" }}>
          {filteredCategories.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 0" }}>
              <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "2.4rem", fontWeight: 300, color: "rgba(255,255,255,0.80)", marginBottom: 12 }}>No facilities found</p>
              <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 19, color: "rgba(255,255,255,0.2)" }}>Try a different search term</p>
            </div>
          ) : (
            filteredCategories.map(category => (
              <CategorySection key={category.id} category={category} />
            ))
          )}
        </div>
      </section>

      {/* ── Compliance Reference ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#daeef9 50%,#e8f4fd 100%)", padding: "7rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 19, letterSpacing: "3px", textTransform: "uppercase", color: "#185FA5", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <span style={{ display: "block", width: 36, height: "0.5px", background: "#185FA5" }} />Compliance Bodies<span style={{ display: "block", width: 36, height: "0.5px", background: "#185FA5" }} />
            </p>
            <h2 style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "clamp(2.6rem,4vw,3.9rem)", fontWeight: 300, color: "#042C53", lineHeight: 1.15 }}>
              Every Regulatory Authority. <em style={{ fontStyle: "italic", color: "#185FA5" }}>Mapped.</em>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { abbr: "NABH", slug: "nabh", name: "National Accreditation Board for Hospitals & Healthcare Providers", covers: "Hospitals, Clinics, Blood Banks, Imaging, AYUSH, Eye Care, Dental, Labs, Care Homes" },
              { abbr: "NABL", slug: "nabl", name: "National Accreditation Board for Testing and Calibration Laboratories", covers: "All clinical, pathology, and diagnostic laboratories (ISO 15189)" },
              { abbr: "AERB", slug: "aerb", name: "Atomic Energy Regulatory Board", covers: "X-ray, CT, MRI, PET-CT, Radiotherapy, Cath Lab, Nuclear Medicine" },
              { abbr: "NMC", slug: "nmc", name: "National Medical Commission", covers: "Medical colleges and teaching hospitals" },
              { abbr: "INC", slug: "inc", name: "Indian Nursing Council", covers: "Nursing colleges and schools of nursing" },
              { abbr: "DCI", slug: "dci", name: "Dental Council of India", covers: "Dental colleges and dental hospitals" },
              { abbr: "PCI", slug: "pci", name: "Pharmacy Council of India", covers: "Pharmacy colleges" },
              { abbr: "CEA", slug: "clinical-establishments-act", name: "Clinical Establishments Act Registration", covers: "All clinical establishments" },
              { abbr: "Fire NOC", slug: "fire-noc", name: "State Fire Department", covers: "All healthcare buildings" },
              { abbr: "ART Authority", slug: "art-authority", name: "Assisted Reproductive Technology (Regulation) Act 2021", covers: "IVF labs, fertility centres, surrogacy centres" },
              { abbr: "ICMR", slug: "icmr", name: "Indian Council of Medical Research", covers: "IVF labs and ART clinics" },
              { abbr: "IRCA", slug: "irca", name: "Integrated Rehabilitation Centre for Addicts", covers: "Addiction and rehabilitation centres" },
            ].map((item, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-30px" });
              return (
                <motion.div
                  key={item.abbr}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => navigate(`/compliance/${item.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") navigate(`/compliance/${item.slug}`); }}
                  aria-label={`View ${item.abbr} compliance details`}
                  style={{ padding: "1.6rem 1.4rem", background: "rgba(4,44,83,0.04)", border: "0.5px solid rgba(24,95,165,0.14)", borderRadius: 3, transition: "all 0.28s ease", cursor: "pointer", outline: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(4,44,83,0.09)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(24,95,165,0.3)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(4,44,83,0.04)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(24,95,165,0.14)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
                >
                  <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "1.7rem", fontWeight: 500, color: "#042C53", marginBottom: 6 }}>{item.abbr}</p>
                  <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 17, lineHeight: 1.7, color: "#185FA5", marginBottom: 10 , fontWeight: 400 }}>{item.name}</p>
                  <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 17, lineHeight: 1.75, color: "rgba(4,44,83,0.90)" , fontWeight: 400, marginBottom: 12 }}>{item.covers}</p>
                  <span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", color: "#185FA5", opacity: 0.7 }}>View Details →</span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#040e1a", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        {[600, 420, 260].map((size, i) => (
          <motion.div key={size} style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: "50%", border: `1px solid rgba(75,204,212,${0.02 + i * 0.01})`, pointerEvents: "none" }} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 70 + i * 20, repeat: Infinity, ease: "linear" }} />
        ))}

        <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 3rem", textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 18, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(75,204,212,0.4)", marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <span style={{ display: "block", width: 24, height: "0.5px", background: "rgba(75,204,212,0.35)" }} />Don't See Your Facility Type?<span style={{ display: "block", width: 24, height: "0.5px", background: "rgba(75,204,212,0.35)" }} />
            </p>
            <h2 style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "clamp(2.6rem,4.5vw,4.42rem)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              Tell Us About Your<br /><em style={{ fontStyle: "italic", color: "#4bccd4" }}>Facility Vision</em>
            </h2>
            <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 19, color: "rgba(255,255,255,0.88)", lineHeight: 1.9, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" , fontWeight: 400 }}>
              Healthcare infrastructure is not one-size-fits-all. Speak to our team and we will map out exactly what your project needs.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact">
                <button
                  style={{ padding: "13px 30px", fontSize: 19, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "Calibri, Arial, sans-serif", background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .25s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#4bccd4"; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                >
                  Book a Free Consultation
                </button>
              </Link>
              <button
                onClick={() => window.open("https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project.", "_blank")}
                style={{ padding: "13px 30px", fontSize: 19, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "Calibri, Arial, sans-serif", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", transition: "all .25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(75,204,212,0.45)"; (e.currentTarget as HTMLButtonElement).style.color = "#4bccd4"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              >
                WhatsApp Us
              </button>
            </div>
            <p style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.15)", marginTop: 24, letterSpacing: "0.1em" }}>
              No obligation · No sales pressure · Just clarity.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}