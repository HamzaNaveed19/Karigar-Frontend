import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import HowItWorks from "../Components/Home/HowItWorks";
import Categories from "../Components/Home/Categories";

function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection></HeroSection>

      <Categories></Categories>

      <HowItWorks></HowItWorks>
    </main>
  );
}

export default HomePage;
