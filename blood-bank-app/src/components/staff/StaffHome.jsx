import React from "react";
import StaffNavbar from "./StaffNavbar";
import Slider from "../../common/CommonJsx/Slider";
import { toast, ToastContainer } from "react-toastify";
import StaffCom from "../../common/CommonJsx/StaffCom";

const StaffHome = () => {
  React.useEffect(() => {
    toast.success("Welcome to the Staff Home!");
  }, []);
  return (
    <div>
      <ToastContainer />
      <StaffNavbar />
      <StaffCom />
    </div>
  );
};

export default StaffHome;
