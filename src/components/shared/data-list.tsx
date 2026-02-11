import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface Column<T> {
    key: keyof T | string
    header: string
    render?: (item: T) => ReactNode
}

interface DataListProps<T> {
    title: string
    data: T[]
    columns: Column<T>[]
}

export function DataList<T extends { id: number | string }>({
    title,
    data,
    columns,
}: DataListProps<T>) {
    const getValue = (item: T, key: string): ReactNode => {
        const keys = key.split(".")
        let value: unknown = item
        for (const k of keys) {
            value = (value as Record<string, unknown>)[k]
        }
        return value as ReactNode
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {columns.map((col) => (
                                    <th
                                        key={String(col.key)}
                                        className="text-left py-3 px-4 font-medium text-gray-500"
                                    >
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                                >
                                    {columns.map((col) => (
                                        <td key={String(col.key)} className="py-3 px-4 text-gray-700">
                                            {col.render ? col.render(item) : getValue(item, String(col.key))}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
