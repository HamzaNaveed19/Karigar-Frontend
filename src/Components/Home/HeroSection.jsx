import React from "react";

function HeroSection() {
  return (
    <div className="relative w-full h-screen max-h-[90vh] overflow-hidden flex">
      <div className="w-full lg:w-1/2 md:w-1/2 flex flex-col justify-center pl-20 z-10">
        <h1 className="text-6xl font-bold text-emerald-600 mb-4">Karigar</h1>
        <p className="text-xl text-gray-600 max-w-md">
          Connecting you with trusted professionals for all your home
          <br /> service needs
        </p>
        <div className="flex gap-4 mt-6">
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition">
            Find a Pro
          </button>
          <button className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition">
            Become a pro
          </button>
        </div>
      </div>

      <img
        src="/landing8.jpeg"
        alt="Hero Image"
        className="w-full md:h-full object-contain hidden md:flex"
      />
    </div>
  );
}

export default HeroSection;
