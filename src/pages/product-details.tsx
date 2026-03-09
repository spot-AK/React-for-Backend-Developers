import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchProductById, type Product } from "@/lib/api"

export function ProductDetailsPage() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadProduct() {
            try {
                setLoading(true)
                setError(null)
                const data = await fetchProductById(id!)
                setProduct(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load product")
            } finally {
                setLoading(false)
            }
        }
        loadProduct()
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="text-lg font-medium text-gray-900">Loading product...</div>
                    <div className="text-sm text-gray-500 mt-2">Please wait</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="text-lg font-medium text-red-600">Error loading product</div>
                    <div className="text-sm text-gray-500 mt-2">{error}</div>
                    <Link to="/products" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        )
    }

    if (!product) {
        return null
    }

    const stockStatus = product.stock === 0
        ? { label: "Out of Stock", variant: "destructive" as const }
        : product.stock < 30
            ? { label: "Low Stock", variant: "warning" as const }
            : { label: "In Stock", variant: "success" as const }

    return (
        <div className="space-y-8">
            <div>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        {product.name}
                    </h2>
                    <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                </div>
                <p className="text-gray-500">Product details and inventory information.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm text-gray-500">Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="outline">{product.category}</Badge>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm text-gray-500">Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm text-gray-500">Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-2xl font-bold ${product.stock < 30 ? "text-red-600" : "text-gray-900"}`}>
                            {product.stock}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm text-gray-500">Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-gray-900">{product.sales}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
