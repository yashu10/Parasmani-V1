import { breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Crumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return <JsonLd data={breadcrumbLd(trail)} />;
}
