"use client"

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Package, RotateCcw, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import ComponentForm from './ComponentForm'
import UsageLog from './UsageLog'
import EnhancedComponentCard from './EnhancedComponentCard'
import { createComponent as apiCreateComponent, listComponents, useComponent as apiUseComponent, returnComponent as apiReturnComponent, listUsageLogs } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

interface ComponentsSectionProps {
  isAdmin: boolean
}

export default function ComponentsSection({ isAdmin }: ComponentsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [userComponents, setUserComponents] = useState<{[key: number]: number}>({})
  const [components, setComponents] = useState<any[]>([])
  const [usageLogs, setUsageLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [showMineOnly, setShowMineOnly] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    listComponents().then((items) => {
      if (!mounted) return
      // map API fields to UI
      setComponents(items.map((i: any) => ({
        id: i.id,
        name: i.name,
        description: i.description,
        quantity: i.quantity,
        inUse: i.in_use,
        image: i.image,
      })))
    }).catch(() => {
      toast({ title: 'Failed to load components' })
    }).finally(() => {
      if (mounted) setLoading(false)
    })
    if (isAdmin) {
      listUsageLogs().then(setUsageLogs).catch(() => {})
    }
    return () => { mounted = false }
  }, [isAdmin])

  const handleAddComponent = async (newComponent: any) => {
    try {
      const created = await apiCreateComponent({
        name: newComponent.name,
        description: newComponent.description,
        quantity: Number(newComponent.quantity),
        image: newComponent.image,
      })
      setComponents(prev => [...prev, { id: created.id, name: created.name, description: created.description, quantity: created.quantity, inUse: created.in_use, image: created.image }])
      setShowAddForm(false)
      toast({ title: 'Component added' })
    } catch {
      toast({ title: 'Failed to add component' })
    }
  }

  const handleUseComponent = async (componentId: number, quantity: number) => {
    try {
      await apiUseComponent(String(componentId), quantity)
      setUserComponents(prev => ({ ...prev, [componentId]: (prev[componentId] || 0) + quantity }))
      setComponents(prev => prev.map(comp => comp.id === componentId ? { ...comp, inUse: comp.inUse + quantity } : comp))
      toast({ title: 'Marked as in use' })
    } catch {
      toast({ title: 'Failed to mark as in use' })
    }
  }

  const handleReturnComponent = async (componentId: number) => {
    try {
      const userQuantity = userComponents[componentId] || 0
      await apiReturnComponent(String(componentId))
      setUserComponents(prev => { const u: any = { ...prev }; delete u[componentId]; return u })
      setComponents(prev => prev.map(comp => comp.id === componentId ? { ...comp, inUse: Math.max(0, comp.inUse - userQuantity) } : comp))
      toast({ title: 'Returned component' })
    } catch {
      toast({ title: 'Failed to return component' })
    }
  }

  const myComponentsCount = Object.keys(userComponents).length

  const filteredComponents = useMemo(() => {
    let list = [...components]
    if (showMineOnly) {
      list = list.filter(c => (userComponents as any)[c.id] > 0)
    }
    if (showAvailableOnly) {
      list = list.filter(c => (c.quantity - c.inUse) > 0)
    }
    if (searchText.trim()) {
      const q = searchText.toLowerCase()
      list = list.filter(c => c.name.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q))
    }
    return list.sort((a, b) => a.name.localeCompare(b.name))
  }, [components, showMineOnly, showAvailableOnly, searchText, userComponents])

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

      <Card>
        <CardHeader>
          <CardTitle>Available Components</CardTitle>
          <CardDescription>
            {isAdmin ? 'Manage component inventory and availability' : 'Select components to mark as in use'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
            <div className="flex items-center gap-2 max-w-sm w-full">
              <Search className="h-4 w-4 text-gray-500" />
              <Input placeholder="Search components..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="available" checked={showAvailableOnly} onCheckedChange={setShowAvailableOnly} />
                <label htmlFor="available" className="text-sm text-gray-600">Available only</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="mine" checked={showMineOnly} onCheckedChange={setShowMineOnly} />
                <label htmlFor="mine" className="text-sm text-gray-600">My components</label>
              </div>
            </div>
          </div>
          <Separator className="mb-4" />

          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="h-72 rounded-lg bg-gray-100 animate-pulse" />
              <div className="h-72 rounded-lg bg-gray-100 animate-pulse" />
              <div className="h-72 rounded-lg bg-gray-100 animate-pulse" />
            </div>
          )}

          {!loading && filteredComponents.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <Package className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p>No components found.</p>
            </div>
          )}

          {!loading && filteredComponents.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredComponents.map((component) => (
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
          )}
        </CardContent>
      </Card>

      {isAdmin && usageLogs.length > 0 && (
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
