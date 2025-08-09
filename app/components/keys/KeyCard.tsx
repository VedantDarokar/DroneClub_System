"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Key, Clock, User, Mail, Phone, GraduationCap } from 'lucide-react'

interface User {
  id: string
  name: string
  profileImage: string
  mobile: string
  email: string
  sisId: string
  department: string
  class: string
  rollNumber: string
  keyStatus: string
  keyAcquired: string
  keyReturned: string | null
}

interface KeyCardProps {
  user: User
  isAdmin: boolean
  showHistory?: boolean
}

export default function KeyCard({ user, isAdmin, showHistory = false }: KeyCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <img
            src={user.profileImage || "/placeholder.svg"}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </h3>
              <Badge 
                variant={user.keyStatus === 'In Use' ? 'default' : 'secondary'}
                className="ml-2"
              >
                <Key className="w-3 h-3 mr-1" />
                {user.keyStatus}
              </Badge>
            </div>
            
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                <span>{user.sisId} • {user.rollNumber}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="w-3 h-3 mr-1" />
                <span>{user.department} • {user.class}</span>
              </div>
              {isAdmin && (
                <>
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    <span>{user.mobile}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>Acquired: {user.keyAcquired}</span>
              </div>
              {user.keyReturned && (
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Returned: {user.keyReturned}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
