import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Modal } from 'antd';

const CoupanList = () => {
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [maxDiscountPrice, setMaxDiscountPrice] = useState('');
  const [expires, setExpires] = useState('');

  const [visible, setVisible] = useState(false);
  const [selectedCoupan, setSelectedCoupan] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [couponsPerPage] = useState(5);

  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllCoupons = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/coupon/fetch-all-coupon`);
      const data = response.data;
      if (data.success) {
        setCoupons(data.allCoupons);
      } else {
        toast.error("Failed to fetch coupons");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllCoupons();
  }, []);

  const handleSubmit = async (e) => {
    // handle form submission
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/coupon/update-coupon/${selectedCoupan._id}`, {
        coupon, couponCode, discountPercentage, maxDiscountPrice, expires
      });
      if (data?.success) {
        toast.success('Coupon updated successfully');
        fetchAllCoupons();
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const deleteHandle = async (couponId) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/coupon/delete-coupon/${couponId}`);
      if (data.success) {
        toast.success('Coupon deleted successfully');
        fetchAllCoupons();
        setVisible(false);
        setSelectedCoupan(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const openModal = (couponData) => {
    setSelectedCoupan(couponData);
    setCoupon(couponData.coupon);
    setCouponCode(couponData.couponCode);
    setDiscountPercentage(couponData.discountPercentage);
    setMaxDiscountPrice(couponData.maxDiscountPrice);
    setExpires(moment(couponData.expires).format('YYYY-MM-DD'));
    setVisible(true);
  };

  // Pagination
  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = coupons.slice(indexOfFirstCoupon, indexOfLastCoupon);

  // Filter coupons based on search term
  const filteredCoupons = currentCoupons.filter(couponData =>
    couponData.coupon.toLowerCase().includes(searchTerm.toLowerCase()) ||
    couponData.couponCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="col-lg-11.5 grid-margin stretch-card" style={{ margin: "2.5%" }}>
      <div className="card" style={{ height: 'fit-content' }}>
        <div className="card-body">
          <div className='row'>
            <span style={{ display: 'flex', justifyContent: "space-between" }}>
              <h4 className="card-title">Coupon List Table</h4>
              <NavLink to="/dashboard/admin/addcoupan" className='btn btn-primary float-right'>Add Coupon</NavLink>
            </span>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by coupon name or code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Coupon</th>
                  <th>Coupon code</th>
                  <th>Discount</th>
                  <th>Expires</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.map(couponData => (
                  <tr key={couponData._id}>
                    <td>{couponData.coupon}</td>
                    <td>{couponData.couponCode}</td>
                    <td>{couponData.discountPercentage}</td>
                    <td>{moment(couponData.expires).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>
                      {couponData.active === 0 ? (
                        <label className='badge bg-success'>Active</label>
                      ) : couponData.active === 1 ? (
                        <label className='badge bg-warning'>Deactivated</label>
                      ) : (
                        <label className='badge bg-danger'>Expired</label>
                      )}
                    </td>
                    <td>
                      <span>
                        <button className='btn' style={{ backgroundColor: "transparent" }} onClick={() => openModal(couponData)}>
                          <i className='fa fa-pen' style={{ color: '#696cff' }} />
                        </button>
                      </span>
                      <span style={{ marginLeft: '1.5rem' }}>
                        <button className="btn" style={{ backgroundColor: 'transparent' }} onClick={() => deleteHandle(couponData._id)}>
                          <i className='fa fa-trash' style={{ color: '#696cff' }} />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(filteredCoupons.length / couponsPerPage) }).map((_, index) => (
                <li key={index} className={index + 1 === currentPage ? "page-item active" : "page-item"}>
                  <a className="page-link" onClick={() => paginate(index + 1)} href="#">
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
            <div className="card-body shadow-lg" style={{ height: 'fit-content' }}>
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
                    onChange={(e) => setCoupon(e.target.value)}
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
                    onChange={(e) => setCouponCode(e.target.value)}
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
                    onChange={(e) => setDiscountPercentage(e.target.value)}
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
                    onChange={(e) => setMaxDiscountPrice(e.target.value)}
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
                    onChange={(e) => setExpires(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button type="reset" className="btn btn-light" onClick={() => setVisible(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CoupanList;
