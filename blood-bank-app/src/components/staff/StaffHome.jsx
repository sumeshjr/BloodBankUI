import React from "react";
import StaffNavbar from "./StaffNavbar";
import Slider from "../../common/CommonJsx/Slider";
import { toast, ToastContainer } from "react-toastify";

const StaffHome = () => {
  React.useEffect(() => {
    toast.success("Welcome to the Staff Home!");
  }, []);
  return (
    <div>
      <ToastContainer />
      <StaffNavbar />
      <Slider />
    </div>
  );
};

export default StaffHome;
