import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
    title: string
    value: string
    change: string
    trend: "up" | "down"
}

export function StatCard({ title, value, change, trend }: StatCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className="flex items-center justify-between mt-2">
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    <div
                        className={cn(
                            "flex items-center text-sm font-medium",
                            trend === "up" ? "text-green-600" : "text-red-600"
                        )}
                    >
                        {trend === "up" ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {change}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
