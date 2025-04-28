import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import Button from "../../../UI/Button";

const ReviewSection = ({ booking, onReviewSubmit }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    onReviewSubmit({ rating, comment: reviewText });
    setShowReviewForm(false);
    setReviewText("");
    setRating(0);
  };

  if (booking.review) {
    return (
      <div className="rounded-lg bg-gray-50 p-3">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < booking.review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(booking.review.date).toLocaleDateString()}
          </span>
        </div>
        {booking.review.comment && (
          <p className="mt-2 text-sm text-gray-700">
            <MessageSquare className="mr-1 inline h-3 w-3" />
            {booking.review.comment}
          </p>
        )}
      </div>
    );
  }

  if (showReviewForm) {
    return (
      <div className="space-y-3 rounded-lg bg-gray-50 p-3">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-5 w-5 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <textarea
          className="w-full rounded border border-gray-300 p-2 text-sm"
          rows={3}
          placeholder="Share your experience..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="flex justify-center flex-row gap-2">
          <Button
            variant="outline"
            className="border-gray-300"
            onClick={() => setShowReviewForm(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Review</Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
      onClick={() => setShowReviewForm(true)}
    >
      Give Review
    </Button>
  );
};

export default ReviewSection;
