import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Pagination, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../../contxt/auth.js';
import axios from 'axios';
import { Select, Tabs } from "antd";
import moment from "moment";

const { Option } = Select;
const { TabPane } = Tabs;

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [auth] = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const filterOrdersByStatus = (status) => {
    if (status === 'All') {
      return filteredOrders;
    }
    return filteredOrders.filter(order => order.status.toLowerCase() === status.toLowerCase());
  };

  const currentOrders = filterOrdersByStatus(activeTab).slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleProductClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = orders.filter(order =>
      order.buyer?.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      order.buyer?.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      order._id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const renderOrders = (orders) => (
    <>
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Order ID or User"
          value={searchTerm}
          onChange={handleSearch}
          autoFocus
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Shipment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.buyer?.firstName + " " + order.buyer?.lastName}</td>
                <td>{moment(order.createdAt).format("MMMM Do YYYY")}</td>
                <td>
                  <span style={{ cursor: "pointer", color: "blue" }} onClick={() => handleProductClick(order)}>
                    {order.products.length} Products
                  </span>
                </td>
                <td>${order.payment?.transaction?.amount}</td>
                <td>{order.payment?.success ? "Payment Success" : "Payment Failed"}</td>
                <td>
                  <Select
                    bordered={false}
                    onChange={(value) => handleChange(order._id, value)}
                    defaultValue={order.status}
                  >
                    {status.map((s, i) => (
                      <Option key={i} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>
                </td>
                <td>
                  <span style={{ marginLeft: "1.5rem" }}>
                    <NavLink to="">
                      <i className="fa fa-trash" />
                    </NavLink>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination>
        {Array.from({ length: Math.ceil(filterOrdersByStatus(activeTab).length / ordersPerPage) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );

  return (
    <div className="col-lg-11.5 grid-margin" style={{ margin: "2.5%" }}>
      <div className="card shadow-lg" style={{ height: 'fit-content' }}>
        <div className="card-body">
          <h4 className="card-title">Orders Table</h4>
          <Tabs defaultActiveKey="All" onChange={(key) => { setActiveTab(key); setCurrentPage(1); }}>
            {["All", ...status].map((tab) => (
              <TabPane tab={`${tab} (${filterOrdersByStatus(tab).length})`} key={tab}>
                {renderOrders(currentOrders)}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && selectedOrder.products.map(product => (
            <div key={product._id} className="d-flex mb-3">
              <div><img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`} alt={product.productName} /></div>
              <div className="mt-3 pt-3 ms-3">
                <p><strong>Name:</strong> {product.productName}</p>
                <p><strong>Description:</strong> {product.shortDescription}</p>
                <p><strong>Price:</strong> ${product.sellingPrice}</p>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderList;
