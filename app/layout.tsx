import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SITE, flags } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { MotionLoader } from "@/components/motion/MotionLoader";
import { SiteBackground } from "@/components/SiteBackground";
import { Background3D } from "@/components/Background3D";
import { CtaBand } from "@/components/ui/CtaBand";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Parasmani Engineering | Heavy Steel Fabrication, Viramgam, Gujarat",
    template: "%s | Parasmani Engineering",
  },
  description:
    "Parasmani Engineering Pvt. Ltd. delivers engineering, CNC production, welding, surface treatment and inspection under one roof from Viramgam, Gujarat.",
  applicationName: SITE.name,
  robots: flags.allowIndexing ? undefined : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1622",
};

// 1) mark JS as available (gates hidden-before-reveal styles)
// 2) legacy "#about" style hash links -> real routes
// 3) failsafe: if the animation runtime never starts, un-gate content
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');
var m=location.hash.replace(/^#\\/?(static\\/)?/,'').split('/')[0];
var map={home:'/',about:'/about',capabilities:'/capabilities',industries:'/industries',projects:'/projects',facility:'/facility',quality:'/quality',technology:'/technology',careers:'/careers',rdso:'/rdso-approval',contact:'/contact'};
if(location.pathname==='/'&&map[m]&&m!=='home'){location.replace(map[m]);return}
setTimeout(function(){if(!d.dataset.motionReady)d.classList.remove('js')},5000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} storageKey="pepl-theme">
          <a href="#main" className="sr-only-focusable z-[300] bg-brand px-4 py-2 text-white focus:fixed focus:left-2 focus:top-2">
            Skip to content
          </a>

          {flags.bg3d ? (
            <Background3D />
          ) : (
            <SiteBackground />
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(115% 85% at 50% 40%, rgba(var(--bg-rgb),0) 30%, rgba(var(--bg-rgb),0.88) 100%)",
            }}
          />

          <div className="relative z-[2]">
            <Header />
            <ScrollProgress />
            <main id="main">{children}</main>
            <CtaBand />
            <Footer />
          </div>
          <MotionLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
