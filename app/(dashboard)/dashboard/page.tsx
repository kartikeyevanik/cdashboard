import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Main dashboard</h1>
            <Link href={"dashboard/audit-logs"} className="text-blue-400">Go to audit logs</Link>
        </div>
    )
}