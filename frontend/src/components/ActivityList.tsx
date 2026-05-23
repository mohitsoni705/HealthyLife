type Activity = {
  title: string
  subtitle?: string
  time?: string
}

type ActivityListProps = {
  items: Activity[]
  title?: string
}

const ActivityList = ({ items, title = 'Recent Activity' }: ActivityListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
            <div>
              <p className="font-semibold text-gray-800">{it.title}</p>
              {it.subtitle && <p className="text-sm text-gray-500">{it.subtitle}</p>}
            </div>
            {it.time && <span className="text-xs text-gray-500">{it.time}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityList
