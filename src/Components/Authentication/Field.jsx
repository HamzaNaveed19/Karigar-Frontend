import React from "react";

const Field = ({ icon: Icon, label, error, children }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="flex items-center text-xs font-medium text-gray-500">
        <Icon className="mr-2 h-4 w-4 text-emerald-500" />
        {label}
      </label>
      {error && <p className="text-xs text-red-400">*required</p>}
    </div>
    {children}
  </div>
);

export default Field;
