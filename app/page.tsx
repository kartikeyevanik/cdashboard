'use client'

import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuditLogTable from '@/components/audit-log-table'
import SearchFilters from '@/components/search-filters'
import Pagination from '@/components/pagination'
// import RealTimeNotification from '@/components/realtime-notification'
import { useAuditLogs } from '@/hooks/useAuditLogs'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const { logs, total, isLoading } = useAuditLogs()

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Audit Log Viewer</h1>
            <p className="text-muted-foreground">
              Monitor and search through system audit logs in real-time
            </p>
          </div>
          
          {/* <RealTimeNotification /> */}
          
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>
                View and filter system audit logs. {total} log entries found.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SearchFilters />
              
              <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <>
                    <AuditLogTable logs={logs} />
                    <Pagination total={total} />
                  </>
                )}
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}