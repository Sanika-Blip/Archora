import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ArrowLeft, ArrowRight, ChevronDown, ChevronUp,
  FileText, Building2, Shield, ScrollText, Wrench, Zap, Activity, Check,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project.";
const FONT = "Calibri, 'Calibri', Arial, sans-serif";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ServiceSubSection {
  heading: string;
  items: string[];
}

interface FAQ {
  q: string;
  a: string;
}

interface RelatedService {
  title: string;
  slug: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  icon: React.ReactNode;
  color: string;
  pageTitle: string;
  metaDesc: string;
  heroH1: string;
  heroSub: string;
  problem: { heading: string; body: string[] };
  explainer: { heading: string; body: string[] };
  coverage: {
    heading: string;
    sections: ServiceSubSection[];
  };
  extra?: {
    heading: string;
    tableHead?: [string, string];
    tableRows?: [string, string][];
    body?: string[];
  };
  process: { step: string; title: string; desc: string }[];
  whyUs: { heading: string; points: string[] };
  whoNeeds: { heading: string; bullets: string[] };
  faqs: FAQ[];
  relatedServices: RelatedService[];
  bottomCTA: { heading: string; body: string };
}

// ─── Service Data ──────────────────────────────────────────────────────────────
export const servicesData: ServiceData[] = [
  {
    id: "01",
    slug: "feasibility-studies",
    icon: <FileText size={24} />,
    color: "#7eb8f7",
    pageTitle: "Hospital Feasibility Study and Detailed Project Report Services in India",
    metaDesc: "Planning a new hospital, clinic, or diagnostic centre in India? ARCHORA provides expert healthcare feasibility studies and detailed project reports that give you clarity before you commit capital.",
    heroH1: "Hospital Feasibility Study and Detailed Project Report Services in India",
    heroSub: "Before you invest crores into a healthcare facility, you need evidence, not assumptions. ARCHORA prepares comprehensive feasibility studies and detailed project reports that give doctors, investors, and healthcare promoters a clear, data-backed picture of their project before a single drawing is made.",
    problem: {
      heading: "Most Healthcare Projects Fail Before They Begin",
      body: [
        "The most expensive mistakes in healthcare infrastructure do not happen during construction. They happen before it, when critical decisions are made without the right data.",
        "A hospital built in the wrong location. A bed capacity that does not match local demand. A department mix that does not reflect the specialist availability in the region. A capital budget that was estimated without accounting for regulatory compliance costs. A project that runs out of funding halfway through because the phasing was not properly planned.",
        "These are not rare situations. They are the most common reasons why healthcare projects in India stall, overshoot their budgets, or underperform after opening.",
        "A rigorous feasibility study eliminates these risks before they become costly realities.",
      ],
    },
    explainer: {
      heading: "What Is a Healthcare Feasibility Study?",
      body: [
        "A healthcare feasibility study is a structured, evidence-based analysis that evaluates whether a proposed healthcare facility is viable from a clinical, operational, regulatory, and financial perspective before any design or construction investment is made.",
        "It answers the questions every healthcare promoter needs answered before committing capital:",
      ],
    },
    coverage: {
      heading: "What ARCHORA Covers in a Feasibility Study and DPR",
      sections: [
        {
          heading: "Site Assessment and Location Analysis",
          items: [
            "Evaluation of the proposed site or shortlisted sites",
            "Accessibility, connectivity, and catchment area mapping",
            "Proximity to competing healthcare facilities",
            "Site area, shape, and development potential assessment",
            "Regulatory and zoning compliance review for healthcare use",
            "Utility availability assessment including water, power, and drainage",
          ],
        },
        {
          heading: "Healthcare Demand and Catchment Area Analysis",
          items: [
            "Population data analysis for the primary and secondary catchment area",
            "Disease burden and specialty demand profiling",
            "Existing healthcare supply gap identification",
            "Outpatient, inpatient, emergency, and surgical demand projections",
            "Specialty-wise patient volume forecasting",
            "Growth trend analysis for the region",
          ],
        },
        {
          heading: "Facility Concept and Department Mix Recommendations",
          items: [
            "Recommended facility type and positioning",
            "Bed capacity recommendation based on demand analysis",
            "Department mix and specialty selection",
            "Outpatient department structure and clinic planning",
            "Diagnostic and support service requirements",
            "Future expansion and phasing strategy",
          ],
        },
        {
          heading: "Capital Expenditure Estimation",
          items: [
            "Land and site development costs",
            "Civil and structural construction cost estimation",
            "MEP and building services cost estimation",
            "Modular infrastructure costs for OT, ICU, and clean areas",
            "Medical equipment budget by department",
            "Furniture, fixtures, and equipment budget",
            "Regulatory, licensing, and compliance cost estimation",
            "Contingency and escalation provisions",
            "Total project cost summary with phasing plan",
          ],
        },
        {
          heading: "Revenue and Operational Projections",
          items: [
            "Specialty-wise revenue modelling",
            "Outpatient, inpatient, surgical, and diagnostic revenue projections",
            "Staffing requirements and manpower cost estimation",
            "Operating cost structure and break-even analysis",
            "Projected EBITDA and return on investment",
            "Funding requirement and debt-equity structuring recommendations",
          ],
        },
        {
          heading: "Regulatory and Compliance Assessment",
          items: [
            "Identification of all applicable licences and approvals",
            "NABH, NABL, INC, NMC, AERB, and PCPNDT requirements",
            "State-specific clinical establishment registration requirements",
            "Fire, pollution, and statutory approval roadmap",
            "Timeline estimation for regulatory approvals",
          ],
        },
      ],
    },
    process: [
      { step: "01", title: "Initial Briefing", desc: "We begin with a detailed discussion about your project concept, site, budget expectations, and timeline. This gives us the information we need to scope the study correctly." },
      { step: "02", title: "Site Visit and Data Collection", desc: "Our team conducts a site visit and collects all relevant data including local healthcare demand indicators, competitive supply mapping, site conditions, and regulatory requirements." },
      { step: "03", title: "Analysis and Modelling", desc: "We analyse demand data, model capital expenditure, build revenue projections, and assess all regulatory requirements for your specific project type and location." },
      { step: "04", title: "Draft Report Preparation", desc: "We prepare a structured draft report covering all sections of the feasibility study and DPR. You receive this for your review and feedback." },
      { step: "05", title: "Review and Finalisation", desc: "We incorporate your feedback, answer your questions, and finalise the report. The final document is delivered in a format suitable for internal use, bank submission, and investor presentation." },
      { step: "06", title: "Presentation and Handover", desc: "For clients who require it, we present the findings to key stakeholders including promoters, investors, and lenders, and answer questions on the findings and recommendations." },
    ],
    whyUs: {
      heading: "Why Get Your Feasibility Study Done by ARCHORA?",
      points: [
        "We work exclusively in healthcare infrastructure, so our cost benchmarks are based on real healthcare project data, not generic construction rates",
        "Our demand analysis is based on actual healthcare utilisation data, not population ratios alone",
        "Our regulatory assessment reflects current standards, not outdated templates",
        "Our DPRs are structured to meet the requirements of nationalised banks, private lenders, and institutional investors",
        "Every DPR we prepare is directly connected to our design and construction capability, so there is no gap between what the report promises and what the project delivers",
      ],
    },
    whoNeeds: {
      heading: "Who Needs a Feasibility Study and DPR?",
      bullets: [
        "A doctor or clinician planning your first hospital or nursing home",
        "A healthcare investor evaluating a new hospital project",
        "A hospital group planning a new branch or greenfield facility",
        "A medical or nursing college planning a new campus or expansion",
        "A healthcare developer building a facility for lease or sale",
        "A diagnostic centre promoter evaluating a new location",
        "Any promoter seeking a bank loan or investor funding for a healthcare project",
      ],
    },
    faqs: [
      { q: "How long does a healthcare feasibility study take?", a: "A comprehensive feasibility study and DPR for a hospital project typically takes between three and six weeks depending on the complexity of the project, the availability of data for the specific location, and the scope of the document required." },
      { q: "Is a DPR mandatory for getting a bank loan for a hospital?", a: "Most nationalised banks and many private lenders require a Detailed Project Report as part of the loan application process for healthcare projects. A well-structured DPR significantly strengthens your loan application and speeds up the appraisal process." },
      { q: "Can ARCHORA prepare a feasibility study for a project outside Maharashtra?", a: "Yes. ARCHORA prepares feasibility studies and DPRs for healthcare projects across India. Our team has experience with healthcare demand data, regulatory requirements, and construction cost benchmarks across multiple states and regions." },
      { q: "What is the difference between a feasibility study and a DPR?", a: "A feasibility study answers whether a project is viable. A Detailed Project Report translates that viability assessment into a complete project blueprint covering design concepts, cost estimates, financial projections, and regulatory roadmaps. ARCHORA typically prepares both as an integrated document." },
      { q: "Can ARCHORA also design and build the hospital after completing the DPR?", a: "Yes. ARCHORA provides end-to-end healthcare infrastructure services. Many of our clients engage us for the feasibility study and DPR first, and then continue with us for architecture, compliance, construction, and commissioning. This continuity ensures that the project delivered matches exactly what the DPR planned." },
      { q: "How much does a hospital feasibility study cost?", a: "The cost of a feasibility study and DPR depends on the scale and complexity of the proposed facility and the depth of analysis required. Contact our team for a scoped proposal based on your specific project." },
    ],
    relatedServices: [
      { title: "Healthcare Architecture & Clinical Space Planning", slug: "healthcare-architecture" },
      { title: "Regulatory Compliance & Accreditation-Ready Design", slug: "regulatory-compliance" },
      { title: "Hospital Licensing & Approvals Support", slug: "hospital-licensing" },
      { title: "MEP Engineering for Healthcare", slug: "mep-engineering" },
      { title: "Project Management & Commissioning", slug: "project-management" },
    ],
    bottomCTA: {
      heading: "Ready to Validate Your Healthcare Project Before You Invest?",
      body: "Talk to ARCHORA before you commit capital. We will give you an honest, data-backed assessment of your project and tell you exactly what it will take to deliver it successfully.",
    },
  },
  {
    id: "02",
    slug: "healthcare-architecture",
    icon: <Building2 size={24} />,
    color: "#7eb8f7",
    pageTitle: "Healthcare Architecture and Hospital Design Services in India",
    metaDesc: "ARCHORA provides specialist healthcare architecture and clinical space planning services across India. NABH-compliant hospital design, department planning, and patient flow optimisation.",
    heroH1: "Healthcare Architecture and Hospital Design Services in India",
    heroSub: "A hospital is not a building. It is a clinical environment where patient outcomes, staff efficiency, infection control, and operational performance are directly shaped by the quality of the design. ARCHORA designs healthcare facilities that work as well as they look.",
    problem: {
      heading: "Why Most Hospitals in India Are Poorly Designed",
      body: [
        "The majority of hospitals and clinics built in India today are designed by general architects who have no specialist knowledge of healthcare environments. The result is facilities that look like hospitals on the outside but function poorly on the inside.",
        "Departments placed in the wrong sequence. Patient corridors that cross-contaminate clean and dirty zones. OPD layouts that create bottlenecks at peak hours. ICUs that do not meet infection-control standards. Emergency departments that cannot handle trauma efficiently. Wards that make nursing rounds inefficient. Facilities that fail NABH inspections because the design never accounted for accreditation requirements.",
        "These are not design failures that can be corrected with a coat of paint or a new signage system. They are fundamental planning failures that cost crores to fix and, in some cases, cannot be fixed at all without demolishing and rebuilding.",
        "The only way to avoid them is to work with an architect who understands healthcare from the inside out, before a single drawing is produced.",
      ],
    },
    explainer: {
      heading: "What Is Healthcare Architecture?",
      body: [
        "Healthcare architecture is a specialist discipline that combines architectural design with a deep understanding of clinical workflows, patient safety, infection control, regulatory compliance, and the operational demands of healthcare environments.",
        "It is fundamentally different from commercial or residential architecture. Every design decision in a healthcare facility has a clinical consequence. The width of a corridor affects how quickly a stretcher can be moved in an emergency. The position of a hand wash station affects infection rates. The placement of a nurses station affects response times. The zoning of clean and dirty utilities affects NABH compliance.",
        "Healthcare architecture is the discipline of making every one of these decisions correctly, by design, before construction begins.",
      ],
    },
    coverage: {
      heading: "What ARCHORA Covers in Healthcare Architecture and Clinical Space Planning",
      sections: [
        {
          heading: "Master Planning and Campus Layout",
          items: [
            "Site analysis and development potential assessment",
            "Hospital campus master planning for greenfield projects",
            "Phased development planning for multi-stage hospital campuses",
            "Parking, access, and external circulation planning",
            "Utility infrastructure planning for the full campus",
            "Future expansion zoning built into the master plan from day one",
          ],
        },
        {
          heading: "Clinical Space Programming and Department Planning",
          items: [
            "Department-by-department space programming based on clinical brief",
            "Room-by-room area scheduling for every department",
            "Adjacency planning to ensure correct departmental relationships",
            "Functional zone planning for OPD, IPD, emergency, surgical, diagnostic, and support areas",
            "Staff, patient, and visitor circulation planning",
            "Dirty and clean utility planning and zoning",
          ],
        },
        {
          heading: "Patient Flow and Operational Efficiency Design",
          items: [
            "OPD patient flow modelling and queue management design",
            "Emergency department triage flow and trauma bay planning",
            "Inpatient admission, discharge, and transfer flow planning",
            "Surgical patient pathway from pre-op to post-op recovery",
            "Diagnostic patient routing to minimise waiting time and cross-contamination",
            "Visitor management and controlled access zone planning",
          ],
        },
        {
          heading: "Infection Control Design",
          items: [
            "Clean and contaminated zone separation",
            "Air pressure zoning for high-risk clinical areas",
            "Hand hygiene facility placement as per infection control standards",
            "Surface material specification for infection-controlled environments",
            "Waste management and dirty utility room placement",
            "Isolation room design for infectious disease management",
          ],
        },
        {
          heading: "NABH and Regulatory Compliant Design",
          items: [
            "NABH standards integrated into the architectural layout from day one",
            "Fire safety design and emergency evacuation planning",
            "Barrier-free design and accessibility as per RPWD Act",
            "National Building Code compliance for healthcare occupancy",
            "State-specific clinical establishment norms integrated into the design",
            "Design documentation structured to support NABH pre-accreditation surveys",
          ],
        },
        {
          heading: "Schematic Design, Design Development, and Construction Drawings",
          items: [
            "Concept design and schematic layout presentations",
            "Design development drawings with detailed room data sheets",
            "Construction drawing package for all architectural elements",
            "Door and window schedules, finish schedules, and material specifications",
            "Coordination drawings integrating structural and MEP inputs",
            "As-built drawing preparation post construction",
          ],
        },
      ],
    },
    extra: {
      heading: "Healthcare Facilities We Design Across India",
      tableHead: ["Facility Type", "Key Design Considerations"],
      tableRows: [
        ["Multi-Speciality Hospital", "Department mix, surgical suite planning, ICU zoning, OPD flow"],
        ["Super-Speciality Hospital", "Specialist department design, advanced diagnostic integration"],
        ["Nursing Home", "Compact clinical efficiency, regulatory compliance in limited footprint"],
        ["Day Care Centre", "High-throughput ambulatory design, recovery bay planning"],
        ["Diagnostic Centre", "Imaging suite design, AERB compliance, sample flow planning"],
        ["Medical College Hospital", "Teaching and clinical integration, NMC norms compliance"],
        ["Nursing College", "INC norms compliance, skills lab and clinical training spaces"],
        ["IVF and Fertility Centre", "Cleanroom lab design, embryology suite, patient privacy planning"],
        ["Modular OT Complex", "Laminar airflow, cleanroom standards, pendant and equipment integration"],
        ["ICU Complex", "Bed spacing, nurse station visibility, isolation bay planning"],
      ],
    },
    process: [
      { step: "01", title: "Clinical Brief and Stakeholder Consultation", desc: "Every ARCHORA project begins with a deep understanding of the clinical vision. We meet with the promoters, the key clinicians, and the operational leadership to understand what the facility needs to do, how it needs to work, and who it needs to serve." },
      { step: "02", title: "Site Analysis and Design Constraints Assessment", desc: "We analyse the site in detail, including its orientation, access points, surrounding context, utility connections, and regulatory constraints. This analysis informs the master plan and ensures the design responds correctly to the physical reality of the site." },
      { step: "03", title: "Space Programming and Functional Relationships", desc: "Before any architectural drawings are produced, we prepare a detailed space programme that defines every room in the facility, its required area, its functional relationships with adjacent spaces, and its compliance requirements." },
      { step: "04", title: "Schematic Design and Layout Development", desc: "We develop the architectural layout, starting with the overall building organisation, departmental adjacencies, and circulation systems, and progressively refining to room-level planning. We present schematic options for client review and input before advancing to detailed design." },
      { step: "05", title: "Compliance Review and Integration", desc: "At every stage of the design process, our compliance team reviews the developing design against all applicable regulatory standards. NABH, fire safety, accessibility, and all other relevant requirements are checked and integrated before construction drawings are prepared." },
      { step: "06", title: "Construction Drawing Package", desc: "We prepare a complete construction drawing package covering all architectural elements, coordinated with structural and MEP inputs, and suitable for contractor tendering, regulatory submission, and site execution." },
      { step: "07", title: "Construction Stage Architectural Support", desc: "Our involvement does not end when the drawings are issued. We provide construction-stage architectural support including site visits, query resolution, material approval, and as-built drawing preparation to ensure the facility is built to the design intent." },
    ],
    whyUs: {
      heading: "Why Choose ARCHORA for Your Healthcare Architecture Project?",
      points: [
        "Every architect on the ARCHORA team works exclusively on healthcare projects. We do not design offices, residences, or shopping centres.",
        "Our design process is informed by direct engagement with clinicians, we understand how OPDs function at peak load, how OT teams move, and how infection control failures happen.",
        "Regulatory requirements are part of our design brief from the first meeting. NABH standards, fire safety, accessibility are integrated from the beginning, not retrofitted at the end.",
        "Our leadership team brings experience from NHS healthcare infrastructure projects in the United Kingdom alongside extensive Indian healthcare project experience.",
        "Because ARCHORA provides architecture, engineering, construction, and project management under one roof, the design intent is never lost in translation between different consultants.",
      ],
    },
    whoNeeds: {
      heading: "Who Is This Service For?",
      bullets: [
        "Any healthcare promoter, doctor, institution, or investor building or renovating a healthcare facility of any scale",
        "From a 200 sq ft clinic to a 1000-bed hospital campus",
        "Greenfield hospital projects on new land",
        "Brownfield projects, converting or upgrading existing buildings",
        "Medical colleges and nursing colleges requiring compliant campus design",
        "Diagnostic centres, IVF clinics, day-surgery centres, and speciality facilities",
      ],
    },
    faqs: [
      { q: "What is the difference between a healthcare architect and a general architect?", a: "A healthcare architect specialises exclusively in the design of clinical environments. They understand clinical workflows, infection control requirements, regulatory compliance standards, medical equipment integration, and the operational demands of healthcare facilities. A general architect, however skilled, does not have this specialist knowledge and will typically produce a design that looks like a hospital but does not function like one." },
      { q: "Does ARCHORA design hospitals outside Maharashtra?", a: "Yes. ARCHORA designs healthcare facilities across India. Our team is familiar with state-specific regulatory requirements, local construction practices, and regional healthcare demand characteristics across multiple states." },
      { q: "How long does it take to design a hospital?", a: "The design timeline depends on the scale and complexity of the facility. A small clinic or nursing home design can be completed in four to eight weeks. A mid-size hospital design typically takes three to six months. A large multi-speciality hospital design can take six to twelve months. ARCHORA will provide a specific timeline based on your project scope at the time of briefing." },
      { q: "Can ARCHORA redesign or upgrade an existing hospital?", a: "Yes. ARCHORA undertakes brownfield projects including facility upgrades, department reconfigurations, expansion projects, and full facility renovations. We assess the existing building, identify constraints, and develop a design that maximises the clinical and operational performance of the upgraded facility." },
      { q: "Does the architectural design include interior design?", a: "ARCHORA's architectural service covers clinical space planning, room layouts, material specifications, and finish schedules. Full healthcare interior design including furniture selection, colour schemes, wayfinding design, and patient environment detailing is available as part of our turnkey execution service." },
      { q: "Will the design be NABH compliant?", a: "Yes. Every design ARCHORA produces integrates NABH standards from the first drawing. We do not produce designs that require compliance corrections at the accreditation stage. Our designs are structured to support pre-accreditation surveys and final NABH assessments." },
      { q: "Can ARCHORA also build the hospital after designing it?", a: "Yes. ARCHORA provides end-to-end healthcare infrastructure delivery. Many clients engage us for architecture first and then continue with us for engineering, construction, equipment planning, and commissioning. This continuity between design and delivery is one of the most significant advantages of working with ARCHORA." },
    ],
    relatedServices: [
      { title: "Feasibility Studies & Detailed Project Reports", slug: "feasibility-studies" },
      { title: "Regulatory Compliance & Accreditation-Ready Design", slug: "regulatory-compliance" },
      { title: "Structural Design for Healthcare Facilities", slug: "structural-design" },
      { title: "MEP Engineering for Healthcare", slug: "mep-engineering" },
      { title: "Modular OT & ICU Infrastructure", slug: "modular-ot-icu" },
      { title: "Turnkey Civil & Interior Execution", slug: "turnkey-execution" },
      { title: "Project Management & Commissioning", slug: "project-management" },
    ],
    bottomCTA: {
      heading: "Ready to Design a Healthcare Facility That Works?",
      body: "Talk to ARCHORA today. We will listen to your clinical vision, assess your site, and tell you honestly how to design a facility that meets every regulatory standard, supports every clinical workflow, and delivers on your investment.",
    },
  },
  {
    id: "03",
    slug: "regulatory-compliance",
    icon: <Shield size={24} />,
    color: "#7eb8f7",
    pageTitle: "NABH Compliant Hospital Design and Healthcare Regulatory Compliance Services in India",
    metaDesc: "ARCHORA integrates NABH, NABL, INC, NMC, AERB, and all applicable regulatory standards into your healthcare facility design from day one. No last-minute corrections. No accreditation failures.",
    heroH1: "NABH Compliant Hospital Design and Healthcare Regulatory Compliance Services in India",
    heroSub: "Every healthcare facility in India must comply with a complex, multi-layered framework of national and state-level regulations. ARCHORA integrates every applicable compliance standard into your facility design from the very first drawing, so you never face costly corrections, failed inspections, or delayed openings.",
    problem: {
      heading: "Compliance Failures Are the Most Expensive Mistakes in Healthcare Construction",
      body: [
        "Every year, healthcare projects across India face the same preventable crisis. A facility is designed, built, and almost ready to open. Then the NABH surveyor walks in, or the fire department inspection happens, or the state health department assessment takes place, and the problems begin.",
        "Corridors that are too narrow for the required emergency access. OT air change rates that do not meet NABH standards. Hand wash stations missing from required locations. Nurse stations positioned in ways that violate patient safety norms. Electrical systems that do not meet critical care requirements. Fire exit widths that fail the NOC inspection.",
        "Each correction requires shutting down completed work, breaking into finished walls, ceilings, and floors, and rebuilding systems and spaces that were already constructed. The cost is significant. The delay is significant. The reputational damage to the project is significant.",
        "Every single one of these failures has the same root cause. Compliance was treated as something to check at the end, not something to design from the beginning. ARCHORA eliminates this risk entirely.",
      ],
    },
    explainer: {
      heading: "Compliance Is Not a Checklist. It Is a Design Discipline.",
      body: [
        "At ARCHORA, regulatory compliance is not something we verify after the design is complete. It is a design input from the very first meeting.",
        "When we begin a new healthcare project, the compliance brief is developed alongside the clinical brief. Every applicable standard, every regulatory body, and every accreditation requirement is identified at the outset and integrated into the design process as a live constraint.",
        "The result is a facility design that is compliant by construction, not corrected after it.",
      ],
    },
    coverage: {
      heading: "The Complete Regulatory Framework ARCHORA Covers",
      sections: [
        {
          heading: "NABH, National Accreditation Board for Hospitals and Healthcare Providers",
          items: [
            "Patient safety and access standards including corridor widths, ramp gradients, and door dimensions",
            "Infection control infrastructure including hand hygiene station placement, zone separation, and surface material specifications",
            "Fire safety and emergency preparedness including exit widths, emergency lighting, and evacuation route planning",
            "Facility and environment management standards covering utilities, medical gas systems, and waste management infrastructure",
            "Clinical department-specific standards for OT, ICU, emergency, labour and delivery, and all other clinical areas",
            "Documentation and signage standards for patient-facing and staff areas",
          ],
        },
        {
          heading: "NABL, National Accreditation Board for Testing and Calibration Laboratories",
          items: [
            "Laboratory layout and workflow design as per ISO 15189 and NABL guidelines",
            "Temperature and humidity control infrastructure for specimen storage and reagent management",
            "Biosafety cabinet placement and ventilation design",
            "Sample reception, processing, and reporting zone separation",
            "Waste segregation and disposal infrastructure for biological and chemical waste",
            "Calibration and equipment maintenance access planning",
          ],
        },
        {
          heading: "INC, Indian Nursing Council",
          items: [
            "Required room types and minimum area standards for all nursing college spaces",
            "Skills laboratory and clinical training room design",
            "Library, hostel, and administrative facility standards",
            "Attached hospital infrastructure requirements for nursing education",
            "Documentation and layout presentation structured for INC inspection",
          ],
        },
        {
          heading: "NMC, National Medical Commission",
          items: [
            "Department-wise space and bed capacity requirements as per NMC regulations",
            "Teaching facility standards including lecture theatres, tutorial rooms, and demonstration labs",
            "Residential and hostel facility requirements for students, interns, and residents",
            "Hospital infrastructure standards for attached teaching hospitals",
            "Layout and documentation structured for NMC inspection and recognition",
          ],
        },
        {
          heading: "AERB, Atomic Energy Regulatory Board",
          items: [
            "Radiation shielding design for all X-ray, CT, fluoroscopy, and nuclear medicine rooms",
            "Lead lining specifications for walls, floors, ceilings, and doors in radiation areas",
            "Control room and operator protection design",
            "Radiation warning signage and access control planning",
            "AERB licence application documentation support",
          ],
        },
        {
          heading: "PCPNDT Act, National Building Code, Fire NOC and RPWD Act",
          items: [
            "Ultrasound room design and access control planning as per PCPNDT Act",
            "Occupancy classification and applicable fire safety provisions for healthcare buildings",
            "Means of escape design including exit widths, travel distances, and staircase requirements",
            "Fire compartmentation, detection, alarm, and sprinkler system design",
            "Accessible entrance, reception, ramps, handrails, and barrier-free patient areas per RPWD Act",
            "Accessible toilet and bathroom design, lift design, and parking bay planning",
          ],
        },
      ],
    },
    process: [
      { step: "01", title: "Compliance Brief Development", desc: "At the start of every project, we identify every regulatory body, accreditation standard, and licensing requirement applicable to the specific facility type and location. This compliance brief is developed alongside the clinical brief before any design work begins." },
      { step: "02", title: "Compliance Requirements Integration", desc: "Every requirement from the compliance brief is translated into a design constraint and integrated into the architectural, structural, and MEP design process. Space requirements, material specifications, system standards, and documentation requirements are all captured and tracked." },
      { step: "03", title: "Compliance Design Reviews", desc: "At key design milestones, our team conducts formal compliance reviews against the full compliance brief. Any gaps are identified and resolved before the design advances to the next stage." },
      { step: "04", title: "Regulatory Documentation Preparation", desc: "We prepare all design-related documentation required for regulatory submissions, licence applications, and accreditation surveys, including layout drawings, area statements, room data sheets, and compliance checklists." },
      { step: "05", title: "Pre-Accreditation Design Audit", desc: "Before construction begins, we conduct a final compliance audit of the complete design package. This audit confirms that the design, as drawn, meets every applicable standard and is ready for construction without requiring compliance corrections." },
      { step: "06", title: "Construction Stage Compliance Monitoring", desc: "During construction, our team monitors the site to ensure that compliance-critical elements are being built to the design specification. Any deviations are identified and corrected before they are embedded in the finished building." },
    ],
    whyUs: {
      heading: "Why ARCHORA for Compliance-Integrated Design",
      points: [
        "Compliance is part of our design brief from the first meeting, not a checklist applied at the end",
        "Our team covers NABH, NABL, INC, NMC, AERB, PCPNDT, NBC, Fire NOC, and RPWD Act in a single integrated process",
        "We have delivered compliance-integrated designs across India including facilities that have achieved NABH accreditation on first survey",
        "Our AERB shielding design is backed by formal radiation physics calculations, not generic specifications",
        "State-specific requirements across India are built into our compliance brief as standard, not an afterthought",
      ],
    },
    whoNeeds: {
      heading: "Who Needs Compliance-Integrated Healthcare Design?",
      bullets: [
        "Planning a new hospital and want NABH accreditation from the outset",
        "Building a diagnostic laboratory and need NABL-compliant infrastructure",
        "Developing a nursing college and require INC-recognised facilities",
        "Building a medical college hospital and need NMC-compliant infrastructure",
        "Installing any radiation equipment and need AERB-compliant shielding design",
        "Operating ultrasound facilities and need PCPNDT-compliant infrastructure",
        "Upgrading an existing facility that has failed a regulatory inspection",
        "Planning a new facility and want to avoid compliance corrections during or after construction",
      ],
    },
    faqs: [
      { q: "What is NABH and why does it matter for hospital design?", a: "NABH stands for the National Accreditation Board for Hospitals and Healthcare Providers. It is the primary healthcare quality accreditation body in India. NABH accreditation is increasingly required for empanelment with insurance companies, government health schemes, and corporate health programmes. Many of the NABH standards directly govern the physical design of the facility, which means that a hospital designed without NABH compliance in mind will require significant and costly modifications before it can be accredited." },
      { q: "Can ARCHORA help a facility that has already been built but has compliance gaps?", a: "Yes. ARCHORA undertakes compliance gap assessments for existing facilities. We audit the existing infrastructure against all applicable standards, identify every gap, prioritise corrections by severity, and develop a remediation plan that addresses compliance failures with the minimum disruption to ongoing operations." },
      { q: "Does ARCHORA prepare the actual NABH application?", a: "ARCHORA's compliance service covers the infrastructure and design aspects of NABH compliance. We design and deliver a facility that meets all physical infrastructure requirements for NABH accreditation. The operational and clinical process aspects of NABH accreditation are typically handled by a dedicated NABH consultant, and we work collaboratively with such consultants on client projects." },
      { q: "Is NABH accreditation mandatory for all hospitals in India?", a: "NABH accreditation is not currently mandatory for all hospitals in India, though this is evolving. However, NABH accreditation or entry-level certification is required for empanelment under the Ayushman Bharat PM-JAY scheme, many state government health schemes, and most corporate and insurance TPA networks. For any hospital with an ambition to grow its patient base, NABH accreditation is effectively essential." },
      { q: "What is the cost of making a hospital NABH compliant from a design perspective?", a: "There is no additional cost to designing a hospital to NABH standards if compliance is integrated from the beginning. The cost comes when compliance is retrofitted after the facility has been built, which can involve expensive demolition and reconstruction of completed work. This is precisely why ARCHORA integrates compliance from the first drawing, not the last." },
      { q: "Does ARCHORA cover AERB compliance for radiology departments?", a: "Yes. ARCHORA provides full AERB-compliant shielding design for all types of ionising radiation rooms including X-ray, CT, fluoroscopy, mammography, and nuclear medicine. We prepare the radiation shielding design calculations, construction specifications, and documentation required for AERB licence applications." },
    ],
    relatedServices: [
      { title: "Feasibility Studies & Detailed Project Reports", slug: "feasibility-studies" },
      { title: "Healthcare Architecture & Clinical Space Planning", slug: "healthcare-architecture" },
      { title: "Hospital Licensing & Approvals Support", slug: "hospital-licensing" },
      { title: "MEP Engineering for Healthcare", slug: "mep-engineering" },
      { title: "Modular OT & ICU Infrastructure", slug: "modular-ot-icu" },
      { title: "Turnkey Civil & Interior Execution", slug: "turnkey-execution" },
      { title: "Project Management & Commissioning", slug: "project-management" },
    ],
    bottomCTA: {
      heading: "Want a Healthcare Facility That Passes Every Inspection and Accreditation Survey?",
      body: "Talk to ARCHORA before your design begins. We will ensure that every regulatory standard applicable to your facility is integrated into the design from day one, so you never face a compliance failure after construction.",
    },
  },
  {
    id: "04",
    slug: "hospital-licensing",
    icon: <ScrollText size={24} />,
    color: "#7eb8f7",
    pageTitle: "Hospital Licensing and Approvals Support Services in India | ARCHORA",
    metaDesc: "ARCHORA provides expert hospital licensing and approvals support across India. Clinical establishment registration, fire NOC, AERB, PCPNDT, and all statutory approvals handled by specialists. Talk to our team today.",
    heroH1: "Hospital Licensing and Approvals Support Services in India",
    heroSub: "Opening a healthcare facility in India requires navigating one of the most complex multi-agency approval processes in any industry. ARCHORA provides structured, expert support for every licence and approval your facility needs, from the first application to the final certificate.",
    problem: {
      heading: "The Licensing Maze That Stops Healthcare Projects From Opening",
      body: [
        "A healthcare facility can be beautifully designed, perfectly built, and fully equipped. And it can still sit empty for months, or even years, because the licensing and approvals process was not managed correctly.",
        "India's healthcare licensing framework involves multiple central and state government agencies, each with its own documentation requirements, inspection procedures, timelines, and fee structures. A promoter managing this process without specialist support will almost certainly encounter applications rejected due to incomplete or incorrectly formatted documentation, inspections failed due to infrastructure gaps that were not identified in advance, and approvals delayed because the correct sequence of applications was not followed.",
        "Licences can be held up because a dependency approval from another agency was not obtained first. Significant time and money is spent on repeated applications, legal consultations, and liaison visits.",
        "For a healthcare project where every month of delay costs lakhs in loan interest, operational costs, and lost revenue, a poorly managed approvals process is one of the most financially damaging risks a promoter can face. ARCHORA eliminates this risk with structured, specialist approvals management.",
      ],
    },
    explainer: {
      heading: "Every Licence and Approval Your Healthcare Facility Needs",
      body: [
        "ARCHORA covers the full spectrum of healthcare licensing in India, from Clinical Establishment Registration and Building Use Permission to Fire NOC, Pollution Control Board NOC, AERB approvals, PCPNDT registration, Pharmacy Licence, Blood Bank Licence, and Lift and Electrical Approvals.",
        "Each approval type has its own documentation requirements, inspection procedures, and dependency sequence. ARCHORA prepares a structured approval roadmap for every project that maps every required approval, its dependencies, its timeline, and its documentation requirements, ensuring that every application is made at the right time, with the right documentation, in the correct sequence.",
      ],
    },
    coverage: {
      heading: "Every Licence and Approval ARCHORA Manages",
      sections: [
        {
          heading: "Clinical Establishment Registration",
          items: [
            "Pre-application assessment of eligibility and documentation requirements",
            "Preparation of the complete registration application package",
            "Coordination with the District or State Registration Authority",
            "Compliance gap assessment prior to inspection",
            "Support during the inspection process",
            "Follow-up and resolution of any queries or objections raised by the authority",
            "Certificate of registration receipt and filing",
          ],
        },
        {
          heading: "Building Use Permission and Occupancy Certificate",
          items: [
            "Coordination with the local municipal corporation or development authority",
            "Preparation of the completion certificate application package",
            "As-built drawing preparation and submission",
            "Liaison with structural engineer and MEP consultants for required certificates",
            "Coordination of the building inspection and resolution of any objections",
            "Occupancy certificate receipt and filing",
          ],
        },
        {
          heading: "Fire NOC, Fire No Objection Certificate",
          items: [
            "Fire safety system design coordination to meet the specific state fire authority inspection standards",
            "Pre-inspection readiness assessment",
            "Preparation of the Fire NOC application package including drawings, system specifications, and equipment details",
            "Liaison with the state fire department for inspection scheduling",
            "Support during the fire safety inspection",
            "Resolution of any deficiencies identified during inspection",
            "Fire NOC receipt and filing",
          ],
        },
        {
          heading: "AERB Approvals for Radiology and Nuclear Medicine",
          items: [
            "AERB licence to construct the radiation room",
            "AERB licence to install the radiation equipment",
            "AERB licence to operate the radiation equipment",
            "Radiation shielding design documentation for AERB submission",
            "Qualified Medical Physicist coordination for AERB applications",
            "Equipment commissioning report preparation for AERB",
            "Renewal of AERB licences at the required intervals",
          ],
        },
        {
          heading: "PCPNDT Registration",
          items: [
            "Assessment of PCPNDT registration requirements for the specific facility type",
            "Preparation of the Form F registration application and supporting documentation",
            "Liaison with the Appropriate Authority for registration",
            "Support during the inspection and documentation review process",
            "Registration certificate receipt and filing",
            "Guidance on ongoing PCPNDT compliance documentation requirements",
          ],
        },
        {
          heading: "Pharmacy, Blood Bank, Lift, Electrical & Utility Approvals",
          items: [
            "Pharmacy licence application and liaison with the State Drug Control Authority",
            "Blood bank licence application and CDSCO inspection support",
            "Electrical installation completion certificate coordination",
            "Lift inspection and approval coordination with the state lift inspectorate",
            "DG set installation approval coordination",
            "Water supply and sewerage connection applications for healthcare occupancy",
            "Pollution Control Board NOC, biomedical waste management documentation and liaison",
          ],
        },
      ],
    },
    extra: {
      heading: "Why Approval Sequencing Matters",
      body: [
        "One of the most common and most costly mistakes in healthcare licensing is applying for approvals in the wrong sequence. Many licences have dependencies on other approvals. Applying for a licence before its dependency approval is in place results in automatic rejection, wasted fees, and significant delays.",
        "ARCHORA prepares a structured approval roadmap for every project that maps every required approval, its dependencies, its timeline, and its documentation requirements. This roadmap ensures that every application is made at the right time, with the right documentation, in the correct sequence.",
      ],
    },
    process: [
      { step: "01", title: "Approvals Audit and Roadmap", desc: "We begin with a comprehensive audit of every licence and approval required for your specific facility type and location. We then prepare a structured approvals roadmap covering every approval, its dependencies, its timeline, and its documentation requirements." },
      { step: "02", title: "Documentation Preparation", desc: "Our team prepares every application package in full, including all drawings, certificates, specifications, and supporting documents required by each regulatory authority. Every document meets the specific formatting and content requirements of the relevant authority." },
      { step: "03", title: "Application Submission and Tracking", desc: "We submit every application to the relevant authority and track its progress systematically. We follow up proactively at every stage to prevent delays caused by administrative inaction or missing information." },
      { step: "04", title: "Inspection Preparation and Support", desc: "Before every regulatory inspection, we conduct a pre-inspection readiness assessment to identify and resolve any gaps that could cause the inspection to fail. We are present and available to support during every inspection." },
      { step: "05", title: "Query Resolution and Resubmission", desc: "If any authority raises queries, objections, or requests for additional information, we prepare and submit the required responses promptly. If any application requires resubmission, we manage the complete resubmission process." },
      { step: "06", title: "Certificate Management and Filing", desc: "Every licence and approval certificate received is documented, filed, and provided to the client with guidance on renewal timelines and ongoing compliance requirements." },
    ],
    whyUs: {
      heading: "Why Choose ARCHORA for Hospital Licensing and Approvals?",
      points: [
        "We have managed the complete approvals process for healthcare projects across India, we know the sequences, the dependencies, and the documentation requirements for every major regulatory body",
        "Our pre-inspection readiness assessments identify and resolve compliance gaps before inspections, not after",
        "Every application we prepare meets the specific formatting and content requirements of the relevant authority, reducing rejection rates dramatically",
        "We track every application proactively and follow up systematically to prevent delays caused by administrative inaction",
        "We cover AERB, PCPNDT, Fire NOC, Pollution Control, clinical establishment registration, and all other healthcare approvals under one engagement",
      ],
    },
    whoNeeds: {
      heading: "Who Needs Hospital Licensing and Approvals Support?",
      bullets: [
        "Doctors and promoters opening a new hospital, nursing home, or clinic for the first time",
        "Healthcare investors building a new facility and unfamiliar with the Indian regulatory process",
        "Hospital groups opening new branches in states where they do not have existing regulatory experience",
        "Medical and nursing colleges planning a new campus and needing NMC or INC recognition",
        "Diagnostic centres adding new modalities that require fresh regulatory approvals",
        "Existing facilities that need to renew or upgrade their licences",
        "Any promoter who wants expert management of the approvals process rather than navigating it independently",
      ],
    },
    faqs: [
      { q: "How long does it take to get all the licences for a new hospital in India?", a: "The timeline for obtaining all required licences for a new hospital in India varies significantly by state, facility type, and the efficiency of the relevant regulatory authorities. In general, a new hospital project should plan for a licensing timeline of three to nine months from the point when the building is ready for inspection. Some approvals such as AERB licences for radiation equipment can take longer. ARCHORA prepares a project-specific approval timeline at the start of the engagement so promoters can plan accordingly." },
      { q: "Can ARCHORA manage the licensing process for a healthcare facility in any state in India?", a: "Yes. ARCHORA provides hospital licensing and approvals support across India. While regulatory requirements vary by state, our team is familiar with the licensing frameworks, documentation requirements, and inspection procedures of the major states where we operate. For projects in states where we do not have an established presence, we conduct a thorough pre-engagement regulatory research exercise to ensure we understand the specific requirements before we begin." },
      { q: "What happens if a regulatory inspection fails?", a: "If a regulatory inspection results in a failure or a list of deficiencies, ARCHORA prepares a structured corrective action plan addressing every deficiency identified. We coordinate the required infrastructure corrections, prepare the resubmission documentation, and manage the re-inspection process. Our pre-inspection readiness assessments are specifically designed to identify and resolve potential inspection failures before they occur." },
      { q: "Is AERB approval required even for a basic X-ray machine?", a: "Yes. Any ionising radiation equipment, including basic diagnostic X-ray machines, requires AERB approval before it can be installed or used. The AERB approval process covers the room design and shielding, equipment installation, and operational licence. Operating ionising radiation equipment without valid AERB approval is a criminal offence under the Atomic Energy Act 1962." },
      { q: "What documents are typically required for clinical establishment registration?", a: "The documentation requirements for clinical establishment registration vary by state but typically include the completed application form, proof of ownership or lease of the premises, layout drawings of the facility, list of medical and paramedical staff with qualifications, list of medical equipment, fire NOC, pollution control NOC, and in some states, the building completion certificate. ARCHORA prepares the complete documentation package for every application." },
      { q: "Can ARCHORA help with licence renewals for an existing facility?", a: "Yes. ARCHORA provides licence renewal support for existing healthcare facilities, including preparation of renewal applications, coordination of renewal inspections, and management of any compliance updates required at renewal." },
      { q: "Does ARCHORA help with NABH accreditation as well as licensing?", a: "ARCHORA's regulatory compliance service covers the infrastructure and design aspects of NABH accreditation. The operational and clinical process aspects of NABH accreditation preparation are handled by dedicated NABH consultants. We work collaboratively with NABH consultants on client projects and can recommend experienced NABH consultants where required." },
    ],
    relatedServices: [
      { title: "Feasibility Studies & Detailed Project Reports", slug: "feasibility-studies" },
      { title: "Healthcare Architecture & Clinical Space Planning", slug: "healthcare-architecture" },
      { title: "Regulatory Compliance & Accreditation-Ready Design", slug: "regulatory-compliance" },
      { title: "MEP Engineering for Healthcare", slug: "mep-engineering" },
      { title: "Project Management & Commissioning", slug: "project-management" },
    ],
    bottomCTA: {
      heading: "Ready to Open Your Healthcare Facility Without Licensing Delays?",
      body: "Talk to ARCHORA before you begin the approvals process. We will map every licence you need, prepare every application correctly, and manage the entire process so you can focus on building your healthcare business.",
    },
  },
  {
    id: "05",
    slug: "structural-design",
    icon: <Wrench size={24} />,
    color: "#7eb8f7",
    pageTitle: "Structural Design and Engineering for Hospitals and Healthcare Facilities in India | ARCHORA",
    metaDesc: "ARCHORA provides specialist structural design and engineering for hospitals, medical colleges, and diagnostic centres across India. Heavy equipment loads, seismic compliance, and healthcare-specific structural requirements handled by experts.",
    heroH1: "Structural Design and Engineering for Hospitals and Healthcare Facilities in India",
    heroSub: "A hospital structure carries demands that no standard commercial building faces. Heavy medical equipment, vibration-sensitive clinical environments, 24x7 operational loads, and life-safety structural requirements all demand a structural engineer who understands healthcare from the ground up. ARCHORA delivers structural design built specifically for healthcare.",
    problem: {
      heading: "Why Standard Structural Engineering Falls Short in Healthcare",
      body: [
        "Most structural engineers in India are highly competent at designing commercial buildings, residential towers, and industrial structures. But healthcare buildings are a fundamentally different structural challenge, and the consequences of getting the structure wrong in a healthcare facility are severe.",
        "A 3-tesla MRI machine weighing over 6,000 kilograms requires a vibration-isolated slab, a shielded room, and a quench pipe routed through the building envelope. A CT scanner requires a reinforced floor capable of bearing point loads far exceeding standard commercial floor specifications. A linear accelerator in a cancer centre requires a reinforced concrete vault with walls up to two metres thick. A rooftop helipad requires a dedicated structural system capable of bearing helicopter landing loads. A modular OT requires a slab-to-slab height that accommodates laminar airflow ceiling systems, pendant arms, and medical gas distribution above a false ceiling.",
        "A structural engineer who designs these elements using standard commercial assumptions will produce a structure that either fails to accommodate the clinical equipment or requires expensive and disruptive structural modifications after construction has begun.",
        "ARCHORA's structural design service is built specifically around the demands of healthcare buildings.",
      ],
    },
    explainer: {
      heading: "What Makes Structural Design for Healthcare Facilities Different?",
      body: [
        "Healthcare buildings place unique structural demands on every element of the building frame, foundation, and floor system. These demands arise from four primary sources: heavy and concentrated equipment loads from MRI machines, CT scanners, cath lab tables, and surgical robots; vibration sensitivity requirements for diagnostic and surgical environments; greater slab-to-slab heights needed to accommodate extensive MEP services and medical gas pipelines; and life-safety seismic design requirements where hospitals are classified as essential facilities under Indian seismic design standards.",
        "Under IS 1893, hospitals carry an importance factor of 1.5, meaning seismic design forces are 50% higher than for a standard commercial building. This distinction is critical for patient safety and is one that many general structural engineers overlook.",
      ],
    },
    coverage: {
      heading: "What ARCHORA Covers in Structural Design for Healthcare Facilities",
      sections: [
        {
          heading: "Foundation Design",
          items: [
            "Geotechnical investigation coordination and soil report interpretation",
            "Foundation type selection and design for healthcare loading conditions",
            "Pile foundation design for sites with poor bearing capacity",
            "Raft foundation design for large hospital footprints",
            "Foundation design for basement car parks and below-grade service areas",
            "Special foundation provisions for heavy equipment rooms including MRI and CT scanner rooms",
          ],
        },
        {
          heading: "Structural Frame Design",
          items: [
            "Reinforced concrete frame design for all healthcare facility types",
            "Steel frame and composite structure design where applicable",
            "Post-tensioned slab design for long spans in clinical areas",
            "Structural system selection optimised for healthcare space planning flexibility",
            "Transfer structure design for large clinical spaces requiring column-free areas",
            "Roof structure design including rooftop plant room and helipad structures",
          ],
        },
        {
          heading: "Floor Slab Design for Medical Equipment Loads",
          items: [
            "Room-by-room equipment load schedule preparation in coordination with the medical equipment planner",
            "Reinforced slab design for heavy equipment point loads",
            "Vibration-isolated slab design for MRI and other vibration-sensitive equipment",
            "Slab penetration planning for medical gas pipelines, drainage, and MEP services",
            "Floor-to-floor height optimisation to accommodate MEP services and clinical ceiling requirements",
            "Slab deflection control design for precision clinical environments",
          ],
        },
        {
          heading: "Seismic Design for Healthcare Occupancy",
          items: [
            "Seismic zone classification and importance factor 1.5 application for healthcare essential facilities",
            "Lateral load analysis and seismic force calculation",
            "Ductile detailing of all structural elements as per IS 13920",
            "Structural irregularity assessment and correction",
            "Non-structural element seismic restraint recommendations for critical medical equipment",
            "Seismic performance target verification for essential facility classification",
          ],
        },
        {
          heading: "Structural Design for Specialist Healthcare Spaces",
          items: [
            "Radiation vault design for linear accelerators and nuclear medicine facilities",
            "MRI room structural design including vibration isolation and quench pipe accommodation",
            "Modular OT structural provisions including slab-to-slab height and ceiling load capacity",
            "Rooftop helipad structural design",
            "Clean room and controlled environment structural provisions",
            "Basement and underground facility structural design",
          ],
        },
        {
          heading: "Expansion, Renovation and Construction Stage Services",
          items: [
            "Structural assessment of existing buildings for healthcare conversion",
            "Load capacity assessment for new medical equipment in existing structures",
            "Structural strengthening design for buildings requiring additional floors or loads",
            "Structural design for horizontal extensions and new wings",
            "Demolition engineering for selective structural modifications",
            "Construction stage site visits, structural inspections, and completion certificates",
          ],
        },
      ],
    },
    extra: {
      heading: "Healthcare Facilities We Design Structurally",
      tableHead: ["Facility Type", "Key Structural Considerations"],
      tableRows: [
        ["Multi-Speciality Hospital", "Heavy equipment loads, seismic essential facility design, slab-to-slab heights"],
        ["Super-Speciality Hospital", "Linear accelerator vaults, cath lab loads, robotic surgery floor isolation"],
        ["Nursing Home", "Compact structural efficiency, equipment load accommodation"],
        ["Medical College Hospital", "Large span teaching spaces, auditorium structures, multi-wing phasing"],
        ["Diagnostic Centre", "MRI vibration isolation, CT load design, AERB vault requirements"],
        ["Modular OT Complex", "Slab-to-slab height, ceiling load capacity, cleanroom provisions"],
        ["ICU Complex", "Equipment load design, floor flatness for critical care beds"],
        ["Blood Bank and Laboratory", "Vibration control, equipment load provisions, cleanroom structural provisions"],
        ["Rooftop Helipad", "Helicopter landing load design, rooftop structural system"],
        ["Healthcare Township", "Campus master structure planning, phased development structural strategy"],
      ],
    },
    process: [
      { step: "01", title: "Clinical and Equipment Brief Review", desc: "Before any structural calculations begin, our structural team reviews the clinical brief, the architectural layout, and the medical equipment schedule in detail. Every structural decision is informed by a complete understanding of what the building needs to support and accommodate." },
      { step: "02", title: "Geotechnical Investigation Coordination", desc: "We coordinate the geotechnical investigation for the site and review the soil investigation report to inform foundation design. For complex sites, we specify the scope of investigation required to obtain the data needed for safe and economic foundation design." },
      { step: "03", title: "Structural System Selection", desc: "We evaluate and recommend the structural system that best meets the clinical, spatial, equipment, and regulatory requirements of the specific project. The structural system selection balances clinical performance, construction programme, cost, and future adaptability." },
      { step: "04", title: "Structural Analysis and Design", desc: "We conduct a complete structural analysis of the building under all applicable load combinations including dead loads, live loads, equipment loads, wind loads, and seismic loads. All structural elements are designed to the applicable Indian Standards with the correct importance factors for healthcare essential facility classification." },
      { step: "05", title: "Drawing and Documentation Package", desc: "We prepare a complete structural drawing package including foundation drawings, frame drawings, slab and beam drawings, reinforcement details, and all structural specifications. The drawing package is coordinated with architectural and MEP drawings to ensure all services and equipment can be installed as designed." },
      { step: "06", title: "Construction Stage Support", desc: "Our structural team provides active support throughout the construction stage, including site inspections at critical structural stages, response to site queries, review of contractor submissions, and preparation of completion certificates." },
    ],
    whyUs: {
      heading: "Why Choose ARCHORA for Structural Design of Your Healthcare Facility?",
      points: [
        "Every structural decision ARCHORA makes is informed by a complete understanding of the clinical and equipment requirements of the space it supports, the structure is the physical foundation of the clinical environment",
        "Because ARCHORA provides architecture, structural, and MEP engineering under one roof, our structural design is fully coordinated with the architectural layout and MEP services from the beginning, no coordination clashes, no slab-to-slab surprises",
        "Our structural team has specific experience with MRI vibration isolation, radiation vault design, rooftop helipad structures, and seismic essential facility design",
        "Every ARCHORA structural design applies the correct seismic importance factor of 1.5 for healthcare essential facilities as defined by IS 1893, a distinction many general structural engineers overlook",
      ],
    },
    whoNeeds: {
      heading: "Who Needs Healthcare Structural Design?",
      bullets: [
        "All healthcare construction projects, new builds, expansions, and adaptive reuse of existing structures",
        "Promoters installing heavy medical equipment including MRI, CT, or linear accelerators",
        "Hospital projects in seismic zones requiring essential facility classification",
        "Facilities planning rooftop helipads or radiation vaults",
        "Existing buildings being converted to healthcare use requiring structural assessment",
        "Multi-phase hospital campuses requiring a structural strategy for phased development",
      ],
    },
    faqs: [
      { q: "Why do hospitals need specialist structural engineers?", a: "Hospitals have structural requirements that are fundamentally different from commercial or residential buildings. Heavy medical equipment loads, vibration-sensitive clinical environments, life-safety seismic requirements, and complex MEP infrastructure all demand structural engineering expertise that goes well beyond standard commercial practice. A general structural engineer without healthcare experience will typically design a structure that either cannot accommodate the clinical equipment or is structurally inadequate for the life-safety requirements of a healthcare essential facility." },
      { q: "What is a vibration-isolated slab and when is it required?", a: "A vibration-isolated slab is a structural floor slab designed and detailed to prevent the transmission of vibration from the surrounding structure to a vibration-sensitive piece of equipment. It is required for MRI scanners, high-precision laboratory equipment, and in some cases robotic surgery systems. Without a correctly designed vibration-isolated slab, sensitive medical equipment will not perform to its specified accuracy." },
      { q: "What is the seismic importance factor for hospitals in India?", a: "Under IS 1893, hospitals are classified as essential facilities with an importance factor of 1.5. This means that the seismic design forces applied to a hospital structure are 50 percent higher than for a standard commercial building of the same size and location. This higher importance factor is mandated because hospitals must remain operational during and after a seismic event to provide emergency medical services. Many general structural engineers working on their first healthcare project apply the standard commercial importance factor of 1.0, which results in a structurally underdesigned building." },
      { q: "How are heavy medical equipment loads accounted for in the structural design?", a: "Heavy medical equipment loads are accounted for in the structural design through a process called equipment load scheduling. Before the structural design begins, we prepare a room-by-room schedule of every significant piece of medical equipment with its weight, footprint, and load distribution. These loads are applied to the structural model in the appropriate locations, and the floor slab, beams, and columns are designed accordingly. Equipment load scheduling must be done before the structural design is finalised, not after." },
      { q: "Can ARCHORA assess an existing building for conversion to a healthcare facility?", a: "Yes. ARCHORA provides structural assessments of existing buildings being considered for conversion to healthcare use. We assess the existing structure against the load requirements of the proposed clinical use, identify any structural deficiencies, and design the structural strengthening required to bring the building to the standard needed for healthcare occupancy." },
      { q: "Does ARCHORA design rooftop helipads for hospitals?", a: "Yes. ARCHORA designs rooftop helipads for hospitals as part of the structural design service. A rooftop helipad requires a dedicated structural system capable of bearing the dynamic landing loads of the applicable helicopter type, in addition to the maintenance and personnel loads. The structural design must also account for the rooftop wind environment and the interface with the building's existing roof structure." },
    ],
    relatedServices: [
      { title: "Feasibility Studies & Detailed Project Reports", slug: "feasibility-studies" },
      { title: "Healthcare Architecture & Clinical Space Planning", slug: "healthcare-architecture" },
      { title: "Regulatory Compliance & Accreditation-Ready Design", slug: "regulatory-compliance" },
      { title: "MEP Engineering for Healthcare", slug: "mep-engineering" },
      { title: "Modular OT & ICU Infrastructure", slug: "modular-ot-icu" },
      { title: "Turnkey Civil & Interior Execution", slug: "turnkey-execution" },
      { title: "Project Management & Commissioning", slug: "project-management" },
    ],
    bottomCTA: {
      heading: "Ready to Build a Healthcare Facility on a Structure That Will Never Let You Down?",
      body: "Talk to ARCHORA before your structural design begins. We will ensure that your building structure is designed for every load, every clinical requirement, and every life-safety standard your healthcare facility demands.",
    },
  },
  {
    id: "06",
    slug: "mep-engineering",
    icon: <Zap size={24} />,
    color: "#7eb8f7",
    pageTitle: "MEP Engineering Services for Hospitals and Healthcare Facilities in India | ARCHORA",
    metaDesc: "ARCHORA provides specialist MEP engineering for hospitals, OTs, ICUs, and healthcare facilities across India. Medical gas, HVAC, electrical, plumbing, and fire protection systems designed for clinical performance and regulatory compliance.",
    heroH1: "MEP Engineering Services for Hospitals and Healthcare Facilities in India",
    heroSub: "The mechanical, electrical, and plumbing systems in a hospital are not building services. They are life-support infrastructure. Every pipe, every duct, every wire, and every medical gas outlet in a healthcare facility has a direct consequence for patient safety, clinical performance, and regulatory compliance. ARCHORA engineers these systems with the precision and rigour that healthcare demands.",
    problem: {
      heading: "Why Standard MEP Engineering Fails in Healthcare Buildings",
      body: [
        "The gap between standard commercial MEP engineering and healthcare MEP engineering is wider than most promoters realise, and the consequences of that gap are severe.",
        "A general MEP engineer designing their first hospital will specify an HVAC system based on comfort cooling principles. But a hospital HVAC system is not a comfort system. It is an infection control system. The air change rates, pressure differentials, filtration standards, and humidity control requirements in a clinical HVAC system are dictated by patient safety, not thermal comfort. An OT supplied with a comfort HVAC system will fail its NABH inspection. An ICU without correct positive or negative pressure zoning creates a direct infection risk to critically ill patients.",
        "A general MEP engineer will not have designed a medical gas pipeline system. They will not know the pressure requirements, the material specifications, the zone valve locations, the alarm panel requirements, or the terminal outlet specifications for oxygen, nitrous oxide, medical air, surgical air, and medical vacuum systems. A medical gas system designed without specialist knowledge is not just non-compliant. It is dangerous.",
        "ARCHORA's MEP engineering service is designed exclusively for healthcare. Every system we design is clinically informed, regulatorily compliant, and built for the life-safety demands of a healthcare environment.",
      ],
    },
    explainer: {
      heading: "MEP Systems ARCHORA Designs for Healthcare Facilities",
      body: [
        "ARCHORA covers the full MEP scope for healthcare: clinical HVAC with infection-control air systems, medical gas pipeline systems for oxygen, nitrous oxide, medical air, surgical air, carbon dioxide, nitrogen, and vacuum, healthcare-grade electrical engineering including isolated power systems and critical circuit design, plumbing and drainage for infection control and clinical waste, fire protection engineering, and Building Management Systems for centralised monitoring.",
        "Each system is designed by engineers who work exclusively on healthcare projects, not generalists applying commercial principles to a clinical environment.",
      ],
    },
    coverage: {
      heading: "MEP Systems ARCHORA Designs for Healthcare Facilities",
      sections: [
        {
          heading: "HVAC, Clinical Heating, Ventilation, and Air Conditioning",
          items: [
            "Air change rate design for every clinical area as per NABH and international clinical standards",
            "Positive pressure design for OTs, clean rooms, sterile processing areas, and immunocompromised patient rooms",
            "Negative pressure design for isolation rooms, infectious disease wards, and dirty utility areas",
            "HEPA filtration design for OTs, ICUs, NICU, and CSSD",
            "Temperature and humidity control design for all clinical areas",
            "Laminar airflow system design for OTs and cleanroom environments",
            "Energy recovery system design for large hospital HVAC plants",
            "Commissioning and validation protocol preparation for clinical HVAC systems",
          ],
        },
        {
          heading: "Medical Gas Pipeline Systems",
          items: [
            "Medical oxygen pipeline design from bulk liquid oxygen storage or cylinder manifold to all clinical areas",
            "Nitrous oxide, medical air, surgical air, carbon dioxide, nitrogen, and medical vacuum pipeline design",
            "Zone valve box location and design for all clinical zones",
            "Area alarm panel and master alarm panel design",
            "Pressure and flow calculations for all pipeline branches",
            "Terminal outlet type selection and specification for each clinical area",
            "Source equipment sizing including bulk oxygen tanks, compressors, and vacuum pumps",
            "HTM 02-01 and SHTM 02-01 compliant design documentation",
          ],
        },
        {
          heading: "Electrical Engineering for Healthcare",
          items: [
            "HT and LT electrical supply design and substation sizing",
            "Essential, critical, and normal services electrical distribution design",
            "Medical grade isolated power system design for wet clinical locations including OTs and ICUs",
            "UPS system design and battery backup duration specification for critical clinical areas",
            "DG set sizing and automatic changeover system design",
            "Medical grade earthing and equipotential bonding design",
            "Nurse call system and clinical communication system design",
            "Power quality analysis and harmonic mitigation design",
          ],
        },
        {
          heading: "Plumbing and Drainage Engineering for Healthcare",
          items: [
            "Domestic cold and hot water distribution design including Legionella protection",
            "Sterile water and RO water system design for CSSD, laboratory, and dialysis",
            "Biomedical waste drainage system design and segregation",
            "Sewage treatment plant design and effluent disposal planning",
            "Medical equipment drainage connections including autoclave and endoscope washing machine drainage",
            "Backflow prevention and cross-connection control design",
          ],
        },
        {
          heading: "Fire Protection Engineering for Healthcare",
          items: [
            "Automatic sprinkler system design for all areas of the hospital",
            "Wet riser and hydrant system design",
            "Clean agent fire suppression system design for server rooms, electrical rooms, and MRI rooms",
            "Addressable fire detection and alarm system design",
            "Smoke control and pressurisation system design for escape staircases and lobbies",
            "Fire water storage tank sizing and fire pump set design",
            "Fire NOC documentation support",
          ],
        },
        {
          heading: "Building Management System for Healthcare",
          items: [
            "BMS architecture design for centralised monitoring and control",
            "HVAC system integration including AHU control, chiller plant control, and zone temperature monitoring",
            "Medical gas system alarm monitoring integration",
            "Electrical system monitoring including UPS status, DG set status, and essential services monitoring",
            "Energy metering and consumption monitoring integration",
            "Remote monitoring and alert system design",
            "Validation and commissioning protocol preparation for BMS systems",
          ],
        },
      ],
    },
    extra: {
      heading: "Clinical Areas With Specialist MEP Requirements",
      tableHead: ["Clinical Area", "Key MEP Requirements"],
      tableRows: [
        ["Operating Theatre", "Laminar airflow HVAC, positive pressure, surgical gas outlets, isolated power system, OT lighting"],
        ["ICU and CICU", "Precise temperature and humidity control, medical gas at every bed, isolated power, nurse call integration"],
        ["NICU", "Tight temperature and humidity control, oxygen and medical air at every cot, minimal vibration and noise"],
        ["CSSD", "Steam steriliser connections, RO water, high-temperature drainage, negative pressure exhaust ventilation"],
        ["Pharmacy", "Controlled temperature and humidity, clean air supply, security power for refrigeration"],
        ["Blood Bank", "Precise temperature control, security power for storage equipment, clean air supply"],
        ["Laboratory and Pathology", "Fume hood exhaust ventilation, specialist drainage, clean water supply, vibration control"],
        ["Radiology and Imaging", "Radiation room HVAC, AERB-compliant electrical, equipment cooling, controlled access power"],
        ["MRI Suite", "RF shielded power supply, non-magnetic HVAC and plumbing, quench pipe ventilation"],
        ["Renal Dialysis", "RO water distribution, drain connections at every station, medical grade electrical supply"],
      ],
    },
    process: [
      { step: "01", title: "Clinical Brief and Equipment Schedule Review", desc: "Every MEP design begins with a thorough review of the clinical brief, the room data sheets, and the medical equipment schedule. The MEP systems must be designed around the clinical requirements of the space, not the other way around." },
      { step: "02", title: "Load Calculations and System Sizing", desc: "We perform detailed load calculations for all MEP systems including HVAC cooling and heating loads, electrical load schedules, medical gas flow and pressure calculations, and plumbing demand calculations. System sizing is based on clinical load data, not generic rules of thumb." },
      { step: "03", title: "System Design and Routing", desc: "We develop the full system design for each MEP discipline, including equipment selection, distribution routing, riser planning, and plant room layouts. All routing is coordinated with the structural and architectural drawings to ensure clash-free installation." },
      { step: "04", title: "Coordination and Clash Detection", desc: "Our MEP team conducts a full coordination exercise with the architectural and structural drawings to identify and resolve all clashes before construction begins. For complex projects, we use BIM-based coordination to achieve a fully clash-free MEP design." },
      { step: "05", title: "Construction Drawing Package and Tender Support", desc: "We prepare a complete MEP construction drawing package for all disciplines, evaluate contractor submissions, and provide technical support during contractor selection to ensure only technically qualified contractors with healthcare MEP experience are selected." },
      { step: "06", title: "Construction Stage Supervision and Commissioning", desc: "Our MEP team provides active construction stage supervision to ensure that all systems are installed to the design specification. We prepare commissioning and testing protocols for all clinical MEP systems and witness commissioning to confirm that every system meets its design performance criteria before handover." },
    ],
    whyUs: {
      heading: "Why Choose ARCHORA for MEP Engineering of Your Healthcare Facility?",
      points: [
        "Every MEP engineer at ARCHORA works exclusively on healthcare projects, no offices, shopping centres, or residential buildings. Our entire knowledge base is built around clinical, regulatory, and life-safety requirements",
        "Our MEP designs are produced by engineers who understand why an OT needs 25 air changes per hour, why an ICU needs medical grade isolated power, and why a medical gas system needs a zone valve at every corridor junction",
        "Because ARCHORA provides architecture, structural, and MEP engineering under one roof, our MEP design is fully coordinated with the building architecture and structure from the beginning, no coordination surprises during construction",
        "Every MEP system ARCHORA designs is specified and documented to meet NABH requirements, AERB requirements, fire safety requirements, and all other applicable regulatory standards",
      ],
    },
    whoNeeds: {
      heading: "Who Needs Healthcare MEP Engineering?",
      bullets: [
        "Every hospital and healthcare facility, new construction, renovation, or MEP upgrade of existing facilities",
        "Facilities building or upgrading OTs and ICUs requiring clinical HVAC and isolated power",
        "Any facility installing medical gas systems",
        "Healthcare projects seeking NABH accreditation where MEP compliance is mandatory",
        "Existing facilities whose MEP systems are failing regulatory inspections",
        "Hospital campuses requiring integrated BMS for operational efficiency",
      ],
    },
    faqs: [
      { q: "What is the difference between standard HVAC and clinical HVAC for hospitals?", a: "Standard commercial HVAC is designed for thermal comfort. Clinical HVAC is designed for infection control and patient safety. The difference lies in the air change rates, the filtration standards, the pressure relationships between spaces, the temperature and humidity control precision, and the system redundancy requirements. An OT requires a minimum of 20 to 25 air changes per hour with HEPA filtration and positive pressure. A standard office air conditioning system provides 6 to 10 air changes per hour with standard filtration. These are fundamentally different systems requiring fundamentally different engineering expertise." },
      { q: "What medical gases are required in a typical hospital?", a: "A typical multi-speciality hospital requires oxygen, medical air, surgical air, nitrous oxide, carbon dioxide, nitrogen, and medical vacuum as a minimum. Each gas has specific pipeline pressure requirements, material specifications, and terminal outlet types. The pipeline design, source equipment sizing, and zone valve layout for each gas must be calculated and specified by a medical gas systems engineer with specific healthcare experience." },
      { q: "Why does an OT need an isolated power system?", a: "An isolated power system in an OT prevents a single electrical fault from causing a complete loss of power to the operating room during a surgical procedure. In a standard earthed electrical system, a single line-to-earth fault will trip the circuit breaker and cut power to the affected circuit. In a medical grade isolated power system, a single line-to-earth fault causes an alarm but does not interrupt the power supply, giving the surgical team time to complete the procedure safely before the fault is investigated. This system is mandatory in wet clinical locations including OTs and ICUs under IS 1554 and NABH standards." },
      { q: "How long does MEP design for a hospital take?", a: "The MEP design timeline depends on the scale and complexity of the facility. MEP design for a small clinic or nursing home can be completed in four to six weeks. A mid-size hospital MEP design typically takes two to four months. A large multi-speciality hospital MEP design can take four to eight months. ARCHORA provides a specific MEP design timeline based on the project scope at the time of briefing." },
      { q: "What is a BMS and does every hospital need one?", a: "A BMS, or Building Management System, is a centralised control and monitoring system for all major building services including HVAC, electrical, and medical gas alarms. For small clinics and nursing homes, a full BMS may not be necessary. For hospitals of 50 beds and above, a BMS significantly improves operational efficiency, reduces energy consumption, and provides real-time monitoring of critical systems that is essential for patient safety and NABH compliance." },
      { q: "Does ARCHORA provide MEP services for modular OTs and ICUs as well?", a: "Yes. ARCHORA provides integrated MEP engineering for modular OTs and ICUs as part of our modular healthcare infrastructure service. The MEP systems for a modular OT are particularly demanding, requiring laminar airflow HVAC, medical gas at every position, isolated power, specialist OT lighting, and BMS integration, all within the tight coordination constraints of a modular build." },
    ],
    relatedServices: [
      { title: "Feasibility Studies & Detailed Project Reports", slug: "feasibility-studies" },
      { title: "Healthcare Architecture & Clinical Space Planning", slug: "healthcare-architecture" },
      { title: "Regulatory Compliance & Accreditation-Ready Design", slug: "regulatory-compliance" },
      { title: "Structural Design for Healthcare Facilities", slug: "structural-design" },
      { title: "Modular OT & ICU Infrastructure", slug: "modular-ot-icu" },
      { title: "Turnkey Civil & Interior Execution", slug: "turnkey-execution" },
      { title: "Project Management & Commissioning", slug: "project-management" },
    ],
    bottomCTA: {
      heading: "Ready to Engineer MEP Systems That Your Healthcare Facility Can Depend On?",
      body: "Talk to ARCHORA today. We will design every mechanical, electrical, plumbing, and medical gas system in your facility to the precise clinical, regulatory, and life-safety standards that your patients, your staff, and your accreditation body require.",
    },
  },
  {
    id: "07",
    slug: "modular-ot-icu",
    icon: <Activity size={24} />,
    color: "#7eb8f7",
    pageTitle: "Modular Operation Theatre and ICU Setup Services in India | ARCHORA",
    metaDesc: "ARCHORA designs and installs modular OTs and ICUs for hospitals and surgical centres across India. Laminar airflow, medical gas, isolated power, NABH compliant, and fully turnkey. Talk to our team today.",
    heroH1: "Modular Operation Theatre and ICU Setup Services in India",
    heroSub: "An operating theatre and an intensive care unit are the two most critical clinical environments in any hospital. Every design decision, every material choice, every engineering system, and every installation detail in these spaces has a direct consequence for patient safety and surgical outcomes. ARCHORA designs, engineers, and delivers modular OTs and ICUs that meet the highest clinical and regulatory standards in India.",
    problem: {
      heading: "Why Most OTs and ICUs in India Underperform Clinically",
      body: [
        "The operating theatre and the ICU are the revenue engine and the clinical reputation of any hospital. A poorly designed OT loses surgical time, increases infection risk, frustrates surgeons, and creates NABH compliance failures. A poorly designed ICU compromises patient monitoring, increases nursing workload, elevates cross-infection risk, and reduces the quality of critical care delivery.",
        "Yet the majority of OTs and ICUs built in Indian hospitals today are designed and installed by contractors who treat them as standard civil construction projects. OTs built without laminar airflow systems, or with systems that are incorrectly sized or improperly commissioned, do not achieve the air cleanliness standards required for clean surgical fields. OTs built without medical grade isolated power systems are non-compliant with NABH standards and present a genuine patient safety risk.",
        "ICUs built without correct bed spacing cannot accommodate the equipment a critically ill patient requires at the bedside. ICUs built without correct medical gas provision at every bed create a nursing hazard every time a ventilated patient needs to be repositioned.",
        "These are not aesthetic failures. They are clinical failures. And they are almost always the result of commissioning an OT or ICU from a contractor who does not understand the clinical environment they are being asked to build. ARCHORA builds OTs and ICUs from a clinical brief, not a construction brief.",
      ],
    },
    explainer: {
      heading: "What Is a Modular Operation Theatre?",
      body: [
        "A modular operation theatre is an OT built using a system of prefabricated wall, ceiling, and floor panels that are installed within a structural shell to create a clinically controlled, infection-resistant, and fully integrated surgical environment. The modular panel system replaces traditional plastered and painted walls and ceilings with seamless, flush, non-porous panels that can be fully decontaminated between surgical cases.",
        "A properly designed and installed modular OT delivers: a clinically controlled air environment with correct air change rates, filtration, temperature, humidity, and positive pressure; a fully integrated medical gas supply at every surgical position; a medical grade isolated power system; a seamless non-porous surface environment that can be fully disinfected; a fully integrated surgical lighting system; and a pendant system that places anaesthetic and surgical equipment in correct ergonomic positions. A modular OT is not a luxury. It is the minimum standard for a hospital that takes surgical outcomes seriously.",
      ],
    },
    coverage: {
      heading: "What ARCHORA Covers in Modular OT and ICU Design and Installation",
      sections: [
        {
          heading: "OT Suite Planning and Layout Design",
          items: [
            "OT suite configuration including OT room, scrub area, anaesthesia room, instrument trolley bay, and clean and dirty corridors",
            "OT size optimisation for the specific surgical specialities and equipment",
            "Clean corridor and dirty corridor separation design",
            "Scrub station design and location",
            "Post-anaesthesia care unit design adjacent to OT suite",
            "Staff changing room, rest area, and lounge design",
          ],
        },
        {
          heading: "Modular Wall, Ceiling, and Floor Panel System",
          items: [
            "Flush, seamless, non-porous panel surfaces for full decontamination capability",
            "Radius coving at all wall-floor and wall-ceiling junctions to eliminate contamination traps",
            "Integrated service outlets flush-mounted within the wall panel system",
            "Lead-lined panel specification where radiation protection is required in hybrid OTs",
            "Modular ceiling panel system with integrated lighting and ventilation terminals",
            "Epoxy or PVC seamless flooring specification with integral coving",
            "Automated hermetically sealed door systems for OT entry",
          ],
        },
        {
          heading: "Laminar Airflow and Clinical HVAC System",
          items: [
            "Laminar airflow ceiling system design and sizing for the specific OT room size",
            "HEPA filtration specification for all supply air to the OT",
            "Air change rate design as per NABH and international standards",
            "Positive pressure design for OT relative to surrounding spaces",
            "Temperature control between 18 and 24 degrees Celsius as per surgical requirements",
            "Humidity control between 50 and 60 percent relative humidity",
            "Commissioning and validation protocol including air change rate measurement, particle count testing, and pressure differential verification",
          ],
        },
        {
          heading: "Medical Gas System for OT",
          items: [
            "Oxygen, nitrous oxide, medical air, surgical air, carbon dioxide, nitrogen, and medical vacuum outlet design and location",
            "Anaesthetic gas scavenging outlet design and location",
            "Zone valve box and area alarm panel location and specification",
            "Pipeline pressure and flow calculations for all gases in the OT zone",
            "Medical gas installation to HTM 02-01 and SHTM 02-01 standards",
          ],
        },
        {
          heading: "Isolated Power, OT Lighting, and Pendant System",
          items: [
            "Medical grade isolated power system design with line isolation monitor and alarm integration",
            "UPS system design for uninterruptible power to critical OT equipment",
            "LED OT shadowless light selection with correct illumination level and colour rendering index",
            "Anaesthetic and surgical pendant design for correct equipment positioning relative to operating table",
            "Single arm, double arm, and combination pendant configurations",
            "Medical gas, electrical, and data outlet integration within pendant system",
          ],
        },
        {
          heading: "ICU Layout, Bed Configuration, and Infrastructure",
          items: [
            "Open plan, single room, and combination ICU layout design with full nurse station visibility",
            "Bed spacing design with minimum 2.4 metres between bed centres for equipment access",
            "Isolation bay design with anteroom for airborne infection precautions",
            "Minimum two oxygen, two medical air, and three vacuum outlets per ICU bed as per NABH standards",
            "Medical grade isolated power system for each ICU bed with minimum electrical outlets per NABH",
            "HEPA filtration for high-risk ICU environments including NICU and bone marrow transplant units",
            "Modular wall and ceiling panel system with seamless flooring for infection control",
          ],
        },
      ],
    },
    extra: {
      heading: "OT and ICU Types ARCHORA Designs and Builds",
      tableHead: ["Facility Type", "Specialist Considerations"],
      tableRows: [
        ["General Surgery OT", "Standard laminar airflow, full medical gas, surgical pendant"],
        ["Cardiac Surgery OT", "Bypass pump connections, additional surgical pendants, perfusionist position"],
        ["Neurosurgery OT", "Microscope integration, neuronavigation connections, table positioning"],
        ["Orthopaedic OT", "C-arm access, lead lining for intraoperative imaging, surgical air for power tools"],
        ["Laparoscopic OT", "CO2 connections, camera tower integration, monitor positioning"],
        ["Robotic Surgery OT", "Robot docking zone, console positioning, extended floor space"],
        ["Hybrid OT", "Cath lab integration, radiation shielding, imaging equipment connections"],
        ["Ophthalmic OT", "Microscope integration, vitreoretinal equipment connections, precise humidity control"],
        ["IVF OT and Embryology Lab", "Cleanroom standard, VOC-free materials, precise temperature and humidity"],
        ["Medical ICU", "Open plan or single room, full medical gas, isolated power"],
        ["Neonatal ICU", "Incubator power and gas connections, precise temperature control, minimal noise"],
        ["Burns ICU", "Negative pressure isolation, precise humidity control, infection control surfaces"],
      ],
    },
    process: [
      { step: "01", title: "Clinical Brief and Surgical Speciality Review", desc: "We begin by understanding the surgical specialities the OT will serve, the case volumes, the equipment the surgeons use, and the clinical workflows of the ICU team. Every design decision is informed by the clinical requirements of the specific department." },
      { step: "02", title: "Layout Design and Space Planning", desc: "We develop the OT suite and ICU layout design, including room sizing, adjacencies, circulation planning, and all support space design. We present the layout for clinical team review and incorporate feedback before advancing to detailed design." },
      { step: "03", title: "MEP System Design", desc: "Our engineering team designs all MEP systems for the OT and ICU including HVAC, medical gas, electrical, and fire protection. All systems are designed to the applicable NABH and regulatory standards." },
      { step: "04", title: "Panel System and Finishes Specification", desc: "We specify the complete modular panel system, flooring system, door system, and all interior finishes for the OT and ICU. Material specifications are driven by infection control requirements and clinical performance, not aesthetics alone." },
      { step: "05", title: "Equipment and Pendant Specification", desc: "We specify and coordinate all clinical equipment including OT lights, pendant systems, OT tables, and ICU headwall panel systems. Equipment selection is coordinated with the MEP design to ensure all service connections are correctly provided." },
      { step: "06", title: "Construction and Installation", desc: "Our construction team installs the complete modular system including all civil works, MEP systems, panel systems, equipment, and finishes under a single coordinated programme. We do not subcontract critical clinical systems to parties without healthcare installation experience." },
      { step: "07", title: "Commissioning, Testing, and Validation", desc: "Every OT and ICU we deliver is commissioned, tested, and validated before handover: including HVAC air change rate measurement, particle count testing, medical gas pressure testing, electrical system commissioning, and full clinical readiness verification." },
    ],
    whyUs: {
      heading: "Why Choose ARCHORA for Your Modular OT and ICU?",
      points: [
        "Our OT and ICU designs begin with the clinical brief, not the construction brief, we understand what a cardiac surgeon needs at the scrub sink, what an anaesthetist needs at the head of the table, and what an ICU nurse needs at the bedside",
        "ARCHORA delivers the complete OT and ICU from structural provisions and MEP engineering through to panel installation, equipment supply, commissioning, and clinical validation, one team, one contract, one point of accountability",
        "Every OT and ICU ARCHORA delivers is designed and built to meet NABH accreditation standards, compliance is part of the design brief from day one",
        "We do not hand over an OT or ICU until it has been commissioned and validated to its design performance criteria, air change rates measured, particle counts verified, medical gas pressures tested, isolation monitors verified",
      ],
    },
    whoNeeds: {
      heading: "Who Needs Modular OT and ICU Infrastructure?",
      bullets: [
        "Hospitals building new surgical suites or critical care units",
        "Nursing homes and day-surgery centres upgrading to modular OT standards",
        "Facilities failing NABH inspections due to OT or ICU non-compliance",
        "Existing hospitals renovating or expanding their surgical or critical care capacity",
        "Specialty surgical centres requiring specialist OT configurations, cardiac, neuro, robotic, hybrid",
        "IVF and fertility centres requiring cleanroom-standard embryology lab environments",
      ],
    },
    faqs: [
      { q: "What is the minimum size for a modular OT room in India?", a: "NABH guidelines recommend a minimum OT room size of 36 square metres for a standard general surgery OT. Specialty OTs such as cardiac surgery, neurosurgery, and robotic surgery OTs require larger rooms to accommodate additional equipment and surgical team members. The OT room size should be determined by the specific surgical speciality and equipment requirements, not by a minimum standard alone. ARCHORA sizes every OT room based on the clinical brief for the specific surgical programme." },
      { q: "How long does it take to install a modular OT?", a: "The installation timeline for a modular OT depends on the scope of work. A single OT with all MEP systems, panel system, and equipment typically takes eight to twelve weeks from the start of installation to commissioning and handover, assuming the structural shell is ready. A multi-OT complex takes longer. ARCHORA provides a specific project timeline based on the scope of each project." },
      { q: "What is laminar airflow and why is it required in an OT?", a: "Laminar airflow is a system of air supply that delivers a large volume of ultra-clean HEPA-filtered air in a uniform, unidirectional flow pattern over the surgical field. The purpose of laminar airflow is to continuously wash the surgical field with clean air, sweeping airborne particles and microorganisms away from the wound and reducing the risk of surgical site infection. Laminar airflow is required in all OTs performing clean and clean-contaminated procedures and is mandated by NABH accreditation standards for operating theatres." },
      { q: "What is an isolated power system and why is it mandatory in an OT?", a: "An isolated power system is a medical grade electrical system that provides power to the OT through an isolation transformer and monitors the insulation resistance of the electrical system continuously. If a single electrical fault occurs, the isolation monitor sounds an alarm but the power supply is not interrupted. This prevents a single electrical fault from cutting power to surgical equipment during a live surgical procedure. Isolated power systems are mandatory in wet clinical locations including OTs and ICUs under IS standards and NABH accreditation requirements." },
      { q: "Can ARCHORA upgrade an existing OT to modular standards?", a: "Yes. ARCHORA undertakes OT upgrade and renovation projects to bring existing OTs to modular standard. We assess the existing OT infrastructure, identify all gaps against current NABH and clinical standards, and design and execute a complete upgrade programme. OT upgrade projects are typically phased to minimise disruption to the surgical programme." },
      { q: "What is the difference between a standard ICU and a modular ICU?", a: "A standard ICU is built using conventional plastered walls, painted surfaces, and standard civil construction methods. A modular ICU uses a prefabricated panel system to create seamless, non-porous, fully decontaminatable surfaces throughout the ICU. A modular ICU also integrates all medical gas, electrical, and data services into a headwall panel system at each bed, placing all connections in the correct ergonomic position for the nursing team and eliminating exposed pipes, cables, and trailing leads at the bedside." },
      { q: "Does ARCHORA supply the OT lights and pendant systems as well?", a: "Yes. ARCHORA supplies and installs the complete clinical equipment package for modular OTs including OT shadowless lights, surgical pendant systems, OT tables, and all other integrated clinical equipment. Equipment selection is coordinated with the MEP design and the panel system to ensure full integration and correct service provision at every connection point." },
    ],
    relatedServices: [
      { title: "Healthcare Architecture & Clinical Space Planning", slug: "healthcare-architecture" },
      { title: "MEP Engineering for Healthcare", slug: "mep-engineering" },
      { title: "Structural Design for Healthcare Facilities", slug: "structural-design" },
      { title: "Turnkey Civil & Interior Execution", slug: "turnkey-execution" },
      { title: "Project Management & Commissioning", slug: "project-management" },
    ],
    bottomCTA: {
      heading: "Ready to Build an OT and ICU That Delivers Clinical Excellence Every Day?",
      body: "Talk to ARCHORA today. We will design, engineer, and deliver a modular OT and ICU that meets every NABH standard, satisfies every surgeon and intensivist on your team, and performs at the highest clinical level from the first case to the thousandth.",
    },
  },
];

// ─── Helper Components ─────────────────────────────────────────────────────────

function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <p style={{ fontFamily: FONT, fontSize: 39, letterSpacing: "3px", textTransform: "uppercase", color, marginBottom: 16, display: "flex", alignItems: "center", gap: 14, fontWeight: 600 }}>
      <span style={{ display: "block", width: 32, height: "0.5px", background: color }} />
      {text}
      <span style={{ display: "block", width: 32, height: "0.5px", background: color }} />
    </p>
  );
}

function LightFAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, padding: "20px 0", background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontFamily: FONT, fontSize: "1.4rem", fontWeight: 600, lineHeight: 1.4, color: open ? "#185FA5" : "#042C53", transition: "color 0.25s" }}>
          {faq.q}
        </span>
        <span style={{ flexShrink: 0, color: open ? "#185FA5" : "rgba(4,44,83,0.35)", marginTop: 2 }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
            <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.9, color: "#185FA5", paddingBottom: 20, fontWeight: 400 }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ServiceDetailPage Component ─────────────────────────────────────────
export function ServiceDetailPage({ service, onBack }: { service: ServiceData; onBack: () => void }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [service.slug]);

  return (
    <div className="archora-page-scope" style={{ fontFamily: FONT }}>
      <style>{`
        .archora-page-scope * { font-family: Calibri, 'Calibri', Arial, sans-serif !important; }
        @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .decor-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; pointer-events: none; will-change: transform; }
        .service-coverage-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .process-timeline { display: grid; grid-template-columns: 1fr 1fr; gap: 0 64px; }
        .why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
        .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
        .table-responsive { overflow-x: auto; }

        /* ============ RESPONSIVE LAYOUT RULES ============ */

        /* Page section wrappers — fixed 3rem/3.5rem side padding crushes
           content on tablet/phone, scale down progressively. */
        .svc-wrap-3 {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 3rem;
          box-sizing: border-box;
        }
        .svc-wrap-1100 {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 3rem;
          box-sizing: border-box;
        }
        .svc-wrap-1200 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3rem;
          box-sizing: border-box;
        }
        .svc-wrap-1100-wide {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 3.5rem;
          box-sizing: border-box;
        }
        .svc-wrap-820 {
          max-width: 820px;
          margin: 0 auto;
          padding: 0 3rem;
          box-sizing: border-box;
        }
        .svc-wrap-680 {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 3rem;
          box-sizing: border-box;
          text-align: center;
        }
        @media (max-width: 1024px) {
          .svc-wrap-3, .svc-wrap-1100, .svc-wrap-1200, .svc-wrap-1100-wide, .svc-wrap-820, .svc-wrap-680 {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
        @media (max-width: 640px) {
          .svc-wrap-3, .svc-wrap-1100, .svc-wrap-1200, .svc-wrap-1100-wide, .svc-wrap-820, .svc-wrap-680 {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
        }

        /* Hero: fixed 6rem/5rem/5.5rem padding plus absolute side-dot rail
           crowd the headline on phones. */
        .svc-hero-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 5rem 6rem 5.5rem;
          z-index: 2;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 1024px) {
          .svc-hero-inner { padding: 5.5rem 2.5rem 4.5rem 4.5rem; }
        }
        @media (max-width: 760px) {
          .svc-hero-inner { padding: 6rem 1.5rem 3.5rem 1.5rem; }
        }

        .svc-hero-side-rail {
          position: absolute;
          left: 28px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }
        @media (max-width: 760px) {
          .svc-hero-side-rail { display: none; }
        }

        .svc-hero-headline {
          font-size: clamp(2.1rem, 4.5vw, 4.4rem);
        }

        /* Who-needs split layout: heading column + bullet column sit side
           by side via flex-basis, already wraps via flexWrap but tighten
           gap on phone so it doesn't feel like two unrelated blocks. */
        .svc-who-needs-row {
          display: flex;
          gap: 4rem;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        @media (max-width: 640px) {
          .svc-who-needs-row { gap: 2rem; }
        }

        /* Coverage / why-us / related grids already use auto-fill, but force
           single column under 420px since minmax(220-320px) can still feel
           tight against very narrow phones with side padding included. */
        @media (max-width: 420px) {
          .service-coverage-grid, .why-grid, .related-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .process-timeline { grid-template-columns: 1fr; }
          .service-coverage-grid { grid-template-columns: 1fr; }
        }

        /* Data comparison table: keep horizontal scroll but shrink cell
           padding/font slightly on phone so more fits before scrolling kicks in */
        @media (max-width: 640px) {
          .table-responsive table th,
          .table-responsive table td {
            padding: 10px 12px !important;
            font-size: 15px !important;
          }
        }

        /* FAQ accordion container: fixed 2rem side padding plus question/
           chevron row can feel cramped on phone */
        @media (max-width: 480px) {
          .svc-faq-box { padding: 0 1.25rem !important; }
        }

        /* Bottom CTA button row safety net (already flexWrap, just tighten) */
        @media (max-width: 480px) {
          .svc-cta-btn-row { gap: 8px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "68vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "linear-gradient(160deg,#040e1a 0%,#071e30 55%,#04141f 100%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(75,209,217,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${service.color}08 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div className="svc-hero-side-rail">
          <div style={{ width: 1, height: 56, background: "rgba(255,255,255,0.08)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: service.color }} />
          <div style={{ width: 1, height: 56, background: "rgba(255,255,255,0.08)" }} />
        </div>

        <div className="svc-hero-inner">
          <motion.button className="back-btn" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} onClick={onBack} style={{ marginBottom: 32 }}>
            <ArrowLeft size={13} /> Back to Services
          </motion.button>

          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: `${service.color}18`, border: `1px solid ${service.color}35`, borderRadius: 2, color: service.color }}>
              {service.icon}
            </div>
            <p style={{ fontFamily: FONT, fontSize: 17, letterSpacing: "3.5px", textTransform: "uppercase", color: `${service.color}90`, margin: 0, fontWeight: 600 }}>
              {service.id}, Service
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="svc-hero-headline"
            style={{ fontFamily: FONT, fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 24, maxWidth: 760, letterSpacing: "-0.01em" }}
          >
            {service.heroH1.split(".").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>{part}.{i === 0 && <br />}</span>
              ) : (
                <em key={i} style={{ fontStyle: "italic", color: service.color }}>{part}</em>
              )
            )}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} style={{ fontFamily: FONT, fontSize: 18, lineHeight: 1.95, color: "rgba(255,255,255,0.95)", maxWidth: 600, marginBottom: 40, fontWeight: 400 }}>
            {service.heroSub}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="cta-btn-primary" onClick={() => navigate("/contact")}>Book a Free Consultation</button>
            <button className="cta-btn-outline" onClick={() => window.open(WHATSAPP_URL, "_blank")}>WhatsApp Us</button>
          </motion.div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${service.color}60, transparent 50%, ${service.color}20)` }} />
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#e8f4fd 100%)", padding: "5.5rem 0" }}>
        <div className="svc-wrap-3">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel text="The Challenge" color="#185FA5" />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 600, color: "#042C53", marginBottom: 28, lineHeight: 1.2 }}>
              {service.problem.heading}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {service.problem.body.map((para, i) => (
                <p key={i} style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.95, color: "#0a1a2a", borderLeft: i === service.problem.body.length - 1 ? "2px solid #185FA5" : "none", paddingLeft: i === service.problem.body.length - 1 ? 16 : 0, fontStyle: i === service.problem.body.length - 1 ? "italic" : "normal", fontWeight: 400 }}>
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPLAINER ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "5.5rem 0" }}>
        <div className="svc-wrap-3">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel text="What This Is" color={`${service.color}90`} />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 600, color: "#fff", marginBottom: 28, lineHeight: 1.2 }}>
              {service.explainer.heading}
            </h2>
            {service.explainer.body.map((para, i) => (
              <p key={i} style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.95, color: "rgba(255,255,255,0.95)", marginBottom: 14, fontWeight: 400 }}>{para}</p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHO NEEDS ── */}
      <section style={{ background: "linear-gradient(160deg,#042C53 0%,#185FA5 100%)", padding: "5rem 0" }}>
        <div className="svc-wrap-1100">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="svc-who-needs-row">
              <div style={{ flex: "1 1 300px" }}>
                <p style={{ fontFamily: FONT, fontSize: 17, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.95)", marginBottom: 14, fontWeight: 600 }}>Who This Serves</p>
                <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: 0 }}>
                  {service.whoNeeds.heading}
                </h2>
              </div>
              <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: 12 }}>
                {service.whoNeeds.bullets.map((bullet, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <Check size={11} color="#fff" />
                    </div>
                    <span style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COVERAGE ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "7rem 0", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${service.color}04 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div className="svc-wrap-1200" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <SectionLabel text="Scope of Service" color={`${service.color}90`} />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 600, color: "#fff", lineHeight: 1.15 }}>
              {service.coverage.heading}
            </h2>
          </motion.div>

          <div className="service-coverage-grid">
            {service.coverage.sections.map((section, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div key={i} ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: "rgba(255,255,255,0.025)", border: `0.5px solid ${service.color}18`, borderRadius: 2, padding: "1.8rem", position: "relative", overflow: "hidden" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${service.color}60, transparent)` }} />
                  <p style={{ fontFamily: FONT, fontSize: "1.3rem", fontWeight: 600, color: "#fff", marginBottom: 16, lineHeight: 1.35 }}>{section.heading}</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0, listStyle: "none" }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: service.color, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.95)", fontWeight: 400 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EXTRA TABLE ── */}
      {service.extra && service.extra.tableRows && (
        <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#e8f4fd 100%)", padding: "5.5rem 0" }}>
          <div className="svc-wrap-1100">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionLabel text="Facility Types" color="#185FA5" />
              <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 600, color: "#042C53", marginBottom: 32, lineHeight: 1.2 }}>
                {service.extra.heading}
              </h2>
              <div className="table-responsive">
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
                  <thead>
                    <tr>
                      {service.extra.tableHead?.map((h, i) => (
                        <th key={i} style={{ textAlign: "left", padding: "12px 16px", fontSize: 16, letterSpacing: "2px", textTransform: "uppercase", color: "#185FA5", background: "rgba(4,44,83,0.06)", borderBottom: "1px solid rgba(24,95,165,0.2)", fontWeight: 600, fontFamily: FONT, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {service.extra.tableRows?.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "rgba(4,44,83,0.02)" : "transparent" }}>
                        <td style={{ padding: "12px 16px", fontSize: 17, color: "#042C53", borderBottom: "0.5px solid rgba(24,95,165,0.1)", fontWeight: 600, fontFamily: FONT, whiteSpace: "nowrap" }}>{row[0]}</td>
                        <td style={{ padding: "12px 16px", fontSize: 17, color: "#185FA5", borderBottom: "0.5px solid rgba(24,95,165,0.1)", fontWeight: 400, fontFamily: FONT }}>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── EXTRA BODY (service 04) ── */}
      {service.extra && service.extra.body && (
        <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#e8f4fd 100%)", padding: "5.5rem 0" }}>
          <div className="svc-wrap-3">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionLabel text="Important Note" color="#185FA5" />
              <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 600, color: "#042C53", marginBottom: 28, lineHeight: 1.2 }}>
                {service.extra.heading}
              </h2>
              {service.extra.body.map((para, i) => (
                <p key={i} style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.95, color: "#0a1a2a", marginBottom: 14, fontWeight: 400 }}>{para}</p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── PROCESS ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#daeef9 50%,#e8f4fd 100%)", padding: "7rem 0" }}>
        <div className="svc-wrap-1100-wide">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: "5rem" }}>
            <SectionLabel text="Our Process" color="#185FA5" />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 600, color: "#042C53", lineHeight: 1.15 }}>
              How ARCHORA Delivers <em style={{ fontStyle: "italic", color: "#185FA5" }}>This Service</em>
            </h2>
          </motion.div>

          <div className="process-timeline">
            {service.process.map((step, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div key={i} ref={ref} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 32 }}
                >
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#185FA5,#4bd1d9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: 16, fontWeight: 600, color: "#fff", flexShrink: 0 }}>
                      {step.step}
                    </div>
                    {i < service.process.length - 1 && (
                      <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(24,95,165,0.3), rgba(24,95,165,0.05))", marginTop: 6 }} />
                    )}
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <h4 style={{ fontFamily: FONT, fontSize: "1.3rem", fontWeight: 600, color: "#042C53", marginBottom: 6, lineHeight: 1.3 }}>{step.title}</h4>
                    <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.85, color: "#185FA5", fontWeight: 400 }}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button className="cta-btn-primary" onClick={() => navigate("/contact")} style={{ background: "linear-gradient(135deg,#042C53,#185FA5)", color: "#fff" }}>
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY ARCHORA ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "6rem 0" }}>
        <div className="svc-wrap-1100">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: "4rem" }}>
            <SectionLabel text="Why ARCHORA" color={`${service.color}90`} />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
              {service.whyUs.heading}
            </h2>
          </motion.div>

          <div className="why-grid">
            {service.whyUs.points.map((point, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              return (
                <motion.div key={i} ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ padding: "1.6rem", background: `${service.color}07`, border: `0.5px solid ${service.color}18`, borderRadius: 2 }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: service.color, marginBottom: 14 }} />
                  <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,0.95)", fontWeight: 400 }}>{point}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#e8f4fd 100%)", padding: "6rem 0" }}>
        <div className="svc-wrap-820">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: "3rem" }}>
            <SectionLabel text="Frequently Asked Questions" color="#185FA5" />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 600, color: "#042C53", lineHeight: 1.2 }}>
              Everything You Need to Know
            </h2>
          </motion.div>

          <div className="svc-faq-box" style={{ background: "#fff", border: "0.5px solid rgba(24,95,165,0.15)", borderRadius: 4, padding: "0 2rem", boxShadow: "0 4px 32px rgba(4,44,83,0.06)" }}>
            {service.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < service.faqs.length - 1 ? "0.5px solid rgba(24,95,165,0.1)" : "none" }}>
                <LightFAQItem faq={faq} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "5.5rem 0" }}>
        <div className="svc-wrap-1100">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: "3rem" }}>
            <SectionLabel text="Related Services" color={`${service.color}90`} />
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
              You Might Also Need
            </h2>
          </motion.div>

          <div className="related-grid">
            {service.relatedServices.map((rel, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ padding: "1.2rem 1.4rem", background: "rgba(255,255,255,0.03)", border: `0.5px solid ${service.color}18`, borderRadius: 2, cursor: "pointer", transition: "all 0.3s ease", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = `${service.color}08`; (e.currentTarget as HTMLDivElement).style.borderColor = `${service.color}35`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLDivElement).style.borderColor = `${service.color}18`; }}
              >
                <p style={{ fontFamily: FONT, fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.97)", margin: 0, fontWeight: 400 }}>{rel.title}</p>
                <ArrowRight size={13} color={service.color} style={{ flexShrink: 0, marginTop: 2 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: "#040e1a", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        {[600, 420, 260].map((size, i) => (
          <div
            key={size}
            className="decor-ring"
            style={{
              width: size, height: size,
              marginLeft: -size / 2, marginTop: -size / 2,
              border: `1px solid ${service.color}${i === 0 ? "06" : i === 1 ? "08" : "12"}`,
              animation: `${i % 2 === 0 ? "spinCW" : "spinCCW"} ${60 + i * 20}s linear infinite`,
            }}
          />
        ))}

        <div className="svc-wrap-680" style={{ position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: "50%", background: `${service.color}15`, border: `1px solid ${service.color}30`, color: service.color, marginBottom: 28 }}>
              {service.icon}
            </div>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.9rem, 4vw, 3.6rem)", fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              {service.bottomCTA.heading.split("?")[0]}?<br />
              <em style={{ fontStyle: "italic", color: service.color }}>Talk to ARCHORA.</em>
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 17, color: "rgba(255,255,255,0.90)", lineHeight: 1.9, marginBottom: 40, fontWeight: 400 }}>
              {service.bottomCTA.body}
            </p>
            <div className="svc-cta-btn-row" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="cta-btn-primary" onClick={() => navigate("/contact")}>Book a Free Consultation</button>
              <button className="cta-btn-outline" onClick={() => window.open(WHATSAPP_URL, "_blank")}>WhatsApp Us</button>
              <button className="cta-btn-outline" onClick={() => navigate("/contact")}>Send an Enquiry →</button>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 16, color: "rgba(255,255,255,0.18)", marginTop: 24, letterSpacing: "0.1em", fontWeight: 400 }}>
              No obligation · No sales pressure · Just clarity.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}