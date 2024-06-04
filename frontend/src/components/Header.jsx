import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";

const Header = ({ logged, setLogged, username }) => {
  const { pathname } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setLogged(true);
    }
  }, [setLogged]);

  const toggleNavigation = () => {
    setOpenNavigation(prev => {
      if (prev) {
        enablePageScroll();
      } else {
        disablePageScroll();
      }
      return !prev;
    });
  };

  const handleClick = () => {
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setLogged(false);
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"}`}>
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
        <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map(item => (
              <Link
                key={item.id}
                to={item.title === "Languages" ? "/language" : item.title === "Quizes" ? "/allquizes" : item.title === "Ranks" ? "/ranks" : item.title === "Battle" ? "/battle" : item.title === "Home" ? "/" : item.title === "Explore" ? "/explore" : item.url}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""} px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"} lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                onClick={handleClick}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        {!logged ? (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="button hidden text-n-1/50 transition-colors hover:text-n-1 lg:block">Sign In</Link>
            <Link to="/signup" className="button hidden text-n-1/50 transition-colors hover:text-n-1 lg:block">Sign Up</Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/account" className="button hidden text-n-1/50 transition-colors hover:text-n-1 lg:block">{username}</Link>
            <button onClick={handleLogout} className="button hidden text-n-1/50 transition-colors hover:text-n-1 lg:block">Log Out</button>
          </div>
        )}

        <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
      {transcript && (
        <div className="transcript bg-white text-black p-4 mt-2 rounded shadow-lg">
          {transcript}
        </div>
      )}
    </div>
  );
};

export default Header;
