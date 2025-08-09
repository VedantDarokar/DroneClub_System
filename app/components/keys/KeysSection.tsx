"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Key, Clock, AlertCircle } from 'lucide-react'
import UserKeyCard from './UserKeyCard'
import { getKeyState, toggleKey } from '@/lib/api'

interface KeysSectionProps {
  isAdmin: boolean
  currentUser?: any
}

export default function KeysSection({ isAdmin, currentUser }: KeysSectionProps) {
  const [keyState, setKeyState] = useState({ isInUse: false, currentHolder: null as any, takenAt: null as string | null })
  const [userHasKey, setUserHasKey] = useState(false)

  useEffect(() => {
    let mounted = true
    getKeyState()
      .then((s) => {
        if (!mounted) return
        setKeyState({
          isInUse: s.is_in_use,
          currentHolder: s.current_holder_name ? { id: s.current_holder_id, name: s.current_holder_name } : null,
          takenAt: s.taken_at ? new Date(s.taken_at).toLocaleString() : null,
        })
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      setUserHasKey(keyState.currentHolder?.id === currentUser.id)
    }
  }, [keyState, currentUser])

  const handleToggleKey = async () => {
    if (!currentUser) return
    try {
      const s = await toggleKey()
      setKeyState({
        isInUse: s.is_in_use,
        currentHolder: s.current_holder_name ? { id: s.current_holder_id, name: s.current_holder_name } : null,
        takenAt: s.taken_at ? new Date(s.taken_at).toLocaleString() : null,
      })
    } catch {}
  }

  const canTakeKey = !keyState.isInUse || userHasKey
  const activeKeys = keyState.isInUse && keyState.currentHolder ? [keyState.currentHolder] : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lab Keys Management</h1>
        <p className="text-gray-600">
          {isAdmin ? 'Monitor and manage lab key usage' : 'View current key holders and manage your key status'}
        </p>
      </div>

      {!isAdmin && currentUser && (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>Your Key Status</span>
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
      )}

      <Card>
        <CardHeader>
          <CardTitle>Current Key Holders ({activeKeys.length})</CardTitle>
          <CardDescription>
            Users currently holding lab keys
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeKeys.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeKeys.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 bg-green-50 border-green-200">
                  <div className="flex items-start space-x-4">
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-300"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {user.name}
                        </h3>
                        <Badge className="bg-green-600">
                          <Key className="w-3 h-3 mr-1" />
                          Has Key
                        </Badge>
                      </div>
                      {keyState.takenAt && (
                        <div className="flex items-center text-xs text-gray-500 mt-2 bg-white p-2 rounded">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>Taken: {keyState.takenAt}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Key className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No keys are currently in use</p>
              <p className="text-sm">Lab key is available for use</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
