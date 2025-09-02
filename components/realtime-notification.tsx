// 'use client'

// import { useState, useEffect } from 'react'
// import { useSooner } from '@/components/ui/use-sooner' // adjust path
// import { useAuditLogs } from '@/hooks/useAuditLogs'
// import { AuditLog } from '@/types'

// export default function RealTimeNotification() {
//   const [newLogs, setNewLogs] = useState<AuditLog[]>([])
//   const { notify } = useSooner() // replaced toast with notify
//   const { mutate } = useAuditLogs()
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (Math.random() > 0.7) {
//         const newLog: AuditLog = {
//           id: `log-${Date.now()}`,
//           eventType: ['login', 'logout', 'create', 'update', 'delete'][Math.floor(Math.random() * 5)],
//           userId: `user-${Math.floor(Math.random() * 10) + 1}`,
//           userName: `User ${Math.floor(Math.random() * 10) + 1}`,
//           timestamp: new Date().toISOString(),
//           details: `New action performed at ${new Date().toLocaleTimeString()}`,
//           ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
//           userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
//         }
        
//         setNewLogs(prev => [...prev, newLog])
        
//         notify({
//           title: "New Audit Log",
//           description: `A new ${newLog.eventType} event was recorded`,
//           action: (
//             <button 
//               onClick={() => {
//                 mutate()
//                 setNewLogs([])
//               }}
//               className="text-primary font-medium"
//             >
//               Refresh
//             </button>
//           ),
//         })
//       }
//     }, 10000)
    
//     return () => clearInterval(interval)
//   }, [notify, mutate])
  
//   return null
// }
