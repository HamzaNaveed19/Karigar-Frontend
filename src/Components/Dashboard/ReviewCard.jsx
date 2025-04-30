import { Star } from "react-feather"

const ReviewCard = ({ review }) => {
  // Format date
  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  // Generate stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} className={`h-4 w-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">{review.customerName}</h3>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      <div className="flex items-center mt-1">{renderStars(review.rating)}</div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{review.comment}</p>
    </div>
  )
}

export default ReviewCard;
