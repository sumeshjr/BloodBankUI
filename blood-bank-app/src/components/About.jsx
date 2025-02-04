import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CustomNavbar from "./Navbar";
import CountUp from "react-countup";
import about1 from "../common/coverimages/about1.avif";
import about2 from "../common/coverimages/about2.avif";
import about3 from "../common/coverimages/about3.avif";

const About = () => {
  return (
    <div>
      <CustomNavbar />
      <br />
      <br />
      <Container className="py-5">
        <h1 className="text-center">About Us</h1>
        <p className="mt-4 text-center">
          At Vital Drops, our mission is to ensure a reliable and safe supply of
          blood for those in need. We work tirelessly to connect donors and
          patients, fostering a community of care and compassion. Your blood
          donations help save lives every day.
        </p>
        <p className="text-center">
          Join us in our mission and learn more about how you can contribute to
          this life-saving cause.
        </p>

        {/* Statistics Section with CountUp and Images */}
        <Row className="mt-5 text-center">
          <Col sm={12} md={4}>
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
              <Card.Img src={about1} variant="top" alt="Blood Donation" />
              <Card.Body>
                <Card.Title>
                  <h3>
                    <CountUp start={0} end={10000} duration={2} separator="," />
                    +
                  </h3>
                </Card.Title>
                <Card.Text>Donations</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
              <Card.Img src={about2} variant="top" alt="Blood Receiver" />
              <Card.Body>
                <Card.Title>
                  <h3>
                    <CountUp start={0} end={1000} duration={2} separator="," />+
                  </h3>
                </Card.Title>
                <Card.Text>Receivers</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
              <Card.Img src={about3} variant="top" alt="Vital Drops Staff" />
              <Card.Body>
                <Card.Title>
                  <h3>
                    <CountUp start={0} end={50} duration={2} />+
                  </h3>
                </Card.Title>
                <Card.Text>Staff Members</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section to Add More Information */}
        <Row className="mt-5 text-center">
          <Col sm={12} md={6}>
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
              <Card.Body>
                <h3>Why Donate Blood?</h3>
                <p>
                  Donating blood is a simple and selfless act that can save
                  lives. A single donation can help multiple patients in need,
                  from accident victims to cancer patients. Your blood donation
                  is critical to our mission to provide life-saving blood to
                  those in need.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6}>
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
              <Card.Body>
                <h3>How We Help</h3>
                <p>
                  Our Vital Drops plays a crucial role in ensuring that blood is
                  available for emergencies, surgeries, and treatments. We
                  connect generous blood donors with patients in need,
                  facilitating a seamless donation process that helps save
                  countless lives every year.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
