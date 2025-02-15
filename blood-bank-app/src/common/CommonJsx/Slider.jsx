import React from "react";
import { Carousel, Container } from "react-bootstrap";
import image2 from "../coverimages/2.jpg";
import image3 from "../coverimages/3.jpg";
import image4 from "../coverimages/4.jpg";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const navigate = useNavigate();
  // Function to handle the button click and redirect to the Register page
  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className="slider-container">
      <Carousel
        className="full-screen-carousel"
        controls={true}
        indicators={true}
      >
        {/* Slide 1 */}
        <Carousel.Item>
          <img
            className="d-block w-100 custom-carousel-image"
            src={image2}
            alt="Be a Hero"
          />
          <Carousel.Caption>
            <button
              className="btn custom-get-started btn-danger  "
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            <h3>Be a Hero</h3>
            <p>Every donation brings hope to those in need.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <img
            className="d-block w-100 custom-carousel-image"
            src={image3}
            alt="Join Our Mission"
          />
          <Carousel.Caption>
            <button
              className="btn custom-get-started btn-danger "
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            <h3>Join Our Mission</h3>
            <p>Together, we can make a difference in our community.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <img
            className="d-block w-100 custom-carousel-image"
            src={image4}
            alt="Save Lives"
          />
          <Carousel.Caption>
            <button
              className="btn custom-get-started btn-danger "
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            <h3>Save Lives</h3>
            <p>Your blood donation can give someone another chance at life.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
