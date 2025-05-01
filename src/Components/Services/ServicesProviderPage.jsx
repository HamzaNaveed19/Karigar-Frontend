import { Search, Filter, MapPin } from "lucide-react";
import Button from "../../UI/Button";
import { Input } from "../../UI/Input";
import ServiceProviderCard from "../Provider/ServiceProviderCard";

export default function ServicesProviderPage({ category }) {
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
    {
      id: "4",
      name: "Abdul Ahad",
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
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="mb-2 text-2xl font-bold">{category} Services</h1>

      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={`Search for ${category.toLowerCase()} services`}
            className="w-full pl-8"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2">
        {providers.map((provider, index) => (
          <ServiceProviderCard key={index} {...provider} onPage={true} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
