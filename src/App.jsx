import React from "react";
import ProviderProfilePage from "./Pages/ProviderProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import Footer from "./Components/Footer";
import BookingsPage from "./Pages/BookingsPage";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import ServicesProviderPage from "./Components/Services/ServicesProviderPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
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
      <Routes>
        <Route path="/" element={<ServicesProviderPage />}></Route>
        <Route path="services/:category?" element={<ServicesProviderPage />} />
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;
