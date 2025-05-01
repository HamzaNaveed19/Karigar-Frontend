import React from "react";
import ServiceProviderCard from "../Provider/ServiceProviderCard";
import Button from "../../UI/Button";

export default function FeaturedServiceProviders() {
  {
    /*mock data*/
  }
  const providers = [
    {
      id: "1",
      name: "Fakhar Rashid",
      profession: "Electrician",
      rating: 4.9,
      reviews: 124,
      image: "/placeholder2.png",
      location: "Lahore",
      verified: true,
      experience: 8,
      completedJobs: 215,
      services: [{ duration: 90, price: 3500 }],
      skills: ["Wiring", "Installation", "Repairs", "Maintenance"],
    },
    {
      id: "2",
      name: "Abdullah Malik",
      profession: "Interior Designer",
      rating: 4.8,
      reviews: 98,
      image: "/placeholder2.png",
      location: "Karachi",
      verified: true,
      experience: 6,
      completedJobs: 178,
      services: [{ duration: 120, price: 2500 }],
      skills: ["Space Planning", "Color Scheme", "Furniture", "Lighting"],
    },
    {
      id: "3",
      name: "Ali Ahmad",
      profession: "Plumber",
      rating: 4.7,
      reviews: 156,
      image: "/placeholder2.png",
      location: "Islamabad",
      verified: true,
      experience: 10,
      completedJobs: 342,
      services: [{ duration: 60, price: 2000 }],
      skills: ["Leak Repair", "Installation", "Drain Cleaning"],
    },
  ];

  return (
    <section className="bg-gray-50 md:py-16">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Top Rated Providers
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
              Discover our highest-rated service professionals
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <ServiceProviderCard key={provider.id} {...provider} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="gap-1">
            View All Providers
          </Button>
        </div>
      </div>
    </section>
  );
}
