import React from "react";
import DonorNav from "./DonorNav";
import Slider from "../../common/CommonJsx/Slider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "../../common/CommonJsx/HeroSection";

const DonorHome = () => {
  React.useEffect(() => {
    toast.success("Welcome to the Donor Home!");
  }, []);
  const userId = localStorage.getItem("userId");
  console.log(userId);
  return (
    <div>
      <ToastContainer />
      <DonorNav />
      <HeroSection />
    </div>
  );
};

export default DonorHome;
