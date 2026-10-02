import type { MetadataRoute } from "next";
import { SITE, flags } from "@/lib/site";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/capabilities", priority: 0.9 },
  { path: "/facility", priority: 0.7 },
  { path: "/technology", priority: 0.7 },
  { path: "/quality", priority: 0.8 },
  { path: "/industries", priority: 0.8 },
  { path: "/projects", priority: 0.8 },
  { path: "/rdso-approval", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
  ...(flags.showCareers ? [{ path: "/careers", priority: 0.5 }] : []),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${SITE.url}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
