"use client"

import { useState } from 'react'
import Navbar from '../components/Navbar'
import KeysSection from '../components/keys/KeysSection'
import ComponentsSection from '../components/components/ComponentsSection'
import ProfilePage from '../components/profile/ProfilePage'
import LabPresenceSection from '../components/presence/LabPresenceSection'
import MembersSection from '../components/members/MembersSection'
import Footer from '../components/common/Footer'

interface UserDashboardProps {
  currentUser: any
  onLogout: () => void
}

export default function UserDashboard({ currentUser, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('presence')

  const navItems = [
    { id: 'presence', label: 'Lab Presence' },
    { id: 'keys', label: 'Keys' },
    { id: 'members', label: 'Members Present' },
    { id: 'components', label: 'Components' },
    { id: 'profile', label: 'Profile' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'presence':
        return <LabPresenceSection />
      case 'keys':
        return <KeysSection isAdmin={false} currentUser={currentUser} />
      case 'members':
        return <MembersSection />
      case 'components':
        return <ComponentsSection isAdmin={false} />
      case 'profile':
        return <ProfilePage currentUser={currentUser} />
      default:
        return <LabPresenceSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        title="Drone Club"
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-1">
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}
