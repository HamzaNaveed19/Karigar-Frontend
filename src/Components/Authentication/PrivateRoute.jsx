import { useState, useEffect } from "react";
import { AuthModal } from "./AuthModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../Redux/Slices/authSlice";
import LoadingSpinner from "../../UI/LoadingSpinner";

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
      console.log("CHECKING INITIALIZATION!");
      dispatch(checkAuth());
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (status === "failed" || status === "succeeded" || !isAuthenticated) {
      setShowAuthModal(!isAuthenticated);
    }
  }, [isAuthenticated, status, navigate]);

  const handleClose = () => {
    setShowAuthModal(false);
    navigate("/");
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (!isAuthenticated && !isInitialized) {
    return <LoadingSpinner />;
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
};
