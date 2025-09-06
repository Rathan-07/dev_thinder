import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Body } from "./components/Body";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile"
import { Provider, useDispatch } from "react-redux";
import appStore from "./utils/appStore";
import { useEffect } from "react";
import { addUser } from "./utils/userSlice";
import { Feed } from "./components/Feed";
import { ToastContainer } from "react-toastify";
import { Connections } from "./components/Connections";
import { Requests } from "./components/Requests";

export default function App() {


  return (
    <>
  
         <BrowserRouter basename="/">
              <ToastContainer />
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/feed"  element={<Feed/>}/>
             <Route path="/login" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/connections" element ={<Connections/>}/>
             <Route path="/requests" element ={<Requests/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  
    </>
  );
}
