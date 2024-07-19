import React, { useState } from 'react';
import AdminLayout from "../Components/Layout/AdminLayout";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCoupon = () => {
  const [coupon,setCoupon]=useState('');
  const [couponCode,setCouponCode]=useState('');
  const [discountPercentage,setDiscountPercentage]=useState('');
  const [maxDiscountPrice,setMaxDiscountPrice]=useState('');
  const [expires,setExpires]=useState('');
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/coupon/create-coupon`,{coupon,couponCode,discountPercentage,maxDiscountPrice,expires})

      if(data?.success){
        toast.success("Coupan had created");
        navigate('/dashboard/admin/coupanlist');
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  return (
    <AdminLayout>
      <div className="container ">
        <h2 className="mt-4 mb-4 text-center">Add Coupon</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg" style={{ height: 'fit-content' }}>
              <div className="card-body shadow-lg">
                <h4 className="card-title text-center">Coupon Details</h4>
                <form className="forms-sample" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="coupon">Coupon Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="coupon"
                      name="coupon"
                      placeholder="Enter coupon name"

                      value={coupon}
                      onChange={(e)=> setCoupon(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="couponCode">Coupon Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="couponCode"
                      name="couponCode"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e)=>setCouponCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="discountPercentage">Discount Percentage</label>
                    <input
                      type="number"
                      className="form-control"
                      id="discountPercentage"
                      name="discountPercentage"
                      placeholder="Enter discount percentage"
                      value={discountPercentage}
                      onChange={(e)=>setDiscountPercentage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="maxDiscountPrice">Max Discount Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="maxDiscountPrice"
                      name="maxDiscountPrice"
                      placeholder="Enter max discount price"
                      value={maxDiscountPrice}
                      onChange={(e)=>setMaxDiscountPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expires">Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="expires"
                      name="expires"
                      value={expires}
                      onChange={(e)=>setExpires(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <button type="reset" className="btn btn-light">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCoupon;
