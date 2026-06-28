import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "bullets"; intro?: string; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; text: string }
  | { type: "divider" }
  | { type: "cta"; heading: string; body: string }
  | { type: "faq"; items: { q: string; a: string }[] };

interface Article {
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
  content: ContentBlock[];
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE DATA
// ─────────────────────────────────────────────────────────────────────────────
const articles: Article[] = [
  // ── ARTICLE 01 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: "healing-by-design-how-architecture-influences-patient-recovery",
    category: "Hospital Design",
    title: "Healing by Design: How Hospital Architecture Directly Influences Patient Recovery",
    excerpt:
      "Every corridor, window orientation, ceiling height, and material choice has a measurable impact on how quickly patients recover. The built environment is a silent but powerful caregiver.",
    date: "June 27, 2025",
    readTime: "7–8 min read",
    author: "Team ARCHORA",
    tags: ["Biophilic Design", "NABH", "Patient Recovery", "Acoustics", "HVAC"],
    image: "/images/journal/healing-by-design.jpg",
    content: [
      { type: "paragraph", text: "The hospital you design is not just a building. It is a clinical tool. Every corridor, every window orientation, every ceiling height, every material choice, each of these decisions has a measurable impact on how quickly patients recover, how safely staff operate, and how confidently families trust your facility." },
      { type: "paragraph", text: "Modern healthcare research has confirmed what instinct has always suggested: the built environment is a silent but powerful caregiver. At ARCHORA, this principle sits at the foundation of every hospital project we design." },
      { type: "paragraph", text: "This article explores the science, the strategy, and the specific design interventions that transform a hospital from a place of treatment into a genuine environment of healing." },
      { type: "heading2", text: "1. Natural Light & Biophilic Design: The Evidence Is Undeniable" },
      { type: "paragraph", text: "Biophilic design (the intentional integration of natural elements into the built environment) is no longer an architectural trend. It is an evidence-based clinical strategy." },
      { type: "paragraph", text: "Research published in peer-reviewed journals consistently shows that patients in rooms with access to natural light and outdoor views:" },
      { type: "bullets", items: ["Experience shorter hospital stays, on average 8–20% fewer inpatient days", "Require less pain medication, studies show up to 22% reduction in analgesic consumption", "Report significantly lower anxiety and depression scores", "Demonstrate better sleep quality due to regulated circadian rhythms", "Show faster post-surgical recovery across multiple specialties"] },
      { type: "paragraph", text: "The absence of natural light, by contrast, disrupts melatonin production, increases cortisol levels, and extends recovery timelines, measurably and consistently." },
      { type: "heading3", text: "How ARCHORA designs for natural light and biophilia:" },
      { type: "bullets", items: ["South and east-facing window orientation in recovery wards and IPD rooms", "Internal landscaped courtyards visible from patient rooms, corridors, and waiting areas", "Skylights in public circulation zones, OPD waiting, and staff rest areas", "Vertical green walls and planter integration in lobbies and transition spaces", "Glazed nurse station partitions that preserve sightlines while controlling acoustics"] },
      { type: "callout", text: "The goal is not aesthetics, it is measurable clinical benefit delivered through architecture." },
      { type: "heading2", text: "2. Acoustic Design: Silence Is a Clinical Intervention" },
      { type: "paragraph", text: "Hospital noise is one of the most underestimated threats to patient recovery. The World Health Organisation recommends hospital noise levels not exceed 35 dBA in patient rooms at night. Studies across Indian hospitals have recorded average ICU noise levels of 60–90 dBA, nearly double the safe threshold." },
      { type: "paragraph", text: "The clinical consequences of sustained noise exposure in hospital environments include:" },
      { type: "bullets", items: ["Elevated stress hormone (cortisol) levels", "Increased heart rate and blood pressure", "Sleep fragmentation, directly linked to slower recovery", "Heightened pain sensitivity", "Increased incidence of ICU delirium, particularly in elderly patients"] },
      { type: "heading3", text: "ARCHORA's acoustic design approach:" },
      { type: "bullets", items: ["Acoustic ceiling panels in ICUs, NICUs, post-operative wards, and recovery bays", "Sound-absorbing flooring systems in high-traffic clinical corridors", "Buffer corridors and zoned nurse stations that reduce ambient clinical noise reaching patient bays", "Fully sealed and insulated HVAC ducting, mechanical noise is a frequently overlooked acoustic pollutant", "Sound masking systems in sensitive zones including psychiatric wards and consultation rooms", "Solid-core, acoustically rated doors for single-room ICU bays and isolation rooms"] },
      { type: "callout", text: "Acoustic comfort is not a luxury specification. In an ICU or NICU, it is a clinical requirement." },
      { type: "heading2", text: "3. HVAC & Air Quality: Infection Control Begins With Architecture" },
      { type: "paragraph", text: "Hospital-acquired infections (HAIs) affect approximately 10% of hospitalised patients globally and are among the leading causes of preventable patient harm. A significant proportion of HAIs are airborne, meaning the HVAC system in your hospital is either part of the solution or part of the problem." },
      { type: "paragraph", text: "Air quality in a hospital is not a mechanical afterthought. It must be designed into the building from the very first planning stage." },
      { type: "table", headers: ["Zone", "Minimum Air Changes (ACH)", "Pressure Requirement"], rows: [["General Ward", "6–8 ACH", "Neutral"], ["ICU / HDU", "20 ACH minimum", "Positive"], ["Major OT", "20–30 ACH", "Positive"], ["Isolation Room", "12 ACH minimum", "Negative"], ["NICU", "15 ACH minimum", "Positive"], ["Sterile Corridor", "20 ACH", "Positive"]] },
      { type: "heading3", text: "ARCHORA's MEP and HVAC design approach:" },
      { type: "bullets", items: ["Dedicated AHUs with HEPA H13/H14 filtration for OTs, ICUs, and NICUs", "Correctly maintained pressure differentials between clean, semi-clean, and contaminated zones", "Negative-pressure isolation rooms for infectious patients, designed in from day one", "Separate exhaust systems for sterile and non-sterile zones, no cross-contamination pathways", "Fresh air intake ratios designed per ASHRAE 170 and NABH standards for each zone type", "BMS (Building Management System) integration for real-time air quality monitoring"] },
      { type: "heading2", text: "4. Wayfinding & Circulation: Stress-Free Navigation Is a Design Responsibility" },
      { type: "paragraph", text: "A patient arriving at your hospital is often anxious, unwell, or in pain. A family member accompanying them is worried. Neither should spend a single unnecessary minute lost in a confusing corridor." },
      { type: "paragraph", text: "Poor wayfinding is not just an inconvenience, it delays emergency response, increases stress, creates congestion at critical zones, and communicates institutional disorganisation to every visitor who experiences it." },
      { type: "heading3", text: "ARCHORA's circulation and wayfinding design principles:" },
      { type: "bullets", items: ["Spine-based and radial layouts, clear primary circulation spines with secondary branches to departments", "Departmental zoning, public zones (OPD, pharmacy, billing) separated from clinical zones (ICU, OT, wards) with clear transition points", "Vertical alignment, Emergency, OT, and ICU positioned for shortest possible transfer path in trauma and cardiac scenarios", "Single-direction patient loops, Entry → Registration → Waiting → Consultation → Diagnostics → Pharmacy → Exit, no backtracking, no crossing of streams", "Color-coded floor and corridor systems, intuitive visual navigation without reliance on reading signage", "Visual anchors, artwork, lighting features, and natural elements at key decision points in circulation routes", "Multilingual digital wayfinding, for hospitals serving diverse patient populations"] },
      { type: "heading2", text: "5. Human-Centric Interiors: Materials, Finishes & the Psychology of Colour" },
      { type: "paragraph", text: "Hospital interiors must simultaneously satisfy clinical requirements, infection control, durability, ease of cleaning, and human requirements, comfort, calm, dignity, and psychological safety. These are not competing goals. With the right design approach, they reinforce each other." },
      { type: "heading3", text: "ARCHORA's material and finish specifications:" },
      { type: "bullets", items: ["Anti-microbial, non-slip flooring, seamless vinyl or epoxy systems in clinical zones; slip-resistant ceramic in public areas", "Seamless wall coatings, no joints, gaps, or crevices where pathogens can accumulate", "Non-glare surfaces throughout, reducing visual fatigue for patients and staff on long shifts", "Washable, anti-fungal paints in all clinical zones, especially OTs, ICUs, and isolation areas"] },
      { type: "table", headers: ["Zone", "Recommended Palette", "Clinical Rationale"], rows: [["ICU & Critical Care", "Blues and soft greens", "Reduces anxiety; promotes trust and calm"], ["Paediatric Ward", "Warm yellows, soft oranges", "Creates warmth, reduces fear in children"], ["Maternity & Labour", "Warm neutrals, sage greens", "Promotes calm and emotional safety"], ["OPD & Waiting Areas", "Earthy tones, warm whites", "Reduces perceived wait time; grounded familiarity"], ["Corridors & Transition", "Neutral with accent lighting", "Maintains calm; reduces cognitive fatigue"], ["Mental Health Units", "Soft warm tones, no stark whites", "Avoids clinical sterility; supports emotional comfort"]] },
      { type: "heading2", text: "6. Dignity, Privacy & Psychological Safety" },
      { type: "paragraph", text: "Healing requires dignity. A patient who feels exposed, overheard, or visually observed without consent experiences measurably higher anxiety, and anxiety directly interferes with recovery. Privacy in hospital design is not simply a curtain around a bed. It requires architectural intention." },
      { type: "bullets", items: ["Recessed bed zones with privacy curtains and acoustic separation in semi-private wards", "Consultation rooms with door-seal acoustic insulation, conversations cannot be overheard", "Separate entrance and circulation paths for maternity, psychiatry, and oncology wings", "Family zones designed adjacent to ICU and critical care, with sightlines managed to reduce anxiety without clinical intrusion", "Patient-controlled environmental features, window blinds, lighting control, temperature adjustment where possible"] },
      { type: "heading2", text: "7. Neuroarchitecture & Smart Hospitals: The Next Frontier" },
      { type: "paragraph", text: "The emerging discipline of neuroarchitecture (the study of how physical spaces affect neurological function, hormone production, and psychological state) is rapidly influencing how the world's best hospitals are being designed. At ARCHORA, we are already integrating these principles into our projects." },
      { type: "bullets", items: ["Rhythmic spatial progression in corridors and transition spaces, avoiding long, unbroken institutional hallways that increase anxiety", "Visual symmetry in key clinical spaces, reducing cognitive load for patients and staff", "Circadian lighting systems, tunable LED systems that shift colour temperature throughout the day, supporting natural biological rhythms", "Sensory modulation, deliberate use of texture, material variation, and spatial volume changes to create a varied, human-scale environment"] },
      { type: "callout", text: "Every corridor is a clinical decision. Every window is a therapeutic intervention. Every material choice is a statement of care." },
      { type: "faq", items: [{ q: "How does hospital architecture affect patient recovery?", a: "Hospital architecture influences patient recovery through natural light exposure, acoustic comfort, air quality, infection control design, and stress-reducing spatial planning. Research consistently shows that well-designed hospital environments reduce inpatient stay duration, lower pain medication requirements, and improve overall clinical outcomes." }, { q: "What is biophilic design in hospitals?", a: "Biophilic design in hospitals refers to the intentional integration of natural light, greenery, views of nature, and natural materials into the built environment. It is evidence-based design that reduces patient anxiety, improves sleep quality, and accelerates recovery." }, { q: "What is neuroarchitecture in healthcare?", a: "Neuroarchitecture is the study of how physical spaces affect brain function, hormone production, and psychological state. In healthcare settings, it is applied to reduce patient anxiety, improve staff performance, and create environments that actively support healing." }, { q: "How does ARCHORA ensure NABH compliance in hospital design?", a: "ARCHORA integrates NABH compliance requirements (including infection control zoning, HVAC specifications, air change rates, pressure differentials, and material standards) into the design from day one. This eliminates costly retrofitting after construction and ensures facilities are accreditation-ready at opening." }] },
      { type: "cta", heading: "Ready to Design a Hospital That Heals?", body: "If you are planning a new hospital, expanding an existing facility, or renovating a healthcare space, ARCHORA's team would be glad to walk you through what great healthcare design looks like for your specific project." },
    ],
  },

  // ── ARTICLE 02 ──────────────────────────────────────────────────────────────
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
    content: [
      { type: "paragraph", text: "Planning a hospital in India is one of the most rewarding and one of the most complex infrastructure undertakings you can pursue. The clinical vision, the capital investment, the community need, all of it is real and significant. But between your vision and your opening day lies a regulatory pathway that most hospital promoters underestimate, and many navigate without a clear map." },
      { type: "paragraph", text: "The result is predictable: delayed approvals, redesign costs, stalled construction, and deferred revenues. At ARCHORA, we have worked through this regulatory pathway across multiple hospital projects. This guide exists because we believe every hospital promoter deserves a clear, honest, and complete picture of what approvals are required, and critically, how your architectural and MEP design decisions directly determine how smoothly you move through each stage." },
      { type: "callout", text: "This is not generic regulatory information. This is a practitioner's guide, written from the experience of designing NABH-compliant hospitals from the ground up." },
      { type: "heading2", text: "Why Licensing Must Begin at the Design Stage: Not After It" },
      { type: "paragraph", text: "Most hospital promoters treat licensing as a post-design activity, something to address once the building is designed, or worse, once it is built. This approach is expensive, time-consuming, and frequently forces redesign of completed construction." },
      { type: "paragraph", text: "Regulatory bodies in India (from municipal corporations to the State Pollution Control Board to NABH) evaluate your facility against specific spatial, technical, and operational criteria. If your design does not meet those criteria, you redesign. If you have already built, you reconstruct." },
      { type: "callout", text: "The right approach (and the ARCHORA approach) is to treat compliance as a design input, not a post-construction checklist." },
      { type: "heading2", text: "Stage 1: Land & Construction Approvals" },
      { type: "paragraph", text: "Before a single column is cast, your project must clear land and construction-stage regulatory requirements. These approvals establish the legal right to build and define the physical parameters of your facility." },
      { type: "heading3", text: "1A. Change of Land Use (CLU) / Land Use Clearance" },
      { type: "paragraph", text: "Confirmation that the land parcel is approved for institutional or healthcare use under the applicable zonal master plan. You cannot legally construct a hospital on land designated for residential, agricultural, or industrial use without first obtaining CLU from the relevant town planning authority." },
      { type: "bullets", intro: "Key considerations:", items: ["Zonal regulations vary significantly across states and municipal jurisdictions", "Some states have dedicated healthcare zones in their master plans; others require case-by-case CLU applications", "The process timeline ranges from 30 days to 6+ months depending on jurisdiction", "CLU applications typically require site plans, ownership documents, and proposed use descriptions"] },
      { type: "heading3", text: "1B. Building Plan Sanction (Municipal / Local Body Approval)" },
      { type: "paragraph", text: "No construction activity can legally commence without a sanctioned building plan. Unapproved construction is liable to demolition orders regardless of construction stage." },
      { type: "bullets", intro: "Key design parameters evaluated at this stage:", items: ["FAR / FSI compliance, built-up area relative to plot area, as per local development control regulations", "Setback compliance, front, rear, and side setbacks as per NBC and local bylaws", "Parking norms, number of ECS (equivalent car spaces) per bed or built-up area", "Building height, compliance with aviation authority restrictions where applicable", "Access and circulation, vehicular access width, ambulance bay, separate entry-exit planning"] },
      { type: "bullets", intro: "Common causes of building plan rejection:", items: ["Incorrect FAR calculation", "Insufficient parking provision", "Non-compliant setbacks on one or more sides", "Missing or incorrect fire egress documentation"] },
      { type: "heading3", text: "1C. Environmental Clearance (EC)" },
      { type: "table", headers: ["Project Scale", "Applicable Authority"], rows: [["Built-up area between 20,000–1,50,000 sq.m", "State SEIAA"], ["Built-up area above 1,50,000 sq.m", "MoEFCC (Central)"], ["Below 20,000 sq.m", "Generally exempt, confirm with state authority"]] },
      { type: "bullets", intro: "Key design implications:", items: ["ETP (Effluent Treatment Plant) must be sized and located in the facility design", "STP (Sewage Treatment Plant) specifications must be documented", "Biomedical and solid waste management flow must be designed into the facility layout", "Green belt area requirements must be incorporated into site planning"] },
      { type: "heading2", text: "Stage 2: Fire Safety & Structural Compliance" },
      { type: "heading3", text: "2A. Fire NOC (No Objection Certificate)" },
      { type: "paragraph", text: "Certificate issued by the State Fire Department confirming that your building design and installed systems comply with fire safety standards. Governing standard: National Building Code of India (NBC) 2016, Part 4, Fire and Life Safety." },
      { type: "bullets", intro: "Key fire safety requirements for hospitals:", items: ["Escape routes: Minimum two staircases, clearly marked, unobstructed at all times", "Fire compartmentalisation: Fire-rated walls and doors separating zones, especially between clinical and non-clinical areas", "Detection systems: Smoke detectors in all zones, addressable fire alarm systems preferred", "Suppression systems: Sprinklers in high-risk zones; fire hydrant systems with adequate pressure and coverage", "Emergency lighting: Maintained luminance on all escape routes during power failure", "Signage: Photoluminescent exit signage throughout"] },
      { type: "bullets", intro: "Critical hospital-specific fire considerations:", items: ["Patient evacuation in ICU and OT settings requires dedicated refuge areas and evacuation protocols designed into the layout", "Medical gas pipeline zones (oxygen, nitrous oxide) require additional fire suppression considerations", "Generator rooms and electrical panels require fire-rated separation and suppression systems"] },
      { type: "heading2", text: "Stage 3: Pollution Control, Biomedical Waste & Health Safety" },
      { type: "heading3", text: "3A. Consent to Establish (CTE), State Pollution Control Board" },
      { type: "paragraph", text: "Approval from the State Pollution Control Board (SPCB) to establish a facility that will generate effluents or emissions, which hospitals do. This must be obtained before construction begins." },
      { type: "heading3", text: "3B. Biomedical Waste Management Authorization" },
      { type: "paragraph", text: "Governing regulation: Biomedical Waste Management Rules, 2016 (amended 2019). Requires formal authorization from the SPCB for generation, collection, storage, and disposal of biomedical waste." },
      { type: "table", headers: ["Colour", "Waste Category"], rows: [["Yellow", "Anatomical waste, soiled linen, expired medicines"], ["Red", "Recyclable contaminated plastic"], ["Blue / White", "Glassware, metallic implants, sharps"], ["Black", "Incineration ash, cytotoxic waste"]] },
      { type: "heading2", text: "Stage 4: Electrical, MEP & Utility Compliance" },
      { type: "heading3", text: "4A. Electrical Safety Certificate" },
      { type: "bullets", intro: "Hospital-specific electrical requirements:", items: ["100% backup power for ICU, OT, emergency, and critical care areas, mandatory", "Essential supply circuits for life support equipment, separate from general power", "UPS with minimum 30-minute backup for critical zones", "Isolation transformers for OT power supply, reduces electrical hazard risk"] },
      { type: "heading3", text: "4C. Medical Gas Pipeline System (MGPS) Compliance" },
      { type: "bullets", intro: "Gases covered:", items: ["Medical oxygen (O₂)", "Nitrous oxide (N₂O)", "Medical air (compressed)", "Vacuum (suction)", "Carbon dioxide (CO₂), where applicable"] },
      { type: "heading2", text: "Stage 5: NABH Accreditation" },
      { type: "paragraph", text: "NABH (National Accreditation Board for Hospitals & Healthcare Providers) accreditation is the gold standard of quality recognition for hospitals in India. While not legally mandatory in most states, it is increasingly required for empanelment with government health schemes (Ayushman Bharat, CGHS, ECHS), insurance company partnerships, medical tourism credibility, and premium patient trust." },
      { type: "table", headers: ["Pathway", "Suitable For", "Key Focus"], rows: [["Entry Level Certification", "New or smaller hospitals", "Basic standards compliance"], ["Full Accreditation", "Established hospitals", "Comprehensive quality standards"], ["Pre-Accreditation Entry Level", "Hospitals in early operational stage", "Preparatory assessment"]] },
      { type: "bullets", intro: "NABH design and infrastructure requirements include:", items: ["Access and infrastructure: Ramps, accessible toilets, signage for differently-abled patients", "Infection control zoning: Defined clean, semi-clean, and dirty zones with directional workflow", "OT and ICU design: Specific standards for area, air quality, finishes, equipment, and zoning", "Waste management: Physical infrastructure for segregation, storage, and disposal", "Fire and safety: Compliance with NBC fire standards and documented evacuation plans", "Nurse station placement: Sightlines and response distance standards", "Patient privacy: Architectural provisions for visual and acoustic privacy"] },
      { type: "heading2", text: "Master Timeline: Hospital Approval Pathway" },
      { type: "table", headers: ["Stage", "Approval", "Typical Timeline"], rows: [["Pre-Design", "CLU / Land Use Clearance", "1–6 months"], ["Design Stage", "Building Plan Sanction", "1–4 months"], ["Design Stage", "Environmental Clearance", "3–9 months"], ["Design Stage", "CTE, Pollution Control Board", "2–4 months"], ["Construction", "Structural Stability Certificate", "1–2 months"], ["Pre-Completion", "Fire NOC", "1–3 months"], ["Pre-Completion", "Electrical Safety Certificate", "1–2 months"], ["Pre-Completion", "MGPS Compliance", "2–4 weeks"], ["Pre-Opening", "Biomedical Waste Authorization", "1–2 months"], ["Pre-Opening", "Clinical Establishment License", "1–3 months"], ["Post-Opening", "NABH Accreditation", "6–18 months"]] },
      { type: "callout", text: "Important: Timelines vary significantly by state, jurisdiction, and project complexity. Early engagement with regulatory authorities (and a compliance-first design approach) significantly compresses the overall timeline." },
      { type: "faq", items: [{ q: "What are the mandatory licenses required to open a hospital in India?", a: "The mandatory licenses include: Land Use Clearance (CLU), Building Plan Sanction from the local municipal body, Fire NOC from the State Fire Department, Consent to Establish from the State Pollution Control Board, Biomedical Waste Management Authorization, Electrical Safety Certificate, Clinical Establishment Registration, and Structural Stability Certificate. Environmental Clearance is additionally required for hospitals above 20,000 sq.m built-up area." }, { q: "Is NABH accreditation mandatory for hospitals in India?", a: "NABH accreditation is not legally mandatory in most Indian states. However, it is effectively required for empanelment under Ayushman Bharat (PM-JAY), CGHS, ECHS, and most state government health schemes. It is also increasingly required by insurance companies and is a strong differentiator for private patient trust." }, { q: "How long does it take to get all approvals for a new hospital in India?", a: "The complete hospital approval timeline in India typically ranges from 18 to 36 months for a new greenfield hospital, depending on location, scale, jurisdiction, and the complexity of the approval pathway. Engaging a compliance-experienced design partner and pursuing parallel approval tracks can significantly reduce this timeline." }, { q: "How does hospital design affect regulatory approvals?", a: "Hospital design directly impacts every stage of the regulatory approval process. Building plan sanction evaluates FAR, setbacks, parking, and fire egress. Environmental clearance requires designed ETP and STP systems. Fire NOC requires compliant escape routes, compartmentalisation, and suppression systems. NABH accreditation evaluates zoning, infection control workflows, and infrastructure standards." }] },
      { type: "cta", heading: "Planning a Hospital? Start With the Right Design Partner.", body: "ARCHORA's team brings together healthcare architects, MEP engineers, and compliance specialists who have navigated this exact regulatory pathway across multiple hospital projects." },
    ],
  },

  // ── ARTICLE 03 ──────────────────────────────────────────────────────────────
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
    content: [
      { type: "paragraph", text: "A hospital can have a striking facade, premium finishes, and the latest equipment. But if the internal spatial logic is flawed, none of it matters." },
      { type: "paragraph", text: "At ARCHORA, we treat zoning and circulation not as a technical formality but as the foundational intelligence of every hospital we design." },
      { type: "heading2", text: "What Is Hospital Zoning?" },
      { type: "paragraph", text: "Hospital zoning is the systematic division of a healthcare facility into areas based on hygiene sensitivity, functional purpose, access requirements, and infection risk level." },
      { type: "bullets", intro: "Effective zoning is simultaneously:", items: ["A clinical tool, it protects patients and staff from cross-contamination", "An operational tool, it makes staff movement and material flow efficient", "A regulatory tool, it is evaluated by NABH, fire authorities, and pollution control boards during approvals"] },
      { type: "heading2", text: "The Four Primary Hospital Zones" },
      { type: "heading3", text: "Zone 1, Clean Zone (Highest Hygiene Sensitivity)" },
      { type: "paragraph", text: "Spaces included: Operating theatres, ICU, CSSD (Central Sterile Supply Department), NICU, catheterisation labs, modular OTs, sterile corridors." },
      { type: "bullets", intro: "Defining characteristics:", items: ["Highest air quality standards, HEPA filtration, 20+ air changes per hour", "Positive pressure maintained relative to adjacent zones, prevents ingress of contaminated air", "Strictly controlled access, clinical staff only, with proper scrub and PPE protocols", "Seamless, anti-microbial surfaces, no joints, crevices, or porous materials", "No through-traffic, these zones are destination-only, never circulation pathways"] },
      { type: "heading3", text: "Zone 2, Semi-Clean Zone (Moderate Hygiene Sensitivity)" },
      { type: "paragraph", text: "Spaces included: OPD consultation rooms, diagnostic laboratories, radiology, pharmacy, nurse stations, patient wards, physiotherapy." },
      { type: "bullets", intro: "Design requirements:", items: ["Clear physical separation from clean zones, typically achieved through corridors, doors, and pressure differentials", "Adequate hand hygiene facilities at every entry and exit point", "Nurse station placement with direct sightlines to patient bays", "Separation of inpatient ward zones from OPD zones to prevent cross-flow of patients"] },
      { type: "heading3", text: "Zone 3, Non-Clean / Public Zone (General Access)" },
      { type: "paragraph", text: "Spaces included: Main entrance lobby, reception and registration, waiting areas, visitor seating, cafeteria, billing and administration, pharmacy counter." },
      { type: "heading3", text: "Zone 4, Dirty Zone (Waste and Soiled Materials)" },
      { type: "paragraph", text: "Spaces included: Biomedical waste storage, soiled linen holding, janitor rooms, sluice rooms, utility corridors, morgue." },
      { type: "heading2", text: "Circulation Planning: Managing Every Flow in the Hospital" },
      { type: "paragraph", text: "If zoning defines where each function lives, circulation planning defines how everything moves between those zones." },
      { type: "heading3", text: "Patient Flow" },
      { type: "bullets", intro: "Outpatients (OPD patients):", items: ["Entry from main public entrance", "Registration, waiting, consultation, diagnostics, pharmacy, exit, a sequential loop that should require no backtracking", "OPD zones must be completely separated from inpatient and critical care zones"] },
      { type: "bullets", intro: "Emergency patients:", items: ["Dedicated emergency entry, direct access from external drop-off to resuscitation and emergency bays", "Must bypass all public and OPD zones entirely", "Direct vertical connection to ICU, OT, and blood bank, critical for response time"] },
      { type: "heading3", text: "Staff Flow" },
      { type: "bullets", items: ["Dedicated staff entry and exit points, separate from patient and public access", "Clean change rooms at the entry to sterile zones", "Service corridors for staff movement in clinical zones", "Rest areas and pantries located within staff zones"] },
      { type: "heading3", text: "Biomedical Waste Flow" },
      { type: "paragraph", text: "Biomedical waste movement is one of the most tightly regulated circulation requirements in a hospital. The movement of waste from point of generation to central storage to external collection must follow a one-directional, dedicated path." },
      { type: "bullets", items: ["Dedicated waste holding areas at point of generation in each clinical department", "Colour-coded waste bins and trolleys as per BMW Rules 2016", "Designated waste movement time windows, typically outside peak clinical hours", "Dedicated waste lift or service corridor for vertical movement"] },
      { type: "heading2", text: "Vertical and Horizontal Zoning in Multistorey Hospitals" },
      { type: "table", headers: ["Band", "Location", "Functions"], rows: [["Public", "Front / Street-facing", "OPD, registration, waiting, pharmacy, billing"], ["Mid-Core", "Central", "Nursing stations, administration, staff areas, diagnostic support"], ["Clinical", "Rear / Inward-facing", "Critical care, ICU, wards, restricted clinical zones"]] },
      { type: "table", headers: ["Floor Level", "Recommended Functions", "Rationale"], rows: [["Ground Floor", "Emergency, OPD, radiology, pharmacy, admin", "Highest public access, easiest entry and exit"], ["First / Second Floor", "Wards, step-down ICU, diagnostics", "Moderate access, inpatient movement"], ["Upper Floors", "Main ICU, OT complex, CSSD, sterile storage", "Restricted access, controlled environment easier to maintain"], ["Basement", "Laundry, engineering, biomedical waste, parking", "Service functions, no clinical activity"]] },
      { type: "callout", text: "At ARCHORA, zoning is not something we add to a design. It is the starting point of every design. The result is a hospital that works as well on day 3,650 of operation as it does on day one." },
      { type: "faq", items: [{ q: "What is hospital zoning and why is it important?", a: "Hospital zoning is the systematic division of a healthcare facility into areas based on hygiene sensitivity, infection risk, and functional purpose. It directly controls infection spread, determines staff and patient movement efficiency, and is a mandatory evaluation criterion for NABH accreditation and fire safety approvals." }, { q: "What are the four zones in hospital design?", a: "The four primary zones are: the clean zone (OT, ICU, CSSD, highest hygiene sensitivity), the semi-clean zone (OPD, wards, diagnostics, moderate hygiene sensitivity), the non-clean or public zone (reception, waiting, administration, general access), and the dirty zone (biomedical waste, soiled linen, utility, highest contamination risk)." }, { q: "How does hospital circulation planning affect infection control?", a: "Hospital circulation planning controls infection by ensuring that patient flows, staff flows, clean material flows, and waste flows never intersect. Dedicated corridors, one-directional waste routes, separate staff and patient lifts, and zone-specific access control collectively eliminate the spatial conditions that allow infections to spread." }, { q: "What is vertical zoning in a multistorey hospital?", a: "Vertical zoning refers to the strategic allocation of different functional zones across floors based on access requirements and infection sensitivity. Typically, public-facing functions occupy the ground floor, inpatient wards occupy middle floors, and high-restriction areas (OT complex, ICU, CSSD) are placed on upper floors where controlled access is easier to maintain." }, { q: "How does NABH evaluate hospital zoning during accreditation?", a: "NABH evaluates hospital zoning as part of its Facility Management and Safety standards. Assessors review the physical separation of clean and dirty zones, directional workflow for patients and materials, infection control architecture including pressure differentials and HVAC zoning, access control at sterile zone entries, and waste management infrastructure." }] },
      { type: "cta", heading: "Ready to Plan Your Hospital the Right Way?", body: "ARCHORA's team can develop a zoning and circulation strategy that is clinically intelligent, compliance-ready, and operationally efficient, whether you are planning a greenfield hospital, expanding an existing facility, or redesigning a clinical area." },
    ],
  },

  // ── ARTICLES 04–08 are omitted here for brevity — keep your existing data exactly as-is ──
  // The responsive layout changes are all in the render layer below; article data is unchanged.

   // ── ARTICLE 04 ──────────────────────────────────────────────────────────────
  {
    id: 4,
    slug: "modular-ot-design-nabh-standards-guide",
    category: "Modular OT",
    title: "How to Design a Modular OT That Meets NABH Standards: Complete Guide (2025)",
    excerpt:
      "The operating theatre is the most demanding space in any hospital. A well-designed modular OT makes doing the right thing easy, the right air pressure differentials, zoning, surface finishes, and MEP integration, all working invisibly.",
    date: "July 11, 2025",
    readTime: "9–10 min read",
    author: "Team ARCHORA",
    tags: ["Modular OT", "Laminar Airflow", "HVAC", "NABH", "MEP"],
    image:
      "/images/journal/modular-ot-design.jpg",
    content: [
      {
        type: "paragraph",
        text: "The operating theatre is the most demanding space in any hospital. It is where the highest-stakes clinical events occur, where infection control is most critical, and where the consequences of design failure are most severe.",
      },
      {
        type: "paragraph",
        text: "A poorly designed OT does not just create compliance problems. It creates infection risks that endanger patients, operational inefficiencies that slow surgical teams, and regulatory obstacles that delay or prevent NABH accreditation.",
      },
      {
        type: "paragraph",
        text: "A well-designed modular OT, on the other hand, does something remarkable: it makes doing the right thing easy. The right air pressure differentials, the right zoning, the right surface finishes, the right MEP integration, all of it working together to create an environment where surgical teams can focus entirely on patient care because the infrastructure is doing its job invisibly and reliably.",
      },
      { type: "heading2", text: "Why Modular OTs Have Become the Standard in Indian Healthcare" },
      {
        type: "paragraph",
        text: "Traditional OT construction (brick, plaster, paint) was the norm in Indian hospitals for decades. It is now widely recognised as inadequate for modern infection control standards.",
      },
      {
        type: "bullets",
        intro: "The shift to modular OTs is driven by several converging factors:",
        items: [
          "Infection control performance: Modular OTs eliminate the joints, crevices, and porous surfaces where pathogens accumulate. Prefabricated panel systems with integrated coving and seamless connections create a genuinely cleanable environment.",
          "Regulatory alignment: NABH and international healthcare standards have become progressively more specific about OT construction requirements. Modular systems are engineered to meet these specifications by design.",
          "Construction precision and speed: Prefabricated components manufactured under controlled factory conditions reduce construction variability and compress installation timelines.",
          "Future adaptability: A modular OT can be reconfigured, upgraded, or expanded without structural demolition.",
          "Lifecycle cost advantage: Lower maintenance requirements, easier cleaning, longer surface lifespan, and reduced infection-related costs make modular OTs more economical over a 15–20 year facility lifecycle.",
        ],
      },
      { type: "heading2", text: "NABH Standards for Operation Theatres: What Compliance Actually Requires" },
      { type: "heading3", text: "Zoning and Spatial Organisation" },
      {
        type: "paragraph",
        text: "NABH requires clear functional zoning within and around the OT complex. The three-zone model is the accepted standard:",
      },
      {
        type: "table",
        headers: ["Zone Classification", "Access Level", "Spaces Included"],
        rows: [
          ["Sterile Zone", "Highest restriction", "OT room, scrub sinks, sterile instrument storage"],
          ["Semi-Sterile Zone", "Controlled access", "Pre-operative holding, post-operative recovery, sterile corridor, anaesthesia preparation"],
          ["Non-Sterile Zone", "General clinical access", "Patient transfer corridor, dirty utility, staff changing, OT control desk"],
        ],
      },
      {
        type: "bullets",
        intro: "Key zoning design requirements:",
        items: [
          "Physical separation between zones, not just signage, but architectural barriers with controlled transition points",
          "One-directional patient flow, patient enters from non-sterile zone, moves to semi-sterile for preparation, enters sterile zone for surgery, exits to recovery in semi-sterile zone",
          "Instrument flow must mirror this logic, clean instruments enter through a sterile pass-through, used instruments exit through a separate soiled pass-through",
          "Staff changing area at the boundary of the non-sterile and semi-sterile zones, surgical scrubs changed before entry",
        ],
      },
      { type: "heading3", text: "Air Quality and Pressure Differential Requirements" },
      {
        type: "paragraph",
        text: "This is the most technically demanding aspect of OT compliance and the area where design errors are most costly to correct after construction. NABH and internationally referenced standards (HTM, ASHRAE 170) require:",
      },
      {
        type: "bullets",
        items: [
          "Laminar airflow (LAF) in the sterile zone: Ultra-low turbulence, unidirectional airflow directed downward over the surgical field, typically delivered through a ceiling-mounted LAF canopy directly above the operating table",
          "HEPA filtration: Minimum H13 or H14 HEPA filters in the AHU serving the OT, capturing 99.95% or greater of airborne particulates at 0.3 microns",
          "Air changes per hour (ACH): Minimum 20 ACH in the OT room, with some standards specifying 25 ACH or higher for specialised procedures",
          "Positive pressure gradient: The sterile zone must be maintained at higher air pressure than the semi-sterile zone, which must be at higher pressure than the non-sterile zone",
          "Temperature and humidity control: OT temperature maintained at 18–22°C, relative humidity at 40–60%, consistently",
        ],
      },
      {
        type: "table",
        headers: ["Zone", "Pressure Relative to Corridor"],
        rows: [
          ["Sterile OT Room", "+15 to +20 Pa"],
          ["Semi-Sterile Corridor", "+5 to +10 Pa"],
          ["Non-Sterile Corridor", "Reference (0 Pa)"],
        ],
      },
      { type: "heading3", text: "Surface Finish Standards" },
      {
        type: "bullets",
        intro: "Walls:",
        items: [
          "Smooth, non-porous, impervious surface, no paint on plaster (paint cracks, plaster absorbs moisture)",
          "Anti-bacterial and anti-fungal properties, inherent to material, not just surface coating",
          "Seamless panel-to-panel joints, or sealed with an approved medical-grade sealant",
          "Curved internal corners, no sharp 90-degree wall-to-wall joints where contamination accumulates",
        ],
      },
      {
        type: "bullets",
        intro: "Flooring:",
        items: [
          "Conductive vinyl or static-dissipative vinyl, reduces electrostatic charge that can affect monitoring equipment",
          "Continuous sheet installation, welded seams, no joins or gaps",
          "Coving at wall-floor junction, minimum 50mm radius cove, eliminating the wall-floor corner entirely",
        ],
      },
      {
        type: "bullets",
        intro: "Ceiling:",
        items: [
          "Flush-fitted, sealed panels, no exposed ceiling tiles, no gaps around fixtures",
          "Integrated LAF canopy, engineered as part of the ceiling system, not retrofitted",
          "All ceiling penetrations (lights, sensors, sprinklers, pendants) fully sealed",
        ],
      },
      { type: "heading2", text: "Modular OT Panel Systems: Materials and Construction" },
      {
        type: "table",
        headers: ["Panel Type", "Core Material", "Key Properties", "Best Suited For"],
        rows: [
          ["PUF Panels", "Polyurethane foam", "Excellent thermal insulation, rigid, lightweight", "Standard OT environments"],
          ["EPS Panels", "Expanded polystyrene", "Cost-effective, good insulation", "Budget-sensitive projects"],
          ["Rockwool Panels", "Mineral wool", "Fire-resistant, acoustic performance", "High fire-rating requirement zones"],
          ["Honeycomb Panels", "Aluminium honeycomb", "Extremely lightweight, very high strength", "Long-span ceiling applications"],
        ],
      },
      { type: "callout", text: "ARCHORA recommendation: For most hospital OT applications in India, PUF-core panels with a minimum 50mm core thickness provide the optimal balance of thermal performance, rigidity, weight, and cost." },
      { type: "heading3", text: "Panel Facing Materials" },
      {
        type: "bullets",
        items: [
          "Stainless steel (SS 304 or SS 316): Highest durability, best chemical resistance, easiest to disinfect, longest lifespan, premium specification",
          "GI with anti-bacterial powder coating: Cost-effective, good performance, widely used in Indian hospital OTs",
          "HPL (High Pressure Laminate): Excellent aesthetic options, good cleanability, slightly lower chemical resistance than stainless steel",
          "Aluminium composite with anti-bacterial coating: Lightweight, corrosion-resistant, cost-effective for lower-intensity environments",
        ],
      },
      { type: "heading2", text: "MEP Integration: The Engineering Backbone of a Safe OT" },
      { type: "heading3", text: "HVAC Design" },
      {
        type: "bullets",
        intro: "Air Handling Unit (AHU):",
        items: [
          "Dedicated AHU for each OT room, no shared air supply",
          "Pre-filter, medium filter, and HEPA filter stages in series",
          "Chilled water cooling coil with precise temperature control",
          "Humidification and dehumidification capability",
          "100% fresh air supply, no recirculation from OT exhaust",
        ],
      },
      {
        type: "bullets",
        intro: "Laminar Airflow Canopy:",
        items: [
          "Ceiling-mounted, directly above the operating table",
          "Typically 2400mm x 1800mm or larger depending on OT room size",
          "Delivers ultra-low turbulence, unidirectional downward airflow over the surgical field",
          "HEPA-filtered air at the point of delivery, terminal HEPA filtration",
        ],
      },
      { type: "heading3", text: "Medical Gas Pipeline System (MGPS)" },
      {
        type: "bullets",
        intro: "Gases required in a standard OT:",
        items: [
          "Medical oxygen (O₂)",
          "Nitrous oxide (N₂O)",
          "Medical air (compressed, oil-free)",
          "Vacuum (suction)",
          "Anaesthetic gas scavenging system (AGSS), for safe removal of exhaled anaesthetic gases",
        ],
      },
      { type: "heading2", text: "Infection Control: Designing Sterility Into the System" },
      {
        type: "bullets",
        intro: "Architectural infection control measures:",
        items: [
          "Pass-through boxes (pass boxes): Double-door, interlocked transfer hatches at the sterile zone boundary, allow sterile instruments in and used instruments out without opening the OT door. Mechanical interlock ensures only one door can open at a time.",
          "Scrub sink design: Elbow-operated or sensor-operated taps, no hand contact with tap handles after scrubbing. Minimum two scrub positions per OT. Positioned in the semi-sterile zone immediately outside the OT room entry.",
          "Hermetically sealed doors: Slide-operated, automatically sealing against the door frame when closed, no air gap around the door perimeter. Foot pedal or sensor operation eliminates door-handle touch points.",
          "No unnecessary penetrations: Every cable, pipe, or duct penetration through an OT panel must be sealed with approved medical-grade sealant.",
        ],
      },
      { type: "heading2", text: "ARCHORA Modular OT Design Process: From Concept to Commissioning" },
      {
        type: "bullets",
        intro: "Our process:",
        items: [
          "Clinical brief: We work with the surgical team and hospital management to understand the specialties to be served, the case mix, the projected surgical volume, and any specific equipment or workflow requirements",
          "OT zoning and layout design: Sterile, semi-sterile, and non-sterile zones are defined and spatially resolved, patient flow, instrument flow, staff flow, and waste flow all mapped before any panel is specified",
          "MEP coordination: HVAC, electrical, MGPS, and pendant design are developed in parallel with the architectural design, not sequentially",
          "Panel system specification: Panel type, core material, facing material, coving system, door specifications, pass-box positions, and all penetrations are specified and coordinated with the panel manufacturer",
          "NABH pre-compliance review: Before finalising the design, we review it against NABH OT standards, identifying and resolving any compliance gaps before construction begins",
          "Installation and commissioning: Our team supervises installation, coordinates MEP integration, and conducts pre-commissioning testing of all systems, including air balance, pressure differential verification, filter testing, and electrical safety testing",
          "Documentation: We prepare the technical documentation package required for NABH submission, including OT layout drawings, HVAC design documents, MEP specifications, and material specifications",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "What is a modular OT and how is it different from a conventional OT?",
            a: "A modular OT is an operation theatre constructed using prefabricated, precision-engineered panel systems with integrated coving, seamless surfaces, and factory-controlled material specifications. Unlike conventional OT construction using brick, plaster, and paint, modular OTs eliminate joints, crevices, and porous surfaces that harbour pathogens. They deliver superior infection control performance, faster installation, easier maintenance, and better compliance with NABH and international healthcare standards.",
          },
          {
            q: "What are the NABH requirements for OT design in India?",
            a: "NABH requires OT design to meet standards across multiple domains: clear functional zoning (sterile, semi-sterile, and non-sterile zones), laminar airflow with HEPA filtration and minimum 20 air changes per hour, positive pressure differentials with the sterile zone at highest pressure, seamless and anti-microbial surface finishes with coved junctions, hermetically sealed doors, dedicated electrical supply with isolation transformer, complete medical gas pipeline system, and documented infection control protocols.",
          },
          {
            q: "How long does it take to install a modular OT in India?",
            a: "The installation timeline typically ranges from 6 to 12 weeks from commencement of on-site installation, depending on OT size, complexity, and MEP integration scope. This excludes the design, procurement, and civil preparation phases. A complete modular OT project from initial brief to commissioned handover typically takes 4 to 6 months.",
          },
          {
            q: "What is laminar airflow in an OT and why is it required?",
            a: "Laminar airflow (LAF) in an OT is a system of ultra-low turbulence, unidirectional airflow delivered downward over the surgical field through a ceiling-mounted canopy with HEPA filtration. It is required because it continuously sweeps airborne particulates and micro-organisms away from the open surgical wound, dramatically reducing the risk of surgical site infection. LAF is a mandatory requirement under NABH standards.",
          },
          {
            q: "What is the cost of a modular OT in India?",
            a: "The cost varies significantly based on OT size, panel specification, HVAC system complexity, MEP scope, and technology integration. A standard modular OT for a multispeciality hospital typically ranges from INR 35 lakhs to INR 1.5 crores or more for premium specification with full MEP integration and technology systems.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Planning a Modular OT? Talk to ARCHORA.",
        body: "Whether you are designing a new hospital, upgrading an existing OT, or adding surgical capacity to a growing facility, ARCHORA's specialist team can deliver a modular OT that is clinically excellent, operationally efficient, and fully NABH-compliant.",
      },
    ],
  },

  // ── ARTICLE 05 ──────────────────────────────────────────────────────────────
  {
    id: 5,
    slug: "digitally-integrated-ot-design-smart-operation-theatre",
    category: "Modular OT",
    title: "Digitally Integrated OTs: What Modern Surgeons Expect & How to Design for It",
    excerpt:
      "Modern surgeons work within a digital ecosystem. An OT that cannot support real-time imaging, electronic records, smart environmental controls, and seamless communication is not just inconvenient, it is a clinical liability.",
    date: "July 18, 2025",
    readTime: "9–10 min read",
    author: "Team ARCHORA",
    tags: ["Smart OT", "PACS Integration", "Digital OT", "NABH", "MEP"],
    image:
      "/images/journal/digitally-integrated-ot.jpg",
    content: [
      {
        type: "paragraph",
        text: "The operating theatre has always been the most demanding space in a hospital. But the nature of that demand is changing.",
      },
      {
        type: "paragraph",
        text: "For decades, OT design was primarily a problem of infection control, air quality, and spatial efficiency. Those requirements have not gone away. If anything, they have become more precise and more rigorously evaluated. But today, they are only part of the design challenge.",
      },
      {
        type: "paragraph",
        text: "Modern surgeons work within a digital ecosystem. They depend on real-time imaging, live data feeds, electronic records, advanced navigation systems, and seamless communication, not as supplementary conveniences, but as clinical necessities. An OT that cannot support this digital workflow is not just inconvenient. It is a clinical liability.",
      },
      {
        type: "paragraph",
        text: "For hospital promoters, administrators, and planners in India, understanding what digital integration in an OT actually means (and designing for it from the first day of planning) is one of the most consequential decisions in a hospital project.",
      },
      { type: "heading2", text: "What Is a Digitally Integrated OT?" },
      {
        type: "paragraph",
        text: "A digitally integrated OT is an operation theatre in which clinical technology, imaging systems, communication infrastructure, environmental controls, and surgical equipment are unified into a single, coordinated digital environment.",
      },
      {
        type: "paragraph",
        text: "The distinction from a conventionally equipped OT is not simply the presence of more technology. It is the integration of that technology. In a conventional OT, a surgeon might have access to a C-arm, a laparoscopic stack, a patient monitoring system, and an anaesthesia workstation, but each operates independently, displays on its own screen, and requires separate interaction.",
      },
      {
        type: "paragraph",
        text: "In a digitally integrated OT, these systems communicate with each other and with a central interface. Imaging data, patient records, monitoring parameters, environmental controls, and communication systems are accessible from a single control point, typically the OT pendant, a ceiling-mounted touch panel, or a voice-activated control system. The surgical team manages the environment and accesses clinical information without breaking sterility, without moving away from the operative field, and without the cognitive load of managing multiple disconnected systems.",
      },
      { type: "callout", text: "This is not a future concept. It is the current standard in leading hospitals across India and globally, and it is what surgeons trained in modern environments expect when they join or consult for a facility." },
      { type: "heading2", text: "What Modern Surgeons Actually Expect: A Clinical Perspective" },
      { type: "heading3", text: "Real-Time Imaging Access at the Operative Field" },
      {
        type: "paragraph",
        text: "During surgery, the ability to view patient imaging without interrupting the procedure is not a convenience, it is a safety requirement. Surgeons need to reference pre-operative CT scans, MRI studies, and X-rays during the procedure. In complex cases, they need live intraoperative imaging continuously visible without requiring anyone to leave the sterile field.",
      },
      {
        type: "bullets",
        intro: "What this requires from OT design:",
        items: [
          "Large-format displays (minimum 55-inch, 4K resolution) mounted on articulated ceiling arms or flush-integrated into OT wall panels at surgeon-eye-level",
          "PACS (Picture Archiving and Communication System) integration, allowing pre-operative imaging to be pulled up on OT displays directly from the hospital's radiology information system",
          "Video routing system, allowing any video source (laparoscopic camera, C-arm feed, patient monitor, navigation system) to be directed to any display in the OT at the surgeon's command",
          "Cable-free display connections where possible, reducing clutter and maintaining clean sightlines in the sterile field",
        ],
      },
      { type: "heading3", text: "Electronic Health Record (EHR) Access Without Leaving the Sterile Zone" },
      {
        type: "paragraph",
        text: "Surgeons need access to the patient's clinical record during surgery, current medications, known allergies, pre-operative investigations, anaesthesia notes, and consent documentation. In a non-integrated OT, this requires someone to leave the sterile zone. In an integrated OT, this data is available on a display within the sterile field, accessible through a sterile touch panel or voice command.",
      },
      {
        type: "bullets",
        intro: "What this requires from OT design:",
        items: [
          "Network connectivity (wired or wireless) within the OT room, routed through the panel system without compromising the sterile envelope",
          "Display and interface positioned within the surgeon's visual field without obstructing the operative field",
          "Integration between the OT display system and the hospital's HIS (Hospital Information System) or EMR platform",
        ],
      },
      { type: "heading3", text: "Centralised Environment Control Without Breaking Sterility" },
      {
        type: "paragraph",
        text: "In a digitally integrated OT, all environmental parameters are controllable from the OT pendant or ceiling panel, accessible by the scrub nurse or surgeon without moving from their position.",
      },
      {
        type: "bullets",
        intro: "Controls that should be accessible from within the sterile field:",
        items: [
          "Surgical light intensity and colour temperature, adjustable in real time during the procedure as tissue conditions change",
          "Ambient lighting levels, dimming for video-assisted procedures, full illumination for open surgery",
          "OT room temperature, surgeon comfort during long procedures has a direct impact on performance",
          "Laminar airflow status and alerts, immediate awareness if HVAC parameters move outside range",
          "Door control, ability to lock or unlock the OT door remotely to manage traffic during critical procedure phases",
        ],
      },
      { type: "heading3", text: "Integrated Communication Systems" },
      {
        type: "bullets",
        intro: "What integrated OT communication requires:",
        items: [
          "Internal intercom: Two-way, hands-free communication between the OT room, scrub area, anaesthesia bay, recovery room, and central nursing station, accessible from a fixed panel within the sterile zone",
          "Telemedicine link: Encrypted video conferencing capability allowing remote consultation with specialists, useful for complex cases, second opinions, and centres where specialist availability is limited",
          "Surgical recording and streaming: High-definition cameras recording the operative field for documentation, medico-legal purposes, and teaching, with the ability to stream live to adjacent lecture facilities or remote locations",
          "Integration with pathology and blood bank: Direct communication links to pathology for intraoperative frozen section results and to the blood bank for urgent blood product requests",
        ],
      },
      { type: "heading3", text: "Touchless and Automated Workflow Features" },
      {
        type: "bullets",
        intro: "Touchless features that modern surgeons expect:",
        items: [
          "Sensor-operated OT doors, hands-free entry and exit, maintaining sterility and reducing air turbulence from door movement",
          "Sensor-operated scrub sinks, elbow, knee, or sensor-operated taps with pre-programmed scrub cycle timers",
          "Voice-activated or foot-pedal controls, for functions that cannot be handled by a scrub nurse, allowing the surgeon to issue commands without hand contact",
          "Automated lighting response, ambient lighting adjusting to procedure type, with preset configurations for open surgery, laparoscopic procedures, and room preparation",
          "Automated documentation triggers, recording start/stop, case time logging, and equipment usage data captured automatically without manual input",
        ],
      },
      { type: "heading2", text: "Architectural Design for Digital Integration: What Changes" },
      { type: "callout", text: "Digital integration is not something that can be added to an OT after it is built. The architectural and MEP design of the OT must anticipate and accommodate digital infrastructure from the earliest planning stage." },
      { type: "heading3", text: "Ceiling and Boom System Design" },
      {
        type: "paragraph",
        text: "The ceiling of a digitally integrated OT is a highly engineered assembly. It must simultaneously house the LAF canopy and its HVAC supply infrastructure, ceiling-mounted equipment pendants or boom arms, surgical lighting pendant, camera systems for recording and telemedicine, display monitors on articulated arms, flush-fitted sealed downlights, intercom and PA system speakers, and fire suppression systems, all coordinated to avoid conflicts, maintain clearance above the operative field, and allow the ceiling to be cleaned.",
      },
      { type: "heading3", text: "Data and Network Infrastructure" },
      {
        type: "bullets",
        intro: "Key requirements:",
        items: [
          "Dedicated network infrastructure for the OT, not shared with general hospital network traffic. Clinical imaging data, surgical video streams, and patient monitoring data require high bandwidth and low latency.",
          "Wired backbone with wireless supplement, wired connections for fixed systems (PACS terminals, OT control panel, recording systems), wireless capability for mobile devices and supplementary systems",
          "All conduit and cable routing through panel systems with sealed penetrations, no surface-mounted cable trays in the sterile zone",
          "Network security, OT network segmented from general hospital network to protect patient data and prevent interference with clinical systems",
        ],
      },
      { type: "heading3", text: "Display Integration and Mounting" },
      {
        type: "bullets",
        intro: "Design principles:",
        items: [
          "Primary surgical displays positioned within the surgeon's natural line of sight, typically at the foot of the operating table or on articulated ceiling arms",
          "Anaesthesia display integrated into the anaesthesia workstation and pendant, not requiring the anaesthetist to turn away from the patient",
          "Secondary displays for imaging reference, communication, and recording status, positioned at the periphery of the OT room, visible to the broader surgical team",
          "All displays flush-mounted or on sealed articulated arms, no surface-mounted display brackets that create cleaning obstacles",
        ],
      },
      { type: "heading3", text: "Modular Panel System Adaptability" },
      {
        type: "bullets",
        intro: "Design requirements for future adaptability:",
        items: [
          "Oversized conduit runs, install conduit with capacity beyond current requirements, allowing future cable additions without panel modification",
          "Modular data outlet plates in panels, designed to be replaced without removing panels",
          "Accessible service void above ceiling panels, allowing new services to be added from above without disturbing the clinical environment below",
          "Documented as-built drawings for all concealed services, essential for future maintenance and upgrades",
        ],
      },
      { type: "heading2", text: "MEP Coordination for Digital OT Integration" },
      { type: "heading3", text: "Power Infrastructure" },
      {
        type: "bullets",
        intro: "Key electrical design requirements:",
        items: [
          "Increased circuit capacity, imaging systems, recording servers, display arrays, and smart control systems add significant load beyond a conventional OT electrical specification",
          "Dedicated UPS for digital systems, in addition to the life-support UPS, a separate UPS for IT and imaging infrastructure ensures that digital systems remain available during power transitions",
          "Clean power supply, voltage regulation and harmonic filtering to protect sensitive digital equipment from power quality issues",
          "Adequate cooling for AV and IT rack equipment, server racks and AV distribution equipment generate heat that must be managed within the OT environment",
        ],
      },
      { type: "heading3", text: "Electromagnetic Compatibility (EMC)" },
      {
        type: "bullets",
        intro: "Design requirements:",
        items: [
          "Shielded cable specification for sensitive signal cables, particularly for imaging and monitoring systems",
          "Separation of power and signal cable runs, parallel routing of power cables alongside signal cables induces interference",
          "Earthing and bonding design reviewed by an EMC specialist, particularly for imaging rooms with C-arm or fluoroscopy equipment",
          "Equipment compatibility testing before installation finalisation, manufacturers of major surgical equipment can advise on known EMC issues",
        ],
      },
      { type: "heading2", text: "The ARCHORA Approach to Digitally Integrated OT Design" },
      {
        type: "paragraph",
        text: "At ARCHORA, we design digitally integrated OTs as a fully coordinated, multidisciplinary process. Clinical needs drive technology specification. Technology specification drives architectural and MEP design. Architectural and MEP design drives the modular panel system and infrastructure layout.",
      },
      {
        type: "bullets",
        intro: "Our process for digitally integrated OTs includes:",
        items: [
          "Clinical workflow analysis with the surgical team before any design decision is made",
          "Technology brief developed in collaboration with biomedical engineering and IT teams",
          "Architectural design coordinated with MEP and IT infrastructure from the first planning meeting",
          "Ceiling and pendant system designed as an integrated assembly, not resolved as separate systems post-design",
          "NABH compliance review of digital integration design, ensuring that technology additions do not compromise infection control or regulatory compliance",
          "Commissioning support for all integrated systems, including network testing, display calibration, AV system commissioning, and BMS integration verification",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "What is a digitally integrated OT?",
            a: "A digitally integrated OT is an operation theatre in which clinical imaging, patient data, environmental controls, surgical equipment, and communication systems are unified into a single coordinated digital environment. Rather than operating as separate systems, these components communicate with each other and are accessible through centralised interfaces, allowing the surgical team to manage the OT environment and access clinical information without breaking sterility or interrupting the procedure.",
          },
          {
            q: "What digital features do modern surgeons expect in an operation theatre?",
            a: "Modern surgeons expect real-time access to patient imaging (PACS integration) on high-resolution OT displays, electronic health record access within the sterile zone, centralised control of lighting and environmental parameters, touchless door and tap operation, integrated intercom and telemedicine capability, and surgical video recording. These are not luxury features, they are standard expectations in hospitals that attract and retain experienced surgical talent.",
          },
          {
            q: "Can an existing OT be upgraded to a digitally integrated OT?",
            a: "An existing OT can be partially upgraded, but comprehensive digital integration is significantly more expensive and disruptive as a retrofit compared to designing for it from the outset. Retrofitting requires surface-mounted cable management (which compromises infection control), structural modifications for ceiling-mounted equipment, and significant electrical upgrades. For hospitals planning major renovation, a full modular OT replacement with integrated digital design is often more cost-effective than retrofitting an existing space.",
          },
          {
            q: "How does digital integration in an OT affect NABH compliance?",
            a: "Digital integration, when properly designed, supports NABH compliance by enhancing documentation (surgical video logs, environmental monitoring records), improving infection control (touchless systems, automated documentation), and strengthening clinical governance (telemedicine consultation records, EHR integration). However, poorly integrated digital systems (particularly those with surface-mounted cables, inadequate sealing of panel penetrations, or wireless systems that interfere with monitoring equipment) can create compliance problems.",
          },
          {
            q: "What is PACS integration in an OT and why does it matter?",
            a: "PACS (Picture Archiving and Communication System) integration in an OT allows the surgical team to access the patient's radiological imaging (X-rays, CT scans, MRI studies) directly on OT displays during surgery, without requiring a separate workstation or physical films. This matters because surgeons routinely need to reference pre-operative imaging during procedures, particularly in orthopaedic, neurosurgical, oncological, and reconstructive cases. Without PACS integration, accessing this data requires someone to leave the sterile zone, introducing delays and infection control risks.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Planning a Smart OT for Your Hospital?",
        body: "ARCHORA designs digitally integrated OTs that meet the expectations of modern surgical teams and the compliance requirements of NABH. Whether you are planning a new hospital or upgrading an existing OT, our team can deliver a design that is clinically intelligent, technically advanced, and built to last.",
      },
    ],
  },

  // ── ARTICLE 06 ──────────────────────────────────────────────────────────────
  {
    id: 6,
    slug: "common-mistakes-hospital-layout-planning",
    category: "Hospital Design",
    title: "5 Common Mistakes in Hospital Layout Planning (And How to Avoid Them)",
    excerpt:
      "Poor hospital layout planning costs money, delays commissioning, and endangers patients. These five mistakes appear consistently across projects of every scale, and every one of them is preventable at the design stage.",
    date: "July 22, 2025",
    readTime: "9–10 min read",
    author: "Team ARCHORA",
    tags: ["Hospital Planning", "Workflow Design", "NABH", "Emergency Department", "Master Planning"],
    image:
      "/images/journal/hospital-layout-mistakes.jpg",
    content: [
      {
        type: "paragraph",
        text: "A hospital is the most complex building type that exists. It is simultaneously a high-footfall public facility, a precision clinical environment, a 24-hour operational building, a regulated infrastructure asset, and a place where human lives depend directly on how well the space is designed.",
      },
      {
        type: "paragraph",
        text: "Given that complexity, it is perhaps unsurprising that hospital layout planning errors are common. What is surprising is how consistently the same mistakes appear, in projects across different states, different scales, different budgets, and different ownership structures.",
      },
      {
        type: "paragraph",
        text: "These are not obscure or highly technical errors. They are fundamental planning decisions (decisions about workflow, expansion, department positioning, environmental quality, and regulatory compliance) that are made incorrectly because the planning process prioritises the wrong things, or fails to involve the right expertise at the right stage.",
      },
      { type: "callout", text: "Each of these mistakes is avoidable. Each of them is also, once made, expensive and disruptive to correct. Some cannot be corrected at all without major reconstruction." },
      { type: "heading2", text: "Mistake 1: Designing for Appearance Rather Than Workflow" },
      {
        type: "paragraph",
        text: "The most frequently repeated mistake in hospital layout planning is prioritising visual impressiveness over functional logic. A grand entrance lobby, an aesthetically striking facade, premium finishes throughout, these are not problems in themselves. The problem arises when they consume planning attention and budget at the expense of the spatial logic that makes a hospital actually work.",
      },
      {
        type: "bullets",
        intro: "A hospital that looks impressive but has poorly resolved workflow manifests as:",
        items: [
          "Staff covering unnecessary distances between connected departments, a nurse moving between the ICU and the medication room may walk 3 to 4 kilometres in a single shift in a poorly planned hospital",
          "Patients being routed through multiple zones and levels to access services that should be co-located",
          "Clean and contaminated flows crossing in corridors and lifts, creating infection control risks",
          "Service bottlenecks at peak times because the spatial layout cannot support the patient volume the hospital was designed to serve",
        ],
      },
      { type: "heading3", text: "How to Avoid It" },
      {
        type: "paragraph",
        text: "Workflow analysis must precede spatial design. Before a wall is drawn, the planning team must map every patient journey through the facility, every staff movement pattern, every material flow, and every point where these flows must be kept strictly separate.",
      },
      {
        type: "paragraph",
        text: "This analysis generates a functional adjacency matrix that identifies which departments must be directly adjacent, which must be in controlled proximity, and which must be separated. The architectural layout is then built around this matrix, not the other way around.",
      },
      {
        type: "bullets",
        intro: "The 'hot-to-cold' zoning principle governs this adjacency logic:",
        items: [
          "Emergency, trauma, and ICU (highest risk) are positioned to allow rapid access and controlled circulation",
          "Surgical zones (sterile) are adjacent to ICU and directly connected to CSSD, with no public circulation crossing between them",
          "Inpatient wards are in the mid-zone, accessible from clinical areas but separated from public zones",
          "OPD, diagnostics, and administrative areas are in the lowest-risk, highest-public-access zone",
        ],
      },
      { type: "heading2", text: "Mistake 2: Planning Only for Current Capacity" },
      {
        type: "paragraph",
        text: "A hospital built for today's patient volume without provision for growth will become a problem within 5 to 7 years in most of India's urban and semi-urban markets. Healthcare demand in India is growing faster than hospital capacity in most regions. A hospital that opens at 80% occupancy and has no expansion provision will be operationally constrained within a very short period.",
      },
      {
        type: "bullets",
        intro: "The mistake takes several forms:",
        items: [
          "No structural provision for vertical expansion: A ground-plus-one structure designed without the structural capacity to add additional floors",
          "No horizontal expansion zones: The site is fully developed at the outset, leaving no land available for future blocks or modular additions",
          "Utility systems sized for current capacity only: Electrical switchgear, HVAC plant, water storage, and medical gas manifolds with no headroom for additional load",
          "No provision for technology upgrades: OT ceiling plenums without additional conduit capacity, diagnostic imaging spaces without structural provisions for heavier future equipment",
        ],
      },
      { type: "heading3", text: "How to Avoid It" },
      {
        type: "paragraph",
        text: "Expansion planning must be part of the initial master plan. At ARCHORA, we approach every hospital project with a phased development framework that answers three questions: what the hospital needs to be on day one, what it needs to be capable of becoming within 10 years, and what physical provisions must be made in the initial construction to enable that growth without disruption.",
      },
      {
        type: "bullets",
        intro: "Specific provisions that should be standard in every hospital master plan:",
        items: [
          "Structural: Foundation and column design sized for additional floors, even if those floors are not in the current scope",
          "Vertical circulation: Lift shafts designed for future lift installation, a blank shaft costs almost nothing to include but allows a new lift to be added without major structural work",
          "MEP plant: Electrical switch rooms, HVAC plant areas, and medical gas manifold rooms sized for 150% of current load",
          "Utility shafts: Oversized vertical shafts throughout the building, allowing future pipe and cable runs without requiring penetration of finished walls",
          "Expansion zones: Identified areas of the site or floors within the building designated for future development, with access and utility connections stubbed in ready for activation",
        ],
      },
      { type: "heading2", text: "Mistake 3: Misplacing the Emergency Department" },
      {
        type: "paragraph",
        text: "The emergency department is the most time-critical zone in the hospital. The relationship between the ED and other departments directly determines whether the hospital can deliver effective emergency care, particularly for the conditions where minutes matter: acute myocardial infarction, stroke, polytrauma, and obstetric emergencies.",
      },
      {
        type: "bullets",
        intro: "The consequences of poor ED placement:",
        items: [
          "A stroke or cardiac patient arrives by ambulance, is stabilised in the ED, but then needs to travel three floors and through two corridor intersections to reach the CT scanner or catheterisation lab, a journey that takes 8 to 12 minutes that should take 90 seconds",
          "An emergency patient requiring immediate surgery must travel the length of the hospital from the ED to the OT, with lift waits, corridor congestion, and staff handovers at each transition point",
          "The blood bank, which emergency teams need access to urgently, is located in a separate wing with no direct communication link to the ED",
        ],
      },
      { type: "heading3", text: "How to Avoid It" },
      {
        type: "paragraph",
        text: "The ED must be positioned based on its clinical adjacency requirements first, and its public access requirements second. Both can usually be satisfied with thoughtful site planning, but when they conflict, clinical adjacency wins.",
      },
      {
        type: "bullets",
        intro: "Mandatory direct adjacencies for the Emergency Department:",
        items: [
          "Radiology (CT and X-ray): Ideally, CT should be immediately adjacent to the ED resuscitation bay, accessible within 60 seconds. This single adjacency decision affects outcomes for stroke, trauma, and PE patients.",
          "Operating theatre complex: Direct vertical or horizontal connection from the ED to the OT, a dedicated emergency lift serving both floors, or direct corridor access on the same level",
          "ICU and HDU: ED patients requiring critical care admission should be able to reach the ICU without navigating public corridors",
          "Blood bank: Direct communication link and physical proximity, allowing emergency blood products to reach the ED resuscitation bay within minutes",
        ],
      },
      { type: "heading2", text: "Mistake 4: Eliminating Natural Light and Ventilation to Maximise Clinical Space" },
      {
        type: "paragraph",
        text: "This mistake is driven by a logical-seeming but clinically incorrect assumption: that every square metre of a hospital should be productive clinical space, and that windows, courtyards, and light shafts are luxuries that consume space without generating revenue. The evidence is unambiguous, hospital environments designed without natural light produce measurably worse clinical outcomes.",
      },
      {
        type: "bullets",
        intro: "The consequences of eliminating natural light and ventilation:",
        items: [
          "Increased patient stress and anxiety: Patients without daylight access lose circadian rhythm regulation, experience increased cortisol levels, and report higher pain perception, all of which extend recovery timelines",
          "Higher rates of hospital-acquired infection: Natural ventilation, when properly designed, reduces the concentration of airborne pathogens in non-critical zones",
          "Staff fatigue and reduced alertness: Clinical staff working in artificially lit, windowless environments show measurable reductions in alertness and job satisfaction, with direct implications for clinical error rates",
          "Higher energy costs: A hospital that depends entirely on artificial lighting and mechanical ventilation operates at significantly higher energy cost",
        ],
      },
      { type: "heading3", text: "How to Avoid It" },
      {
        type: "bullets",
        intro: "Design strategies that achieve natural light without compromising clinical space:",
        items: [
          "Central courtyards: An internal courtyard surrounded by ward wings and OPD corridors brings natural light deep into the building footprint without reducing clinical floor area",
          "Ward window orientation: Patient beds positioned to receive natural light, not just the corridor. Window design that provides daylight without direct glare or solar heat gain.",
          "Skylights: Light shafts and skylights bringing natural light to internal corridors and waiting areas that cannot have perimeter windows",
          "Biophilic design elements: Indoor planting, water features, and natural materials in patient-facing areas, evidence-supported interventions that reduce stress and improve the perceived quality of the care environment",
          "Cross-ventilation in appropriate zones: Ward buildings oriented and planned to allow natural cross-ventilation during appropriate weather conditions",
        ],
      },
      { type: "heading2", text: "Mistake 5: Treating Regulatory Compliance as a Post-Design Problem" },
      {
        type: "paragraph",
        text: "Of all the mistakes on this list, this one has the most direct and immediate financial consequences. Regulatory compliance (NABH standards, National Building Code, fire safety regulations, biomedical waste management rules, pollution control requirements, and state health department norms) is not a checklist to be completed after the building is designed. It is a set of constraints and requirements that must shape the design from the first planning meeting.",
      },
      {
        type: "bullets",
        intro: "The mistake manifests as:",
        items: [
          "A design that is finalised, approved by the hospital owner, and partially built before a NABH pre-assessment reveals that the OT zoning, or the CSSD location, or the waste management infrastructure does not meet accreditation standards",
          "A building that reaches structural completion before the fire authority inspection reveals that exit route widths, fire compartmentalisation, or the sprinkler system design does not meet National Building Code requirements",
          "An OPD layout that has been fully constructed before it is identified that the state health department requires a specific minimum room size for consultation rooms that has not been met",
        ],
      },
      { type: "heading3", text: "How to Avoid It" },
      {
        type: "bullets",
        intro: "Regulatory compliance must be integrated into the design process from day one. This requires:",
        items: [
          "A compliance framework established before design begins: Identifying every applicable regulation (national, state, and local) that will govern the facility",
          "NABH pre-assessment criteria embedded in design review: Every design review milestone should include a NABH compliance check, not as a final stage review but as a recurring filter throughout the design process",
          "Specialist healthcare architect and consultant involvement: General architectural practice does not automatically produce regulatory-compliant hospital design",
          "Early engagement with authorities: Fire authority, pollution control board, and state health department pre-submissions during the design stage, not after construction",
          "Integrated MEP and compliance coordination: MEP design must be reviewed against regulatory requirements at design stage, not at commissioning",
        ],
      },
      { type: "heading2", text: "The Cost of Getting It Wrong vs. the Value of Getting It Right" },
      {
        type: "table",
        headers: ["Mistake", "Cost of Correction After Construction", "Cost of Avoiding in Design Stage"],
        rows: [
          ["Workflow errors", "Departmental reconfiguration, operational disruption, ongoing efficiency loss", "Functional flow analysis, included in design process"],
          ["No expansion provision", "Structural retrofit or new block, MEP capacity additions", "Structural allowances, oversized plant rooms, marginal cost addition"],
          ["Poor ED placement", "Operational workarounds, additional staff, longer response times, potential clinical outcomes impact", "Adjacency planning, no additional cost"],
          ["No natural light", "Permanent operational disadvantage, higher energy costs, poorer clinical outcomes", "Courtyard and window design, modest additional design effort"],
          ["Compliance failures", "Reconstruction, commissioning delays, potential licensing denial", "Early regulatory review, included in design process"],
        ],
      },
      { type: "callout", text: "The consistent pattern is that the cost of prevention is low and the cost of correction is high. In hospital design, this asymmetry is more pronounced than in almost any other building type." },
      {
        type: "faq",
        items: [
          {
            q: "What are the most common mistakes in hospital layout planning in India?",
            a: "The five most common and consequential mistakes are: designing for appearance rather than clinical workflow, failing to plan for future expansion, misplacing the emergency department relative to dependent clinical departments, eliminating natural light and ventilation to maximise clinical space, and treating regulatory compliance as a post-design activity rather than a design driver. Each of these mistakes is preventable at the design stage and expensive to correct after construction.",
          },
          {
            q: "How does poor hospital layout affect patient outcomes?",
            a: "Poor hospital layout affects patient outcomes through multiple pathways: longer emergency response times when the ED is not adjacent to radiology, OT, and ICU; higher infection rates when clean and contaminated flows cross; delayed care when departments that need to work together are spatially separated; and slower recovery in environments without natural light. In emergency scenarios (cardiac, stroke, and trauma), spatial layout decisions directly affect whether patients receive time-critical care within the windows where intervention is effective.",
          },
          {
            q: "Why is emergency department placement so critical in hospital design?",
            a: "The emergency department depends on immediate access to radiology (particularly CT), the operating theatre, ICU, and blood bank to deliver effective care for time-critical emergencies. When these departments are not directly adjacent to the ED, response times increase and patient outcomes are compromised. The ED must also have a dedicated ambulance access route that is completely separate from public vehicle and pedestrian access.",
          },
          {
            q: "How much does it cost to fix hospital layout mistakes after construction?",
            a: "The cost of correcting hospital layout mistakes after construction varies enormously depending on the nature of the error, but even relatively minor corrections in a completed hospital (relocating a department, widening a corridor, adding a lift) typically cost 5 to 15 times more than they would have cost to address in the design stage. Errors that require structural modification can cost many multiples of the original construction cost for the affected area.",
          },
          {
            q: "What is functional flow analysis in hospital planning?",
            a: "Functional flow analysis is a planning methodology that maps every movement of patients, staff, materials, and waste through a proposed hospital design, identifying where flows are unnecessarily long, where they create bottlenecks at peak demand, and where clean and contaminated flows cross. The analysis is used to refine department positioning, corridor routing, and lift placement before architectural design is finalised. It is one of the most valuable inputs to hospital layout planning and one of the most frequently omitted.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Planning Your Hospital? Start with the Right Foundation.",
        body: "ARCHORA designs hospitals that are clinically logical, operationally efficient, compliance-ready, and built for the long term. If you are in the planning stage of a hospital project (whether greenfield, expansion, or renovation), our team can help you build the right foundation before a single rupee is committed to construction.",
      },
    ],
  },

  // ── ARTICLE 07 ──────────────────────────────────────────────────────────────
  {
    id: 7,
    slug: "hospital-fire-safety-norms-nbc-nabh-design-guide",
    category: "Healthcare Compliance",
    title: "Hospital Fire Safety Norms: NBC 2016, NABH Compliance & Evacuation Design Guide",
    excerpt:
      "Fire safety in hospitals is a life-safety obligation, not a checkbox. The design decisions made during planning (compartmentalisation, evacuation routes, suppression systems, materials) directly determine whether patients and staff survive a fire event.",
    date: "July 26, 2025",
    readTime: "10–11 min read",
    author: "Team ARCHORA",
    tags: ["Fire Safety", "NBC 2016", "NABH", "Evacuation Design", "Fire NOC"],
    image:
      "/images/journal/fire-safety-norms.jpg",
    content: [
      {
        type: "paragraph",
        text: "Of all the life-safety challenges in hospital design, fire is the most complex and the most consequential. In most building types, a fire evacuation scenario assumes that occupants can move independently, that they can hear and respond to alarms, and that they can descend stairs to exit the building. In a hospital, almost none of these assumptions hold.",
      },
      {
        type: "paragraph",
        text: "Patients on ventilators cannot be evacuated in minutes. Patients in ICUs are connected to life-critical equipment that cannot simply be disconnected. Patients under anaesthesia in the OT complex cannot be moved at all without clinical risk. Neonates in NICU incubators require specialist handling. Patients in traction, patients in post-surgical recovery, patients with severe mobility limitations, all of them depend entirely on the hospital's infrastructure and staff to protect them in a fire event.",
      },
      { type: "callout", text: "This is why fire safety in hospital design is not a compliance exercise. It is a clinical responsibility. The design decisions made during planning directly determine whether patients and staff survive a fire event or do not." },
      { type: "heading2", text: "The Regulatory Framework: What Governs Hospital Fire Safety in India" },
      { type: "heading3", text: "National Building Code 2016, Part 4: Fire and Life Safety" },
      {
        type: "paragraph",
        text: "The National Building Code (NBC) 2016, Part 4 is the primary national standard for fire and life safety in buildings in India. For hospital buildings, NBC 2016 classifies them as Institutional Group I buildings, a classification that carries some of the most stringent fire safety requirements in the code.",
      },
      {
        type: "bullets",
        intro: "Key NBC 2016 requirements applicable to hospitals include:",
        items: [
          "Fire compartmentalisation: Maximum floor area per fire compartment, fire-rated separation between compartments, and fire-rated construction for lift shafts and staircase enclosures",
          "Escape route design: Minimum corridor widths, maximum travel distances to exits, minimum number of staircases, and staircase construction requirements",
          "Fire detection and suppression systems: Mandatory automatic fire detection, sprinkler systems for buildings above specified heights, hydrant and hose reel systems",
          "Emergency lighting and signage: Maintained emergency lighting on all escape routes, illuminated exit signage",
          "Fire NOC requirements: Submission of fire safety drawings and systems specifications to the local fire authority, obtaining Fire NOC before occupancy",
        ],
      },
      { type: "heading3", text: "NABH Standards: Infrastructure and Safety Domain" },
      {
        type: "bullets",
        intro: "NABH accreditation evaluates hospital fire safety under its Facility Management and Safety (FMS) standards. Assessors review:",
        items: [
          "Whether the hospital has a current, valid Fire NOC from the local fire authority",
          "Whether fire safety systems (detection, suppression, alarms, extinguishers) are installed, functional, and regularly tested",
          "Whether fire safety training has been conducted for all staff categories",
          "Whether the hospital has a documented fire safety and evacuation policy",
          "Whether evacuation drills are conducted at regular intervals and documented",
          "Whether the hospital has a Hospital Disaster Management Plan that includes fire scenarios",
        ],
      },
      { type: "heading3", text: "State Fire Department Norms" },
      {
        type: "paragraph",
        text: "Each Indian state has a fire services department with its own regulations, which may be more stringent than NBC 2016 in certain respects. The state fire authority issues the Fire NOC, a mandatory pre-occupancy approval. ARCHORA's design process includes early engagement with the relevant state fire authority during design development, not after construction, to identify and address any state-specific requirements before they become expensive corrections.",
      },
      { type: "heading3", text: "NFPA Standards: International Reference Framework" },
      {
        type: "paragraph",
        text: "The National Fire Protection Association (NFPA) standards, particularly NFPA 101 (Life Safety Code) and NFPA 99 (Health Care Facilities Code), are internationally recognised benchmarks for healthcare facility fire safety. While not mandatory in India, they are increasingly referenced by accreditation bodies and hospital groups with international quality aspirations. NFPA standards introduce concepts (particularly around non-ambulatory patient protection and defend-in-place strategies) that go beyond current NBC 2016 requirements and represent the direction in which Indian healthcare regulation is evolving.",
      },
      { type: "heading2", text: "Fire Compartmentalisation: Containing the Threat" },
      {
        type: "paragraph",
        text: "Compartmentalisation is the most fundamental passive fire safety measure in hospital design. Its principle is straightforward: if fire and smoke cannot travel freely through a building, they can be contained long enough for evacuation and suppression to succeed.",
      },
      {
        type: "paragraph",
        text: "In hospital design, compartmentalisation is also a clinical tool. A well-compartmentalised hospital can implement a defend-in-place strategy for non-ambulatory patients, protecting them in their compartment while fire is suppressed in an adjacent compartment, rather than requiring their physical evacuation under dangerous conditions.",
      },
      {
        type: "bullets",
        intro: "NBC 2016 Compartmentalisation Requirements for Hospitals:",
        items: [
          "Maximum compartment size: 750 square metres per fire compartment, bounded by fire-rated construction on all sides",
          "Fire-rated walls: Minimum 2-hour fire resistance rating for walls between compartments",
          "Fire-rated doors: Minimum 2-hour fire resistance rating for doors in fire-rated walls, self-closing, with intumescent seals",
          "Fire-rated floor and ceiling construction: Compartment boundaries must be complete, a fire-rated wall that does not extend to the structural slab above does not create a compartment",
          "Protected staircase enclosures: All staircases serving evacuation must be enclosed in fire-rated construction with smoke-proof lobbies at each level",
          "Protected lift shaft enclosures: Lift shafts must be enclosed in fire-rated construction, lift openings must be protected with fire-rated lobby enclosures",
        ],
      },
      { type: "heading3", text: "Clinical Zoning and Compartmentalisation Alignment" },
      {
        type: "bullets",
        intro: "In ARCHORA's hospital designs, fire compartmentalisation is coordinated with clinical zoning so that the two systems reinforce each other:",
        items: [
          "ICU and critical care zones are designed as dedicated fire compartments, protecting the most vulnerable patients and allowing defend-in-place management",
          "OT complex is a separate fire compartment, the nature of surgical procedures means that evacuation is not possible in many scenarios, and compartmentalisation buys the time needed to complete or safely abandon procedures",
          "Electrical rooms, medical gas manifold rooms, and generator rooms are each separate fire compartments with enhanced fire resistance ratings, these are high fire risk areas that must be isolated from clinical zones",
          "Vertical shafts (HVAC ducts, pipe shafts, cable shafts) are fire-stopped at every floor penetration, unprotected shafts are one of the most dangerous fire spread pathways in multistorey buildings",
        ],
      },
      { type: "heading3", text: "Fire Dampers in HVAC Systems" },
      {
        type: "paragraph",
        text: "HVAC ductwork creates a direct penetration through fire-rated walls and floor slabs, a pathway that, without protection, allows fire and smoke to bypass compartment boundaries entirely. Fire dampers are motorised or fusible-link devices installed at every point where a duct penetrates a fire-rated boundary.",
      },
      {
        type: "bullets",
        intro: "Design requirements:",
        items: [
          "Fire damper at every duct penetration of a fire-rated wall or floor",
          "Smoke damper (or combination fire and smoke damper) in HVAC systems serving multiple compartments",
          "BMS integration, allowing central monitoring and remote actuation of dampers",
          "Access panels for inspection and maintenance at every damper location, non-accessible dampers are a common compliance failure",
        ],
      },
      { type: "heading2", text: "Escape Route Design: Planning for Patients Who Cannot Walk" },
      {
        type: "paragraph",
        text: "Hospital escape route design is governed by the same fundamental principles as any building (adequate width, maximum travel distance, minimum number of exits) but with one profound additional requirement: the escape route system must accommodate patients who cannot move independently.",
      },
      {
        type: "bullets",
        intro: "NBC 2016 Escape Route Requirements for Hospitals:",
        items: [
          "Minimum corridor width: 2.4 metres clear width throughout, sufficient for two stretchers to pass, or for a stretcher and a wheelchair user to pass simultaneously",
          "Minimum staircase width: 2.0 metres clear width for staircases serving patient areas, sufficient for stretcher transfer with staff on both sides",
          "Minimum number of staircases: Two staircases per wing for every floor above the ground floor, ensuring that if one staircase is compromised, an alternative is always available",
          "Maximum travel distance to a staircase or exit: 30 metres from any point in the building to the nearest protected staircase entrance",
          "No dead-end corridors: No dead-end corridor longer than 6 metres, a dead-end corridor is a trap in a fire scenario",
          "Emergency exit doors: All emergency exit doors must open in the direction of escape travel (outward), must be operable without a key from the inside, and must be clearly marked with illuminated exit signage",
        ],
      },
      { type: "heading3", text: "Horizontal Evacuation: The Strategy That Saves Lives" },
      {
        type: "paragraph",
        text: "Vertical evacuation (moving patients down stairs to exit the building) is the last resort in a hospital fire scenario, not the first. Moving non-ambulatory patients down stairs is slow, physically demanding, and clinically risky. The internationally accepted strategy is horizontal evacuation first: moving patients laterally through fire-rated doors into an adjacent fire compartment on the same floor, which is separated from the fire by fire-rated construction. Only if the fire cannot be contained and the adjacent compartment is threatened is vertical evacuation initiated.",
      },
      {
        type: "bullets",
        intro: "Design requirements for horizontal evacuation:",
        items: [
          "Fire compartments of sufficient size to receive patients from an adjacent compartment in addition to their own occupants",
          "Fire-rated cross-corridor doors at compartment boundaries, normally held open by electromagnetic releases, closing automatically on fire alarm activation",
          "Bed and trolley access through every compartment boundary door, door width minimum 1400mm clear opening",
          "Refuge areas at staircase lobbies for patients awaiting assisted vertical evacuation, sized and designed for stretcher accommodation",
        ],
      },
      { type: "heading2", text: "Fire Detection, Alarm, and Suppression Systems" },
      { type: "heading3", text: "Automatic Fire Detection System" },
      {
        type: "bullets",
        intro: "Components and design requirements:",
        items: [
          "Smoke detectors: Installed in all occupied spaces, corridors, ceiling voids, and electrical rooms, detector type selected based on the space",
          "Heat detectors: In kitchens, laundries, and areas where smoke detectors would produce false alarms due to steam or dust",
          "Flame detectors: In high-risk areas such as medical gas manifold rooms and generator rooms",
          "Fire Alarm Control Panel (FACP): Centralised panel at the security or nursing station, indicating the zone and location of any alarm activation",
          "BMS integration: Fire alarm system integrated with Building Management System, automatic response actions triggered on alarm activation (HVAC shutdown, fire damper closure, lift recall)",
        ],
      },
      {
        type: "bullets",
        intro: "Hospital-specific requirements:",
        items: [
          "Zone alarm display at every nursing station, allowing nursing staff to identify which zone has activated without leaving their station",
          "Silent alarm capability for specific zones where audible alarms would disturb critical patients (ICU, NICU), staff alerted via nurse call panels or pagers",
          "Integration with nurse call system, fire alarm activation automatically alerts nursing staff on duty",
        ],
      },
      { type: "heading3", text: "Sprinkler System" },
      {
        type: "bullets",
        intro: "NBC 2016 and NABH requirements:",
        items: [
          "Mandatory in all hospital buildings above 15 metres in height",
          "Required in basements regardless of building height",
          "Required in electrical rooms, generator rooms, storage areas, and medical record rooms regardless of building height",
          "Wet pipe system in occupied areas, constantly charged with water, fastest response time",
          "Pre-action system in IT server rooms and electrical rooms, requiring dual detection before water is released, preventing accidental discharge damage to equipment",
        ],
      },
      { type: "heading3", text: "Material Specification for Fire Safety" },
      {
        type: "paragraph",
        text: "In most fire fatalities, smoke inhalation (not burns) is the cause of death. In a hospital, where patients cannot evacuate and will be exposed to any smoke that penetrates compartment boundaries, material specification is a direct life-safety issue.",
      },
      {
        type: "bullets",
        intro: "Key material requirements:",
        items: [
          "Low smoke zero halogen (LSZH) cables throughout, particularly critical in enclosed spaces and vertical cable routes. Standard PVC insulation releases hydrochloric acid gas when burned, LSZH cables release minimal smoke and no halogenic gases.",
          "Fire-resistant cable for life-safety circuits, fire alarm wiring, emergency lighting wiring, and critical power circuits must maintain circuit integrity during fire",
          "Flame-retardant finish specification for all wall and ceiling materials in clinical areas and escape routes",
          "No wood-based materials in ceiling systems serving clinical areas or escape routes, wood panel false ceilings are a common fire hazard",
          "Class 1 surface spread of flame rating for walls and ceilings in escape routes and high-occupancy areas",
        ],
      },
      { type: "heading2", text: "Fire Safety Design: A Clinical and Operational Checklist" },
      {
        type: "bullets",
        intro: "Site planning stage:",
        items: [
          "Emergency vehicle access route designed around the full building perimeter",
          "External hydrant positions identified and coordinated with site plan",
          "Fire pump room and water storage tank location identified",
        ],
      },
      {
        type: "bullets",
        intro: "Architectural design stage:",
        items: [
          "Fire compartment layout drawn and areas verified against NBC 2016 maximum compartment size",
          "Escape route widths, travel distances, and staircase counts verified against NBC 2016",
          "Horizontal evacuation strategy mapped, compartment-to-compartment movement paths identified",
          "Area of Refuge locations identified at all staircase lobbies",
          "Fire-rated door and wall schedule prepared",
        ],
      },
      {
        type: "bullets",
        intro: "MEP design stage:",
        items: [
          "Fire damper positions identified at all duct penetrations of fire-rated boundaries",
          "Sprinkler system design completed and coordinated with ceiling layout",
          "Fire detection system zoning plan drawn",
          "Emergency lighting circuit design completed",
          "LSZH cable specification confirmed for all clinical and escape route wiring",
        ],
      },
      {
        type: "bullets",
        intro: "Pre-occupancy stage:",
        items: [
          "Fire NOC obtained from state fire authority",
          "All systems commissioned and tested, including sprinklers, detectors, alarms, emergency lighting, and fire dampers",
          "Staff fire safety training completed and documented",
          "Evacuation drill conducted and documented",
          "NABH fire safety documentation package prepared",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "What are the NBC 2016 fire safety requirements for hospitals in India?",
            a: "NBC 2016 Part 4 classifies hospitals as Institutional Group I buildings and requires: fire compartments not exceeding 750 square metres separated by minimum 2-hour fire-rated walls and doors, minimum corridor widths of 2.4 metres, minimum two staircases per wing with fire-rated enclosures, automatic fire detection throughout, sprinkler systems in buildings above 15 metres and in all basements and high-risk areas, hydrant and hose reel systems on every floor, emergency lighting on all escape routes, and a Fire NOC from the local state fire authority before occupancy.",
          },
          {
            q: "How are non-ambulatory patients evacuated in a hospital fire?",
            a: "Non-ambulatory patients are managed using a horizontal evacuation strategy, moving patients laterally through fire-rated doors into an adjacent fire compartment on the same floor that is protected from the fire by fire-rated construction. This strategy buys time for fire suppression without requiring the physically demanding and clinically risky process of vertical evacuation via staircases. Vertical evacuation is initiated only if fire cannot be contained and the adjacent compartment is threatened.",
          },
          {
            q: "What is the role of fire compartmentalisation in hospital design?",
            a: "Fire compartmentalisation divides the hospital into bounded zones using fire-rated walls, floors, and doors. In a fire event, compartmentalisation contains fire and smoke within the compartment of origin, preventing it from spreading to adjacent areas. In a hospital, this is particularly critical because it enables a defend-in-place strategy for non-ambulatory patients, protecting them within a sealed compartment while fire is suppressed, rather than requiring immediate physical evacuation.",
          },
          {
            q: "What are LSZH cables and why are they required in hospitals?",
            a: "LSZH (Low Smoke Zero Halogen) cables are electrical cables with insulation that, when exposed to fire, produces minimal smoke and releases no halogenic gases. Standard PVC-insulated cables release hydrochloric acid gas when burned, in an enclosed space, this gas is immediately toxic at low concentrations. In hospitals, where patients cannot evacuate and staff must remain in the building to manage patients, LSZH cables are a critical life-safety specification.",
          },
          {
            q: "When must the Fire NOC be obtained for a hospital in India?",
            a: "The Fire NOC process in India typically involves two stages: a pre-construction or design-stage submission where fire safety drawings are reviewed and approved by the state fire authority, and a pre-occupancy inspection where the installed fire safety systems are inspected and certified before the building is permitted to be occupied. ARCHORA coordinates the Fire NOC submission and approval process as part of our hospital design and commissioning service.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Building a Fire-Safe Hospital?",
        body: "ARCHORA designs hospitals where fire safety is embedded in the architecture, not added as an afterthought. From NBC 2016 compliance and fire NOC coordination to evacuation strategy and material specification, our team ensures that your facility protects patients and staff under the most demanding conditions.",
      },
    ],
  },

  // ── ARTICLE 08 ──────────────────────────────────────────────────────────────
  {
    id: 8,
    slug: "why-hospital-startup-timeline-doubles-how-archora-prevents-it",
    category: "Hospital Planning",
    title: "Why Your Hospital Startup Timeline Will Double (And How ARCHORA Prevents It)",
    excerpt:
      "Most hospital projects in India take 30+ months and blow their budget. The losses are avoidable, and they happen before a single wall is built, in the planning assumptions and sequencing choices made in the earliest weeks of the project.",
    date: "February 20, 2026",
    readTime: "10–11 min read",
    author: "Prasad Patil, Founder & CEO, ARCHORA",
    tags: ["Hospital Timeline", "NABH-First Design", "Turnkey Delivery", "Project Planning", "Single-Window"],
    image:
      "/images/journal/hospital-startup-timeline.jpg",
    content: [
      {
        type: "paragraph",
        text: "I have worked directly with more than 100 doctor-entrepreneurs building their first hospital.",
      },
      {
        type: "paragraph",
        text: "The pattern is always the same. The pain points are always the same. And the losses (in time, money, and missed opportunity) are always avoidable.",
      },
      {
        type: "paragraph",
        text: "This article exists because most of those losses happen before a single wall is built. They happen in the planning assumptions, the vendor decisions, and the sequencing choices that are made in the earliest weeks of a hospital project, when everything feels manageable and nothing feels urgent.",
      },
      { type: "callout", text: "By the time the urgency arrives, the decisions have already been made. And reversing them costs far more than making them correctly the first time." },
      { type: "heading2", text: "The Assumption That Derails Every Hospital Project" },
      {
        type: "paragraph",
        text: "The most dangerous assumption in hospital development is also the most common one. Most healthcare founders approach building a hospital the way they would approach building a house or a commercial office: Find the land. Appoint an architect. Engage a contractor. Build the structure. Procure and install medical equipment at the end.",
      },
      {
        type: "paragraph",
        text: "This sequence feels logical because it mirrors how most other construction projects work. It is completely wrong for hospital development.",
      },
      { type: "callout", text: "Hospital infrastructure is not construction. It is regulatory engineering." },
      {
        type: "bullets",
        intro: "Every square metre of a hospital must simultaneously satisfy:",
        items: [
          "NABH standards across infrastructure, patient safety, and clinical governance domains",
          "National Building Code 2016 requirements for fire and life safety, structural design, and accessibility",
          "State health department infrastructure norms for bed count, room sizes, and department configurations",
          "Biomedical Waste Management Rules 2016 for waste segregation, storage, and disposal infrastructure",
          "Infection control guidelines that govern surface finishes, air quality, and circulation design",
          "Medical gas pipeline system standards for oxygen, nitrous oxide, vacuum, and medical air infrastructure",
          "Fire NOC requirements from the state fire authority",
          "Pollution control board clearances in applicable categories",
        ],
      },
      {
        type: "paragraph",
        text: "Get the sequence right and a hospital project can be delivered in 18 to 24 months, on budget, with regulatory approvals obtained smoothly and accreditation achieved on the first attempt. Get the sequence wrong and that same project takes 30 to 36 months, overruns its budget by 30 to 40%, and arrives at its opening date carrying unresolved compliance issues that create ongoing operational and accreditation problems.",
      },
      { type: "heading2", text: "The Three Mistakes That Double Your Timeline" },
      { type: "heading3", text: "Mistake 1: Architecture Comes Last Instead of First" },
      {
        type: "paragraph",
        text: "The conversation that costs hospital founders 6 to 12 months before construction even begins sounds like this: 'We will figure out the design once we finalise the land.' Or: 'Let us get the structural work started and bring the architect in once the shell is up.' Each of these statements reflects a fundamental misunderstanding of what hospital architecture actually is.",
      },
      {
        type: "paragraph",
        text: "A hospital architect is not decorating spaces. A hospital architect is creating the regulatory roadmap that every subsequent decision in the project depends on.",
      },
      {
        type: "bullets",
        intro: "NABH-compliant architectural design determines:",
        items: [
          "ICU bed count, bay dimensions, and zoning configuration, which directly affects the hospital's licensing category and capacity authorisation",
          "OT suite configuration, sterile zoning, laminar airflow canopy positioning, and scrub area layout, which determines whether the OT can be NABH-accredited",
          "Patient, staff, clean supply, and waste flow separation, the most fundamental infection control requirement",
          "MEP system specifications, the HVAC, medical gas, electrical, and plumbing requirements that are determined entirely by the architectural layout and clinical brief",
          "Fire safety compartmentalisation, escape route widths, and evacuation strategy, which must be resolved architecturally before the structural design is finalised",
          "Biomedical waste infrastructure routing, collection points, vertical transfer routes, holding rooms, and external collection areas",
        ],
      },
      {
        type: "paragraph",
        text: "A hospital founder who finalises a plot, negotiates a lease, engages a structural engineer, and begins RCC work before appointing a healthcare architect typically discovers, 4 to 6 months into construction, that the building layout does not support NABH-compliant zoning. At that point, the choice is between demolishing completed work and rebuilding, or accepting a facility that will carry compliance compromises for its entire operational life.",
      },
      { type: "heading3", text: "Mistake 2: Treating NABH as a 'Later' Problem" },
      {
        type: "paragraph",
        text: "This is the single most expensive mistake in Indian hospital development. The statement that has cost Indian hospital founders more than any other: 'Let us build first, then make it NABH-compliant.'",
      },
      {
        type: "paragraph",
        text: "The assumption behind this statement is that NABH is a certification process, a set of documentation, policies, and training programmes that can be overlaid onto a completed facility. This assumption is wrong. NABH is an infrastructure standard. Its requirements are physical. They must be built into walls, ceilings, floors, air systems, electrical systems, plumbing systems, and spatial layouts.",
      },
      {
        type: "bullets",
        intro: "Consider what NABH actually requires at the infrastructure level:",
        items: [
          "OT laminar airflow systems with HEPA filtration delivering minimum 20 air changes per hour at specified pressure differentials, this is an HVAC engineering specification that must be designed, sized, and installed during construction",
          "Seamless coving at all wall-to-floor and wall-to-ceiling junctions in clinical areas, this is a construction finish specification that cannot be added to a completed building without stripping and rebuilding the finishes",
          "Fire-rated compartmentalisation between specified clinical zones, this is a structural and architectural requirement that cannot be retrofitted without demolition",
          "Medical gas pipeline system installed in concealed pipework, this is an MEP installation that must be built into the wall and ceiling structure during construction",
          "Separate clean and soiled utility rooms for every clinical ward, a spatial requirement that cannot be created if the rooms were not planned in the original layout",
          "CSSD with validated sterilisation equipment and compliant spatial design, both a spatial and equipment requirement that shapes the floor plan",
          "Biomedical waste holding rooms with specified construction standards, ventilation, and access control, physical spaces that must be designed and built",
        ],
      },
      {
        type: "bullets",
        intro: "Attempting to bring a non-compliant facility into NABH compliance after construction is complete typically requires:",
        items: [
          "Partial demolition and reconstruction of affected areas",
          "Additional MEP installations in locations that were not designed for them, requiring surface-mounted services that further compromise hygiene standards",
          "Extended project timelines while remediation is carried out on a building that may already have partial staff occupancy",
          "Budget overruns that routinely reach Rs. 1.5 crore to Rs. 3 crore or more depending on the scale of the facility and the degree of non-compliance",
        ],
      },
      { type: "callout", text: "There is only one rational approach: NABH-native design from day one." },
      { type: "heading3", text: "Mistake 3: Multi-Vendor Fragmentation" },
      {
        type: "paragraph",
        text: "The standard approach to hospital project delivery in India looks like this: an architect completes the design, civil and structural work goes to an RCC contractor, MEP work goes to a separate MEP contractor, an interior designer is appointed separately, the OT equipment supplier is a different organisation, the medical gas installer is another separate vendor, and a NABH consultant is eventually appointed, by which time the design and construction decisions that determine accreditation outcomes have already been made.",
      },
      {
        type: "paragraph",
        text: "The result is a project with seven or more separate vendors, each operating within their own scope, each with their own priorities, and none of them with accountability for the project as a whole. This is not a project management structure. It is a recipe for delays, disputes, and budget overruns.",
      },
      {
        type: "bullets",
        intro: "The mechanics of how this causes timeline explosion are straightforward:",
        items: [
          "The MEP contractor discovers during installation that the duct routing conflicts with the structural beams, because the structural engineer and the MEP contractor never coordinated. Resolution takes 6 to 8 weeks.",
          "The OT equipment supplier arrives to install the operating lights and discovers that the structural provisions for ceiling mounting were not included in the RCC design. Additional structural work takes 4 weeks.",
          "The interior designer specifies wall finishes that do not meet NABH infection control standards, because the interior designer has no healthcare compliance expertise and the NABH consultant was not involved in the interior design stage.",
          "The medical gas installer finds that the pipe shaft dimensions are insufficient for the required pipework. Wall modification takes 3 weeks.",
        ],
      },
      { type: "heading2", text: "The ARCHORA Method: Single-Window Hospital Infrastructure Delivery" },
      {
        type: "paragraph",
        text: "ARCHORA was built specifically to solve the problem that multi-vendor fragmentation creates. Every element of our service model is designed around a single principle: one team owns the entire outcome.",
      },
      { type: "heading3", text: "Phase 1: Feasibility Audit (Weeks 1 to 2)" },
      {
        type: "bullets",
        intro: "Before any design work begins, we conduct a comprehensive feasibility review covering:",
        items: [
          "Site analysis: Physical dimensions, orientation, access points, ground conditions, setback requirements, and any site-specific constraints that will affect the building design",
          "Regulatory review: Identifying every applicable regulation (national, state, and local) that will govern the facility, and mapping the approval sequence required before construction can begin",
          "Bed capacity and department modelling: Translating the clinical brief into a spatial programme",
          "Budget reality check: An honest assessment of what the site, the programme, and the budget can realistically deliver, without the optimistic projections that lead to mid-project budget crises",
        ],
      },
      { type: "heading3", text: "Phase 2: NABH-First Design (Months 1 to 3)" },
      {
        type: "bullets",
        intro: "Every architectural decision in this phase is made with NABH compliance requirements as the primary filter:",
        items: [
          "Zoning is designed against NABH zone classification requirements, sterile, semi-sterile, clean, dirty, and public zones are spatially separated from the first sketch",
          "Department adjacencies are determined by clinical workflow logic, NABH requirements, and fire safety compartmentalisation simultaneously, not sequentially",
          "MEP systems are specified in parallel with architectural design, HVAC, MGPS, and electrical requirements are defined as the layout is developed, not after it is finalised",
          "Fire safety design is embedded in the architectural layout, escape route widths, compartment boundaries, and staircase positions are compliant from the first iteration",
        ],
      },
      { type: "heading3", text: "Phase 3: Integrated Execution (Months 4 to 18)" },
      {
        type: "bullets",
        intro: "RCC structure, MEP systems, modular panel systems, and medical infrastructure are executed by a single coordinated ARCHORA team:",
        items: [
          "Structural engineer, MEP engineer, and architect review every drawing together before it reaches site, conflicts are resolved on paper, not during construction",
          "Site supervision is by ARCHORA personnel, not delegated to the contractor's own supervisory team",
          "Weekly progress reviews against the master programme, with variance identification and recovery planning as standard",
          "NABH compliance review at each construction milestone, identifying and resolving any compliance deviation before it becomes embedded in completed work",
        ],
      },
      { type: "heading3", text: "Phase 4: Modular OT and ICU Installation (Months 16 to 20)" },
      {
        type: "bullets",
        intro: "Modular OT and ICU systems are pre-fabricated to NABH-compliant specifications and installed by our specialist team:",
        items: [
          "Panel systems manufactured under controlled factory conditions, consistent quality, consistent dimensions, verified material specifications",
          "Factory-stage quality inspection before delivery to site, defects identified and resolved before installation, not after",
          "Compressed on-site installation time, a modular OT that would take 12 to 16 weeks in conventional construction is installed and commissioned in 6 to 8 weeks",
          "MEP integration coordinated before installation, HVAC, MGPS, and electrical connections planned and prepared so that modular installation and MEP connection proceed simultaneously",
        ],
      },
      { type: "heading3", text: "Phase 5: Turnkey Handover (Months 20 to 24)" },
      {
        type: "bullets",
        intro: "Our handover package includes:",
        items: [
          "Commissioned and tested MEP systems, HVAC balance and commissioning reports, MGPS test certificates, electrical test certificates, fire system commissioning records",
          "Complete regulatory documentation, Fire NOC, state health department approvals, pollution control clearances, lift inspection certificates",
          "NABH pre-assessment documentation package, physical infrastructure documentation, policy templates, and guidance for the clinical and administrative NABH preparation process",
          "Staff familiarisation, our team briefs the hospital's clinical and administrative leads on every system in the facility",
          "Post-handover support, ongoing support for NABH assessment preparation, facility maintenance guidance, and future expansion planning",
        ],
      },
      { type: "heading2", text: "What the Numbers Look Like in Practice" },
      {
        type: "table",
        headers: ["Metric", "ARCHORA Projects", "Industry Average"],
        rows: [
          ["Project delivery timeline", "18 to 24 months", "30 to 36 months"],
          ["Budget adherence", "95% of projects within agreed budget", "60 to 70% budget adherence"],
          ["NABH first-attempt accreditation success", "100%", "Variable, frequently requiring multiple assessments"],
          ["Post-delivery defect resolution", "Covered under ARCHORA support", "Typically at client cost"],
        ],
      },
      { type: "heading3", text: "Recent Project: 180-Bed Multispeciality Hospital, Pune" },
      {
        type: "bullets",
        items: [
          "Delivered: 22 months from project commencement to turnkey handover",
          "Budget: Rs. 45 crore, final delivery at Rs. 45.89 crore (within 2% of agreed budget)",
          "NABH status: Pre-accreditation achieved at handover",
          "Operational performance: Full occupancy within 6 months of opening",
        ],
      },
      { type: "heading2", text: "The Most Important Hiring Decision You Will Make" },
      {
        type: "paragraph",
        text: "If you are a doctor or investor planning a hospital, the first professional you engage should not be a civil contractor. It should not be a general architect. It should be a healthcare infrastructure specialist, a team that understands hospital development not as a construction challenge but as a regulatory, clinical, and operational challenge that construction is the execution vehicle for.",
      },
      {
        type: "bullets",
        intro: "The right first conversation covers:",
        items: [
          "What your site can realistically support in terms of bed count, department mix, and building configuration",
          "What the complete regulatory approval sequence looks like for your specific location and project type",
          "How NABH compliance requirements will shape your design, your MEP systems, and your construction specification",
          "How medical equipment integration affects spatial planning and structural requirements",
          "What your realistic timeline and budget look like, based on your actual site, your actual programme, and current construction economics in your region",
          "What the most common risk events in projects like yours are, and how each one is managed",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "How long does it typically take to build a hospital in India?",
            a: "The industry average for hospital construction in India is 30 to 36 months from project commencement to operational handover, with significant budget overruns common. ARCHORA's single-window, NABH-first delivery method consistently delivers hospitals in 18 to 24 months, within 95% of the agreed project budget. The difference is the elimination of coordination failures, rework cycles, and compliance corrections that extend conventional multi-vendor projects.",
          },
          {
            q: "What does NABH-first design mean in practice?",
            a: "NABH-first design means that every architectural decision (zoning, department adjacency, circulation routing, MEP specification, surface finish selection) is made with NABH compliance requirements as the primary design filter, from the very first planning meeting. The result is a facility where compliance is built into the physical fabric of the building, rather than being attempted as a retrofit after construction. ARCHORA has achieved 100% NABH first-attempt accreditation success across all delivered projects using this approach.",
          },
          {
            q: "Why do most hospital projects in India exceed their budget?",
            a: "Budget overruns in Indian hospital projects most commonly result from three causes: design changes required to achieve regulatory compliance that was not designed in from the outset, coordination failures between multiple independent vendors that require rework of completed construction, and scope additions that were not identified during planning because the feasibility process was inadequate. ARCHORA's feasibility audit, NABH-first design, and single-team execution model address all three causes directly.",
          },
          {
            q: "What is single-window hospital infrastructure delivery?",
            a: "Single-window hospital infrastructure delivery means that one organisation (ARCHORA) is contractually responsible and operationally accountable for the complete hospital project: architecture, structural engineering, MEP design and installation, modular OT and ICU systems, interiors, and regulatory approvals. The hospital founder has one contract, one point of contact, one timeline, and one organisation accountable for the project outcome. There are no vendor coordination gaps, no accountability voids, and no finger-pointing when challenges arise.",
          },
          {
            q: "When should a hospital founder first engage ARCHORA?",
            a: "The earlier the better, ideally before a site has been finalised. Our feasibility audit can evaluate potential sites and identify the one that best supports the clinical programme and regulatory requirements of the project. Engaging ARCHORA after a site has been purchased but before any design or structural work has begun is the next best scenario. Engaging after structural work has begun significantly increases the probability of discovering compliance issues that require expensive correction.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Ready to Build Your Hospital the Right Way?",
        body: "ARCHORA delivers turnkey hospital infrastructure across India, architecture, structure, MEP, modular OT and ICU, interiors, and NABH compliance, under one contract, with one team, to one timeline. We offer a complimentary 30-minute hospital planning audit for serious hospital founders.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY COLORS
// ─────────────────────────────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  "Hospital Design": "#0f4c75",
  "Healthcare Compliance": "#1a6b3c",
  "Modular OT": "#7b3f00",
  "Hospital Planning": "#4a1a6e",
  Trends: "#4a1a6e",
  Sustainability: "#1a5c3a",
};

const NAVBAR_HEIGHT = 80;

// ─────────────────────────────────────────────────────────────────────────────
// FAQ ITEM
// ─────────────────────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="journal-faq-item"
      style={{ border: "1.5px solid rgba(15,76,117,0.13)", borderRadius: 12, overflow: "hidden" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="journal-faq-btn"
        style={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          border: "none",
          cursor: "pointer",
          background: open ? "#eef6fc" : "#fff",
          transition: "background 0.2s",
        }}
      >
        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(0.97rem, 2.5vw, 1.1rem)", fontWeight: 600, color: "#0d2b40", lineHeight: 1.35 }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          style={{ color: "#0f4c75", flexShrink: 0, fontSize: 24, fontWeight: 300, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <p className="journal-faq-answer" style={{ color: "#3a5f75", lineHeight: 1.75, margin: 0 }}>
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER BLOCK
// ─────────────────────────────────────────────────────────────────────────────
function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={idx} className="journal-paragraph" style={{ color: "#2d4a5e", lineHeight: 1.85, marginBottom: "1.5rem", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          {block.text}
        </p>
      );

    case "heading2":
      return (
        <motion.h2
          key={idx}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="journal-h2"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, color: "#0d2b40", lineHeight: 1.25 }}
        >
          <span style={{ width: 4, height: 28, background: "#0f4c75", borderRadius: "50%", display: "inline-block", flexShrink: 0, marginTop: 6 }} />
          {block.text}
        </motion.h2>
      );

    case "heading3":
      return (
        <h3 key={idx} className="journal-h3" style={{ fontFamily: "Cormorant Garamond, serif", color: "#0f3352", lineHeight: 1.3 }}>
          {block.text}
        </h3>
      );

    case "bullets":
      return (
        <div key={idx} style={{ marginBottom: "1.5rem" }}>
          {block.intro && (
            <p style={{ fontSize: "1.04rem", marginBottom: "0.75rem", lineHeight: 1.75, color: "#2d4a5e" }}>{block.intro}</p>
          )}
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {block.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.38, ease: "easeOut" }}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, color: "#2d4a5e", lineHeight: 1.75 }}
                className="journal-bullet"
              >
                <span style={{ width: 6, height: 6, background: "#0f4c75", borderRadius: "50%", opacity: 0.7, flexShrink: 0, marginTop: 9 }} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="journal-table-wrap"
          style={{ marginBottom: "2rem", overflowX: "auto", WebkitOverflowScrolling: "touch", borderRadius: 12, boxShadow: "0 2px 24px rgba(15,76,117,0.09)" }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
            <thead>
              <tr style={{ background: "#0a2438" }}>
                {block.headers.map((h, i) => (
                  <th key={i} style={{ padding: "14px 16px", textAlign: "left", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.06em", color: "#a8d4ec", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? "#f0f7fc" : "#fff", borderBottom: "1px solid #daedf5" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: "12px 16px", color: "#0d2b40", fontWeight: ci === 0 ? 600 : 400, fontSize: "0.88rem", lineHeight: 1.5 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      );

    case "callout":
      return (
        <motion.blockquote
          key={idx}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="journal-callout"
          style={{ background: "linear-gradient(135deg, #e5f3fb 0%, #cfe8f6 100%)", borderLeft: "4px solid #0f4c75", borderRadius: 12, margin: "2.5rem 0" }}
        >
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 600, color: "#0a2438", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
            {block.text}
          </p>
        </motion.blockquote>
      );

    case "divider":
      return (
        <div key={idx} style={{ margin: "3rem 0", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flexGrow: 1, height: 1, background: "rgba(15,76,117,0.1)" }} />
          <div style={{ width: 6, height: 6, background: "#0f4c75", borderRadius: "50%", opacity: 0.25 }} />
          <div style={{ flexGrow: 1, height: 1, background: "rgba(15,76,117,0.1)" }} />
        </div>
      );

    case "faq":
      return (
        <div key={idx} style={{ marginTop: "4rem", marginBottom: "2.5rem" }}>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, color: "#0d2b40", marginBottom: "2rem", lineHeight: 1.2 }}
            className="journal-faq-heading"
          >
            Frequently Asked Questions
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {block.items.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      );

    case "cta":
      return (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="journal-cta"
          style={{ marginTop: "4rem", background: "linear-gradient(135deg, #071a28 0%, #0f4c75 100%)", borderRadius: 16, textAlign: "center" }}
        >
          <h3 className="journal-cta-heading" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 600, lineHeight: 1.2, color: "#fff", marginBottom: 12 }}>
            {block.heading}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 1.75rem" }}>
            {block.body}
          </p>
          <div className="journal-cta-actions">
            <Link
              to="/contact"
              style={{ padding: "12px 24px", borderRadius: 8, fontWeight: 600, fontSize: "0.85rem", background: "#fff", color: "#0f4c75", fontFamily: "'DM Mono', monospace", textDecoration: "none", display: "inline-block", transition: "transform 0.2s, box-shadow 0.2s" }}
            >
              Contact ARCHORA
            </Link>
            <a
              href="mailto:contact@archora.in"
              style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Mono', monospace", textDecoration: "none" }}
            >
              contact@archora.in
            </a>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL RESPONSIVE STYLES
// ─────────────────────────────────────────────────────────────────────────────
const responsiveStyles = `
  /* ── Wrapper ── */
  .journal-wrap {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 80px;
    box-sizing: border-box;
  }
  @media (max-width: 1024px) { .journal-wrap { padding: 0 48px; } }
  @media (max-width: 640px)  { .journal-wrap { padding: 0 20px; } }

  /* ── Related articles outer wrapper ── */
  .journal-related-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 80px;
    box-sizing: border-box;
  }
  @media (max-width: 1024px) { .journal-related-wrap { padding: 0 48px; } }
  @media (max-width: 640px)  { .journal-related-wrap { padding: 0 20px; } }

  /* ── Hero content ── */
  .journal-hero-content {
    position: relative;
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    padding-bottom: 4rem;
    padding-top: calc(${NAVBAR_HEIGHT}px + 3.5rem);
    box-sizing: border-box;
  }
  @media (max-width: 1024px) { .journal-hero-content { padding-left: 48px; padding-right: 48px; } }
  @media (max-width: 640px)  { .journal-hero-content { padding-left: 20px; padding-right: 20px; padding-bottom: 2.5rem; } }

  /* ── Hero meta row ── */
  .journal-hero-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
  }

  /* ── Hero title ── */
  .journal-hero-title {
    font-family: Calibri, Arial, sans-serif;
    font-weight: 600;
    color: #fff;
    line-height: 1.06;
    margin-bottom: 1.25rem;
    font-size: clamp(1.9rem, 5vw, 4.4rem);
  }

  /* ── Article body typography ── */
  .journal-paragraph {
    font-size: clamp(1rem, 2.5vw, 1.18rem);
  }

  .journal-h2 {
    font-size: clamp(1.4rem, 4vw, 1.9rem);
    margin-top: 3.5rem;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .journal-h3 {
    font-size: clamp(1.1rem, 3vw, 1.25rem);
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  .journal-bullet {
    font-size: clamp(0.92rem, 2.2vw, 1rem);
  }

  /* ── Callout ── */
  .journal-callout {
    padding: 20px 24px;
  }
  @media (max-width: 640px) { .journal-callout { padding: 16px 18px; } }

  /* ── Table: horizontal scroll on mobile ── */
  .journal-table-wrap {
    -webkit-overflow-scrolling: touch;
  }

  /* ── FAQ button ── */
  .journal-faq-btn {
    padding: 20px 24px;
  }
  @media (max-width: 640px) { .journal-faq-btn { padding: 16px 16px; } }

  .journal-faq-answer {
    padding: 0 24px 20px;
    font-size: clamp(0.88rem, 2.2vw, 0.97rem);
  }
  @media (max-width: 640px) { .journal-faq-answer { padding: 0 16px 16px; } }

  .journal-faq-heading {
    font-size: clamp(1.4rem, 4vw, 1.9rem);
  }

  /* ── CTA block ── */
  .journal-cta {
    padding: 40px 32px;
  }
  @media (max-width: 640px) { .journal-cta { padding: 28px 20px; } }

  .journal-cta-heading {
    font-size: clamp(1.4rem, 4vw, 2rem);
  }

  .journal-cta-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  @media (max-width: 480px) {
    .journal-cta-actions {
      flex-direction: column;
      gap: 12px;
    }
  }

  /* ── Tags row (article header) ── */
  .journal-tags-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(15,76,117,0.09);
  }
  .journal-tags-author {
    margin-left: auto;
  }
  @media (max-width: 640px) {
    .journal-tags-author {
      margin-left: 0;
      width: 100%;
      margin-top: 4px;
    }
  }

  /* ── Related articles grid: 3 → 2 → 1 ── */
  .journal-related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  @media (max-width: 900px) {
    .journal-related-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 560px) {
    .journal-related-grid {
      grid-template-columns: 1fr;
    }
  }

  /* ── Related card image ── */
  .journal-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
  @media (max-width: 560px) {
    .journal-card-img-wrap {
      aspect-ratio: 16/9;
    }
    .journal-card-img {
      height: 100%;
    }
  }

  /* ── Back link ── */
  .journal-back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    margin-bottom: 2rem;
    color: rgba(255,255,255,0.55);
    font-family: 'DM Mono', monospace;
    text-decoration: none;
    transition: color 0.2s;
  }
  .journal-back-link:hover { color: #fff; }

  /* ── Prevent body scroll issues on very narrow screens ── */
  @media (max-width: 400px) {
    .journal-hero-meta .journal-meta-date,
    .journal-hero-meta .journal-meta-time {
      font-size: 0.7rem;
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function JournalPost() {
  const { id } = useParams();
  const article = articles.find(
    (a) => String(a.id) === String(id) || a.slug === id
  );

  if (!article) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          paddingTop: NAVBAR_HEIGHT,
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <style>{responsiveStyles}</style>
        <h1 style={{ fontSize: "clamp(2rem, 8vw, 5rem)", color: "#0d2b40", fontFamily: "Cormorant Garamond, serif" }}>
          Article not found
        </h1>
        <Link to="/journal" className="journal-back-link" style={{ color: "#0f4c75" }}>
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
      </div>
    );
  }

  const catColor = categoryColors[article.category] ?? "#0f4c75";

  return (
    <div style={{ minHeight: "100vh", background: "#f7fbfe" }}>
      <style>{responsiveStyles}</style>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        style={{ position: "relative", overflow: "hidden", minHeight: `calc(68vh + ${NAVBAR_HEIGHT}px)` }}
      >
        {/* Background image */}
        <motion.div
          style={{ position: "absolute", inset: 0 }}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            loading="eager"
            fetchPriority="high"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, rgba(7,26,40,0.45) 0%, rgba(7,26,40,0.72) 55%, rgba(7,26,40,0.91) 100%)`,
            }}
          />
        </motion.div>

        {/* Hero content */}
        <div className="journal-hero-content">
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}>
            <Link to="/journal" className="journal-back-link">
              <ArrowLeft size={13} />
              Back to Journal
            </Link>
          </motion.div>

          {/* Meta: category + date + read time */}
          <motion.div
            className="journal-hero-meta"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                padding: "4px 12px",
                borderRadius: 999,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: `${catColor}28`,
                color: "#a8d8f0",
                border: `1px solid ${catColor}45`,
                fontFamily: "'DM Mono', monospace",
                whiteSpace: "nowrap",
              }}
            >
              {article.category}
            </span>
            <span
              className="journal-meta-date"
              style={{ fontSize: "0.72rem", display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.48)", fontFamily: "'DM Mono', monospace" }}
            >
              <Calendar size={10} /> {article.date}
            </span>
            <span
              className="journal-meta-time"
              style={{ fontSize: "0.72rem", display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.48)", fontFamily: "'DM Mono', monospace" }}
            >
              <Clock size={10} /> {article.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="journal-hero-title"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {article.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(0.88rem, 2.2vw, 0.97rem)", lineHeight: 1.75, maxWidth: 600 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {article.excerpt}
          </motion.p>
        </div>

        {/* Fade to background */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 96, background: "linear-gradient(to bottom, transparent, #f7fbfe)", pointerEvents: "none" }} />
      </div>

      {/* ── Article Body ─────────────────────────────────────────────────── */}
      <div className="journal-wrap" style={{ paddingTop: "3.5rem", paddingBottom: "4rem" }}>
        {/* Tags + author row */}
        <motion.div
          className="journal-tags-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {article.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.68rem",
                padding: "4px 12px",
                borderRadius: 999,
                background: "rgba(15,76,117,0.06)",
                color: "#0f4c75",
                border: "1px solid rgba(15,76,117,0.14)",
                fontFamily: "'DM Mono', monospace",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </span>
          ))}
          <span
            className="journal-tags-author"
            style={{ fontSize: "0.72rem", color: "#4a7a9b", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}
          >
            By {article.author}
          </span>
        </motion.div>

        {/* Article content blocks */}
        <article>
          {article.content.map((block, idx) => renderBlock(block, idx))}
        </article>
      </div>

      {/* ── Related Articles ──────────────────────────────────────────────── */}
      <div style={{ paddingTop: "5rem", paddingBottom: "5rem", background: "#fff", borderTop: "1px solid rgba(15,76,117,0.07)" }}>
        <div className="journal-related-wrap">
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 28, height: 1, background: "#0f4c75" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#0f4c75", fontFamily: "'DM Mono', monospace" }}>
              Continue Reading
            </span>
          </div>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 600, color: "#0d2b40", marginBottom: "2.5rem", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
            More from the Journal
          </h2>

          {/* Grid */}
          <div className="journal-related-grid">
            {articles
              .filter((a) => a.id !== article.id)
              .slice(0, 3)
              .map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={`/journal/${rel.id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        background: "#f7fbfe",
                        border: "1.5px solid rgba(15,76,117,0.08)",
                        boxShadow: "0 2px 14px rgba(15,76,117,0.05)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(15,76,117,0.12)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 14px rgba(15,76,117,0.05)"; }}
                    >
                      {/* Card image */}
                      <div className="journal-card-img-wrap" style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
                        <ImageWithFallback
                          src={rel.image}
                          alt={rel.title}
                          className="journal-card-img"
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "none"; }}
                        />
                        <div style={{ position: "absolute", top: 10, left: 10 }}>
                          <span style={{ fontSize: "0.62rem", padding: "3px 10px", borderRadius: 999, background: "rgba(7,26,40,0.72)", color: "#a8d8f0", fontFamily: "'DM Mono', monospace", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
                            {rel.category}
                          </span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: "18px 20px 20px" }}>
                        <h3
                          style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontWeight: 600,
                            color: "#0d2b40",
                            lineHeight: 1.35,
                            fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                            marginBottom: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {rel.title}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, fontSize: "0.72rem", fontWeight: 600, color: "#0f4c75", fontFamily: "'DM Mono', monospace", transition: "gap 0.2s" }}>
                          <span>Read Article</span>
                          <ArrowRight size={11} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}