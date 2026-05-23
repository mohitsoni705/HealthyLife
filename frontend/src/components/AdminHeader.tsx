type AdminHeaderProps = {
  title?: string
  subtitle?: string
  highlightTitle?: string
  highlightText?: string
  actionTitle?: string
  actionText?: string
}

const AdminHeader = ({
  title = 'Admin Dashboard',
  subtitle,
  highlightTitle = "Today's Highlights",
  highlightText = 'Key metrics and recent activity at a glance',
  actionTitle = 'Action Items',
  actionText = 'Follow up on pending approvals and flagged items',
}: AdminHeaderProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 mb-4">{subtitle}</p>}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{highlightTitle}</h3>
          <p className="text-sm text-gray-500">{highlightText}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600">{actionTitle}</h4>
          <p className="text-xs text-gray-500">{actionText}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
