import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import home from "../../assets/home.jpg";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {

  return (
    <Container className=" mt-5">
      <Row>
        <Col xs={12} md={6} className="text-center">
          <h1 className="my-2 ">CODENEST</h1>
          <h2 className="my-4 ">A Doubt Solving Platform</h2>
          <p className="mt-4">
            Find the answers to your technical question and help others by
            answering theirs questions. CodeNest is a community-based space to
            find and contribute answers to technical challenges.
          </p>
          <LinkContainer to="/questions">
            <Button>Get Started</Button>
          </LinkContainer>
        </Col>
        <Col xs={12} md={6}>
          <img
            src={home}
            alt="img not available"
            style={{ maxWidth: "100%" ,height:'auto',display:'block',verticalAlign:'middle' }}
          />
        </Col>
      </Row>
    </Container>
  );
}
