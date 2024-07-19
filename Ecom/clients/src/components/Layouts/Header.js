import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../../Styleheets/navbar.css';
import CategoryNavbar from "./CategoryNavbar";
import { useAuth } from "../../contxt/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useSearch } from "../../contxt/search";
import { useCart } from "../../contxt/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [values,setValues]=useSearch();
  const navigate=useNavigate();
  const [cart]=useCart();
  

  useEffect(() => {
    fetchAllCategory();
  }, []);


  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`);
      if (response.data?.success) {
        setCategories(response.data.allData);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem('auth');
    toast.success("Logout Successfully !");
  };


  const handleSearch=async(e)=>{
    e.preventDefault();
      try {
        const {data}=await await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
        setValues({...values,results:data});
        navigate("/search");
      } catch (error) {
        console.error(error);
      toast.error("Failed to Search");
      }
  }
  return (
    <div>
      <div className="position-sticky z-index-1 top-0 text-dark" style={{zIndex:"10000"}}>
        <div className="row">
          <div className="col-12">
            <nav className="navbar clr navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 start-0 end-0 mx-4">
              <div className="container-fluid">
                <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3">
                  Shop Now
                </a>
                <button
                  className="navbar-toggler shadow-none ms-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navigation"
                  aria-controls="navigation"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navigation">
                  <form className="d-flex me-auto my-2 my-lg-0 clr blur blur-rounded transparent-input" style={{ background: "transparent" }} role="search" onSubmit={handleSearch}>
                    <input
                      className="form-control me-2 transparent-input"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      style={{ background: "transparent" }}  // Adjust the height to match the menu items
                      value={values.keyword} 
                      onChange={(e)=>setValues({...values,keyword:e.target.value})}
                    />
                    <button
                      className="btn btn-outline-success"
                      type="submit"
                      // style={{ height: '38px' }}  // Adjust the height to match the menu items
                    >
                      Search
                    </button>
                  </form>
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <NavLink className="nav-link d-flex align-items-center me-2 active" aria-current="page" to="/">
                        <i className="fa fa-home opacity-6 text-dark me-1" />
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link me-2" to="/about">
                        About us
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link me-2" to="/ContactUs">
                        Contact us
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle me-2" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                      <li><NavLink className="dropdown-item" to={`/all-products`}>All products</NavLink></li>
                        {categories && categories.map((category) => (
                          <li key={category._id}><NavLink className="dropdown-item" to={`/category/${category.slug}`}>{category.name}</NavLink></li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                  <ul className="navbar-nav d-lg">
                    <li className="nav-item">
                      <Badge count={cart.length} showZero>
                      <NavLink className="nav-link me-2" to="/cart-items">
                        <i className="fas fa-shopping-cart opacity-6 text-dark me-1" />
                        Cart
                      </NavLink>
                      </Badge>
                    </li>
                    {
                      !auth.user ? (
                        <>
                          <li className="nav-item">
                            <NavLink className="nav-link me-2" to="/signup">
                              <i className="fas fa-user-circle opacity-6 text-dark me-1" />
                              Sign Up
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink className="nav-link me-2" to="/login">
                              <i className="fas fa-key opacity-6 text-dark me-1" />
                              Sign In
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle me-2" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fas fa-user opacity-6 text-dark me-1" />
                              {auth?.user?.firstName} {auth?.user?.lastName}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="userDropdown" style={{ width: "5%" }}>
                              {auth?.user?.role === 0 ? (
                                <li className="nav-item">
                                  <NavLink className="nav-link me-2" to="/dashboard/admin">
                                    <i className="fas fa-tachometer-alt opacity-6 text-dark me-1" />
                                    Admin Panel
                                  </NavLink>
                                </li>
                              ) : ""}

                              {auth?.user?.role === 2 ? (
                                <li className="nav-item">
                                  <NavLink className="nav-link me-2" to="/dashboard/user">
                                    <i className="fas fa-tachometer-alt opacity-6 text-dark me-1" />
                                    Dashboard
                                  </NavLink>
                                </li>
                              ) : ""}

                              {auth?.user?.role === 1 ? (
                                <li className="nav-item">
                                  <NavLink className="nav-link me-2" to="/deliverypartners/dashboard">
                                    <i className="fas fa-tachometer-alt opacity-6 text-dark me-1" />
                                    Dashboard
                                  </NavLink>
                                </li>
                              ) : ""}
                              <li className="nav-item">
                                <NavLink onClick={handleLogout} className="nav-link me-2" to="">
                                  <i className="fas fa-key opacity-6 text-dark me-1" />
                                  Logout
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </>
                      )
                    }
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <CategoryNavbar />
    </div>
  );
};

export default Header;
