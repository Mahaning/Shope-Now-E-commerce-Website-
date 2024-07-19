import "../../../Styleheets/boxicons.css";
import "../../../Styleheets/core.css";
import "../../../Styleheets/theme-default.css";
import "../../../Styleheets/demo.css";
import "../../../Styleheets/perfect-scrollbar.css";
import "../../../Styleheets/boxicons.css";

const UserLayout = ({ children }) => {
  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          
          {children}</div>
      </div>
    </div>
  );
};
export default UserLayout;
