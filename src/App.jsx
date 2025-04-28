import React from "react";
import ProviderProfilePage from "./Pages/ProviderProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <>
      <UserProfilePage></UserProfilePage>
      <Footer></Footer>
    </>
  );
  //return <ProviderProfilePage></ProviderProfilePage>;
};

export default App;
