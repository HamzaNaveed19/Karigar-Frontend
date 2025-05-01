import { User } from "lucide-react";

const ProviderInfo = ({ provider }) => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
        {provider.image ? (
          <img
            src={provider.image}
            alt={provider.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-6 w-6 text-gray-400" />
        )}
      </div>
      <div>
        <p className="font-medium text-sm text-gray-900">{provider.name}</p>
        <p className="text-xs text-gray-500">{provider.profession}</p>
      </div>
    </div>
  );
};

export default ProviderInfo;
