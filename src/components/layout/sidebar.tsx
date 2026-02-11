import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    BarChart3,
    Users,
    Package,
    Settings,
} from "lucide-react"

const menuItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/users", label: "Users", icon: Users },
    { path: "/products", label: "Products", icon: Package },
    { path: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
            <div className="p-6">
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <nav className="px-3">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50"
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}
