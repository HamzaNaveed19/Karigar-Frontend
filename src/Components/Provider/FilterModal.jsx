import { X, Star, Briefcase, Check, Hammer } from "lucide-react";
import Button from "../../UI/Button";
import { Input } from "../../UI/Input";

const FilterSection = ({ title, icon, children }) => (
  <div className="mb-5">
    <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
      {icon}
      {title}
    </h3>
    <div className="space-y-2.5">{children}</div>
  </div>
);

const FilterOption = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3.5 py-2 rounded-lg text-sm transition-all duration-200 ${
      active
        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium shadow-sm"
        : "bg-gray-50/70 text-gray-600 hover:bg-gray-100 border border-transparent"
    }`}
  >
    {children}
  </button>
);

const FilterModal = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  applyFilters,
  resetFilters,
}) => {
  if (!isOpen) return null;

  const ratingOptions = [5, 4, 3];
  const experienceOptions = [
    { label: "1+ years", value: 1 },
    { label: "2+ years", value: 2 },
    { label: "5+ years", value: 5 },
  ];
  const skillCountOptions = [
    { label: "2+ skills", value: 2 },
    { label: "5+ skills", value: 5 },
  ];
  const jobsDoneOptions = [
    { label: "10+ jobs", value: 10 },
    { label: "50+ jobs", value: 50 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 animate-fade-in ">
      <div className="p-6 bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col border border-gray-200/80">
        <div className="flex items-center justify-between mb-3  border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-lg font-semibold text-gray-900">
            Filter Providers
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className=" space-y-2 overflow-y-auto">
          <FilterSection
            title="Minimum Rating"
            icon={<Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
          >
            <div className="grid grid-cols-3 gap-2">
              {ratingOptions.map((rating) => (
                <FilterOption
                  key={rating}
                  active={filters.minRating === rating}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      minRating: filters.minRating === rating ? null : rating,
                    })
                  }
                >
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {rating}+
                  </div>
                </FilterOption>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Experience"
            icon={<Briefcase className="w-4 h-4 text-blue-500" />}
          >
            <div className="grid grid-cols-3 gap-2">
              {experienceOptions.map((option) => (
                <FilterOption
                  key={option.value}
                  active={filters.minExperience === option.value}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      minExperience:
                        filters.minExperience === option.value
                          ? null
                          : option.value,
                    })
                  }
                >
                  {option.label}
                </FilterOption>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Skills"
            icon={<Hammer className="w-4 h-4 text-purple-500" />}
          >
            <div className="grid grid-cols-3 gap-2">
              {skillCountOptions.map((option) => (
                <FilterOption
                  key={option.value}
                  active={filters.minSkills === option.value}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      minSkills:
                        filters.minSkills === option.value
                          ? null
                          : option.value,
                    })
                  }
                >
                  {option.label}
                </FilterOption>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Completed Jobs"
            icon={<Check className="w-4 h-4 text-green-500" />}
          >
            <div className="grid grid-cols-3 gap-2">
              {jobsDoneOptions.map((option) => (
                <FilterOption
                  key={option.value}
                  active={filters.minJobsDone === option.value}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      minJobsDone:
                        filters.minJobsDone === option.value
                          ? null
                          : option.value,
                    })
                  }
                >
                  {option.label}
                </FilterOption>
              ))}
            </div>
          </FilterSection>

          <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-200/50">
            <button
              onClick={() =>
                setFilters({
                  ...filters,
                  verifiedOnly: !filters.verifiedOnly,
                })
              }
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                filters.verifiedOnly
                  ? "bg-emerald-500 border-emerald-500 shadow-sm"
                  : "border-gray-300 bg-white hover:border-emerald-300"
              }`}
            >
              {filters.verifiedOnly && (
                <Check className="w-3.5 h-3.5 text-white" />
              )}
            </button>
            <label className="text-sm text-gray-700 flex-1">
              Verified Providers Only
            </label>
            {filters.verifiedOnly && (
              <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between p-4 border-t border-gray-100 bg-gray-50/80">
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="text-sm px-4 py-2 h-auto text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg"
          >
            Reset All
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={applyFilters}
              className="text-sm px-4 py-2 h-auto bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm hover:shadow-emerald-200 transition-all"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
