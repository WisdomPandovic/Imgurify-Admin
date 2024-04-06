import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import SideBar from '../SideBar';
import { FaEnvelope, FaBell, FaSignOutAlt, FaUser, FaColumns} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faFolder  } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {FiEdit3} from "react-icons/fi";
import {MdDelete} from "react-icons/md";

function ImgurifyUsers (){
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3007/users")
        .then((resp) => resp.json())
        .then((data) => {
            setUsers(data);
        });
    },[]);

    function formatDate(timestamp) {
        // console.log('Timestamp:', timestamp); 

        if (!timestamp) {
            return 'Never';
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
          await axios.delete("http://localhost:3007/user/" + _id); 
          setUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
          toast.success("User deleted successfully");
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("An error occurred while deleting the user");
        }
        console.log(_id)
      };

    return(
        <div>
             <Container fluid>
            <Row>
                <Col md={2}>
                    <SideBar />
                </Col>
                <Col md={10} className="bg-deem">

                 

                    <Container fluid>
                      
                        {/* <div className=' d-flex justify-content-between'>
                          <div className='welcome-note'>
                              <p className='newpost text-dark pt-2'>Welcome, <span className='text-dark'>{getUsername()}</span> !</p>
                  
                          </div>
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
                        {/* <Row >
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
                       </Row> */}
                        <div className='users-table'> 
                            <h2 className='signin-1 text-uppercase'>Imgurify Users Lists</h2>
                            <table className="table">
                     
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Role</th>
                  <th>Options</th>
                 
                </tr>
              </thead>
              <tbody>
                {Users.map((user, index) => (
                  <tr key={user._id}>
                    <td >{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.role}</td>
                    {/* <td>{formatDate(user.lastLogin)}</td> */}
                    <td> 
                    <Link to={`/updateUsers/${user._id}`}>
                      <button style={{ backgroundColor: 'skyblue', marginRight: '10px', padding: '5px', border:'none' }}><FiEdit3 className="edit-icon"/></button>
                    </Link>
                     
                      <button style={{ backgroundColor: 'red', padding: '5px', border:'none', color: 'white'}} onClick={() => onDelete(user._id)}><MdDelete className="delete-icon"/></button>
                    </td>
                  </tr>
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
    )
}
export default ImgurifyUsers;