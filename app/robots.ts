import type { MetadataRoute } from "next";
import { SITE, flags } from "@/lib/site";

// Test/preview URLs stay noindex; set NEXT_PUBLIC_ALLOW_INDEXING=1 only on the final domain.
export default function robots(): MetadataRoute.Robots {
  if (!flags.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/og"] },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
