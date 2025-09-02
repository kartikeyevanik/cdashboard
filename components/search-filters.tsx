'use client'

import { useState, useEffect } from 'react'
import { useAuditLogStore } from '@/store/useAuditLogStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, FilterX } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/useDebounce'
import { MultiSelect, MultiSelectOption } from '@/components/ui/multi-select'

// Mock data for filters
const eventTypes = ['login', 'logout', 'create', 'update', 'delete']
const users = Array.from({ length: 10 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`
}))

// Convert users to MultiSelectOption format
const userOptions: MultiSelectOption[] = users.map(user => ({
  value: user.id,
  label: user.name
}))

export default function SearchFilters() {
  const { filters, setSearch, setEventTypes, setUsers, setDateRange, resetFilters } = useAuditLogStore()
  const [localSearch, setLocalSearch] = useState(filters.search)
  const [dateErrors, setDateErrors] = useState<{ start?: string; end?: string }>({})
  
  // Debounce search input
  const debouncedSearch = useDebounce(localSearch, 500)
  
  // Validate date range
  const validateDateRange = (start: Date | null, end: Date | null) => {
    const errors: { start?: string; end?: string } = {}
    
    if (start && end && start > end) {
      errors.start = 'Start date cannot be after end date'
      errors.end = 'End date cannot be before start date'
    }
    
    if (start && start > new Date()) {
      errors.start = 'Start date cannot be in the future'
    }
    
    if (end && end > new Date()) {
      errors.end = 'End date cannot be in the future'
    }
    
    setDateErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // Update global search when debounced value changes
  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch, setSearch])
  
  const handleEventTypeChange = (eventType: string, checked: boolean) => {
    const newEventTypes = checked
      ? [...filters.eventTypes, eventType]
      : filters.eventTypes.filter(et => et !== eventType)
    setEventTypes(newEventTypes)
  }
  
  const handleUserChange = (userIds: string[]) => {
    setUsers(userIds)
  }
  
  const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
    const newDate = date || null
    const newDateRange = {
      ...filters.dateRange,
      [type]: newDate
    }
    
    // Validate before setting
    if (validateDateRange(
      type === 'start' ? newDate : filters.dateRange.start,
      type === 'end' ? newDate : filters.dateRange.end
    )) {
      setDateRange(newDateRange)
    }
  }
  
  const handleResetFilters = () => {
    resetFilters()
    setLocalSearch('')
    setDateErrors({})
  }
  
  // Validate search input
  const isSearchValid = localSearch.length <= 100
  
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search input */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search in details..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className={!isSearchValid ? 'border-destructive' : ''}
          />
          {!isSearchValid && (
            <p className="text-sm text-destructive">
              Search term must be 100 characters or less
            </p>
          )}
        </div>
        
        {/* Event Type filter */}
        <div className="space-y-2">
          <Label>Event Type</Label>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map(eventType => (
              <div key={eventType} className="flex items-center space-x-2">
                <Checkbox
                  id={`event-type-${eventType}`}
                  checked={filters.eventTypes.includes(eventType)}
                  onCheckedChange={(checked) => 
                    handleEventTypeChange(eventType, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`event-type-${eventType}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {eventType}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* User filter */}
        <div className="space-y-2">
          <Label>User</Label>
          <MultiSelect
            options={userOptions}
            selected={filters.users}
            onChange={handleUserChange}
            placeholder="Select users"
          />
        </div>
        
        {/* Date Range filter */}
        <div className="space-y-2">
          <Label>Date Range</Label>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateRange.start && "text-muted-foreground",
                      dateErrors.start && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.start ? (
                      format(filters.dateRange.start, "PPP")
                    ) : (
                      <span>Start date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.start || undefined}
                    onSelect={(date) => handleDateChange('start', date)}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateRange.end && "text-muted-foreground",
                      dateErrors.end && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.end ? (
                      format(filters.dateRange.end, "PPP")
                    ) : (
                      <span>End date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.end || undefined}
                    onSelect={(date) => handleDateChange('end', date)}
                    initialFocus
                    disabled={(date) => 
                      date > new Date() || 
                      (filters.dateRange.start ? date < filters.dateRange.start : false)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Date validation errors */}
            {dateErrors.start && (
              <p className="text-sm text-destructive">{dateErrors.start}</p>
            )}
            {dateErrors.end && (
              <p className="text-sm text-destructive">{dateErrors.end}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Reset filters button */}
      <div>
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="gap-2"
        >
          <FilterX className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  )
}