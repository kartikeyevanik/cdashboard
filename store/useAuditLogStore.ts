import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Filters } from '@/types'

interface AuditLogState {
  filters: Filters
  setSearch: (search: string) => void
  setEventTypes: (eventTypes: string[]) => void
  setUsers: (users: string[]) => void
  setDateRange: (dateRange: { start: Date | null; end: Date | null }) => void
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  setSort: (sortField: string, sortOrder: 'asc' | 'desc') => void
  resetFilters: () => void
}

const initialFilters: Filters = {
  search: '',
  eventTypes: [],
  users: [],
  dateRange: { start: null, end: null },
  page: 1,
  pageSize: 10,
  sortField: 'timestamp',
  sortOrder: 'desc',
}

export const useAuditLogStore = create<AuditLogState>()(
  devtools((set) => ({
    filters: initialFilters,
    setSearch: (search) => 
      set((state) => ({ 
        filters: { ...state.filters, search, page: 1 } 
      })),
    setEventTypes: (eventTypes) => 
      set((state) => ({ 
        filters: { ...state.filters, eventTypes, page: 1 } 
      })),
    setUsers: (users) => 
      set((state) => ({ 
        filters: { ...state.filters, users, page: 1 } 
      })),
    setDateRange: (dateRange) => 
      set((state) => ({ 
        filters: { ...state.filters, dateRange, page: 1 } 
      })),
    setPage: (page) => 
      set((state) => ({ 
        filters: { ...state.filters, page } 
      })),
    setPageSize: (pageSize) => 
      set((state) => ({ 
        filters: { ...state.filters, pageSize, page: 1 } 
      })),
    setSort: (sortField, sortOrder) => 
      set((state) => ({ 
        filters: { ...state.filters, sortField, sortOrder, page: 1 } 
      })),
    resetFilters: () => 
      set({ filters: initialFilters }),
  }))
)