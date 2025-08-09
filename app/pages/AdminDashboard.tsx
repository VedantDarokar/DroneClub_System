"use client"

import { useState } from 'react'
import Navbar from '../components/Navbar'
import KeysSection from '../components/keys/KeysSection'
import ComponentsSection from '../components/components/ComponentsSection'
import ProfilePage from '../components/profile/ProfilePage'
import MembersSection from '../components/members/MembersSection'
import UserManagementSection from '../components/admin/UserManagementSection'
import Footer from '../components/common/Footer'

interface AdminDashboardProps {
  currentUser: any
  onLogout: () => void
}

export default function AdminDashboard({ currentUser, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('keys')

  const navItems = [
    { id: 'keys', label: 'Keys' },
    { id: 'members', label: 'Members' },
    { id: 'components', label: 'Components' },
    { id: 'users', label: 'Manage Users' },
    { id: 'profile', label: 'Profile' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'keys':
        return <KeysSection isAdmin={true} currentUser={currentUser} />
      case 'members':
        return <MembersSection />
      case 'components':
        return <ComponentsSection isAdmin={true} />
      case 'users':
        return <UserManagementSection />
      case 'profile':
        return <ProfilePage currentUser={currentUser} />
      default:
        return <KeysSection isAdmin={true} currentUser={currentUser} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        title="Drone Club Admin"
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
