import React from "react";
import { Carousel, Container } from "react-bootstrap";
import image1 from "../coverimages/1.jpg";
import image2 from "../coverimages/2.jpg";
import image3 from "../coverimages/3.jpg";
import image4 from "../coverimages/4.jpg";

const Slider = () => {
  return (
    <div>
      <Container className="py-5">
        {/* Bootstrap Carousel */}
        <Carousel className="mt-5">
          {/* Slide 1 */}
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-image"
              src={image1}
              alt="Save Lives"
            />
            <Carousel.Caption>
              <h3>Save Lives</h3>
              <p>
                Your blood donation can give someone another chance at life.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          {/* Slide 2 */}
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-image"
              src={image2}
              alt="Be a Hero"
            />
            <Carousel.Caption>
              <h3>Be a Hero</h3>
              <p>Every donation brings hope to those in need.</p>
            </Carousel.Caption>
          </Carousel.Item>

          {/* Slide 3 */}
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-image"
              src={image3}
              alt="Join Our Mission"
            />
            <Carousel.Caption>
              <h3>Join Our Mission</h3>
              <p>Together, we can make a difference in our community.</p>
            </Carousel.Caption>
          </Carousel.Item>

          {/* Slide 3 */}
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-image"
              src={image4}
              alt="Join Our Mission"
            />
            <Carousel.Caption>
              <h3>Join Our Mission</h3>
              <p>Together, we can make a difference in our community.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default Slider;
