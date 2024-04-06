

import { useState, useEffect, createContext } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {useParams} from "react-router-dom";
// import axios from "axios";

export const ImgurifyContext = createContext();

function ImgurifyProvider(props) {
  const [userID, setUserID] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [AdminUserID, setAdminUserID] = useState(""); 

  console.log("userID in ImgurifyContext:", userID);

  useEffect(() => {
    const rawData = localStorage.getItem("Imgur_AdminUSER");
    if (rawData) {
      const localData = JSON.parse(rawData);
      // setUserID(localData?.user?.id || '');
      setUserID(localData?.user?._id || ''); 
      console.log("UserID after setting:", userID);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  console.log("isLoggedIn in ImgurContext:", isLoggedIn);



  return (
    <ImgurifyContext.Provider value={{ userID, setUserID, isLoggedIn, setIsLoggedIn, 
   }}>
      {props.children}
    </ImgurifyContext.Provider>
  );
}

export default ImgurifyProvider;
