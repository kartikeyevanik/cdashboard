"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, LogOut, Home, FileText, Settings } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "./themeToggle"

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)

    const sidebarItems = [
        { name: "Home", icon: <Home size={20} />, href: "/dashboard" },
        { name: "Audit Logs", icon: <FileText size={20} />, href: "/dashboard/audit-logs" },
        { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings" },
    ]

    return (
        <motion.aside
            animate={{ width: collapsed ? "80px" : "220px" }}
            className="bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-900 shadow-md p-4 flex flex-col justify-between h-screen transition-colors"
        >
            <div>
                {/* Top section with menu + theme toggle */}
                <div className="flex justify-between items-center mb-6">
                    <Button variant="ghost" onClick={() => setCollapsed(!collapsed)}>
                        <Menu />
                    </Button>
                    <ThemeToggle />
                </div>

                {/* Sidebar nav links */}
                <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                        >
                            {item.icon}
                            {!collapsed && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Bottom logout button */}
            <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <LogOut size={20} />
                {!collapsed && <span>Logout</span>}
            </Button>
        </motion.aside>
    )
}
