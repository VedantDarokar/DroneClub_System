"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Mail, Phone, User, GraduationCap, Hash, BookOpen } from 'lucide-react'

interface ProfileCardProps {
  userData: any
  onEdit: () => void
}

export default function ProfileCard({ userData, onEdit }: ProfileCardProps) {
  return (
    <Card className="max-w-4xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          <Button onClick={onEdit} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0 text-center">
            <img
              src={userData.profileImage || "/placeholder.svg"}
              alt={userData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 mx-auto"
            />
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">{userData.class}</Badge>
              <Badge variant="outline">{userData.department}</Badge>
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{userData.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium">{userData.mobile}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">SIS ID</p>
                    <p className="font-medium">{userData.sisId}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{userData.department}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">{userData.class}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Hash className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Roll Number</p>
                    <p className="font-medium">{userData.rollNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
