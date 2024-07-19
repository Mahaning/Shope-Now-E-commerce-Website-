import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");

  const handleToggleClick = (menuItem) => {
    setOpenDropdown((prevState) => (prevState === menuItem ? null : menuItem));
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedItem(menuItem);
  };

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme pd-6 shadow"
      >
        <div className="app-brand demo shadow-sm">
          <NavLink to="/" className="app-brand-link">
            <span className="app-brand-logo demo">
              <i className="fa fa-store"></i>
            </span>
            <span className="app-brand-text demo menu-text fw-bolder ms-2">
              Shope Now
            </span>
          </NavLink>
          <NavLink
            to="/"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle" />
          </NavLink>
        </div>
        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1">
          {/* Dashboard */}
          <li
            className={`menu-item ${
              selectedItem === "dashboard" ? "active" : ""
            } shadow-none`}
            onClick={() => handleMenuItemClick("dashboard")}
          >
            <NavLink to="/dashboard/admin" className="menu-link">
              <i className="fa fa-home" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Analytics">Dashboard</div>
            </NavLink>
          </li>
          {/* Users */}
          <li
            className={`menu-item ${openDropdown === "users" ? "open" : ""} ${
              selectedItem === "users" ? "active" : ""
            }`}
          >
            <div
              className="menu-link menu-toggle"
              onClick={() => {
                handleToggleClick("users");
                handleMenuItemClick("users");
              }}
            >
              <i className="fa fa-users" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Layouts">Users</div>
            </div>
            <ul
              className="menu-sub"
              style={{ display: openDropdown === "users" ? "block" : "none" }}
            >
              <li className="menu-item">
                <NavLink to="/dashboard/admin/userlist" className="menu-link">
                  <div data-i18n="Basic">Customers</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/dashboard/admin/userlist" className="menu-link">
                  <div data-i18n="Basic">Delivery Partners</div>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* Categories */}
          <li
            className={`menu-item ${openDropdown === "categories" ? "open" : ""} ${
              selectedItem === "categories" ? "active" : ""
            }`}
          >
            <div
              className="menu-link menu-toggle"
              onClick={() => {
                handleToggleClick("categories");
                handleMenuItemClick("categories");
              }}
            >
              <i className="fa fa-list-alt" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Account Settings">Categories</div>
            </div>
            <ul
              className="menu-sub"
              style={{ display: openDropdown === "categories" ? "block" : "none" }}
            >
              <li className="menu-item">
                <NavLink to="/dashboard/admin/addcategory" className="menu-link">
                  <div data-i18n="Account">Add Category</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/dashboard/admin/categorylist" className="menu-link">
                  <div data-i18n="Notifications">Manage Categories</div>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* Products */}
          <li
            className={`menu-item ${openDropdown === "products" ? "open" : ""} ${
              selectedItem === "products" ? "active" : ""
            }`}
          >
            <div
              className="menu-link menu-toggle"
              onClick={() => {
                handleToggleClick("products");
                handleMenuItemClick("products");
              }}
            >
              <i className="fa fa-cart-plus" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Authentications">Products</div>
            </div>
            <ul
              className="menu-sub"
              style={{ display: openDropdown === "products" ? "block" : "none" }}
            >
              <li className="menu-item">
                <NavLink to="/dashboard/admin/addproducts" className="menu-link">
                  <div data-i18n="Basic">Add Products</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/dashboard/admin/productlist" className="menu-link">
                  <div data-i18n="Basic">Manage Products</div>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* Coupons */}
          <li
            className={`menu-item ${selectedItem === "coupons" ? "active" : ""}`}
            onClick={() => handleMenuItemClick("coupons")}
          >
            <NavLink to="/dashboard/admin/coupanlist" className="menu-link">
              <i className="fa fa-tags" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Boxicons">Coupons</div>
            </NavLink>
          </li>
          {/* Orders */}
          <li
            className={`menu-item ${selectedItem === "orders" ? "active" : ""}`}
            onClick={() => handleMenuItemClick("orders")}
          >
            <NavLink to="/dashboard/admin/orderlist" className="menu-link">
              <i className="fa fa-box" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Misc">Orders</div>
            </NavLink>
          </li>
          {/* Feedbacks */}
          <li
            className={`menu-item ${selectedItem === "feedbacks" ? "active" : ""}`}
            onClick={() => handleMenuItemClick("feedbacks")}
          >
            <NavLink to="/dashboard/admin/feedbacks" className="menu-link">
              <i className="fa fa-comment-dots" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Basic">Feedbacks</div>
            </NavLink>
          </li>
          {/* Reports */}
          <li
            className={`menu-item ${openDropdown === "reports" ? "open" : ""} ${
              selectedItem === "reports" ? "active" : ""
            }`}
          >
            <div
              className="menu-link menu-toggle"
              onClick={() => {
                handleToggleClick("reports");
                handleMenuItemClick("reports");
              }}
            >
              <i className="fa fa-receipt" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="User interface">Reports</div>
            </div>
            <ul
              className="menu-sub"
              style={{ display: openDropdown === "reports" ? "block" : "none" }}
            >
              <li className="menu-item">
                <NavLink to="/dashboard/admin/sales-reports" className="menu-link">
                  <div data-i18n="Accordion">Sales Report</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/dashboard/admin/customer-reports" className="menu-link">
                  <div data-i18n="Alerts">Customer Report</div>
                </NavLink>
              </li>
              {/* <li className="menu-item">
                <NavLink to="/" className="menu-link">
                  <div data-i18n="Badges">Inventory Report</div>
                </NavLink>
              </li> */}
            </ul>
          </li>
          {/* Integrations and Settings */}
          <li
            className={`menu-item ${openDropdown === "integrations" ? "open" : ""} ${
              selectedItem === "integrations" ? "active" : ""
            }`}
          >
            <div
              className="menu-link menu-toggle"
              onClick={() => {
                handleToggleClick("integrations");
                handleMenuItemClick("integrations");
              }}
            >
              <i className="fa fa-gear" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Extended UI">Integrations and Settings</div>
            </div>
            <ul
              className="menu-sub"
              style={{ display: openDropdown === "integrations" ? "block" : "none" }}
            >
              <li className="menu-item">
                <NavLink to="/dashboard/admin/settings/banners" className="menu-link">
                  <div data-i18n="Perfect Scrollbar">Banner Settings</div>
                </NavLink>
              </li>
              {/* <li className="menu-item">
                <NavLink to="extended-ui-text-divider.html" className="menu-link">
                  <div data-i18n="Text Divider">Email settings</div>
                </NavLink>
              </li> */}
              {/* <li className="menu-item">
                <NavLink to="extended-ui-text-divider.html" className="menu-link">
                  <div data-i18n="Text Divider">Email settings</div>
                </NavLink>
              </li> */}
            </ul>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
