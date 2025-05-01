import React from "react";
import ProviderProfilePage from "./Pages/ProviderProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import Footer from "./Components/Footer";
import BookingsPage from "./Pages/BookingsPage";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import ServicesProviderPage from "./Components/Services/ServicesProviderPage";

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
      <ServicesProviderPage category={"Plumber"}></ServicesProviderPage>
      <Footer></Footer>
    </>
  );
};

export default App;
