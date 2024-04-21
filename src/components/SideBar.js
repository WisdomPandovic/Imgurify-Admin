import React, { useContext, useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCog , FaColumns} from 'react-icons/fa';
import {FaUsers} from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faPlus, faList  } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import { ImgurifyContext } from '../components/context/ImgurifyContext';

const SideBar = () => {
    const { isLoggedIn, setIsLoggedIn, userID} = useContext(ImgurifyContext);
  return (
    <div className="bg-white">
            <Nav defaultActiveKey="/home" className="flex-column dashboard-link ">
                <Nav  className="link-text" style={{ backgroundColor: '#5D60CC', color: 'white'}}>
                    <FaColumns className="link-icon" style={{ fontSize: '24px' }}/><span className='text-white' style={{ marginLeft: '20px' }}>Dashboard</span>
                </Nav>
                <Nav.Link as={Link} to="/home" >
                    <FaHome  /> <span className='text-dark' style={{ marginLeft: '20px' }}>Home</span>
                </Nav.Link>
                <Nav.Link as={Link} to={`/profile/${userID}`}>
                    <FaUser /> <span className='text-dark' style={{ marginLeft: '20px' }}>Profile</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/createUser">
                    <FaUsers /> <span className='text-dark' style={{ marginLeft: '20px' }}>Create Users</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/imgurifyUsers">
                    <FaUser /> <span className='text-dark' style={{ marginLeft: '20px' }}>Users List</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/createPost">
                <FontAwesomeIcon icon={faPlus} /> <span className='text-dark' style={{ marginLeft: '20px' }}>Create Post</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/imgurifyPost" className='mt-4'>
                <FontAwesomeIcon icon={faList} /> <span className='text-dark' style={{ marginLeft: '20px' }}>Post List</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/createTags">
                    <FaUsers /> <span className='text-dark' style={{ marginLeft: '20px' }}>Create Tags</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                <FontAwesomeIcon icon={faSignInAlt} /> <span className='text-dark' style={{ marginLeft: '20px' }}>Sign In</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/settings">
                     <FaCog /> <span className='text-dark' style={{ marginLeft: '20px' }}>Settings</span>
                 </Nav.Link>
            </Nav>

    </div>
  );
};

export default SideBar;


// import React, { useContext } from 'react';
// import { Nav } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';
// import { FaHome, FaUser, FaCog, FaColumns } from 'react-icons/fa';
// import { FaUsers } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignInAlt, faPlus, faList } from '@fortawesome/free-solid-svg-icons';
// import './sidebar.css';
// import { ImgurifyContext } from '../components/context/ImgurifyContext';

// const SideBar = () => {
//   const { isLoggedIn, setIsLoggedIn, userID } = useContext(ImgurifyContext);
  
//   return (
//     <div className="bg-white">
//       <Nav defaultActiveKey="/home" className="flex-column dashboard-link ">
//         <Nav className="link-text" style={{ backgroundColor: '#5D60CC', color: 'white' }}>
//           <FaColumns className="link-icon" style={{ fontSize: '24px' }} /><span className='text-white' style={{ marginLeft: '20px' }}>Dashboard</span>
//         </Nav>
//         <Nav.Link as={NavLink} to="/home" activeClassName="active-link">
//           <FaHome /> <span className='text-dark' style={{ marginLeft: '20px' }}>Home</span>
//         </Nav.Link>
//         <Nav.Link as={NavLink} to={`/profile/${userID}`} activeClassName="active-link">
//           <FaUser /> <span className='text-dark' style={{ marginLeft: '20px' }}>Profile</span>
//         </Nav.Link>
//         <Nav.Link as={NavLink} to="/createUser" activeClassName="active-link">
//           <FaUsers /> <span className='text-dark' style={{ marginLeft: '20px' }}>Create Users</span>
//         </Nav.Link>
//         <Nav.Link as={NavLink} to="/imgurifyUsers" activeClassName="active-link">
//           <FaUser /> <span className='text-dark' style={{ marginLeft: '20px' }}>Users List</span>
//         </Nav.Link>
//         <Nav.Link as={NavLink} to="/createPost" activeClassName="active-link">
//           <FontAwesomeIcon icon={faPlus} /> <span className='text-dark' style={{ marginLeft: '20px' }}>Create Post</span>
//         </Nav.Link>
//         <Nav.Link as={NavLink} to="/imgurifyPost" activeClassName="active-link">
//           <FontAwesomeIcon icon={faList} /> <span className='text-dark' style={{ marginLeft: '20px' }}>Post List</span>
//         </Nav.Link>
//         <Nav.Link as={NavLink} to="/createTags" activeClassName="active-link">
//           <FaUsers /> <span className='text-dark' style={{ marginLeft: '20px' }}>Create Tags</span>
//         </Nav.Link>
//         <Nav.Link as={NavLink} to="/" activeClassName="active-link">
//           <FontAwesomeIcon icon={faSignInAlt} /> <span className='text-dark' style={{ marginLeft: '20px' }}>Sign In</span>
//         </Nav.Link>
//         <Nav.Link as={NavLink} to="/settings" activeClassName="active-link">
//           <FaCog /> <span className='text-dark' style={{ marginLeft: '20px' }}>Settings</span>
//         </Nav.Link>
//       </Nav>
//     </div>
//   );
// };

// export default SideBar;
