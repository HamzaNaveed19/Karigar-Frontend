import React from "react";
import CategoryCard from "./CategoryCard";

function Categories() {
  return (
    <section className="py-8 md:py-12  bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-12 lg:mb-16">
          <h2 className="text-4xl font-bold ">Popular Professions</h2>
          <p className="mt-4 text-lg">
            Browse through our most requested profession categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <CategoryCard
            icon="Wrench"
            title="Plumber"
            description="Pipe repairs, installations"
            color="blue"
          />
          <CategoryCard
            icon="Zap"
            title="Electrician"
            description="Wiring, fixtures, repairs"
            color="yellow"
          />
          <CategoryCard
            icon="Paintbrush"
            title="Painter"
            description="Interior & exterior"
            color="red"
          />
          <CategoryCard
            icon="Hammer"
            title="Carpenter"
            description="Furniture, repairs"
            color="amber"
          />
          <CategoryCard
            icon="Shirt"
            title="Tailor"
            description="Alterations, stitching"
            color="purple"
          />
          <CategoryCard
            icon="Car"
            title="Mechanic"
            description="Vehicle repairs"
            color="green"
          />
          <CategoryCard
            icon="Utensils"
            title="Cook"
            description="Catering, home chefs"
            color="orange"
          />
          <CategoryCard
            icon="Laptop"
            title="Tech Support"
            description="Computer & phone repair"
            color="sky"
          />
          <CategoryCard
            icon="Scissors"
            title="Salon"
            description="Haircuts, styling"
            color="pink"
          />
          <CategoryCard
            icon="Sparkles"
            title="Cleaner"
            description="Home & office"
            color="teal"
          />
          <CategoryCard
            icon="Truck"
            title="Mover"
            description="Relocation services"
            color="indigo"
          />
          <CategoryCard
            icon="MoreHorizontal"
            title="More"
            description="View all services"
            color="gray"
          />
        </div>
      </div>
    </section>
  );
}

export default Categories;
