"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plane } from 'lucide-react'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'
import Footer from '../components/common/Footer'

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ id: '', password: '' })
  const [userType, setUserType] = useState<'admin' | 'user' | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mock authentication
    if (credentials.id === 'admin' && credentials.password === 'admin123') {
      setUserType('admin')
      setCurrentUser({
        id: 'admin',
        name: 'Admin User',
        email: 'admin@droneclub.edu',
        mobile: '+1-555-0100',
        sisId: 'ADMIN001',
        department: 'Administration',
        class: 'Staff',
        rollNumber: 'ADM001',
        profileImage: '/placeholder.svg?height=100&width=100&text=AD'
      })
    } else if (credentials.id && credentials.password) {
      setUserType('user')
      setCurrentUser({
        id: credentials.id,
        name: 'John Doe',
        email: 'john.doe@student.edu',
        mobile: '+1-555-0123',
        sisId: credentials.id,
        department: 'Computer Science',
        class: 'Senior',
        rollNumber: 'CS2024001',
        profileImage: '/placeholder.svg?height=100&width=100&text=JD'
      })
    }
  }

  const handleLogout = () => {
    setUserType(null)
    setCurrentUser(null)
    setCredentials({ id: '', password: '' })
  }

  if (userType === 'admin') {
    return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />
  }

  if (userType === 'user') {
    return <UserDashboard currentUser={currentUser} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Plane className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Drone Club Portal</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id">User ID</Label>
                <Input
                  id="id"
                  type="text"
                  placeholder="Enter your ID"
                  value={credentials.id}
                  onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Demo credentials:</p>
              <p>Admin: admin / admin123</p>
              <p>User: any ID / any password</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
