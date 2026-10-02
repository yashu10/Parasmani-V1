import Image from "next/image";
import { CLIENTS } from "@/lib/content";

export function ClientsGrid({ large }: { large?: boolean }) {
  return (
    <>
      <ul
        className="m-0 grid list-none gap-[2px] border-2 border-rule bg-rule p-0"
        style={{
          gridTemplateColumns: large
            ? "repeat(auto-fit,minmax(min(100%,200px),1fr))"
            : "repeat(auto-fit,minmax(130px,1fr))",
        }}
      >
        {CLIENTS.map((c) => (
          <li
            key={c.file}
            className={`flex min-w-0 items-center justify-center bg-white ${large ? "h-[120px] px-7 py-5" : "h-[84px] px-[18px] py-[14px]"}`}
          >
            <Image
              src={c.src}
              alt={c.name}
              width={c.w}
              height={c.h}
              sizes={large ? "200px" : "130px"}
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
      <p className="mt-[18px] mb-0 text-[12px] leading-[1.55] text-mute">Logos are trademarks of their respective owners.</p>
    </>
  );
}
