import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function ResetPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP, 3: Reset Password

  const sendOtp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
        console.log(email)
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/send-otp`, { email });
      if (res.data.success) {
        toast.success('OTP sent to your email');
        setStep(2); // Move to the next step (enter OTP)
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send OTP');
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/verify-otp`, { email, otp });
      if (res.data.success) {
        toast.success('OTP verified');
        setStep(3);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to verify OTP');
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log(email)
      console.log(newPassword)
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/reset-password`, { email, newPassword });
      if (res.data.success) {
        toast.success('Password reset successful');
        setStep(1);
        navigate('/login');
        
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to reset password');
    }
  };

  return (
    <div className="container-xxl">
      <Toaster />
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <span className="app-brand-logo demo text-center">
                  <h1>Reset Password</h1>
                </span>
              </div>

              {step === 1 && (
                <form className="mb-3" onSubmit={sendOtp}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button className="btn btn-primary d-grid w-100" type="submit">Send OTP</button>
                </form>
              )}

              {step === 2 && (
                <form className="mb-3" onSubmit={verifyOtp}>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      placeholder="Enter the OTP sent to your email"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <button className="btn btn-primary d-grid w-100" type="submit">Verify OTP</button>
                </form>
              )}

              {step === 3 && (
                <form className="mb-3" onSubmit={resetPassword}>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button className="btn btn-primary d-grid w-100" type="submit">Reset Password</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
