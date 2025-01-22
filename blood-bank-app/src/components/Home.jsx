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

  return (
    <div>
      <CustomNavbar />
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
