"use client"

import Navbar from '../components/common/Navbar'

interface UserLayoutProps {
  children: React.ReactNode
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function UserLayout({ children, activeTab, setActiveTab }: UserLayoutProps) {
  const navItems = [
    { id: 'keys', label: 'Keys', href: '#' },
    { id: 'components', label: 'Components', href: '#' },
    { id: 'profile', label: 'Profile', href: '#' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        title="Drone Club"
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
