import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CustomNavbar from "./Navbar";
import CountUp from "react-countup"; // Import CountUp for the animated counting effect

const About = () => {
  return (
    <div>
      <CustomNavbar />
      <Container className="py-5">
        <h1 className="text-center">About Us</h1>
        <p className="mt-4 text-center">
          At Blood Bank, our mission is to ensure a reliable and safe supply of
          blood for those in need. We work tirelessly to connect donors and
          patients, fostering a community of care and compassion. Your blood
          donations help save lives every day.
        </p>
        <p className="text-center">
          Join us in our mission and learn more about how you can contribute to
          this life-saving cause.
        </p>

        <Row className="mt-5 text-center">
          <Col sm={12} md={4}>
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
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
      </Container>
    </div>
  );
};

export default About;
