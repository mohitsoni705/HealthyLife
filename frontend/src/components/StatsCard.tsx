type StatsCardProps = {
  title: string
  value: string | number
  icon?: string
  borderColor?: string
}

const StatsCard = ({ title, value, icon, borderColor = 'border-blue-600' }: StatsCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 sm:p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className="text-3xl sm:text-4xl" aria-hidden>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatsCard
