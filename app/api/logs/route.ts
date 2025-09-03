import { NextRequest, NextResponse } from 'next/server'
import { AuditLog } from '@/types'

// Mock data - replace with actual API call
const mockLogs: AuditLog[] = Array.from({ length: 100 }, (_, i) => ({
    id: `log-${i + 1}`,
    eventType: ['login', 'logout', 'create', 'update', 'delete'][Math.floor(Math.random() * 5)],
    userId: `user-${Math.floor(Math.random() * 10) + 1}`,
    userName: `User ${Math.floor(Math.random() * 10) + 1}`,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    details: `Action performed with details ${i + 1}`,
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}))

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const search = searchParams.get('search') || ''
    const eventTypes = searchParams.get('eventTypes')?.split(',') || []
    const users = searchParams.get('users')?.split(',') || []
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const sortField = searchParams.get('sortField') || 'timestamp'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Filter logs based on parameters
    const filteredLogs = mockLogs.filter(log => {
        // Search filter
        if (search && !log.details.toLowerCase().includes(search.toLowerCase()) &&
            !log.userName.toLowerCase().includes(search.toLowerCase())) {
            return false
        }

        // Event type filter
        if (eventTypes.length > 0 && !eventTypes.includes(log.eventType)) {
            return false
        }

        // User filter
        if (users.length > 0 && !users.includes(log.userId)) {
            return false
        }

        // Date range filter
        const logDate = new Date(log.timestamp)
        if (startDate && logDate < new Date(startDate)) {
            return false
        }

        if (endDate && logDate > new Date(endDate)) {
            return false
        }

        return true
    })

    filteredLogs.sort((a, b) => {
        const aValue = a[sortField as keyof AuditLog]
        const bValue = b[sortField as keyof AuditLog]

        // Compare strings
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            // If the field is timestamp, convert to Date
            if (sortField === 'timestamp') {
                const aDate = new Date(aValue)
                const bDate = new Date(bValue)
                return sortOrder === 'asc'
                    ? aDate.getTime() - bDate.getTime()
                    : bDate.getTime() - aDate.getTime()
            }
            return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue)
        }

        return 0
    })

    // Paginate results
    const startIndex = (page - 1) * pageSize
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + pageSize)

    return NextResponse.json({
        data: paginatedLogs,
        total: filteredLogs.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredLogs.length / pageSize)
    })
}