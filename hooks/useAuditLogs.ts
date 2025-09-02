import useSWR from 'swr'
import { useAuditLogStore } from '@/store/useAuditLogStore'
import { AuditLog, ApiResponse } from '@/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useAuditLogs = () => {
  const { filters } = useAuditLogStore()
  
  const params = new URLSearchParams()
  params.append('page', filters.page.toString())
  params.append('pageSize', filters.pageSize.toString())
  params.append('sortField', filters.sortField)
  params.append('sortOrder', filters.sortOrder)
  
  if (filters.search) params.append('search', filters.search)
  if (filters.eventTypes.length > 0) params.append('eventTypes', filters.eventTypes.join(','))
  if (filters.users.length > 0) params.append('users', filters.users.join(','))
  if (filters.dateRange.start) params.append('startDate', filters.dateRange.start.toISOString())
  if (filters.dateRange.end) params.append('endDate', filters.dateRange.end.toISOString())
  
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<AuditLog[]>>(
    `/api/logs?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  )
  
  return {
    logs: data?.data || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate
  }
}