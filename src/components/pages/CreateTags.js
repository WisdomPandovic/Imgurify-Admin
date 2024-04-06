
import React, { useState,  useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SideBar from '../SideBar';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import {FiEdit3} from "react-icons/fi";
import {MdDelete} from "react-icons/md";

function CreateTags() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);
    const [tag, setTag] = useState([]);
    const [tags, setTags] = useState({
        name: "",
    });

   
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTags({ ...tags, [name]: value });
    };

    const handleTagSubmit = (event) => {
        event.preventDefault();
        const tagData = {
            name: tags.name,
        };

        if (tags.name== "" ) {
            setErr(true);
        } else {
            setErr(false);
            axios.post("http://localhost:3007/tag", tagData)
                .then((resp) => {
                    console.log(resp.data)
                    setErr(false);
                    toast.success("Sign up successful.");

                    setTags({
                        name: "",
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Tag unsuccessful. Please try again.");
                });
        }
    };

    useEffect(() => {
        fetch("http://localhost:3007/tag")
          .then((resp) => resp.json())
          .then((data) => {
            setTag(data);
            setLoading(false);
          });
      }, []);
    
      const onDelete = async (_id) => {
        try {
          await axios.delete("http://localhost:3007/tag/" + _id); 
          setTag(prevUsers => prevUsers.filter(tag => tag._id !== _id));
          toast.success("Tag deleted successfully");
        } catch (error) {
          console.error("Error deleting tag:", error);
          toast.error("An error occurred while deleting the tag");
        }
        console.log(_id)
      };

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <SideBar />
                </Col>
                <Col md={10} className="bg-deems">
                    <Container fluid>
                        <Row style={{ marginTop: '10px', margin: '20px' }}>
                            <Col md={5} style={{ paddingTop: '10px' }}>
                                <h2 className='signin-1 '>Create Tags</h2>
                                <Form onSubmit={handleTagSubmit} >
                                    <Form.Group controlId="normalUsername" style={{ marginTop: '10px', marginBottom: '20px' }}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Tag"
                                            name="name"
                                            value={tags.name}
                                            onChange={handleInputChange}
                                        />
                                        {err === true && tags.name === "" ? <span>Tag required</span> : null}
                                    </Form.Group>
                                    
                                    <Button variant="primary" type="submit" style={{ margin: '10px', width: '100%' }}>
                                        Create Tag
                                    </Button>
                                </Form>
                            </Col>

                            <Col md={1} className="d-flex justify-content-center align-items-center">
                                <div style={{ height: '100%', borderRight: '1px solid #6f6f6f', marginTop: '20px' }}></div>
                            </Col>

                            <Col md={5} style={{ paddingTop: '10px' }}>
                            <div className='users-table'> 
                            <h2 className='signin-1 text-uppercase'>Imgurify Tag Lists</h2>
                            <table className="table">
                     
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Options</th>
                 
                </tr>
              </thead>
              <tbody>
                {tag.map((tag, index) => (
                  <tr key={tag._id}>
                    <td >{index + 1}</td>
                    <td>{tag.name}</td>
                    <td> 
                    <Link to={`/updateTag/${tag._id}`}>
                      <button style={{ backgroundColor: 'skyblue', marginRight: '10px', padding: '5px', border:'none' }}><FiEdit3 className="edit-icon"/></button>
                    </Link>
                     
                      <button style={{ backgroundColor: 'red', padding: '5px', border:'none', color: 'white'}} onClick={() => onDelete(tag._id)}><MdDelete className="delete-icon"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
                            </table>
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

export default CreateTags;


