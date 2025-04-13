import React from "react";
import { Star } from "lucide-react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import Button from "../../UI/Button";

function Reviews({ provider }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Customer Reviews</h2>
          <div className="flex items-center">
            <Star className="mr-1 h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="font-medium">{provider.rating}</span>
            <span className="ml-1 text-sm text-gray-500">
              ({provider.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="mb-6 grid gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-5">
          <div className="col-span-1 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-emerald-600">
              {provider.rating}
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(provider.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {provider.reviews} reviews
            </div>
          </div>
          <div className="col-span-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-sm">5</div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[70%] rounded-full bg-emerald-500"></div>
              </div>
              <div className="text-sm">70%</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm">4</div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[20%] rounded-full bg-emerald-500"></div>
              </div>
              <div className="text-sm">20%</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm">3</div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[7%] rounded-full bg-emerald-500"></div>
              </div>
              <div className="text-sm">7%</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm">2</div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[2%] rounded-full bg-emerald-500"></div>
              </div>
              <div className="text-sm">2%</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm">1</div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[1%] rounded-full bg-emerald-500"></div>
              </div>
              <div className="text-sm">1%</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {provider.reviews_list.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="mb-2 flex items-center gap-3">
                <img
                  src={review.userImage || "/placeholder.svg"}
                  alt={review.user}
                  className="h-10 w-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
                <div>
                  <h3 className="font-medium">{review.user}</h3>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
              <div className="mb-2 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>

        <Button variant="outline" className="mt-4 w-full">
          View All Reviews
        </Button>
      </CardContent>
    </Card>
  );
}

export default Reviews;
