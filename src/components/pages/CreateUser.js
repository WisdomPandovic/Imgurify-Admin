import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SideBar from "../SideBar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [adminUser, setAdminUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleAdminUserInputChange = (event) => {
    const { name, value } = event.target;
    setAdminUser({ ...adminUser, [name]: value });
  };

  const handleNormalUserSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username: user.username,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
    };

    if (
      user.username === "" ||
      user.email === "" ||
      user.password === "" ||
      user.phoneNumber === ""
    ) {
      setErr(true);
    } else {
      setErr(false);
      axios
        .post("http://localhost:3007/users", userData)
        .then((resp) => {
          console.log(resp.data);
          setErr(false);
          toast.success("Sign up successful.");

          setUser({
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Sign up unsuccessful. Please try again.");
        });
    }
  };

  const handleAdminUserSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username: adminUser.username,
      phoneNumber: adminUser.phoneNumber,
      email: adminUser.email,
      password: adminUser.password,
    };

    if (
      adminUser.username === "" ||
      adminUser.email === "" ||
      adminUser.password === "" ||
      adminUser.phoneNumber === ""
    ) {
      setErr(true);
    } else {
      setErr(false);
      axios
        .post("http://localhost:3007/admin-users", userData)
        .then((resp) => {
          console.log(resp.data);
          setErr(false);
          toast.success("Sign up successful.");

          setAdminUser({
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Sign up unsuccessful. Please try again.");
        });
    }
  };

  return (
    <Container fluid>
      {/* <div className='mt-3'>
                            <div className="d-flex justify-content-end my-2 my-lg-0 ">
                               <FaEnvelope className='nav-icons text-dark' style={{ fontSize: '30px' }}/> 
                               <FaBell onClick={() => setIsBarOpen(true)} className='nav-icons text-dark' style={{ fontSize: '30px' }}/> 
                               <FaSignOutAlt onClick={handleLogout} className='nav-icons text-danger' style={{ fontSize: '30px' }}/>
                            </div>
                            {isBarOpen && (
                            <div className='barPopup'>
                                <div className='popup-flex'>
                                    <div className='popup-welcome'>Notifications</div>
                                    <div onClick={() => setIsBarOpen(false)} className='popup-welcomeX'>X</div>
                                </div>

                                <div className='notification'>
                                    <Notification/>
                                </div>
                   
                            </div>
                        )}
            </div> */}
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={10} className="bg-deems">
          <Container fluid>
            <Row style={{ marginTop: "10px", margin: "20px" }}>
              <Col md={5} style={{ paddingTop: "10px" }}>
                <h2 className="signin-1 ">Create User</h2>
                <Form onSubmit={handleNormalUserSubmit}>
                  <Form.Group
                    controlId="normalUsername"
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={user.username}
                      onChange={handleInputChange}
                    />
                    {err === true && user.username === "" ? (
                      <span>Username required</span>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    controlId="normalEmail"
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                    {err === true && user.email === "" ? (
                      <span>Email required</span>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    controlId="normalPassword"
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                    />
                    {err === true && user.password === "" ? (
                      <span>Password required</span>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    controlId="normalPhoneNumber"
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter phone Number"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleInputChange}
                    />
                    {err === true && user.phoneNumber === "" ? (
                      <span>Phone number required</span>
                    ) : null}
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ margin: "10px", width: "100%" }}
                  >
                    Create User
                  </Button>
                </Form>
              </Col>

              <Col
                md={1}
                className="d-flex justify-content-center align-items-center"
              >
                <div
                  style={{
                    height: "100%",
                    borderRight: "1px solid #6f6f6f",
                    marginTop: "20px",
                  }}
                ></div>
              </Col>

              <Col md={5} style={{ paddingTop: "10px" }}>
                <h2 className="signin-1 ">Create Admin User</h2>
                <Form onSubmit={handleAdminUserSubmit}>
                  <Form.Group
                    controlId="adminUsername"
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={adminUser.username} // Add value attribute
                      onChange={handleAdminUserInputChange} // Add onChange event handler
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="adminEmail"
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={adminUser.email} // Add value attribute
                      onChange={handleAdminUserInputChange} // Add onChange event handler
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="adminPassword"
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={adminUser.password} // Add value attribute
                      onChange={handleAdminUserInputChange} // Add onChange event handler
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="adminPhoneNumber"
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter phone Number"
                      name="phoneNumber"
                      value={adminUser.phoneNumber} // Add value attribute
                      onChange={handleAdminUserInputChange} // Add onChange event handler
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ margin: "10px", width: "100%" }}
                  >
                    Create Admin User
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default CreateUser;
