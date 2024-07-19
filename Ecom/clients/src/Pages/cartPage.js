import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import { useAuth } from '../contxt/auth';
import { useCart } from '../contxt/cart';
import { useNavigate } from 'react-router-dom';
import '../Styleheets/cart.css';
import toast from 'react-hot-toast';
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [Pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const updatedCart = cart.map(item => {
      if (!item.quantity) {
        return { ...item, quantity: 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }, []);

  const handleQuantityChange = (id, increment) => {
    const updatedCart = cart.map(item => {
      if (item._id === id) {
        const newQuantity = Math.min(Math.max(item.quantity + increment, 1), 100);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleApplyCoupon = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/coupon/fetch-all-coupon/user`);
      const validCoupons = data.allCoupons.filter(coupon => coupon.active === 0 && new Date(coupon.expires) >= new Date());

      const appliedCoupon = validCoupons.find(c => c.couponCode === coupon);
      if (appliedCoupon) {
        const { total, discountAmount, totalWithDiscount } = calculateTotal(appliedCoupon.discountPercentage);
        
        if (total > 399 && totalWithDiscount > (discountAmount + 150)) {
          setDiscount(appliedCoupon.discountPercentage);
        } else {
          toast.error("Coupon is not applicable. Conditions not met.");
          setDiscount(0);
        }
      } else {
        toast.error("Coupon code is not valid or expired.");
        setDiscount(0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to apply coupon. Please try again later.");
      setDiscount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setCoupon("");
    setDiscount(0);
  };

  const calculateTotal = (discountPercentage = discount) => {
    const total = cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
    const discountAmount = total * (discountPercentage / 100);
    let totalWithDiscount = total - discountAmount;
    let deliveryCharge = 0;

    if (totalWithDiscount <= 499) {
      deliveryCharge = 328;
      totalWithDiscount += deliveryCharge;
    } else if (totalWithDiscount > 499 && totalWithDiscount < 999) {
      deliveryCharge = 150;
      totalWithDiscount += deliveryCharge;
    }

    return { total, discountAmount, totalWithDiscount, deliveryCharge };
  };

  const removeCartItem = (pid) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item._id === pid);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem('cart', JSON.stringify(mycart));
    } catch (error) {
      console.log(error);
    }
  };

  const { total, discountAmount, totalWithDiscount, deliveryCharge } = calculateTotal();

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
    if (auth?.user?.address) {
      setAddress(auth?.user?.address);
    }
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
        address,
        Pincode,
        city,
        country,
      });
      console.log(`${address} , ${Pincode} , ${city} , ${country}`)
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Cart Page</h1>
      </div>
      <div className="app">
        <div className="cart">
          {cart.map(product => (
            <div key={product._id} className="cart-item">
              <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`} alt={product.name} />
              <div className="info">
                <h4>{product.productName}</h4>
                <p>${product.sellingPrice}</p>
                <button className='btn-sm btn-danger' onClick={() => removeCartItem(product._id)}><i className="fa fa-trash" aria-hidden="true" /></button>
              </div>
              <div className="quantity">
                <button onClick={() => handleQuantityChange(product._id, -1)} disabled={product.quantity <= 1}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleQuantityChange(product._id, 1)} disabled={product.quantity >= 100}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="summary">
          <div className="apply-coupon">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              disabled={discount > 0}
            />
            {discount > 0 ? (
              <button onClick={handleRemoveCoupon} className='btn btn-sm btn-danger'>Cancel</button>
            ) : (
              <button onClick={handleApplyCoupon} className='btn btn-sm btn-primary'>Apply Coupon</button>
            )}
          </div>
          <hr />
          <div className="total-price">
            <s><h5>Total: {total.toFixed(2)} ₹</h5></s>
            <h5>Delivery Charge: {deliveryCharge.toFixed(2)} ₹</h5>
            <h5>Discount: {discountAmount.toFixed(2)} ₹</h5>
            <h5>Grand Total with Discount: {totalWithDiscount.toFixed(2)} ₹</h5>
          </div>
          <hr />
          <div>
            {auth?.token ? (
              <div>
                {auth?.user?.address ? (
                  <>
                    <h5>Address:</h5>
                    <p>{auth?.user?.address}</p>
                    <button className='btn btn-sm btn-warning' onClick={() => { toast.success("Edit It in Profile Section"); navigate("/dashboard/user"); }}>Update Address</button>
                  </>
                ) : (
                  <button className='btn btn-sm btn-danger' onClick={() => navigate("/dashboard/user")}>Add Address</button>
                )}
              </div>
            ) : (
              <h5>Please Log In To Your Account For CheckOut/ To place Order</h5>
            )}
          </div>
          {auth?.token ? (
            <>
              <Button className="checkout-button" onClick={() => setShowModal(true)}>Checkout</Button>
            </>
          ) : (
            <button className='checkout-button' style={{ backgroundColor: 'red' }} onClick={() => navigate('/login', { state: '/cart-items' })}>Log In</button>
          )}
        </div>
      </div>

      {/* Modal for Checkout */}
      <br />
      <Modal show={showModal} onHide={() => setShowModal(false)} style={{ zIndex: '10000' }}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Total Amount: ${totalWithDiscount.toFixed(2)}</h5>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              rows="3"
              placeholder="Enter your address"
              onChange={(e) => setAddress(e.target.value)}
              value={address || auth?.user?.address || ""}
              required autoFocus
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                placeholder="Enter your state"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="Pincode" className="form-label">PinCode</label>
              <input
                type="text"
                className="form-control"
                id="Pincode"
                name="Pincode"
                placeholder="Enter Pincode"
                value={Pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="payment-methods">
            {clientToken ? (
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
            ) : (
              <p>Loading payment options...</p>
            )}
            <button
              className="btn btn-primary"
              onClick={handlePayment}
              disabled={loading || !instance || !auth?.user?.address}
            >
              {loading ? "Processing ...." : "Make Payment"}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CartPage;
