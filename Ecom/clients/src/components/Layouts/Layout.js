import React from 'react';
import Header from './Header';
import Footer from './Footer';
import  { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    <div>
      <Toaster />
      <Header />
      {/* <CategoryNavbar/> */}
      
      <main className="main-content z-index-3 shadow my-3 start-0 end-0 mx-4 radius-3" style={{ minHeight: "150vh", overflow: "hidden" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
