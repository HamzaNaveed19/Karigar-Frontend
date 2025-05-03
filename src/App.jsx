import React, { useEffect } from "react";
import ProviderProfilePage from "./Pages/ProviderProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import Footer from "./Components/Footer";
import BookingsPage from "./Pages/BookingsPage";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import ServicesProviderPage from "./Components/Services/ServicesProviderPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthModal } from "./Components/Authentication/AuthModal";

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
      <AuthModal isOpen={true}></AuthModal>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="services/:category?" element={<ServicesProviderPage />} />
        <Route path="bookings/" element={<BookingsPage />} />
        <Route path="user/" element={<UserProfilePage />} />
        <Route path="profile/" element={<ProviderProfilePage />} />
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;
