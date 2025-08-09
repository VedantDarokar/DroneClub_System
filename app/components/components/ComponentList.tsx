"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ComponentCard from './ComponentCard'

interface Component {
  id: number
  name: string
  description: string
  quantity: number
  inUse: number
  image: string
}

interface ComponentListProps {
  components: Component[]
  isAdmin: boolean
}

export default function ComponentList({ components, isAdmin }: ComponentListProps) {
  return (
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
            <ComponentCard 
              key={component.id} 
              component={component} 
              isAdmin={isAdmin} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
