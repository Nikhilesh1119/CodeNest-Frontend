import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import { KEY_ACCESS_TOKEN, axiosClient,baseURL } from "../../api/api";
import axios from "axios";
import { authAction } from "../../store/AuthSlice";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  
  const islogin=useSelector(state=>state.auth.isLoggedin);

  const handleLogout = () => {
    axiosClient.post("/user/logout");
    localStorage.removeItem(KEY_ACCESS_TOKEN);
    localStorage.removeItem("username");
    toast.success("Logged out successfully");
    dispatch(authAction.logout());
    navigate("/login");
  };

  const searchQuestion = async (e) => {
    e.preventDefault();
    // const que = document.getElementById("question").value;
    // // console.log(que);
    // return await axios
    //   .get(`${baseURL}/question/search?keyword=${que}`)
    //   .then((que) => {
    //     navigate("/search");
    //   });
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-secondary">
        <Container fluid>
          <img src={logo} alt="noimg" height={"65px"} />
          {/* <Navbar.Brand>CodeNest</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto ms-4 my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/questions">
                <Nav.Link>Questions</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/tags">
                <Nav.Link>Tags</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill "
                aria-label="Search"
              />
              <Button className=" rounded-pill" variant="primary">
                Search
              </Button>
            </Form>
            {islogin || localStorage.getItem('username') ? (
              <LinkContainer to="/">
                <Button
                  className="m-2"
                  variant="outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </LinkContainer>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Button className="m-2 " variant="outline-primary">
                    Login
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button className="me-2" variant="outline-primary">
                    Register
                  </Button>
                </LinkContainer>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
