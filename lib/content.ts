// All site copy, moved from design/PEPL Website Orange.dc.html.
// Items with `pending: true` are unverified client facts: they render only while
// NEXT_PUBLIC_SHOW_PENDING=1 (and carry a "pending verification" badge).

export const img = (k: string) => `/images/stock/${k}.jpg`;

// Descriptive alt text, written from the actual photos.
export const ALT: Record<string, string> = {
  "A": "Dimly lit steel plant hall with overhead crane hooks and heavy structural framework",
  "AA": "Welder in protective mask and yellow jacket with a burst of bright sparks",
  "AB": "Welder in a helmet welding a steel frame inside a workshop",
  "AC": "Worker in gloves cutting steel with a torch, sparks streaming across the frame",
  "B": "Rows of rolled steel coils in a storage hall, shown in black and white",
  "C": "Molten steel pouring from a ladle in a foundry",
  "D": "Overhead crane carrying a bundle of steel through a smoky industrial plant",
  "E": "Industrial plant structures, platforms and pipework against a blue evening sky",
  "F": "Ladle pouring glowing molten metal with sparks in a dark foundry",
  "G": "Heavy-industry fabrication hall with a gantry crane and light beams from the roof",
  "H": "Worker in high-visibility clothing handling bundled steel bars on a steel grating",
  "I": "Close view of polished rolled steel coils",
  "J": "Steel plant hall with a glowing furnace and overhead crane",
  "K": "Molten steel pouring from a tilted ladle with smoke and sparks",
  "L": "Glowing hot steel bar moving along a rolling line inside a plant",
  "M": "Foundry floor with overhead crane and pots of molten metal",
  "N": "Ladle of molten steel with a shower of sparks in a steel plant",
  "O": "Welder in a red helmet grinding a steel section, sparks flying",
  "P": "Worker grinding steel with a shower of glowing sparks",
  "Q": "Welder in a patterned helmet working with a bright blue welding arc",
  "R": "Welder in leather gloves and helmet welding steel sections with sparks",
  "S": "Fabricator in safety glasses measuring a steel section with a tape",
  "T": "Angle grinder cutting a steel bar with a spray of sparks",
  "U": "CNC cutting head profiling a steel plate with sparks flying",
  "V": "Worker in a hard hat grinding a large rolled steel cylinder",
  "W": "Welder in a helmet welding a small steel component with a bright arc",
  "X": "Rows of threaded steel couplers laid out in a grid",
  "Y": "Worker flame-cutting steel box sections with a bright shower of sparks",
  "Z": "Welder in a helmet working at a perforated steel fabrication table in a workshop",
  "prefab-bg": "Prefabricated steel building frame rising next to tower cranes",
  "rail-1": "Indian Railways diesel locomotive standing at a station platform",
  "rail-2": "Passenger train on railway tracks at a station at sunrise",
  "rail-3": "Aerial view of a railway yard with trains and several tracks",
  "rail-hero": "Indian Railways locomotive hauling container wagons"
};
export const alt = (k: string) => ALT[k] ?? "";

export const TICKER = [
  "HEAVY STRUCTURAL STEEL",
  "CNC PROFILING",
  "SUBMERGED ARC WELDING",
  "NDT & INSPECTION",
  "SHOT BLASTING",
  "SURFACE TREATMENT",
  "PRE-ENGINEERED BUILDINGS",
  "ERECTION AT SITE",
  "DIGITAL TRACEABILITY",
];

export const METRICS = [
  { value: "40,000", unit: "M²", label: "INDUSTRIAL LAND", pending: true },
  { value: "6,000", unit: "M²", label: "COVERED AREA", pending: true },
  { value: "70", unit: "MT", label: "CRANE CAPACITY", pending: true },
  { value: "50 × 10", unit: "M", label: "TWIN-BEAM GANTRY", pending: true },
];

export const CAP_HEAVY = [
  "Heavy Structural Steel",
  "Industrial Structures",
  "Complex Fabricated Assemblies",
  "Columns & Beams",
  "Trusses",
  "Platforms",
  "Structural Components",
  "Heavy Welded Structures",
  "Project-Specific Fabrication",
];
export const CAP_ENG = [
  "Engineering",
  "Shop Drawings",
  "Fabrication Drawings",
  "CNC Data",
  "Quantity Take-Off",
  "Production Planning",
  "Quality Documentation",
];

export const PROCESS = [
  { number: "01", name: "ENGINEERING", hold: "Drawing approval", doc: "Approved engineering / shop drawing", sign: "Engineering sign-off" },
  { number: "02", name: "MATERIAL PROCUREMENT", hold: "Material verification", doc: "Material certificates", sign: "QC sign-off" },
  { number: "03", name: "CNC CUTTING & DRILLING", hold: "Dimensional verification", doc: "CNC program / inspection record", sign: "Production / QC sign-off" },
  { number: "04", name: "FIT-UP", hold: "Fit-up inspection", doc: "Fit-up inspection report", sign: "QC sign-off" },
  { number: "05", name: "WELDING", hold: "Welding inspection", doc: "WPS / PQR / welding record", sign: "Welding / QC sign-off" },
  { number: "06", name: "INSPECTION & NDT", hold: "NDT acceptance", doc: "NDT report", sign: "Inspection sign-off" },
  { number: "07", name: "SHOT BLASTING / PAINTING", hold: "Surface / coating inspection", doc: "Paint inspection report", sign: "QC sign-off" },
  { number: "08", name: "FINAL INSPECTION", hold: "Final acceptance", doc: "Final inspection dossier", sign: "Authorized sign-off" },
  { number: "09", name: "DISPATCH", hold: "Dispatch clearance", doc: "Dispatch documentation", sign: "Project sign-off" },
];

const K_IND = ["D", "M", "G", "E", "L", "H", "A", "N", "C", "K", "F", "J"];
export const INDUSTRIES = (
  [
    ["Power & Energy", "Structural and fabricated steel for thermal, renewable and balance-of-plant packages, produced to the tolerances and documentation regimes power EPCs require."],
    ["Steel & Metals", "Technological structures, conveyor galleries, junction houses and process buildings for integrated steel and metals plants."],
    ["Infrastructure", "Heavy fabricated assemblies for infrastructure programmes, from terminal structures to industrial sheds and support steel."],
    ["Cement", "Structural steel for cement plants — preheater towers, silo structures, chute and duct supports."],
    ["Industrial Manufacturing", "Fabrication for manufacturing plants: building frames, mezzanine floors, machine foundations and equipment supports."],
    ["Railways", "Fabricated components and structures for railway infrastructure, produced under the approval regime the sector requires."],
    ["EPC Projects", "Schedule-driven fabrication packages for EPC contractors, planned against the project's erection sequence rather than shop convenience."],
    ["Defence & Strategic", "Fabricated steel for strategic and defence infrastructure, with the documentation and confidentiality such work demands."],
    ["Heavy Engineering", "Complex built-up assemblies and equipment structures fabricated to customer drawings and inspection plans."],
    ["Oil & Gas", "Pipe racks, process structures, platforms and equipment supports for refineries and oil & gas facilities."],
    ["Solar", "Module mounting structures, inverter and control-room steel for utility-scale solar plants."],
    ["Food Processing", "Hygienic-grade process structures, platforms and equipment supports for food and beverage plants."],
  ] as const
).map(([name, long], k) => ({
  num: String(k + 1).padStart(2, "0"),
  name,
  nameUpper: name.toUpperCase(),
  long,
  img: img(K_IND[k]),
  alt: alt(K_IND[k]),
}));

export const PROJECT_STAGES = ["Engineering", "Fabrication", "Inspection", "Dispatch", "Site"];
const K_PRJ = ["A", "G", "L", "B", "E", "X"];
const S_STG = [["S", "P"], ["W", "Y", "AB", "R", "AC"], ["S", "T", "V"], ["B", "I", "D"], ["H", "G", "E"]];
export const PROJECTS = (
  [
    ["Thermal plant structural package", "Power & Energy", "Heavy structural fabrication"],
    ["Pre-engineered warehouse, supply & erection", "Infrastructure", "Fabrication, supply & erection"],
    ["Process plant technological structures", "Industrial Manufacturing", "Heavy fabrication & surface treatment"],
    ["Conveyor gallery & junction house steel", "Steel & Metals", "Fabrication & painting"],
    ["Industrial shed, primary & secondary steel", "EPC Projects", "Fabrication & supply"],
    ["Equipment support structures", "Heavy Engineering", "Built-up assemblies to drawing"],
  ] as const
).map(([title, industry, scope], k) => ({
  num: String(k + 1).padStart(2, "0"),
  title,
  industry,
  scope,
  img: img(K_PRJ[k]),
  alt: alt(K_PRJ[k]),
  client: "To be confirmed",
  qty: "To be confirmed",
  location: "To be confirmed",
  status: "To be confirmed",
  stages: PROJECT_STAGES.map((name, j) => {
    const key = S_STG[j][k % S_STG[j].length];
    return { name, img: img(key), alt: alt(key) };
  }),
}));

const K_MCH = ["U", "N", "AA", "T", "Y", "W", "Z", "V", "J", "D", "F", "I"];
export const MACHINES = (
  [
    ["CNC Plasma Cutting", "Profile cutting from nested CNC data"],
    ["CNC Drilling", "Beam-line drilling to model coordinates"],
    ["Edge Milling", "Plate edge preparation for weld profiles"],
    ["Band Saw", "Section cutting to length"],
    ["I-Beam Fit-Up & Welding", "Built-up girder assembly"],
    ["ESAB SAW Line", "Submerged arc welding"],
    ["Beam Straightening", "Flange distortion correction"],
    ["Shot Blasting", "Surface preparation to specified grade"],
    ["Painting Bay", "Coating application and curing"],
    ["Gantry Crane", "Twin-beam handling, 50 × 10 m"],
    ["Drying Ovens", "Electrode and SAW flux consumable control"],
    ["Weigh Bridge", "Dispatch weighing and record"],
  ] as const
).map(([name, fn], k) => ({
  name,
  fn,
  img: img(K_MCH[k]),
  alt: alt(K_MCH[k]),
}));

export const CERTS = [
  { name: "ISO 9001", status: "Pending verification", evidence: "To be confirmed", download: "—", pending: true },
  { name: "ISO 45001", status: "Pending verification", evidence: "To be confirmed", download: "—", pending: true },
  { name: "BIS", status: "As applicable", evidence: "Per product standard", download: "—" },
  { name: "RDSO", status: "As applicable", evidence: "Per railway scope", download: "—" },
  { name: "BHEL approval / registration", status: "As applicable", evidence: "Per power-sector scope", download: "—" },
  { name: "Welding qualifications", status: "Pending verification", evidence: "WPS / PQR register", download: "On request", pending: true },
  { name: "NDT capabilities", status: "Pending verification", evidence: "In-house & agency", download: "On request", pending: true },
];

export const DOWNLOADS = [
  { name: "Quality Certificates", meta: "PDF · pending" },
  { name: "Quality Policy", meta: "PDF · 1 page" },
  { name: "HSE Policy", meta: "PDF · 1 page" },
  { name: "Inspection Procedures", meta: "PDF · pending" },
  { name: "Company Profile", meta: "PDF · pending" },
];

export const CHAIN = ["Engineering Model", "Fabrication Drawing", "CNC Data", "Production", "Inspection", "Digital Record"].map(
  (name, k) => ({ num: String(k + 1).padStart(2, "0"), name }),
);

export const TECH = (
  [
    ["CNC Technology", "Plasma profiling and beam-line drilling driven directly by model output."],
    ["3D Modelling", "Detailed models before steel is cut — clashes found on screen, not on site."],
    ["CAD/CAM", "One data chain from detailing to machine, with no manual re-entry."],
    ["Digital Production Planning", "Job-wise plans sequenced against the customer's erection programme."],
    ["Production Monitoring", "Stage-wise progress captured against the plan and reported to the client."],
    ["Quality Traceability", "Heat numbers, welders and inspection records tied to each mark number."],
    ["Digital Documentation", "Dispatch document packs assembled and issued digitally."],
  ] as const
).map(([name, body], k) => ({ num: String(k + 1).padStart(2, "0"), name, body }));

export const WHY = [
  { title: "ENGINEERING CAPABILITY", description: "Engineering and detailing aligned with production requirements." },
  { title: "MANUFACTURING CAPABILITY", description: "Integrated fabrication infrastructure for demanding projects." },
  { title: "QUALITY COMMITMENT", description: "Controlled processes, inspection and documentation." },
  { title: "PROJECT EXECUTION", description: "Planned execution from engineering through dispatch." },
  { title: "SAFETY FIRST", description: "Safety integrated into operational processes." },
  { title: "CUSTOMER FOCUS", description: "Clear communication and long-term project relationships." },
];

export const VALUES = [
  { name: "INTEGRITY", meaning: "We communicate honestly, document accurately and deliver against commitments." },
  { name: "OWNERSHIP", meaning: "We take responsibility from engineering through delivery." },
  { name: "EXCELLENCE", meaning: "We continuously improve engineering, fabrication and quality standards." },
  { name: "CARE", meaning: "We care about people, safety, quality, customers and long-term relationships." },
];

export const LEADERS = [
  { role: "CHAIRMAN / CMD", name: "Daxesh Soni" },
  { role: "CEO", name: "To be confirmed", pending: true },
  { role: "PLANT HEAD / CTO", name: "Sanjeev Roy" },
];

export const CLIENTS = [
  { file: "lt", name: "Larsen & Toubro", w: 1068, h: 448 },
  { file: "amns", name: "AM/NS India", w: 800, h: 359 },
  { file: "jindal", name: "Jindal Steel", w: 2640, h: 1320 },
  { file: "adani-solar", name: "Adani Solar", w: 321, h: 211 },
  { file: "kec", name: "KEC International", w: 318, h: 213 },
  { file: "hindustan-zinc", name: "Hindustan Zinc", w: 1530, h: 1208 },
  { file: "bhel", name: "BHEL", w: 531, h: 442 },
  { file: "jsw", name: "JSW", w: 132, h: 69 },
].map((c) => ({ ...c, src: `/images/clients/${c.file}.png` }));

export const ROLES = (
  [
    ["Structural Engineer", "Engineering"],
    ["Production Engineer", "Production"],
    ["Welding Engineer", "Quality / Production"],
    ["QA/QC Engineer", "Quality"],
    ["Planning Engineer", "Planning"],
    ["Project Manager", "Projects"],
    ["Skilled Welder", "Production"],
    ["Fabricator", "Production"],
  ] as const
).map(([role, department], k) => ({
  num: String(k + 1).padStart(2, "0"),
  role,
  department,
  mailto: `mailto:info@parasmaniengineering.com?subject=${encodeURIComponent(role)}`,
}));

export const RDSO_DOCS = (
  [
    ["Company Registration", "Certificate of Incorporation, MOA, AOA & GST registration.", "company-registration.pdf"],
    ["Plant Layout", "Facility layout showing area and shop-wise arrangement.", "plant-layout.pdf"],
    ["Machinery & Process", "Machine list with capacity and process for cutting, drilling, welding, straightening and milling.", "machinery-process.pdf"],
    ["RDSO Registration", "Application acknowledgement. Registration ID to be updated on approval.", "rdso-registration.pdf", "IN PROCESS"],
    ["MSME Certificate", "Udyam / MSME registration under the enterprise category.", "msme-certificate.pdf"],
    ["Factory License", "Valid factory license with issue and expiry details.", "factory-license.pdf"],
    ["ISO 9001:2015", "Quality management system certification (IAF / BIS).", "iso-9001-2015.pdf"],
    ["Organisation Chart", "Plant head, shop in-charge, supervisors and artisans structure.", ""],
    ["Testing & NDT Reports", "DPT, UT, PAUT and RT reports with NABL certificate.", ""],
    ["Power Supply", "Electricity bill with demand power and installed supply details.", ""],
    ["Executed Works — Box Girders", "Supplies executed in the last 5 years (spans / tonnage).", ""],
    ["Works in Hand — Pipe Rack", "Current and ongoing works (spans / tonnage).", ""],
  ] as const
).map(([name, desc, file, status], k) => ({
  num: String(k + 1).padStart(2, "0"),
  name,
  desc,
  file,
  status: status || (file ? "SUBMITTED" : "ON REQUEST"),
  tone: status ? "hl" : file ? "acc" : "mute",
}));

// Supplied by the CMD (Daxesh Soni), 26 Sep 2026.
export const VMP = {
  vision:
    "We at Parasmani Engineering are becoming the world’s most admired, result-driven, referred, preferred and blessed Fabrication Engineering Organisation.",
  mission: "We deliver safe, high-quality engineering solutions through excellence, innovation and teamwork.",
  purpose:
    "To build a better future through engineering excellence, creating value for our customers, empowering our people and contributing to society.",
};
