import React from "react";
import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

const Login = () => {
  const pathname = useLocation();

  // Logic to handle page scroll
  const handlePageScroll = (open) => {
    if (open) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  };

  React.useEffect(() => {
    handlePageScroll(true); // Disable page scroll when component mounts
    return () => {
      handlePageScroll(false); // Enable page scroll when component unmounts
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm bg-n-8`}
    >
      {/* Content of login page */}
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-white text-3xl">Login Page</h1>
      </div>
    </div>
  );
};

export default Login;
