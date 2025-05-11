import { User, Star } from "lucide-react";

const ProviderInfo = ({ provider }) => {
  return (
    <div className="mb-2 flex items-center gap-4 p-1 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-emerald-50 border-2 border-emerald-100">
        {provider.personalImage ? (
          <img
            src={"/placeholder2.png"}
            alt={provider.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-6 w-6 text-emerald-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-medium text-sm text-yellow-600 truncate">
            {provider.name}
          </p>
        </div>
        <p className="text-xs text-gray-500 truncate">{provider.profession}</p>
      </div>
    </div>
  );
};

export default ProviderInfo;
