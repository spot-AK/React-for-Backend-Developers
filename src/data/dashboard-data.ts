// Dashboard Overview Data
export const overviewStats = [
    { id: 1, title: "Total Users", value: "12,847", change: "+12.5%", trend: "up" },
    { id: 2, title: "Revenue", value: "$48,352", change: "+8.2%", trend: "up" },
    { id: 3, title: "Active Sessions", value: "1,429", change: "-3.1%", trend: "down" },
    { id: 4, title: "Conversion Rate", value: "3.24%", change: "+0.8%", trend: "up" },
]

export const revenueData = [
    { month: "Jan", revenue: 4000, expenses: 2400 },
    { month: "Feb", revenue: 3000, expenses: 1398 },
    { month: "Mar", revenue: 5000, expenses: 3800 },
    { month: "Apr", revenue: 4780, expenses: 3908 },
    { month: "May", revenue: 5890, expenses: 4800 },
    { month: "Jun", revenue: 6390, expenses: 3800 },
    { month: "Jul", revenue: 7490, expenses: 4300 },
]

export const recentActivities = [
    { id: 1, user: "Alice Johnson", action: "Created new project", time: "2 min ago", avatar: "AJ" },
    { id: 2, user: "Bob Smith", action: "Updated user settings", time: "15 min ago", avatar: "BS" },
    { id: 3, user: "Carol White", action: "Deployed to production", time: "1 hour ago", avatar: "CW" },
    { id: 4, user: "David Brown", action: "Added new team member", time: "3 hours ago", avatar: "DB" },
    { id: 5, user: "Eva Martinez", action: "Generated monthly report", time: "5 hours ago", avatar: "EM" },
]

// Analytics Data
export const trafficSources = [
    { name: "Direct", value: 35, color: "#3b82f6" },
    { name: "Organic Search", value: 28, color: "#10b981" },
    { name: "Referral", value: 18, color: "#f59e0b" },
    { name: "Social Media", value: 12, color: "#ef4444" },
    { name: "Email", value: 7, color: "#8b5cf6" },
]

export const pageViews = [
    { page: "/home", views: 15420, bounce: "32%" },
    { page: "/products", views: 12350, bounce: "45%" },
    { page: "/about", views: 8760, bounce: "28%" },
    { page: "/contact", views: 6540, bounce: "52%" },
    { page: "/blog", views: 5230, bounce: "38%" },
]

export const visitorData = [
    { day: "Mon", visitors: 1200 },
    { day: "Tue", visitors: 1900 },
    { day: "Wed", visitors: 1600 },
    { day: "Thu", visitors: 2100 },
    { day: "Fri", visitors: 2400 },
    { day: "Sat", visitors: 1800 },
    { day: "Sun", visitors: 1400 },
]

// Users Data
export const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active", joinDate: "2024-02-20" },
    { id: 3, name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive", joinDate: "2024-03-10" },
    { id: 4, name: "David Brown", email: "david@example.com", role: "Editor", status: "Active", joinDate: "2024-04-05" },
    { id: 5, name: "Eva Martinez", email: "eva@example.com", role: "Admin", status: "Active", joinDate: "2024-05-18" },
    { id: 6, name: "Frank Wilson", email: "frank@example.com", role: "Viewer", status: "Active", joinDate: "2024-06-22" },
    { id: 7, name: "Grace Lee", email: "grace@example.com", role: "Editor", status: "Inactive", joinDate: "2024-07-30" },
    { id: 8, name: "Henry Davis", email: "henry@example.com", role: "Viewer", status: "Active", joinDate: "2024-08-12" },
]

// Products Data
export const products = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 129.99, stock: 45, sales: 234 },
    { id: 2, name: "Smart Watch", category: "Electronics", price: 299.99, stock: 23, sales: 156 },
    { id: 3, name: "Running Shoes", category: "Sports", price: 89.99, stock: 67, sales: 312 },
    { id: 4, name: "Coffee Maker", category: "Home", price: 79.99, stock: 34, sales: 89 },
    { id: 5, name: "Yoga Mat", category: "Sports", price: 29.99, stock: 120, sales: 445 },
    { id: 6, name: "Desk Lamp", category: "Home", price: 49.99, stock: 56, sales: 178 },
    { id: 7, name: "Bluetooth Speaker", category: "Electronics", price: 69.99, stock: 89, sales: 267 },
    { id: 8, name: "Backpack", category: "Accessories", price: 59.99, stock: 78, sales: 198 },
]

export const salesByCategory = [
    { category: "Electronics", sales: 45000 },
    { category: "Sports", sales: 32000 },
    { category: "Home", sales: 28000 },
    { category: "Accessories", sales: 18000 },
]

// Settings Data
export const settingsOptions = [
    { id: 1, category: "General", title: "Site Name", description: "Your dashboard name", value: "My Dashboard" },
    { id: 2, category: "General", title: "Timezone", description: "Default timezone", value: "UTC-5 (EST)" },
    { id: 3, category: "Notifications", title: "Email Alerts", description: "Receive email notifications", value: "Enabled" },
    { id: 4, category: "Notifications", title: "Push Notifications", description: "Browser push notifications", value: "Disabled" },
    { id: 5, category: "Security", title: "Two-Factor Auth", description: "Additional security layer", value: "Enabled" },
    { id: 6, category: "Security", title: "Session Timeout", description: "Auto logout duration", value: "30 minutes" },
]
