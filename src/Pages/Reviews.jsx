import { useState } from 'react';
import { Star, MessageCircle, AlertCircle } from 'react-feather';
import ReviewResponseModal from '../Components/Reviews/ReviewResponseModal';

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Dummy data to display for now
  const dummyReviews = [
    {
      id: 1,
      customerName: "John Doe",
      rating: 4,
      date: "2025-04-20T12:00:00",
      serviceName: "Website Development",
      comment: "Great service! The website looks amazing and was delivered on time.",
      response: "Thank you for your kind words. We're glad you're satisfied with our service!",
      responseDate: "2025-04-22T09:30:00"
    },
    {
      id: 2,
      customerName: "Jane Smith",
      rating: 5,
      date: "2025-04-18T14:20:00",
      serviceName: "Logo Design",
      comment: "Absolutely loved the logo design! It perfectly captures our brand essence.",
      response: null,
      responseDate: null
    },
    {
      id: 3,
      customerName: "Michael Johnson",
      rating: 3,
      date: "2025-04-15T10:45:00",
      serviceName: "SEO Consultation",
      comment: "The service was okay, but I expected more detailed insights into our SEO strategy.",
      response: null,
      responseDate: null
    }
  ];

  // State to hold the reviews
  const [reviews, setReviews] = useState(dummyReviews);

  // Generate stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle response submit
  const handleResponseSubmit = (response) => {
    // Update the reviews with the new response
    setLoading(true);
    
    // Mock API call delay
    setTimeout(() => {
      const updatedReviews = reviews.map(review => {
        if (review.id === currentReview.id) {
          return {
            ...review,
            response: response,
            responseDate: new Date().toISOString()
          };
        }
        return review;
      });
      
      setReviews(updatedReviews);
      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
    
    /* 
     * IMPORTANT: Replace the setTimeout mock with actual API call once backend is implemented
     * Example API call:
     * 
     * async function submitReviewResponse(reviewId, responseText) {
     *   try {
     *     const response = await fetch('/api/reviews/respond', {
     *       method: 'POST',
     *       headers: {
     *         'Content-Type': 'application/json',
     *       },
     *       body: JSON.stringify({
     *         reviewId: reviewId,
     *         response: responseText
     *       })
     *     });
     *     
     *     if (!response.ok) {
     *       throw new Error('Failed to submit response');
     *     }
     *     
     *     const data = await response.json();
     *     
     *     const updatedReviews = reviews.map(review => {
     *       if (review.id === reviewId) {
     *         return {
     *           ...review,
     *           response: data.response,
     *           responseDate: data.responseDate
     *         };
     *       }
     *       return review;
     *     });
     *     
     *     setReviews(updatedReviews);
     *     setLoading(false);
     *     setIsModalOpen(false);
     *   } catch (error) {
     *     console.error('Error responding to review:', error);
     *     setLoading(false);
     *   }
     * }
     * 
     * Call submitReviewResponse(currentReview.id, response);
     */
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Customer Reviews</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {review.customerName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{review.customerName}</h3>
                      <div className="flex items-center mt-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-500">{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {review.serviceName}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
                {/* {review.response ? (
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <MessageCircle className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Your Response</h4>
                        <span className="text-xs text-gray-500">{formatDate(review.responseDate)}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{review.response}</p>
                  </div>
                ) : null} */}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
            <p>No reviews yet</p>
          </div>
        )}
      </div>

      <ReviewResponseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleResponseSubmit}
        review={currentReview}
        loading={loading}
      />
    </div>
  );
};

export default Reviews;