import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search, Filter, MapPin, TriangleAlert } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceProviders } from "../Redux/Slices/serviceProvidersSlice";
import Button from "../UI/Button";
import { Input } from "../UI/Input";
import ServiceProviderCard from "../Components/Provider/ServiceProviderCard";
import ErrorMessage from "../UI/ErrorMessage";
import NotFoundMessage from "../UI/NotFoundMessage";
import LoadingSpinner from "../UI/LoadingSpinner";

export default function ServicesProviderPage() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.providers);
  const providers = Object.values(data);
  const { category = "all" } = useParams();

  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("\nRENDERED: SERVICES PAGE!");
    if (status === "idle" || providers.length <= 1) {
      console.log("DISPATCHED: CALLED IN SERVICES PAGE!");
      dispatch(fetchServiceProviders());
    }
  }, [status, dispatch, data]);

  useEffect(() => {
    if (status === "succeeded") {
      const formattedCategory = category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      let filtered = providers;

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
  }, [category, searchQuery, data, status]);

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
    return (
      <ErrorMessage
        title="Connection Failed"
        message="Unable to connect to the server. Check your internet connection."
      />
    );
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
        <NotFoundMessage
          title="No service providers found"
          description={`We couldn't find any ${
            category === "all" ? "" : category
          } service providers matching your search. Try adjusting your filters or search query.`}
        />
      )}
    </div>
  );
}
