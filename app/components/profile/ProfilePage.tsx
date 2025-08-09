"use client"

import { useState } from 'react'
import ProfileCard from './ProfileCard'
import EditProfileForm from './EditProfileForm'

interface ProfilePageProps {
  currentUser: any
}

export default function ProfilePage({ currentUser }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(currentUser)

  const handleSave = (updatedData: any) => {
    setUserData(updatedData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your personal information and account details</p>
      </div>

      {isEditing ? (
        <EditProfileForm
          userData={userData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ProfileCard
          userData={userData}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  )
}
