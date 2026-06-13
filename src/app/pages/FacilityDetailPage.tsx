import { useParams, Link, useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ComplianceItem {
  name: string;
  authority: string;
  scope: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface ServiceItem {
  title: string;
  description: string;
}

interface FacilityData {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  catLabel: string;
  urlSlug: string;
  intro: string[];
  services: ServiceItem[];
  compliance: ComplianceItem[];
  process: ProcessStep[];
  faqs: FAQItem[];
  ctaHeading: string;
  ctaBody: string;
}

// ─── All Facility Data ──────────────────────────────────────────────────────────
const facilityData: Record<string, FacilityData> = {
  "F-01": {
    id: "F-01",
    title: "Multi-Speciality Hospital",
    subtitle: "Design and Construction — Turnkey Infrastructure by ARCHORA",
    accentColor: "#4bd1d9",
    catLabel: "Hospitals",
    urlSlug: "/healthcare-facilities/multi-speciality-hospital",
    intro: [
      "Building a multi-speciality hospital is one of the most complex infrastructure undertakings in healthcare. It demands precision at every level — from clinical space planning and patient flow design to NABH compliance, MEP engineering, modular OT installation, and regulatory approvals.",
      "Most hospital projects in India fail not because of a lack of vision, but because of fragmented execution. Multiple vendors, misaligned timelines, budget overruns, and compliance gaps discovered too late are the real reasons projects collapse. ARCHORA eliminates that fragmentation — designing, engineering, and delivering complete multi-speciality hospital facilities under one contract, one team, and one accountable partner, from concept to commissioning.",
    ],
    services: [
      { title: "Hospital Architecture & Clinical Space Planning", description: "We design multi-speciality hospitals with clinical precision, optimising patient flow, department zoning, infection control corridors, staff and visitor segregation, and future expansion flexibility. Every spatial decision is made with NABH standards and clinical outcomes at the centre." },
      { title: "Structural & Civil Construction", description: "Our construction teams execute hospital-grade civil work, from foundation and structural framing to facade, roofing, and internal partition systems. We build to hospital-specific load requirements, vibration control standards, and long-term structural durability." },
      { title: "MEP Engineering — Medical Grade", description: "Mechanical, Electrical, and Plumbing systems in a multi-speciality hospital are not standard building systems. ARCHORA designs and installs medical gas pipelines, HVAC with HEPA filtration, uninterrupted power supply systems, earthing, clean electrical distribution, and hospital-grade plumbing — all compliant with NABH and NBC standards." },
      { title: "Modular Operation Theatre Setup", description: "We design and install modular OT complexes with laminar airflow systems, stainless steel panelling, integrated surgical lighting, anaesthesia workstations, OT control panels, and full infection control compliance. Each OT is validated before handover." },
      { title: "ICU & Critical Care Unit Design", description: "ARCHORA builds ICUs that meet NABH critical care standards, including individual bed bay planning, nurse station visibility, medical gas outlets, monitoring system integration, and HVAC pressurisation protocols for infection control." },
      { title: "Interior Design & Clinical Finishes", description: "We specify and install hospital-grade wall cladding, epoxy flooring, antimicrobial surfaces, signage, patient room furniture, and public area finishes — all compliant with NABH environmental standards." },
      { title: "Medical Equipment Planning & Coordination", description: "We coordinate medical equipment procurement, installation, and integration into the built environment, ensuring that imaging rooms, OTs, labs, and ICUs are infrastructure-ready for equipment on Day 1." },
      { title: "NABH Compliance & Documentation Support", description: "ARCHORA integrates NABH compliance from the first design drawing. We prepare facility compliance documentation, support NABH pre-assessment processes, and ensure your hospital is assessment-ready at the time of commissioning." },
      { title: "Project Management & Turnkey Delivery", description: "A single ARCHORA project manager coordinates every vendor, every timeline, and every compliance milestone — delivering your multi-speciality hospital on time, within budget, and fully commissioned." },
    ],
    compliance: [
      { name: "NABH HCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Mandatory hospital quality and safety accreditation" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance for healthcare buildings" },
      { name: "BCP — Occupancy Certificate", authority: "Local Municipal Authority", scope: "Building completion and occupancy certification" },
      { name: "AERB Clearance", authority: "Atomic Energy Regulatory Board", scope: "Required if hospital includes X-ray, CT, MRI, or Cath Lab" },
      { name: "Medical Gas Pipeline Compliance", authority: "HTM 02-01 and IS Standards", scope: "Medical gas system design, installation, and validation" },
      { name: "NBC Compliance", authority: "National Building Code of India", scope: "Structural, fire, and safety compliance for buildings" },
      { name: "ISO 9001 : 2015", authority: "International Organization for Standardization", scope: "ARCHORA's internal quality management system" },
    ],
    process: [
      { title: "Discovery & Feasibility Consultation", description: "We begin with a detailed consultation to understand your vision, bed capacity, speciality mix, site conditions, budget, and timeline. A feasibility assessment eliminates surprises before a single drawing is made." },
      { title: "Clinical Brief & Space Programming", description: "Our clinical planners develop a detailed space programme, defining every department, room, area, and adjacency requirement based on your speciality mix, patient volumes, NABH standards, and operational workflows." },
      { title: "Concept Design & Master Planning", description: "We prepare concept designs, floor plans, and master layouts for your review and approval, incorporating patient flow, clinical zoning, expansion provisions, and site-specific constraints." },
      { title: "Detailed Architectural & MEP Design", description: "Full architectural drawings, structural engineering, and complete MEP system design are prepared to construction-ready specifications, coordinated across all disciplines to eliminate site conflicts." },
      { title: "Regulatory Approvals & Compliance Documentation", description: "ARCHORA coordinates building plan approvals, fire NOC applications, CEA registration support, and NABH pre-assessment documentation preparation." },
      { title: "Civil Construction & MEP Installation", description: "Our construction teams execute civil works, MEP installations, modular OT setup, ICU construction, and all interior works under strict quality control and project management supervision." },
      { title: "Medical Equipment Coordination & Integration", description: "We coordinate with equipment suppliers to ensure all clinical spaces are infrastructure-ready — electrical loads, structural supports, medical gas connections, data points, and ventilation requirements are all verified before equipment installation." },
      { title: "Quality Checks, Testing & Validation", description: "All systems including HVAC, medical gas, electrical, and fire safety are tested, commissioned, and validated before handover. OTs and ICUs undergo specific validation protocols." },
      { title: "NABH Readiness Assessment & Handover", description: "ARCHORA conducts a full NABH readiness walkthrough, identifying and closing any compliance gaps. The facility is handed over commissioned, compliant, and operational." },
      { title: "Post-Handover Support", description: "ARCHORA remains available for post-handover infrastructure support, NABH assessment accompaniment, and future expansion planning." },
    ],
    faqs: [
      { q: "What is the cost of building a multi-speciality hospital in India?", a: "The cost typically ranges from ₹4 crore to ₹10 crore per bed, depending on location, bed capacity, speciality mix, land cost, equipment, and finishing standards. A 100-bed multi-speciality hospital in a Tier 1 city may require a total investment of ₹50 crore to ₹150 crore including land, construction, MEP, equipment, and working capital." },
      { q: "How long does it take to build a multi-speciality hospital in India?", a: "A multi-speciality hospital typically takes 24 to 36 months from design to commissioning, depending on bed capacity, site conditions, and regulatory approval timelines. ARCHORA's integrated single-team delivery model reduces this timeline by 6 to 12 months compared to the industry average." },
      { q: "Is NABH accreditation mandatory for a multi-speciality hospital in India?", a: "NABH accreditation is not legally mandatory but is increasingly required for insurance empanelment, CGHS and ECHS tie-ups, international patient referrals, and government scheme participation. Most serious hospital projects pursue NABH accreditation as a quality and business imperative. ARCHORA builds every facility to full NABH HCO standards." },
      { q: "What is the minimum land requirement for a multi-speciality hospital?", a: "Land requirements vary based on bed capacity, local authority norms, and FAR. As a general guide, a 100-bed multi-speciality hospital requires approximately 1.5 to 3 acres of land depending on the city and building height permissions. ARCHORA conducts a site feasibility assessment to determine the optimal configuration for your specific plot." },
      { q: "Can ARCHORA manage the entire hospital project from design to handover?", a: "Yes. ARCHORA delivers complete turnkey multi-speciality hospital projects covering architecture, structural engineering, MEP, modular OT, ICU, interiors, medical equipment coordination, NABH compliance support, and commissioning — under a single contract and single point of accountability." },
      { q: "What compliances are needed to open a multi-speciality hospital in India?", a: "To open a multi-speciality hospital in India, you need CEA registration, Fire NOC, Building Occupancy Certificate, AERB clearance for radiation equipment, and NABH accreditation for insurance empanelment. ARCHORA integrates all compliance requirements into the design and construction process." },
      { q: "Does ARCHORA work on hospital projects outside Mumbai?", a: "Yes. ARCHORA delivers healthcare infrastructure projects across India and is expanding into international markets including the MENA region. We have delivered and are currently executing projects in multiple states across India." },
    ],
    ctaHeading: "Ready to Build Your Multi-Speciality Hospital?",
    ctaBody: "Every great hospital starts with the right infrastructure partner. ARCHORA brings together clinical planning, architecture, engineering, compliance, and construction under one roof — so your hospital is built right the first time.",
  },

  "F-02": {
    id: "F-02",
    title: "Super-Speciality Hospital",
    subtitle: "Design and Construction — Advanced Healthcare Infrastructure by ARCHORA",
    accentColor: "#4bd1d9",
    catLabel: "Hospitals",
    urlSlug: "/healthcare-facilities/super-speciality-hospital",
    intro: [
      "A super-speciality hospital operates at the highest level of clinical complexity. It houses advanced surgical suites, cardiac catheterisation labs, neuroscience centres, oncology blocks, bone marrow transplant units, and critical care facilities that demand infrastructure far beyond what a standard hospital requires. The margin for error in design and construction is zero — a wrong ventilation specification in a transplant unit, an incorrect electrical load calculation in a cath lab, or a compliance gap in a radiation facility can cost lives, delay commissioning, and derail years of investment.",
      "ARCHORA is built specifically for this level of complexity. We bring together clinical planners, healthcare architects, MEP engineers, modular OT specialists, and compliance experts into one integrated team — delivering super-speciality hospital infrastructure that is technically precise, regulatory compliant, and operationally ready from Day 1.",
    ],
    services: [
      { title: "Advanced Clinical Space Planning & Architecture", description: "Super-speciality hospitals require highly specialised department planning. We design cardiac centres, neuro-surgical blocks, oncology wings, transplant units, and advanced diagnostic clusters with precise clinical workflow mapping, infection control zoning, and NABH-compliant spatial standards. Every adjacency decision is clinically justified." },
      { title: "Structural & Civil Construction for Advanced Facilities", description: "Super-speciality hospitals require structural engineering that accommodates heavy medical equipment, radiation shielding, vibration isolation for imaging suites, and long-span structural systems for large OT complexes and critical care floors." },
      { title: "Advanced MEP Engineering", description: "At super-speciality level, MEP systems are life-critical infrastructure. ARCHORA designs and installs redundant power systems with multiple levels of backup, medical gas manifolds with zone valve boxes, HVAC systems with HEPA and ULPA filtration for transplant and oncology areas, BMS, and nurse call systems — all engineered to HTM, NABH, and NBC standards." },
      { title: "Radiation Shielding & AERB Compliance", description: "Super-speciality hospitals typically include CT scanners, MRI units, PET-CT, linear accelerators, catheterisation labs, and nuclear medicine facilities. ARCHORA designs and constructs full radiation shielding for all radiation areas, prepares AERB eLORA documentation, and coordinates the entire regulatory approval process." },
      { title: "Modular Operation Theatre Complexes", description: "We design and build multi-OT complexes with laminar airflow systems, positive and negative pressure capabilities, integrated imaging systems such as intraoperative MRI and C-arm bays, robotic surgery infrastructure, OT pendant systems, and full sterile supply integration. Every OT is validated to international standards before handover." },
      { title: "Critical Care & Specialised ICU Design", description: "ARCHORA builds specialised ICUs including cardiac ICUs, neurological ICUs, neonatal ICUs, bone marrow transplant units, and trauma ICUs. Each unit is designed to its specific clinical protocol with NABH-compliant bed bay sizing, pressurisation, medical gas, monitoring infrastructure, and infection control provisions." },
      { title: "Cath Lab & Interventional Suite Infrastructure", description: "Cardiac catheterisation labs and interventional radiology suites require specialised civil, MEP, and radiation shielding infrastructure. ARCHORA designs and builds complete cath lab environments including radiation shielding, dedicated electrical systems, medical gas, HVAC with specific air change requirements, and control room integration." },
      { title: "Healthcare Interior Design & Patient Experience", description: "We create super-speciality hospital interiors that reflect the clinical standard of the institution, using hospital-grade materials, wayfinding systems, patient-centred room design, and public area finishes that build confidence and trust from the moment a patient arrives." },
      { title: "Medical Equipment Planning & Infrastructure Coordination", description: "Our team coordinates with equipment suppliers for all high-value and space-critical equipment including MRI, CT, PET-CT, linear accelerators, robotic surgery systems, and cath lab equipment — ensuring every room is infrastructure-ready with correct power, cooling, shielding, and structural provisions." },
      { title: "NABH Compliance & Accreditation Support", description: "ARCHORA embeds NABH HCO compliance into every stage of design and construction. We prepare compliance documentation, conduct pre-assessment walkthroughs, and support your team through the NABH accreditation process." },
      { title: "Turnkey Project Management", description: "A single ARCHORA project director manages every aspect of your super-speciality hospital project, from design coordination and vendor management to construction supervision, regulatory approvals, and final commissioning." },
    ],
    compliance: [
      { name: "NABH HCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Mandatory quality and safety accreditation for hospitals" },
      { name: "AERB Clearance & eLORA", authority: "Atomic Energy Regulatory Board", scope: "Mandatory for all radiation facilities including CT, MRI, PET-CT, Cath Lab, Radiotherapy" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance for all healthcare buildings" },
      { name: "BCP — Occupancy Certificate", authority: "Local Municipal Authority", scope: "Building completion and occupancy certification" },
      { name: "Medical Gas Pipeline Compliance", authority: "HTM 02-01 and IS Standards", scope: "Medical gas system design, installation, and validation" },
      { name: "Radiation Shielding Design", authority: "AERB and BARC Guidelines", scope: "Shielding design for all radiation areas" },
      { name: "NBC Compliance", authority: "National Building Code of India", scope: "Structural, fire, and safety compliance" },
      { name: "ISO 9001 : 2015", authority: "International Organization for Standardization", scope: "ARCHORA's internal quality management system" },
    ],
    process: [
      { title: "Strategic Consultation & Project Feasibility", description: "We begin with a comprehensive consultation covering your clinical vision, speciality focus areas, bed capacity, site conditions, budget, and phasing requirements. A detailed feasibility report is prepared before design begins." },
      { title: "Clinical Brief Development & Speciality Planning", description: "Our clinical planners work with your medical leadership to develop a detailed brief for every speciality department, defining rooms, equipment, workflows, staff patterns, and patient journeys specific to each clinical area." },
      { title: "Master Planning & Concept Design", description: "We prepare a master plan and concept design that organises all departments, clinical zones, support areas, and future expansion provisions into a coherent, NABH-compliant layout." },
      { title: "Detailed Design — Architecture, Structure & MEP", description: "Full architectural, structural, and MEP design is developed to construction-ready specification, with radiation shielding calculations, equipment room layouts, and all speciality technical requirements fully incorporated." },
      { title: "Regulatory Approvals & AERB Documentation", description: "ARCHORA manages building plan approvals, fire NOC, CEA registration support, and full AERB eLORA application and approval coordination for all radiation facilities." },
      { title: "Civil Construction & Specialist Installations", description: "Our teams execute all civil works, radiation shielding construction, MEP installations, modular OT complexes, specialised ICU builds, and cath lab construction under integrated project management supervision." },
      { title: "Medical Equipment Infrastructure Coordination", description: "We work alongside all major equipment suppliers to ensure infrastructure readiness for every piece of high-value clinical equipment before installation begins." },
      { title: "Systems Testing, Commissioning & Validation", description: "All MEP systems, OTs, ICUs, and radiation facilities are tested, commissioned, and validated to relevant standards including NABH, AERB, and HTM requirements before handover." },
      { title: "NABH Readiness Assessment & Final Handover", description: "A comprehensive NABH readiness review is conducted before handover. All documentation, compliance records, and facility assessments are completed and handed over to your team." },
      { title: "Post-Commissioning Support", description: "ARCHORA provides post-handover support for infrastructure queries, NABH assessment accompaniment, and future expansion or additional speciality planning." },
    ],
    faqs: [
      { q: "What is the cost of building a super-speciality hospital in India?", a: "The cost typically ranges from ₹6 crore to ₹15 crore per bed, depending on the speciality mix, location, equipment, land cost, and finishing standards. A 200-bed super-speciality hospital in a Tier 1 city can require a total investment of ₹200 crore to ₹500 crore including land, construction, MEP, equipment, and working capital." },
      { q: "How is a super-speciality hospital different from a multi-speciality hospital?", a: "A multi-speciality hospital provides a broad range of general and speciality medical services. A super-speciality hospital focuses on advanced, high-complexity clinical care in specific areas such as cardiac surgery, neurosurgery, oncology, organ transplantation, or neonatology. Super-speciality hospitals require significantly more advanced infrastructure, specialised equipment, higher MEP complexity, radiation facilities, and more stringent compliance requirements." },
      { q: "What AERB approvals are needed for a super-speciality hospital?", a: "Any super-speciality hospital that includes CT scanners, MRI units, PET-CT, catheterisation labs, linear accelerators, or nuclear medicine facilities requires AERB clearance through the eLORA portal. This involves radiation safety officer appointment, shielding design submission, equipment installation approval, and periodic AERB inspections. ARCHORA manages the complete AERB approval process as part of our project delivery." },
      { q: "How long does it take to build a super-speciality hospital?", a: "A super-speciality hospital typically requires 30 to 48 months from design to commissioning, depending on bed capacity, number of speciality departments, complexity of radiation facilities, and regulatory approval timelines. ARCHORA's integrated delivery model and parallel workstreams help compress this timeline significantly." },
      { q: "Can ARCHORA design and build a cardiac super-speciality hospital?", a: "Yes. ARCHORA has specific expertise in cardiac hospital infrastructure including cath lab design and construction, cardiac OT complexes, cardiac ICUs, AERB radiation compliance for cath labs, and all supporting MEP and architectural systems required for a dedicated cardiac super-speciality facility." },
      { q: "What is the role of radiation shielding in a super-speciality hospital?", a: "Radiation shielding is a mandatory structural and safety requirement for all areas housing radiation-generating equipment such as CT scanners, X-ray rooms, catheterisation labs, linear accelerators, and PET-CT units. Shielding is designed based on equipment specifications, workload calculations, and AERB guidelines. ARCHORA designs and constructs all radiation shielding as part of our integrated project delivery." },
      { q: "Does ARCHORA provide post-construction NABH support for super-speciality hospitals?", a: "Yes. ARCHORA supports your team through the NABH pre-assessment process, conducts facility readiness walkthroughs, helps close compliance gaps, and accompanies your team through the formal NABH assessment process if required." },
    ],
    ctaHeading: "Planning a Super-Speciality Hospital?",
    ctaBody: "Super-speciality hospital infrastructure is not a task for generalist contractors. It requires a team that understands clinical complexity, advanced MEP engineering, radiation compliance, and NABH accreditation from the inside out. That team is ARCHORA.",
  },

  "F-03": {
    id: "F-03",
    title: "Oncology & Cancer Hospital",
    subtitle: "Design and Construction — Specialised Healthcare Infrastructure by ARCHORA",
    accentColor: "#4bd1d9",
    catLabel: "Hospitals",
    urlSlug: "/healthcare-facilities/oncology-cancer-hospital",
    intro: [
      "Oncology and cancer hospitals represent one of the most technically demanding categories of healthcare infrastructure in the world. Radiation oncology departments housing linear accelerators, brachytherapy suites, and nuclear medicine units require precision radiation shielding, AERB-compliant facility design, and highly specialised MEP systems. Chemotherapy units, bone marrow transplant centres, and surgical oncology blocks each carry their own specific infrastructure requirements around infection control, air pressurisation, hazardous drug handling, and clinical workflow.",
      "In India, the demand for quality cancer care infrastructure is growing rapidly, yet the number of infrastructure partners who truly understand oncology facility design remains very small. ARCHORA is one of them. We bring together clinical planners, radiation physicists, MEP engineers, and AERB compliance specialists into one integrated team — delivering oncology and cancer hospital infrastructure that is safe, compliant, and clinically optimised from the ground up.",
    ],
    services: [
      { title: "Oncology Master Planning & Clinical Space Design", description: "We design cancer hospitals around clinical pathways — from early detection and diagnosis through active treatment to palliative and supportive care. Our planners map patient journeys across surgical oncology, radiation oncology, medical oncology, nuclear medicine, and supportive care departments, ensuring smooth workflows, minimal cross-contamination risks, and NABH-compliant spatial standards throughout." },
      { title: "Radiation Oncology Department Infrastructure", description: "ARCHORA designs and constructs complete radiation oncology departments including bunkers for linear accelerators (LINAC), cobalt units, brachytherapy vaults, simulation rooms, treatment planning areas, and control rooms. Every bunker is designed with precise radiation shielding calculations validated by a qualified radiation physicist and submitted for AERB approval through the eLORA platform." },
      { title: "Linear Accelerator Bunker Design & Construction", description: "A LINAC bunker is a highly engineered structure requiring maze design, primary and secondary barrier calculations, high-density concrete or lead-lined walls, interlocking safety systems, specialised HVAC with negative pressure and high air change rates, and earthquake-resistant structural design. ARCHORA has specific expertise in LINAC bunker design and construction to full AERB and IAEA standards." },
      { title: "Nuclear Medicine Department Infrastructure", description: "Nuclear medicine departments require radioactive material handling areas, hot labs, injection rooms, uptake rooms, scanner rooms for SPECT and PET-CT, and dedicated radioactive waste storage and decay areas. ARCHORA designs these facilities to full AERB radiation facility licence requirements, including shielding, ventilation, plumbing for radioactive liquid waste, and personnel safety provisions." },
      { title: "Chemotherapy Day Care Unit Design", description: "Chemotherapy units require specific infection control provisions, negative pressure rooms for hazardous drug preparation, dedicated pharmacy with biological safety cabinets, recliner bay planning with natural light and patient comfort considerations, and safe segregation of cytotoxic waste. ARCHORA designs chemotherapy units that protect patients, staff, and the environment while maintaining clinical efficiency." },
      { title: "Bone Marrow Transplant Unit Infrastructure", description: "BMT units are among the most infection-sensitive environments in any hospital. ARCHORA designs and builds BMT units with HEPA-filtered positive pressure rooms, anteroom vestibule systems, strict cleanroom principles, dedicated MEP systems, and all NABH critical care compliance requirements for transplant environments." },
      { title: "Surgical Oncology OT Complex", description: "Cancer surgery requires specialised OT infrastructure including large-volume OTs for complex resections, intraoperative radiation therapy (IORT) capable rooms, clean and contaminated workflow separation, and sterile supply integration. ARCHORA designs and builds surgical oncology OT complexes to the full scope of modular OT standards." },
      { title: "Pathology & Molecular Diagnostics Laboratory", description: "Oncology hospitals require on-site pathology, histopathology, cytopathology, immunohistochemistry, and molecular diagnostics laboratories. ARCHORA designs and builds NABL-compliant laboratory environments with biosafety provisions, fume extraction, chemical storage, and cold chain infrastructure integrated into the facility design." },
      { title: "Palliative Care & Patient Support Spaces", description: "We design palliative care units, counselling rooms, support group spaces, and patient family areas with sensitivity to the emotional and physical needs of cancer patients and their families — creating environments that are calm, dignified, and supportive of healing." },
      { title: "Advanced MEP Engineering for Oncology", description: "Oncology facilities require MEP systems far beyond standard hospital requirements. ARCHORA designs and installs dedicated HVAC systems with specific air change rates and pressure relationships for each clinical area, medical gas systems with chemotherapy-specific provisions, redundant power systems, hazardous waste drainage systems, and full building management systems for oncology environments." },
      { title: "NABH & AERB Compliance Integration", description: "ARCHORA integrates NABH HCO accreditation standards and AERB radiation facility licence requirements from the first line of design. We prepare all compliance documentation, coordinate AERB eLORA submissions, and support your team through both NABH and AERB approval processes." },
      { title: "Turnkey Project Management", description: "A dedicated ARCHORA project director manages the complete delivery of your oncology hospital, coordinating clinical planners, architects, structural engineers, MEP teams, radiation physicists, equipment suppliers, and regulatory agencies under one integrated programme." },
    ],
    compliance: [
      { name: "NABH HCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Mandatory quality and safety accreditation for the hospital" },
      { name: "AERB Radiation Facility Licence", authority: "Atomic Energy Regulatory Board", scope: "Mandatory for all radiation therapy, nuclear medicine, and diagnostic radiation facilities" },
      { name: "AERB eLORA Approval", authority: "Atomic Energy Regulatory Board", scope: "Online regulatory approval for radiation equipment installation and operation" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance for all healthcare buildings" },
      { name: "BCP — Occupancy Certificate", authority: "Local Municipal Authority", scope: "Building completion and occupancy certification" },
      { name: "Radiation Shielding Design Approval", authority: "AERB and BARC Guidelines", scope: "Primary and secondary barrier design validated by qualified radiation physicist" },
      { name: "Radioactive Waste Management Compliance", authority: "AERB and PCB Guidelines", scope: "Safe storage, handling, and disposal of radioactive waste" },
      { name: "Biosafety Compliance", authority: "Department of Biotechnology", scope: "For molecular and genetics laboratory operations" },
      { name: "NBC Compliance", authority: "National Building Code of India", scope: "Structural, fire, and building safety compliance" },
      { name: "ISO 9001 : 2015", authority: "International Organization for Standardization", scope: "ARCHORA's internal quality management system" },
    ],
    process: [
      { title: "Oncology Project Consultation & Feasibility Assessment", description: "We begin with a detailed consultation covering your cancer care vision, proposed treatment modalities, radiation therapy equipment plans, bed capacity, site conditions, budget, and regulatory context. A project feasibility report is prepared covering technical, financial, and compliance dimensions." },
      { title: "Clinical Brief & Oncology Department Planning", description: "Our clinical planners work with your oncology leadership to develop detailed department briefs for radiation oncology, medical oncology, surgical oncology, nuclear medicine, pathology, and all support services — mapping every room, workflow, and equipment requirement." },
      { title: "Radiation Physics Consultation & Shielding Design", description: "For all radiation areas, we engage qualified radiation physicists to calculate primary and secondary barrier requirements, prepare shielding design reports, and coordinate AERB submission documentation. This work runs in parallel with architectural design to prevent costly design iterations." },
      { title: "Master Planning & Concept Design", description: "We prepare a master plan and concept design that organises all oncology departments into a coherent, safe, and NABH-compliant facility layout, with clear separation of radiation zones, clinical treatment areas, and patient support spaces." },
      { title: "Detailed Architectural, Structural & MEP Design", description: "Full construction-ready design is developed across all disciplines, incorporating LINAC bunker structural design, nuclear medicine shielding, BMT unit cleanroom specifications, chemotherapy unit safety provisions, and all oncology-specific MEP requirements." },
      { title: "Regulatory Approvals — AERB, Fire NOC, CEA & Building Permissions", description: "ARCHORA coordinates all regulatory submissions in parallel with design, including AERB eLORA applications, building plan approvals, fire NOC, and CEA registration support, to avoid delays between design completion and construction start." },
      { title: "Civil Construction & Specialist Builds", description: "Our teams execute all civil works including LINAC bunker construction, nuclear medicine department build, BMT unit, modular OT complex, chemotherapy unit, and all general hospital areas under integrated project management." },
      { title: "MEP Installation & Specialist Systems", description: "All MEP systems including oncology-specific HVAC, medical gas, redundant power, hazardous waste drainage, BMS, and nurse call systems are installed and tested to oncology facility standards." },
      { title: "Equipment Coordination & Infrastructure Validation", description: "We coordinate with LINAC manufacturers, PET-CT and nuclear medicine equipment suppliers, and all other major equipment vendors to ensure complete infrastructure readiness before equipment installation." },
      { title: "Systems Testing, AERB Inspection Support & Commissioning", description: "All systems are tested and commissioned. ARCHORA supports the AERB facility inspection process, prepares all required documentation, and ensures full compliance sign-off before the radiation oncology department is handed over." },
      { title: "NABH Readiness Assessment & Full Facility Handover", description: "A comprehensive NABH readiness walkthrough is conducted across all departments. All documentation and compliance records are completed and the facility is handed over commissioned, compliant, and ready for patient care." },
      { title: "Post-Commissioning Support", description: "ARCHORA remains available for post-handover infrastructure support, NABH and AERB assessment accompaniment, and future departmental expansion planning." },
    ],
    faqs: [
      { q: "What is the cost of building an oncology and cancer hospital in India?", a: "The cost typically ranges from ₹8 crore to ₹20 crore per bed, depending on the scope of radiation oncology infrastructure, nuclear medicine facilities, equipment, location, and finishing standards. A LINAC bunker alone can cost ₹3 crore to ₹8 crore to construct, depending on the machine type and shielding requirements." },
      { q: "What is an AERB radiation facility licence and why is it required for a cancer hospital?", a: "The AERB radiation facility licence is a mandatory regulatory clearance required for any facility that installs or operates radiation-generating or radioactive equipment, including linear accelerators, cobalt therapy units, brachytherapy devices, PET-CT scanners, and nuclear medicine equipment. Without AERB approval, a cancer hospital cannot legally operate its radiation oncology or nuclear medicine departments." },
      { q: "How is a LINAC bunker designed and what makes it different from regular construction?", a: "A LINAC bunker is a specialised structure designed to contain high-energy radiation produced during cancer treatment. It requires maze entry design to reduce scattered radiation, primary barrier walls that can be up to 2 metres thick in high-density concrete, secondary barriers, interlocking safety systems, specialised HVAC with high air change rates and ozone extraction, and earthquake-resistant structural design. The shielding calculations are performed by a qualified radiation physicist based on the specific machine energy levels and workload." },
      { q: "What infrastructure is needed for a bone marrow transplant unit?", a: "A bone marrow transplant unit requires HEPA-filtered positive pressure isolation rooms, anteroom vestibules for strict infection control, dedicated HVAC systems with 100% fresh air supply and HEPA filtration, specific room pressure monitoring, hospital-grade antimicrobial surfaces, dedicated medical gas outlets at every bed position, and full NABH critical care compliance." },
      { q: "How long does it take to build an oncology and cancer hospital in India?", a: "A dedicated oncology and cancer hospital typically requires 36 to 54 months from design to commissioning, depending on the scope of radiation oncology infrastructure, bed capacity, regulatory approval timelines, and equipment procurement schedules. AERB approvals can add 6 to 12 months to the programme if not managed proactively." },
      { q: "Can ARCHORA build a radiation oncology department within an existing hospital?", a: "Yes. ARCHORA designs and constructs radiation oncology departments and LINAC bunkers as standalone additions to existing hospital buildings. This involves a detailed structural and space feasibility assessment, coordination with existing building services, AERB shielding design, and careful construction management to avoid disruption to the operating hospital." },
      { q: "What nuclear medicine infrastructure does ARCHORA provide?", a: "ARCHORA designs and builds complete nuclear medicine departments including hot labs for radiopharmaceutical preparation, patient injection rooms, uptake rooms, SPECT and PET-CT scanner rooms with full radiation shielding, radioactive waste storage and decay rooms, dedicated ventilation systems for radioactive gases, and radioactive liquid waste drainage systems." },
    ],
    ctaHeading: "Building an Oncology or Cancer Hospital? You Need a Specialist, Not a Generalist.",
    ctaBody: "Oncology hospital infrastructure requires a level of technical expertise that very few infrastructure companies in India possess. Radiation shielding, AERB compliance, LINAC bunker construction, BMT unit design, and chemotherapy unit safety are not areas where learning on the job is acceptable.",
  },

  // ── Template for remaining facilities ────────────────────────────────────────
  "F-04": {
    id: "F-04", title: "Nursing Home & Small Hospital", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#4bd1d9", catLabel: "Hospitals", urlSlug: "/healthcare-facilities/nursing-home",
    intro: ["Nursing homes and small hospitals form the backbone of community healthcare delivery across India. Designing these facilities requires balancing compact footprints with full clinical functionality, NABH SHCO compliance, and the operational realities of smaller healthcare organisations.", "ARCHORA brings the same rigour it applies to large hospitals to every nursing home and small hospital project — delivering facilities that are safe, compliant, and built to last."],
    services: [
      { title: "Clinical Space Planning", description: "Compact, workflow-efficient layouts designed around NABH SHCO standards, with optimised patient flow and staff movement." },
      { title: "Modular OT Setup", description: "Laminar airflow OTs designed for the specific surgical scope of your facility, validated before handover." },
      { title: "MEP Engineering", description: "Medical gas pipelines, HVAC, UPS, and earthing systems designed to hospital grade — not residential or commercial grade." },
      { title: "NABH SHCO Compliance Support", description: "Full documentation preparation and readiness assessment for NABH Small Healthcare Organisation certification." },
      { title: "Turnkey Delivery", description: "Single point of accountability for architecture, structure, MEP, interiors, and commissioning." },
    ],
    compliance: [
      { name: "NABH SHCO or Entry Level Certification", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety certification for small healthcare organisations" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
      { name: "BCP — Occupancy Certificate", authority: "Local Municipal Authority", scope: "Building completion and occupancy certification" },
      { name: "NBC Compliance", authority: "National Building Code of India", scope: "Structural, fire, and building safety compliance" },
    ],
    process: [
      { title: "Feasibility Consultation", description: "Understanding your bed capacity, speciality scope, site, and budget before design begins." },
      { title: "Clinical Space Programming", description: "Defining every room, workflow, and adjacency requirement to NABH SHCO standards." },
      { title: "Design & Documentation", description: "Full architectural, structural, and MEP design to construction-ready specifications." },
      { title: "Regulatory Approvals", description: "Building plan, Fire NOC, CEA registration, and BCP coordination." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, modular OT, and interiors under strict project management. Full commissioning and NABH readiness walkthrough before handover." },
    ],
    faqs: [
      { q: "What is the cost of setting up a nursing home in India?", a: "Setup costs for a nursing home typically range from ₹1.5 crore to ₹5 crore depending on bed count, location, scope of services, and finishing standards. ARCHORA provides a detailed estimate after feasibility consultation." },
      { q: "What is NABH SHCO certification?", a: "NABH Small Healthcare Organisation (SHCO) certification is a quality and safety accreditation standard for hospitals with fewer than 50 beds. It is increasingly required for insurance empanelment and government scheme participation." },
      { q: "How long does it take to build a nursing home?", a: "A nursing home typically requires 12 to 24 months from design to commissioning depending on bed count, site conditions, and regulatory timelines." },
    ],
    ctaHeading: "Building a Nursing Home or Small Hospital?",
    ctaBody: "Quality infrastructure is not the exclusive preserve of large hospitals. ARCHORA brings the same clinical planning rigour and compliance expertise to every nursing home and small hospital project across India.",
  },

  "F-05": {
    id: "F-05", title: "Eye Care Hospital & Clinic", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#4bd1d9", catLabel: "Hospitals", urlSlug: "/healthcare-facilities/eye-care-hospital",
    intro: ["Eye care hospitals and clinics have specific infrastructure requirements — from dedicated ophthalmic OTs with precise laminar airflow and lighting control, to dark room facilities, optical refraction lanes, and laser vision correction suites.", "ARCHORA designs and builds eye care facilities that meet NABH Eye Care Organisation standards, optimising clinical workflow for high-volume outpatient models and surgical throughput."],
    services: [
      { title: "Ophthalmic OT Complex", description: "Laminar airflow OTs designed for cataract, retina, and cornea surgeries with precise lighting control, vibration isolation, and sterile field management." },
      { title: "Outpatient & Diagnostic Suite Planning", description: "Refraction lanes, slit lamp bays, visual field rooms, and imaging suite layouts optimised for high-volume outpatient efficiency." },
      { title: "Laser Vision Correction Suite", description: "Dedicated LASIK and refractive laser suites with vibration isolation, temperature and humidity control, and appropriate airflow design." },
      { title: "MEP & Clean Room Systems", description: "Hospital-grade HVAC, medical gas, UPS, and electrical systems tailored to eye care facility requirements." },
      { title: "NABH ECO Compliance Support", description: "Documentation preparation and readiness assessment for NABH Eye Care Organisation accreditation." },
    ],
    compliance: [
      { name: "NABH Eye Care Organisation (ECO) Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for eye care facilities" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
      { name: "NBC Compliance", authority: "National Building Code of India", scope: "Structural, fire, and building safety compliance" },
    ],
    process: [
      { title: "Feasibility & Clinical Brief", description: "Scoping surgical volume, outpatient throughput, equipment list, and site constraints." },
      { title: "Space Design & OT Planning", description: "Workflow-optimised layouts for OTs, OPD lanes, diagnostics, and support areas." },
      { title: "Design & Documentation", description: "Full architectural, structural, and MEP design coordinated across disciplines." },
      { title: "Regulatory Approvals", description: "Building plan, Fire NOC, and CEA registration coordination." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, modular OT, and interiors. OT validation and NABH ECO readiness walkthrough before handover." },
    ],
    faqs: [
      { q: "What infrastructure is needed for an eye care hospital?", a: "An eye care hospital requires ophthalmic modular OTs with laminar airflow, dedicated outpatient refraction and diagnostic lanes, dark rooms, imaging suites, and for larger facilities, laser vision correction suites with vibration isolation and climate control." },
      { q: "What is NABH ECO accreditation?", a: "NABH Eye Care Organisation (ECO) accreditation is a specific quality standard for standalone eye care hospitals and clinics, covering clinical standards, facility requirements, and patient safety protocols." },
    ],
    ctaHeading: "Planning an Eye Care Hospital or Clinic?",
    ctaBody: "Eye care infrastructure is a specialist domain. ARCHORA brings dedicated clinical planning, OT expertise, and NABH ECO compliance knowledge to every eye care project across India.",
  },

  "F-06": {
    id: "F-06", title: "Dental Hospital & Clinic", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#4bd1d9", catLabel: "Hospitals", urlSlug: "/healthcare-facilities/dental-hospital",
    intro: ["Dental hospitals and clinics require precise clinical space design — from ergonomic operatory layout and central suction and compressed air systems, to sterilisation rooms, imaging facilities, and X-ray compliance.", "ARCHORA designs and builds dental facilities to NABH Dental Healthcare Accreditation standards, ensuring every operatory, imaging room, and support area meets current regulatory requirements."],
    services: [
      { title: "Dental Operatory Planning & Design", description: "Ergonomic operatory layouts with correct chair spacing, ambidextrous access, natural light integration, and efficient clinical workflow." },
      { title: "Central Suction & Compressed Air Systems", description: "Medical-grade central dental suction and compressed air systems designed and installed for reliable, low-noise clinical operation." },
      { title: "Sterilisation Room Design", description: "CSSD-compliant sterilisation workflow design with correct dirty-to-clean separation, autoclave placement, and instrument tracking provisions." },
      { title: "Dental Imaging Suite", description: "Intraoral, panoramic, and CBCT imaging room design with correct X-ray shielding and AERB compliance provisions." },
      { title: "NABH Dental Accreditation Support", description: "Documentation and facility readiness assessment for NABH Dental Healthcare Accreditation." },
    ],
    compliance: [
      { name: "NABH Dental Healthcare Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for dental facilities" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
      { name: "AERB Compliance", authority: "Atomic Energy Regulatory Board", scope: "Required for dental X-ray and CBCT imaging facilities" },
    ],
    process: [
      { title: "Clinical Brief & Space Programming", description: "Defining chair count, scope of services, imaging requirements, and patient flow." },
      { title: "Design & Documentation", description: "Full architectural and MEP design including dental-specific systems." },
      { title: "Regulatory Approvals", description: "Building plan, Fire NOC, AERB, and CEA registration coordination." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, dental systems installation, and interiors. Full systems testing and NABH readiness walkthrough before handover." },
    ],
    faqs: [
      { q: "What compliance is needed for a dental hospital in India?", a: "A dental hospital requires CEA registration, Fire NOC, AERB compliance for imaging equipment, and NABH Dental Healthcare Accreditation for quality assurance and insurance empanelment." },
      { q: "What is a central dental suction system?", a: "A central dental suction system is a medical-grade vacuum system that serves all dental chairs in a facility from a single centralised unit, eliminating the noise and maintenance burden of individual chair-mounted suction systems." },
    ],
    ctaHeading: "Building a Dental Hospital or Clinic?",
    ctaBody: "Dental infrastructure has specific requirements that general contractors routinely get wrong. ARCHORA brings dedicated dental facility planning and NABH compliance expertise to every project.",
  },

  "F-07": {
    id: "F-07", title: "AYUSH Hospital", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#4bd1d9", catLabel: "Hospitals", urlSlug: "/healthcare-facilities/ayush-hospital",
    intro: ["AYUSH hospitals — encompassing Ayurveda, Yoga, Unani, Siddha, and Homeopathy — represent a growing and formally regulated segment of India's healthcare infrastructure. These facilities require purpose-designed treatment rooms, herbal pharmacy areas, Panchakarma suites, and clinical environments compliant with NABH AYUSH standards.", "ARCHORA designs and builds AYUSH hospitals that respect the therapeutic principles of traditional medicine while meeting modern infrastructure and safety standards."],
    services: [
      { title: "Panchakarma Suite Design", description: "Dedicated Panchakarma treatment rooms with correct drainage, temperature control, and materials that support traditional therapy protocols." },
      { title: "Herbal Pharmacy & Dispensary", description: "Compliant herbal pharmacy layouts with correct storage, dispensing, and preparation provisions." },
      { title: "Consultation & Treatment Room Planning", description: "Therapy-specific room design for each AYUSH discipline, with privacy, natural light, and ergonomic workflow." },
      { title: "Yoga & Meditation Centre Design", description: "Dedicated yoga and meditation halls with acoustic design, natural light, and ventilation appropriate to therapeutic practice." },
      { title: "NABH AYUSH Compliance Support", description: "Documentation and readiness assessment for NABH AYUSH Hospital Accreditation." },
    ],
    compliance: [
      { name: "NABH AYUSH Hospital Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for AYUSH hospitals" },
      { name: "AYUSH Ministry Registration", authority: "Ministry of AYUSH", scope: "Central government registration for AYUSH facilities" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "Clinical Brief & Therapy Scope", description: "Understanding your AYUSH disciplines, treatment modalities, bed count, and site constraints." },
      { title: "Space Design", description: "Purpose-designed layouts for each therapy type, pharmacy, consultation, and support areas." },
      { title: "Design & Documentation", description: "Full architectural and MEP design to construction-ready specifications." },
      { title: "Regulatory Approvals", description: "Building plan, Fire NOC, CEA, and AYUSH Ministry registration support." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, interiors, and NABH AYUSH readiness walkthrough before handover." },
    ],
    faqs: [
      { q: "What NABH accreditation is available for AYUSH hospitals?", a: "NABH provides dedicated AYUSH Hospital Accreditation standards covering clinical, facility, and safety requirements specific to Ayurveda, Yoga, Naturopathy, Unani, Siddha, and Homeopathy hospitals." },
      { q: "Does an AYUSH hospital need CEA registration?", a: "Yes. All clinical establishments in India, including AYUSH hospitals, are required to register under the Clinical Establishments Act." },
    ],
    ctaHeading: "Building an AYUSH Hospital?",
    ctaBody: "AYUSH infrastructure requires an understanding of both traditional therapy requirements and modern regulatory compliance. ARCHORA brings that combined expertise to every AYUSH hospital project.",
  },

  "F-08": {
    id: "F-08", title: "Rehabilitation & Care Home", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#4bd1d9", catLabel: "Hospitals", urlSlug: "/healthcare-facilities/rehabilitation-care-home",
    intro: ["Rehabilitation hospitals and care homes serve some of the most vulnerable patient populations — requiring environments that are safe, accessible, therapeutically supportive, and operationally efficient for long-stay clinical care.", "ARCHORA designs and builds rehabilitation and care home facilities to NABH Care Homes Accreditation standards, creating spaces that support recovery and dignified living."],
    services: [
      { title: "Rehabilitation Ward & Therapy Suite Design", description: "Ward layouts and physiotherapy, occupational therapy, and speech therapy suites designed around rehabilitation clinical pathways." },
      { title: "Accessibility & Barrier-Free Design", description: "Full compliance with NBC accessibility standards including ramp gradients, corridor widths, grab rail provisions, and assisted bathroom design." },
      { title: "Long-Stay Patient Room Design", description: "Dignified, functional patient rooms designed for long-stay comfort with adequate storage, natural light, and medical infrastructure." },
      { title: "MEP Engineering for Care Environments", description: "Nurse call systems, medical gas, HVAC, UPS, and accessible bathroom fittings designed for 24-hour care environments." },
      { title: "NABH Care Homes Compliance Support", description: "Documentation and readiness assessment for NABH Care Homes Accreditation." },
    ],
    compliance: [
      { name: "NABH Care Homes Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for care homes and rehabilitation facilities" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
      { name: "NBC Accessibility Compliance", authority: "National Building Code of India", scope: "Barrier-free access and accessibility provisions" },
    ],
    process: [
      { title: "Clinical Brief & Resident Profile", description: "Defining care model, resident acuity, therapy scope, and site constraints." },
      { title: "Space Design & Accessibility Planning", description: "Barrier-free, therapy-integrated layouts for wards, common areas, and support spaces." },
      { title: "Design & Documentation", description: "Full architectural and MEP design to construction-ready specifications." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, interiors, accessibility provisions, and NABH Care Homes readiness walkthrough before handover." },
    ],
    faqs: [
      { q: "What NABH accreditation applies to care homes?", a: "NABH provides dedicated Care Homes Accreditation standards covering clinical care, facility safety, infection control, and patient rights for residential care and rehabilitation facilities." },
      { q: "What accessibility standards must a care home meet in India?", a: "Care homes must comply with NBC Part 8 accessibility provisions, covering corridor widths, ramp gradients, lift dimensions, bathroom design, grab rail placements, and wayfinding for mobility-impaired residents." },
    ],
    ctaHeading: "Planning a Rehabilitation or Care Home Facility?",
    ctaBody: "Rehabilitation and care home infrastructure requires sensitivity to both clinical needs and lived experience. ARCHORA brings both to every project.",
  },

  "F-09": {
    id: "F-09", title: "Cardiac Hospital & Cath Lab", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#4bd1d9", catLabel: "Hospitals", urlSlug: "/healthcare-facilities/cardiac-hospital",
    intro: ["Cardiac hospitals and catheterisation labs demand some of the most technically demanding infrastructure in healthcare — combining radiation-compliant interventional suites, specialised cardiac ICUs, hybrid OTs, and advanced MEP systems into a cohesive clinical environment.", "ARCHORA has specific expertise in cardiac hospital infrastructure, delivering NABH HCO and AERB-compliant facilities built around cardiac clinical pathways."],
    services: [
      { title: "Cardiac Catheterisation Lab Design & Construction", description: "Complete cath lab infrastructure including radiation shielding, dedicated electrical systems, AERB-compliant design, control room integration, medical gas, and HVAC with specific air change requirements." },
      { title: "Cardiac ICU Design", description: "High-acuity cardiac ICU environments with NABH-compliant bed bay sizing, haemodynamic monitoring infrastructure, medical gas, and HVAC pressurisation." },
      { title: "Hybrid OT Complex", description: "Cardiac hybrid OTs combining surgical and interventional capabilities with radiation shielding, imaging system integration, laminar airflow, and full sterile field compliance." },
      { title: "Echocardiography & Non-Invasive Cardiology Suite", description: "Echo labs, stress test rooms, Holter recording facilities, and non-invasive diagnostic suites designed for high-volume cardiac outpatient workflow." },
      { title: "AERB Compliance for Cath Labs", description: "Complete AERB eLORA radiation compliance process for cardiac catheterisation labs, including shielding design, radiation safety officer provisions, and inspection support." },
    ],
    compliance: [
      { name: "NABH HCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Mandatory quality and safety accreditation for the hospital" },
      { name: "AERB Clearance (Cath Lab)", authority: "Atomic Energy Regulatory Board", scope: "Mandatory radiation compliance for cardiac catheterisation labs" },
      { name: "AERB eLORA Approval", authority: "Atomic Energy Regulatory Board", scope: "Online regulatory approval for radiation equipment installation" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
      { name: "NBC Compliance", authority: "National Building Code of India", scope: "Structural, fire, and building safety compliance" },
    ],
    process: [
      { title: "Cardiac Programme Planning", description: "Scoping cardiac services, interventional volume, ICU requirements, and equipment plans." },
      { title: "Cath Lab & AERB Design", description: "Radiation physics consultation, shielding design, and AERB submission documentation prepared in parallel with architectural design." },
      { title: "Detailed Design", description: "Full architectural, structural, and MEP design across all cardiac departments." },
      { title: "Regulatory Approvals", description: "AERB eLORA, building plan, Fire NOC, and CEA registration coordination." },
      { title: "Construction & Commissioning", description: "Civil works, radiation shielding, MEP, hybrid OT, and cardiac ICU construction. Systems testing, AERB inspection support, and NABH readiness walkthrough before handover." },
    ],
    faqs: [
      { q: "What AERB compliance is required for a cath lab?", a: "A cardiac catheterisation lab requires AERB radiation facility licence, eLORA approval for the C-arm or fixed angiography system, radiation shielding design validated by a qualified radiation physicist, and a designated Radiation Safety Officer." },
      { q: "What is a cardiac hybrid OT?", a: "A cardiac hybrid OT combines a surgical operating theatre with an interventional radiology or catheterisation suite, allowing complex cardiac procedures to be performed that require both surgical access and imaging guidance in the same sterile environment." },
    ],
    ctaHeading: "Building a Cardiac Hospital or Cath Lab?",
    ctaBody: "Cardiac infrastructure is one of the most technically demanding domains in hospital construction. ARCHORA brings dedicated cardiac planning expertise, AERB compliance capability, and proven cath lab delivery to every project.",
  },

  "F-10": {
    id: "F-10", title: "Diagnostic Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#7eb8f7", catLabel: "Diagnostic & Imaging", urlSlug: "/healthcare-facilities/diagnostic-centre",
    intro: ["Diagnostic centres are the entry point for clinical decision-making across the healthcare system. Designing a high-performance diagnostic centre requires balancing patient throughput, imaging room technical requirements, laboratory workflow, radiation compliance, and NABH MIS accreditation standards.", "ARCHORA designs and builds diagnostic centres that are built for clinical efficiency, regulatory compliance, and long-term operational performance."],
    services: [
      { title: "Diagnostic Suite Layout Planning", description: "Patient flow-optimised layouts integrating radiology, pathology, ultrasound, and reporting areas." },
      { title: "Imaging Room Technical Design", description: "X-ray, CT, MRI, and ultrasound room design with correct shielding, equipment foundations, and MEP provisions." },
      { title: "AERB eLORA Compliance", description: "Complete AERB radiation compliance for X-ray, CT, and MRI facilities including shielding design and regulatory submissions." },
      { title: "Laboratory Infrastructure", description: "NABL-compliant laboratory environments with correct ventilation, biosafety provisions, and cold chain infrastructure." },
      { title: "NABH MIS Accreditation Support", description: "Documentation and readiness assessment for NABH Medical Imaging Services accreditation." },
    ],
    compliance: [
      { name: "NABH MIS Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for medical imaging services" },
      { name: "NABL Accreditation", authority: "National Accreditation Board for Testing and Calibration Laboratories", scope: "Laboratory quality accreditation (ISO 15189)" },
      { name: "AERB eLORA", authority: "Atomic Energy Regulatory Board", scope: "Radiation compliance for X-ray, CT, and MRI" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
    ],
    process: [
      { title: "Service Scope & Equipment Planning", description: "Defining modalities, throughput volumes, and equipment list before design begins." },
      { title: "Technical Room Design", description: "Imaging room layouts, shielding calculations, and AERB documentation." },
      { title: "Design & Approvals", description: "Full design and regulatory submission coordination." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, shielding construction, and equipment coordination. NABH readiness walkthrough before handover." },
    ],
    faqs: [
      { q: "What compliance is needed for a diagnostic centre in India?", a: "A diagnostic centre requires CEA registration, AERB eLORA approval for radiation equipment, NABH MIS accreditation for quality assurance, and NABL accreditation for laboratory services." },
    ],
    ctaHeading: "Building a Diagnostic Centre?",
    ctaBody: "Diagnostic centre infrastructure requires technical precision across imaging, laboratory, and compliance domains. ARCHORA delivers all three under one integrated team.",
  },

  "F-11": {
    id: "F-11", title: "Radiology & Imaging Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#7eb8f7", catLabel: "Diagnostic & Imaging", urlSlug: "/healthcare-facilities/radiology-imaging",
    intro: ["Radiology and imaging centres house some of the most infrastructure-intensive clinical equipment in healthcare — from multi-tonne MRI magnets requiring specialist foundations and RF shielding, to CT scanners needing precise radiation shielding and high-capacity power systems.", "ARCHORA's radiology infrastructure team designs and builds imaging centres with the technical precision that high-value equipment demands."],
    services: [
      { title: "MRI Suite Design", description: "RF-shielded MRI rooms with correct magnet foundations, quench pipe routing, cryogen venting, and dedicated electrical systems." },
      { title: "CT Scanner Room Design", description: "Radiation-shielded CT rooms with correct gantry pit design, power provisions, and HVAC for heat load management." },
      { title: "X-ray & Fluoroscopy Room Design", description: "AERB-compliant X-ray and fluoroscopy room design with primary and secondary barrier shielding calculations." },
      { title: "Mammography Suite Design", description: "Dedicated mammography suites with correct shielding, patient privacy provisions, and AERB compliance." },
      { title: "AERB eLORA Full Compliance", description: "Complete AERB radiation compliance management for all imaging modalities." },
    ],
    compliance: [
      { name: "NABH MIS Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for medical imaging services" },
      { name: "AERB eLORA", authority: "Atomic Energy Regulatory Board", scope: "Radiation compliance for all imaging modalities" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
    ],
    process: [
      { title: "Equipment & Modality Planning", description: "Understanding the full equipment list, installation requirements, and phasing plans." },
      { title: "Technical Room Design", description: "Shielding calculations, MRI RF shielding, equipment foundations, and MEP design." },
      { title: "Design & Regulatory Approvals", description: "AERB eLORA submissions and building approvals coordinated in parallel." },
      { title: "Construction & Commissioning", description: "Civil works, specialist shielding, MEP, and equipment installation coordination. Systems testing and handover." },
    ],
    faqs: [
      { q: "What specialist infrastructure does an MRI suite require?", a: "An MRI suite requires RF (Faraday cage) shielding to prevent external interference, a reinforced concrete pad sized for the magnet weight, quench pipe routing for helium venting, a dedicated electrical supply with correct power conditioning, and HVAC systems managing the significant heat load from the magnet cooling system." },
    ],
    ctaHeading: "Planning a Radiology or Imaging Centre?",
    ctaBody: "Imaging infrastructure demands a level of technical precision that very few contractors can deliver. ARCHORA's radiology infrastructure team has the expertise your project requires.",
  },

  "F-12": {
    id: "F-12", title: "Nuclear Medicine Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#7eb8f7", catLabel: "Diagnostic & Imaging", urlSlug: "/healthcare-facilities/nuclear-medicine",
    intro: ["Nuclear medicine centres are among the most heavily regulated and technically demanding healthcare facilities. They require handling, administration, and disposal of radioactive materials under strict AERB control, with purpose-designed hot labs, injection rooms, uptake rooms, scanner rooms, and radioactive waste management infrastructure.", "ARCHORA designs and builds nuclear medicine facilities to full AERB radiation facility licence requirements."],
    services: [
      { title: "Hot Lab Design", description: "Radiopharmaceutical preparation hot labs with correct shielding, ventilation, fume extraction, and contamination control provisions." },
      { title: "Patient Uptake & Injection Room Design", description: "Lead-shielded patient uptake rooms with correct ventilation and dose administration provisions." },
      { title: "SPECT & PET-CT Scanner Room Design", description: "Heavily shielded scanner rooms designed for the specific shielding requirements of SPECT and PET-CT systems." },
      { title: "Radioactive Waste Management Infrastructure", description: "Decay storage rooms, radioactive liquid waste drainage, and waste management systems compliant with AERB and PCB guidelines." },
      { title: "Full AERB Compliance Management", description: "Complete AERB radiation facility licence process management including shielding design, eLORA submissions, and inspection support." },
    ],
    compliance: [
      { name: "AERB Radiation Facility Licence", authority: "Atomic Energy Regulatory Board", scope: "Mandatory for nuclear medicine facilities handling radioactive materials" },
      { name: "AERB eLORA Approval", authority: "Atomic Energy Regulatory Board", scope: "Online regulatory approval for nuclear medicine equipment" },
      { name: "NABH MIS Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for medical imaging services" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Radioactive Waste Disposal Compliance", authority: "AERB and PCB Guidelines", scope: "Safe handling and disposal of radioactive waste" },
    ],
    process: [
      { title: "Radiation Physics Consultation", description: "Defining shielding requirements, waste management approach, and AERB submission strategy." },
      { title: "Technical Design", description: "Hot lab, scanner rooms, waste infrastructure, and building services design with radiation physicist validation." },
      { title: "AERB Regulatory Submissions", description: "Full eLORA application and AERB approval coordination." },
      { title: "Construction & Commissioning", description: "Specialist shielding construction, MEP, and equipment coordination. AERB inspection support and facility commissioning." },
    ],
    faqs: [
      { q: "What is a hot lab in a nuclear medicine centre?", a: "A hot lab is a shielded room in a nuclear medicine department where radiopharmaceuticals (radioactive drugs) are prepared, dispensed, and quality controlled before administration to patients. It requires lead or concrete shielding, specialised ventilation with HEPA filtration, fume extraction, radiation monitoring systems, and contamination control provisions." },
    ],
    ctaHeading: "Building a Nuclear Medicine Centre?",
    ctaBody: "Nuclear medicine infrastructure requires specialist expertise in radiation shielding, AERB compliance, and radioactive material handling. ARCHORA has that expertise.",
  },

  "F-13": {
    id: "F-13", title: "PET-CT & Advanced Imaging Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#7eb8f7", catLabel: "Diagnostic & Imaging", urlSlug: "/healthcare-facilities/pet-ct-imaging",
    intro: ["PET-CT centres combine nuclear medicine's radioactive tracer administration with high-resolution CT imaging — creating facilities that require both radiation shielding to AERB nuclear medicine standards and CT room technical design in a single integrated environment.", "ARCHORA designs and builds PET-CT and advanced imaging centres to the full scope of AERB radiation facility licence requirements."],
    services: [
      { title: "PET-CT Scanner Room Design", description: "Heavily shielded PET-CT rooms with correct primary and secondary barrier calculations, patient injection and uptake room sequence, and dedicated MEP systems." },
      { title: "Radiopharmaceutical Dispensing Infrastructure", description: "Hot cell or dispensing unit provisions for FDG and other tracers, with shielding, ventilation, and waste management design." },
      { title: "Patient Flow & Uptake Room Sequence", description: "Correct patient pathway design from tracer injection through uptake period to scanning, with shielded uptake rooms and correct workflow separation." },
      { title: "AERB Full Compliance Management", description: "Complete AERB radiation facility licence and eLORA process for PET-CT facilities." },
    ],
    compliance: [
      { name: "AERB Radiation Facility Licence", authority: "Atomic Energy Regulatory Board", scope: "Mandatory for PET-CT facilities using radioactive tracers" },
      { name: "AERB eLORA Approval", authority: "Atomic Energy Regulatory Board", scope: "Online regulatory approval for PET-CT equipment and radioactive material handling" },
      { name: "NABH MIS Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for medical imaging services" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
    ],
    process: [
      { title: "Feasibility & Equipment Planning", description: "Scanner selection, site assessment, and AERB compliance strategy." },
      { title: "Radiation Physics Design", description: "Shielding calculations and AERB documentation for PET-CT and radiopharmaceutical handling areas." },
      { title: "Design & Regulatory Submissions", description: "Full architectural, MEP design, and AERB eLORA applications." },
      { title: "Construction & Commissioning", description: "Specialist shielding, MEP, and scanner installation coordination. AERB inspection support and commissioning." },
    ],
    faqs: [
      { q: "Why does a PET-CT centre need more shielding than a standard CT scanner room?", a: "PET imaging uses radioactive tracers that emit positron radiation — which in turn produces annihilation photons at 511 keV, significantly higher energy than standard X-ray CT radiation. This requires substantially thicker shielding for scanner rooms, uptake rooms, and injection areas, calculated specifically for PET-CT workload." },
    ],
    ctaHeading: "Planning a PET-CT or Advanced Imaging Centre?",
    ctaBody: "PET-CT infrastructure sits at the intersection of nuclear medicine and advanced diagnostic imaging. ARCHORA has the combined AERB compliance and imaging facility expertise your project needs.",
  },

  "F-14": {
    id: "F-14", title: "Clinical Pathology Laboratory", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#a78bfa", catLabel: "Laboratories", urlSlug: "/healthcare-facilities/clinical-pathology-lab",
    intro: ["Clinical pathology laboratories serve as the diagnostic backbone of healthcare systems. Designing a high-performance pathology lab requires correct biosafety zoning, specimen flow optimisation, chemical and biohazard storage compliance, and NABL-compliant quality environments.", "ARCHORA designs and builds pathology laboratories to ISO 15189 and NABL accreditation standards."],
    services: [
      { title: "Laboratory Workflow Design", description: "Specimen reception, processing, analysis, and reporting area layouts optimised for throughput and contamination control." },
      { title: "Biosafety Zoning & Containment Design", description: "Correct biosafety level provisions, pressure relationships, PPE stations, and decontamination provisions." },
      { title: "Chemical Storage & Fume Extraction", description: "Compliant chemical storage rooms, fume extraction systems, and hazardous waste management provisions." },
      { title: "Cold Chain Infrastructure", description: "Reagent and specimen storage cold rooms, refrigeration, and LN2 infrastructure." },
      { title: "NABL Compliance Support", description: "Facility documentation and readiness assessment for NABL ISO 15189 accreditation." },
    ],
    compliance: [
      { name: "NABL Accreditation (ISO 15189)", authority: "National Accreditation Board for Testing and Calibration Laboratories", scope: "Quality management system for medical laboratories" },
      { name: "NABH Medical Laboratory Certification", authority: "National Accreditation Board for Hospitals", scope: "NABH quality certification for medical laboratories" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Biosafety Compliance", authority: "Department of Biotechnology", scope: "Biosafety level compliance for biological sample handling" },
    ],
    process: [
      { title: "Laboratory Scope & Workflow Planning", description: "Defining test menu, throughput volumes, equipment list, and biosafety requirements." },
      { title: "Technical Design", description: "Laboratory layout, biosafety zoning, MEP, and cold chain infrastructure design." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, laboratory fittings, and fume extraction installation. NABL readiness walkthrough before handover." },
    ],
    faqs: [
      { q: "What is NABL ISO 15189 accreditation?", a: "ISO 15189 is the international standard for medical laboratories, covering quality management systems, technical competence, and measurement uncertainty. NABL (National Accreditation Board for Testing and Calibration Laboratories) administers this accreditation in India, and it is increasingly required for insurance empanelment and regulatory recognition." },
    ],
    ctaHeading: "Building a Clinical Pathology Laboratory?",
    ctaBody: "Laboratory infrastructure is a specialist domain. ARCHORA brings NABL-focused design expertise to every pathology lab project.",
  },

  "F-15": {
    id: "F-15", title: "Biochemistry & Microbiology Laboratory", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#a78bfa", catLabel: "Laboratories", urlSlug: "/healthcare-facilities/biochemistry-microbiology-lab",
    intro: ["Biochemistry and microbiology laboratories require specific biosafety provisions, chemical handling compliance, and workflow designs that separate high-risk biological samples from general laboratory operations.", "ARCHORA designs and builds biochemistry and microbiology laboratories to NABL and biosafety compliance standards."],
    services: [
      { title: "Microbiology Suite Design", description: "BSL-2 compliant microbiology areas with correct pressure relationships, biosafety cabinets, autoclave placement, and decontamination provisions." },
      { title: "Biochemistry Analyser Room Layout", description: "Workflow-optimised biochemistry analyser areas with correct power, plumbing, and ventilation for high-volume automated analysers." },
      { title: "Biosafety Cabinet Installation Planning", description: "Correct placement, clearances, exhaust routing, and HVAC integration for Class II biological safety cabinets." },
      { title: "Chemical Storage & Hazardous Waste", description: "Compliant chemical stores, secondary containment, fume extraction, and biohazardous waste management provisions." },
    ],
    compliance: [
      { name: "NABL Accreditation (ISO 15189)", authority: "National Accreditation Board for Testing and Calibration Laboratories", scope: "Quality management system for medical laboratories" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Biosafety Compliance", authority: "Department of Biotechnology", scope: "Biosafety level compliance for biological and chemical handling" },
    ],
    process: [
      { title: "Scope & Biosafety Risk Assessment", description: "Defining test scope, biological risk level, and chemical handling requirements." },
      { title: "Technical Design", description: "BSL-compliant layouts, MEP, biosafety cabinet integration, and chemical storage." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, laboratory fittings, and NABL readiness walkthrough." },
    ],
    faqs: [
      { q: "What biosafety level is required for a clinical microbiology laboratory?", a: "Most clinical microbiology laboratories handling patient diagnostic specimens require Biosafety Level 2 (BSL-2) provisions, including biosafety cabinets, autoclave access, controlled access, and personal protective equipment stations. Reference laboratories handling highly infectious agents may require BSL-3 provisions." },
    ],
    ctaHeading: "Building a Biochemistry or Microbiology Laboratory?",
    ctaBody: "Laboratory biosafety and NABL compliance require an infrastructure partner who understands both. ARCHORA brings that expertise to every project.",
  },

  "F-16": {
    id: "F-16", title: "Blood Bank", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#a78bfa", catLabel: "Laboratories", urlSlug: "/healthcare-facilities/blood-bank",
    intro: ["Blood banks are among the most strictly regulated clinical facilities in India — requiring compliance with the Drugs and Cosmetics Act, NABH Blood Bank Accreditation, and specific facility standards for blood collection, processing, testing, storage, and issue.", "ARCHORA designs and builds blood bank facilities to the full scope of regulatory and accreditation requirements."],
    services: [
      { title: "Blood Bank Workflow Design", description: "Donor area, collection, component separation, serology testing, storage, and issue area layouts designed for correct unidirectional workflow and contamination prevention." },
      { title: "Cold Storage Infrastructure", description: "Blood refrigerator bays, platelet agitator provisions, plasma freezer infrastructure, and cold chain monitoring systems." },
      { title: "Component Separation Room", description: "Clean room provisions for blood component preparation with correct air quality, temperature control, and biosafety provisions." },
      { title: "Donor Screening & Rest Area", description: "Compliant donor registration, screening, collection, and post-donation rest area design." },
      { title: "NABH Blood Bank Accreditation Support", description: "Documentation and readiness assessment for NABH Blood Bank Accreditation." },
    ],
    compliance: [
      { name: "NABH Blood Bank Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for blood banks" },
      { name: "Drugs & Cosmetics Act Licence", authority: "Central Drugs Standard Control Organisation", scope: "Mandatory blood bank licence under Schedule F Part XII" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
    ],
    process: [
      { title: "Scope & Regulatory Brief", description: "Defining collection volume, component preparation scope, and storage capacity." },
      { title: "Technical Design", description: "Workflow-compliant layouts, cold storage infrastructure, and MEP design." },
      { title: "Approvals & Construction", description: "Drugs licence support, building approvals, civil works, and MEP installation." },
      { title: "Commissioning & Accreditation Readiness", description: "Equipment commissioning and NABH Blood Bank readiness walkthrough." },
    ],
    faqs: [
      { q: "What licences are required for a blood bank in India?", a: "A blood bank in India requires a blood bank licence under Schedule F Part XII of the Drugs and Cosmetics Act from the State Drugs Controller, CEA registration, and NABH Blood Bank Accreditation for quality assurance and insurance empanelment." },
    ],
    ctaHeading: "Building a Blood Bank?",
    ctaBody: "Blood bank infrastructure requires expertise in regulatory compliance, cold chain systems, and clinical workflow design. ARCHORA delivers all three.",
  },

  "F-17": {
    id: "F-17", title: "Molecular & Genetics Laboratory", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#a78bfa", catLabel: "Laboratories", urlSlug: "/healthcare-facilities/molecular-genetics-lab",
    intro: ["Molecular and genetics laboratories require highly specialised infrastructure — including contamination-controlled PCR room sequences, biosafety provisions, and dedicated ventilation systems that prevent cross-contamination between pre- and post-amplification areas.", "ARCHORA designs and builds molecular diagnostics and genetics laboratories to NABL and biosafety compliance standards."],
    services: [
      { title: "PCR Room Sequence Design", description: "Pre-amplification, amplification, and post-amplification room sequence with correct pressure relationships, unidirectional workflow, and contamination prevention provisions." },
      { title: "Next-Generation Sequencing Infrastructure", description: "Dedicated NGS room layouts with correct temperature control, vibration isolation for sequencing instruments, and power provisions." },
      { title: "Biosafety Provisions", description: "Biosafety cabinet integration, HEPA filtration, and decontamination provisions appropriate to the biological risk level of the work." },
      { title: "NABL Compliance Support", description: "Documentation and readiness assessment for NABL ISO 15189 accreditation for molecular diagnostics." },
    ],
    compliance: [
      { name: "NABL Accreditation (ISO 15189)", authority: "National Accreditation Board for Testing and Calibration Laboratories", scope: "Quality management system for medical and molecular laboratories" },
      { name: "Biosafety Level Compliance", authority: "Department of Biotechnology", scope: "Biosafety provisions for molecular and genetic material handling" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
    ],
    process: [
      { title: "Test Scope & Biosafety Planning", description: "Defining molecular test menu, amplification risk, and biosafety requirements." },
      { title: "PCR Sequence & Technical Design", description: "Room sequence, pressure relationships, MEP, and biosafety cabinet integration." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, specialist fittings, and NABL readiness walkthrough." },
    ],
    faqs: [
      { q: "Why do PCR laboratories require a specific room sequence?", a: "PCR amplification produces enormous quantities of DNA that can contaminate pre-amplification areas if not correctly segregated. A correct PCR laboratory has physically separate rooms for pre-amplification (sample prep and reaction setup) and post-amplification (amplification and detection), with a unidirectional workflow — material and personnel only move in one direction through the sequence, and the rooms are at different pressure relationships to prevent cross-contamination." },
    ],
    ctaHeading: "Building a Molecular or Genetics Laboratory?",
    ctaBody: "Molecular laboratory infrastructure requires an understanding of contamination control, biosafety, and NABL compliance that general contractors cannot provide. ARCHORA can.",
  },

  "F-18": {
    id: "F-18", title: "Research & Clinical Trial Laboratory", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#a78bfa", catLabel: "Laboratories", urlSlug: "/healthcare-facilities/research-clinical-trial-lab",
    intro: ["Research and clinical trial laboratories supporting pharmaceutical and academic research require GCP-compliant environments, NABL accreditation, ethics committee provisions, and often specialised containment and biosafety infrastructure.", "ARCHORA designs and builds research laboratory environments that meet NABL, ICH-GCP, and institutional biosafety requirements."],
    services: [
      { title: "GCP-Compliant Laboratory Design", description: "Research laboratory layouts designed to ICH-GCP and regulatory agency requirements for clinical trial sample handling and analysis." },
      { title: "Ethics Committee Room & Documentation Suite", description: "Dedicated ethics committee meeting rooms, document storage, and archiving provisions." },
      { title: "Biorepository & Sample Storage Infrastructure", description: "Long-term biorepository design with ULT freezer bays, LN2 storage, sample tracking infrastructure, and backup power provisions." },
      { title: "Specialist Containment Provisions", description: "BSL-2 and BSL-3 containment provisions for research with higher biological risk profiles." },
    ],
    compliance: [
      { name: "NABL Accreditation", authority: "National Accreditation Board for Testing and Calibration Laboratories", scope: "Quality management for research and clinical trial laboratories" },
      { name: "NABH Ethics Committee Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Accreditation for ethics committees overseeing clinical trials" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Biosafety Compliance", authority: "Department of Biotechnology", scope: "Containment provisions for biological research" },
    ],
    process: [
      { title: "Research Programme Brief", description: "Scoping research activities, biosafety risk, GCP requirements, and sample storage needs." },
      { title: "Technical Design", description: "GCP-compliant layouts, containment provisions, biorepository, and MEP design." },
      { title: "Construction & Commissioning", description: "Civil works, specialist laboratory fittings, MEP, and NABL readiness walkthrough." },
    ],
    faqs: [
      { q: "What does GCP compliance mean for a clinical trial laboratory?", a: "ICH Good Clinical Practice (GCP) sets international standards for clinical trial conduct, including laboratory sample handling, chain of custody, documentation, equipment calibration, and quality management. A GCP-compliant laboratory infrastructure supports these requirements through correct workflow design, documented procedures, and NABL-accredited quality systems." },
    ],
    ctaHeading: "Building a Research or Clinical Trial Laboratory?",
    ctaBody: "Research laboratory infrastructure requires an understanding of GCP compliance, biosafety, and NABL requirements. ARCHORA delivers all three.",
  },

  "F-19": {
    id: "F-19", title: "IVF Lab & Fertility Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#34d399", catLabel: "Fertility & Reproductive Health", urlSlug: "/healthcare-facilities/ivf-lab-fertility-centre",
    intro: ["IVF laboratories and fertility centres are among the most environmentally sensitive clinical facilities — embryo culture environments require ultra-low levels of volatile organic compounds, precise temperature stability, and meticulous contamination control that most construction teams do not understand.", "ARCHORA designs and builds IVF and fertility facilities to ART Act 2021, ICMR, and NABH SHCO standards."],
    services: [
      { title: "IVF Laboratory Environmental Design", description: "Ultra-low VOC materials specification, HEPA-filtered positive pressure air systems, temperature stability provisions, and contamination control design for embryo culture environments." },
      { title: "Embryology Lab Layout Planning", description: "Workstation, incubator, microscope, and cryostorage area layouts optimised for clinical workflow and environmental stability." },
      { title: "Clean Room Design & Validation", description: "ISO-classified clean room design for IVF laboratories with air quality monitoring provisions and validation protocols." },
      { title: "ART Act 2021 & ICMR Compliance Support", description: "Documentation preparation and facility readiness assessment for ART Act registration and ICMR accreditation." },
    ],
    compliance: [
      { name: "ART (Regulation) Act 2021", authority: "Ministry of Health & Family Welfare", scope: "Mandatory registration and regulation of ART clinics and banks" },
      { name: "ICMR Registration", authority: "Indian Council of Medical Research", scope: "Quality and safety registration for ART clinics" },
      { name: "NABH SHCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality accreditation for small healthcare organisations" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "IVF Lab Brief & Environmental Specification", description: "Defining embryology scope, environmental targets, and clean room classification." },
      { title: "Technical Design", description: "Clean room design, VOC-free materials specification, HVAC, and embryology lab layout." },
      { title: "Construction & Commissioning", description: "Specialist construction, MEP, clean room validation, and ART Act compliance documentation." },
    ],
    faqs: [
      { q: "Why is the IVF laboratory environment so critical?", a: "Embryos are extremely sensitive to volatile organic compounds (VOCs) from construction materials, cleaning products, and HVAC systems, as well as temperature fluctuations and vibration. Even low-level contamination can significantly reduce fertilisation and implantation rates. IVF laboratory design requires ultra-low VOC materials, dedicated HEPA-filtered air systems, precise temperature control, vibration-isolated workstations, and strict contamination control protocols." },
    ],
    ctaHeading: "Building an IVF Lab or Fertility Centre?",
    ctaBody: "IVF laboratory infrastructure requires specialist knowledge of embryology environment requirements that no general contractor possesses. ARCHORA brings that knowledge to every fertility centre project.",
  },

  "F-20": {
    id: "F-20", title: "Surrogacy Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#34d399", catLabel: "Fertility & Reproductive Health", urlSlug: "/healthcare-facilities/surrogacy-centre",
    intro: ["Surrogacy centres in India operate under the Surrogacy (Regulation) Act 2021 and require registration with the State Surrogacy Board, ART clinic registration, and appropriate clinical infrastructure for surrogate assessment, monitoring, and care.", "ARCHORA designs and builds surrogacy centre infrastructure to the regulatory and clinical requirements of India's surrogacy framework."],
    services: [
      { title: "Clinical Suite Design for Surrogate Care", description: "Consultation, examination, and monitoring room layouts designed for surrogate health assessment and ongoing pregnancy care." },
      { title: "ART Clinic Infrastructure Integration", description: "IVF and embryo transfer infrastructure compliant with ART Act 2021 requirements." },
      { title: "Regulatory Compliance Support", description: "Documentation and facility readiness assessment for State Surrogacy Board registration and ART Act registration." },
    ],
    compliance: [
      { name: "Surrogacy (Regulation) Act 2021", authority: "State Surrogacy Board", scope: "Mandatory registration and regulation of surrogacy clinics" },
      { name: "ART (Regulation) Act 2021", authority: "Ministry of Health & Family Welfare", scope: "ART clinic registration for embryo transfer services" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
    ],
    process: [
      { title: "Regulatory & Clinical Brief", description: "Understanding regulatory requirements and clinical service scope." },
      { title: "Design & Documentation", description: "Clinical space design and regulatory compliance documentation." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, and regulatory readiness walkthrough." },
    ],
    faqs: [
      { q: "What registration is required for a surrogacy centre in India?", a: "A surrogacy centre in India must register with the State Surrogacy Board under the Surrogacy (Regulation) Act 2021, obtain ART clinic registration under the ART (Regulation) Act 2021, and complete CEA registration. Only registered medical practitioners can conduct surrogacy procedures." },
    ],
    ctaHeading: "Building a Surrogacy Centre?",
    ctaBody: "Surrogacy centre infrastructure and regulatory compliance require an experienced healthcare infrastructure partner. ARCHORA delivers both.",
  },

  "F-21": {
    id: "F-21", title: "Medical College & Teaching Hospital", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f59e0b", catLabel: "Medical & Nursing Education", urlSlug: "/healthcare-facilities/medical-college",
    intro: ["Medical colleges and teaching hospitals represent the most complex category of healthcare infrastructure — combining a full-service hospital with lecture halls, demonstration rooms, dissection halls, skills labs, libraries, and student facilities, all under NMC inspection standards.", "ARCHORA designs and builds medical college campuses and teaching hospital facilities to NMC approval requirements and full NABH hospital standards."],
    services: [
      { title: "Teaching Hospital Infrastructure", description: "Full-service teaching hospital design meeting NMC bed requirements, department specifications, and clinical training provisions." },
      { title: "Medical Education Facilities", description: "Lecture theatres, tutorial rooms, clinical skills laboratories, simulation centres, and anatomy dissection halls designed to NMC standards." },
      { title: "Anatomy Department & Dissection Hall", description: "NMC-compliant dissection hall with correct ventilation, cadaver storage, specimen preparation, and decontamination provisions." },
      { title: "Skills Simulation Centre", description: "Clinical skills and simulation laboratory with correct infrastructure for task trainers, mannequin bays, AV recording, and debriefing rooms." },
      { title: "NMC Compliance Management", description: "Documentation and facility readiness assessment for NMC approval inspections." },
    ],
    compliance: [
      { name: "NMC Approval", authority: "National Medical Commission", scope: "Mandatory approval for medical colleges and teaching hospitals" },
      { name: "University Affiliation", authority: "Health University / University Grants Commission", scope: "Academic affiliation for degree programmes" },
      { name: "NABH HCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality accreditation for the teaching hospital" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "NMC Requirements Brief", description: "Mapping NMC bed requirements, department specifications, and faculty infrastructure requirements." },
      { title: "Campus & Teaching Hospital Master Planning", description: "Integrated campus master plan covering hospital, academic, and student facility zones." },
      { title: "Detailed Design", description: "Full architectural, structural, and MEP design for hospital and academic facilities." },
      { title: "Construction & Commissioning", description: "Phased construction, MEP, specialist lab builds, and NMC inspection readiness management." },
    ],
    faqs: [
      { q: "What NMC requirements must a medical college meet?", a: "NMC sets minimum requirements for bed strength, department composition, faculty qualifications, teaching infrastructure, dissection hall specifications, library resources, hostel facilities, and clinical training provisions. These requirements are subject to NMC inspection before approval and at regular intervals thereafter." },
    ],
    ctaHeading: "Building a Medical College or Teaching Hospital?",
    ctaBody: "Medical college infrastructure is one of the most complex and regulated construction programmes in India. ARCHORA has the expertise to deliver it.",
  },

  "F-22": {
    id: "F-22", title: "Nursing College & School of Nursing", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f59e0b", catLabel: "Medical & Nursing Education", urlSlug: "/healthcare-facilities/nursing-college",
    intro: ["Nursing colleges and schools of nursing require clinical skills laboratories, demonstration rooms, lecture facilities, library infrastructure, and hostel facilities — all meeting Indian Nursing Council standards for approval and affiliation.", "ARCHORA designs and builds nursing education facilities to INC standards."],
    services: [
      { title: "Clinical Skills Laboratory", description: "INC-compliant clinical skills labs with procedure beds, mannequins, task trainers, and AV infrastructure." },
      { title: "Nursing Arts & Demonstration Rooms", description: "Dedicated demonstration rooms for nursing procedures with correct fixture, fitting, and equipment provisions." },
      { title: "Lecture Theatres & Tutorial Rooms", description: "Tiered lecture theatres and tutorial rooms with audiovisual infrastructure and correct seating capacity for INC approval." },
      { title: "Library & Learning Resource Centre", description: "INC-compliant library with journal, textbook, and digital resource provisions." },
    ],
    compliance: [
      { name: "INC Approval", authority: "Indian Nursing Council", scope: "Mandatory approval for nursing colleges and schools of nursing" },
      { name: "State Nursing Council Affiliation", authority: "State Nursing Council", scope: "State-level affiliation for diploma and certificate programmes" },
      { name: "University Affiliation", authority: "Health University", scope: "Academic affiliation for degree programmes" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "INC Requirements Brief", description: "Mapping INC space standards, equipment requirements, and affiliation conditions." },
      { title: "Design & Documentation", description: "Full architectural and MEP design to INC inspection standards." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, specialist lab fittings, and INC inspection readiness." },
    ],
    faqs: [
      { q: "What facilities does a nursing college require for INC approval?", a: "INC requires clinical skills laboratories with specified equipment, nursing arts and demonstration rooms, lecture theatres with adequate seating, a library with prescribed texts and journals, computer laboratory, and hostel facilities meeting INC space standards — all subject to INC inspection before approval." },
    ],
    ctaHeading: "Building a Nursing College?",
    ctaBody: "INC approval requires precise facility compliance. ARCHORA brings the regulatory expertise and construction capability to deliver it.",
  },

  "F-23": {
    id: "F-23", title: "Pharmacy College", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f59e0b", catLabel: "Medical & Nursing Education", urlSlug: "/healthcare-facilities/pharmacy-college",
    intro: ["Pharmacy colleges require highly specialised laboratory infrastructure — pharmaceutical chemistry labs, pharmacology labs, pharmacognosy museums, machine rooms, and hospital pharmacy practice facilities — all meeting Pharmacy Council of India approval standards.", "ARCHORA designs and builds pharmacy college infrastructure to PCI approval standards."],
    services: [
      { title: "Pharmaceutical Chemistry Laboratory", description: "Fume hood-equipped chemistry laboratories with correct services, chemical storage, and waste management provisions." },
      { title: "Pharmacology & Physiology Laboratory", description: "Animal experimental facilities, instrument rooms, and pharmacological testing laboratory design." },
      { title: "Pharmacognosy Museum & Laboratory", description: "Specimen storage, preparation, and display infrastructure for pharmacognosy teaching collections." },
      { title: "Machine Room & Pharmaceutics Laboratory", description: "Pharmaceutical manufacturing equipment provisions, tablet press bays, and GMP-aware laboratory design." },
    ],
    compliance: [
      { name: "PCI Approval", authority: "Pharmacy Council of India", scope: "Mandatory approval for pharmacy degree and diploma programmes" },
      { name: "University Affiliation", authority: "Health University / University Grants Commission", scope: "Academic affiliation" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "PCI Requirements Brief", description: "Mapping PCI laboratory, equipment, and space standards for the programme scope." },
      { title: "Design & Documentation", description: "Full architectural and MEP design to PCI inspection standards." },
      { title: "Construction & Commissioning", description: "Civil works, laboratory fittings, MEP, and PCI inspection readiness." },
    ],
    faqs: [
      { q: "What laboratories does a pharmacy college require?", a: "PCI requires pharmaceutical chemistry, pharmacognosy, pharmacology, pharmaceutical analysis, pharmaceutics, and hospital/community pharmacy practice laboratories — each with specified equipment lists and space standards that are subject to PCI inspection." },
    ],
    ctaHeading: "Building a Pharmacy College?",
    ctaBody: "PCI laboratory standards require specialist knowledge. ARCHORA brings the regulatory and laboratory design expertise to every pharmacy college project.",
  },

  "F-24": {
    id: "F-24", title: "Allied Health Sciences College", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f59e0b", catLabel: "Medical & Nursing Education", urlSlug: "/healthcare-facilities/allied-health-college",
    intro: ["Allied health sciences colleges offer programmes in physiotherapy, occupational therapy, medical laboratory technology, radiography, and other clinical disciplines — each with specific laboratory, clinical skills, and equipment infrastructure requirements.", "ARCHORA designs and builds allied health education facilities to state health university affiliation standards."],
    services: [
      { title: "Physiotherapy Laboratory", description: "Electrotherapy, exercise therapy, and manual therapy laboratory design with correct equipment provisions." },
      { title: "Medical Laboratory Technology Laboratory", description: "NABL-aligned laboratory design for MLT practical training." },
      { title: "Radiography & Imaging Laboratory", description: "X-ray and imaging laboratory design with AERB compliance provisions for training environments." },
      { title: "Clinical Skills & Simulation Infrastructure", description: "Multi-disciplinary clinical skills labs serving the allied health programme scope." },
    ],
    compliance: [
      { name: "State Health University Affiliation", authority: "State Health University", scope: "Academic affiliation for allied health degree programmes" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "Programme Brief & Affiliation Requirements", description: "Mapping programme scope, university standards, and laboratory specifications." },
      { title: "Design & Documentation", description: "Full architectural and MEP design." },
      { title: "Construction & Commissioning", description: "Civil works, laboratory fittings, MEP, and affiliation inspection readiness." },
    ],
    faqs: [
      { q: "What is required for allied health college affiliation?", a: "State health universities specify minimum space standards, laboratory equipment lists, faculty qualifications, and clinical training provisions for each allied health programme. ARCHORA maps these requirements into the facility design from the outset." },
    ],
    ctaHeading: "Building an Allied Health Sciences College?",
    ctaBody: "Allied health college infrastructure requires programme-specific laboratory expertise. ARCHORA delivers it.",
  },

  "F-25": {
    id: "F-25", title: "Dental College", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f59e0b", catLabel: "Medical & Nursing Education", urlSlug: "/healthcare-facilities/dental-college",
    intro: ["Dental colleges require a unique combination of clinical dental hospital infrastructure and dedicated preclinical and clinical teaching laboratories — all meeting Dental Council of India approval standards.", "ARCHORA designs and builds dental college and teaching dental hospital facilities to DCI inspection standards."],
    services: [
      { title: "Teaching Dental Hospital", description: "DCI-compliant dental hospital with correct chair count, department composition, and clinical training provisions." },
      { title: "Preclinical Dental Laboratory", description: "Phantom head laboratory with correct cubicle design, central suction, compressed air, and lighting provisions." },
      { title: "Dental Technology Laboratory", description: "Prosthodontic and maxillofacial technology laboratory design with correct equipment, ventilation, and materials provisions." },
      { title: "Dental X-ray & CBCT Facilities", description: "AERB-compliant dental imaging infrastructure within the teaching hospital." },
    ],
    compliance: [
      { name: "DCI Approval", authority: "Dental Council of India", scope: "Mandatory approval for dental degree programmes" },
      { name: "University Affiliation", authority: "Health University", scope: "Academic affiliation" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "DCI Requirements Brief", description: "Mapping DCI chair count, department, and laboratory specifications." },
      { title: "Design & Documentation", description: "Full architectural and MEP design for teaching hospital and academic facilities." },
      { title: "Construction & Commissioning", description: "Civil works, dental systems, MEP, and DCI inspection readiness." },
    ],
    faqs: [
      { q: "What does DCI require for a dental college?", a: "DCI specifies minimum requirements for clinical chair count, department composition, preclinical phantom head laboratory, dental technology laboratory, dental materials laboratory, oral pathology laboratory, and teaching hospital clinical training provisions — all subject to DCI inspection." },
    ],
    ctaHeading: "Building a Dental College?",
    ctaBody: "DCI compliance requires dental college-specific infrastructure expertise. ARCHORA brings it.",
  },

  "F-26": {
    id: "F-26", title: "Clinic & Polyclinic", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#fb923c", catLabel: "Primary & Ambulatory Care", urlSlug: "/healthcare-facilities/clinic-polyclinic",
    intro: ["Clinics and polyclinics are the front door of healthcare for most Indians. Designing these facilities for clinical efficiency, patient experience, and NABH compliance requires an understanding of high-volume outpatient workflows, compact footprint optimisation, and primary care standards.", "ARCHORA designs and builds clinics and polyclinics to NABH Allopathic Clinics Accreditation standards."],
    services: [
      { title: "Outpatient Layout Planning", description: "High-throughput consultation room, waiting, registration, pharmacy, and procedure area layouts designed for patient flow efficiency." },
      { title: "Procedure Room Design", description: "Clean, minor procedure room and dressing room design with correct infection control provisions." },
      { title: "MEP Engineering", description: "Medical-grade HVAC, UPS, and plumbing systems designed for primary care environments." },
      { title: "NABH Allopathic Clinic Compliance Support", description: "Documentation and readiness assessment for NABH Allopathic Clinics Accreditation." },
    ],
    compliance: [
      { name: "NABH Allopathic Clinics Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for allopathic clinics" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "State Medical Council Registration", authority: "State Medical Council", scope: "Medical practitioner registration requirement" },
    ],
    process: [
      { title: "Clinical Brief & Space Planning", description: "Defining speciality scope, patient volumes, and space requirements." },
      { title: "Design & Documentation", description: "Architectural and MEP design to NABH standards." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, interiors, and NABH readiness walkthrough." },
    ],
    faqs: [
      { q: "Does a clinic need NABH accreditation?", a: "NABH accreditation is not legally mandatory for clinics but is increasingly required for insurance empanelment, government scheme participation, and competitive differentiation. ARCHORA builds every clinic to NABH Allopathic Clinics Accreditation standards." },
    ],
    ctaHeading: "Building a Clinic or Polyclinic?",
    ctaBody: "Even the smallest clinical facility deserves infrastructure built right. ARCHORA brings the same rigour to every clinic project.",
  },

  "F-27": {
    id: "F-27", title: "Day Care Surgery Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#fb923c", catLabel: "Primary & Ambulatory Care", urlSlug: "/healthcare-facilities/day-care-surgery",
    intro: ["Day care surgery centres deliver high-volume surgical procedures without overnight admission — requiring OT infrastructure, recovery areas, anaesthesia provisions, and clinical support systems in a compact, efficient footprint.", "ARCHORA designs and builds day care surgery facilities to NABH SHCO accreditation standards."],
    services: [
      { title: "Modular Day Care OT", description: "Laminar airflow OTs designed for day surgery case volumes with efficient turnover, anaesthesia integration, and infection control compliance." },
      { title: "Recovery Bay Design", description: "PACU-style recovery bays with nurse station visibility, medical gas, and monitoring provisions." },
      { title: "Pre-Operative Assessment Suite", description: "Pre-assessment, consent, and preparation area design for day surgery patient flow." },
      { title: "NABH SHCO Compliance Support", description: "Documentation and readiness assessment for NABH SHCO accreditation." },
    ],
    compliance: [
      { name: "NABH SHCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for small healthcare organisations" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "Surgical Scope & Volume Planning", description: "Defining procedure mix, case volume, and OT count requirements." },
      { title: "Design & Documentation", description: "OT, recovery, and support area design to NABH standards." },
      { title: "Construction & Commissioning", description: "Civil works, modular OT, MEP, and NABH readiness walkthrough." },
    ],
    faqs: [
      { q: "What OT infrastructure does a day care surgery centre require?", a: "A day care surgery OT requires laminar airflow, medical gas (oxygen, nitrous oxide, air, vacuum), anaesthesia machine infrastructure, integrated surgical lighting, OT control panel, and stainless steel wall systems — the same core requirements as a hospital OT, but often in a more compact footprint optimised for high turnover." },
    ],
    ctaHeading: "Building a Day Care Surgery Centre?",
    ctaBody: "Day care surgery requires the same OT quality as a full hospital. ARCHORA delivers it.",
  },

  "F-28": {
    id: "F-28", title: "Dialysis Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#fb923c", catLabel: "Primary & Ambulatory Care", urlSlug: "/healthcare-facilities/dialysis-centre",
    intro: ["Dialysis centres require specific water treatment infrastructure, haemodialysis station design, infection control provisions, and clinical support systems that general contractors routinely underestimate.", "ARCHORA designs and builds dialysis centres to NABH SHCO standards with correct RO water, dialysis station, and infection control infrastructure."],
    services: [
      { title: "RO Water Treatment System Design", description: "Dialysis-grade reverse osmosis water system design and infrastructure, meeting AAMI water quality standards for haemodialysis." },
      { title: "Haemodialysis Station Design", description: "Station layout with correct spacing, medical gas, power, data, and water loop connection provisions." },
      { title: "Infection Control Provisions", description: "Clean and contaminated workflow separation, isolation station design, and HVAC provisions for infection risk management." },
      { title: "NABH SHCO Compliance Support", description: "Documentation and readiness assessment for NABH SHCO accreditation." },
    ],
    compliance: [
      { name: "NABH SHCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for dialysis centres" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
      { name: "Water Quality Compliance", authority: "AAMI/ISO Standards", scope: "Dialysis water quality standards for patient safety" },
    ],
    process: [
      { title: "Clinical Brief & Station Count", description: "Defining station count, patient volumes, and water system requirements." },
      { title: "Technical Design", description: "RO water system, station layouts, MEP, and infection control design." },
      { title: "Construction & Commissioning", description: "Civil works, RO system, MEP, dialysis station fit-out, and NABH readiness walkthrough." },
    ],
    faqs: [
      { q: "What water quality standards apply to a dialysis centre?", a: "Haemodialysis water must meet AAMI (Association for the Advancement of Medical Instrumentation) or ISO 23500 standards for chemical contaminants, bacterial contamination, and endotoxin levels. This requires a multi-stage water treatment system typically including pre-treatment, softening, activated carbon filtration, reverse osmosis, and distribution loop — all designed and validated to dialysis-specific standards." },
    ],
    ctaHeading: "Building a Dialysis Centre?",
    ctaBody: "Dialysis infrastructure requires specialist water treatment and clinical design expertise. ARCHORA delivers both.",
  },

  "F-29": {
    id: "F-29", title: "Primary Health Centre (PHC)", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#fb923c", catLabel: "Primary & Ambulatory Care", urlSlug: "/healthcare-facilities/primary-health-centre",
    intro: ["Primary Health Centres (PHCs) serve as the first point of formal healthcare contact for rural and semi-urban populations. Infrastructure quality at PHC level directly impacts healthcare access, clinical safety, and community health outcomes.", "ARCHORA designs and builds PHC infrastructure to Government NHM standards and NABH PHC accreditation requirements."],
    services: [
      { title: "PHC Layout Planning", description: "NHM-standard room configurations for OPD, MCH, family planning, pharmacy, lab, and accommodation facilities." },
      { title: "Basic MEP Systems", description: "Medical-grade electrical, water supply, and sanitation systems designed for reliable operation in primary care settings." },
      { title: "Labour Room & Delivery Infrastructure", description: "Safe delivery room design meeting NHM safe motherhood infrastructure standards." },
      { title: "NABH PHC Accreditation Support", description: "Documentation and readiness assessment for NABH PHC accreditation." },
    ],
    compliance: [
      { name: "Government NHM Standards", authority: "National Health Mission", scope: "Mandatory space and facility standards for Primary Health Centres" },
      { name: "NABH PHC Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality accreditation for primary health centres" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for all clinical establishments" },
    ],
    process: [
      { title: "NHM Standards Brief", description: "Mapping NHM room requirements, equipment specifications, and site conditions." },
      { title: "Design & Documentation", description: "Architectural and MEP design to NHM and NABH standards." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, and NABH PHC readiness walkthrough." },
    ],
    faqs: [
      { q: "What NHM standards apply to PHC construction?", a: "NHM specifies minimum space standards, room types, essential equipment, water supply, sanitation, power, and accommodation requirements for Primary Health Centres. These standards vary by state but form the minimum acceptable specification for government-funded PHC infrastructure." },
    ],
    ctaHeading: "Building a Primary Health Centre?",
    ctaBody: "PHC infrastructure quality directly impacts community health. ARCHORA builds PHCs that meet standards and serve communities reliably.",
  },

  "F-30": {
    id: "F-30", title: "Stroke Care Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#fb923c", catLabel: "Primary & Ambulatory Care", urlSlug: "/healthcare-facilities/stroke-care-centre",
    intro: ["Stroke care centres require time-critical clinical infrastructure — stroke units with rapid imaging access, dedicated ICU beds, thrombolysis capability, and rehabilitation facilities — all designed around the 'time is brain' principle of acute stroke management.", "ARCHORA designs and builds primary and advanced stroke care infrastructure to NABH Stroke Centre Certification standards."],
    services: [
      { title: "Acute Stroke Unit Design", description: "Dedicated stroke unit bed bays with monitoring, medical gas, and imaging adjacency designed for rapid assessment and treatment." },
      { title: "CT & MRI Suite Adjacency Planning", description: "Stroke pathway-optimised imaging suite locations with rapid access from emergency and stroke unit." },
      { title: "Stroke ICU Infrastructure", description: "High-dependency stroke ICU beds with NABH critical care compliance and neuro-monitoring provisions." },
      { title: "Stroke Rehabilitation Suite", description: "Physiotherapy, occupational therapy, and speech therapy spaces designed for stroke rehabilitation pathways." },
    ],
    compliance: [
      { name: "NABH Primary & Advanced Stroke Centre Certification", authority: "National Accreditation Board for Hospitals", scope: "Quality certification for stroke care centres" },
      { name: "NABH HCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Mandatory hospital quality accreditation" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "Stroke Programme Brief", description: "Defining stroke care scope, bed count, imaging requirements, and certification target." },
      { title: "Clinical Pathway Design", description: "Stroke unit, imaging adjacency, ICU, and rehabilitation area layout optimised for clinical pathway efficiency." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, specialist systems, and NABH Stroke Centre readiness walkthrough." },
    ],
    faqs: [
      { q: "What NABH certification is available for stroke centres?", a: "NABH provides Primary Stroke Centre and Advanced Stroke Centre certification standards, covering clinical protocols, infrastructure requirements, staffing standards, and quality metrics for acute stroke care. The infrastructure requirements differ between primary and advanced certifications." },
    ],
    ctaHeading: "Building a Stroke Care Centre?",
    ctaBody: "Stroke care infrastructure requires clinical pathway-driven design. ARCHORA delivers it.",
  },

  "F-31": {
    id: "F-31", title: "Psychiatry & Mental Health Hospital", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f43f5e", catLabel: "Specialised & Emerging", urlSlug: "/healthcare-facilities/psychiatry-mental-health",
    intro: ["Psychiatry and mental health hospitals require infrastructure designed specifically around patient safety, therapeutic environment quality, and de-escalation principles — with safety provisions that protect patients and staff without creating institutional or punitive environments.", "ARCHORA designs and builds mental health facilities to Mental Healthcare Act 2017 and NABH standards."],
    services: [
      { title: "Safe Environment Design", description: "Ligature-resistant fixtures, anti-barricade doors, observation provisions, and safety engineering integrated seamlessly into therapeutic interior design." },
      { title: "Inpatient Ward Design", description: "Open, dignified ward environments with correct patient observation, safety provisions, and natural light that support recovery." },
      { title: "Therapeutic & Activity Space Design", description: "Group therapy rooms, activity spaces, outdoor therapeutic environments, and family visiting areas designed around recovery principles." },
      { title: "ECT Suite Design", description: "Electroconvulsive therapy suite with anaesthesia provisions, monitoring infrastructure, and recovery area design." },
      { title: "Mental Healthcare Act 2017 Compliance", description: "Facility documentation and readiness assessment for State Mental Health Authority registration." },
    ],
    compliance: [
      { name: "Mental Healthcare Act 2017 Registration", authority: "State Mental Health Authority", scope: "Mandatory registration for all mental health establishments" },
      { name: "NABH HCO or SHCO Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration" },
    ],
    process: [
      { title: "Clinical & Safety Brief", description: "Defining clinical model, patient acuity, and safety engineering requirements." },
      { title: "Therapeutic Environment Design", description: "Safety-integrated ward and therapy space design." },
      { title: "Construction & Commissioning", description: "Civil works, specialist safety fittings, MEP, and NABH readiness walkthrough." },
    ],
    faqs: [
      { q: "What safety features are required in a mental health hospital?", a: "Mental health hospital safety infrastructure includes ligature-resistant fixtures and fittings throughout inpatient areas, anti-barricade door systems, correct observation sightlines from nursing stations, secured outdoor spaces, and safety-glazed windows — all integrated into a therapeutic environment rather than an institutional one, in compliance with Mental Healthcare Act 2017 and NABH standards." },
    ],
    ctaHeading: "Building a Psychiatry or Mental Health Facility?",
    ctaBody: "Mental health infrastructure requires a combination of safety engineering and therapeutic environment expertise. ARCHORA brings both.",
  },

  "F-32": {
    id: "F-32", title: "Addiction & Rehabilitation Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f43f5e", catLabel: "Specialised & Emerging", urlSlug: "/healthcare-facilities/addiction-rehabilitation",
    intro: ["Addiction and rehabilitation centres require residential treatment infrastructure combining clinical detoxification facilities, group therapy spaces, individual counselling rooms, and supportive living environments — all under IRCA accreditation and Ministry of Social Justice registration requirements.", "ARCHORA designs and builds addiction treatment infrastructure to NABH IRCA accreditation standards."],
    services: [
      { title: "Residential Treatment Ward Design", description: "Safe, supportive inpatient ward design with correct clinical monitoring and therapeutic environment provisions." },
      { title: "Group Therapy & Counselling Room Design", description: "Therapeutic group rooms, individual counselling rooms, and family therapy spaces designed around recovery programme models." },
      { title: "Detoxification Unit Infrastructure", description: "Medical detoxification unit with nursing observation, monitoring, and medical support provisions." },
      { title: "IRCA Accreditation Support", description: "Documentation and readiness assessment for NABH Integrated Rehabilitation Centre for Addicts accreditation." },
    ],
    compliance: [
      { name: "IRCA Accreditation (NABH)", authority: "Ministry of Social Justice / NABH", scope: "Quality accreditation for addiction rehabilitation centres" },
      { name: "Ministry of Social Justice Registration", authority: "Ministry of Social Justice & Empowerment", scope: "Mandatory registration for rehabilitation centres" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration" },
    ],
    process: [
      { title: "Treatment Programme Brief", description: "Defining treatment model, bed count, detox capability, and therapy scope." },
      { title: "Design & Documentation", description: "Residential ward, therapy, and clinical area design." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, specialist fittings, and IRCA readiness walkthrough." },
    ],
    faqs: [
      { q: "What registration is required for an addiction rehabilitation centre in India?", a: "Addiction rehabilitation centres must register with the Ministry of Social Justice and Empowerment, obtain CEA registration, and pursue NABH IRCA accreditation for quality recognition and insurance empanelment." },
    ],
    ctaHeading: "Building an Addiction or Rehabilitation Centre?",
    ctaBody: "Rehabilitation centre infrastructure requires both clinical safety and therapeutic environment expertise. ARCHORA delivers both.",
  },

  "F-33": {
    id: "F-33", title: "Palliative Care Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f43f5e", catLabel: "Specialised & Emerging", urlSlug: "/healthcare-facilities/palliative-care",
    intro: ["Palliative care centres support patients with life-limiting illness and their families — requiring environments that prioritise dignity, comfort, family presence, and holistic wellbeing alongside clinical care.", "ARCHORA designs and builds palliative care facilities to NABH Care Homes Accreditation standards, creating spaces that serve patients and families with the sensitivity and quality they deserve."],
    services: [
      { title: "Patient Room Design", description: "Single-occupancy palliative care rooms with space for family, natural light, personalisation provisions, and clinical infrastructure that does not dominate the environment." },
      { title: "Family Support & Bereavement Space", description: "Family sitting rooms, overnight accommodation provisions, counselling rooms, and bereavement support spaces." },
      { title: "Pain & Symptom Management Infrastructure", description: "Medical gas, IV access infrastructure, syringe driver provisions, and monitoring systems for palliative symptom management." },
      { title: "Therapeutic Garden & Outdoor Space", description: "Accessible outdoor garden spaces supporting patient wellbeing and family connection." },
    ],
    compliance: [
      { name: "NABH Care Homes Accreditation", authority: "National Accreditation Board for Hospitals", scope: "Quality and safety accreditation for care homes and palliative facilities" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "Care Model & Environment Brief", description: "Defining care philosophy, patient profile, and environmental design priorities." },
      { title: "Design", description: "Patient room, family, therapy, and clinical support space design." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, specialist interiors, and NABH readiness walkthrough." },
    ],
    faqs: [
      { q: "How is palliative care facility design different from a standard ward?", a: "Palliative care design prioritises single-occupancy rooms with family space, natural light, homelike interiors, and gardens — rather than the clinical efficiency focus of acute ward design. Clinical infrastructure (medical gas, IV access, monitoring) is present but integrated discreetly so as not to dominate the environment." },
    ],
    ctaHeading: "Building a Palliative Care Centre?",
    ctaBody: "Palliative care environments require a combination of clinical function and therapeutic design sensitivity. ARCHORA delivers both.",
  },

  "F-34": {
    id: "F-34", title: "Wellness & Preventive Health Centre", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f43f5e", catLabel: "Specialised & Emerging", urlSlug: "/healthcare-facilities/wellness-preventive-health",
    intro: ["Wellness and preventive health centres are a rapidly growing category, serving health-conscious consumers seeking executive health check packages, lifestyle medicine, metabolic assessments, and evidence-based wellness interventions.", "ARCHORA designs and builds wellness and preventive health facilities to NABH certification standards."],
    services: [
      { title: "Executive Health Check Suite Design", description: "High-efficiency health assessment suites with phlebotomy, imaging, cardiology assessment, and consultation area layout." },
      { title: "Wellness Consultation & Counselling Rooms", description: "Lifestyle medicine, nutrition counselling, and health coaching room design." },
      { title: "Diagnostic Integration", description: "Integrated imaging, laboratory, and functional assessment infrastructure for preventive health screening programmes." },
      { title: "NABH Wellness Certification Support", description: "Documentation and readiness assessment for NABH wellness and preventive health certification." },
    ],
    compliance: [
      { name: "NABH Certification", authority: "National Accreditation Board for Hospitals", scope: "Quality certification for wellness and preventive health centres" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration" },
    ],
    process: [
      { title: "Programme Brief & Service Design", description: "Defining wellness programme scope, patient journey, and space requirements." },
      { title: "Design & Documentation", description: "Suite, consultation, and diagnostic area design." },
      { title: "Construction & Commissioning", description: "Civil works, MEP, premium interiors, and NABH readiness walkthrough." },
    ],
    faqs: [
      { q: "What infrastructure does a wellness centre require?", a: "A wellness centre requires clinical consultation rooms, phlebotomy areas, basic diagnostic infrastructure (ECG, spirometry, body composition analysis), health coaching and counselling rooms, and typically a premium reception and waiting environment that reflects the wellness brand positioning." },
    ],
    ctaHeading: "Building a Wellness or Preventive Health Centre?",
    ctaBody: "Wellness centre infrastructure requires a combination of clinical function and premium patient experience. ARCHORA delivers both.",
  },

  "F-35": {
    id: "F-35", title: "Hospital Hotel & Medical Tourism Facility", subtitle: "Infrastructure Design & Construction by ARCHORA",
    accentColor: "#f43f5e", catLabel: "Specialised & Emerging", urlSlug: "/healthcare-facilities/hospital-hotel-medical-tourism",
    intro: ["Hospital hotels and medical tourism facilities serve international patients and domestic health travellers requiring post-procedure recovery accommodation, family stay facilities, and a hospitality experience alongside clinical care.", "ARCHORA designs and builds hospital hotels and medical tourism facilities to Ministry of Tourism MVTF empanelment standards."],
    services: [
      { title: "Hospital Hotel Room Design", description: "Recovery-optimised hotel rooms with clinical infrastructure (nurse call, oxygen, medical-grade bathroom) integrated within a hospitality design framework." },
      { title: "Medical Concierge & Support Services Design", description: "Medical concierge, interpreter services, telemedicine room, travel coordination, and administrative support facility design." },
      { title: "Family Accommodation Suite Design", description: "Extended-stay family accommodation with kitchen provisions, living areas, and hospital adjacency." },
      { title: "MVTF & NABH Compliance Support", description: "Documentation and readiness assessment for Ministry of Tourism MVTF empanelment and NABH certification." },
    ],
    compliance: [
      { name: "NABH MVTF Empanelment", authority: "Ministry of Tourism / NABH", scope: "Empanelment for Medical Value Travel Facilitation" },
      { name: "Ministry of Tourism Classification", authority: "Ministry of Tourism", scope: "Hotel classification for medical tourism facilities" },
      { name: "CEA Registration", authority: "Clinical Establishments Act", scope: "Mandatory registration for clinical components" },
      { name: "Fire NOC", authority: "State Fire Department", scope: "Mandatory fire safety clearance" },
    ],
    process: [
      { title: "Programme Brief", description: "Defining patient profile, clinical adjacency requirements, and hospitality positioning." },
      { title: "Design", description: "Hospital hotel rooms, family suites, medical concierge, and support facility design." },
      { title: "Construction & Commissioning", description: "Civil works, clinical MEP within hospitality environment, interiors, and MVTF readiness walkthrough." },
    ],
    faqs: [
      { q: "What is NABH MVTF empanelment?", a: "NABH Medical Value Travel Facilitation (MVTF) empanelment recognises hospitals and associated facilities that meet quality and service standards for international medical travel. Empanelled facilities are listed on the Government of India medical tourism portal and are eligible for promotion through official medical tourism channels." },
    ],
    ctaHeading: "Building a Hospital Hotel or Medical Tourism Facility?",
    ctaBody: "Medical tourism infrastructure requires both clinical quality and hospitality design excellence. ARCHORA delivers the combination.",
  },
};

// ─── FAQ Item Component ─────────────────────────────────────────────────────────
function FAQItem({ item, color, index }: { item: FAQItem; color: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      style={{
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "left", padding: "1.4rem 0",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          gap: 16, background: "none", border: "none", cursor: "pointer",
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 400, color: open ? color : "rgba(255,255,255,0.8)", lineHeight: 1.4, transition: "color 0.2s" }}>
          {item.q}
        </span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }} style={{ color, flexShrink: 0, marginTop: 3 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.2" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresenceWrapper open={open}>
        <div style={{ paddingBottom: "1.4rem" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, lineHeight: 1.9, color: "rgba(255,255,255,0.45)" }}>{item.a}</p>
        </div>
      </AnimatePresenceWrapper>
    </motion.div>
  );
}

function AnimatePresenceWrapper({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function FacilityDetailPage() {
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();
  const data = facilityId ? facilityData[facilityId] : null;

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", background: "#040e1a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "rgba(255,255,255,0.4)" }}>Facility not found.</p>
        <Link to="/facilities">
          <button style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", padding: "12px 24px", background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer" }}>
            ← Back to Facilities
          </button>
        </Link>
      </div>
    );
  }

  const { accentColor: color } = data;

  return (
    <div style={{ minHeight: "100vh", background: "#040e1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@400;500&display=swap');
        @keyframes pulseRing { 0%,100%{transform:scale(1);opacity:0.12} 50%{transform:scale(1.06);opacity:0.22} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .rotate-slow { animation: rotateSlow 90s linear infinite; }
      `}</style>

      {/* ── Back Nav ── */}
      <div style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 50, background: "rgba(4,14,26,0.95)", backdropFilter: "blur(14px)", borderBottom: `0.5px solid ${color}15`, padding: "12px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => navigate(-1)}
            style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = color)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <ArrowLeft size={12} /> All Facilities
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "2px", color: `${color}70`, background: `${color}12`, border: `0.5px solid ${color}30`, padding: "3px 10px", borderRadius: 20 }}>{data.catLabel}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "2px", color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.05)", padding: "3px 10px", borderRadius: 20 }}>{data.id}</span>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "65vh", display: "flex", alignItems: "center", overflow: "hidden", background: `linear-gradient(160deg, #040e1a 0%, #071e30 60%, #04141f 100%)`, paddingTop: 120 }}>
        {/* ambient rings */}
        {[560, 400, 260].map((size, i) => (
          <div key={size} style={{ position: "absolute", top: "50%", left: "18%", width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: "50%", border: `1px solid ${color}${i === 0 ? "10" : i === 1 ? "18" : "25"}`, pointerEvents: "none", animation: `pulseRing ${5 + i * 2}s ease-in-out infinite`, animationDelay: `${i * 0.8}s` }} />
        ))}

        {/* rotating ornament */}
        <div className="rotate-slow" style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", opacity: 0.05, pointerEvents: "none" }}>
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke={color}>
            <circle cx="50" cy="50" r="46" strokeWidth="0.3" strokeDasharray="3 5" />
            <circle cx="50" cy="50" r="34" strokeWidth="0.25" />
            <circle cx="50" cy="50" r="20" strokeWidth="0.3" strokeDasharray="2 4" />
            <line x1="50" y1="4" x2="50" y2="14" strokeWidth="0.5" />
            <line x1="50" y1="86" x2="50" y2="96" strokeWidth="0.5" />
            <line x1="4" y1="50" x2="14" y2="50" strokeWidth="0.5" />
            <line x1="86" y1="50" x2="96" y2="50" strokeWidth="0.5" />
          </svg>
        </div>

        {/* dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, ${color}08 1px, transparent 1px)`, backgroundSize: "32px 32px", pointerEvents: "none" }} />

        {/* left rail */}
        <div style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, zIndex: 2 }}>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.08)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: 0.6 }} />
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.08)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "4rem 5rem 4rem 6rem", zIndex: 2, width: "100%" }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}
          >
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <rect x="6.5" y="1" width="7" height="18" rx="1.5" fill="#c0392b" opacity=".8" />
              <rect x="1" y="6.5" width="18" height="7" rx="1.5" fill="#c0392b" opacity=".8" />
            </svg>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              {data.catLabel} · {data.id}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, color: "#fff", lineHeight: 1.08, marginBottom: 16, letterSpacing: "-0.01em", maxWidth: 700 }}
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: "0.12em", color: `${color}90`, textTransform: "uppercase", marginBottom: 32 }}
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <Link to="/contact">
              <button
                style={{ padding: "12px 26px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .22s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = color; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              >
                Discuss This Facility →
              </button>
            </Link>
            <button
              onClick={() => navigate(-1)}
              style={{ padding: "12px 26px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.18)", cursor: "pointer", transition: "all .22s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = `${color}50`; (e.currentTarget as HTMLButtonElement).style.color = color; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            >
              ← All Facilities
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 60%,#04141f 100%)", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5rem 0 6rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ width: "2px", height: 60, background: `linear-gradient(to bottom, ${color}, transparent)`, marginBottom: 20 }} />
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: "3px", textTransform: "uppercase", color: color, marginBottom: 12 }}>Overview</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 300, color: "#fff", lineHeight: 1.25 }}>
                What ARCHORA Delivers for {data.title}
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              {data.intro.map((para, i) => (
                <p key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, lineHeight: 1.95, color: "rgba(255,255,255,0.5)" }}>{para}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ background: "#040e1a", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5rem 0 6rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "3.5rem", paddingBottom: "2rem", borderBottom: `0.5px solid ${color}20` }}
          >
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: "3px", textTransform: "uppercase", color: color, marginBottom: 10 }}>What We Build</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 300, color: "#fff" }}>
              Infrastructure Services
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {data.services.map((service, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-30px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  style={{ padding: "1.8rem 1.6rem", background: "linear-gradient(145deg,#061624,#040e1a)", border: `0.5px solid rgba(255,255,255,0.06)`, borderRadius: 3, transition: "all 0.28s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(145deg,#071e30,#0a2640)"; (e.currentTarget as HTMLDivElement).style.borderColor = `${color}40`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(145deg,#061624,#040e1a)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 5 }} />
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 400, color: "#fff", lineHeight: 1.3 }}>{service.title}</h3>
                  </div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, lineHeight: 1.85, color: "rgba(255,255,255,0.38)", paddingLeft: 12 }}>{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Compliance ── */}
      <section style={{ background: "linear-gradient(160deg, #ffffff 0%, #daeef9 50%, #e8f4fd 100%)", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5rem 0 6rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "3rem" }}
          >
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: "3px", textTransform: "uppercase", color: "#185FA5", marginBottom: 10 }}>Regulatory Framework</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 300, color: "#042C53" }}>
              Compliance Requirements
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.8rem" }}>
            {data.compliance.map((item, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-20px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                  style={{ padding: "1.5rem 1.4rem", background: "rgba(4,44,83,0.04)", border: "0.5px solid rgba(24,95,165,0.14)", borderRadius: 3, transition: "all 0.25s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(4,44,83,0.09)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(24,95,165,0.3)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(4,44,83,0.04)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(24,95,165,0.14)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
                >
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 500, color: "#042C53", marginBottom: 4 }}>{item.name}</p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, color: "#185FA5", marginBottom: 8, lineHeight: 1.6 }}>{item.authority}</p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, lineHeight: 1.75, color: "rgba(4,44,83,0.55)" }}>{item.scope}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 60%,#04141f 100%)", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5rem 0 6rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "3.5rem" }}
          >
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: "3px", textTransform: "uppercase", color: color, marginBottom: 10 }}>How We Work</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 300, color: "#fff" }}>
              Our Process
            </h2>
          </motion.div>

          <div style={{ position: "relative" }}>
            {/* vertical timeline line */}
            <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: "0.5px", background: `linear-gradient(to bottom, ${color}40, transparent)`, pointerEvents: "none" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
              {data.process.map((step, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: "-20px" });
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    style={{ display: "flex", gap: "2rem", alignItems: "flex-start", padding: "1.6rem 0 1.6rem 3rem", position: "relative" }}
                  >
                    {/* step node */}
                    <div style={{ position: "absolute", left: 10, top: "1.9rem", width: 16, height: 16, borderRadius: "50%", background: "#040e1a", border: `1.5px solid ${color}70`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: 0.8 }} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "2px", color: `${color}60` }}>0{i + 1}</span>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#fff", lineHeight: 1.3 }}>{step.title}</h3>
                      </div>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, lineHeight: 1.9, color: "rgba(255,255,255,0.38)" }}>{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#040e1a", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5rem 0 6rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "3rem" }}
          >
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: "3px", textTransform: "uppercase", color: color, marginBottom: 10 }}>Common Questions</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 300, color: "#fff" }}>
              Frequently Asked
            </h2>
          </motion.div>

          <div style={{ maxWidth: 760 }}>
            {data.faqs.map((faq, i) => (
              <FAQItem key={i} item={faq} color={color} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(160deg,#040e1a 0%,#071e30 70%,#04141f 100%)", padding: "8rem 0", position: "relative", overflow: "hidden" }}>
        {[500, 350, 210].map((size, i) => (
          <motion.div key={size} style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: "50%", border: `1px solid ${color}${i === 0 ? "08" : i === 1 ? "12" : "18"}`, pointerEvents: "none" }} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 70 + i * 20, repeat: Infinity, ease: "linear" }} />
        ))}

        <div style={{ maxWidth: 620, margin: "0 auto", padding: "0 3rem", textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: "3.5px", textTransform: "uppercase", color: `${color}50`, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <span style={{ display: "block", width: 24, height: "0.5px", background: `${color}40` }} />
              Start Your Project<span style={{ display: "block", width: 24, height: "0.5px", background: `${color}40` }} />
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 18 }}>
              {data.ctaHeading}
            </h2>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", lineHeight: 1.9, marginBottom: 36 }}>
              {data.ctaBody}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact">
                <button
                  style={{ padding: "13px 28px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .22s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = color; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                >
                  Book a Free Consultation
                </button>
              </Link>
              <button
                onClick={() => navigate(-1)}
                style={{ padding: "13px 28px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.18)", cursor: "pointer", transition: "all .22s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = `${color}50`; (e.currentTarget as HTMLButtonElement).style.color = color; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              >
                ← All Facilities
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}