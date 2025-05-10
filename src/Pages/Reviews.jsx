import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MessageCircle, AlertCircle } from 'react-feather';
import ReviewResponseModal from '../Components/Reviews/ReviewResponseModal';

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) throw new Error('No user session found.');

        const { data } = await axios.get(
          `http://localhost:5050/provider/68136e4d342756dad21e994b`
        );

        // Map API reviews to UI shape
        const mapped = data.reviews.map((r) => ({
          id: r._id,
          customerName: r.customer.name,
          rating: r.rating,
          date: r.createdAt,
          serviceName: '', // no serviceName in API
          comment: r.comment,
          response: null,
          responseDate: null,
        }));
        setReviews(mapped);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Generate stars
  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle response submit
  const handleResponseSubmit = (responseText) => {
    setLoading(true);
    setTimeout(() => {
      const updated = reviews.map((rev) =>
        rev.id === currentReview.id
          ? { ...rev, response: responseText, responseDate: new Date().toISOString() }
          : rev
      );
      setReviews(updated);
      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
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
                  <div className="text-sm text-gray-500">{review.serviceName}</div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
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