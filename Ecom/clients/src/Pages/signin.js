import React, { useState } from 'react';
import Layout from '../components/Layouts/Layout';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import '../Styleheets/page-auth.css';
import '../Styleheets/boxicons.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contxt/auth';

export function Signin() {
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
  const location=useLocation();
  const [auth,setAuth]=useAuth();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
      console.log(process.env.REACT_APP_API)
      if(res.data.success){

        toast.success(res.data.message);
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state || '/');
        
      }else{
        toast.error(res.data.message);
      }
      console.log(email,password);
    } catch (error) {
      console.log(error)
      toast.error("Something wen't wrong !");
    }

  }

  return (
    <div className="container-xxl ">
      <Toaster />
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          {/* Register */}
          <div className="card">
            <div className="card-body">
              {/* Logo */}
              <div className="app-brand justify-content-center">
                {/* <a href="/" className="app-brand-link gap-2"> */}
                <span className="app-brand-logo demo text-center">
                  <h1>Sign In</h1>
                </span>
                {/* </a> */}
              </div>
              {/* /Logo */}
              <h3 className="mb-2">Welcome to Shope Now! 👋</h3>
              <p className="mb-4">Please sign-in to your account</p>
              <form id="formAuthentication" className="mb-3" method="POST" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email or Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email or username"
                    autoFocus
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">Password</label>
                    <a href="">
                      <NavLink to="/reset-password"><small>Forgot Password?</small></NavLink>
                      
                    </a>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="············"
                      aria-describedby="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    <span className="input-group-text cursor-pointer"><i className="bx bx-hide" /></span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember-me" />
                    <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                  </div>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
              </form>
              <p className="text-center">
                <span>New on our platform?</span>
                <a href="/signup">
                  <span>Create an account</span>
                </a>
              </p>
              <p className="text-center">
                <a href="/">
                  <span> back to Home</span>
                </a>
              </p>
            </div>
          </div>
          {/* /Register */}
        </div>
      </div>
    </div>
  );
}
