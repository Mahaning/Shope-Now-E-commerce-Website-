import React, { useEffect, useState } from 'react';
import UserLayout from '../Admin/Components/Layout/UserLayout';
import UserSideBar from '../Admin/Components/navbars/UserSideBar';
import moment from "moment";
import {
    MDBCol,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBRow,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink
} from 'mdb-react-ui-kit';
import { useAuth } from '../contxt/auth';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Input, Rate, Button, Form } from 'antd';

function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleAddFeedback = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const handleSubmitFeedback = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API}/api/v1/feedback/create-feedback`, {
                ProductId: selectedProduct._id,
                feedbackText,
                rating
            });
            setIsModalVisible(false);
            setFeedbackText('');
            setRating(0);
        } catch (error) {
            console.error(error);
            setError("Failed to submit feedback");
        }
    };
    // Pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <UserLayout>
            <UserSideBar />
            <div className="layout-page">
                <div className="content-wrapper">
                    <section style={{ backgroundColor: '#eee' }}>
                        <MDBRow>
                            <MDBCol>
                                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                                    <MDBBreadcrumbItem>
                                        <a href='#'>Home</a>
                                    </MDBBreadcrumbItem>
                                    <MDBBreadcrumbItem>
                                        <a href="#">User</a>
                                    </MDBBreadcrumbItem>
                                    <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                                </MDBBreadcrumb>
                            </MDBCol>
                        </MDBRow>
                        <div>User Orders</div>
                        <h1 className="text-center">All Orders</h1>
                        {orders.map((order, i) => (
                            <div key={i}>
                                <MDBTable striped>
                                    <MDBTableHead>
                                        <tr>
                                            <th>#</th>
                                            <th>Buyer</th>
                                            <th>Payment</th>
                                            <th>Quantity</th>
                                            <td>Date</td>
                                            <td>Status</td>
                                            <td>Total</td>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{order.buyer.firstName + " " + order.buyer.lastName}</td>
                                            <td>{order.payment.success ? "Payment Success" : "Payment Failed"}</td>
                                            <td>{order.products.length}</td>
                                            <td>{moment(order.createdAt).format("MMMM Do YYYY")}</td>
                                            <td>{order.status}</td>
                                            <td>{order.payment.transaction.amount}</td>
                                        </tr>
                                    </MDBTableBody>
                                </MDBTable>
                                {order.products.map((product, prodIndex) => (
                                    <div className='row p-3 card flex-row' key={prodIndex} style={{ height: "auto" }}>
                                        <div className='col-md-4'>
                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`} className='card-image-top' style={{ width: '60%', height: '60%', objectFit: 'contain' }} alt="product" />
                                        </div>
                                        <div className='col-md-8'>
                                            <p>Product Name: {product.productName}</p>
                                            <p>Actual Price: {product.actualPrice}</p>
                                            <p>Selling Price: {product.sellingPrice}</p>
                                            <p>Delivered Address: {order.address} city: {order.city} country: {order.country} Pincode: {order.Pincode}</p>
                                            <Button className='btn btn-sm btn-primary' onClick={() => handleAddFeedback(product)}>Add Feedback</Button>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        ))}

                        <MDBPagination className="my-4">
                            <MDBPaginationItem disabled={currentPage === 1}>
                                <MDBPaginationLink onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                            {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
                                <MDBPaginationItem key={index} active={index + 1 === currentPage}>
                                    <MDBPaginationLink onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </MDBPaginationLink>
                                </MDBPaginationItem>
                            ))}
                            <MDBPaginationItem disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}>
                                <MDBPaginationLink onClick={() => paginate(currentPage + 1)} aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                        </MDBPagination>
                    </section>
                </div>
            </div>

            <Modal
                title="Add Feedback"
                visible={isModalVisible}
                onOk={handleSubmitFeedback}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Feedback Text">
                        <Input.TextArea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Rating">
                        <Rate value={rating} onChange={setRating} />
                    </Form.Item>
                </Form>
            </Modal>
        </UserLayout>
    );
}

export default UserOrders;
