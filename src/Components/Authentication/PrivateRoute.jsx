import { useState, useEffect } from "react";
import { AuthModal } from "./AuthModal";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAuthenticated = true;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Authenticating...");
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  });

  const handleClose = () => {
    setShowAuthModal(false);
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <>
        {children}
        <AuthModal
          isOpen={showAuthModal}
          onClose={handleClose}
          onLoginSuccess={() => setShowAuthModal(false)}
          mode={"login"}
        />
      </>
    );
  }
  return <>{children}</>;
};
