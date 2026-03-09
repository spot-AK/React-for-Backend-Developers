// API Types
export interface OverviewStat {
    id: number
    title: string
    value: string
    change: string
    trend: "up" | "down"
}

export interface RevenueData {
    month: string
    revenue: number
    expenses: number
    [key: string]: string | number
}

export interface RecentActivity {
    id: number
    user: string
    action: string
    time: string
    avatar: string
}

export interface DashboardData {
    overview: OverviewStat[]
    revenue: RevenueData[]
    recentActivity: RecentActivity[]
}

export interface TrafficSource {
    name: string
    value: number
    color: string
}

export interface PageView {
    page: string
    views: number
    bounce: string
}

export interface VisitorData {
    day: string
    visitors: number
    [key: string]: string | number
}

export interface AnalyticsData {
    traffic: TrafficSource[]
    pageViews: PageView[]
    visitors: VisitorData[]
}

export interface User {
    id: number
    name: string
    email: string
    role: string
    status: string
    joinDate: string
}

export interface UsersData {
    users: User[]
}

export interface Product {
    id: number
    name: string
    category: string
    price: number
    stock: number
    sales: number
}

export interface SalesByCategory {
    category: string
    sales: number
    [key: string]: string | number
}

export interface ProductsData {
    items: Product[]
    salesByCategory: SalesByCategory[]
}

export interface Setting {
    id: number
    category: string
    title: string
    description: string
    value: string
}

export interface SettingsData {
    settings: Setting[]
}

// API Service
const API_BASE_URL = "https://my-json-server.typicode.com/spot-AK/api"

export async function fetchDashboardData(): Promise<DashboardData> {
    const response = await fetch(`${API_BASE_URL}/dashboard`)

    if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.statusText}`)
    }

    return response.json()
}

export async function fetchAnalyticsData(): Promise<AnalyticsData> {
    const response = await fetch(`${API_BASE_URL}/Analytics`)

    if (!response.ok) {
        throw new Error(`Failed to fetch analytics data: ${response.statusText}`)
    }

    return response.json()
}

export async function fetchUsersData(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`)

    if (!response.ok) {
        throw new Error(`Failed to fetch users data: ${response.statusText}`)
    }

    return response.json()
}

export async function fetchProductsData(): Promise<ProductsData> {
    const response = await fetch(`${API_BASE_URL}/products`)

    if (!response.ok) {
        throw new Error(`Failed to fetch products data: ${response.statusText}`)
    }

    return response.json()
}

export async function fetchProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`)

    if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    const data: ProductsData = await response.json()
    const product = data.items.find((p) => p.id === Number(id))

    if (!product) {
        throw new Error(`Product with ID ${id} not found`)
    }

    return product
}

export async function fetchSettingsData(): Promise<Setting[]> {
    const response = await fetch(`${API_BASE_URL}/settings`)

    if (!response.ok) {
        throw new Error(`Failed to fetch settings data: ${response.statusText}`)
    }

    return response.json()
}
