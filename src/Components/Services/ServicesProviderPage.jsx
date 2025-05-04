import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search, Filter, MapPin, TriangleAlert } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceProviders } from "../../Redux/Slices/serviceProvidersSlice";
import Button from "../../UI/Button";
import { Input } from "../../UI/Input";
import ServiceProviderCard from "../Provider/ServiceProviderCard";
import CategoryFilter from "./CategoryFilter";
import NoServiceProviderFound from "./NoServiceProviderFound";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
  </div>
);

const ErrorMessage = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 p-4 text-center">
    <div className="bg-red-100 p-4 rounded-full">
      <TriangleAlert className="h-10 w-10 text-red-500" />
    </div>
    <h3 className="text-xl font-bold text-gray-800">
      Failed to load providers
    </h3>
    <p className="text-gray-600 max-w-md">
      We encountered an issue while loading provider data. Please try again
      later.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
    >
      Retry
    </button>
  </div>
);

export default function ServicesProviderPage() {
  const dispatch = useDispatch();
  const { data: allProviders, status } = useSelector(
    (state) => state.providers
  );

  const { category = "all" } = useParams();
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("RENDERED: Service Provider Page!");
    if (status === "idle") {
      console.log("API HIT: Service Providers!");
      dispatch(fetchServiceProviders());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      console.log("FILTERED: Service Providers!");
      const formattedCategory = category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      let filtered = allProviders;

      if (formattedCategory !== "All") {
        filtered = filtered.filter(
          (provider) =>
            provider.profession.toLowerCase() ===
            formattedCategory.toLowerCase()
        );
      }

      if (searchQuery) {
        filtered = filtered.filter(
          (provider) =>
            provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.location.address
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProviders(filtered);
    }
  }, [category, searchQuery, allProviders, status]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (status === "loading") {
    return (
      <div className="h-[80vh] flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "failed") {
    return <ErrorMessage />;
  }

  return (
    <div className="container mx-auto mt-1 px-4 mb-4">
      <h1 className="mb-3 text-xl font-medium text-gray-500">
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
            placeholder={`Search By name or location`}
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
        </>
      ) : (
        <NoServiceProviderFound category={category}></NoServiceProviderFound>
      )}
    </div>
  );
}
