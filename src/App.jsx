import React, { useEffect } from "react";
import ProviderProfilePage from "./Pages/ProviderProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import Footer from "./Components/Footer";
import BookingsPage from "./Pages/BookingsPage";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import ServicesProviderPage from "./Components/Services/ServicesProviderPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { PrivateRoute } from "./Components/Authentication/PrivateRoute";
import CategoryFilter from "./Components/Services/CategoryFilter";

const App = () => {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  // return (
  //   <>
  //     <Header></Header>
  //     {/* <BookingsPage></BookingsPage> */}
  //     <HomePage></HomePage>
  //     <Footer></Footer>
  //   </>
  // );
  // return <ProviderProfilePage></ProviderProfilePage>;

  return (
    <>
      <Header></Header>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="services/:category"
          element={
            <PrivateRoute>
              <CategoryFilter></CategoryFilter>
              <ServicesProviderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="bookings/"
          element={
            <PrivateRoute>
              <BookingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="user/"
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="profile/:id"
          element={
            <PrivateRoute>
              <ProviderProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;
