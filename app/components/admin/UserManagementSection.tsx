"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, User, Trash2 } from 'lucide-react'
import { listUsers, createUser, deleteUser } from '@/lib/api'

interface UserRow {
  id: string
  username: string
  name?: string
  email?: string
  department?: string
  class?: string
  createdAt: string
}

export default function UserManagementSection() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    department: '',
    class: ''
  })

  useEffect(() => {
    let mounted = true
    listUsers()
      .then((list) => {
        if (!mounted) return
        setUsers(list.map((u: any) => ({
          id: u.id,
          username: u.username,
          name: u.name,
          email: u.email,
          department: u.department,
          class: u.class,
          createdAt: new Date(u.created_at).toLocaleString(),
        })))
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const created = await createUser({
      username: formData.username,
      password: formData.password,
      name: formData.name || undefined,
      email: formData.email || undefined,
      department: formData.department || undefined,
      class: formData.class || undefined,
    })
    setUsers(prev => [{
      id: created.id,
      username: created.username,
      name: created.name,
      email: created.email,
      department: created.department,
      class: created.class,
      createdAt: new Date(created.created_at).toLocaleString(),
    }, ...prev])
    setFormData({ username: '', password: '', name: '', email: '', department: '', class: '' })
    setShowAddForm(false)
  }

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId)
    setUsers(prev => prev.filter(u => u.id !== userId))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Create and manage user accounts for the drone club</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Create a new user account with login credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Enter department"
                  />
                </div>
                <div>
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    placeholder="Enter class"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create User
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Existing Users ({users.length})</CardTitle>
          <CardDescription>Manage existing user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {user.name || user.username}
                          </h3>
                          <Badge variant="outline">@{user.username}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          {user.email && (
                            <div>
                              <span className="font-medium">Email:</span> {user.email}
                            </div>
                          )}
                          {user.department && (
                            <div>
                              <span className="font-medium">Department:</span> {user.department}
                            </div>
                          )}
                          {user.class && (
                            <div>
                              <span className="font-medium">Class:</span> {user.class}
                            </div>
                          )}
                          <div className="md:col-span-2">
                            <span className="font-medium">Created:</span> {user.createdAt}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No users created yet</p>
                  <p className="text-sm">Click "Add New User" to create the first user account</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
