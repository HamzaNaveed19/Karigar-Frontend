"use client"

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Star, MessageCircle, AlertCircle } from 'react-feather';
import { respondToReview } from '../../redux/slices/reviewsSlice';
import ReviewResponseModal from '../../components/reviews/ReviewResponseModal';

const Reviews = () => {
  const { data: reviews, loading, actionLoading } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);

  const handleRespondClick = (review) => {
    setCurrentReview(review);
    setIsModalOpen(true);
  };

  const handleResponseSubmit = (response) => {
    dispatch(respondToReview({ reviewId: currentReview.id, response }));
    setIsModalOpen(false);
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('common.reviews')}</h1>
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
                {review.response ? (
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
                ) : (
                  <div className="mt-4">
                    <button
                      onClick={() => handleRespondClick(review)}
                      className="inline-flex items-center px-3 py-1.5 border border-emerald-500 text-xs font-medium rounded text-emerald-600 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Respond
                    </button>
                  </div>
                )}
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

      {/* Review Response Modal */}
      <ReviewResponseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleResponseSubmit}
        review={currentReview}
        loading={actionLoading}
      />
    </div>
  );
};

export default Reviews;
