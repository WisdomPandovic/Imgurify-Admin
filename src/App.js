import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./components/pages/Home";
import CreateUser from "./components/pages/CreateUser";
import CreatePost from "./components/pages/CreatePost";
import ImgurifyProvider from "./components/context/ImgurifyContext";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/pages/Signin';
import SignUp from './components/pages/SignUp';
import Profile from './components/pages/Profile';
import UpdateUsers from './components/pages/UpdateUsers';
import UpdatePost from './components/pages/UpdatePosts';
import UpdateTag from './components/pages/UpdateTag';
import ImgurifyUsers from './components/pages/ImgurifyUsers';
import ImgurifyPost from './components/pages/ImgurifyPost';
import CreateTags from './components/pages/CreateTags';
 import MobileMessage from './components/MobileMessage';
function App() {
   const isMobileView = window.matchMedia('(max-width: 768px)').matches; // Define the threshold for mobile view

   if (isMobileView) {
     return (
       <MobileMessage />
     );
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
}

export default App;