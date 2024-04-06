// import AsideBar from "./AsideBar";
import axios from "axios";
import { useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {  Form, Container, Row, Col, Button, Image } from 'react-bootstrap';
import SideBar from '../SideBar';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import { CostcoContext } from '../Context/CostcoContext';

import exampleImage from '../../images/images.png'; 

function Profile (){
    // const { AdminUserID} = useContext(CostcoContext)
    const navigate = useNavigate();
    const { _id } = useParams();
    // console.log("_id parameter:", _id);
    const [user, setUser] = useState([]); 
    const [AvatarUrl, setAvatarUrl] = useState([]); 


    useEffect(() => {
        fetch("http://localhost:3007/users/" + _id)
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data);
        });

        
    },[]);

    const updateUser = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3008/users/" + _id, user)
        .then(res => {
            alert("Data update successfull !!!");
            toast.success("Data update successfull !!!");
            navigate("/dashboard");
        })
    }
    

    const onDelete = async (_id) => {
        try {
          await axios.delete("http://localhost:3008/user/" + _id); 
          setUser(prevUsers => prevUsers.filter(user => user._id !== _id));
          toast.success("User deleted successfully");
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("An error occurred while deleting the user");
        }
        // console.log(_id)
      };

      useEffect(() => {
        fetch(`http://localhost:3007/users/${_id}`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
        });
    },[]);     

    return(
        <Container fluid className="profile">
            <Row>
                <Col md={2}>
                    <SideBar />
                </Col>
                <Col md={10} className="bg-deems">
                    <Container fluid>
                    <Row style={{ marginTop: '10px', margin: '20px' }}>
                        <Col md={4} style={{  margin: '20px' }}>
                            <div className="admin-user d-flex justify-content-center">
                            <Image src={exampleImage} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }}  />

                            </div>
                        </Col>
                        <Col md={7} style={{  margin: '20px' }}>        
                            <div >
                            <p>Account Settings</p>
                            <Form  onSubmit={updateUser}>
                                <div className="form-control" style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <Form.Group controlId="formUsername" style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <Form.Label>Username :</Form.Label>
                                        <Form.Control type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                    </Form.Group>
                                </div>

                                <div className="form-control" style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <Form.Group controlId="formPhoneNumber" >
                                        <Form.Label>Phone Number :</Form.Label>
                                        <Form.Control type="text" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
                                    </Form.Group>
                                </div>

                               <div className="form-control" style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                                    </Form.Group>
                               </div>

                                <div className="form-control" style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="text" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                                    </Form.Group>
                                </div>

                                <div className="form-control">
                                    <div className="admin-form-btn d-flex justify-content-evenly">
                                        <Button type="submit">Update</Button>
                                        <Button onClick={() => onDelete(user._id)} style={{ backgroundColor: 'red', border: 'none' }}>Delete Account</Button>
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
    )
}

export default Profile;