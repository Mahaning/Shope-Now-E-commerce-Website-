import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      }); 
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      {/* <div
        // className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      > */}
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
        <h1 className="Text-center">redirecting to you in {count} second </h1>
        {/* <div className="spinner-border" role="status"> */}
        <div>
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
          <span className="visually-hidden">Loading...</span>
        {/* </div> */}
      </div>
    </>
  );
};

export default Spinner;
