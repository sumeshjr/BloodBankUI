import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./components/About";
import Register from "./components/Register";
import DonorHome from "./components/donor/DonorHome";
import StaffHome from "./components/staff/StaffHome";
import AdminHome from "./components/admin/AdminHome";
import ReceiverHome from "./components/receiver/ReceiverHome";
import "react-toastify/dist/ReactToastify.css";
import BloodReqDonor from "./components/donor/BloodReqDonor";
import BloodReqReceiver from "./components/receiver/BloodReqReceiver";
import ViewReqDon from "./components/donor/ViewReqDon";
import ViewReqRec from "./components/receiver/ViewReqRec";
import BloodReqStaff from "./components/staff/BloodReqStaff";
import ViewReqStaff from "./components/staff/ViewReqStaff";
import BloodRequestsAdmin from "./components/admin/BloodRequestsAdmin";
import MyRequests from "./components/staff/MyRequests";
import UserList from "./components/admin/UserList";
import AdminProfile from "./components/admin/AdminProfile";
import StaffProfile from "./components/staff/StaffProfile";
import ReceiverProfile from "./components/receiver/ReceiverProfile";
import DonorProfile from "./components/donor/DonorProfile";
import RegisterStaff from "./components/admin/RegisterStaff";
import BloodInfo from "./components/admin/BloodInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor" element={<DonorHome />} />
        <Route path="/receiver" element={<ReceiverHome />} />
        <Route path="/staff" element={<StaffHome />} />
        <Route path="/requestDonor" element={<BloodReqDonor />} />
        <Route path="/requestReceiver" element={<BloodReqReceiver />} />
        <Route path="/requestStaff" element={<BloodReqStaff />} />
        <Route path="/viewRequestsDon" element={<ViewReqDon />} />
        <Route path="/viewRequestsRec" element={<ViewReqRec />} />
        <Route path="/viewRequestStaff" element={<ViewReqStaff />} />
        <Route path="/viewMyRequestStaff" element={<MyRequests />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/requestsAdmin" element={<BloodRequestsAdmin />} />
        <Route path="/bloodInfo" element={<BloodInfo />} />
        <Route path="/registerStaff" element={<RegisterStaff />} />
        <Route path="/allUsers" element={<UserList />} />
        <Route path="/adminProfile" element={<AdminProfile />} />
        <Route path="/staffProfile" element={<StaffProfile />} />
        <Route path="/receiverProfile" element={<ReceiverProfile />} />
        <Route path="/donorProfile" element={<DonorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
