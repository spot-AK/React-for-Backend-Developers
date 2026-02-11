import { useState, useEffect } from "react"
import { DataList } from "@/components/shared/data-list"
import { PieChart } from "@/components/shared/pie-chart"
import { LineChart } from "@/components/shared/line-chart"
import { fetchAnalyticsData, type AnalyticsData } from "@/lib/api"

export function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAnalyticsData() {
      try {
        setLoading(true)
        setError(null)
        const analyticsData = await fetchAnalyticsData()
        setData(analyticsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analytics data")
      } finally {
        setLoading(false)
      }
    }

    loadAnalyticsData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-lg font-medium text-gray-900">Loading analytics...</div>
          <div className="text-sm text-gray-500 mt-2">Please wait</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-lg font-medium text-red-600">Error loading analytics</div>
          <div className="text-sm text-gray-500 mt-2">{error}</div>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Analytics</h2>
        <p className="text-gray-500">Track your website performance and user behavior.</p>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <PieChart title="Traffic Sources" data={data.traffic} />
        <LineChart
          title="Weekly Visitors"
          data={data.visitors}
          xAxisKey="day"
          lineKey="visitors"
          color="#10b981"
        />
      </div>

      {/* Page Views Table */}
      <DataList
        title="Top Pages by Views"
        data={data.pageViews.map((p, i) => ({ id: i + 1, ...p }))}
        columns={[
          { key: "page", header: "Page" },
          { key: "views", header: "Views", render: (item) => item.views.toLocaleString() },
          { key: "bounce", header: "Bounce Rate" },
        ]}
      />
    </div>
  )
}
