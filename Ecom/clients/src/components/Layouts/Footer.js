import React from 'react';
import '../../Styleheets/navbar.css';


const Footer = () => {
  return (
    <div>
      <footer className="footer bg-gray position-sticky z-index-sticky top-0 my-1  start-0 end-0 mx-4 ">
        <div className="container-fluid d-flex flex-md-row flex-column justify-content-between align-items-md-center gap-1 container-p-x py-3">
          <div>
          Shop Now 
            © developed by Mahaning Hubballi
          </div>
          <div>
            <a href="#" className="footer-link me-4">License</a>
            <a href="#" className="footer-link me-4">Help</a>
            <a href="#" className="footer-link me-4">Contact</a>
            <a href="#" className="footer-link">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
