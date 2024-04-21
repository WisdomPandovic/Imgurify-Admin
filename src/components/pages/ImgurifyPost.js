import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import SideBar from "../SideBar";
import {
  FaEnvelope,
  FaBell,
  FaSignOutAlt,
  FaUser,
  FaColumns,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFolder } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { MdDelete } from "react-icons/md";

function ImgurifyPost() {
  const [post, setPost] = useState([]);

  // useEffect(() => {
  //     fetch("http://localhost:3007/post")
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //         setPost(data);
  //     });
  // },[]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3007/post");
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("An error occurred while fetching posts");
    }
  };

  function formatDate(timestamp) {
    // console.log('Timestamp:', timestamp);

    if (!timestamp) {
      return "Never";
    }

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year}  ${hours}:${minutes}`;
  }

  const onDelete = async (_id) => {
    try {
      await axios.delete("http://localhost:3007/post/" + _id);
      setPost((prevPost) => prevPost.filter((post) => post._id !== _id));
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("An error occurred while deleting the post");
    }
    console.log(_id);
  };

  const handleHidePost = async (_id) => {
    try {
      await axios.put(`http://localhost:3007/post/${_id}/hide`, {
        hidden: true,
      });
      // Filter out the hidden post from the current state
      const updatedPosts = post.filter((p) => p._id !== _id);
      // Update the state with the filtered posts
      setPost(updatedPosts);
      toast.success("Post hidden successfully");
    } catch (error) {
      console.error("Error hiding post:", error);
      toast.error("An error occurred while hiding the post");
    }
  };

  const onUnhide = async (_id) => {
    try {
      await axios.put(`http://localhost:3007/post/${_id}/unhide`, {
        hidden: false,
      });
      fetchPosts(); // Refresh posts after unhide
      toast.success("Post unhidden successfully");
    } catch (error) {
      console.error("Error unhiding post:", error);
      toast.error("An error occurred while unhiding the post");
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={2}>
            <SideBar />
          </Col>
          <Col md={10} className="bg-deem">
            <Container fluid>
              <div className="users-table">
                <h2 className="signin-1 text-uppercase">Imgurify Post Lists</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Images</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Tag</th>
                      <th>Comment</th>
                      <th>Likes</th>
                      <th>Options</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {post.map((post, index) => (
                      // !post.hidden && (
                      <tr key={post._id}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={post.image} alt="" />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td>{post.tag.name}</td>
                        <td>{post.comments.length}</td>
                        <td>{post.likes.length}</td>
                        {/* <td>{formatDate(user.lastLogin)}</td> */}
                        <td>
                          {/* <Link to={`/updatePost/${post._id}`}>
                      <button style={{ backgroundColor: 'skyblue', marginRight: '10px', padding: '5px', border:'none' }}>Edit</button>
                    </Link> */}

                          <button
                            style={{
                              backgroundColor: "red",
                              padding: "5px",
                              border: "none",
                              color: "white",
                            }}
                            onClick={() => onDelete(post._id)}
                          >
                            <MdDelete className="delete-icon" />
                          </button>
                        </td>
                        <td className="d-flex">
                          <button
                            style={{
                              backgroundColor: "purple",
                              padding: "5px",
                              border: "none",
                              color: "white",
                            }}
                            onClick={() => handleHidePost(post._id)}
                          >
                            Hide Post
                          </button>
                          <button
                            style={{
                              backgroundColor: "gray",
                              padding: "5px",
                              border: "none",
                              color: "white",
                            }}
                            onClick={() => onUnhide(post._id)}
                          >
                            Unhide Post
                          </button>
                        </td>
                      </tr>
                      // )
                    ))}
                  </tbody>
                </table>
              </div>
            </Container>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
}
export default ImgurifyPost;
