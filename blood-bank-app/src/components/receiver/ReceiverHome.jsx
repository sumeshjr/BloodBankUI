import React from "react";
import ReceiverNav from "./ReceiverNav";
import Slider from "../../common/CommonJsx/Slider";
import { toast, ToastContainer } from "react-toastify";

const ReceiverHome = () => {
  React.useEffect(() => {
    toast.success("Welcome to the Receiver Home!");
  }, []);
  return (
    <div>
      <ToastContainer />
      <ReceiverNav />
      <Slider />
    </div>
  );
};

export default ReceiverHome;
