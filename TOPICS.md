# React for Backend Developers — Topics & Exercises

A progressive curriculum to teach React to backend developers, using this dashboard project as a hands-on reference.

---

## Topic Overview

| # | Topic | Project Example |
|---|---|---|
| 1 | What is React & Why React | — |
| 2 | JSX & Your First Component | `components/ui/card.tsx` |
| 3 | Props & TypeScript Interfaces | `components/shared/stat-card.tsx` |
| 4 | Component Composition | `components/layout/layout.tsx` |
| 5 | Conditional Rendering | `pages/dashboard.tsx` |
| 6 | State with `useState` | `pages/dashboard.tsx` |
| 7 | Rendering Lists with `.map()` | `pages/dashboard.tsx` |
| 8 | React Router & Navigation | `App.tsx`, `sidebar.tsx` |
| 9 | Side Effects with `useEffect` | `pages/dashboard.tsx` |
| 10 | API Integration with `fetch` | `lib/api.ts` |
| 11 | Custom Hooks | `hooks/use-fetch.ts` |

---

## Topic 1: What is React & Why React

### What is React?

React is a **JavaScript library** for building user interfaces, created and maintained by **Meta (Facebook)**. It is the most popular frontend library in the world, used by companies like Facebook, Instagram, Netflix, Airbnb, Uber, and many more.

React lets you build complex UIs by breaking them into small, reusable pieces called **components**.

### How Traditional Web Pages Work (Without React)

In traditional web development (like server-rendered pages with Spring Boot, Django, or Laravel):

```
User clicks a link
        ↓
Browser sends request to server
        ↓
Server processes request, generates full HTML page
        ↓
Browser reloads entire page
        ↓
User sees the new page (flash of white screen)
```

**Every interaction** requires a full page reload from the server.

### How React Works (Single Page Application)

With React, the browser loads **once**, and then React handles everything on the client side:

```
User clicks a link
        ↓
React intercepts the click (no server request)
        ↓
React updates ONLY the parts of the page that changed
        ↓
User sees instant update (no page reload, no white flash)
```

This is called a **Single Page Application (SPA)**.

### Why React? (Benefits for Backend Developers)

| Benefit | Explanation |
|---|---|
| **Component-Based** | Build UI like building with Lego blocks — small reusable pieces that snap together. Similar to how you create classes and services in backend code. |
| **Declarative** | You describe **what** the UI should look like, not **how** to update it. React figures out the DOM changes. Like SQL — you say "give me users where role = admin", not "loop through all records and check each one." |
| **Virtual DOM** | React keeps a lightweight copy of the DOM in memory. When state changes, it compares the old and new versions and updates **only what changed** — making it very fast. |
| **Massive Ecosystem** | Thousands of libraries, tools, and community support. Most frontend job postings require React. |
| **TypeScript Support** | First-class TypeScript support means type safety, auto-completion, and fewer runtime bugs — things backend developers already value. |

### React vs Other Approaches

| Approach | How It Works | Example |
|---|---|---|
| **Server-Side Rendering** | Server generates HTML on every request | Spring MVC + Thymeleaf, Django Templates, Laravel Blade |
| **jQuery** | Manually manipulate the DOM with JavaScript | `$('#button').click(function() { ... })` |
| **React (SPA)** | Components manage their own state, React updates the DOM automatically | `<Button onClick={handleClick}>` |

### Key Concepts at a Glance

#### 1. Everything is a Component

A React app is a **tree of components**. Each component is a JavaScript function that returns HTML-like code (JSX).

```
App
├── Layout
│   ├── Sidebar
│   │   ├── NavLink (Dashboard)
│   │   ├── NavLink (Analytics)
│   │   └── NavLink (Users)
│   └── Main Content
│       └── DashboardPage
│           ├── StatCard (Total Users)
│           ├── StatCard (Revenue)
│           ├── BarChart
│           └── ActivityList
```

#### 2. Data Flows Down (One-Way)

Data flows from **parent → child** through props. This makes the app predictable and easy to debug.

```
App (has all routes)
  └── DashboardPage (fetches data)
        └── StatCard (receives title, value as props)
```

#### 3. React Re-renders When State Changes

When data changes (e.g., user clicks a button, API returns data), React **automatically re-renders** only the affected components.

```
User clicks "Sort by Name"
        ↓
State updates: setSortBy("name")
        ↓
React re-renders the table with sorted data
        ↓
Only the table rows change — sidebar, header stay untouched
```
### This Project

This dashboard project is a complete React application with:

- **5 pages** — Dashboard, Analytics, Users, Products, Settings
- **Reusable components** — Cards, Charts, Badges, Buttons
- **API integration** — Fetches data from a REST API
- **Client-side routing** — Navigate between pages without reloads

By the end of these topics, you'll understand how every piece of this project works.

---

## Topic 2: JSX & Your First Component

**Backend analogy:** A component is like a function that returns an HTML template.

### What is JSX?

JSX lets you write HTML-like syntax inside JavaScript. React components are just functions that return JSX.

### Example — `ActivityItem` Component

**File:** `src/components/shared/activity-item.tsx`

```tsx
export function ActivityItem({ user, action, time, avatar }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{user}</p>
        <p className="text-sm text-gray-500 truncate">{action}</p>
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
    </div>
  )
}
```

### Key Points

- Components are **functions** that return JSX
- JSX looks like HTML but lives inside JavaScript
- Every component must return **one** root element
- Components are reusable — write once, use `<ActivityItem />` anywhere
- Use `className` instead of `class` (because `class` is a reserved word in JavaScript)
- htmlFor instead of for
- self Closing tags `<br />`, `<hr />`
- Camelcase for all attributes `onchange => onClick`, `tabindex => tabIndex`

---

## Topic 3: Props & TypeScript Interfaces

**Backend analogy:** Props are like function parameters or method arguments.

### What are Props?

Props (short for "properties") are how you pass data from a parent component to a child component. Data flows **one way** — parent → child.

### Example — `StatCard` Component

**File:** `src/components/shared/stat-card.tsx`

```tsx
// Step 1: Define the shape of the data using a TypeScript interface
interface StatCardProps {
    title: string
    value: string
    change: string
    trend?: "up" | "down"
}

// Step 2: Receive props in the component function
export function StatCard({ title, value, change, trend }: StatCardProps) {
    return (
        <div>
            <p>{title}</p>
            <h3>{value}</h3>
            <span>{change}</span>
        </div>
    )
}
```

### How a Parent Uses This Component

```tsx
<StatCard title="Total Users" value="12,847" change="+12.5%" trend="up" />
```

### Key Points

- Props pass data from parent → child (one-way data flow)
- TypeScript `interface` defines what props a component accepts
- Destructuring `{ title, value }` extracts props directly
- Union types `"up" | "down"` restrict allowed values
- Props are **read-only** — a child cannot modify its own props

---

## Topic 4: Component Composition

**Backend analogy:** Like composing services — small pieces build larger systems.

### What is Composition?

Instead of building one giant component, you compose small components together to build complex UIs. Parent components include child components, which can include their own children.

### Example — Layout Wrapping Pages

**File:** `src/components/layout/layout.tsx`

```tsx
import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"

export function Layout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}
```

### Example — Card Composing Sub-Components

**File:** `src/pages/dashboard.tsx`

```tsx
<Card>
    <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
        {data.recentActivity.map((activity) => (
            <ActivityItem
                key={activity.id}
                user={activity.user}
                action={activity.action}
                time={activity.time}
                avatar={activity.avatar}
            />
        ))}
    </CardContent>
</Card>
```

### Key Points

- Build **small** components, then **compose** them into larger ones
- `children` — components can wrap other components (like `<Card>` wrapping `<CardContent>`)
- `<Outlet />` is a placeholder that renders the matched child route's content
- Composition keeps each component focused on a single responsibility

---

### ✅ Task 1: Build a `UserProfileCard` Component

**Goal:** Practice component composition by building a new component from existing pieces.

**What to build:**

Create a `UserProfileCard` component in `src/components/shared/user-profile-card.tsx` that composes `Card`, `CardHeader`, `CardTitle`, and `CardContent`.

**Requirements:**

1. Create an interface `UserProfileCardProps` with:
   - `name` (string)
   - `email` (string)
   - `role` (string)
   - `joinDate` (string)

2. The component should:
   - Use `<Card>` as the outer wrapper
   - Show the user's name in a `<CardTitle>`
   - Display email, role, and join date inside `<CardContent>`
   - Show the user's initials in a colored circle (e.g., "AJ" for "Alice Johnson")

3. Use it in the Users page by replacing or adding it alongside the existing user list.

**Starter code:**

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserProfileCardProps {
    name: string
    email: string
    role: string
    joinDate: string
}

export function UserProfileCard({ name, email, role, joinDate }: UserProfileCardProps) {
    // Get initials from name (e.g., "Alice Johnson" → "AJ")
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")

    return (
        <Card>
            {/* Build the rest here */}
        </Card>
    )
}
```

**Bonus:** Add a `useState` to toggle between showing/hiding the email address when clicking a button.

---


## Topic 5: Conditional Rendering

**Backend analogy:** Like `if/else` blocks in templates (`{% if %}`, `@if`, `th:if`).

### Patterns for Conditional Rendering

#### Pattern 1: Early Return

**File:** `src/pages/dashboard.tsx`

```tsx
if (loading) {
    return <div>Loading dashboard...</div>
}

if (error) {
    return <div>Error: {error}</div>
}

// Main content renders only if not loading and no error
return (
    <div>...</div>
)
```

#### Pattern 2: Ternary Operator

**File:** `src/components/shared/stat-card.tsx`

```tsx
{trend === "up" ? (
    <TrendingUp className="w-4 h-4" />
) : (
    <TrendingDown className="w-4 h-4" />
)}
```

#### Pattern 3: Logical AND (`&&`)

```tsx
{isAdmin && <AdminPanel />}
// Shows AdminPanel only if isAdmin is true
```

### Key Points

- **Early return** — return different JSX based on conditions (great for loading/error states)
- **Ternary** `condition ? A : B` — inline "if-else" for choosing between two elements
- **`&&` operator** — inline "show if true" for optional elements
- Combine these patterns as needed

---

## Topic 6: State with `useState`

**Backend analogy:** Like instance variables that trigger a UI re-render when they change.

### What is State?

State is data that **belongs to a component** and can **change over time**. When state changes, React automatically re-renders the component to reflect the new data.

### Example — Dashboard Page

**File:** `src/pages/dashboard.tsx`

```tsx
import { useState } from "react"

export function DashboardPage() {
    // Declare state variables
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // When you call setLoading(false), React re-renders this component
    // ...
}
```

### How `useState` Works

```tsx
const [value, setValue] = useState(initialValue)
//      ^         ^                    ^
//      |         |                    └── Starting value
//      |         └── Function to UPDATE the value
//      └── Current value (read-only)
```

### Common Patterns

```tsx
// Boolean state (toggle)
const [isOpen, setIsOpen] = useState(false)
setIsOpen(true)

// String state
const [name, setName] = useState("")
setName("Alice")

// Number state
const [count, setCount] = useState(0)
setCount(count + 1)

// Nullable state with TypeScript
const [data, setData] = useState<User | null>(null)
```

### Key Points

- `useState` returns `[currentValue, setterFunction]`
- **Never mutate state directly** — always use the setter (`setData`, not `data = ...`)
- When you call the setter, React **re-renders** the component
- State is **local** to each component instance
- TypeScript generics define the state type: `useState<string | null>(null)`

### Props vs State

| Props | State |
|---|---|
| Passed from parent | Created inside the component |
| Read-only | Can be updated with setter |
| Like function parameters | Like instance variables |
| Parent controls the data | Component controls its own data |

---
## Topic 7: Rendering Lists with `.map()`

**Backend analogy:** Like a `for-each` loop in a template engine (`{% for %}`, `@foreach`, `th:each`).

### How to Render Lists

In React, you transform arrays into JSX elements using `.map()`.

### Example — Stats Grid

**File:** `src/pages/dashboard.tsx`

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {data.overview.map((stat) => (
        <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
        />
    ))}
</div>
```

### Key Points

- `.map()` transforms each array item into a JSX element
- Every list item **must** have a unique `key` prop — React uses it to track changes efficiently
- Use `{}` curly braces to embed JavaScript expressions inside JSX
- The `key` should be a stable unique identifier (like `id`), not an array index

---

## Topic 8: React Router & Navigation

**Backend analogy:** Like controller routes (`@GetMapping("/users")`, `@app.route("/users")`) but for frontend pages.

### What is React Router?

React Router enables **client-side navigation** — switching between pages without a full page reload. The URL changes, but the browser stays on the same page.

### Route Definitions

**File:** `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
```

### How It Maps

| URL | Page Component |
|---|---|
| `/` | `<DashboardPage />` |
| `/analytics` | `<AnalyticsPage />` |
| `/users` | `<UsersPage />` |
| `/products` | `<ProductsPage />` |
| `/settings` | `<SettingsPage />` |

### Navigation Links

**File:** `src/components/layout/sidebar.tsx`

```tsx
import { NavLink } from "react-router-dom"

const menuItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/users", label: "Users", icon: Users },
    { path: "/products", label: "Products", icon: Package },
    { path: "/settings", label: "Settings", icon: Settings },
]

// NavLink automatically knows which link is active
<NavLink
    to={item.path}
    className={({ isActive }) =>
        isActive ? "bg-blue-50 text-blue-700" : "text-gray-600"
    }
>
    {item.label}
</NavLink>
```

### Key Concepts

| Concept | Description |
|---|---|
| `<BrowserRouter>` | Wraps the entire app to enable routing |
| `<Routes>` | Container for all route definitions |
| `<Route path="..." element={...}>` | Maps a URL path to a component |
| `<Route path="products/:id">` | Dynamic route — `:id` matches any value in the URL |
| `<Route index>` | Default child route (renders at parent path) |
| Nested routes | Child routes render inside parent's `<Outlet />` |
| `<NavLink to="...">` | Link that knows if it's the current page (`isActive`) |
| `<Link to="...">` | Navigate to a route without page reload |
| `useParams()` | Hook to read URL parameters (e.g., `:id`) inside a component |
| `<Outlet />` | Placeholder where the matched child route renders |

### Key Points

- **No page reloads** — React Router swaps components in place (SPA behavior)
- **Nested routes** — `Layout` wraps all pages; `<Outlet />` shows the active page
- **`NavLink` vs `Link`** — `NavLink` provides `isActive` for highlighting the current page
- Think of it like backend routes, but instead of returning JSON, each route renders a React component

---

### ✅ Task 3: Add a Product Details Page with Dynamic Route

**Goal:** Practice adding a dynamic route with URL parameters, creating a page component, and navigating to it.

**What to build:**

Add a **Product Details** page that shows when you click on a product. The URL should include the product ID (e.g., `/products/3`).

**Key Concept: Dynamic Routes**

So far, all routes have been static (`/users`, `/analytics`). But what if you need a page for **each individual product**? You use a **dynamic route parameter** — just like backend routes:

| Backend | React Router |
|---|---|
| `@GetMapping("/products/{id}")` (Spring) | `<Route path="products/:id" />` |
| `@app.route("/products/<id>")` (Flask) | `<Route path="products/:id" />` |
| `/products/:id` (Express) | `<Route path="products/:id" />` |

The `:id` part is a **URL parameter** — it matches any value (`/products/1`, `/products/42`, etc.).

**How to read the URL parameter in the component:**

```tsx
import { useParams } from "react-router-dom"

function ProductDetailsPage() {
    const { id } = useParams()
    // If URL is /products/3, then id = "3"
}
```

**Steps:**

1. **Create the page component** at `src/pages/product-details.tsx`:

```tsx
import { useParams } from "react-router-dom"

export function ProductDetailsPage() {
    const { id } = useParams()

    return (
        <div className="space-y-8">
            <div>
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
```

   That's it for now — just show the product ID from the URL. No API calls needed.

2. **Add the route** in `src/App.tsx`:
   - Import `ProductDetailsPage`
   - Add the dynamic route **inside** the `Layout` route:

```tsx
<Route path="products/:id" element={<ProductDetailsPage />} />
```

   The full routes should look like:

```tsx
<Route path="/" element={<Layout />}>
    <Route index element={<DashboardPage />} />
    <Route path="analytics" element={<AnalyticsPage />} />
    <Route path="users" element={<UsersPage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="products/:id" element={<ProductDetailsPage />} />
    <Route path="settings" element={<SettingsPage />} />
</Route>
```

3. **Make product names clickable** in `src/pages/products.tsx`:
   - Use `<Link>` from `react-router-dom` to navigate to the detail page:

```tsx
import { Link } from "react-router-dom"

// In the columns array, update the "name" column:
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
}
```

**Expected result:**

1. Go to the Products page
2. Click on a product name (e.g., "Wireless Headphones")
3. Browser navigates to `/products/1`
4. The Product Details page shows: "Viewing product ID: 1"

**What you learned:**

| Concept | Description |
|---|---|
| `products/:id` | Dynamic route — `:id` matches any value in the URL |
| `useParams()` | Hook to read URL parameters inside a component |
| `<Link to={...}>` | Navigate to a route without page reload |
| Template literal | `` `/products/${product.id}` `` builds the URL dynamically |

**Bonus:** Add a "Back to Products" link on the details page using `<Link to="/products">` or the `useNavigate()` hook.

---

## Topic 9: Side Effects with `useEffect`

**Backend analogy:** Like `@PostConstruct`, initialization hooks, or event listeners — code that runs at specific times in the component's lifecycle.

### What is `useEffect`?

`useEffect` lets you run code **after** the component renders. It's commonly used for:

- Fetching data from an API
- Setting up event listeners
- Updating the document title

### Example — Fetching Data on Page Load

**File:** `src/pages/dashboard.tsx`

```tsx
import { useState, useEffect } from "react"

export function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadDashboardData() {
            try {
                setLoading(true)
                setError(null)
                const dashboardData = await fetchDashboardData()
                setData(dashboardData)
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load dashboard data"
                )
            } finally {
                setLoading(false)
            }
        }

        loadDashboardData()
    }, [])
    //  ^^ empty array = run once when the component mounts
}
```

### The Dependency Array

The second argument to `useEffect` controls **when** the effect runs:

```tsx
useEffect(() => { ... }, [])       // Runs ONCE when component mounts
useEffect(() => { ... }, [userId]) // Runs when `userId` changes
useEffect(() => { ... })           // Runs after EVERY render (rarely needed)
```

### The Complete Data-Fetching Pattern

```
Component mounts
    ↓
useEffect runs → setLoading(true)
    ↓
fetch data from API
    ↓
Success? → setData(result) → setLoading(false) → re-render with data
    ↓
Error?   → setError(message) → setLoading(false) → re-render with error
```

### Key Points

- `useEffect` runs **after** the component renders (not before)
- The empty dependency array `[]` means "run once on mount"
- Always handle **loading**, **success**, and **error** states
- You can't make `useEffect` itself `async` — define an async function inside it

---

## Topic 10: API Integration with `fetch`

**Backend analogy:** Like an HTTP client (`RestTemplate`, `HttpClient`, `requests`, `http.Get`).

### The API Service Layer

**File:** `src/lib/api.ts`

```tsx
const API_BASE_URL = "https://my-json-server.typicode.com/spot-AK/api"

export async function fetchDashboardData(): Promise<DashboardData> {
    const response = await fetch(`${API_BASE_URL}/dashboard`)

    if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.statusText}`)
    }

    return response.json()
}
```

### How `fetch` Works

```tsx
// 1. Make the request
const response = await fetch("https://api.example.com/users")

// 2. Check if successful
if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
}

// 3. Parse the JSON body
const data = await response.json()
```

### TypeScript Interfaces for API Data

Define the shape of data you expect from the API:

```tsx
export interface User {
    id: number
    name: string
    email: string
    role: string
    status: string
    joinDate: string
}

export async function fetchUsersData(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`)
    }
    return response.json()
}
```

### Using the API in a Page Component

```tsx
export function UsersPage() {
    const [data, setData] = useState<User[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true)
                const users = await fetchUsersData()
                setData(users)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load")
            } finally {
                setLoading(false)
            }
        }
        loadUsers()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!data) return null

    return (
        <div>
            {data.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    )
}
```

### Separation of Concerns

```
src/
├── lib/api.ts          ← API functions (fetch + types)
├── pages/dashboard.tsx  ← UI component (uses API functions)
└── data/dashboard-data.ts  ← Fallback/mock data
```

### Key Points

- `fetch()` is the browser's built-in HTTP client
- `async/await` makes asynchronous code readable
- **Always check `response.ok`** — `fetch` doesn't throw on HTTP errors (404, 500)
- TypeScript return types (`Promise<User[]>`) ensure type safety
- Keep API logic in a **separate file** (`lib/api.ts`) — not inside components
- The pattern: **API layer** → **useEffect** → **useState** → **render**

---

### ✅ Task 4: Fetch and Display Product Details

**Goal:** Practice the full flow — API function → useEffect → state → render — by building out the Product Details page from Task 3.

**What to build:**

Right now the Product Details page (`/products/:id`) only shows "Viewing product ID: 3". In this task, you'll fetch the actual product data from the API and display it.

**Key Concept: Passing URL Params to an API Call**

In Task 3, you used `useParams()` to read the product ID from the URL. Now you'll use that ID to fetch data:

```
URL: /products/3
        ↓
useParams() → id = "3"
        ↓
fetchProductById("3") → calls API
        ↓
useState → stores product data
        ↓
Render product details
```

**Steps:**

1. **Add a fetch function** in `src/lib/api.ts`:

The existing `Product` interface already has what we need:

```tsx
// This interface already exists in api.ts
export interface Product {
    id: number
    name: string
    category: string
    price: number
    stock: number
    sales: number
}
```

Add a new function to fetch a single product. Since the products API returns all items inside `{ items: [...] }`, we fetch all products and find the one matching the ID:

```tsx
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
```

2. **Update `product-details.tsx`** to fetch and display the product:

```tsx
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
    //   ^^ re-fetch when the ID changes

    if (loading) {
        return <div>Loading product...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!product) {
        return null
    }

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
                    {product.name}
                </h2>
                <p className="text-gray-500">Product details and inventory information.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Create a card for each piece of product info */}
                {/* Hint: reuse StatCard or build simple cards */}
            </div>
        </div>
    )
}
```

3. **Display the product info** — Fill in the grid with detail cards. Here's what to show:

| Field | Display |
|---|---|
| Category | Badge with the category name |
| Price | Formatted as `$129.99` |
| Stock | Number, red if below 30 |
| Sales | Total units sold |

**Starter hint for the cards:**

```tsx
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
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
    </CardContent>
</Card>
```

**What you learned:**

| Concept | Description |
|---|---|
| `useParams()` → API call | Using a URL parameter to fetch specific data |
| `useEffect([id])` | Re-running the effect when the `id` dependency changes |
| `id!` (non-null assertion) | Telling TypeScript that `id` won't be undefined here |
| `find()` | Array method to locate a single item by condition |
| Loading / Error / Success | The three states every data-fetching component needs |

**Expected result:**

1. Go to Products page
2. Click "Wireless Headphones"
3. Navigates to `/products/1`
4. Shows: product name as title, category badge, price, stock level, sales count
5. "Back to Products" link returns to the list

**Bonus:** Add a stock status indicator — show a green "In Stock" badge if stock > 30, yellow "Low Stock" if stock is 10-30, and red "Out of Stock" if stock is 0.

---

## Topic 11: Custom Hooks

**Backend analogy:** Like extracting a reusable utility class or service method that multiple controllers can share.

### What is a Custom Hook?

A custom hook is a **JavaScript function that starts with `use`** and can call other hooks (`useState`, `useEffect`, etc.). It lets you **extract reusable logic** out of components so you don't repeat yourself.

### The Problem: Duplicated Code

Look at the pages in this project — **every single page** has the exact same data-fetching pattern:

**`dashboard.tsx`:**

```tsx
const [data, setData] = useState<DashboardData | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
    async function loadData() {
        try {
            setLoading(true)
            setError(null)
            const result = await fetchDashboardData()
            setData(result)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load")
        } finally {
            setLoading(false)
        }
    }
    loadData()
}, [])
```

**`analytics.tsx`** — same pattern, different fetch function.
**`users.tsx`** — same pattern, different fetch function.
**`products.tsx`** — same pattern, different fetch function.
**`settings.tsx`** — same pattern, different fetch function.

That's **~15 lines of identical logic** duplicated across **5 pages**. In backend code, you'd extract this into a shared service or utility. In React, you extract it into a **custom hook**.

### The Solution: `useFetch` Custom Hook

**File:** `src/hooks/use-fetch.ts`

```tsx
import { useState, useEffect } from "react"

interface UseFetchResult<T> {
    data: T | null
    loading: boolean
    error: string | null
}

export function useFetch<T>(fetchFn: () => Promise<T>): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true)
                setError(null)
                const result = await fetchFn()
                setData(result)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load data")
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    return { data, loading, error }
}
```

### Before vs After

**Before (without custom hook) — `dashboard.tsx`:**

```tsx
import { useState, useEffect } from "react"
import { fetchDashboardData, type DashboardData } from "@/lib/api"

export function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadDashboardData() {
            try {
                setLoading(true)
                setError(null)
                const dashboardData = await fetchDashboardData()
                setData(dashboardData)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load dashboard data")
            } finally {
                setLoading(false)
            }
        }
        loadDashboardData()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!data) return null

    return <div>{/* render dashboard */}</div>
}
```

**After (with custom hook) — `dashboard.tsx`:**

```tsx
import { useFetch } from "@/hooks/use-fetch"
import { fetchDashboardData, type DashboardData } from "@/lib/api"

export function DashboardPage() {
    const { data, loading, error } = useFetch<DashboardData>(fetchDashboardData)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!data) return null

    return <div>{/* render dashboard */}</div>
}
```

**15 lines of state + effect logic reduced to 1 line.** And it's the same for every page:

```tsx
// analytics.tsx
const { data, loading, error } = useFetch<AnalyticsData>(fetchAnalyticsData)

// users.tsx
const { data, loading, error } = useFetch<User[]>(fetchUsersData)

// products.tsx
const { data, loading, error } = useFetch<ProductsData>(fetchProductsData)

// settings.tsx
const { data, loading, error } = useFetch<Setting[]>(fetchSettingsData)
```

### How Custom Hooks Work

```
┌─────────────────────────────────────┐
│  useFetch(fetchDashboardData)       │
│                                     │
│  ┌─ useState (data)                 │
│  ├─ useState (loading)              │
│  ├─ useState (error)                │
│  └─ useEffect (calls fetchFn)       │
│                                     │
│  Returns: { data, loading, error }  │
└─────────────────────────────────────┘
         ↓
   Used by DashboardPage, AnalyticsPage, UsersPage, etc.
```

Each component that calls `useFetch` gets its **own independent** copy of the state — hooks don't share state between components.

### Rules of Hooks

Custom hooks follow the same rules as built-in hooks:

| Rule | Why |
|---|---|
| Name must start with `use` | React uses this convention to enforce hook rules and enable linting |
| Only call hooks at the **top level** | Don't call hooks inside `if`, `for`, or nested functions — React relies on call order |
| Only call hooks from **React functions** | Call from components or other custom hooks — not from regular JavaScript functions |

```tsx
// ✅ Correct — top level of component
function MyPage() {
    const { data, loading, error } = useFetch(fetchData)
    // ...
}

// ❌ Wrong — inside a condition
function MyPage() {
    if (userId) {
        const { data } = useFetch(fetchData)  // DON'T do this!
    }
}

// ❌ Wrong — inside a loop
function MyPage() {
    for (const id of ids) {
        const { data } = useFetch(fetchData)  // DON'T do this!
    }
}
```

### More Custom Hook Examples

#### `useToggle` — Boolean Toggle

```tsx
import { useState } from "react"

export function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue)

    const toggle = () => setValue((prev) => !prev)
    const setTrue = () => setValue(true)
    const setFalse = () => setValue(false)

    return { value, toggle, setTrue, setFalse }
}
```

Usage:

```tsx
function Sidebar() {
    const { value: isOpen, toggle } = useToggle(true)

    return (
        <div>
            <button onClick={toggle}>{isOpen ? "Close" : "Open"} Menu</button>
            {isOpen && <nav>...</nav>}
        </div>
    )
}
```

#### `useDocumentTitle` — Update the Browser Tab Title

```tsx
import { useEffect } from "react"

export function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = title
    }, [title])
}
```

Usage:

```tsx
function DashboardPage() {
    useDocumentTitle("Dashboard | My App")
    // ...
}

function UsersPage() {
    useDocumentTitle("Users | My App")
    // ...
}
```

#### `useLocalStorage` — Persist State Across Page Reloads

```tsx
import { useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : initialValue
    })

    const setStoredValue = (newValue: T) => {
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    return [value, setStoredValue] as const
}
```

Usage:

```tsx
function SettingsPage() {
    const [theme, setTheme] = useLocalStorage("theme", "light")

    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Current: {theme}
        </button>
    )
}
```

### Backend Analogy

| Backend | React Custom Hooks |
|---|---|
| Utility class / Helper method | `useFetch`, `useToggle` |
| Base service class (shared logic) | Hook that wraps `useState` + `useEffect` |
| Dependency injection | Hooks compose other hooks |
| `@Transactional` / `@Cacheable` (cross-cutting concerns) | Hooks that add behavior to any component |

### When to Create a Custom Hook

| Situation | Example |
|---|---|
| **Same state + effect pattern** repeated in multiple components | `useFetch` — data, loading, error pattern |
| **Complex state logic** you want to isolate | `useForm` — form validation, dirty tracking |
| **Browser APIs** you want to wrap | `useLocalStorage`, `useDocumentTitle`, `useWindowSize` |
| **Reusable behavior** across unrelated components | `useToggle`, `useDebounce`, `useClickOutside` |

### Key Points

- Custom hooks are functions that start with `use` and can call other hooks
- They **extract and reuse logic** — not UI (that's what components do)
- Each component calling a hook gets its **own independent state**
- Hooks can call other hooks — they compose just like components
- Follow the **Rules of Hooks**: top level only, React functions only
- If you see the same `useState` + `useEffect` pattern in multiple components → extract a custom hook

---

### ✅ Task 5: Create a `useFetch` Hook and Refactor a Page

**Goal:** Practice creating a custom hook and using it to eliminate duplicated code.

**Steps:**

1. **Create the hook** at `src/hooks/use-fetch.ts`:

```tsx
import { useState, useEffect } from "react"

interface UseFetchResult<T> {
    data: T | null
    loading: boolean
    error: string | null
}

export function useFetch<T>(fetchFn: () => Promise<T>): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true)
                setError(null)
                const result = await fetchFn()
                setData(result)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load data")
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    return { data, loading, error }
}
```

2. **Refactor `UsersPage`** to use the hook:

```tsx
import { useFetch } from "@/hooks/use-fetch"
import { fetchUsersData, type User } from "@/lib/api"

export function UsersPage() {
    const { data, loading, error } = useFetch<User[]>(fetchUsersData)

    // ... rest of the component stays the same
}
```

3. **Refactor all other pages** (`dashboard.tsx`, `analytics.tsx`, `products.tsx`, `settings.tsx`) to use `useFetch` the same way.

4. **Verify** that all pages still work correctly after refactoring.

**Bonus:** Create a `useToggle` hook in `src/hooks/use-toggle.ts` and use it to add a "Show/Hide sidebar" toggle to the Layout component.

---

## 📐 Suggested Learning Schedule

| Week | Topics | Task |
|---|---|---|
| Week 1 | 1. What is React & Why React | — |
| | 2. JSX & Components | — |
| | 3. Props & Interfaces | — |
| | 4. State with `useState` | — |
| | 5. Component Composition | ✅ Task 1: UserProfileCard |
| Week 2 | 6. Rendering Lists | — |
| | 7. Conditional Rendering | ✅ Task 2: NotificationBanner |
| Week 3 | 8. React Router & Navigation | ✅ Task 3: Product Details page + dynamic route |
| Week 4 | 9. Side Effects with `useEffect` | — |
| | 10. API Integration with `fetch` | ✅ Task 4: Fetch & display product details |
| | 11. Custom Hooks | ✅ Task 5: useFetch hook + refactor |

---

## 📚 Quick Reference

### Component Template

```tsx
interface MyComponentProps {
    title: string
    count: number
}

export function MyComponent({ title, count }: MyComponentProps) {
    return (
        <div>
            <h2>{title}</h2>
            <p>Count: {count}</p>
        </div>
    )
}
```

### Component with State + API Template (Manual)

```tsx
import { useState, useEffect } from "react"

export function MyPage() {
    const [data, setData] = useState<MyData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true)
                const result = await fetchMyData()
                setData(result)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load")
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!data) return null

    return <div>{/* Render data here */}</div>
}
```

### Component with `useFetch` Hook (Recommended)

```tsx
import { useFetch } from "@/hooks/use-fetch"
import { fetchMyData, type MyData } from "@/lib/api"

export function MyPage() {
    const { data, loading, error } = useFetch<MyData>(fetchMyData)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!data) return null

    return <div>{/* Render data here */}</div>
}
```

### Custom Hook Template

```tsx
import { useState, useEffect } from "react"

export function useMyHook(param: string) {
    const [value, setValue] = useState<string>("")

    useEffect(() => {
        // side effect logic here
    }, [param])

    return { value, setValue }
}
```
