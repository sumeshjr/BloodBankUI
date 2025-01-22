import React from "react";
import BloodRequest from "../../common/CommonJsx/BloodRequest";
import DonorNav from "./DonorNav";

const BloodReqDonor = () => {
  // Get the current logged-in user's userId from localStorage
  const userId = localStorage.getItem("userId");
  console.log(userId);

  return (
    <div>
      <DonorNav />
      {userId ? (
        <BloodRequest userId={userId} />
      ) : (
        <p>Please log in to make a blood request.</p>
      )}
    </div>
  );
};

export default BloodReqDonor;
