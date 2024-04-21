import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Button,} from "react-bootstrap";
import SideBar from "../SideBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function UpdateUsers() {
  const navigate = useNavigate();
  const { _id } = useParams();
  console.log("_id parameter:", _id);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:3007/users/" + _id)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  const updateUser = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3007/users/" + _id, user)
      .then((res) => {
        // Show success toast
        toast.success("Data update successful !!!", {
          onClose: () => {
            // Navigate after showing the toast
            navigate("/imgurifyUsers");
          },
        });
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error updating user:", error);
        // Show error toast
        toast.error("Error updating user. Please try again.");
      });
  };

  return (
    <Container fluid className="profile">
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={10} className="bg-deems">
          <Container fluid>
            <Row style={{ marginTop: "10px", margin: "20px" }}>
              <Col md={11} style={{ margin: "20px" }}>
                <div>
                  <h2 className="signin-1 ">Update User</h2>
                  <Form onSubmit={updateUser}>
                    <div
                      className="form-control"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      <Form.Group
                        controlId="formUsername"
                        style={{ marginTop: "10px", marginBottom: "20px" }}
                      >
                        <Form.Label>Username :</Form.Label>
                        <Form.Control
                          type="text"
                          value={user.username}
                          onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                          }
                        />
                      </Form.Group>
                    </div>

                    <div
                      className="form-control"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number :</Form.Label>
                        <Form.Control
                          type="text"
                          value={user.phoneNumber}
                          onChange={(e) =>
                            setUser({ ...user, phoneNumber: e.target.value })
                          }
                        />
                      </Form.Group>
                    </div>

                    <div
                      className="form-control"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </Form.Group>
                    </div>

                    <div
                      className="form-control"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                          as="select"
                          value={user.role}
                          onChange={(e) =>
                            setUser({ ...user, role: e.target.value })
                          }
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </Form.Control>
                      </Form.Group>
                    </div>

                    <div className="form-control">
                      <div className="admin-form-btn d-flex justify-content-evenly">
                        <Button type="submit">Update</Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default UpdateUsers;
