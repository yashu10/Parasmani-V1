const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

export const SITE = {
  name: "Parasmani Engineering Pvt. Ltd.",
  short: "Parasmani Engineering",
  url: (envUrl || vercelUrl || "http://localhost:3000").replace(/\/$/, ""),
  phone: "+91 98797 95382",
  phoneHref: "tel:+919879795382",
  email: "info@parasmaniengineering.com",
  address: {
    street: "Village Vani, Taluka Viramgam",
    district: "Dist. Ahmedabad",
    region: "Gujarat",
    postal: "382150",
    country: "IN",
  },
  logo: "/images/pepl-logo.png",
};

export const flags = {
  showPending: process.env.NEXT_PUBLIC_SHOW_PENDING === "1",
  showCareers: process.env.NEXT_PUBLIC_SHOW_CAREERS === "1",
  bg3d: process.env.NEXT_PUBLIC_BG_MODE === "3d",
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "1",
};

export const RDSO_BASE =
  process.env.NEXT_PUBLIC_RDSO_BASE || "https://www.parasmaniengineering.com/public/rdso-documents/";

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const ABOUT_SUB: NavItem[] = [
  { label: "CAPABILITIES", href: "/capabilities" },
  { label: "FACILITY", href: "/facility" },
  { label: "TECHNOLOGY", href: "/technology" },
  { label: "QUALITY", href: "/quality" },
];

export const NAV: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about", children: ABOUT_SUB },
  { label: "INDUSTRIES", href: "/industries" },
  { label: "PROJECTS", href: "/projects" },
  ...(flags.showCareers ? [{ label: "CAREERS", href: "/careers" }] : []),
  { label: "RDSO", href: "/rdso-approval" },
  { label: "CONTACT", href: "/contact" },
];

export const FOOTER_NAV: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  ...ABOUT_SUB,
  { label: "INDUSTRIES", href: "/industries" },
  { label: "PROJECTS", href: "/projects" },
  ...(flags.showCareers ? [{ label: "CAREERS", href: "/careers" }] : []),
  { label: "RDSO", href: "/rdso-approval" },
  { label: "CONTACT", href: "/contact" },
];

// Three.js background variant per route (only used when NEXT_PUBLIC_BG_MODE=3d)
export const BG_VARIANT: Record<string, number> = {
  "/": 0,
  "/about": 2,
  "/capabilities": 1,
  "/industries": 3,
  "/projects": 1,
  "/facility": 3,
  "/quality": 2,
  "/technology": 0,
  "/careers": 2,
  "/rdso-approval": 3,
  "/contact": 1,
};
