import React from "react";
import StaffNavbar from "./StaffNavbar";
import BloodRequests from "../../common/CommonJsx/BloodRequests";
import AllBloodRequests from "../../common/CommonJsx/AllBloodRequests";

const ViewReqStaff = () => {
  return (
    <div>
      {" "}
      <StaffNavbar />
      <AllBloodRequests />
    </div>
  );
};

export default ViewReqStaff;
