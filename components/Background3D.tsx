"use client";

import dynamic from "next/dynamic";

// three.js is only fetched when this component is rendered (NEXT_PUBLIC_BG_MODE=3d).
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export function Background3D() {
  return <Scene3D />;
}
