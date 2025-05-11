import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceProviders } from "../Redux/Slices/serviceProvidersSlice";
import Button from "../UI/Button";
import { Input } from "../UI/Input";
import ServiceProviderCard from "../Components/Provider/ServiceProviderCard";
import ErrorMessage from "../UI/ErrorMessage";
import NotFoundMessage from "../UI/NotFoundMessage";
import LoadingSpinner from "../UI/LoadingSpinner";
import FilterModal from "../Components/Provider/FilterModal";

export default function ServicesProviderPage() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.providers);
  const { user } = useSelector((state) => state.auth);
  const providers = Object.values(data);
  const { category = "all" } = useParams();

  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    minRating: null,
    minExperience: null,
    minSkills: null,
    minJobsDone: null,
    minPrice: null,
    maxPrice: null,
    verifiedOnly: false,
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (status === "idle" || providers.length <= 1) {
      dispatch(fetchServiceProviders(user.location.address));
    }
  }, [status, dispatch, data]);

  const applyFilters = () => {
    setIsFilterOpen(false);
    filterProviders();
  };

  const resetFilters = () => {
    setFilters({
      minRating: null,
      minExperience: null,
      minSkills: null,
      minJobsDone: null,
      minPrice: null,
      maxPrice: null,
      verifiedOnly: false,
    });
    filterProviders(true);
    setIsFilterOpen(false);
  };

  const filterProviders = (reset = false) => {
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

      const queryToUse = urlSearchQuery || searchQuery;
      if (queryToUse) {
        filtered = filtered.filter(
          (provider) =>
            provider.name.toLowerCase().includes(queryToUse.toLowerCase()) ||
            provider.profession
              .toLowerCase()
              .includes(queryToUse.toLowerCase()) ||
            provider.location.address
              .toLowerCase()
              .includes(queryToUse.toLowerCase())
        );
      }

      if (!reset) {
        if (filters.minRating !== null) {
          filtered = filtered.filter(
            (provider) => provider.rating >= filters.minRating
          );
        }
        if (filters.minExperience !== null) {
          filtered = filtered.filter(
            (provider) => provider.experience >= filters.minExperience
          );
        }
        if (filters.minSkills !== null) {
          filtered = filtered.filter(
            (provider) => provider.skillCount >= filters.minSkills
          );
        }
        if (filters.minJobsDone !== null) {
          filtered = filtered.filter(
            (provider) => provider.completedJobs >= filters.minJobsDone
          );
        }
        if (filters.minPrice !== null || filters.maxPrice !== null) {
          filtered = filtered.filter((provider) => {
            const servicePrice = provider.services[0]?.price || 0;
            return (
              (filters.minPrice === null || servicePrice >= filters.minPrice) &&
              (filters.maxPrice === null || servicePrice <= filters.maxPrice)
            );
          });
        }
        if (filters.verifiedOnly) {
          filtered = filtered.filter((provider) => provider.verified);
        }
      }

      setFilteredProviders(filtered);
    }
  };

  useEffect(() => {
    filterProviders();
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
      <h1 className="mb-4 text-xl font-semibold text-gray-500">
        {category === "all"
          ? "All Services"
          : category
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1) + "s")
              .join(" ")}
      </h1>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder={`Search by name or location`}
            className="w-full pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {filteredProviders.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProviders.map((provider) => (
            <ServiceProviderCard
              key={provider._id}
              {...provider}
              onPage={true}
            />
          ))}
        </div>
      ) : (
        <NotFoundMessage
          title="No service providers found"
          description={`We couldn't find any ${
            category === "all" ? "" : category
          } service providers matching your search. Try adjusting your filters or search query.`}
        />
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
    </div>
  );
}
