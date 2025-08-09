"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Key, Clock, AlertCircle } from 'lucide-react'

interface KeyToggleSectionProps {
  currentUser: any
}

// Mock global key state - in a real app, this would be managed by a state management solution
let globalKeyState = {
  isInUse: false,
  currentHolder: null as any,
  takenAt: null as string | null
}

export default function KeyToggleSection({ currentUser }: KeyToggleSectionProps) {
  const [keyState, setKeyState] = useState(globalKeyState)
  const [userHasKey, setUserHasKey] = useState(false)

  useEffect(() => {
    // Check if current user has the key
    setUserHasKey(keyState.currentHolder?.id === currentUser.id)
  }, [keyState, currentUser.id])

  const handleToggleKey = () => {
    if (userHasKey) {
      // User is returning the key
      globalKeyState = {
        isInUse: false,
        currentHolder: null,
        takenAt: null
      }
      setKeyState({ ...globalKeyState })
    } else if (!keyState.isInUse) {
      // User is taking the key (only if no one else has it)
      const now = new Date().toLocaleString()
      globalKeyState = {
        isInUse: true,
        currentHolder: currentUser,
        takenAt: now
      }
      setKeyState({ ...globalKeyState })
    }
  }

  const canTakeKey = !keyState.isInUse || userHasKey

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lab Key Toggle</h1>
        <p className="text-gray-600">Manage your lab key status</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Key Status</span>
          </CardTitle>
          <CardDescription>
            Toggle to indicate if you currently have the lab key
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">I have the lab key</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={userHasKey}
                onChange={handleToggleKey}
                disabled={!canTakeKey}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!canTakeKey ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Your Status:</span>
            <Badge variant={userHasKey ? 'default' : 'secondary'} 
                   className={userHasKey ? 'bg-green-600' : ''}>
              {userHasKey ? 'Has Key' : 'No Key'}
            </Badge>
          </div>

          {userHasKey && keyState.takenAt && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
              <Clock className="h-4 w-4" />
              <span>Key taken: {keyState.takenAt}</span>
            </div>
          )}

          {keyState.isInUse && !userHasKey && (
            <div className="flex items-center space-x-2 text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <div>
                <p className="font-medium">Key currently in use</p>
                <p>Currently held by {keyState.currentHolder?.name}</p>
                {keyState.takenAt && <p className="text-xs">Since: {keyState.takenAt}</p>}
              </div>
            </div>
          )}

          {userHasKey && (
            <div className="text-xs text-orange-600 bg-orange-50 p-3 rounded-lg">
              <p>Remember to return the key when you leave the lab!</p>
            </div>
          )}

          {!keyState.isInUse && !userHasKey && (
            <div className="text-xs text-green-600 bg-green-50 p-3 rounded-lg">
              <p>Lab key is available. Toggle on to take the key.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
