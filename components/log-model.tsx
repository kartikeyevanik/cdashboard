'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AuditLog } from '@/types'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { getEventTypeVariant } from './common/eventVarient'

interface LogDetailModalProps {
  log: AuditLog | null
  onClose: () => void
}

export default function LogDetailModal({ log, onClose }: LogDetailModalProps) {
  if (!log) return null


  return (
    <Dialog open={!!log} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Log Details</DialogTitle>
          <DialogDescription>
            Detailed information about the audit log entry
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">ID</span>
            <span className="col-span-3 text-sm">{log.id}</span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Timestamp</span>
            <span className="col-span-3 text-sm">
              {format(new Date(log.timestamp), 'PPpp')}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Event Type</span>
            <div className="col-span-3">
              <Badge variant={getEventTypeVariant(log.eventType)}>
                {log.eventType}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">User</span>
            <span className="col-span-3 text-sm">{log.userName} ({log.userId})</span>
          </div>

          {log.ipAddress && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium">IP Address</span>
              <span className="col-span-3 text-sm">{log.ipAddress}</span>
            </div>
          )}

          {log.userAgent && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium">User Agent</span>
              <span className="col-span-3 text-sm">{log.userAgent}</span>
            </div>
          )}

          <div className="grid grid-cols-4 items-start gap-4">
            <span className="text-sm font-medium">Details</span>
            <p className="col-span-3 text-sm whitespace-pre-wrap">{log.details}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}