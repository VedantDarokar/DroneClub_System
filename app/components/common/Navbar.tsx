"use client"

import { Plane } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  href: string
}

interface NavbarProps {
  title: string
  navItems: NavItem[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navbar({ title, navItems, activeTab, setActiveTab }: NavbarProps) {
  return (
    <nav className="bg-white/80 backdrop-blur border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg border border-black">
                <Plane className="h-6 w-6 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight">{title}</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2 py-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === item.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
