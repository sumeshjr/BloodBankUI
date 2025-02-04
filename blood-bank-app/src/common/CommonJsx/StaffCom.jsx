import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css"; // Ensure the CSS file path is correct
import "../css/responsive.css";
import sliderImg from "../images/slider-img.png";
import Slider from "./Slider";

const StaffCom = () => {
  return (
    <div>
      <Slider />
      <section className="about_section layout_padding-bottom">
        <div className="container">
          <div className="row">
            <br />
            <div className="row-4">
              <div className="detail-box text-center">
                <div className="">
                  <div className="info-box">
                    <h3>Create Blood Request</h3>
                    <p>Submit a new blood request to help patients in need.</p>
                    <a href="/requestStaff" className="btn btn-primary">
                      Go to Create Request
                    </a>
                  </div>
                </div>
                <br />
                <div className="">
                  <div className="info-box">
                    <h3>View My Requests</h3>
                    <p>
                      Check the status and details of your submitted blood
                      requests.
                    </p>
                    <a href="/viewMyRequestStaff" className="btn btn-secondary">
                      Go to My Requests
                    </a>
                  </div>
                </div>
                <br />
                <div className="">
                  <div className="info-box">
                    <h3>View All Requests</h3>
                    <p>
                      See all blood requests that have been submitted in the
                      system.
                    </p>
                    <a href="/viewRequestStaff" className="btn btn-secondary">
                      Go to All Requests
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StaffCom;
