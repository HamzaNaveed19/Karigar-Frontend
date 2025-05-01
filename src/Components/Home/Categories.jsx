import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/category")
      .then((res) => {
        console.log(res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data[0].category);
        } else {
          setCategories([]);
        }
      })
      .catch((err) => {
        console.error("Axios Error:", err.message);
      });
  }, []);

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-5 sm:px-6 lg:px-8">
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
