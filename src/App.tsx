import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/layout"
import { DashboardPage } from "@/pages/dashboard"
import { AnalyticsPage } from "@/pages/analytics"
import { UsersPage } from "@/pages/users"
import { ProductsPage } from "@/pages/products"
import { ProductDetailsPage } from "@/pages/product-details"
import { SettingsPage } from "@/pages/settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="products">
            <Route index element={<ProductsPage />} />
            <Route path=":id" element={<ProductDetailsPage />} />
          </Route>
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
