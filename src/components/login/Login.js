import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Card, Button, Container } from "react-bootstrap";
import { login, KEY_ACCESS_TOKEN } from "../../api/api";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/AuthSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setuser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(user);
      if (res.data.statusCode === 200) {
        toast.success("User Loggedin Successfully");
        setTimeout(() => {
          localStorage.setItem(KEY_ACCESS_TOKEN, res.data.result.accessToken);
          localStorage.setItem("username", res.data.result.user);
          dispatch(authAction.login(res.data.result.userid));
          navigate("/");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Container fluid>
        <Toaster position="top-center" />
        <Row className=" vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase d-flex justify-content-center ">
                    Login
                  </h2>
                  <p className=" mb-5 d-flex justify-content-center">
                    Please enter your login and password!
                  </p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          type="email"
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
                          value={user.password}
                          onChange={handleChange}
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <Link className="text-primary" to="/forgot">
                            Forgot password?
                          </Link>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary fw-bold">
                          Sign Up
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

export default Login;
