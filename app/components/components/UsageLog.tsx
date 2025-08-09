"use client"

import { Badge } from '@/components/ui/badge'
import { Clock, User, Package } from 'lucide-react'

interface UsageLogEntry {
  id: number
  user: string
  component: string
  quantity: number
  timestamp: string
  action: 'taken' | 'returned'
}

interface UsageLogProps {
  logs: UsageLogEntry[]
}

export default function UsageLog({ logs }: UsageLogProps) {
  return (
    <div className="space-y-4">
      {logs.length > 0 ? (
        logs.map((log) => (
          <div key={log.id} className={`border-l-4 pl-4 py-3 rounded-r-lg ${
            log.action === 'taken' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-green-500 bg-green-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900">{log.user}</span>
              </div>
              <Badge variant={log.action === 'taken' ? 'default' : 'secondary'} 
                     className={log.action === 'taken' ? 'bg-blue-600' : 'bg-green-600'}>
                {log.action === 'taken' ? 'Taken' : 'Returned'}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Package className="w-3 h-3" />
                <span>{log.quantity}x {log.component}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{log.timestamp}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No usage logs available</p>
        </div>
      )}
    </div>
  )
}
