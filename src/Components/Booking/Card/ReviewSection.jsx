import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import Button from "../../../UI/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateBookingReview } from "../../../Redux/Slices/bookingsSlice";

const ReviewSection = ({ booking, onReviewSubmit }) => {
  const { token } = useSelector((state) => state.auth);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  console.log(booking);

  const handleSubmit = async () => {
    if (!rating) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const reviewData = {
        bookingId: booking._id,
        customerId: booking.customer,
        serviceProviderId: booking.serviceProvider._id,
        rating: rating,
        comment: reviewText,
      };

      const response = await axios.post(
        "http://localhost:5050/customer/addReview",
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onReviewSubmit(response.data.review);

      setShowReviewForm(false);
      setReviewText("");
      setRating(0);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (booking.reviews.length > 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-3">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < booking.reviews[0].rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(booking.reviews[0].createdAt).toLocaleDateString()}
          </span>
        </div>
        {booking.reviews[0].comment && (
          <p className="mt-2 text-sm text-gray-700">
            <MessageSquare className="mr-1 inline h-3 w-3" />
            {booking.reviews[0].comment}
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
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-center flex-row gap-2">
          <Button
            variant="outline"
            className="border-gray-300"
            onClick={() => {
              setShowReviewForm(false);
              setError(null);
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 w-full"
      onClick={() => setShowReviewForm(true)}
    >
      Give Review
    </Button>
  );
};

export default ReviewSection;
