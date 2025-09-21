import { Outlet, useLocation } from "react-router-dom";
import bgImage from "../../assets/bgImage.png";
import loginImage from "../../assets/sideimage.png";
import forgotImage from "../../assets/forgot-img.png";
import verifyEmail from "../../assets/checkEmail.png";
import setImage from "../../assets/set-password.png";
import resetSuccess from "../../assets/reset-success.png";

const Auth = () => {
  const location = useLocation();

  // Map routes to images
  const imageMap = {
    "/auth/login": loginImage,
    "/auth/forgot-password": forgotImage,
    "/auth/verify-email": verifyEmail,
    "/auth/set-password": setImage,
    "/auth/reset-success": resetSuccess,
  };

  // Pick the correct image or a default one
  const currentImage = imageMap[location.pathname] || forgotImage;

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      {/* Background image */}
      {/* <div style={{ backgroundColor: "#ffffff" }}></div> */}

      {/* Left side - Dynamic image */}
      {/* <div
        className="w-1/2 h-full hidden md:flex items-center justify-center"
        style={{
          position: "relative",
          left: 100,
          zIndex: 1,
        }}
      >
        <img
          src={currentImage}
          alt="Authentication visual"
          className="h-full w-full object-contain"
          style={{
            maxHeight: "90vh",
            padding: "20px",
          }}
        />
      </div> */}

      {/* Right side - Auth form */}
      <div className="">
        <div
          style={{
            background: "#FCFCFC3B",
            padding: 30,
            paddingBottom: 40,
            borderRadius: 15,
            maxWidth: 500,
            width: "100%",
            border: "1px solid #198248",
            backdropFilter: "blur(10px)",
          }}
          className="shadow-xl"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
