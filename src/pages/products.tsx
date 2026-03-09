import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { DataList } from "@/components/shared/data-list"
import { BarChart } from "@/components/shared/bar-chart"
import { Badge } from "@/components/ui/badge"
import { fetchProductsData, type ProductsData } from "@/lib/api"

export function ProductsPage() {
  const [data, setData] = useState<ProductsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProductsData() {
      try {
        setLoading(true)
        setError(null)
        const productsData = await fetchProductsData()
        setData(productsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products data")
      } finally {
        setLoading(false)
      }
    }

    loadProductsData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-lg font-medium text-gray-900">Loading products...</div>
          <div className="text-sm text-gray-500 mt-2">Please wait</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-lg font-medium text-red-600">Error loading products</div>
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
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Products</h2>
        <p className="text-gray-500">Manage your product inventory and sales.</p>
      </div>

      {/* Sales Chart */}
      <BarChart
        title="Sales by Category"
        data={data.salesByCategory}
        xAxisKey="category"
        bars={[{ dataKey: "sales", color: "#8b5cf6", name: "Sales ($)" }]}
      />

      {/* Products Table */}
      <DataList
        title="Product Inventory"
        data={data.items}
        columns={[
          {
            key: "name",
            header: "Product",
            render: (product) => (
              <Link
                to={`/products/${product.id}`}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {product.name}
              </Link>
            ),
          },
          {
            key: "category",
            header: "Category",
            render: (product) => <Badge variant="outline">{product.category}</Badge>,
          },
          {
            key: "price",
            header: "Price",
            render: (product) => `$${product.price.toFixed(2)}`,
          },
          {
            key: "stock",
            header: "Stock",
            render: (product) => (
              <span className={product.stock < 30 ? "text-red-600 font-medium" : ""}>
                {product.stock}
              </span>
            ),
          },
          { key: "sales", header: "Sales" },
        ]}
      />
    </div>
  )
}
