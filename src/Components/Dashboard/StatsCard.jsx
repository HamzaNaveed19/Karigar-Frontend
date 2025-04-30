import { ArrowUp, ArrowDown } from "react-feather"

const StatsCard = ({ title, value, icon, change, changeType }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {change && (
          <p
            className={`mt-2 flex items-center text-sm ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            {changeType === "positive" ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            {change}
          </p>
        )}
      </div>
    </div>
  )
}

export default StatsCard;
