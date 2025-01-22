import React from "react";
import ReceiverNav from "./ReceiverNav";
import BloodRequest from "../../common/CommonJsx/BloodRequest";

const BloodReqReceiver = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  return (
    <div>
      <ReceiverNav />
      {userId ? (
        <BloodRequest userId={userId} />
      ) : (
        <p>Please log in to make a blood request.</p>
      )}
    </div>
  );
};

export default BloodReqReceiver;
