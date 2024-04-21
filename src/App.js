import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import CreateUser from "./components/pages/CreateUser";
import CreatePost from "./components/pages/CreatePost";
import ImgurifyProvider from "./components/context/ImgurifyContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Signin from "./components/pages/Signin";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import UpdateUsers from "./components/pages/UpdateUsers";
import UpdatePost from "./components/pages/UpdatePosts";
import UpdateTag from "./components/pages/UpdateTag";
import ImgurifyUsers from "./components/pages/ImgurifyUsers";
import ImgurifyPost from "./components/pages/ImgurifyPost";
import CreateTags from "./components/pages/CreateTags";
import MobileMessage from "./components/MobileMessage";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const rawData = localStorage.getItem("Imgur_AdminUSER");
    if (rawData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    console.log("isAuthenticated:", isAuthenticated);
  }, []);
  
  useEffect(() => {
    console.log("isAuthenticated in useEffect:", isAuthenticated);
  }, [isAuthenticated]);
  
  console.log(isAuthenticated)

  const isMobileView = window.matchMedia("(max-width: 768px)").matches; // Define the threshold for mobile view

  if (isMobileView) {
    return <MobileMessage />;
  }

  return (
    <ImgurifyProvider>
        <BrowserRouter>
        {/* {isMobileView && <MobileMessage />} */}
           <Routes>
               <Route path='/home' element={<Home/>}/>
               <Route path='/createUser' element={<CreateUser/>}/>
               <Route path='/createPost' element={<CreatePost/>}/>
               <Route path='/' element={<Signin/>}/>
               <Route path='/signup' element={<SignUp/>}/>
               <Route path='/profile' element={<Profile/>}/>
               <Route path='/profile/:_id' element={<Profile/>} />
               <Route path='/imgurifyUsers' element={<ImgurifyUsers/>} />
               <Route path='/imgurifyPost' element={<ImgurifyPost/>} />
               <Route path='/updateUsers/:_id' element={<UpdateUsers/>} />
               <Route path='/updatePost/:_id' element={<UpdatePost/>} />
               <Route path='/updateTag/:_id' element={<UpdateTag/>} />
               <Route path='/createTags' element={<CreateTags/>} />
           </Routes>
        </BrowserRouter>
     </ImgurifyProvider>
  );

  // return (
  //   <ImgurifyProvider>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Signin />} />
  //         <Route path="/signup" element={<SignUp />} />
  //         <ProtectedRoute
  //         path="/home"
  //         element={<Home />}
  //         isAuthenticated={isAuthenticated}
  //       />
  //         {/* <Route
  //           path="/createUser"
  //           element={
  //             <ProtectedRoute
  //               element={<CreateUser />}
  //               isAuthenticated={isAuthenticated}
  //             />
  //           }
  //         />
  //         <Route
  //           path="/createPost"
  //           element={
  //             <ProtectedRoute
  //               element={<CreatePost />}
  //               isAuthenticated={isAuthenticated}
  //             />
  //           }
  //         />
  //         <Route
  //           path="/profile"
  //           element={
  //             <ProtectedRoute
  //               element={<Profile />}
  //               isAuthenticated={isAuthenticated}
  //             />
  //           }
  //         />
  //         <Route
  //           path="/updateUsers/:_id"
  //           element={
  //             <ProtectedRoute
  //               element={<UpdateUsers />}
  //               isAuthenticated={isAuthenticated}
  //             />
  //           }
  //         />
  //         <Route
  //           path="/updatePost/:_id"
  //           element={
  //             <ProtectedRoute
  //               element={<UpdatePost />}
  //               isAuthenticated={isAuthenticated}
  //             />
  //           }
  //         />
  //         <Route
  //           path="/updateTag/:_id"
  //           element={
  //             <ProtectedRoute
  //               element={<UpdateTag />}
  //               isAuthenticated={isAuthenticated}
  //             />
  //           }
  //         />
  //         <Route
  //           path="/imgurifyUsers"
  //           element={
  //             <ProtectedRoute
  //               element={<ImgurifyUsers />}
  //               isAuthenticated={isAuthenticated}
  //             />
  //           }
  //         />
  //         <Route
  //           path="/imgurifyPost"
  //           element={
  //             <ProtectedRoute
  //               element={<ImgurifyPost />}
  //               isAuthenticated={isAuthenticated}
  //             />
  //           }
  //         />
  //         <Route
  //           path="/createTags"
  //           element={
  //             <ProtectedRoute
  //               element={<CreateTags />}
  //               isAuthenticated={isAuthenticated}
  //             />
  //           }
  //         /> */}
  //       </Routes>
  //     </BrowserRouter>
  //   </ImgurifyProvider>
  // );
}

export default App;
