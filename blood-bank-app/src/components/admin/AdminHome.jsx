import React from "react";
import AdminNavbar from "./AdminNavbar";
import Slider from "../../common/CommonJsx/Slider";
import { toast, ToastContainer } from "react-toastify";

const AdminHome = () => {
  React.useEffect(() => {
    toast.success("Welcome to the Admin Home!");
  }, []);
  return (
    <div>
      <ToastContainer />
      <AdminNavbar />
      <Slider />
    </div>
  );
};

export default AdminHome;
