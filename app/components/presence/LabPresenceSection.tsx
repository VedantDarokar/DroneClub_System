"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserCheck, Clock } from 'lucide-react'

export default function LabPresenceSection() {
  const [isPresent, setIsPresent] = useState(false)
  const [presenceTime, setPresenceTime] = useState<string | null>(null)

  const handleTogglePresence = () => {
    const newPresenceState = !isPresent
    setIsPresent(newPresenceState)
    
    if (newPresenceState) {
      setPresenceTime(new Date().toLocaleString())
    } else {
      setPresenceTime(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lab Presence</h1>
        <p className="text-gray-600">Mark your presence in the lab</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5" />
            <span>Your Presence Status</span>
          </CardTitle>
          <CardDescription>
            Toggle to indicate if you're currently in the lab
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">I am present in the lab</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isPresent}
                onChange={handleTogglePresence}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Current Status:</span>
            <Badge variant={isPresent ? 'default' : 'secondary'} 
                   className={isPresent ? 'bg-green-600' : ''}>
              {isPresent ? 'Present' : 'Not Present'}
            </Badge>
          </div>

          {isPresent && presenceTime && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
              <Clock className="h-4 w-4" />
              <span>Present since: {presenceTime}</span>
            </div>
          )}

          {isPresent && (
            <div className="text-xs text-orange-600 bg-orange-50 p-3 rounded-lg">
              <p>Remember to toggle off when you leave the lab!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
