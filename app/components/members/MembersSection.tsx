"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, UserCheck, UserX } from 'lucide-react'

export default function MembersSection() {
  const [members] = useState([
    {
      id: 'user001',
      name: 'John Doe',
      profileImage: '/placeholder.svg?height=60&width=60&text=JD',
      department: 'Computer Science',
      class: 'Senior',
      isPresent: true,
      lastSeen: '2024-01-15 10:30 AM'
    },
    {
      id: 'user002',
      name: 'Jane Smith',
      profileImage: '/placeholder.svg?height=60&width=60&text=JS',
      department: 'Electrical Engineering',
      class: 'Junior',
      isPresent: false,
      lastSeen: '2024-01-14 05:30 PM'
    },
    {
      id: 'user003',
      name: 'Mike Johnson',
      profileImage: '/placeholder.svg?height=60&width=60&text=MJ',
      department: 'Mechanical Engineering',
      class: 'Sophomore',
      isPresent: true,
      lastSeen: '2024-01-15 11:45 AM'
    },
    {
      id: 'user004',
      name: 'Sarah Wilson',
      profileImage: '/placeholder.svg?height=60&width=60&text=SW',
      department: 'Aerospace Engineering',
      class: 'Senior',
      isPresent: true,
      lastSeen: '2024-01-15 09:15 AM'
    }
  ])

  const presentMembers = members.filter(member => member.isPresent)
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
              <p className="text-sm font-medium text-gray-600">Total Members</p>
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
              <p className="text-2xl font-bold text-gray-900">{totalMembers - presentMembers.length}</p>
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
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.department}</p>
                    <p className="text-xs text-gray-500">Since: {member.lastSeen}</p>
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

      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
          <CardDescription>Complete member list with presence status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <div key={member.id} className={`flex items-center space-x-4 p-4 border rounded-lg ${
                member.isPresent ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <img
                  src={member.profileImage || "/placeholder.svg"}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.department} • {member.class}</p>
                  <p className="text-xs text-gray-500">
                    {member.isPresent ? `Present since: ${member.lastSeen}` : `Last seen: ${member.lastSeen}`}
                  </p>
                </div>
                <Badge variant={member.isPresent ? 'default' : 'secondary'} 
                       className={member.isPresent ? 'bg-green-600' : ''}>
                  {member.isPresent ? 'Present' : 'Absent'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
