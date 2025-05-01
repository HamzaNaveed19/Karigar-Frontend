import React from "react";
import { Star, ChevronRight, MessageSquare, Calendar } from "lucide-react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import Button from "../../UI/Button";

function Reviews({ provider }) {
  const calculateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    provider.reviews_list.forEach((review) => {
      distribution[review.rating]++;
    });

    return Object.entries(distribution)
      .map(([rating, count]) => ({
        rating: parseInt(rating),
        count,
        percentage: Math.round((count / provider.reviews_list.length) * 100),
      }))
      .reverse();
  };

  const ratingDistribution = calculateRatingDistribution();
  const averageRating =
    provider.reviews_list.reduce((sum, review) => sum + review.rating, 0) /
    provider.reviews_list.length;

  return (
    <Card className="border-1 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            <MessageSquare className="mr-2 inline h-5 w-5 text-emerald-600" />
            Customer Reviews
          </h2>
          <div className="flex items-center rounded-full bg-emerald-50 px-3 py-1">
            <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-emerald-700">
              {averageRating.toFixed(1)}
            </span>
            <span className="ml-1 text-sm text-emerald-600">
              ({provider.reviews_list.length} reviews)
            </span>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="mb-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6 shadow-inner">
          <div className="grid gap-6 md:grid-cols-5">
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-emerald-600">
                {averageRating.toFixed(1)}
              </div>
              <div className="my-2 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs font-medium text-gray-600">
                Based on {provider.reviews_list.length} reviews
              </div>
            </div>

            <div className="col-span-4 space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center">
                  <div className="flex w-10 items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {rating}
                    </span>
                    <Star className="ml-1 h-3 w-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="mx-3 h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm font-medium text-gray-600">
                    {percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}

        {provider.reviews_list.map((review) => (
          <div
            key={review.id}
            className="rounded-lg border border-gray-100 p-5 shadow-xs hover:shadow-sm transition-shadow"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={review.userImage || "/placeholder.svg"}
                  alt={review.user}
                  className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{review.user}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center rounded-full bg-amber-50 px-2 py-1">
                <span className="mr-1 text-sm font-medium text-amber-700">
                  {review.rating}.0
                </span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              </div>
            </div>

            <p className="text-gray-700 text-sm">{review.comment}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Reviews;
