import React from "react";
import { Frown } from "lucide-react";

function NoServiceProviderFound({ category }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Frown className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">
        No service providers found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We couldn't find any {category === "all" ? "" : category} service
        providers matching your search. Try adjusting your filters or search
        query.
      </p>
    </div>
  );
}

export default NoServiceProviderFound;
