"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Package, RotateCcw } from 'lucide-react'
import ComponentForm from './ComponentForm'
import UsageLog from './UsageLog'
import EnhancedComponentCard from './EnhancedComponentCard'

interface ComponentsSectionProps {
  isAdmin: boolean
}

export default function ComponentsSection({ isAdmin }: ComponentsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [userComponents, setUserComponents] = useState<{[key: number]: number}>({})
  const [components, setComponents] = useState([
    {
      id: 1,
      name: 'DJI Mini 3 Pro',
      description: 'Compact drone with 4K camera and obstacle avoidance sensors',
      quantity: 5,
      inUse: 2,
      image: '/placeholder.svg?height=200&width=200&text=Drone'
    },
    {
      id: 2,
      name: 'Propeller Set',
      description: 'Replacement propellers for DJI Mini series drones',
      quantity: 20,
      inUse: 4,
      image: '/placeholder.svg?height=200&width=200&text=Props'
    },
    {
      id: 3,
      name: 'LiPo Battery 3S',
      description: '2300mAh LiPo battery for extended flight time',
      quantity: 15,
      inUse: 6,
      image: '/placeholder.svg?height=200&width=200&text=Battery'
    },
    {
      id: 4,
      name: 'FPV Goggles',
      description: 'First-person view goggles for immersive flying experience',
      quantity: 8,
      inUse: 3,
      image: '/placeholder.svg?height=200&width=200&text=Goggles'
    }
  ])

  const [usageLogs, setUsageLogs] = useState([
    {
      id: 1,
      user: 'John Doe',
      component: 'DJI Mini 3 Pro',
      quantity: 1,
      timestamp: '2024-01-15 10:30 AM',
      action: 'taken'
    },
    {
      id: 2,
      user: 'Jane Smith',
      component: 'LiPo Battery 3S',
      quantity: 2,
      timestamp: '2024-01-15 09:45 AM',
      action: 'taken'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      component: 'FPV Goggles',
      quantity: 1,
      timestamp: '2024-01-15 11:15 AM',
      action: 'taken'
    },
    {
      id: 4,
      user: 'Sarah Wilson',
      component: 'Propeller Set',
      quantity: 4,
      timestamp: '2024-01-14 03:20 PM',
      action: 'returned'
    }
  ])

  const handleAddComponent = (newComponent: any) => {
    const component = {
      ...newComponent,
      id: components.length + 1,
      inUse: 0
    }
    setComponents([...components, component])
    setShowAddForm(false)
  }

  const handleUseComponent = (componentId: number, quantity: number) => {
    // Update user's components
    setUserComponents(prev => ({
      ...prev,
      [componentId]: (prev[componentId] || 0) + quantity
    }))

    // Update component's in-use count
    setComponents(prev => prev.map(comp => 
      comp.id === componentId 
        ? { ...comp, inUse: comp.inUse + quantity }
        : comp
    ))

    // Add to usage log
    const component = components.find(c => c.id === componentId)
    if (component) {
      const newLog = {
        id: usageLogs.length + 1,
        user: 'Current User', // In real app, this would be the actual user name
        component: component.name,
        quantity: quantity,
        timestamp: new Date().toLocaleString(),
        action: 'taken' as const
      }
      setUsageLogs(prev => [newLog, ...prev])
    }
  }

  const handleReturnComponent = (componentId: number) => {
    const userQuantity = userComponents[componentId] || 0
    
    // Remove from user's components
    setUserComponents(prev => {
      const updated = { ...prev }
      delete updated[componentId]
      return updated
    })
    
    // Update component's in-use count
    setComponents(prev => prev.map(comp => 
      comp.id === componentId 
        ? { ...comp, inUse: Math.max(0, comp.inUse - userQuantity) }
        : comp
    ))

    // Add to usage log
    const component = components.find(c => c.id === componentId)
    if (component) {
      const newLog = {
        id: usageLogs.length + 1,
        user: 'Current User', // In real app, this would be the actual user name
        component: component.name,
        quantity: userQuantity,
        timestamp: new Date().toLocaleString(),
        action: 'returned' as const
      }
      setUsageLogs(prev => [newLog, ...prev])
    }
  }

  const myComponentsCount = Object.keys(userComponents).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Components Management</h1>
          <p className="text-gray-600">
            {isAdmin ? 'Manage drone components and track usage' : 'View and use available components'}
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowAddForm(true)} className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Component
          </Button>
        )}
      </div>

      {showAddForm && isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Component</CardTitle>
            <CardDescription>Add a new component to the inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <ComponentForm 
              onSubmit={handleAddComponent}
              onCancel={() => setShowAddForm(false)}
            />
          </CardContent>
        </Card>
      )}

      {/* My Components Section - Only for Users */}
      {!isAdmin && myComponentsCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span>My Components ({myComponentsCount})</span>
            </CardTitle>
            <CardDescription>Components you currently have in use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {components
                .filter(component => userComponents[component.id] > 0)
                .map((component) => (
                  <div key={`my-${component.id}`} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={component.image || "/placeholder.svg"}
                        alt={component.name}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-blue-300"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{component.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Quantity: <span className="font-medium">{userComponents[component.id]}</span>
                        </p>
                        <Button 
                          onClick={() => handleReturnComponent(component.id)}
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-50"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Return
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Components */}
      <Card>
        <CardHeader>
          <CardTitle>Available Components</CardTitle>
          <CardDescription>
            {isAdmin ? 'Manage component inventory and availability' : 'Select components to mark as in use'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {components.map((component) => (
              <EnhancedComponentCard 
                key={component.id} 
                component={component} 
                isAdmin={isAdmin}
                userQuantity={userComponents[component.id] || 0}
                onUseComponent={handleUseComponent}
                onReturnComponent={handleReturnComponent}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Usage Logs</CardTitle>
            <CardDescription>Recent component usage activity</CardDescription>
          </CardHeader>
          <CardContent>
            <UsageLog logs={usageLogs} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
