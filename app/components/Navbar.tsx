"use client"

import { Plane, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavItem {
  id: string
  label: string
}

interface NavbarProps {
  title: string
  navItems: NavItem[]
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout: () => void
}

export default function Navbar({ title, navItems, activeTab, setActiveTab, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{title}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <Button 
              onClick={onLogout}
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
