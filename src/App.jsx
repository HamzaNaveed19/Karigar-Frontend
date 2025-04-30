import React from "react";
import ProviderProfilePage from "./Pages/ProviderProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import Footer from "./Components/Footer";
import BookingsPage from "./Pages/BookingsPage";
import HomePage from "./Pages/HomePage";

const App = () => {
  return (
    <>
      {/* <BookingsPage></BookingsPage> */}
      <HomePage></HomePage>
      <Footer></Footer>
    </>
  );
  //return <ProviderProfilePage></ProviderProfilePage>;
};

export default App;
