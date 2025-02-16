import React from "react";
import "./Home.css";
import CustomNavbar from "./Navbar";
import Slider from "../common/CommonJsx/Slider";

const Home = () => {
  const API_URL = import.meta.env.VITE_BLOOD_BANK_URL;
  console.log(API_URL);

  return (
    <div>
      <CustomNavbar />
      <br />
      <br />
      {/* Slider Section */}
      <Slider />
    </div>
  );
};

export default Home;
