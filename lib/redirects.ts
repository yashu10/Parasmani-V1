// Central 301 redirect list (handled in next.config.ts).
// Sources are the real URLs of the old parasmaniengineering.com site, mapped to the new routes.
export const redirects = [
  { source: "/aboutus", destination: "/about" },
  { source: "/aboutus/manufacturing-process", destination: "/capabilities" },
  { source: "/aboutus/quality", destination: "/quality" },
  { source: "/machineries/:path*", destination: "/facility" },
  { source: "/ourproducts", destination: "/capabilities" },
  { source: "/our_services", destination: "/capabilities" },
  // safe aliases
  { source: "/home", destination: "/" },
  { source: "/index.html", destination: "/" },
  { source: "/rdso", destination: "/rdso-approval" },
  { source: "/career", destination: "/careers" },
].map((r) => ({ ...r, statusCode: 301 as const }));
