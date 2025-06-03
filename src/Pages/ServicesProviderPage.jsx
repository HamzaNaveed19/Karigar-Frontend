import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
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
  const { data, status } = useSelector(
    (state) => state.providers,
    shallowEqual
  );
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { category = "all" } = useParams();
  const location = useLocation();

  const providers = useMemo(() => Object.values(data), [data]);
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const urlSearchQuery = searchParams.get("search") || "";

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

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchServiceProviders(user?.location?.address));
    }
  }, [status, dispatch, providers.length, user?.location?.address]);

  const formattedCategory = useMemo(() => {
    if (category === "all") return "All";
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [category]);

  const pageTitle = useMemo(() => {
    return category === "all"
      ? "All Services"
      : formattedCategory + (formattedCategory.endsWith("s") ? "" : "s");
  }, [category, formattedCategory]);

  const filterProviders = useCallback(
    (reset = false) => {
      if (status !== "succeeded") return;

      let filtered = providers;

      // Category filter
      if (formattedCategory !== "All") {
        filtered = filtered.filter(
          (provider) =>
            provider.profession.toLowerCase() ===
            formattedCategory.toLowerCase()
        );
      }

      // Search filter
      const queryToUse = urlSearchQuery || searchQuery;
      if (queryToUse) {
        const queryLower = queryToUse.toLowerCase();
        filtered = filtered.filter(
          (provider) =>
            provider.name.toLowerCase().includes(queryLower) ||
            provider.profession.toLowerCase().includes(queryLower) ||
            provider.location.address.toLowerCase().includes(queryLower)
        );
      }

      // Additional filters
      if (!reset) {
        const {
          minRating,
          minExperience,
          minSkills,
          minJobsDone,
          minPrice,
          maxPrice,
          verifiedOnly,
        } = filters;

        if (minRating !== null) {
          filtered = filtered.filter(
            (provider) => provider.rating >= minRating
          );
        }
        if (minExperience !== null) {
          filtered = filtered.filter(
            (provider) => provider.experience >= minExperience
          );
        }
        if (minSkills !== null) {
          filtered = filtered.filter(
            (provider) => provider.skillCount >= minSkills
          );
        }
        if (minJobsDone !== null) {
          filtered = filtered.filter(
            (provider) => provider.completedJobs >= minJobsDone
          );
        }
        if (minPrice !== null || maxPrice !== null) {
          filtered = filtered.filter((provider) => {
            const servicePrice = provider.services[0]?.price || 0;
            return (
              (minPrice === null || servicePrice >= minPrice) &&
              (maxPrice === null || servicePrice <= maxPrice)
            );
          });
        }
        if (verifiedOnly) {
          filtered = filtered.filter((provider) => provider.verified);
        }
      }

      setFilteredProviders(filtered);
    },
    [status, providers, formattedCategory, urlSearchQuery, searchQuery, filters]
  );

  useEffect(() => {
    filterProviders();
  }, [category, searchQuery, data, status, filterProviders]);

  const applyFilters = useCallback(() => {
    setIsFilterOpen(false);
    filterProviders();
  }, [filterProviders]);

  const resetFilters = useCallback(() => {
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
  }, [filterProviders]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const toggleFilterModal = useCallback(() => {
    setIsFilterOpen((prev) => !prev);
  }, []);

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
      <h1 className="mb-4 text-xl font-semibold text-gray-500">{pageTitle}</h1>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by name or location"
            className="w-full pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={toggleFilterModal}
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
        onClose={toggleFilterModal}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
    </div>
  );
}
