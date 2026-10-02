import type { Metadata } from "next";
import { SITE, flags } from "./site";

type Opts = {
  title: string; // short page title (template adds the brand)
  description: string; // 150-160 chars
  path: string; // "/about"
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, absoluteTitle, noindex }: Opts): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.short}`;
  const ogImage = `/og?title=${encodeURIComponent(title.replace(/\s*\|.*$/, ""))}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex || !flags.allowIndexing ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} — ${SITE.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export const orgAddressLd = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: "Viramgam",
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postal,
  addressCountry: SITE.address.country,
};
