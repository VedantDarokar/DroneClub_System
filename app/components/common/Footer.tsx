"use client"

export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Drone Club
      </div>
    </footer>
  )
}
