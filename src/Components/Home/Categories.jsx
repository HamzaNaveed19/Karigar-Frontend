import React from "react";
import CategoryCard from "./CategoryCard";

function Categories() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Popular Services
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
              Browse through our most requested service categories
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <CategoryCard
            icon="Wrench"
            title="Plumbing"
            description="Pipe repairs, installations"
            color="bg-blue-100"
          />
          <CategoryCard
            icon="Zap"
            title="Electrical"
            description="Wiring, fixtures, repairs"
            color="bg-yellow-300"
          />
          <CategoryCard
            icon="Paintbrush"
            title="Painting"
            description="Interior & exterior"
            color="bg-red-300"
          />
          <CategoryCard
            icon="Hammer"
            title="Carpentry"
            description="Furniture, repairs"
            color="bg-amber-300"
          />
          <CategoryCard
            icon="Shirt"
            title="Tailoring"
            description="Alterations, stitching"
            color="bg-purple-300"
          />
          <CategoryCard
            icon="Car"
            title="Mechanic"
            description="Vehicle repairs"
            color="bg-green-300"
          />
          <CategoryCard
            icon="Utensils"
            title="Cooking"
            description="Catering, home chefs"
            color="bg-orange-300"
          />
          <CategoryCard
            icon="Laptop"
            title="Tech Support"
            description="Computer & phone repair"
            color="bg-sky-300"
          />
          <CategoryCard
            icon="Scissors"
            title="Salon"
            description="Haircuts, styling"
            color="bg-pink-300"
          />
          <CategoryCard
            icon="Broom"
            title="Cleaning"
            description="Home & office"
            color="bg-teal-300"
          />
          <CategoryCard
            icon="Truck"
            title="Moving"
            description="Relocation services"
            color="bg-indigo-300"
          />
          <CategoryCard
            icon="MoreHorizontal"
            title="More"
            description="View all services"
            color="bg-gray-300"
          />
        </div>
      </div>
    </section>
  );
}

export default Categories;
