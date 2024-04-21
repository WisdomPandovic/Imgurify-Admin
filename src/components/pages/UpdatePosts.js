import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Button,  } from "react-bootstrap";
import SideBar from "../SideBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function UpdatePosts() {
  const navigate = useNavigate();
  const { _id } = useParams();
  console.log("_id parameter:", _id);
  const [updatepost, setUpdatepost] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3007/post/" + _id)
      .then((resp) => resp.json())
      .then((data) => {
        setUpdatepost(data);
      });
  }, []);

  // const updatePost = (e) => {
  //     e.preventDefault();
  //     axios.put("http://localhost:3007/post/" + _id, updatepost)
  //         .then(res => {
  //             // Show success toast
  //             toast.success("Data update successful !!!", {
  //                 onClose: () => {
  //                     // Navigate after showing the toast
  //                     navigate("/imgurifyPost");
  //                 }
  //             });
  //         })
  //         .catch(error => {
  //             // Handle error if needed
  //             console.error("Error updating post:", error);
  //             // Show error toast
  //             toast.error("Error updating post. Please try again.");
  //         });
  // }

  const updatePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage); // Append the selected image file
    formData.append("title", updatepost.title);
    formData.append("description", updatepost.description);
    formData.append("tag", updatepost.tag);

    axios
      .put("http://localhost:3007/post/" + _id, formData)
      .then((res) => {
        // Show success toast
        toast.success("Data update successful !!!", {
          onClose: () => {
            // Navigate after showing the toast
            navigate("/imgurifyPost");
          },
        });
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error updating post:", error);
        // Show error toast
        toast.error("Error updating post. Please try again.");
      });
  };

  const [tags, setTags] = useState([]);

  // Fetch tags from API
  useEffect(() => {
    fetchTags(); // Function to fetch tags
  }, []);

  const fetchTags = () => {
    // Perform API call to fetch tags
    axios
      .get("http://localhost:3007/tag")
      .then((response) => {
        // Assuming response.data is an array of tag objects with properties like _id and name
        setTags(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
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
                  <h2 className="signin-1 ">Update Post</h2>
                  <Form onSubmit={updatePost}>
                    <div
                      className="form-control"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      <Form.Group
                        controlId="formUsername"
                        style={{ marginTop: "10px", marginBottom: "20px" }}
                      >
                        <Form.Label>Image :</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(e) => setSelectedImage(e.target.files[0])}
                        />
                      </Form.Group>
                    </div>

                    <div
                      className="form-control"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      <Form.Group
                        controlId="formUsername"
                        style={{ marginTop: "10px", marginBottom: "20px" }}
                      >
                        <Form.Label>Title :</Form.Label>
                        <Form.Control
                          type="text"
                          value={updatepost.title}
                          onChange={(e) =>
                            setUpdatepost({
                              ...updatepost,
                              title: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </div>

                    <div
                      className="form-control"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Description :</Form.Label>
                        <Form.Control
                          type="text"
                          value={updatepost.description}
                          onChange={(e) =>
                            setUpdatepost({
                              ...updatepost,
                              description: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </div>

                    {/* <div className="form-control" style={{ marginTop: '10px', marginBottom: '20px' }}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Tag</Form.Label>
                                    <Form.Control type="text" value={updatepost.tag} onChange={(e) => setUpdatepost({ ...updatepost, tag: e.target.value })}/>
                                </Form.Group>
                           </div> */}

                    <div
                      className="form-control"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      <Form.Group controlId="formEmail">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control
                          as="select"
                          value={updatepost.tag}
                          onChange={(e) =>
                            setUpdatepost({
                              ...updatepost,
                              tag: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Tag</option>{" "}
                          {/* Add an empty option for better usability */}
                          {tags.map((tag) => (
                            <option key={tag._id} value={tag.name}>
                              {tag.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>

                    {/* <div className="form-control" style={{ marginTop: '10px', marginBottom: '20px' }}>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                                </Form.Group>
                            </div>

                            <div className="form-control" style={{ marginTop: '10px', marginBottom: '20px' }}>
                            <Form.Group controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
    <option value="user">User</option>
    <option value="admin">Admin</option>
                                </Form.Control>
                            </Form.Group>
                            </div> */}

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

export default UpdatePosts;
