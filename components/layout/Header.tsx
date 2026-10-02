import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="px-gut sticky top-0 z-[100] flex h-[84px] items-center justify-between gap-6 border-b-2 border-rule bg-[rgba(var(--bg-rgb),0.92)]">
      <Link href="/" aria-label={`${SITE.name} — home`} className="flex min-w-0 flex-none items-center py-[5px]">
        <Image
          data-logo="1"
          src={SITE.logo}
          alt={SITE.name}
          width={1737}
          height={427}
          priority
          sizes="171px"
          className="block h-[42px] w-auto"
        />
      </Link>

      <nav aria-label="Primary" className="hidden min-w-0 flex-1 items-center justify-end min-[1200px]:flex">
        <DesktopNav />
        <ThemeToggle />
        <Link href="/contact" className="btn btn-primary ml-2 whitespace-nowrap px-5 py-3 text-[11px]">
          REQUEST A QUOTE
        </Link>
      </nav>

      <div className="flex items-center gap-[10px] min-[1200px]:hidden">
        <ThemeToggle compact />
        <Link href="/contact" className="btn btn-primary whitespace-nowrap px-[14px] py-3 text-[10px]">
          QUOTE
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
