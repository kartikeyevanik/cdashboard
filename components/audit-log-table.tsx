'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuditLogStore } from '@/store/useAuditLogStore'
import { AuditLog } from '@/types'
import LogDetailModal from './log-model'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { getEventTypeVariant } from './common/eventVarient'

interface AuditLogTableProps {
  logs: AuditLog[]
}

export default function AuditLogTable({ logs }: AuditLogTableProps) {
  const { filters, setSort } = useAuditLogStore()
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)

  const handleSort = (field: string) => {
    const newOrder = filters.sortField === field && filters.sortOrder === 'asc' ? 'desc' : 'asc'
    setSort(field, newOrder)
  }


  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center gap-1 p-0 font-semibold"
                >
                  Timestamp
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('eventType')}
                  className="flex items-center gap-1 p-0 font-semibold"
                >
                  Event Type
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('userName')}
                  className="flex items-center gap-1 p-0 font-semibold"
                >
                  User
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow
                key={log.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedLog(log)}
              >
                <TableCell className="font-medium">
                  {format(new Date(log.timestamp), 'PPpp')}
                </TableCell>
                <TableCell>
                  <Badge variant={getEventTypeVariant(log.eventType)}>
                    {log.eventType}
                  </Badge>
                </TableCell>
                <TableCell>{log.userName}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {log.details}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {logs.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No logs found matching your filters
          </div>
        )}
      </div>

      {selectedLog && (
        <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </>
  )
}