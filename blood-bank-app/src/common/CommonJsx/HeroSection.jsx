import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css"; // Ensure the CSS file path is correct
import "../css/responsive.css";
import sliderImg from "../images/slider-img.png";

const storedUserRole = localStorage.getItem("role");

console.log(storedUserRole);

const requestLink =
  storedUserRole === "DONOR" ? "/requestDonor" : "/requestReceiver";
const viewLink =
  storedUserRole === "DONOR" ? "/viewRequestsDon" : "/viewRequestsRec";

const HeroSection = () => {
  return (
    <div className="hero_area">
      {/* Header Section */}

      {/* Slider Section */}
      <section className="slider_section">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            >
              01
            </li>
          </ol>
          <div className="carousel-inner">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-5 offset-md-1">
                      <div className="detail-box">
                        <h1>Donate Blood, Save Lives</h1>
                        <p>
                          Blood donation is a simple and selfless way to make a
                          significant difference. Each donation has the
                          potential to save multiple lives. Whether you're
                          donating for an emergency, surgery, or for patients
                          with chronic conditions, your contribution is
                          invaluable. Every year, millions of people benefit
                          from the generosity of blood donors.
                        </p>
                        <div className="btn-box">
                          <a href={requestLink} className="btn-1">
                            {storedUserRole === "donor"
                              ? "Create Blood Request"
                              : "Request Blood"}
                          </a>
                          <a href={viewLink} className="btn-2">
                            {storedUserRole === "donor"
                              ? "View Requests"
                              : "View My Requests"}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="offset-md-1 col-md-4 img-container">
                      <div className="img-box">
                        <img src={sliderImg} alt="Blood Donation" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
