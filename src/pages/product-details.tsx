import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export function ProductDetailsPage() {
    const { id } = useParams()

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
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Product Details
                </h2>
                <p className="text-gray-500">
                    Viewing product ID: {id}
                </p>
            </div>
        </div>
    )
}
