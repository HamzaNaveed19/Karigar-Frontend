import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as LucideIcons from "lucide-react";

const CategoryFilter = ({ initialCategory = "All" }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(initialCategory.trim());

  const categories = [
    { name: "All", icon: "MoreHorizontal" },
    { name: "Plumber", icon: "Wrench" },
    { name: "Electrician", icon: "Zap" },
    { name: "Painter", icon: "Paintbrush" },
    { name: "Carpenter", icon: "Hammer" },
    { name: "Tailor", icon: "Shirt" },
    { name: "Mechanic", icon: "Car" },
    { name: "Cook", icon: "Utensils" },
    { name: "Technician", icon: "Laptop" },
    { name: "Salon", icon: "Scissors" },
    { name: "Cleaner", icon: "Sparkles" },
    { name: "Mover", icon: "Truck" },
  ];

  useEffect(() => {
    console.log("RENDERED: Category Filter!");
  }, []);

  const handleClick = (category) => {
    setActiveCategory(category);
    navigate(`/services/${category.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <div className="sticky top-16 z-10 pt-4 bg-white px-12">
      <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar ">
        {categories.map(({ name, icon }) => {
          const IconComponent = LucideIcons[icon];
          return (
            <button
              key={name}
              onClick={() => handleClick(name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === name
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              <span className="text-xs font-medium">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
