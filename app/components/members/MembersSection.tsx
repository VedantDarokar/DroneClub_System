"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, UserCheck, UserX } from 'lucide-react'
import { listPresentMembers } from '@/lib/api'

export default function MembersSection() {
  const [members, setMembers] = useState<any[]>([])

  useEffect(() => {
    listPresentMembers().then(setMembers).catch(() => setMembers([]))
  }, [])

  const presentMembers = members
  const totalMembers = members.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Members Present in Lab</h1>
        <p className="text-gray-600">Monitor current lab occupancy and member activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Present Members</p>
              <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <UserCheck className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-900">{presentMembers.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <UserX className="h-8 w-8 text-gray-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Lab Occupancy</CardTitle>
          <CardDescription>Members currently present in the lab</CardDescription>
        </CardHeader>
        <CardContent>
          {presentMembers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {presentMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-green-50 border-green-200">
                  <img
                    src={member.profileImage || "/placeholder.svg"}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{member.name || member.username}</h3>
                    <p className="text-sm text-gray-600">{member.department || 'Member'}</p>
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    Present
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No members are currently present in the lab</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
