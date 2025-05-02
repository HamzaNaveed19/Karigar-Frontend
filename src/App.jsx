import React from "react";
import ProviderProfilePage from "./Pages/ProviderProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import Footer from "./Components/Footer";
import BookingsPage from "./Pages/BookingsPage";
import HomePage from "./Pages/HomePage";
import ServiceProviderDashboard from "./Pages/ServiceProviderDashboard";
import Header from "./Components/Header";
import Bookings from "./Pages/Bookings";

const App = () => {
  return (
    <>
      {/* <Header></Header> */}
      {/* <BookingsPage></BookingsPage> */}
      {/* <HomePage></HomePage> */}

      <Bookings/>
      {/* <Footer></Footer> */}
    </>
  );
  // return <ProviderProfilePage></ProviderProfilePage>;
};

export default App;
