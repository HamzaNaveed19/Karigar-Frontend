import { useState, useEffect } from "react";
import { AuthModal } from "./AuthModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../Redux/Slices/authSlice";

export const PrivateRoute = ({ children }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mode, setMode] = useState("login");
  const { isAuthenticated, status, isInitialized } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isInitialized) {
      //console.log("CALLED CHECEK AUTH");
      dispatch(checkAuth());
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (status === "failed" || status === "succeeded") {
      setShowAuthModal(!isAuthenticated);
    }
  }, [isAuthenticated, status, navigate]);

  const handleClose = () => {
    setShowAuthModal(false);
    navigate("/");
  };

  // Show loading state while checking auth
  if (status === "idle" || status === "loading") {
    return <div>Loading authentication status...</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        {children}
        <AuthModal
          isOpen={showAuthModal}
          onClose={handleClose}
          onLoginSuccess={() => setShowAuthModal(false)}
          mode={mode}
          onModeChange={setMode}
        />
      </>
    );
  }

  return <>{children}</>;
};
