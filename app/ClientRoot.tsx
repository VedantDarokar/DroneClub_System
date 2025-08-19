"use client";

import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("./components/ThreeBackground"), { ssr: false });

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThreeBackground />
      <div className="min-h-svh relative z-10">
        {children}
      </div>
    </>
  );
}
