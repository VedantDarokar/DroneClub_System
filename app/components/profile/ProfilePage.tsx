"use client"

import { useState } from 'react'
import ProfileCard from './ProfileCard'
import EditProfileForm from './EditProfileForm'
import { updateMe, getMe } from '@/lib/api'

interface ProfilePageProps {
  currentUser: any
}

export default function ProfilePage({ currentUser }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(currentUser)
  const [saving, setSaving] = useState(false)

  const handleSave = async (updatedData: any) => {
    setSaving(true)
    try {
      await updateMe({
        name: updatedData.name,
        email: updatedData.email,
        department: updatedData.department,
        class: updatedData.class,
      })
      const fresh = await getMe()
      setUserData({
        ...userData,
        name: fresh.name || fresh.username,
        email: fresh.email,
        department: fresh.department,
        class: fresh.class,
      })
      setIsEditing(false)
    } finally {
      setSaving(false)
    }
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
        <div className="space-y-2">
          {saving && <p className="text-sm text-gray-500">Saving...</p>}
          <ProfileCard
            userData={userData}
            onEdit={() => setIsEditing(true)}
          />
        </div>
      )}
    </div>
  )
}
