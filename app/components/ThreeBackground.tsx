"use client";

export default function ThreeBackground() {
  // You can leave this empty or add a simple background div if you want
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "black", // or any color/image you want
      }}
    />
  );
}