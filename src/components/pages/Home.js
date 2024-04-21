import React, { useContext, useState, useEffect } from "react";
// import { useEffect, useState, useContext } from "react";
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Button, Image, FormControl, InputGroup  } from "react-bootstrap";
import { BsSearch } from 'react-icons/bs';
import SideBar from "../SideBar";
import PostDetails from "../PostDetails";
// import { FaHome, FaUser, FaCog, FaColumns } from 'react-icons/fa';
import {
  FaEnvelope,
  FaBell,
  FaSignOutAlt,
  FaUser,
  FaColumns,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFolder } from "@fortawesome/free-solid-svg-icons";
import { ImgurifyContext } from "../context/ImgurifyContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Notification from "../Notification";
import exampleImage from '../../images/images.png'; 

function Home() {
  const { isLoggedIn, setIsLoggedIn } = useContext(ImgurifyContext);
  const [Users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [isBarOpen, setIsBarOpen] = useState(false);
  const navigate = useNavigate();

  // const handleNewPostClick = () => {
  //     if (isLoggedIn) {
  //       navigate("/newposts");
  //     } else {
  //       alert("You need to sign in to create a post.");
  //       toast.error("You need to sign in to create a post.");
  //       navigate("/signin");
  //     }
  //   };

  const handleLogout = () => {
    try {
      localStorage.removeItem("Imgur_AdminUSER");
      setIsLoggedIn(false);
      navigate("/");
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Error while handling logout:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  // Get username from local storage
  const getUsername = () => {
    const userData = JSON.parse(localStorage.getItem("Imgur_AdminUSER"));
    return userData ? userData.user.username : "";
  };

  useEffect(() => {
    fetch("http://localhost:3007/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3007/post")
      .then((resp) => resp.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3007/tag")
      .then((resp) => resp.json())
      .then((data) => {
        setTags(data);
      });
  }, []);

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

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={10} className="bg-deem">
     
    <div className="top-bar p-3">
    <div>
      <InputGroup className="search pb-3">
        <InputGroup.Text id="search-icon" className="search-icon">
          <BsSearch />
        </InputGroup.Text>
        <FormControl
          style={{ backgroundColor: '#DDE5FC', borderRadius: '20px' }}
          aria-label="Search"
          aria-describedby="search-icon"
        />
      </InputGroup>
    </div>
        <div className=" d-flex justify-content-between ">
              <div className="welcome-note d-flex">
                <Image src={exampleImage} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}  />
                <p className="newpost text-dark pt-2 text-uppercase ms-2">
                  Welcome, <br></br> <span className="text-dark">{getUsername()}</span> !
                </p>
              </div>
              <div className="d-flex justify-content-end my-2 my-lg-0 ">
                <FaEnvelope
                  className="nav-icons text-dark"
                  style={{ fontSize: "30px" }}
                />
                <FaBell
                  onClick={() => setIsBarOpen(true)}
                  className="nav-icons text-dark"
                  style={{ fontSize: "30px" }}
                />
                <FaSignOutAlt
                  onClick={handleLogout}
                  className="nav-icons text-danger"
                  style={{ fontSize: "30px" }}
                />
              </div>
              {isBarOpen && (
                <div className="barPopup">
                  <div className="popup-flex">
                    <div className="popup-welcome">Notifications</div>
                    <div
                      onClick={() => setIsBarOpen(false)}
                      className="popup-welcomeX"
                    >
                      X
                    </div>
                  </div>

                  <div className="notification">
                    <Notification />
                  </div>
                </div>
              )}
        </div>
        </div>
          <Container fluid>
            
            <Row>
              <Col md={3} className="box">
                <FaUser className="box-icon" />
                <p className="box-text">Users ({Users.length})</p>
              </Col>
              <Col md={3} className="box">
                <FontAwesomeIcon icon={faImage} className="box-icon" />
                <p className="box-text">Post ({posts.length})</p>
              </Col>
              <Col md={3} className="box">
                <FontAwesomeIcon icon={faFolder} className="box-icon" />
                <p className="box-text">Tags ({tags.length})</p>
              </Col>
              <Col md={3} className="box">
                <FaColumns className="box-icon" />
                <p className="box-text">Dashboard</p>
              </Col>
            </Row>
            <div className="users-table">
              <h2 className="signin-1 text-uppercase">Imgurify Users</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Role</th>
                    <th>Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {Users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.role}</td>
                      <td>{formatDate(user.lastLogin)}</td>
                      {/* <td> 
                      <button style={{ backgroundColor: 'skyblue', marginRight: '10px', padding: '5px', border:'none' }}>Edit</button>
                     
                      <button style={{ backgroundColor: 'red', padding: '5px', border:'none', color: 'white'}}>Delete</button>
                    </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PostDetails />
          </Container>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
export default Home;
