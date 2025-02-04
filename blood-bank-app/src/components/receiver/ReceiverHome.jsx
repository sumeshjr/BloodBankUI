import React from "react";
import ReceiverNav from "./ReceiverNav";
import Slider from "../../common/CommonJsx/Slider";
import { toast, ToastContainer } from "react-toastify";
import HeroSection from "../../common/CommonJsx/HeroSection";

const ReceiverHome = () => {
  React.useEffect(() => {
    toast.success("Welcome to the Receiver Home!");
  }, []);
  return (
    <div>
      <ToastContainer />
      <ReceiverNav />
      <HeroSection />
    </div>
  );
};

export default ReceiverHome;
