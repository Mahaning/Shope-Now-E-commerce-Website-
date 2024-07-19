import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const PartnerSideBar = () => {
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
        className="layout-menu menu-vertical menu bg-menu-theme pd-3 shadow"
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
            <NavLink to="/" className="menu-link">
              <i className="fa fa-home" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Analytics">Home</div>
            </NavLink>
          </li>
          <li
            className={`menu-item ${selectedItem === "orders" ? "active" : ""}`}
            onClick={() => handleMenuItemClick("orders")}
          >
            <NavLink to="/dashboard/user/order" className="menu-link">
              <i className="fa fa-box" />
              <span style={{ width: "20px" }}></span>
              <div data-i18n="Misc">Orders</div>
            </NavLink>
          </li>


        </ul>
      </aside>
    </>
  );
};

export default PartnerSideBar;
