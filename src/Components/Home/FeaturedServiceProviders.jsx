import React from "react";
import ServiceProviderCard from "../Provider/ServiceProviderCard";
import Button from "../../UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FeaturedServiceProviders() {
  const providers = useSelector((state) =>
    Object.values(state.providers.data).slice(0, 3)
  );
  const navigate = useNavigate();
  return (
    <section className="bg-gray-50 md:py-16">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Top Rated Providers
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
              Discover our highest-rated service professionals
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <ServiceProviderCard key={provider.id} {...provider} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="gap-1"
            onClick={() => {
              navigate("services/all");
            }}
          >
            View All Providers
          </Button>
        </div>
      </div>
    </section>
  );
}
