import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Card, Button, Container } from "react-bootstrap";
import { register } from "../../api/api";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.login);
  const [user, setuser] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(user);
      if (res.data.statusCode === 200) {
        let date = new Date();
        let month = date.getMonth() + 1;
        localStorage.setItem("username", user.username);
        localStorage.setItem("since", month + " " + date.getFullYear());
        toast.success("User Registered Successfully");
        // dispatch(login(res.data.result.userid));
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <Container className="mt-4 " fluid>
        <Toaster position="top-center" />
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase d-flex justify-content-center ">
                    Register
                  </h2>
                  <p className=" mb-5 d-flex justify-content-center">
                    Please enter your registeration details!
                  </p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          name="username"
                          type="text"
                          onChange={handleChange}
                          placeholder="Enter username"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          onChange={handleChange}
                          placeholder="Enter email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          onChange={handleChange}
                          placeholder="Password"
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Register
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary fw-bold">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
