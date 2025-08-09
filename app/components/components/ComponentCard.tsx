"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Package, Minus, Plus } from 'lucide-react'

interface Component {
  id: number
  name: string
  description: string
  quantity: number
  inUse: number
  image: string
}

interface ComponentCardProps {
  component: Component
  isAdmin: boolean
}

export default function ComponentCard({ component, isAdmin }: ComponentCardProps) {
  const [useQuantity, setUseQuantity] = useState(1)
  const [showUseForm, setShowUseForm] = useState(false)
  const [userHasComponent, setUserHasComponent] = useState(false)

  const available = component.quantity - component.inUse
  const usagePercentage = (component.inUse / component.quantity) * 100

  const handleUseComponent = () => {
    // Handle component usage logic here
    console.log(`Using ${useQuantity} of ${component.name}`)
    setUserHasComponent(true)
    setShowUseForm(false)
    setUseQuantity(1)
  }

  const handleReturnComponent = () => {
    // Handle component return logic here
    console.log(`Returning ${component.name}`)
    setUserHasComponent(false)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={component.image || "/placeholder.svg"}
            alt={component.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{component.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{component.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {available} / {component.quantity}
              </span>
            </div>
            <Badge variant={available > 0 ? 'default' : 'destructive'}>
              {available > 0 ? 'Available' : 'Out of Stock'}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Available</span>
              <span>In Use</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${100 - usagePercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{available}</span>
              <span>{component.inUse}</span>
            </div>
          </div>

          {!isAdmin && (
            <div className="space-y-2">
              {!userHasComponent ? (
                available > 0 && (
                  !showUseForm ? (
                    <Button 
                      onClick={() => setShowUseForm(true)}
                      className="w-full"
                      size="sm"
                    >
                      Mark as In Use
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUseQuantity(Math.max(1, useQuantity - 1))}
                          disabled={useQuantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          type="number"
                          value={useQuantity}
                          onChange={(e) => setUseQuantity(Math.max(1, Math.min(available, parseInt(e.target.value) || 1)))}
                          className="text-center"
                          min="1"
                          max={available}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUseQuantity(Math.min(available, useQuantity + 1))}
                          disabled={useQuantity >= available}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleUseComponent} size="sm" className="flex-1">
                          Use {useQuantity}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowUseForm(false)}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )
                )
              ) : (
                <Button 
                  onClick={handleReturnComponent}
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  size="sm"
                >
                  Return Component
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
