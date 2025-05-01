import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search, Filter, MapPin } from "lucide-react";
import Button from "../../UI/Button";
import { Input } from "../../UI/Input";
import ServiceProviderCard from "../Provider/ServiceProviderCard";
import CategoryFilter from "./CategoryFilter";
import NoServiceProviderFound from "./NoServiceProviderFound";

const allProviders = [
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

export default function ServicesProviderPage() {
  const { category = "all" } = useParams();
  const [filteredProviders, setFilteredProviders] = useState(allProviders);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const formattedCategory = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    let filtered = allProviders;

    if (formattedCategory !== "All") {
      filtered = filtered.filter(
        (provider) =>
          provider.profession.toLowerCase() === formattedCategory.toLowerCase()
      );
    }

    {
      /*For now searching is only done on the basis of name or location we can further add searching for experience, price etc*/
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProviders(filtered);
  }, [category, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-2 mb-4">
      <CategoryFilter
        initialCategory={
          category === "all"
            ? "All"
            : category
                .split("-")
                .map(
                  (word) => word.charAt(0).toUpperCase() + word.slice(1) + " "
                )
                .join(" ")
        }
      />

      <h1 className="mb-4 text-xl font-medium text-gray-500">
        {category === "all"
          ? "All Services"
          : category
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1) + "s")
              .join(" ")}
      </h1>

      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={`Search ${
              category === "all" ? "all" : category + "s"
            }`}
            className="w-full pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {filteredProviders.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2">
            {filteredProviders.map((provider, index) => (
              <ServiceProviderCard key={index} {...provider} onPage={true} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </>
      ) : (
        <NoServiceProviderFound category={category}></NoServiceProviderFound>
      )}
    </div>
  );
}
