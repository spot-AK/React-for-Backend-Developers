interface ActivityItemProps {
  user: string
  action: string
  time: string
  avatar: string
}

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
