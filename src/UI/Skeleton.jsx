import React from "react";

export function Skeleton({ className, circle = false }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-md ${
        circle ? "rounded-full" : ""
      } ${className}`}
    />
  );
}

export function SkeletonText({ lines = 1, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}
