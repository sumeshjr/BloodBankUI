import React from "react";
import StaffNavbar from "./StaffNavbar";
import BloodRequest from "../../common/CommonJsx/BloodRequest";

const BloodReqStaff = () => {
  const userId = localStorage.getItem("userId");
  return (
    <div>
      <StaffNavbar />
      <BloodRequest userId={userId} />
    </div>
  );
};

export default BloodReqStaff;
