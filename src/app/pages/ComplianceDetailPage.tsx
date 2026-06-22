import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project.";

// Single font for this entire page system, per spec.
const FONT = "Calibri, Arial, sans-serif";

// ─── Type-scale constants (kept here so every compliance page is identical) ──
const SIZE = {
  eyebrow: 17,        // small uppercase label above a heading
  h1: "clamp(2.6rem, 4.6vw, 4.4rem)",
  h2: "clamp(2.1rem, 3.2vw, 3rem)",
  h3: "1.7rem",
  bodyLg: 18,          // hero sub copy
  body: 17,            // standard paragraph
  small: 15,           // captions / table covers column
  stepNum: "2.2rem",
};

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface ComplianceFAQ { q: string; a: string; }
export interface ComplianceTableRow { facility: string; requirement: string; }
export interface ComplianceProcessStep { step: string; title: string; desc: string; }

export interface ComplianceData {
  slug: string;
  abbr: string;
  fullName: string;
  color: string;
  metaDesc: string;
  heroH1: string;
  heroSub: string;
  whatIsIt: { heading: string; body: string[] };
  whyItMatters: { heading: string; body: string[] };
  whoNeedsIt: { heading: string; groups: { title: string; items: string[] }[] };
  process?: { heading: string; steps: ComplianceProcessStep[] };
  referenceTable: { heading: string; rows: ComplianceTableRow[] };
  consequences: { heading: string; bullets: string[] };
  howArchoraHelps: { heading: string; bullets: string[] };
  faqs: ComplianceFAQ[];
}

// ─── Data ──────────────────────────────────────────────────────────────────────
export const complianceData: ComplianceData[] = [
  // ───────────────────────── AERB ─────────────────────────
  {
    slug: "aerb",
    abbr: "AERB",
    fullName: "Atomic Energy Regulatory Board",
    color: "#4bd1d9",
    metaDesc: "Complete guide to AERB licensing in India for X-ray, CT, MRI, PET-CT, Cath Lab, radiotherapy, and nuclear medicine facilities.",
    heroH1: "AERB Licence for Hospitals and Diagnostic Centres in India",
    heroSub: "Complete guide to AERB licensing for X-ray, CT, MRI, PET-CT, Cath Lab, radiotherapy, and nuclear medicine facilities, including eLORA registration, shielding design, and how ARCHORA builds AERB-compliant facilities from day one.",
    whatIsIt: {
      heading: "What is AERB?",
      body: [
        "AERB stands for the Atomic Energy Regulatory Board, the statutory regulatory authority of India responsible for ensuring that the use of ionising radiation and nuclear energy does not cause undue risk to workers, patients, the public, or the environment.",
        "AERB was established under the Atomic Energy Act, 1962, and functions under the Department of Atomic Energy, Government of India. It frames the safety standards, codes, guides, and regulations governing the use of radiation sources across every sector in India, including healthcare.",
        "In healthcare infrastructure, AERB is the mandatory licensing authority for any facility that installs, operates, or intends to operate equipment that generates or uses ionising radiation, including X-ray machines, CT scanners, MRI systems with radiofrequency components, fluoroscopy units, mammography machines, PET-CT scanners, linear accelerators, brachytherapy units, cath lab systems, and nuclear medicine facilities.",
        "No healthcare facility in India can legally install, commission, or operate radiation-generating medical equipment without prior AERB authorisation. This is a statutory legal requirement under the Atomic Energy Act, 1962, and the Radiation Protection Rules, 1971, not an optional quality certification.",
      ],
    },
    whyItMatters: {
      heading: "Why AERB is the Most Infrastructure-Critical Compliance in Healthcare",
      body: [
        "Of every regulatory requirement that applies to a healthcare facility, AERB has the single most direct impact on the physical building. The reason is shielding.",
        "Every room housing radiation-generating equipment must be designed and constructed with radiation shielding built into its walls, floor, ceiling, and door, to a specification determined by the equipment type, energy levels, workload, and the occupancy of adjacent spaces.",
        "Shielding cannot be retrofitted or approximated. It must be calculated by a qualified medical physicist before the room is designed, specified in the structural drawings before work begins, verified during construction, and tested with a survey meter before the equipment is commissioned.",
        "A facility that builds its CT, X-ray, or cath lab room without AERB-compliant shielding faces one of two outcomes: the equipment cannot be licensed, or the room must be partially or entirely demolished and rebuilt at two to five times the cost correct shielding would have taken from the start.",
      ],
    },
    whoNeedsIt: {
      heading: "Facilities That Require AERB Authorisation",
      groups: [
        { title: "Diagnostic Imaging", items: ["X-ray machines (all types, including mobile and dental)", "Fluoroscopy units, fixed and mobile", "Mammography machines, including tomosynthesis", "CT scanners, all configurations", "OPG and dental cone-beam CT", "Bone densitometry (DEXA)"] },
        { title: "Interventional & Cardiac Imaging", items: ["Cath lab systems, single and biplane", "Interventional radiology suites", "Hybrid operating theatres with integrated imaging"] },
        { title: "Advanced & Nuclear Imaging", items: ["PET-CT scanners and radiopharmacy", "SPECT and SPECT-CT"] },
        { title: "Radiotherapy & Oncology", items: ["Linear accelerators (LINAC)", "Brachytherapy units", "Cobalt-60 teletherapy units", "Gamma knife / stereotactic radiosurgery", "Proton therapy systems"] },
        { title: "Nuclear Medicine", items: ["Nuclear medicine departments", "Radiopharmacy facilities", "Thyroid therapy units", "Unsealed-source radiotherapy (Lu-177, Ra-223, etc.)"] },
      ],
    },
    process: {
      heading: "AERB Licensing — Step by Step",
      steps: [
        { step: "01", title: "Appoint a Radiation Safety Officer", desc: "An AERB-registered RSO, holding the qualifications specified for the facility category, must be appointed before licensing can proceed." },
        { step: "02", title: "Engage a Qualified Medical Physicist", desc: "A medical physicist prepares the room-by-room shielding design before any radiation room is designed or built." },
        { step: "03", title: "AERB Site Approval", desc: "Before construction begins, the facility applies to AERB through eLORA for site approval covering source types and building layout." },
        { step: "04", title: "Shielding Design Approval", desc: "AERB's Radiation Safety Division reviews and approves the shielding calculations before construction proceeds." },
        { step: "05", title: "Construction to Approved Design", desc: "Radiation rooms are built exactly to the approved shielding specification, including lead lining, barriers, and protective doors." },
        { step: "06", title: "Post-Construction Radiation Survey", desc: "A medical physicist surveys every radiation room before equipment is commissioned, and the report is filed through eLORA." },
        { step: "07", title: "Equipment Installation & Acceptance Testing", desc: "The vendor installs the equipment; a medical physicist performs acceptance testing to verify safe operating performance." },
        { step: "08", title: "AERB Licence Application", desc: "With all approvals and survey reports in place, the facility applies through eLORA for the radiation facility licence." },
        { step: "09", title: "Ongoing Compliance", desc: "Annual surveys, equipment maintenance, dosimetry monitoring, and RSO renewal continue for the life of the licence." },
      ],
    },
    referenceTable: {
      heading: "AERB Compliance by Facility Type",
      rows: [
        { facility: "Multispeciality Hospital with Radiology", requirement: "eLORA registration for X-ray, CT, fluoroscopy" },
        { facility: "Superspeciality Hospital", requirement: "eLORA for all radiation equipment incl. interventional suites" },
        { facility: "Oncology & Cancer Hospital", requirement: "Radiation Facility Licence for LINAC, brachytherapy, RT" },
        { facility: "Cardiac Hospital & Cath Lab", requirement: "eLORA for cath lab angiography system and C-arm" },
        { facility: "Diagnostic Centre", requirement: "eLORA for X-ray, CT, fluoroscopy, mammography" },
        { facility: "PET-CT & Advanced Imaging Centre", requirement: "Radiation Facility Licence for PET-CT & radiopharmacy" },
        { facility: "Nuclear Medicine Centre", requirement: "Radiation Facility Licence for all radioactive sources" },
        { facility: "Dental Hospital with OPG/CBCT", requirement: "eLORA for dental X-ray, OPG, CBCT" },
        { facility: "Medical College Teaching Hospital", requirement: "eLORA for all radiation equipment on site" },
      ],
    },
    consequences: {
      heading: "What Happens Without AERB Authorisation",
      bullets: [
        "Operating radiation equipment without authorisation is a criminal offence under the Atomic Energy Act, 1962",
        "Immediate shutdown of the radiation facility, with equipment seized or ordered decommissioned",
        "Criminal prosecution of facility management and the equipment operator is possible",
        "NABH accreditation requires demonstrated AERB compliance",
        "Insurance coverage for radiation-related incidents may be void",
        "Government and insurance empanelment can be revoked on discovery of unlicensed operation",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Delivers AERB-Compliant Facilities",
      bullets: [
        "Equipment planning at brief stage to identify every radiation source and its specification",
        "Engagement of a qualified medical physicist for shielding design before structural design begins",
        "Submission of shielding designs to AERB through eLORA before drawings are finalised",
        "Integration of approved shielding specifications directly into structural and architectural drawings",
        "Construction supervision focused on shielding installation quality",
        "Post-construction radiation survey before equipment commissioning",
        "Support for AERB eLORA licence application documentation",
        "RSO registration guidance and radiation safety framework at handover",
      ],
    },
    faqs: [
      { q: "What is AERB and why does my hospital need it?", a: "AERB is India's statutory authority for radiation safety. Your hospital needs AERB authorisation because it is a legal requirement under the Atomic Energy Act, 1962, for any facility installing or operating ionising radiation equipment. Operating without it is a criminal offence." },
      { q: "Which equipment requires AERB registration?", a: "All ionising radiation-generating equipment, including X-ray machines, CT scanners, mammography units, fluoroscopy, cath labs, C-arms, PET-CT, linear accelerators, brachytherapy, and nuclear medicine equipment. MRI alone does not require it, but PET-MRI does." },
      { q: "What is AERB eLORA?", a: "eLORA, the Electronic Licensing of Radiation Applications, is AERB's mandatory online platform for all radiation facility licensing, renewals, surveys, and equipment change notifications." },
      { q: "Why does shielding design matter so much for my building?", a: "Shielding design specifies the exact thickness and material of every wall, floor, ceiling, and door in a radiation room. Without an approved design, the room cannot be licensed, and remediation after construction typically costs two to five times more than building it correctly the first time." },
      { q: "How long does AERB licensing take?", a: "For a straightforward diagnostic facility with complete documentation, two to four months from submission. Radiotherapy and nuclear medicine facilities take longer due to additional technical review." },
      { q: "Can ARCHORA help with AERB eLORA registration?", a: "Yes. We coordinate the medical physics shielding design, integrate approved specifications into construction drawings, supervise shielding construction, arrange post-construction surveys, and compile the eLORA licensing documentation alongside your RSO and physics team." },
    ],
  },

  // ───────────────────────── ART Authority ─────────────────────────
  {
    slug: "art-authority",
    abbr: "ART Authority",
    fullName: "Assisted Reproductive Technology (Regulation) Act, 2021",
    color: "#34d399",
    metaDesc: "Complete guide to ART Act 2021 registration for IVF labs, fertility centres, and surrogacy facilities in India.",
    heroH1: "ART Act 2021 Registration for IVF Labs and Fertility Centres",
    heroSub: "Complete guide to ART Authority registration, ICMR guidelines, minimum infrastructure standards, and how ARCHORA designs ART-compliant fertility centres from day one.",
    whatIsIt: {
      heading: "What is the ART Authority?",
      body: [
        "The ART Authority refers to the National ART and Surrogacy Board and the State ART and Surrogacy Boards established under the Assisted Reproductive Technology (Regulation) Act, 2021, the primary legislation governing ART practice in India.",
        "It regulates every ART clinic and ART bank in the country, defines the minimum standards they must meet, and establishes the registration framework that every IVF lab, fertility centre, and ART bank must comply with before legally offering ART services.",
        "The Act came into force alongside the Surrogacy (Regulation) Act, 2021, replacing what were previously only ICMR guidelines with statutory, enforceable legal requirements.",
        "For any doctor, fertility specialist, or healthcare investor planning an IVF lab, fertility centre, gamete bank, or surrogacy facility, ART Act compliance is the single most important regulatory framework to embed into the physical infrastructure from day one.",
      ],
    },
    whyItMatters: {
      heading: "Why ART Act Compliance is Non-Negotiable",
      body: [
        "The ART Act is not a voluntary accreditation. It is a statutory requirement with criminal penalties: imprisonment of up to five years and a fine of up to ten lakh rupees on first conviction for operating an unregistered ART clinic or bank.",
        "Gametes and embryos handled at an unregistered facility have no legal standing, with serious consequences for patients in the event of disputes. Insurance and medico-legal protection is void without registration.",
        "Beyond the legal imperative, fertility treatment is among the most emotionally sensitive procedures in medicine, and the physical environment of the IVF laboratory directly and measurably affects fertilisation and pregnancy rates, making correct infrastructure design a clinical, not just regulatory, necessity.",
      ],
    },
    whoNeedsIt: {
      heading: "Who Requires ART Act Registration",
      groups: [
        { title: "ART Clinics", items: ["Dedicated IVF centres and fertility clinics", "Hospital-based fertility departments", "Gynaecology clinics offering IUI", "Reproductive medicine units in multi/superspeciality hospitals", "Egg freezing, sperm freezing, embryo banking clinics"] },
        { title: "ART Banks", items: ["Sperm banks / semen cryopreservation facilities", "Egg banks / oocyte cryopreservation facilities", "Embryo banks", "Combined gamete & embryo storage facilities"] },
        { title: "Surrogacy Clinics", items: ["Must register under both the ART Act 2021 and the Surrogacy Act 2021 simultaneously"] },
      ],
    },
    process: {
      heading: "ART Act Registration — Step by Step",
      steps: [
        { step: "01", title: "Determine Registration Authority", desc: "Applications are submitted to the State ART and Surrogacy Board where the facility is located." },
        { step: "02", title: "Confirm Personnel Eligibility", desc: "A qualified medical director, embryologist, supporting staff, and a counsellor must meet ICMR/Act qualification requirements." },
        { step: "03", title: "Prepare the Physical Facility", desc: "The IVF laboratory, cryostorage, procedure rooms, and andrology lab must be built and fitted to minimum standards before inspection." },
        { step: "04", title: "Equipment Installation & Validation", desc: "Incubators, laminar flow stations, ICSI equipment, and cryostorage tanks must be installed and performance-verified." },
        { step: "05", title: "Quality Management & Protocols", desc: "Documented SOPs covering every clinical and laboratory process, from stimulation to cryopreservation, must be in place." },
        { step: "06", title: "Application Submission", desc: "The application, with building plans, equipment inventory, and staff credentials, is submitted to the State Board." },
        { step: "07", title: "Inspection", desc: "State inspectors verify physical infrastructure, laboratory environment, cryostorage provisions, and documentation." },
        { step: "08", title: "Registration Certificate Issuance", desc: "The State Board issues the certificate specifying the scope of ART services authorised." },
        { step: "09", title: "Annual Reporting & Renewal", desc: "Registered clinics submit annual treatment and outcome data, with registration renewed at defined intervals." },
      ],
    },
    referenceTable: {
      heading: "ART Compliance by Facility Type",
      rows: [
        { facility: "Dedicated IVF Centre / Fertility Clinic", requirement: "ART Act + ICMR + State ART Authority Registration" },
        { facility: "Hospital-Based Fertility Department", requirement: "ART Act + State ART Authority Registration" },
        { facility: "IVF Lab and Embryo Bank", requirement: "ART Act + State Registration as ART Bank" },
        { facility: "Sperm Bank", requirement: "ART Act + State Registration as ART Bank" },
        { facility: "Surrogacy Clinic", requirement: "ART Act + Surrogacy Act + State Board Registration" },
        { facility: "Gynaecology Clinic with IUI Services", requirement: "ART Act + State ART Authority Registration" },
        { facility: "Reproductive Medicine Unit (Superspeciality Hospital)", requirement: "ART Act + State ART Authority Registration" },
      ],
    },
    consequences: {
      heading: "What Happens Without ART Act Registration",
      bullets: [
        "Imprisonment of up to five years and a fine of up to ten lakh rupees on first conviction",
        "Closure of the unregistered facility by order of the registration authority",
        "Legal invalidity of all ART procedures performed at the facility",
        "Professional disciplinary exposure for the practitioners involved",
        "Complete ineligibility for health insurance empanelment for fertility services",
        "Ineligibility for medical tourism fertility programmes",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Designs ART-Compliant Fertility Centres",
      bullets: [
        "ART Act and ICMR guideline review at brief stage, translated into infrastructure specifications before design begins",
        "Dedicated HVAC design for the IVF laboratory: HEPA filtration, positive pressure, temperature and humidity control",
        "Embryo-safe material specification for every surface in the laboratory, verified against embryotoxicity data",
        "Cryostorage facility design with floor loading, ventilation, oxygen monitoring, and alarm systems",
        "UPS and generator backup architecture for every critical laboratory and cryostorage system",
        "Workflow and adjacency planning between retrieval, lab, transfer, and andrology spaces",
        "Patient-centred consultation and counselling space design",
        "Regulatory documentation support for the registration application",
      ],
    },
    faqs: [
      { q: "What is the ART Act 2021 and does it apply to my IVF centre?", a: "It is the central legislation regulating all ART clinics and banks in India. If your facility offers IVF, ICSI, IUI, embryo transfer, egg freezing, or sperm banking, you must register with the State ART and Surrogacy Board before offering those services." },
      { q: "What is the difference between an ART clinic and an ART bank?", a: "An ART clinic provides ART services to patients. An ART bank procures, screens, stores, and supplies gametes. Some facilities are both, and each requires separate registration." },
      { q: "What are the minimum infrastructure requirements for an IVF laboratory?", a: "A dedicated, HEPA-filtered, positively pressurised lab with controlled temperature and humidity, laminar flow workstations, CO2 incubators, a cryostorage facility with ventilation and oxygen monitoring, a retrieval room, an embryo transfer room, an andrology lab, and emergency power backup." },
      { q: "Can an existing gynaecology clinic register as an ART clinic?", a: "Yes, provided it meets the minimum infrastructure, equipment, and personnel requirements. If a dedicated IVF lab, cryostorage, and procedure rooms don't exist, the physical infrastructure must be built out first." },
      { q: "How long does ART Act registration take?", a: "Typically two to six months from a complete application submission, though physical facility preparation, design, construction, and equipment installation takes substantially longer and must be finished first." },
      { q: "Does ARCHORA design IVF laboratories to ART Act and ICMR standards?", a: "Yes, including HVAC and air quality design, embryo-safe material specification, cryostorage design, emergency power architecture, workflow planning, and registration documentation." },
    ],
  },

  // ───────────────────────── CEA ─────────────────────────
  {
    slug: "clinical-establishments-act",
    abbr: "CEA",
    fullName: "Clinical Establishments (Registration and Regulation) Act, 2010",
    color: "#7eb8f7",
    metaDesc: "Complete guide to Clinical Establishments Act registration in India for healthcare facilities.",
    heroH1: "Clinical Establishments Act Registration in India",
    heroSub: "Complete guide to CEA applicability, registration categories, minimum standards, the state-by-state registration process, and how ARCHORA designs facilities that meet CEA requirements from day one.",
    whatIsIt: {
      heading: "What is the Clinical Establishments Act?",
      body: [
        "The Clinical Establishments (Registration and Regulation) Act, 2010, the CEA, is the central legislation mandating registration and regulation of all clinical establishments in India, prescribing the minimum standards of facilities and services they must provide.",
        "The Act defines a clinical establishment as any hospital, maternity home, nursing home, dispensary, clinic, sanatorium, or institution offering diagnosis, treatment, or care for illness, injury, deformity, or pregnancy in any recognised system of medicine.",
        "In simple terms, if your facility sees, diagnoses, or treats patients in any system of medicine, you are operating a clinical establishment and must register under the CEA or the equivalent state legislation.",
        "CEA registration is the foundational legal compliance requirement for every healthcare facility in India, and the first step before any other accreditation or licensing process can begin.",
      ],
    },
    whyItMatters: {
      heading: "Central Act and State Adoption",
      body: [
        "The central CEA 2010 applies directly to states and union territories that have formally adopted it, including Arunachal Pradesh, Himachal Pradesh, Mizoram, Sikkim, and all UTs, with several other states subsequently adopting it.",
        "Major states including Maharashtra, Karnataka, Tamil Nadu, Telangana, Kerala, Gujarat, and Rajasthan have their own equivalent state-level clinical establishment or nursing home registration legislation with the same fundamental obligation.",
        "Regardless of which Act applies, every clinical establishment must register with the appropriate authority, meet the minimum standards for its category, and maintain that registration through periodic renewal.",
      ],
    },
    whoNeedsIt: {
      heading: "Who Needs CEA Registration",
      groups: [
        { title: "Hospitals & Inpatient Facilities", items: ["Multi/superspeciality hospitals of all sizes", "Nursing homes, maternity homes, small hospitals", "Day care surgery centres", "Rehabilitation and long-term care facilities", "Psychiatric and mental health hospitals", "Palliative care centres and hospices", "Addiction and de-addiction centres"] },
        { title: "Outpatient & Primary Care", items: ["Clinics and polyclinics of all types", "Specialist outpatient facilities", "Private-sector primary health centres", "Wellness and preventive health centres offering clinical services"] },
        { title: "Diagnostic & Imaging", items: ["Diagnostic centres and pathology labs", "Radiology and imaging centres", "Blood banks and transfusion services", "Genetic testing laboratories"] },
        { title: "Specialty & Teaching Institutions", items: ["IVF labs and fertility centres", "Dialysis centres", "Eye care and dental hospitals", "Medical, nursing, and allied health teaching institutions"] },
      ],
    },
    process: {
      heading: "CEA Registration — Step by Step",
      steps: [
        { step: "01", title: "Determine Applicable Legislation", desc: "Identify whether the central CEA 2010 or your state's equivalent Act applies, which sets the authority and standards." },
        { step: "02", title: "Determine Facility Category", desc: "Hospitals, clinics, and diagnostic facilities are each categorised, and the category sets the specific minimum standards." },
        { step: "03", title: "Prepare the Facility to Minimum Standards", desc: "Space, sanitation, ventilation, fire safety, and waste management infrastructure must meet category standards before applying." },
        { step: "04", title: "Compile the Application", desc: "Building plans, staff credentials, equipment inventory, Fire NOC, and biomedical waste authorisation are assembled." },
        { step: "05", title: "Submit & Pay the Fee", desc: "The application is filed with the registration authority, often through an online state portal, with the prescribed fee." },
        { step: "06", title: "Inspection", desc: "An inspection team verifies physical infrastructure, staffing, and equipment against the prescribed minimum standards." },
        { step: "07", title: "Registration Certificate", desc: "On a satisfactory inspection, the authority issues the certificate specifying category, in-charge practitioner, and validity." },
        { step: "08", title: "Display & Ongoing Compliance", desc: "The certificate and service rates must be displayed; registration is renewed at defined intervals, typically annually." },
      ],
    },
    referenceTable: {
      heading: "CEA Registration by Facility Type",
      rows: [
        { facility: "Multispeciality Hospital", requirement: "Hospital category, by bed capacity" },
        { facility: "Nursing Home / Small Hospital", requirement: "Nursing Home category, by bed capacity" },
        { facility: "Day Care Surgery Centre", requirement: "Day Care Surgical Facility" },
        { facility: "Clinic and Polyclinic", requirement: "Clinic category, by speciality" },
        { facility: "Diagnostic Centre", requirement: "Diagnostic Centre category" },
        { facility: "Clinical Pathology Laboratory", requirement: "Laboratory category (with NABL ISO 15189)" },
        { facility: "IVF Lab and Fertility Centre", requirement: "Fertility Centre category (with ART Authority)" },
        { facility: "Blood Bank", requirement: "Blood Bank category (with Drugs & Cosmetics Act)" },
        { facility: "Medical College Teaching Hospital", requirement: "Hospital category (with NMC approval)" },
      ],
    },
    consequences: {
      heading: "What Happens Without CEA Registration",
      bullets: [
        "A fine on conviction for operating without registration, with enhanced penalties for repeat offences",
        "Closure of the clinical establishment by order of the registration authority",
        "Ineligibility for Ayushman Bharat, CGHS, ESIS, and all state government scheme empanelment",
        "Ineligibility for insurance company cashless facility empanelment",
        "Inability to proceed with NABH accreditation, which requires CEA registration as a prerequisite",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Delivers CEA-Ready Facilities",
      bullets: [
        "CEA category determination at brief stage so minimum standards are the design target from day one",
        "Space planning for inpatient, consultation, and procedure rooms to meet or exceed prescribed dimensions",
        "Sanitation and hygiene infrastructure designed to prescribed provisions per bed and clinical area",
        "Biomedical waste segregation, storage, and movement routes designed into the layout",
        "Fire safety infrastructure aligned to both CEA registration and full Fire NOC requirements",
        "Complete as-built documentation handover in the format required for the registration application",
        "Support compiling and submitting the registration application through to certificate issuance",
      ],
    },
    faqs: [
      { q: "What is the Clinical Establishments Act and does it apply to my facility?", a: "It is the central Indian legislation requiring registration of all clinical establishments. If your facility sees, diagnoses, or treats patients in any system of medicine, it requires registration under the CEA or your state's equivalent Act." },
      { q: "Is CEA registration the same as NABH accreditation?", a: "No. CEA registration is the mandatory legal registration confirming minimum standards are met. NABH accreditation is a voluntary quality credential confirming internationally benchmarked standards. NABH cannot be pursued without CEA registration in place." },
      { q: "What is provisional registration?", a: "A time-limited registration for a new facility that is still completing all prescribed minimum standards, allowing it to operate legally while finishing the full registration process." },
      { q: "Do diagnostic centres and laboratories need CEA registration?", a: "Yes. Diagnostic centres, pathology labs, imaging centres, and blood banks are clinical establishments under the Act and require CEA registration in addition to any NABL or NABH accreditation." },
      { q: "Does a doctor's individual clinic need CEA registration?", a: "Yes. Any clinic operated by a medical practitioner, general or specialist, is a clinical establishment under the Act and requires registration, though the process is simpler than for hospitals." },
      { q: "Can ARCHORA help with CEA registration for my new facility?", a: "Yes. We design and build your facility to meet the physical infrastructure minimum standards for CEA registration in your state, and support compiling the registration application through to certificate issuance." },
    ],
  },

  // ───────────────────────── NABL ─────────────────────────
  {
    slug: "nabl",
    abbr: "NABL",
    fullName: "National Accreditation Board for Testing and Calibration Laboratories",
    color: "#a78bfa",
    metaDesc: "Complete guide to NABL accreditation for clinical, pathology, biochemistry, microbiology, molecular, and diagnostic laboratories in India. Understand ISO 15189, the NABL accreditation process, laboratory infrastructure requirements, and how ARCHORA designs NABL-ready laboratories from day one.",
    heroH1: "NABL Accreditation for Medical Laboratories in India",
    heroSub: "Complete guide to ISO 15189, the NABL accreditation process, laboratory infrastructure requirements, and how ARCHORA designs NABL-ready laboratories from day one — for clinical pathology, biochemistry, microbiology, molecular, and diagnostic laboratories.",
    whatIsIt: {
      heading: "What is NABL?",
      body: [
        "NABL stands for the National Accreditation Board for Testing and Calibration Laboratories. It is India's premier accreditation body for testing and calibration laboratories, functioning under the Quality Council of India, which operates under the Department for Promotion of Industry and Internal Trade, Government of India.",
        "In the healthcare context, NABL accreditation is the formal recognition that a medical laboratory meets the internationally benchmarked standard for laboratory quality management and technical competence defined by ISO 15189:2022, the International Standard for Medical Laboratories. It certifies that a laboratory's physical infrastructure, equipment, personnel, processes, quality management systems, and result reporting all conform to a standard recognised by international accreditation bodies and accepted by healthcare regulators, insurers, and clinical institutions in India and internationally.",
        "For any clinical pathology, biochemistry, microbiology, molecular diagnostics, genetics, or hospital in-house laboratory operating in India today, NABL accreditation under ISO 15189 is the most important quality benchmark the laboratory can achieve and one of the most significant compliance requirements it must plan for from the very beginning of facility design.",
      ],
    },
    whyItMatters: {
      heading: "Why NABL Accreditation Matters for Your Laboratory",
      body: [
        "Government and insurance empanelment, hospital and clinical referral trust, medico-legal standing, medical tourism eligibility, and corporate occupational health contracts are all directly affected by NABL accreditation status. Ayushman Bharat PM-JAY and CGHS give preference to NABL-accredited laboratories for panel inclusion and maintain higher reimbursement rates, and many insurers require NABL accreditation as a condition of cashless empanelment for laboratory services.",
        "ISO 15189's technical requirements have direct and specific implications for how a laboratory must be physically designed and built — this is the dimension of NABL planning most laboratory developers underestimate. Functional zone separation, environmental monitoring, biosafety cabinet provision, fume cupboard provision, and discipline-specific utility services are all assessed against the standard, and most cannot be retrofitted cost-effectively after construction.",
        "The most consequential example is the molecular diagnostics laboratory: the classic three-room PCR layout, with reagent preparation, sample preparation, and amplification and detection physically separated to prevent amplicon contamination, is the accepted standard for a compliant facility and cannot be retrofitted into a single-room or open-plan space.",
      ],
    },
    whoNeedsIt: {
      heading: "Laboratory Types Requiring NABL Accreditation",
      groups: [
        { title: "Clinical & Diagnostic Laboratories", items: ["Clinical pathology laboratory — haematology, biochemistry, serology, urinalysis", "Biochemistry laboratory", "Microbiology laboratory — culture, sensitivity, serology, virology", "Immunology laboratory — immunoassay, flow cytometry, autoimmune testing"] },
        { title: "Specialised Laboratories", items: ["Molecular diagnostics laboratory — PCR, RT-PCR, NGS", "Genetics laboratory — cytogenetics, molecular genetics, genomics", "Histopathology and cytopathology laboratory", "Blood bank and transfusion medicine"] },
        { title: "Institutional Laboratories", items: ["Hospital in-house laboratory", "Standalone reference laboratory", "Research and clinical trial laboratory (with NABH Ethics Committee)"] },
      ],
    },
    process: {
      heading: "NABL Accreditation — Step by Step",
      steps: [
        { step: "01", title: "Gap Analysis Against ISO 15189", desc: "For a new laboratory, the gap analysis defines physical infrastructure, equipment, and quality management requirements before design begins." },
        { step: "02", title: "Quality Management System Development", desc: "The laboratory drafts the quality manual, SOPs for every pre-analytical, analytical, and post-analytical process, and competency frameworks." },
        { step: "03", title: "Application to NABL", desc: "Submitted through the NABL online portal, identifying the laboratory, scope of accreditation by discipline, and key personnel." },
        { step: "04", title: "Desktop Review", desc: "NABL reviews the submitted quality management system documentation before an on-site assessment is scheduled." },
        { step: "05", title: "On-Site Assessment", desc: "A lead assessor and technical assessors evaluate infrastructure, equipment records, personnel competency, and analytical performance through witness testing." },
        { step: "06", title: "Non-Conformity Management", desc: "The laboratory addresses all identified non-conformities within a defined timeframe, with documented root cause analysis and corrective evidence." },
        { step: "07", title: "Accreditation Decision", desc: "NABL's accreditation committee reviews the assessment report and non-conformity closure evidence and grants accreditation for a defined scope." },
        { step: "08", title: "Surveillance and Renewal", desc: "Accreditation is granted for two years with surveillance assessments, and full reassessment against ISO 15189 at renewal." },
      ],
    },
    referenceTable: {
      heading: "NABL Compliance by Laboratory Type",
      rows: [
        { facility: "Clinical Pathology Laboratory", requirement: "ISO 15189:2022 — haematology, biochemistry, serology, urinalysis" },
        { facility: "Microbiology Laboratory", requirement: "ISO 15189:2022 — culture, sensitivity, serology, virology" },
        { facility: "Molecular Diagnostics Laboratory", requirement: "ISO 15189:2022 — three-zone PCR layout mandatory" },
        { facility: "Genetics Laboratory", requirement: "ISO 15189:2022 — cytogenetics, molecular genetics, genomics" },
        { facility: "Histopathology Laboratory", requirement: "ISO 15189:2022 — tissue examination and cytopathology" },
        { facility: "Blood Bank & Transfusion Medicine", requirement: "ISO 15189:2022 — component preparation, storage, cross-match" },
        { facility: "Hospital In-House Laboratory", requirement: "ISO 15189:2022 — full or defined scope" },
        { facility: "Research & Clinical Trial Laboratory", requirement: "ISO 15189 + NABH Ethics Committee for GCP operations" },
      ],
    },
    consequences: {
      heading: "What Happens Without NABL Accreditation",
      bullets: [
        "Government healthcare scheme reimbursement rates for laboratory tests are lower in non-accredited facilities",
        "Insurance company empanelment for laboratory services is restricted or denied, reducing accessible patient population",
        "Referring clinicians and hospitals give preference to NABL-accredited laboratories, directly affecting referral volumes",
        "Medico-legal standing of laboratory results is weaker in the absence of a verified, independently audited quality management system",
        "Medical tourism patient pathways almost universally require internationally recognised laboratory quality accreditation",
        "Corporate occupational health and pre-employment medical contracts are unavailable to non-accredited laboratories in most organised procurement frameworks",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Designs NABL-Ready Laboratories",
      bullets: [
        "Discipline-specific space programming based on examinations, instruments, and ISO 15189 accommodation requirements for each discipline",
        "Functional zone planning: physical separation of pre-analytical, analytical, and post-analytical zones with defined traffic flow for samples, personnel, and waste",
        "PCR laboratory three-room design built in as a non-negotiable standard wherever molecular diagnostics is in scope",
        "Biosafety and ventilation design: biosafety cabinet positioning and extract ventilation for microbiology and chemical use areas",
        "Laboratory services infrastructure: electrical supply, water purification, drainage, medical gas, and data cabling designed before finishes are applied",
        "Equipment layout and clearance planning coordinated with instrument vendor specifications before construction",
      ],
    },
    faqs: [
      { q: "What is NABL accreditation and why does my laboratory need it?", a: "NABL accreditation is the formal recognition by the National Accreditation Board for Testing and Calibration Laboratories that your laboratory meets ISO 15189, the international standard for medical laboratory quality and competence. It determines your eligibility for government and insurance empanelment, hospital referral volumes, and your laboratory's medico-legal standing." },
      { q: "What is ISO 15189 and how is it different from ISO 9001?", a: "ISO 15189 is the specific international standard for medical laboratories, covering both management system and technical competence requirements for laboratories producing clinical results used in patient diagnosis. ISO 9001 is a generic quality standard across all industries. NABL accreditation for medical laboratories is granted against ISO 15189, not ISO 9001." },
      { q: "Which laboratory types require NABL accreditation?", a: "All medical laboratories performing clinical examinations on biological samples for diagnosis, monitoring, or treatment — clinical pathology, biochemistry, microbiology, haematology, molecular diagnostics, genetics, histopathology, blood banks, immunology, and research laboratories." },
      { q: "What is the difference between NABL accreditation and NABH laboratory certification?", a: "NABL ISO 15189 is the internationally recognised standard assessed by NABL directly. NABH Medical Laboratory Certification is a NABH-administered programme for hospital in-house laboratories. NABL is the more rigorous and internationally recognised standard, and the preferred benchmark for laboratories with the scale to pursue it." },
      { q: "How long does NABL accreditation take?", a: "Typically 12 to 18 months for a well-prepared laboratory, depending on the scope of disciplines being accredited and the baseline readiness of infrastructure and quality systems." },
      { q: "Can ARCHORA design a PCR or molecular diagnostics laboratory to NABL standards?", a: "Yes. ARCHORA designs molecular diagnostics laboratories with the mandatory three-zone physical separation of reagent preparation, sample preparation, and amplification and detection as a fundamental design requirement, alongside biosafety cabinet provision and extract ventilation — built in from the start, since it cannot be retrofitted cost-effectively afterward." },
    ],
  },

  // ───────────────────────── NABH ─────────────────────────
  {
    slug: "nabh",
    abbr: "NABH",
    fullName: "National Accreditation Board for Hospitals and Healthcare Providers",
    color: "#4bd1d9",
    metaDesc: "Complete guide to NABH accreditation in India. Understand NABH standards, programmes, eligibility, the step-by-step accreditation process, and how ARCHORA builds NABH-compliant healthcare facilities from day one.",
    heroH1: "NABH Accreditation in India — Complete Guide for Hospitals and Healthcare Facilities",
    heroSub: "Complete guide to NABH standards, programmes, eligibility, and the step-by-step accreditation process, and how ARCHORA builds NABH-compliant healthcare facilities from day one — for hospitals, clinics, diagnostic centres, labs, and every healthcare facility type.",
    whatIsIt: {
      heading: "What is NABH?",
      body: [
        "NABH stands for the National Accreditation Board for Hospitals and Healthcare Providers. It is the apex accreditation body for healthcare organisations in India, functioning under the Quality Council of India, which itself operates under the Department for Promotion of Industry and Internal Trade under the Government of India.",
        "NABH accreditation is the formal recognition that a healthcare facility meets nationally and internationally benchmarked standards of patient care, safety, clinical governance, infection control, and operational quality. It is not a registration or a licence. It is a structured, independently audited quality certification that evaluates every dimension of how a healthcare facility is designed, operated, staffed, and managed.",
        "For any hospital, clinic, diagnostic centre, laboratory, blood bank, or healthcare facility operating in India today, NABH accreditation is the single most important quality benchmark a facility can achieve and the single most important compliance framework that must be embedded into its physical infrastructure from the very first day of design.",
      ],
    },
    whyItMatters: {
      heading: "Why NABH Accreditation Matters",
      body: [
        "NABH accreditation has consequences that extend far beyond a certificate on a wall. For healthcare facility owners, hospital promoters, and healthcare investors in India, the decision to pursue NABH accreditation or to defer it is one of the most consequential capital planning decisions they will make.",
        "It directly determines government empanelment eligibility under Ayushman Bharat PM-JAY, CGHS, ESI, and state schemes; insurance company cashless empanelment and package rates; eligibility for medical tourism and international patient programmes; the ability to recruit and retain qualified specialist consultants; and institutional protection in clinical negligence disputes and regulatory inquiries.",
        "Critically, NABH compliance is fundamentally a physical infrastructure challenge before it is a clinical systems challenge. Ventilation and HVAC configurations, infection control zoning, isolation room design, nurse station placement, door widths, medical gas systems, fire safety, CSSD workflow, and medication storage are all assessed against NABH standards and cannot be retrofitted cost-effectively once a building is constructed. When NABH standards are not embedded from the beginning, rectifying these deficiencies can cost 20 to 40 percent of the original construction cost — and in some cases requires partial demolition and reconstruction.",
      ],
    },
    whoNeedsIt: {
      heading: "NABH Accreditation Programmes — Who They Apply To",
      groups: [
        { title: "Hospitals & Clinical Facilities", items: ["NABH HCO — multi/superspeciality hospitals, cancer hospitals, cardiac hospitals", "NABH Entry Level Certification for HCO", "NABH SHCO — nursing homes, small hospitals, day care surgery, dialysis centres", "NABH Allopathic Clinics — outpatient clinics and polyclinics", "NABH Eye Care Organisation (ECO)", "NABH Dental Healthcare", "NABH AYUSH", "NABH Care Homes — palliative care and long-term care"] },
        { title: "Diagnostic & Imaging / Laboratories", items: ["NABH Medical Imaging Services (MIS) — diagnostic and imaging centres", "NABH Blood Bank", "NABH Medical Laboratory Certification — clinical laboratories"] },
        { title: "Specialised & Emerging", items: ["NABH IRCA — addiction and rehabilitation centres", "NABH Stroke Centre Certification", "NABH Medical Value Travel Facility (MVTF)", "NABH Digital Health", "NABH Wellness Certification", "NABH Panchakarma", "NABH Emergency Department Certification", "NABH PHC — Primary Health Centres"] },
      ],
    },
    process: {
      heading: "NABH Accreditation — Step by Step",
      steps: [
        { step: "01", title: "Gap Analysis and Readiness Assessment", desc: "For a new facility, the gap analysis against the applicable NABH standard must happen at the design stage, not after the building is complete." },
        { step: "02", title: "Application to NABH", desc: "The facility submits a formal application through the NABH online portal, specifying facility details, scope of services, and the programme sought." },
        { step: "03", title: "Self-Assessment", desc: "Following acceptance, the facility conducts a structured self-assessment against the full standard across every chapter, submitted to NABH as a precondition." },
        { step: "04", title: "Pre-Assessment Visit", desc: "An optional but recommended visit by NABH assessors identifies remediation areas before the formal assessment is conducted." },
        { step: "05", title: "Final Assessment Visit", desc: "NABH-empanelled assessors evaluate physical infrastructure, documentation, staff competency, clinical processes, and governance on site." },
        { step: "06", title: "Accreditation Decision", desc: "NABH's Accreditation Committee reviews the assessment report; facilities with significant non-conformities are given a defined remediation period." },
        { step: "07", title: "Accreditation Certificate and Surveillance", desc: "Accreditation is granted for a defined period, typically three years, with surveillance assessments and full reassessment at renewal." },
      ],
    },
    referenceTable: {
      heading: "NABH Compliance by Facility Type",
      rows: [
        { facility: "Multispeciality / Superspeciality Hospital", requirement: "NABH HCO Accreditation" },
        { facility: "Oncology, Cardiac & Cath Lab Hospital", requirement: "NABH HCO Accreditation" },
        { facility: "Nursing Home & Day Care Surgery Centre", requirement: "NABH SHCO or Entry Level Certification" },
        { facility: "Clinic and Polyclinic", requirement: "NABH Allopathic Clinics" },
        { facility: "Eye Care / Dental / AYUSH Hospital", requirement: "NABH ECO / Dental / AYUSH Accreditation" },
        { facility: "Diagnostic & Imaging Centre", requirement: "NABH Medical Imaging Services" },
        { facility: "Blood Bank", requirement: "NABH Blood Bank Accreditation" },
        { facility: "Clinical Pathology Laboratory", requirement: "NABH Medical Laboratory Certification" },
        { facility: "Palliative Care & Rehabilitation Centre", requirement: "NABH Care Homes / IRCA Accreditation" },
        { facility: "Medical College Teaching Hospital", requirement: "NABH HCO (for attached hospital)" },
      ],
    },
    consequences: {
      heading: "What Happens Without NABH Accreditation",
      bullets: [
        "Government scheme empanelment is unavailable or restricted, eliminating access to Ayushman Bharat and state patient populations",
        "Insurance cashless empanelment is denied or offered at lower package rates",
        "Attracting senior specialist consultants becomes significantly more difficult",
        "Medical tourism and international patient referrals are not accessible without internationally recognised accreditation",
        "Absence of NABH removes the documented quality governance framework that provides institutional protection in legal proceedings",
        "Government tenders and PPP healthcare infrastructure opportunities increasingly require NABH as a qualifying criterion",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Delivers NABH-Compliant Healthcare Facilities",
      bullets: [
        "Gap analysis against the applicable NABH standard at project brief stage, before a single layout is drawn",
        "Infection control zoning, traffic flow separation, ventilation specifications, and clinical adjacency built into the architectural brief",
        "MEP systems — HVAC, medical gas, electrical, fire safety — designed to the specific NABH and referenced standards for the facility type",
        "CSSD, pharmacy, waste management, and isolation rooms designed to NABH physical infrastructure requirements from first schematic design",
        "Clinical workflow planning aligned with NABH care-of-patients and infection control standards",
        "Documentation frameworks and quality management system foundations integrated into the project handover package",
      ],
    },
    faqs: [
      { q: "What is NABH accreditation and why is it important for my hospital?", a: "NABH accreditation is the formal recognition by the National Accreditation Board for Hospitals and Healthcare Providers that your facility meets nationally and internationally benchmarked standards of patient safety, clinical quality, and operational governance. It determines your eligibility for government scheme empanelment, insurance cashless empanelment, medical tourism patient access, and specialist recruitment." },
      { q: "Is NABH accreditation mandatory in India?", a: "It is not universally mandatory by law, but it is a mandatory prerequisite for empanelment under Ayushman Bharat PM-JAY and many state schemes, for cashless empanelment with major insurers, and for participation in government tenders and PPP programmes. For any serious healthcare facility, it is effectively non-negotiable." },
      { q: "How long does it take to get NABH accreditation?", a: "Typically between 12 and 24 months from the time a facility begins formal preparation, depending on facility type, size, and baseline readiness. For a new facility, the timeline begins at the design stage, not at the point of opening." },
      { q: "What is the difference between NABH HCO and NABH SHCO?", a: "NABH HCO is the full hospital accreditation standard for large and mid-size hospitals with comprehensive inpatient services. NABH SHCO is calibrated for small healthcare organisations — nursing homes, small hospitals, day care surgery, and dialysis centres — while maintaining the same fundamental patient safety principles." },
      { q: "Can a newly built hospital apply for NABH accreditation immediately?", a: "A newly built hospital can begin the process from the point of opening, but most NABH programmes require a minimum operational period of evidence — covering active clinical processes and documentation practices — before the formal assessment visit." },
      { q: "Does ARCHORA handle the NABH accreditation process directly?", a: "ARCHORA designs and builds healthcare facilities that are NABH-compliant by physical infrastructure from day one, so your accreditation preparation focuses on clinical systems and documentation rather than expensive infrastructure remediation. We work alongside specialist healthcare consultants for the clinical and documentation dimensions as required." },
    ],
  },

  // ───────────────────────── INC ─────────────────────────
  {
    slug: "inc",
    abbr: "INC",
    fullName: "Indian Nursing Council",
    color: "#f59e0b",
    metaDesc: "Complete guide to INC approval for nursing colleges, BSc Nursing, GNM, and post-basic nursing programmes in India. Understand INC infrastructure requirements, clinical facility standards, hostel provisions, and how ARCHORA designs INC-compliant nursing colleges from day one.",
    heroH1: "INC Approval for Nursing Colleges and Schools of Nursing in India",
    heroSub: "Complete guide to INC infrastructure requirements, clinical facility standards, hostel provisions, the step-by-step approval process, and how ARCHORA designs INC-compliant nursing college and hospital complexes from day one.",
    whatIsIt: {
      heading: "What is the INC?",
      body: [
        "The Indian Nursing Council is the statutory body established under the Indian Nursing Council Act, 1947, to establish a uniform standard of training for nurses, midwives, auxiliary nurses and midwives, and health visitors across India. The INC is the apex national regulatory authority for nursing education in India, and its approval is mandatory for every nursing college and school of nursing that wishes to conduct recognised nursing programmes whose graduates are eligible for registration as nurses in India.",
        "The INC works in conjunction with State Nursing Councils, the state-level regulatory bodies for nursing practice and registration. For a nursing college to be fully functional, it must obtain both INC approval at the national level and recognition from the State Nursing Council of the state in which it operates, alongside an affiliating university recognised by the UGC.",
        "For healthcare facility developers, hospital promoters, and healthcare entrepreneurs, INC approval is the entry point for establishing a nursing education institution in India — one of the fastest-growing segments of healthcare education, driven by a severe national shortage of trained nurses and rapidly expanding global demand for Indian nursing professionals.",
      ],
    },
    whyItMatters: {
      heading: "Why INC Compliance Matters for Healthcare Infrastructure",
      body: [
        "A nursing college does not exist in isolation. It requires a functioning hospital with a defined minimum bed strength as its clinical training facility, sufficient patient volumes across defined clinical specialties, clinical training wards, a skills laboratory for pre-clinical and simulation training, and — in most states — mandatory hostel accommodation for nursing students.",
        "This means a standalone nursing college cannot be established without either owning or holding a formal affiliation agreement with a qualifying hospital. The hospital's bed strength, clinical activity levels, and ward organisation directly determine whether the nursing college can obtain and maintain INC approval.",
        "For hospital promoters, this creates a powerful strategic opportunity: a hospital that meets INC clinical training requirements can support a nursing college that provides a captive pipeline of trained nursing staff, solving the nurse recruitment challenge every Indian hospital faces. ARCHORA's value in this space lies in designing both the hospital and the nursing college simultaneously, as a single coordinated complex.",
      ],
    },
    whoNeedsIt: {
      heading: "Nursing Programmes Regulated by INC",
      groups: [
        { title: "Undergraduate Programmes", items: ["BSc Nursing — four-year undergraduate degree, the most resource-intensive programme", "Post-Basic BSc Nursing — two-year upgrade programme for GNM-qualified nurses"] },
        { title: "Diploma Programmes", items: ["General Nursing and Midwifery (GNM) — three-and-a-half-year diploma, the most widely offered nursing programme in India", "Auxiliary Nurse Midwife (ANM) — one-and-a-half-year certificate programme for community health workers"] },
        { title: "Postgraduate & Doctoral Programmes", items: ["MSc Nursing — two-year postgraduate degree, requiring an established BSc Nursing programme", "Post-Graduate Diploma in Nursing Specialties — critical care, oncology, paediatric and other specialties", "PhD in Nursing — research doctoral programme requiring advanced research infrastructure"] },
      ],
    },
    process: {
      heading: "INC Approval Process — Step by Step",
      steps: [
        { step: "01", title: "Essentiality Certificate from State Government", desc: "Confirms that establishing a nursing college at the proposed location is in the public interest." },
        { step: "02", title: "Application to State Nursing Council", desc: "The State Nursing Council reviews the application, conducts a preliminary assessment, and forwards its recommendation to the INC." },
        { step: "03", title: "Application to INC", desc: "Includes land ownership proof, hospital affiliation agreement, building plans, equipment inventory, library catalogue, faculty list, and the hospital's CEA registration." },
        { step: "04", title: "Physical Inspection", desc: "The INC inspection team evaluates the college building, hostel, and the attached hospital's bed strength, clinical departments, and patient volumes." },
        { step: "05", title: "INC Approval and State Recognition", desc: "Following a satisfactory inspection, the INC grants approval for the proposed intake and the State Nursing Council grants recognition." },
        { step: "06", title: "Annual Compliance and Renewal", desc: "Colleges must maintain continuous compliance with faculty strength, skills laboratory equipment, hostel provisions, and hospital clinical activity to retain approval." },
      ],
    },
    referenceTable: {
      heading: "INC Compliance by Facility Type",
      rows: [
        { facility: "BSc Nursing College (60-seat intake)", requirement: "Minimum 300-bed affiliated hospital in active clinical use" },
        { facility: "GNM Diploma College (60-seat intake)", requirement: "Minimum 100-bed affiliated hospital in active clinical use" },
        { facility: "MSc Nursing Programme", requirement: "Established BSc Nursing programme + postgraduate clinical exposure provisions" },
        { facility: "Nursing Fundamentals & Skills Laboratory", requirement: "INC minimum floor area, procedure stations, mannequins, demonstration area" },
        { facility: "Nursing College Hostel", requirement: "Mandatory residential accommodation per INC and State Nursing Council standards" },
        { facility: "Attached Hospital — Clinical Departments", requirement: "Medicine, Surgery, Obs & Gynae with labour room, Paediatrics, Orthopaedics, ICU, OT, OPD, Emergency" },
      ],
    },
    consequences: {
      heading: "What Happens Without INC Approval",
      bullets: [
        "BSc and GNM/diploma qualifications awarded by an unrecognised college have no regulatory standing",
        "Graduates cannot be registered with the State Nursing Council and cannot legally practise as nurses",
        "University affiliation for the nursing programme cannot be maintained without INC approval",
        "Insufficient hospital bed strength or patient volumes is one of the most frequent causes of inspection failure or conditional approval",
        "Government scholarship and seat allocation programmes exclude unrecognised colleges",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Designs INC-Compliant Nursing College and Hospital Complexes",
      bullets: [
        "Programme determination at brief stage — nursing programmes, intake sizes, and applicable INC minimum standards mapped before design begins",
        "Nursing college building design: classrooms, lecture theatre, library, and administrative facilities to INC minimum area and provision standards",
        "Skills laboratory design with the correct number of procedure stations, midwifery skills area, and community health nursing provisions",
        "Hostel design to INC and State Nursing Council residential requirements: room provision, dining, sanitation, warden accommodation, and security",
        "Hospital clinical training infrastructure: wards, OT, ICU, labour room, OPD, and emergency department meeting both clinical care and INC training standards",
        "Ward design with nursing station positioning and supervision sightlines for supervised student practice",
        "Campus masterplanning of the college, hostel, and hospital as a single integrated complex",
      ],
    },
    faqs: [
      { q: "What is the INC and why is its approval required for a nursing college?", a: "The Indian Nursing Council is the statutory apex body for nursing education regulation in India, established under the Indian Nursing Council Act 1947. Its approval is mandatory for any nursing college whose graduates are to be eligible for state nursing council registration. Without INC approval, nursing degrees and diplomas have no regulatory standing." },
      { q: "What is the minimum hospital bed requirement for a BSc Nursing college?", a: "The INC minimum standards require a minimum of 300 beds in the affiliated hospital for a BSc Nursing programme with a 60-seat annual intake, in active clinical use across mandatory departments including medicine, surgery, obstetrics and gynaecology, paediatrics, and orthopaedics." },
      { q: "Does a nursing college need its own hospital or can it affiliate with an existing one?", a: "Either model works, provided the hospital — owned or affiliated under a formal agreement — meets the INC minimum bed strength, active clinical departments, and patient volume requirements." },
      { q: "Is hostel accommodation mandatory for nursing college students?", a: "Yes, in most states and under INC minimum standards, residential hostel accommodation is mandatory for a defined minimum proportion of student intake, typically a very high proportion, with specified standards for room size, sanitation, dining, warden accommodation, and security." },
      { q: "What is the difference between INC approval and State Nursing Council recognition?", a: "INC approval is the national-level regulatory recognition; State Nursing Council recognition is the state-level recognition. Both are mandatory, and in practice the State Council conducts the initial assessment and forwards its recommendation to the INC for final approval." },
      { q: "Can ARCHORA design and build a complete nursing college and hospital complex for INC approval?", a: "Yes. ARCHORA designs the nursing college building, skills laboratory, hostel, and attached hospital — including wards, OT complex, ICU, labour room, OPD, and emergency department — as a single integrated campus built to INC minimum standards from the brief stage." },
    ],
  },

  // ───────────────────────── NMC ─────────────────────────
  {
    slug: "nmc",
    abbr: "NMC",
    fullName: "National Medical Commission",
    color: "#f59e0b",
    metaDesc: "Complete guide to NMC approval for medical colleges and teaching hospitals in India. Understand NMC infrastructure requirements, MBBS seat approval, bed strength, department specifications, and how ARCHORA designs NMC-compliant medical college hospitals from day one.",
    heroH1: "NMC Approval for Medical Colleges and Teaching Hospitals in India",
    heroSub: "Complete guide to NMC infrastructure requirements, MBBS seat approval, bed strength, operation theatre and department specifications, and how ARCHORA designs NMC-compliant medical college and teaching hospital campuses from day one.",
    whatIsIt: {
      heading: "What is the NMC?",
      body: [
        "The National Medical Commission is the statutory body established under the National Medical Commission Act, 2020, to regulate medical education and practice in India. The NMC replaced the Medical Council of India, which was dissolved in September 2020, and assumed all regulatory functions previously performed by the MCI, including the approval of medical colleges, the prescription of standards for medical education, and the maintenance of the National Medical Register.",
        "The NMC is structured into four autonomous boards: the Under-Graduate Medical Education Board, the Post-Graduate Medical Education Board, the Medical Assessment and Rating Board, and the Ethics and Medical Registration Board. For healthcare infrastructure compliance, the most relevant function is the Medical Assessment and Rating Board's role in inspecting and approving medical colleges and their attached teaching hospitals.",
        "Every new medical college, every increase in MBBS intake seats, and every renewal of recognition for an existing medical college requires inspection and approval by the MARB against the minimum standards prescribed by the NMC.",
      ],
    },
    whyItMatters: {
      heading: "Why NMC Approval is the Most Demanding Infrastructure Compliance in Indian Healthcare",
      body: [
        "A medical college does not merely provide healthcare services. It is simultaneously a healthcare delivery institution and an educational institution — every physical space serves dual functions. The OPD is both a treatment facility and a teaching environment; wards are both inpatient units and training grounds; OTs are both surgical facilities and surgical training environments.",
        "This dual function means NMC minimum standards are more demanding, more specific, and more comprehensively specified than the standards applied to any other healthcare facility category in India — covering bed numbers, bed distribution across specialties, OT count and size, laboratories, library, hostels, lecture theatres, demonstration rooms, the anatomy department, OPD capacity, and dozens of other parameters, all calibrated to the MBBS intake.",
        "A medical college project that does not embed NMC compliance into its physical design from the very first line of the architectural brief will fail inspection. The consequences are severe: admission of students is prohibited, the college cannot function, and the construction investment generates zero return until compliance is achieved.",
      ],
    },
    whoNeedsIt: {
      heading: "NMC Minimum Standards — What They Cover",
      groups: [
        { title: "Teaching Hospital Infrastructure", items: ["Minimum bed strength scaled to MBBS intake (300 / 500 / 750 beds for 100 / 150 / 250 seats)", "Mandatory clinical departments with specialty bed distribution", "Operation theatre complex sized to intake (4 / 6 / 8 major OTs)", "Labour room, ICU, and 24-hour casualty and emergency department"] },
        { title: "Pre-Clinical & Para-Clinical Departments", items: ["Anatomy — dissection hall, museum, histology lab, embalming room", "Physiology, Biochemistry, Pathology, Microbiology, Pharmacology laboratories", "Forensic Medicine — autopsy suite and mortuary recognised by the state forensic authority", "Community Medicine — urban and rural health training centres"] },
        { title: "Academic & Residential Infrastructure", items: ["Lecture theatres, demonstration rooms, seminar rooms", "Central library meeting NMC minimum area and stock standards", "Simulation and clinical skills laboratory (CBME requirement)", "Student hostel, resident doctors' quarters, faculty quarters"] },
      ],
    },
    process: {
      heading: "NMC Approval Process — Step by Step",
      steps: [
        { step: "01", title: "Letter of Intent Application", desc: "Preliminary information on proposed location, promoter entity, intake, and land/infrastructure availability submitted through the NMC online portal." },
        { step: "02", title: "Essentiality Certificate from State Government", desc: "Confirms the establishment of a medical college at the proposed location is in the public interest and the state has no objection." },
        { step: "03", title: "Application to the Medical Assessment and Rating Board", desc: "Includes land ownership proof, approved building plans, hospital registration, clinical department details, faculty credentials, and financial resources." },
        { step: "04", title: "Compliance Assessment and Physical Inspection", desc: "The MARB inspects every clinical department, OT, ICU, OPD, pre-clinical laboratory, library, simulation lab, and hostel against NMC minimum standards for the proposed intake." },
        { step: "05", title: "Letter of Permission for Admission", desc: "Based on the assessment report, the NMC authorises commencement of MBBS admissions for the first batch, specifying the approved intake." },
        { step: "06", title: "Annual Renewals and Recognition", desc: "The college is inspected annually for the first several years to verify continued compliance and required patient/clinical activity volumes." },
        { step: "07", title: "Increase of Intake", desc: "Raising intake from 100 to 150 or 150 to 250 requires a separate application demonstrating upgraded bed strength, department capacity, and faculty strength." },
      ],
    },
    referenceTable: {
      heading: "NMC Bed Strength and OT Requirements by Intake",
      rows: [
        { facility: "100-Seat MBBS Intake", requirement: "Minimum 300 teaching beds + 4 major OTs + minor OT" },
        { facility: "150-Seat MBBS Intake", requirement: "Minimum 500 teaching beds + 6 major OTs + minor OTs" },
        { facility: "250-Seat MBBS Intake", requirement: "Minimum 750 teaching beds + 8 major OTs + minor OTs" },
        { facility: "General Medicine / General Surgery", requirement: "Minimum 60 beds each (100-seat intake)" },
        { facility: "Obstetrics & Gynaecology", requirement: "Minimum 40 beds + dedicated 24-hour labour room" },
        { facility: "Paediatrics / Orthopaedics", requirement: "Minimum 30 beds each (100-seat intake)" },
        { facility: "Casualty & Emergency Department", requirement: "24-hour operation, direct public entrance access" },
      ],
    },
    consequences: {
      heading: "What Happens Without NMC Approval",
      bullets: [
        "Admission of MBBS students is prohibited without a Letter of Permission from the NMC",
        "A medical college that fails inspection cannot function, regardless of construction and equipment investment already made",
        "MBBS degrees from an unrecognised or de-recognised college have no regulatory standing",
        "Intake increase requests are refused where bed strength, department capacity, or faculty have not been upgraded to the higher-intake standard",
        "University affiliation cannot be maintained in parallel without continued NMC compliance",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Designs NMC-Compliant Medical College Teaching Hospitals",
      bullets: [
        "NMC minimum standards mapping at brief stage — every requirement for the proposed intake level mapped to a specific space before design begins",
        "Bed strength and department layout planning to meet NMC bed distribution requirements for each mandatory specialty from the initial schematic",
        "OPD capacity design sized to the daily attendance volumes required by NMC standards and MBBS clinical training requirements",
        "Pre-clinical department design: anatomy dissection hall, physiology, biochemistry, pathology, microbiology, pharmacology labs, and the forensic medicine autopsy suite to NMC area and equipment specifications",
        "Academic facility design: lecture theatres, demonstration rooms, central library, and simulation/skills laboratory to NMC and CBME curriculum requirements",
        "Campus masterplanning of hostel, faculty residences, sports facilities, and circulation to NMC and university affiliation requirements",
      ],
    },
    faqs: [
      { q: "What is the NMC and what role does it play in medical college regulation?", a: "The National Medical Commission is the statutory body established under the NMC Act 2020 to regulate medical education and practice in India. Its Medical Assessment and Rating Board prescribes minimum standards, conducts inspections, and grants the permissions and recognition every medical college needs before admitting students." },
      { q: "What are the minimum bed requirements for a medical college teaching hospital?", a: "300 beds for 100 seats, 500 beds for 150 seats, and 750 beds for 250 seats, distributed across mandatory clinical departments. Only general teaching ward beds count — private and paying wards are excluded." },
      { q: "How many operation theatres does a medical college hospital need?", a: "A minimum of four major OTs for 100 seats, six for 150 seats, and eight for 250 seats, plus minor OTs and specialty OT provisions for obstetrics, orthopaedics, ophthalmology, and other departments." },
      { q: "What is the anatomy dissection hall requirement for a medical college?", a: "A dissection hall meeting minimum area requirements for the intake size, with sufficient dissection tables, formaldehyde fume extraction, cadaver cold storage, and a connected anatomy museum, alongside a separate forensic medicine autopsy suite recognised by the state forensic authority." },
      { q: "Does a medical college need a simulation laboratory for NMC approval?", a: "Yes. Under the NMC's Competency Based Medical Education framework, a simulation and clinical skills laboratory equipped with task trainers and mannequins covering core MBBS competencies is now a required component of the infrastructure." },
      { q: "Can ARCHORA design and build a complete medical college and teaching hospital?", a: "Yes. ARCHORA designs the teaching hospital, pre-clinical and para-clinical departments, academic facilities, library and simulation laboratory, autopsy and mortuary facilities, and student/resident hostels as a single campus built to NMC minimum standards for the proposed intake from the project brief stage." },
    ],
  },

  // ───────────────────────── ICMR ─────────────────────────
  {
    slug: "icmr",
    abbr: "ICMR",
    fullName: "Indian Council of Medical Research",
    color: "#34d399",
    metaDesc: "Complete guide to ICMR guidelines and registration for IVF labs, ART clinics, clinical trial facilities, and biomedical research centres in India.",
    heroH1: "ICMR Guidelines and Registration for IVF Labs and Research Facilities",
    heroSub: "Complete guide to ICMR's role as the technical standards authority for ART clinics and the ethical standards authority for biomedical research — and how ARCHORA designs ICMR-compliant facilities from day one.",
    whatIsIt: {
      heading: "What is ICMR?",
      body: [
        "ICMR stands for the Indian Council of Medical Research. It is the apex body in India for the formulation, coordination, and promotion of biomedical research. Established in 1911 and functioning under the Department of Health Research, Ministry of Health and Family Welfare, Government of India, ICMR is one of the oldest and most prestigious medical research organisations in Asia.",
        "In the context of healthcare facility compliance, ICMR plays two distinct and critically important roles. The first is as the technical standards authority for assisted reproductive technology. ICMR has published the National Guidelines for Accreditation, Supervision and Regulation of ART Clinics in India, which define the detailed technical and clinical standards for IVF laboratories, ART clinics, and ART banks.",
        "The second role is as the ethical and scientific oversight authority for biomedical and health research conducted in India. ICMR's National Ethical Guidelines for Biomedical and Health Research Involving Human Participants define the ethical framework within which all clinical research, clinical trials, and health research involving human participants must be conducted.",
        "Understanding both dimensions of ICMR's role is essential for any healthcare facility that plans to operate an IVF laboratory, conduct clinical research, or host sponsored clinical trials.",
      ],
    },
    whyItMatters: {
      heading: "Why ICMR Standards Are the Definitive Reference for IVF Lab Design",
      body: [
        "The ART Act 2021 and its regulatory framework build directly on the ICMR guidelines. The minimum infrastructure standards prescribed under the ART Act are substantially derived from and consistent with the ICMR ART guidelines. For any ART clinic or IVF laboratory being designed and built today, the ICMR guidelines remain the most detailed and technically specific reference document for physical infrastructure requirements.",
        "Critically, the ICMR guidelines identify volatile organic compounds as a significant embryotoxicity risk and specify that the laboratory environment must be maintained with VOC levels below thresholds that could adversely affect gamete and embryo viability. This requirement determines the specification of all construction materials, finishes, furniture, and equipment in and adjacent to the IVF laboratory — making it one of the most infrastructure-determinative compliance documents in healthcare.",
        "For research and clinical trial facilities, ICMR's ethical guidelines are not merely advisory documents. They define the standards against which institutional ethics committees are constituted and accredited, and against which clinical trial sites are assessed by CDSCO — making them directly relevant to physical infrastructure design decisions.",
      ],
    },
    whoNeedsIt: {
      heading: "Facilities Affected by ICMR Guidelines",
      groups: [
        { title: "ART & Fertility Facilities", items: ["IVF labs and fertility centres", "Surrogacy centres", "Egg banking and sperm banking facilities", "Embryo storage and cryopreservation facilities"] },
        { title: "Clinical Research Facilities", items: ["Research and clinical trial laboratories", "Clinical investigation centres (Phase I–IV)", "Academic medical centres conducting investigator-initiated research", "Biobanks and biorepositories"] },
        { title: "Advanced Research Labs", items: ["Genomics and molecular research facilities", "Genetic research and population genomics labs", "Institutions conducting CDSCO-regulated clinical trials", "Facilities requiring NABH Ethics Committee Accreditation"] },
      ],
    },
    process: {
      heading: "ICMR Compliance — Key Steps for IVF Labs and Research Facilities",
      steps: [
        { step: "01", title: "ICMR ART Guideline Review at Brief Stage", desc: "Every physical infrastructure requirement from the ICMR National Guidelines is translated into a design specification before architectural planning begins." },
        { step: "02", title: "IVF Laboratory Environment Design", desc: "HVAC design, HEPA filtration, positive pressure, temperature and humidity control, and air change rates are all specified to ICMR guidelines." },
        { step: "03", title: "Embryo-Safe Material Specification", desc: "All construction and fit-out materials in the IVF laboratory and adjacent spaces are verified against ICMR VOC and embryotoxicity guidance before installation." },
        { step: "04", title: "Procedure Room Adjacency Design", desc: "Oocyte retrieval suite, IVF laboratory, embryo transfer room, andrology laboratory, and semen collection room are positioned per ICMR workflow adjacency requirements." },
        { step: "05", title: "Cryostorage Facility Design", desc: "Cryostorage room design meets all ICMR-specified provisions for liquid nitrogen storage, ventilation, oxygen monitoring, alarm systems, and inventory management." },
        { step: "06", title: "IEC Constitution & Registration (Research Facilities)", desc: "The Institutional Ethics Committee is constituted in accordance with ICMR guidelines and registered with CDSCO for institutions conducting regulated clinical trials." },
        { step: "07", title: "GCP Infrastructure", desc: "Clinical trial coordination space, investigational product storage with temperature monitoring, sample management facilities, and source document archiving are built to ICH GCP standards." },
        { step: "08", title: "ART Act 2021 Registration", desc: "A facility designed and built to ICMR guideline standards will meet the infrastructure requirements for ART Act 2021 registration with the State ART and Surrogacy Board." },
        { step: "09", title: "NABH IEC Accreditation (Optional)", desc: "For research facilities, NABH Ethics Committee Accreditation is an increasingly important quality credential assessed against standards consistent with ICMR ethical guidelines." },
      ],
    },
    referenceTable: {
      heading: "ICMR Compliance by Facility Type",
      rows: [
        { facility: "IVF Lab and Fertility Centre", requirement: "ICMR ART Guidelines — primary technical basis for ART Act 2021 registration" },
        { facility: "Surrogacy Centre", requirement: "ICMR ART Guidelines + Surrogacy Act 2021 registration" },
        { facility: "Research and Clinical Trial Laboratory", requirement: "ICMR National Ethical Guidelines, IEC registration, GCP infrastructure" },
        { facility: "Academic Medical Centre", requirement: "IEC constitution and registration, research governance infrastructure" },
        { facility: "Biobank and Biorepository", requirement: "Biobank governance framework, sample management infrastructure, IEC oversight" },
        { facility: "Clinical Investigation Centre", requirement: "GCP-compliant trial infrastructure, IP storage, IEC accreditation" },
        { facility: "Genomics and Molecular Research Facility", requirement: "Ethics oversight, participant consent infrastructure, data security provisions" },
      ],
    },
    consequences: {
      heading: "Risks of Ignoring ICMR Guidelines",
      bullets: [
        "IVF laboratory environments not designed to ICMR VOC standards expose embryos to embryotoxic compounds, directly reducing fertilisation and pregnancy rates",
        "Clinical research conducted without a properly constituted IEC may be invalidated by CDSCO, rendering trial data inadmissible",
        "ART clinics not designed to ICMR laboratory environment standards will struggle to meet ART Act 2021 registration requirements",
        "Insurance and medico-legal protection may be void for research incidents if IEC governance is non-compliant with ICMR guidelines",
        "NABH IEC accreditation cannot be achieved without ICMR-compliant ethics infrastructure, blocking high-value research sponsorships",
        "Sponsors of regulated clinical trials conduct site qualification assessments against GCP and ICMR standards; non-compliant infrastructure disqualifies the site",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Designs ICMR-Compliant Healthcare Facilities",
      bullets: [
        "ICMR ART guideline review at brief stage, translated into infrastructure specifications before design begins",
        "IVF laboratory HVAC design: HEPA filtration, positive pressure, temperature and humidity control to ICMR specifications",
        "Embryo-safe material specification: all construction and fit-out materials verified against ICMR VOC and embryotoxicity guidance",
        "Procedure room adjacency design: retrieval suite, IVF lab, transfer room, andrology lab, and semen collection room workflow-optimised per ICMR guidelines",
        "Cryostorage facility design: liquid nitrogen storage, ventilation, oxygen monitoring, alarm systems, and inventory management provisions",
        "IEC meeting room and secretariat space for research facilities requiring ethics committee infrastructure",
        "Investigational product storage: temperature-controlled, monitored, and alarmed with emergency power backup",
        "Source document archiving: secure, fireproof, long-term archiving facilities for research records",
      ],
    },
    faqs: [
      { q: "What is ICMR and what role does it play in healthcare facility compliance?", a: "ICMR is India's apex body for biomedical research. In healthcare facility compliance, it plays two key roles: it is the technical standards authority for ART clinics through its National Guidelines for ART Clinics, and the ethical standards authority for all biomedical research involving human participants through its National Ethical Guidelines, which define the framework for Institutional Ethics Committees, clinical trial conduct, and research participant protection." },
      { q: "Do I need ICMR registration for my IVF lab?", a: "With the ART Act 2021, mandatory registration is now administered by the National and State ART and Surrogacy Boards rather than ICMR directly. However, the ICMR National Guidelines for ART Clinics remain the most detailed and authoritative technical reference for IVF laboratory infrastructure. Any ART clinic designed to ICMR guidelines will meet the infrastructure requirements for ART Act 2021 registration." },
      { q: "What are the ICMR guidelines for IVF laboratory design?", a: "The ICMR guidelines specify that the IVF laboratory must be a dedicated, HEPA-filtered, positively pressurised, temperature and humidity-controlled environment with VOC levels below embryotoxic thresholds. Requirements include a dedicated oocyte retrieval room, embryo transfer room, andrology laboratory, cryostorage facility with oxygen monitoring, and dedicated consultation and counselling spaces. Emergency power backup for all critical laboratory systems is mandatory." },
      { q: "What is an Institutional Ethics Committee and does my research facility need one?", a: "An IEC is a formally constituted committee responsible for reviewing and approving biomedical and health research involving human participants. Any institution conducting such research must have a registered IEC. For regulated clinical trials, the IEC must be registered with CDSCO and constituted in accordance with ICMR ethical guidelines." },
      { q: "How do ICMR guidelines relate to NABH accreditation for research facilities?", a: "NABH operates an Ethics Committee Accreditation programme that assesses Institutional Ethics Committees against quality standards consistent with ICMR ethical guidelines. Facilities that pursue NABH IEC accreditation demonstrate a higher standard of research governance to sponsors, regulators, and participants." },
      { q: "Does ARCHORA design clinical trial facilities and IVF laboratories to ICMR standards?", a: "Yes. For IVF laboratories, ARCHORA designs to the full ICMR ART guideline specification as the technical foundation for ART Act 2021 registration. For research and clinical trial facilities, ARCHORA designs IEC spaces, investigational product storage, sample management infrastructure, informed consent rooms, and source document archiving to ICMR ethical guidelines and GCP requirements." },
    ],
  },

  // ───────────────────────── Fire NOC ─────────────────────────
  {
    slug: "fire-noc",
    abbr: "Fire NOC",
    fullName: "State Fire Department — No Objection Certificate",
    color: "#fb923c",
    metaDesc: "Complete guide to Fire NOC for hospitals, clinics, diagnostic centres, and all healthcare buildings in India. Understand NBC 2016 fire safety requirements and the Fire NOC process.",
    heroH1: "Fire NOC for Hospitals and Healthcare Buildings in India",
    heroSub: "Complete guide to Fire NOC requirements under NBC 2016, the step-by-step Fire NOC process for healthcare buildings, and how ARCHORA integrates fire safety compliance into every healthcare facility project from the first line of the architectural brief.",
    whatIsIt: {
      heading: "What is a Fire NOC?",
      body: [
        "A Fire NOC is a No Objection Certificate issued by the State Fire Department confirming that a building meets the fire safety requirements prescribed under the applicable state fire prevention and life safety legislation and the National Building Code of India.",
        "For a hospital, clinic, diagnostic centre, nursing home, or any other healthcare facility in India, a Fire NOC is not optional. It is a mandatory legal requirement that must be obtained before the facility is occupied or opened to patients, and it is a prerequisite for several other critical compliance processes including CEA registration, NABH accreditation, and government scheme empanelment.",
        "Healthcare facilities house patients who are physically vulnerable, sedated, bedridden, or otherwise unable to self-evacuate in an emergency. The fire safety infrastructure of a hospital is a life safety system in the most direct and literal sense. A fire in a healthcare facility without adequate fire safety infrastructure is not a property loss event — it is a mass casualty event.",
        "This is why ARCHORA treats fire safety compliance as a non-negotiable design discipline embedded into every healthcare facility project from the very first line of the architectural brief.",
      ],
    },
    whyItMatters: {
      heading: "Why Fire Safety is a Design Discipline, Not a Checklist",
      body: [
        "Fire safety in Indian healthcare buildings is governed by the National Building Code of India 2016, specifically Part 4 covering Fire and Life Safety. Healthcare facilities fall under the institutional occupancy classification within NBC 2016, which attracts the most stringent fire safety requirements of any occupancy type due to the presence of non-ambulatory and mobility-impaired occupants who cannot self-evacuate without assistance.",
        "The fundamental challenge is that fire compartmentation, escape route widths, refuge area provisions, and horizontal evacuation design are structural and architectural elements that cannot be added to a completed building without major reconstruction. A building that was not designed with these elements from the beginning may be unable to achieve Fire NOC compliance regardless of how many systems are subsequently installed.",
        "Operating theatres, ICUs, and areas supplied by piped medical oxygen operate in oxygen-enriched environments that significantly increase fire risk and fire spread rate, requiring specialist fire safety design provisions that must be integrated from the earliest stage of building planning.",
      ],
    },
    whoNeedsIt: {
      heading: "Healthcare Facilities Requiring a Fire NOC",
      groups: [
        { title: "Hospitals & Inpatient", items: ["Multi/superspeciality hospitals of all sizes", "Nursing homes and small hospitals", "Oncology and cancer hospitals", "Day care surgery centres", "Rehabilitation and long-term care facilities", "Psychiatric and mental health hospitals"] },
        { title: "Diagnostic & Imaging", items: ["Diagnostic centres and pathology labs", "Radiology and imaging centres", "Nuclear medicine and PET-CT centres", "Blood banks"] },
        { title: "Specialty Facilities", items: ["IVF labs and fertility centres (cryogenic storage provisions)", "Eye care and dental hospitals", "Addiction and de-addiction centres", "Palliative care centres"] },
        { title: "Education & Research", items: ["Medical, nursing, and dental colleges with attached hospitals", "Research and clinical trial laboratories", "Allied health sciences colleges"] },
      ],
    },
    process: {
      heading: "Fire NOC Process for Healthcare Buildings — Step by Step",
      steps: [
        { step: "01", title: "Fire Safety Design Integration at Brief Stage", desc: "Occupancy classification, compartmentation strategy, means of escape layout, and fire fighting infrastructure are planned before any layouts are developed." },
        { step: "02", title: "Building Plan Approval with Fire Department Clearance", desc: "For healthcare buildings above defined floor area and height thresholds, building plan approval includes mandatory clearance from the State Fire Department." },
        { step: "03", title: "Construction in Accordance with Approved Plans", desc: "The facility is constructed in strict compliance with fire safety provisions. Any deviation must be notified to and re-approved by the fire department." },
        { step: "04", title: "Fire Safety Systems Installation and Testing", desc: "All systems including detection, alarms, sprinklers, fire pumps, emergency lighting, and exit signage are installed, commissioned, and tested by qualified contractors." },
        { step: "05", title: "Fire NOC Application", desc: "After construction and systems installation, the facility applies to the State Fire Department with as-built plans, installation certificates, commissioning reports, and third-party inspection reports." },
        { step: "06", title: "Fire Department Inspection", desc: "A fire safety officer inspects the completed building, tests all fire safety systems, and verifies compliance with approved plans and NBC 2016 requirements." },
        { step: "07", title: "Fire NOC Issuance", desc: "On confirmed compliance, the State Fire Department issues the Fire NOC specifying building address, purpose of occupation, date of issue, and validity period." },
        { step: "08", title: "Ongoing Compliance and Annual Renewal", desc: "Fire safety systems must be maintained, fire drills conducted, records kept for NABH assessment, and the Fire NOC renewed at defined intervals — typically annually." },
      ],
    },
    referenceTable: {
      heading: "Key Fire Safety Requirements by Facility Type",
      rows: [
        { facility: "Multispeciality Hospital", requirement: "Full NBC 2016 institutional occupancy: sprinklers, wet risers, addressable fire alarm, compartmentation, horizontal evacuation, refuge areas" },
        { facility: "Superspeciality Hospital", requirement: "As above + provisions for high-risk OT and ICU oxygen-enriched environments" },
        { facility: "Oncology & Cancer Hospital", requirement: "As above + provisions for radiotherapy vault areas and hazardous pharmaceutical storage" },
        { facility: "Nursing Home & Small Hospital", requirement: "NBC 2016 institutional occupancy, scale proportional to building size" },
        { facility: "Day Care Surgery Centre", requirement: "Full institutional occupancy provisions with specific OT fire safety" },
        { facility: "Diagnostic Centre", requirement: "Assembly or institutional occupancy; generator room, electrical room, chemical storage provisions" },
        { facility: "IVF Lab & Fertility Centre", requirement: "Standard provisions + cryogenic storage: liquid nitrogen handling, storage area ventilation and fire safety" },
        { facility: "Clinical Laboratory", requirement: "Flammable solvent storage, fume cupboard exhaust, chemical storage room provisions" },
        { facility: "Medical College & Teaching Hospital", requirement: "Institutional occupancy for hospital + educational occupancy for college building" },
      ],
    },
    consequences: {
      heading: "What Happens Without a Fire NOC",
      bullets: [
        "Immediate closure of the facility by order of the State Fire Department or local authority",
        "CEA registration cannot be obtained or renewed without a valid Fire NOC",
        "NABH accreditation will not be granted; a missing Fire NOC is an immediate major non-conformity in NABH assessment",
        "Insurance coverage for the building and contents may be void, with direct consequences for any fire-related claim",
        "Ayushman Bharat and other government scheme empanelment requires demonstrated fire safety certification",
        "In the event of a fire incident, criminal and civil liability exposure of facility ownership is severe — potentially including personal criminal liability under fire safety legislation and criminal negligence provisions",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Delivers Fire NOC-Ready Healthcare Facilities",
      bullets: [
        "NBC 2016 Part 4 compliance from concept design: compartmentation strategy and means of escape layout integrated into the brief before any drawings are made",
        "Fire escape route design: corridor widths, stairway positions, travel distances, exit locations, and horizontal evacuation strategies designed from the first schematic layout",
        "Fire compartmentation design: compartment boundaries, fire door positions, and service penetration fire-stopping coordinated across architectural, structural, and MEP designs",
        "Fire systems engineering: detection, alarm, sprinkler, hose reel, wet riser, and emergency lighting design developed by qualified fire safety engineers",
        "Oxygen-enriched environment provisions: specific fire safety design for OTs, ICUs, and medical gas supply areas",
        "Hazardous material storage design: flammable gas stores, chemical stores, diesel fuel stores, and cryogenic storage with appropriate compartmentation, suppression, and ventilation",
        "Fire NOC application support: complete documentation package including as-built drawings, system certificates, and commissioning reports",
        "Fire safety handover package: system operating instructions, maintenance schedules, evacuation plans, and staff training frameworks",
      ],
    },
    faqs: [
      { q: "What is a Fire NOC and why does my hospital need it?", a: "A Fire NOC is a No Objection Certificate issued by the State Fire Department confirming your healthcare building meets all prescribed fire safety requirements. It is a mandatory legal requirement for occupation, a prerequisite for CEA registration and NABH accreditation, and a requirement for government scheme empanelment and insurance coverage." },
      { q: "Which authority issues the Fire NOC for hospitals in India?", a: "The Fire NOC for a hospital or healthcare building is issued by the State Fire Department of the state in which the building is located. In some states and cities, the local municipal corporation fire department is the issuing authority." },
      { q: "What are the fire safety requirements for hospitals under NBC 2016?", a: "Under NBC 2016 Part 4, hospitals are classified as institutional occupancy, attracting the most stringent requirements: automatic fire sprinkler systems, addressable fire detection and alarm systems, protected escape routes with minimum corridor widths, fire compartmentation, fire-rated doors, emergency lighting and exit signage, wet riser systems, fire pump sets, underground fire water storage, and horizontal evacuation provisions for non-ambulatory patients." },
      { q: "What is fire compartmentation and why does it matter in a hospital?", a: "Fire compartmentation is the division of a building into defined zones by fire-resistant construction elements. In a hospital, it ensures a fire is contained within one compartment long enough for patient evacuation and fire brigade intervention. For non-ambulatory patients, compartmentation is the primary life safety strategy because full building evacuation is not practically achievable. It must be designed from the structural design stage — it cannot be effectively retrofitted." },
      { q: "How often does the Fire NOC need to be renewed?", a: "In most states, the Fire NOC for a healthcare building must be renewed annually. Renewal requires a fire department inspection verifying all fire safety systems are maintained in operational condition and no unauthorised changes have been made." },
      { q: "Does ARCHORA handle the Fire NOC application process?", a: "Yes. ARCHORA manages fire safety design, system engineering, construction compliance, and the Fire NOC application process as part of every healthcare facility project. We prepare the complete documentation package, coordinate with the State Fire Department through plan approval and post-construction inspection, and ensure every fire safety system is installed, tested, and certified to the standard required for NOC issuance." },
    ],
  },

  // ───────────────────────── DCI ─────────────────────────
  {
    slug: "dci",
    abbr: "DCI",
    fullName: "Dental Council of India",
    color: "#f59e0b",
    metaDesc: "Complete guide to DCI approval for dental colleges and dental hospitals in India. Understand DCI infrastructure requirements, clinical facility standards, and department specifications.",
    heroH1: "DCI Approval for Dental Colleges and Dental Hospitals in India",
    heroSub: "Complete guide to DCI minimum standards for dental college infrastructure, clinical department requirements, the attached dental hospital, AERB compliance for dental X-ray installations, and how ARCHORA designs DCI-compliant dental colleges and hospitals from day one.",
    whatIsIt: {
      heading: "What is the DCI?",
      body: [
        "The Dental Council of India is the statutory regulatory body for dental education and practice in India, established under the Dentists Act, 1948. The DCI is responsible for prescribing minimum standards for dental education, recognising dental qualifications, maintaining the Central Register of Dentists, and regulating dental colleges and their attached dental hospitals across the country.",
        "The DCI's regulatory authority covers all dental education institutions offering the Bachelor of Dental Surgery degree, the Master of Dental Surgery degree, and postgraduate diploma programmes in dental specialties. Every dental college in India, whether government or private, must obtain and maintain DCI recognition as a mandatory legal requirement.",
        "Without DCI recognition, the BDS and MDS degrees awarded by a dental college are not recognised qualifications, graduates cannot be registered as dentists, and the institution cannot legally conduct dental education programmes.",
        "The DCI has published Minimum Requirements for Dental College and Hospital Regulations that prescribe specific, quantified minimum standards for every dimension of a dental college's physical infrastructure and operational capacity. These are the primary technical reference for dental college infrastructure planning.",
      ],
    },
    whyItMatters: {
      heading: "Why Dental College Infrastructure is Distinctly Different from Medical College Infrastructure",
      body: [
        "The defining physical feature of a dental college is the dental clinical teaching complex — a large, open-plan clinical training environment containing multiple dental chair units where dental students treat patients under faculty supervision simultaneously. This is unlike any clinical training space in a medical or nursing college, and its design determines the efficiency of clinical training, the quality of patient care, the safety of infection control, and the compliance of the institution with DCI standards.",
        "The second defining feature is the dental technology and prosthetics laboratory — a precision manufacturing environment for dental prostheses, crowns, bridges, and orthodontic appliances that requires a specific combination of electrical supply, ventilation, equipment provision, and workspace organisation not found in any other clinical education context.",
        "These two facility types represent the most technically demanding and compliance-critical physical infrastructure elements in a dental college project, and their design requires specialist understanding of dental clinical workflows, infection control requirements, and DCI minimum standards.",
      ],
    },
    whoNeedsIt: {
      heading: "Who Requires DCI Approval",
      groups: [
        { title: "Undergraduate Dental Education", items: ["All dental colleges offering the BDS degree", "Government and private dental institutions", "Dental colleges attached to multi-faculty health sciences universities", "Deemed universities offering dental education"] },
        { title: "Postgraduate Dental Education", items: ["Dental colleges offering MDS programmes in any dental specialty", "Institutions offering postgraduate diplomas in dental specialties", "Dental colleges seeking to expand from BDS to MDS recognition"] },
        { title: "Attached Dental Hospitals", items: ["Dental hospitals attached to dental colleges (mandatory for DCI recognition)", "Hospital must maintain minimum patient attendance across all clinical departments", "Dental hospitals offering specialist dental services to the public"] },
      ],
    },
    process: {
      heading: "DCI Approval Process — Step by Step",
      steps: [
        { step: "01", title: "Essentiality Certificate from State Government", desc: "An Essentiality Certificate from the State Government confirming the establishment of a dental college at the proposed location is in the public interest." },
        { step: "02", title: "Application to DCI", desc: "Formal application including land ownership proof, building plans, equipment inventory, faculty credentials, hospital attendance records, CEA registration, AERB eLORA licences, and Fire NOC." },
        { step: "03", title: "Physical Inspection by DCI", desc: "DCI inspection team verifies all clinical departments, chair units, oral radiology, dental technology laboratory, simulation lab, CSSD, library, hostel, patient volumes, and faculty credentials." },
        { step: "04", title: "DCI Recognition", desc: "Following a satisfactory inspection, DCI grants recognition for the BDS programme. University affiliation from the applicable state health university is obtained in parallel." },
        { step: "05", title: "Annual Compliance and Renewal", desc: "DCI recognition is subject to periodic re-inspection. Dental colleges must maintain continuous compliance with DCI minimum standards to retain recognition." },
        { step: "06", title: "MDS Programme Recognition (Separate Application)", desc: "Each postgraduate specialty requires a separate DCI application demonstrating a track record of BDS operation, postgraduate infrastructure, qualified faculty, and sufficient patient case material." },
      ],
    },
    referenceTable: {
      heading: "DCI Compliance by Facility Type",
      rows: [
        { facility: "Dental College (100-seat BDS)", requirement: "DCI Minimum Requirements for Dental College and Hospital Regulations — full infrastructure compliance" },
        { facility: "Attached Dental Hospital", requirement: "Minimum daily patient attendance across all departments; CEA registration; biomedical waste authorisation" },
        { facility: "Oral Radiology Department", requirement: "AERB eLORA licensing for each X-ray installation; AERB-compliant shielding for all X-ray cubicles" },
        { facility: "Dental Technology Laboratory", requirement: "DCI minimum floor area; mechanical extraction ventilation; plaster trap drainage; dedicated casting area" },
        { facility: "Oral & Maxillofacial Surgery Dept", requirement: "Minor OT; dedicated OMS clinical chairs; recovery area; instrument sterilisation provisions" },
        { facility: "MDS Postgraduate Programmes", requirement: "Separate DCI recognition per specialty; research laboratory provisions; postgraduate faculty credentials" },
        { facility: "Dental College with Hostel", requirement: "DCI and State Dental Council residential standards; separate male/female accommodation" },
      ],
    },
    consequences: {
      heading: "What Happens Without DCI Recognition",
      bullets: [
        "BDS and MDS degrees awarded by an unrecognised dental college have no regulatory standing",
        "Graduates of an unrecognised dental college cannot be registered as dentists and cannot legally practise",
        "The institution cannot legally conduct dental education programmes under the Dentists Act, 1948",
        "University affiliation for a dental programme cannot be maintained without DCI recognition",
        "Government scholarship programmes and seat allocation exclude unrecognised colleges",
        "Insufficient patient volumes at the attached dental hospital — one of the most frequently cited inspection failures — results in conditional approval or withheld recognition",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Designs DCI-Compliant Dental Colleges and Hospitals",
      bullets: [
        "DCI minimum standards mapping at brief stage: every requirement for the proposed BDS intake mapped to a physical space before design begins",
        "Dental clinical complex design: department-by-department chair unit layout, utility service design, infection control workflow, operator and patient circulation, and faculty supervision sightlines",
        "Dental utility services engineering: centralised dental compressed air plant, vacuum plant, piped services distribution to each chair unit, and spittoon plumbing",
        "Oral radiology department design: AERB-compliant radiation-shielded cubicles for each X-ray unit; darkroom or digital imaging provisions; eLORA application support",
        "Dental technology laboratory design: workstation layout, electrical supply, mechanical extraction ventilation, gas supply, plaster trap drainage, and casting area fire safety",
        "CSSD design: contaminated, cleaning, and sterile zone separation; autoclave and ultrasonic cleaner positioning; instrument workflow design",
        "Hostel design: residential complex to DCI and State Dental Council standards with separate provisions as required",
        "Integrated campus design: dental college, hospital, and hostel as a single campus with appropriate circulation and expansion provisions",
      ],
    },
    faqs: [
      { q: "What is the DCI and why is its approval required for a dental college?", a: "The Dental Council of India is the statutory apex body for dental education regulation in India, established under the Dentists Act 1948. Its approval is mandatory for any dental college offering BDS or MDS programmes. Without DCI recognition, dental degrees have no regulatory standing, graduates cannot be registered as dentists, and the college cannot legally conduct dental education programmes." },
      { q: "What is the minimum infrastructure required for a 100-seat BDS dental college?", a: "A 100-seat BDS dental college requires a dedicated dental clinical complex with a minimum number of chair units across all clinical departments, a dental technology laboratory, a simulation laboratory with phantom head units, an oral radiology department with AERB-licensed X-ray installations, pre-clinical department laboratories, lecture theatres, classrooms, a library, a CSSD, an attached dental hospital with the required patient throughput, and residential hostel accommodation." },
      { q: "Does a dental college X-ray room require AERB approval?", a: "Yes. Every dental X-ray installation — including intraoral X-ray units, orthopantomogram units, cephalometric units, and CBCT units — requires AERB eLORA licensing. The radiation-shielded room or cubicle must be designed to AERB-prescribed shielding specifications, installed accordingly, and licensed before the equipment is used clinically. ARCHORA designs dental X-ray room shielding and supports the AERB eLORA application as part of the dental college project scope." },
      { q: "What is a dental technology laboratory and what are its infrastructure requirements?", a: "The dental technology laboratory is the precision manufacturing space where dental prostheses including crowns, bridges, dentures, and orthodontic appliances are fabricated. It requires individual bench workstations, adequate electrical supply for casting machines and porcelain furnaces, dedicated mechanical extraction ventilation for metal dust and acrylic monomer vapour, gas supply for laboratory procedures, plaster trap drainage, and a dedicated casting area with fire safety provisions." },
      { q: "What patient volumes does the attached dental hospital need for DCI compliance?", a: "The DCI minimum standards specify minimum daily patient attendance requirements for each clinical department. These are verified during DCI inspections through outpatient and clinical records. Insufficient patient volumes are one of the most frequently cited causes of DCI inspection failure and conditional approval." },
      { q: "Does ARCHORA design complete dental college and hospital complexes for DCI approval?", a: "Yes. ARCHORA designs and builds complete dental college and hospital complexes including the dental clinical complex, oral radiology department, dental technology laboratory, simulation laboratory, pre-clinical department laboratories, library, lecture theatres, CSSD, attached dental hospital, and residential hostel — all designed to DCI minimum standards from the project brief stage." },
    ],
  },

  // ───────────────────────── PCI ─────────────────────────
  {
    slug: "pci",
    abbr: "PCI",
    fullName: "Pharmacy Council of India",
    color: "#f59e0b",
    metaDesc: "Complete guide to PCI approval for pharmacy colleges offering D.Pharm, B.Pharm, and Pharm.D programmes in India. Understand PCI infrastructure requirements, laboratory standards, machine room provisions, and how ARCHORA designs PCI-compliant pharmacy colleges from day one.",
    heroH1: "PCI Approval for Pharmacy Colleges in India",
    heroSub: "Complete guide to PCI infrastructure requirements, the laboratory and machine room standards behind D.Pharm, B.Pharm, and Pharm.D programmes, and how ARCHORA designs PCI-compliant pharmacy colleges from day one.",
    whatIsIt: {
      heading: "What is the PCI?",
      body: [
        "The Pharmacy Council of India is the statutory regulatory body for pharmacy education in India, established under the Pharmacy Act, 1948. The PCI is the apex national authority responsible for prescribing minimum standards for pharmacy education, recognising pharmacy qualifications, regulating the establishment and functioning of pharmacy colleges, and maintaining the Central Register of Pharmacists in India.",
        "The PCI's regulatory authority covers institutions offering the Diploma in Pharmacy, the Bachelor of Pharmacy, the Doctor of Pharmacy, and postgraduate pharmacy programmes. Every pharmacy college in India must obtain and maintain PCI approval as a mandatory legal requirement — without it, qualifications awarded have no regulatory standing and graduates cannot be registered as pharmacists.",
        "For B.Pharm and M.Pharm programmes specifically, the All India Council for Technical Education also plays a role alongside PCI, prescribing additional infrastructure and faculty requirements that must be satisfied simultaneously.",
      ],
    },
    whyItMatters: {
      heading: "Why PCI Compliance Demands a Purpose-Built Infrastructure Approach",
      body: [
        "Pharmacy education sits at the intersection of health science and applied chemical science. Students develop competencies across pharmaceutical chemistry, pharmaceutical analysis, pharmacognosy, pharmacology, and pharmaceutics — each requiring physical infrastructure that cannot be improvised: chemical-grade ventilation and fume hoods, pharmaceutical manufacturing machinery, botanical specimen and extraction provisions, and computational pharmacy facilities.",
        "Retrospective installation of pharmaceutical laboratory infrastructure into a building not designed for it is expensive, disruptive, and frequently unable to meet PCI minimum standards — particularly for the machine room, which has no equivalent in any other healthcare education facility type and is one of the most common reasons pharmacy college projects fail PCI inspection.",
      ],
    },
    whoNeedsIt: {
      heading: "Pharmacy Programmes Regulated by PCI",
      groups: [
        { title: "Diploma & Undergraduate", items: ["D.Pharm — two-year diploma, the entry-level pharmacy qualification", "B.Pharm — four-year undergraduate degree, the most widely offered programme with the most comprehensive infrastructure requirements"] },
        { title: "Integrated & Postgraduate", items: ["Pharm.D — six-year integrated programme including one year of mandatory hospital internship", "M.Pharm — two-year postgraduate degree requiring an established B.Pharm programme", "PhD in Pharmacy — research doctoral programme"] },
        { title: "Mandatory Laboratory Provisions", items: ["Pharmaceutical chemistry & analysis laboratories — fume hoods, chemical storage, waste disposal", "Pharmaceutics laboratory — tablet compression, capsule filling, dissolution testing equipment", "Machine room — industrial-scale pharmaceutical manufacturing machinery", "Pharmacognosy and pharmacology laboratories"] },
      ],
    },
    process: {
      heading: "PCI Approval Process — Step by Step",
      steps: [
        { step: "01", title: "Essentiality Certificate from State Government", desc: "Confirms the establishment of a pharmacy college at the proposed location is permitted." },
        { step: "02", title: "AICTE Approval (B.Pharm and M.Pharm)", desc: "Required alongside PCI approval, with documentation of infrastructure, equipment, faculty, and financial resources meeting AICTE minimum standards." },
        { step: "03", title: "Application to PCI", desc: "Includes land ownership proof, building plans, equipment inventory for every laboratory including the machine room, faculty list, and library catalogue." },
        { step: "04", title: "Physical Inspection by PCI", desc: "Evaluates every laboratory, the machine room's floor area and structural provisions, library, hostel, and — for Pharm.D — the affiliated hospital pharmacy department." },
        { step: "05", title: "PCI and AICTE Approval", desc: "Following a satisfactory inspection, PCI grants approval for the proposed intake; AICTE approval proceeds in parallel for B.Pharm/M.Pharm." },
        { step: "06", title: "Annual Compliance and Renewal", desc: "Colleges must maintain continuous compliance with PCI minimum standards through periodic re-inspection to retain approval." },
      ],
    },
    referenceTable: {
      heading: "PCI Compliance by Facility Element",
      rows: [
        { facility: "B.Pharm College", requirement: "PCI Education Regulations + AICTE approval — full infrastructure compliance" },
        { facility: "Pharm.D Programme", requirement: "PCI approval + mandatory hospital affiliation for clinical pharmacy internship" },
        { facility: "Machine Room", requirement: "Heavy floor loading, vibration isolation, 3-phase electrical, dust extraction ventilation" },
        { facility: "Pharmaceutical Chemistry Laboratory", requirement: "Fume hoods, chemical storage by compatibility class, eyewash/safety shower" },
        { facility: "Pharmaceutics Laboratory", requirement: "Tablet compression, capsule filling, dissolution/disintegration testing equipment" },
        { facility: "Pharmacognosy Laboratory & Museum", requirement: "Microscopy stations, extraction equipment, crude drug specimen collection" },
        { facility: "Pharmacology Laboratory (with Animal House)", requirement: "CPCSEA compliance for animal facility design and operation" },
      ],
    },
    consequences: {
      heading: "What Happens Without PCI Approval",
      bullets: [
        "Pharmacy qualifications awarded by an unrecognised institution have no regulatory standing",
        "Graduates cannot be registered as pharmacists and cannot legally practise",
        "The institution cannot legally operate a pharmacy education programme under the Pharmacy Act, 1948",
        "A machine room that has not been purpose-designed typically fails inspection on floor loading, electrical supply, ventilation, and access simultaneously",
        "For Pharm.D programmes, absence of a qualifying hospital affiliation blocks approval of the clinical internship component",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Designs PCI-Compliant Pharmacy Colleges",
      bullets: [
        "PCI and AICTE minimum standards mapping at brief stage — every requirement mapped to a physical space before design begins",
        "Pharmaceutical laboratory design: correct bench layout, fume hood provision, utility services, chemical storage, and emergency safety provisions for each laboratory's specific use",
        "Machine room engineering from the structural level up — floor loading, vibration isolation, dedicated three-phase electrical supply, dust extraction ventilation, floor drainage, and wide access doors",
        "Fume hood and ventilation engineering as part of the mechanical services scope, with appropriate ductwork and exhaust discharge",
        "Pharmacognosy laboratory and museum design, computer laboratory design, and library design to PCI minimum standards",
        "Campus layout integrating the college building, hostel, and supporting facilities to meet PCI, AICTE, and university affiliation requirements simultaneously",
      ],
    },
    faqs: [
      { q: "What is the PCI and why is its approval required for a pharmacy college?", a: "The Pharmacy Council of India is the statutory apex body for pharmacy education regulation, established under the Pharmacy Act 1948. Its approval is mandatory for any college offering D.Pharm, B.Pharm, Pharm.D, or M.Pharm — without it, qualifications have no regulatory standing and graduates cannot be registered as pharmacists." },
      { q: "What is the difference between D.Pharm, B.Pharm, and Pharm.D programmes?", a: "D.Pharm is a two-year entry-level diploma. B.Pharm is a four-year undergraduate degree, the primary pharmacy qualification in India. Pharm.D is a six-year integrated programme including one year of clinical pharmacy hospital internship, with additional hospital affiliation requirements beyond B.Pharm." },
      { q: "What is a machine room in a pharmacy college and why is it so important?", a: "It's a purpose-built space housing industrial-scale pharmaceutical manufacturing machinery for large-scale formulation practicals. It requires heavy floor loading, vibration isolation, dedicated three-phase electrical supply, dust extraction ventilation, floor drainage, and wide access doors — a room that hasn't been purpose-designed will fail PCI inspection on multiple parameters simultaneously." },
      { q: "Does a pharmacy college need AICTE approval in addition to PCI approval?", a: "Yes, for B.Pharm and M.Pharm programmes. AICTE prescribes additional infrastructure, faculty, and financial resource standards that must be satisfied alongside PCI's regulations." },
      { q: "What hospital is required for a Pharm.D programme?", a: "Affiliation with a hospital of defined minimum bed strength that has a functioning clinical pharmacy department, where Pharm.D students undertake supervised clinical pharmacy practice including medication review and patient counselling during their internship year." },
      { q: "Can ARCHORA design and build a complete pharmacy college for PCI and AICTE approval?", a: "Yes. ARCHORA designs every mandatory laboratory, the machine room, library, classrooms, museum, and hostel to PCI minimum standards and AICTE requirements for the proposed programme and intake from the project brief stage." },
    ],
  },

  // ───────────────────────── IRCA ─────────────────────────
  {
    slug: "irca",
    abbr: "IRCA",
    fullName: "Integrated Rehabilitation Centre for Addicts",
    color: "#f43f5e",
    metaDesc: "Complete guide to IRCA accreditation for addiction treatment and rehabilitation centres in India. Understand NABH IRCA standards, Ministry of Social Justice registration, infrastructure requirements, and how ARCHORA designs IRCA-compliant rehabilitation centres from day one.",
    heroH1: "IRCA Accreditation for Addiction and Rehabilitation Centres in India",
    heroSub: "Complete guide to NABH IRCA standards, Ministry of Social Justice registration, the therapeutic and clinical infrastructure an IRCA requires, and how ARCHORA designs IRCA-compliant rehabilitation centres from day one.",
    whatIsIt: {
      heading: "What is IRCA?",
      body: [
        "IRCA stands for Integrated Rehabilitation Centre for Addicts. It is the quality accreditation and regulatory framework for addiction treatment and rehabilitation centres in India, administered through the Ministry of Social Justice and Empowerment in collaboration with the National Accreditation Board for Hospitals and Healthcare Providers.",
        "The NABH IRCA Accreditation Standards are the primary quality benchmark for addiction and rehabilitation centres in India. They define the physical infrastructure requirements, clinical service standards, counselling and rehabilitation programme requirements, staffing standards, patient rights provisions, and quality management systems a centre must demonstrate to earn and retain accreditation.",
        "Ministry of Social Justice and Empowerment registration is the mandatory legal registration requirement that applies to all addiction and rehabilitation centres operating in India, regardless of whether they seek NABH IRCA accreditation. Ministry registration provides the legal authorisation to operate; NABH IRCA accreditation certifies the quality of the services provided — the two are complementary, not interchangeable.",
      ],
    },
    whyItMatters: {
      heading: "Why IRCA Compliance Matters — The Scale of India's Addiction Treatment Gap",
      body: [
        "India faces one of the most significant addiction treatment infrastructure gaps of any large nation in the world. Government surveys have consistently documented that tens of millions of Indians require treatment for substance use disorders, yet the number of quality-assured, professionally staffed, appropriately equipped addiction treatment facilities remains severely inadequate relative to this need.",
        "A large proportion of those who do access treatment receive care in unregulated facilities with inadequate clinical oversight, inappropriate physical environments, and ineffective treatment approaches — while healthcare systems absorb the downstream costs of addiction-related medical and psychiatric complications.",
        "IRCA accreditation is the quality framework that positions a rehabilitation centre at the legitimate, professionally credible end of the addiction treatment market, distinguishing it clearly from unregulated facilities operating without quality assurance.",
      ],
    },
    whoNeedsIt: {
      heading: "Who an IRCA Facility Must Serve and Comply With",
      groups: [
        { title: "Regulatory Frameworks That Apply", items: ["Ministry of Social Justice and Empowerment — mandatory registration for all centres", "NABH IRCA Accreditation Standards — voluntary quality accreditation", "Narcotic Drugs and Psychotropic Substances Act, 1985 — for opioid substitution therapy and controlled substance storage", "Mental Healthcare Act, 2017 — for dual-diagnosis patients receiving inpatient psychiatric care"] },
        { title: "Core IRCA Treatment Components", items: ["Medical detoxification unit with nursing supervision", "Psychiatric assessment and treatment", "Individual and group counselling", "Family therapy and family education", "Vocational rehabilitation and recreational programming", "Aftercare and relapse prevention planning"] },
      ],
    },
    process: {
      heading: "NABH IRCA Accreditation Process — Step by Step",
      steps: [
        { step: "01", title: "Self-Assessment Against NABH IRCA Standards", desc: "The organisation conducts a comprehensive self-assessment of facility, services, staffing, and systems to identify gaps before applying." },
        { step: "02", title: "Ministry of Social Justice Registration", desc: "A prerequisite for NABH IRCA accreditation, secured before or alongside the NABH application." },
        { step: "03", title: "NABH Pre-Assessment Application", desc: "Submission includes the self-assessment report, Ministry registration, CEA registration, Fire NOC, and facility and staff details." },
        { step: "04", title: "NABH Pre-Assessment Visit", desc: "NABH assessors identify compliance gaps and provide a structured gap report to guide remediation." },
        { step: "05", title: "Remediation and Re-Application", desc: "The organisation addresses identified gaps in infrastructure, staffing, systems, and documentation before applying for formal assessment." },
        { step: "06", title: "Final Accreditation Assessment", desc: "A comprehensive assessment of facility, programmes, staffing, documentation, and quality systems against all NABH IRCA standards." },
        { step: "07", title: "NABH IRCA Accreditation Award", desc: "Following a satisfactory assessment, NABH awards accreditation for a defined period, subject to surveillance and re-accreditation." },
      ],
    },
    referenceTable: {
      heading: "IRCA Infrastructure by Facility Zone",
      rows: [
        { facility: "Residential Accommodation", requirement: "Single-sex zones, minimum floor area per patient, common living areas, outdoor access" },
        { facility: "Detoxification Unit", requirement: "Nursing station with direct sightlines, monitoring provisions, NDPS-compliant secure storage" },
        { facility: "Counselling & Therapy Rooms", requirement: "Soundproofed individual rooms, group therapy rooms, family therapy room — acoustic separation mandatory" },
        { facility: "Programme & Activity Spaces", requirement: "Multipurpose hall, vocational workshop, library, outdoor recreational space" },
        { facility: "Medical & Clinical Support", requirement: "Consultation room, treatment room, NDPS-compliant pharmacy, lab access" },
        { facility: "Safety & Security", requirement: "Perimeter security, visitor management, CCTV, fire safety, anti-ligature design" },
      ],
    },
    consequences: {
      heading: "What Happens Without IRCA Compliance",
      bullets: [
        "Operating an addiction treatment facility without Ministry of Social Justice registration is not legally permissible",
        "Centres without NABH IRCA accreditation are ineligible for government funding under the Scheme for Prevention of Alcoholism and Substance Abuse",
        "Absence of NDPS Act-compliant storage exposes the facility to legal liability where opioid substitution therapy or controlled substances are administered",
        "Facilities providing inpatient psychiatric care without Mental Healthcare Act 2017 compliance and State Mental Health Authority registration are non-compliant for that component of care",
        "Patient safety risk increases significantly where anti-ligature design and clinical monitoring provisions are absent from detoxification and residential zones",
        "Lack of quality accreditation leaves a facility indistinguishable from the large unregulated segment of the addiction treatment market",
      ],
    },
    howArchoraHelps: {
      heading: "How ARCHORA Designs NABH IRCA-Compliant Rehabilitation Centres",
      bullets: [
        "Treatment model translation into physical design before layout development begins",
        "NABH IRCA standards mapping: every standard with a physical infrastructure implication mapped to a specific design requirement",
        "Therapeutic environment design — natural light, access to nature, domestic scale, privacy, and a non-institutional character throughout residential and common areas",
        "Detoxification unit clinical design with nursing station sightlines, monitoring provisions, and NDPS-compliant secure storage",
        "Anti-ligature design provisions in patient residential areas and bathrooms to mitigate self-harm risk",
        "Acoustic design for individual and group counselling rooms to protect confidentiality",
        "Security and perimeter design balancing safety requirements with a non-custodial, non-punitive environment",
        "Ministry of Social Justice and CEA registration documentation support",
      ],
    },
    faqs: [
      { q: "What is IRCA accreditation and why does a rehabilitation centre need it?", a: "IRCA stands for Integrated Rehabilitation Centre for Addicts. NABH IRCA Accreditation is the quality accreditation standard for addiction treatment and rehabilitation centres in India, certifying that a centre meets defined standards for physical infrastructure, clinical services, counselling programmes, staffing, and patient rights. It is required for Ministry of Social Justice funding eligibility and distinguishes quality-assured centres from unregulated ones." },
      { q: "What is the difference between Ministry of Social Justice registration and NABH IRCA accreditation?", a: "Ministry registration is the mandatory legal registration required for all addiction and rehabilitation centres operating in India — it provides legal authorisation to operate. NABH IRCA accreditation is the voluntary quality layer above that, certifying the centre meets NABH's standards for infrastructure, services, and programmes." },
      { q: "What physical spaces are mandatory in an IRCA-accredited rehabilitation centre?", a: "A residential accommodation zone, a medically supervised detoxification unit with nursing oversight, private soundproofed individual counselling rooms, group therapy rooms, a family therapy room, programme and activity spaces, a doctor's consultation room, a treatment room, NDPS-compliant secure medication storage, and administrative and staff welfare areas." },
      { q: "Does an addiction rehabilitation centre need to comply with the Mental Healthcare Act 2017?", a: "Yes, partially. Where a centre provides inpatient psychiatric care for patients with co-occurring mental health disorders, the Mental Healthcare Act 2017 applies to those components, and the centre must register with the State Mental Health Regulatory Authority for its psychiatric services." },
      { q: "What are anti-ligature design provisions and why are they important?", a: "Anti-ligature design provisions remove or mitigate fixtures and fittings that could be used by a vulnerable patient to self-harm — covering door handles, towel rails, shower fittings, ceiling fixtures, and window hardware in patient residential areas and bathrooms. They are a mandatory element of responsible rehabilitation centre design under NABH IRCA standards." },
      { q: "Can ARCHORA design and build a complete IRCA-accredited rehabilitation centre?", a: "Yes. ARCHORA designs the full facility — residential accommodation, detoxification unit, counselling and group therapy rooms, family therapy room, programme spaces, outdoor therapeutic areas, clinical support spaces, and perimeter and security infrastructure — to NABH IRCA standards from the project brief stage, so the completed facility is ready for NABH assessment without remediation." },
    ],
  },
];

// ─── Quick-reference stub data for the remaining compliance bodies ───────────
// These don't have a full PDF brief yet, so they render a shorter overview
// built from the description already shown on the Facilities page.
export const complianceStubs: Record<string, { abbr: string; fullName: string; covers: string; color: string }> = {
  // All 12 compliance bodies now have full pages in complianceData above.
  // This map is kept as a fallback mechanism for any future compliance body
  // that doesn't yet have a complete PDF brief.
};

// ─── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <p style={{ fontFamily: FONT, fontSize: SIZE.eyebrow, letterSpacing: "3px", textTransform: "uppercase", color, marginBottom: 16, display: "flex", alignItems: "center", gap: 14, fontWeight: 600 }}>
      <span style={{ display: "block", width: 28, height: "0.5px", background: color }} />
      {text}
      <span style={{ display: "block", width: 28, height: "0.5px", background: color }} />
    </p>
  );
}

// ─── FAQ item ──────────────────────────────────────────────────────────────────
function FAQItem({ faq }: { faq: ComplianceFAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, padding: "20px 0", background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontFamily: FONT, fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4, color: open ? "#185FA5" : "#042C53", transition: "color 0.25s" }}>
          {faq.q}
        </span>
        <span style={{ flexShrink: 0, color: open ? "#185FA5" : "rgba(4,44,83,0.35)", marginTop: 2 }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
            <p style={{ fontFamily: FONT, fontSize: SIZE.body, lineHeight: 1.9, color: "#185FA5", paddingBottom: 20, fontWeight: 400 }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Wrapper that resolves the slug, used directly by the route ──────────────
export function ComplianceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const compliance = complianceData.find(c => c.slug === slug);
  const stub = !compliance && slug ? complianceStubs[slug] : null;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);

  if (!compliance && !stub) return <Navigate to="/facilities" replace />;

  if (stub) return <ComplianceStubView stub={stub} onBack={() => navigate("/facilities")} />;

  return <ComplianceFullView compliance={compliance!} onBack={() => navigate("/facilities")} />;
}

// ─── Short view for compliance bodies without full content yet ──────────────
function ComplianceStubView({ stub, onBack }: { stub: { abbr: string; fullName: string; covers: string; color: string }; onBack: () => void }) {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: FONT }}>
      <section style={{ position: "relative", minHeight: "52vh", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(160deg,#040e1a 0%,#071e30 60%,#04141f 100%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(75,209,217,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "6rem 3rem", zIndex: 2, width: "100%" }}>
          <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 32 }}>
            <ArrowLeft size={14} /> Back to Facilities
          </button>
          <p style={{ fontFamily: FONT, fontSize: SIZE.eyebrow, letterSpacing: "0.3em", textTransform: "uppercase", color: `${stub.color}90`, marginBottom: 16, fontWeight: 600 }}>{stub.abbr}</p>
          <h1 style={{ fontFamily: FONT, fontSize: SIZE.h1, fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 22, maxWidth: 700 }}>{stub.fullName}</h1>
          <p style={{ fontFamily: FONT, fontSize: SIZE.bodyLg, lineHeight: 1.9, color: "rgba(255,255,255,0.92)", maxWidth: 560, marginBottom: 16, fontWeight: 400 }}>
            <strong style={{ fontWeight: 600, color: "#fff" }}>Covers: </strong>{stub.covers}
          </p>
          <p style={{ fontFamily: FONT, fontSize: SIZE.body, lineHeight: 1.9, color: "rgba(255,255,255,0.55)", maxWidth: 560, fontWeight: 400 }}>
            A full {stub.abbr} compliance guide for this regulatory body is coming soon. In the meantime, our team can walk you through exactly what it means for your project.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
            <button onClick={() => navigate("/contact")} style={{ padding: "13px 28px", fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer" }}>Book a Free Consultation</button>
            <button onClick={() => window.open(WHATSAPP_URL, "_blank")} style={{ padding: "13px 28px", fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer" }}>WhatsApp Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Full detail view ─────────────────────────────────────────────────────────
function ComplianceFullView({ compliance, onBack }: { compliance: ComplianceData; onBack: () => void }) {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });

  return (
    <div style={{ fontFamily: FONT }}>
      <style>{`
        .compliance-table-row { display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; padding: 16px 0; border-bottom: 0.5px solid rgba(24,95,165,0.12); }
        .compliance-process-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 56px; }
        .compliance-who-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.2rem; }
        @media (max-width: 768px) {
          .compliance-table-row { grid-template-columns: 1fr; gap: 6px; }
          .compliance-process-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "62vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "linear-gradient(160deg,#040e1a 0%,#071e30 55%,#04141f 100%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(75,209,217,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${compliance.color}10 0%, transparent 65%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "6rem 3rem 4.5rem", zIndex: 2, width: "100%" }}>
          <motion.button
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            onClick={onBack}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 32 }}
          >
            <ArrowLeft size={14} /> Back to Facilities
          </motion.button>

          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ padding: "8px 16px", background: `${compliance.color}18`, border: `1px solid ${compliance.color}35`, borderRadius: 2 }}>
              <span style={{ fontFamily: FONT, fontSize: SIZE.eyebrow, letterSpacing: "0.2em", textTransform: "uppercase", color: compliance.color, fontWeight: 600 }}>{compliance.abbr}</span>
            </div>
            <span style={{ fontFamily: FONT, fontSize: SIZE.body, color: "rgba(255,255,255,0.5)" }}>{compliance.fullName}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: FONT, fontSize: SIZE.h1, fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 24, maxWidth: 760 }}
          >
            {compliance.heroH1}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} style={{ fontFamily: FONT, fontSize: SIZE.bodyLg, lineHeight: 1.9, color: "rgba(255,255,255,0.92)", maxWidth: 620, marginBottom: 40, fontWeight: 400 }}>
            {compliance.heroSub}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => navigate("/contact")} style={{ padding: "13px 28px", fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer", transition: "all .25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = compliance.color; (e.currentTarget as HTMLButtonElement).style.color = "#041c2e"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1b6ca8"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            >Book a Free Consultation</button>
            <button onClick={() => window.open(WHATSAPP_URL, "_blank")} style={{ padding: "13px 28px", fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer" }}>WhatsApp Us</button>
          </motion.div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${compliance.color}60, transparent 50%, ${compliance.color}20)` }} />
      </section>

      {/* ── WHAT IS IT ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#e8f4fd 100%)", padding: "5.5rem 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 3rem" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel text="The Authority" color="#185FA5" />
            <h2 style={{ fontFamily: FONT, fontSize: SIZE.h2, fontWeight: 600, color: "#042C53", marginBottom: 28, lineHeight: 1.2 }}>
              {compliance.whatIsIt.heading}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {compliance.whatIsIt.body.map((para, i) => (
                <p key={i} style={{ fontFamily: FONT, fontSize: SIZE.body, lineHeight: 1.95, color: "#0a1a2a", fontWeight: 400 }}>{para}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "5.5rem 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 3rem" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel text="Why It Matters" color={compliance.color} />
            <h2 style={{ fontFamily: FONT, fontSize: SIZE.h2, fontWeight: 600, color: "#fff", marginBottom: 28, lineHeight: 1.2 }}>
              {compliance.whyItMatters.heading}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {compliance.whyItMatters.body.map((para, i) => (
                <p key={i} style={{ fontFamily: FONT, fontSize: SIZE.body, lineHeight: 1.95, color: "rgba(255,255,255,0.92)", fontWeight: 400 }}>{para}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHO NEEDS IT ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#daeef9 50%,#e8f4fd 100%)", padding: "5.5rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 44 }}>
            <SectionLabel text="Applicability" color="#185FA5" />
            <h2 style={{ fontFamily: FONT, fontSize: SIZE.h2, fontWeight: 600, color: "#042C53", lineHeight: 1.2 }}>
              {compliance.whoNeedsIt.heading}
            </h2>
          </motion.div>
          <div className="compliance-who-grid">
            {compliance.whoNeedsIt.groups.map((g, gi) => (
              <motion.div key={gi} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: gi * 0.08 }} style={{ padding: "1.6rem 1.5rem", background: "rgba(4,44,83,0.04)", border: "0.5px solid rgba(24,95,165,0.14)", borderRadius: 3 }}>
                <h3 style={{ fontFamily: FONT, fontSize: SIZE.h3, fontWeight: 600, color: "#042C53", marginBottom: 14 }}>{g.title}</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                  {g.items.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#185FA5", flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontFamily: FONT, fontSize: SIZE.small, lineHeight: 1.7, color: "#185FA5", fontWeight: 400 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      {compliance.process && (
        <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "5.5rem 0" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 3rem" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 48 }}>
              <SectionLabel text="The Process" color={compliance.color} />
              <h2 style={{ fontFamily: FONT, fontSize: SIZE.h2, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{compliance.process.heading}</h2>
            </motion.div>
            <div className="compliance-process-grid">
              {compliance.process.steps.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: (i % 5) * 0.06 }} style={{ display: "flex", gap: 18, padding: "20px 0", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ fontFamily: FONT, fontSize: SIZE.stepNum, fontWeight: 300, color: `${compliance.color}50`, lineHeight: 1, flexShrink: 0, minWidth: 48 }}>{s.step}</span>
                  <div>
                    <h3 style={{ fontFamily: FONT, fontSize: "1.3rem", fontWeight: 600, color: "#fff", marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ fontFamily: FONT, fontSize: SIZE.small, lineHeight: 1.75, color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REFERENCE TABLE ── */}
      <section ref={tableRef} style={{ background: "linear-gradient(160deg,#ffffff 0%,#e8f4fd 100%)", padding: "5.5rem 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 3rem" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={tableInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: 36 }}>
            <SectionLabel text="Reference Table" color="#185FA5" />
            <h2 style={{ fontFamily: FONT, fontSize: SIZE.h2, fontWeight: 600, color: "#042C53", lineHeight: 1.2 }}>{compliance.referenceTable.heading}</h2>
          </motion.div>
          <div>
            <div className="compliance-table-row" style={{ borderBottom: "1.5px solid rgba(24,95,165,0.3)" }}>
              <span style={{ fontFamily: FONT, fontSize: SIZE.small, letterSpacing: "0.12em", textTransform: "uppercase", color: "#185FA5", fontWeight: 600 }}>Facility Type</span>
              <span style={{ fontFamily: FONT, fontSize: SIZE.small, letterSpacing: "0.12em", textTransform: "uppercase", color: "#185FA5", fontWeight: 600 }}>Requirement</span>
            </div>
            {compliance.referenceTable.rows.map((row, i) => (
              <motion.div key={i} className="compliance-table-row" initial={{ opacity: 0 }} animate={tableInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: i * 0.04 }}>
                <span style={{ fontFamily: FONT, fontSize: SIZE.body, color: "#042C53", fontWeight: 600 }}>{row.facility}</span>
                <span style={{ fontFamily: FONT, fontSize: SIZE.body, color: "#185FA5", lineHeight: 1.6, fontWeight: 400 }}>{row.requirement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSEQUENCES + HOW ARCHORA HELPS ── */}
      <section style={{ background: "linear-gradient(170deg,#040e1a 0%,#071e30 55%,#04141f 100%)", padding: "5.5rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel text="The Risk" color="#f43f5e" />
            <h2 style={{ fontFamily: FONT, fontSize: "1.7rem", fontWeight: 600, color: "#fff", marginBottom: 22, lineHeight: 1.25 }}>{compliance.consequences.heading}</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {compliance.consequences.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f43f5e", flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontFamily: FONT, fontSize: SIZE.small, lineHeight: 1.75, color: "rgba(255,255,255,0.85)", fontWeight: 400 }}>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <SectionLabel text="How ARCHORA Helps" color={compliance.color} />
            <h2 style={{ fontFamily: FONT, fontSize: "1.7rem", fontWeight: 600, color: "#fff", marginBottom: 22, lineHeight: 1.25 }}>{compliance.howArchoraHelps.heading}</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {compliance.howArchoraHelps.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: compliance.color, flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontFamily: FONT, fontSize: SIZE.small, lineHeight: 1.75, color: "rgba(255,255,255,0.85)", fontWeight: 400 }}>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "linear-gradient(160deg,#ffffff 0%,#e8f4fd 100%)", padding: "5.5rem 0" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 3rem" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 16 }}>
            <SectionLabel text="FAQ" color="#185FA5" />
            <h2 style={{ fontFamily: FONT, fontSize: SIZE.h2, fontWeight: 600, color: "#042C53", lineHeight: 1.2 }}>Frequently Asked Questions</h2>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {compliance.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < compliance.faqs.length - 1 ? "0.5px solid rgba(24,95,165,0.14)" : "none" }}>
                <FAQItem faq={faq} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#060f1e", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 3rem", textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 3.4vw, 2.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: 18 }}>
              Planning a {compliance.abbr}-Regulated Facility?
            </h2>
            <p style={{ fontFamily: FONT, fontSize: SIZE.body, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 36, maxWidth: 460, margin: "0 auto 36px", fontWeight: 400 }}>
              Speak to ARCHORA and we will map exactly what {compliance.abbr} compliance means for your project, before a single drawing is made.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/contact")} style={{ padding: "13px 30px", fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "#1b6ca8", color: "#fff", border: "none", cursor: "pointer" }}>Book a Free Consultation</button>
              <Link to="/facilities" style={{ padding: "13px 30px", fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FONT, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                Browse Facility Types <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}