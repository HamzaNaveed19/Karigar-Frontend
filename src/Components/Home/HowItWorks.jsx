import React from "react";
import { Search, Star, CalendarCheck } from "lucide-react";

function HowItWorks() {
  return (
    <section className="py-16 md:py-20 bg-emerald-100/50">
      <div className=" px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            How Karigar Works
          </h2>
          <p className="mt-4 text-xl text-emerald-800">
            Simple steps to find and book the perfect service provider
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-1 bg-emerald-300"></div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="group relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-600 border-4 border-emerald-300 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <Search className="h-10 w-10" />
              </div>
              <div className="mt-8 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">1. Search</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Find the service you need from
                  <br /> our wide range of categories
                </p>
              </div>
            </div>

            <div className="group relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-600 border-4 border-emerald-300 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <Star className="h-10 w-10" />
              </div>
              <div className="mt-8 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">2. Compare</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Select from verified providers <br />
                  based on reviews and ratings
                </p>
              </div>
            </div>

            <div className="group relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-600 border-4 border-emerald-300 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <CalendarCheck className="h-10 w-10" />
              </div>
              <div className="mt-8 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">3. Book</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Schedule an appointment and get <br />
                  your work done professionally
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
