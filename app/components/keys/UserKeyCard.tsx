"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Key, Clock, User, Mail, Phone, GraduationCap, Hash, BookOpen } from 'lucide-react'

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
  keyTaken: string
  keyReturned: string | null
}

interface UserKeyCardProps {
  user: User
  isAdmin: boolean
  showHistory?: boolean
}

export default function UserKeyCard({ user, isAdmin, showHistory = false }: UserKeyCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <img
            src={user.profileImage || "/placeholder.svg"}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
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
                <User className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{user.sisId}</span>
              </div>
              <div className="flex items-center">
                <Hash className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{user.rollNumber}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{user.department}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{user.class}</span>
              </div>
              
              {isAdmin && (
                <>
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{user.mobile}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                <span>Taken: {user.keyTaken}</span>
              </div>
              {user.keyReturned && (
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
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
