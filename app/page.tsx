"use client";

import dynamic from "next/dynamic";
import LoginPage from "./pages/LoginPage";

const ThreeBackground = dynamic(() => import("./components/ThreeBackground"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <LoginPage />
    </>
  );
}
