import React, { useState } from "react";
import { Search, User, Calendar, HardHat, X } from "lucide-react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {!showMobileSearch ? (
          <>
            <Link to={"/"}>
              <div className="flex items-center gap-2">
                <HardHat className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold text-emerald-600">
                  Karigar
                </span>
              </div>
            </Link>

            <div className="hidden sm:flex flex-1 items-center justify-center px-2 sm:px-6">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search for services..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button
                className="sm:hidden p-2 rounded-full hover:bg-gray-100"
                onClick={() => setShowMobileSearch(true)}
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              <Link to={"/bookings"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Bookings</span>
                </Button>
              </Link>

              <Button variant="outline" size="sm">
                Become a Provider
              </Button>

              <Link to={"profile/"}>
                <Button size="sm" className="flex items-center">
                  <User className="h-4 w-5" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                placeholder="Search for services..."
                autoFocus
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
              />
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowMobileSearch(false)}
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
