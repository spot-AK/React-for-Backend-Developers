import { Badge } from "@/components/ui/badge"
import { Mail, Shield, Calendar, CircleUserRound } from "lucide-react"

interface UserProfileCardProps {
    name: string
    email: string
    role: string
    joinDate: string
    status?: string
}

export function UserProfileCard({ name, email, role, status, joinDate }: UserProfileCardProps) {
    // Get initials from name (e.g., "Alice Johnson" → "AJ")
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")

    return (
        <div className="space-y-6">
            {/* Profile header */}
            <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xl">
                    {initials}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{name}</h3>
                {status && (
                    <Badge variant={status === "Active" ? "success" : "warning"} className="mt-1">
                        {status}
                    </Badge>
                )}
            </div>

            {/* Details list */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900">{email}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <Shield className="w-4 h-4 text-gray-400 shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500">Role</p>
                        <p className="text-sm font-medium text-gray-900">{role}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <CircleUserRound className="w-4 h-4 text-gray-400 shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="text-sm font-medium text-gray-900">{status ?? "Unknown"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500">Join Date</p>
                        <p className="text-sm font-medium text-gray-900">{joinDate}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
