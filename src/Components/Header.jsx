import React, { useState } from "react";
import { Search, User, HardHat, X, CalendarFold } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Notifications from "./Notifications";
import { AuthModal } from "./Authentication/AuthModal";

function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");

  const renderLogo = () => (
    <Link to="/">
      <div className="flex items-center gap-2">
        <HardHat className="h-6 w-6 text-emerald-600" />
        <span className="text-xl font-bold text-emerald-600">Karigar</span>
      </div>
    </Link>
  );

  const renderSearchInput = (isMobile = false) => (
    <div
      className={`relative ${
        isMobile
          ? "flex-1"
          : "hidden sm:flex flex-1 justify-center px-2 sm:px-6"
      }`}
    >
      <Search className="absolute left-10  top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input
        type="search"
        placeholder="Search for services..."
        autoFocus={isMobile}
        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
      />
      {isMobile && (
        <button
          className="ml-2 p-2 rounded-full hover:bg-gray-100"
          onClick={() => setShowMobileSearch(false)}
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </div>
  );

  const renderAuthButtons = () =>
    isAuthenticated ? (
      <div className="flex items-center">
        <button
          className="sm:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={() => setShowMobileSearch(true)}
        >
          <Search className="h-5 w-5 text-gray-600" />
        </button>

        <Notifications />

        <Link to="/bookings">
          <Button
            variant="ghost"
            size="sm"
            className="md:flex items-center gap-1 mr-3"
          >
            <CalendarFold className="h-5 w-5" />
            <span className="hidden md:block">Bookings</span>
          </Button>
        </Link>

        <Button variant="outline" size="sm" className="mr-3">
          Become a Provider
        </Button>

        <Link to="user/">
          <Button size="sm" className="flex items-center">
            <User className="h-4 w-5" />
          </Button>
        </Link>
      </div>
    ) : (
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex items-center"
          onClick={() => {
            setMode("login");
            setShowModal(true);
          }}
        >
          Login
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => {
            setMode("signup");
            console.log(mode);
            setShowModal(true);
          }}
        >
          Sign Up
        </Button>
      </div>
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {showMobileSearch ? (
          renderSearchInput(true)
        ) : (
          <>
            {renderLogo()}
            {isAuthenticated && renderSearchInput()}
            {renderAuthButtons()}
          </>
        )}
      </div>

      <AuthModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setMode("login");
        }}
        mode={mode}
        onModeChange={(newMode) => {
          setMode(newMode);
          setFormError("");
          setFormSuccess("");
          setSignupStep(1);
        }}
      />
    </header>
  );
}

export default Header;
