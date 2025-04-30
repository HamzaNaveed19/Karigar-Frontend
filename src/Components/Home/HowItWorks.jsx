import React from "react";
import { Search, MapPin, Star } from "lucide-react";

function HowItWorks() {
  return (
    <section className="py-12 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How Karigar Works
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
              Simple steps to find and book the perfect service provider
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Search className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Search</h3>
              <p className="text-gray-800">
                Find the service you need from our
                <br /> wide range of categories
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Star className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Choose</h3>
              <p className="text-gray-800">
                Select from verified providers based
                <br /> on reviews and ratings
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Book</h3>
              <p className="text-gray-800">
                Schedule an appointment and get <br />
                your work done professionally
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
