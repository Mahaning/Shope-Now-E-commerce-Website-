import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const AdminHome = () => {
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalOrders: 0,
    completedOrders: 0,
    notCompletedOrders: 0,
    categories: [],
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/report/statics`);
      const { totalUsers, totalOrders, completedOrders, notCompletedOrders, productsPerCategory } = response.data;

      // Extract categories and totalProductsSold from productsPerCategory
      const categoriesData = productsPerCategory.map(item => ({
        _id: item._id,
        name: item.categoryName,
        totalProductsSold: item.totalProductsSold,
      }));

      setStatistics({
        totalUsers,
        totalOrders,
        completedOrders,
        notCompletedOrders,
        categories: categoriesData,
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      toast.error('Failed to fetch statistics');
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y" style={{ marginBottom: '0px' }}>
        <div className="row" style={{ marginBottom: '0rem' }}>
          {/* Number Of Users */}
          <div className="col-3 mb-1">
            <div className="card shadow" style={{ height: 'auto'}}>
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <i className="rounded fa fa-bus" />
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="cardOpt4"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                    <NavLink to="/dashboard/admin/userlist">
                      <a className="dropdown-item" href="javascript:void(0);">
                        View More
                      </a></NavLink>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <span className="d-block mb-1">Number Of Users</span>
                <h3 className="card-title text-nowrap mb-2">{statistics.totalUsers}</h3>
                <small className="text-danger fw-semibold">
                  {/* <i className="fa fa-arrow-down" /> -14.82% */}
                </small>
              </div>
            </div>
          </div>
          {/* Total Orders */}
          <div className="col-3 mb-1">
            <div className="card" style={{ height: 'auto' }}>
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <i className="rounded fa fa-cart-plus" />
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="cardOpt4"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                      <NavLink to="/dashboard/admin/orderlist"className="dropdown-item" >
                        View More
                      </NavLink>
                      <a className="dropdown-item" href="javascript:void(0);">
                        {/* Delete */}
                      </a>
                    </div>
                  </div>
                </div>
                <span className="d-block mb-1">Total Orders</span>
                <h3 className="card-title text-nowrap mb-2">{statistics.totalOrders}</h3>
                <small className="text-danger fw-semibold">
                  {/* <i className="fa fa-arrow-down" /> -14.82% */}
                </small>
              </div>
            </div>
          </div>
          {/* Order Completed */}
          <div className="col-3 mb-1">
            <div className="card" style={{ height: 'auto' }}>
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <i className="rounded fa fa-user" />
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="cardOpt4"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                    <NavLink to="/dashboard/admin/orderlist"className="dropdown-item" >
                        View More
                      </NavLink>
                      <a className="dropdown-item" href="javascript:void(0);">
                        {/* Delete */}
                      </a>
                    </div>
                  </div>
                </div>
                <span className="d-block mb-1">Order Completed</span>
                <h3 className="card-title text-nowrap mb-2">{statistics.completedOrders}</h3>
                <small className="text-danger fw-semibold">
                  {/* <i className="fa fa-arrow-down" /> -14.82% */}
                </small>
              </div>
            </div>
          </div>
          {/* Order Not Completed */}
          <div className="col-3 mb-1">
            <div className="card" style={{ height: 'auto' }}>
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <i className="rounded fa fa-car" />
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="cardOpt1"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v" />
                    </button>
                    <div className="dropdown-menu" aria-labelledby="cardOpt1">
                    <NavLink to="/dashboard/admin/orderlist"className="dropdown-item" >
                        View More
                      </NavLink>
                      <a className="dropdown-item" href="javascript:void(0);">
                        {/* Delete */}
                      </a>
                    </div>
                  </div>
                </div>
                <span className="fw-semibold d-block mb-1">Order Not Completed</span>
                <h3 className="card-title mb-2">{statistics.notCompletedOrders}</h3>
                <small className="text-success fw-semibold">
                  {/* <i className="fa fa-arrow-up" /> +28.14% */}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="row">
        <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-0">
          <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between pb-0">
              <div className="card-title mb-0">
                <h5 className="m-0 me-2">Order Statistics</h5>
                <small className="text-muted">Total Products Sold</small>
              </div>
              <div className="dropdown">
                <button
                  className="btn p-0"
                  type="button"
                  id="orderStatistics"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-ellipsis-v" />
                </button>
                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="orderStatistics">
                <NavLink to="/dashboard/admin/sales-reports"className="dropdown-item" >
                  View More
                  </NavLink>
                  <a className="dropdown-item" href="javascript:void(0);" onClick={fetchStatistics}>
                    Refresh
                  </a>
                  <a className="dropdown-item" href="javascript:void(0);">
                    
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-column align-items-center gap-1">
                  <h2 className="mb-2">{statistics.totalOrders}</h2>
                  <span>Total Products ordered per Category</span>
                </div>
                {/* <div id="orderStatisticsChart" /> */}
              </div>
              <ul className="p-0 m-0">
                {Array.isArray(statistics.categories) && statistics.categories.length > 0 ? (
                  statistics.categories.map(category => (
                    <li className="d-flex mb-4 pb-1" key={category._id}>
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-primary">
                          <i className="fa fa-bolt" />
                        </span>
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">{category.name}</h6>
                          {/* <small className="text-muted">Mobile, Earbuds, TV</small> */}
                        </div>
                        <div className="user-progress">
                          <small className="fw-semibold">{category.totalProductsSold}</small>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No categories found</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
