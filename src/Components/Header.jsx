import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Search, User, HardHat, X, CalendarFold } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Notifications from "./Notifications";
import { AuthModal } from "./Authentication/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../Redux/Slices/authSlice";
import { shallowEqual } from "react-redux";

function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth,
    shallowEqual
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(
          `/services/all?search=${encodeURIComponent(searchQuery.trim())}`
        );
        setSearchQuery("");
        setShowMobileSearch(false);
      }
    },
    [searchQuery, navigate]
  );

  const toggleMobileSearch = useCallback(
    (show) => () => setShowMobileSearch(show),
    []
  );

  const handleAuthModal = useCallback((modalMode) => {
    setMode(modalMode);
    setShowModal(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setShowModal(false);
    setMode("login");
  }, []);

  const renderLogo = useMemo(
    () => (
      <Link to="/">
        <div className="flex items-center gap-2">
          <HardHat className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold text-emerald-600">Karigar</span>
        </div>
      </Link>
    ),
    []
  );

  const renderSearchInput = useCallback(
    (isMobile = false) => (
      <form
        onSubmit={handleSearch}
        className={`relative ${
          isMobile
            ? "flex-1 flex items-center"
            : "hidden sm:flex flex-1 justify-center px-2 sm:px-6"
        }`}
      >
        <Search className="absolute left-10 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="search"
          placeholder="Search for services..."
          autoFocus={isMobile}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
        />
        {isMobile && (
          <button
            type="button"
            className="ml-2 p-2 rounded-full hover:bg-gray-100"
            onClick={toggleMobileSearch(false)}
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </form>
    ),
    [handleSearch, searchQuery, toggleMobileSearch]
  );

  const renderAuthButtons = useMemo(() => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-2">
          <button
            className="sm:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={toggleMobileSearch(true)}
          >
            <Search className="h-5 w-5 text-gray-600" />
          </button>

          <Notifications />

          <Link to="/bookings">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <CalendarFold className="h-5 w-5" />
              <span className="hidden md:block">Bookings</span>
            </Button>
          </Link>

          <Link to="/become-provider">
            <Button variant="outline" size="sm">
              Become a Provider
            </Button>
          </Link>

          <Link to={`/user`}>
            <Button size="sm" className="flex items-center gap-1">
              <User className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => handleAuthModal("login")}>
          Login
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAuthModal("signup")}
        >
          Sign Up
        </Button>
      </div>
    );
  }, [isAuthenticated, toggleMobileSearch, handleAuthModal]);

  return (
    <header className="px-6 sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        {showMobileSearch ? (
          renderSearchInput(true)
        ) : (
          <>
            {renderLogo}
            {isAuthenticated && renderSearchInput()}
            {renderAuthButtons}
          </>
        )}
      </div>

      <AuthModal
        isOpen={showModal}
        onClose={closeAuthModal}
        mode={mode}
        onModeChange={setMode}
      />
    </header>
  );
}

export default React.memo(Header);
