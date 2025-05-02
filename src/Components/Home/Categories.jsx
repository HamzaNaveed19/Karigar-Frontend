import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import axios from "axios";

function Categories() {
  //const [categories, setCategories] = useState([]);
  const categories = [
    {
      name: "Plumber",
      icon: "Wrench",
      description: "Pipe install & repairs",
      color: "blue",
    },
    {
      name: "Electrician",
      icon: "Zap",
      description: "Wiring & electrical work",
      color: "yellow",
    },
    {
      name: "Painter",
      icon: "Paintbrush",
      description: "Interior & exterior painting",
      color: "red",
    },
    {
      name: "Carpenter",
      icon: "Hammer",
      description: "Furniture & woodwork",
      color: "amber",
    },
    {
      name: "Tailor",
      icon: "Shirt",
      description: "Clothing alterations",
      color: "purple",
    },
    {
      name: "Mechanic",
      icon: "Car",
      description: "Vehicle repairs",
      color: "green",
    },
    {
      name: "Cook",
      icon: "Utensils",
      description: "Catering & home chefs",
      color: "orange",
    },
    {
      name: "Technician",
      icon: "Laptop",
      description: "Computer & phone repair",
      color: "sky",
    },
    {
      name: "Salon",
      icon: "Scissors",
      description: "Haircuts & styling",
      color: "pink",
    },
    {
      name: "Cleaner",
      icon: "Sparkles",
      description: "Home & office cleaning",
      color: "teal",
    },
    {
      name: "Mover",
      icon: "Truck",
      description: "Relocation services",
      color: "indigo",
    },
    {
      name: "All",
      icon: "MoreHorizontal",
      description: "All service categories",
      color: "gray",
    },
  ];

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5050/category")
  //     .then((res) => {
  //       console.log(res.data);
  //       if (Array.isArray(res.data) && res.data.length > 0) {
  //         setCategories(res.data[0].category);
  //       } else {
  //         setCategories([]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Axios Error:", err.message);
  //     });
  // }, []);

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className=" px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-12 lg:mb-16">
          <h2 className="text-4xl font-bold">Popular Professions</h2>
          <p className="mt-4 text-lg">
            Browse through our most requested profession categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.name}
              description={category.description}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
