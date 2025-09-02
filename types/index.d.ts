export interface AuditLog {
  id: string
  eventType: string
  userId: string
  userName: string
  timestamp: string
  details: string
  ipAddress?: string
  userAgent?: string
}

export interface ApiResponse<T> {
  data: T
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface Filters {
  search: string
  eventTypes: string[]
  users: string[]
  dateRange: { start: Date | null; end: Date | null }
  page: number
  pageSize: number
  sortField: string
  sortOrder: 'asc' | 'desc'
}