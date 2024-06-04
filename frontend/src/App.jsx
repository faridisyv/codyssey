import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PythonQuizes from "./pages/PythonQuizes";
import Home from "./components/Home";
import LoginPage from "./pages/auth/LoginPage";
import SignUp from "./pages/auth/SignUp";
import Python from "./pages/Python";
import GeneralProgramming from "./pages/GeneralProgramming";
import Languages from "./pages/Languages";
import JavaScript from "./pages/JavaScript";
import WebProgramming from "./pages/WebProgramming";
import LanguagesQuizes from "./pages/LanguagesQuizes";
import ForgetPassword from "./pages/ForgetPassword";
import Ranks from "./pages/Ranks";
import Battle from "./pages/Battle";
import AccountPage from "./pages/AccountPage";
import FileUpload from "./pages/FileUpload";
import MyFriends from "./pages/MyFriends";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./components/Contact";
const App = () => {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (isLoggedIn === "true") {
      setLogged(true);
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  return (

      <>
      <Navbar logged={logged} setLogged={setLogged} username={username}/>
      <Routes>
        <Route path="/login" element={<LoginPage setLogged={setLogged} setUsername={setUsername} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/" element={<Home logged={logged} setLogged={setLogged} />} />
        <Route path="/pythonquizes" element={<PythonQuizes />} />
        <Route path="/generalprogramming" element={<GeneralProgramming />} />
        <Route path="/language" element={<Languages />} />
        <Route path="/python" element={<Python />} />
        <Route path="/javascript" element={<JavaScript />} />
        <Route path="/webprogramming" element={<WebProgramming />} />
        <Route path="/allquizes" element={<LanguagesQuizes />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/ranks" element={<Ranks />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/myfriends" element={<MyFriends />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </>
   
  );
};

export default App;
