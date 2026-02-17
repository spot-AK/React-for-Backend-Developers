import { useState, useEffect } from "react"
import { DataList } from "@/components/shared/data-list"
import { Badge } from "@/components/ui/badge"
import { SlidePanel } from "@/components/ui/slide-panel"
import { fetchUsersData, type User } from "@/lib/api"

export function UsersPage() {
  const [data, setData] = useState<User[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    async function loadUsersData() {
      try {
        setLoading(true)
        setError(null)
        const usersData = await fetchUsersData()
        setData(usersData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users data")
      } finally {
        setLoading(false)
      }
    }

    loadUsersData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-lg font-medium text-gray-900">Loading users...</div>
          <div className="text-sm text-gray-500 mt-2">Please wait</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-lg font-medium text-red-600">Error loading users</div>
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
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Users</h2>
        <p className="text-gray-500">Manage your team members and their access.</p>
      </div>

      <DataList
        title="All Users"
        data={data}
        columns={[
          {
            key: "name",
            header: "Name",
            render: (user) => (
              <button
                onClick={() => setSelectedUser(user)}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer text-left"
              >
                {user.name}
              </button>
            ),
          },
          { key: "email", header: "Email" },
          {
            key: "role",
            header: "Role",
            render: (user) => (
              <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                {user.role}
              </Badge>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (user) => (
              <Badge variant={user.status === "Active" ? "success" : "warning"}>
                {user.status}
              </Badge>
            ),
          },
          { key: "joinDate", header: "Join Date" },
        ]}
      />

      {/* User Detail Slide Panel */}
      <SlidePanel
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        title={"User Details"}
      >
        {/* Blank for now */}
      </SlidePanel>
    </div>
  )
}
