import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import CustomNavbar from "./Navbar";
import Slider from "../common/CommonJsx/Slider";

const Home = () => {
  const navigate = useNavigate();

  // Function to handle the button click and redirect to the Register page
  const handleGetStarted = () => {
    navigate("/register");
  };

  const API_URL = import.meta.env.VITE_BLOOD_BANK_URL;
  console.log(API_URL);

  return (
    <div>
      <CustomNavbar />
      <br />
      <br />
      {/* Slider Section */}
      <Slider />
      {/* Hero Section */}
      <div className="hero-section text-center text-white">
        <div className="hero-content">
          <button
            className="btn btn-danger btn-lg mt-3"
            onClick={handleGetStarted} // Trigger the redirect
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
