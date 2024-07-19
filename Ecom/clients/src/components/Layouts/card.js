import React from 'react';
import toast from 'react-hot-toast';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
  } from "mdb-react-ui-kit";
import { useCart } from '../../contxt/cart.js';
import { useNavigate } from 'react-router-dom';

function CardComponent({ product }) {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    

    const styles = {
        card: {
            padding: '10px',
            textAlign: 'center',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            margin: '10px',
            width: '250px',
            maxWidth: '350px',
            height: '380px'
        },
        imageContainer: {
            height: '200px',
            overflow: 'hidden'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
        }
    };

    const handleAddToCart = () => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success("Item Added to Cart");
    };

    return (
        <MDBCard style={styles.card}>
            <div className="d-flex justify-content-between p-3">
                <div
                    className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: "35px", height: "35px" }}
                >
                    <p className="text-white mb-0 small" style={{ fontSize: '12px' }}>Offer</p>
                </div>
            </div>
            <div style={styles.imageContainer}>
                <MDBCardImage
                    src={`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`}
                    position="top"
                    alt={product.name}
                    style={styles.image}
                />
            </div>
            <MDBCardBody>
                <div className="d-flex justify-content-between">
                    <div className="small">
                        <a href="#!" className="text-muted">
                            <h5 className="mb-0" style={{ fontSize: '14px' }}>{product.productName}</h5><br />
                        </a>
                    </div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <h5 className="small text-danger mb-0" style={{ fontSize: '14px' }}><s>${product.actualPrice}</s></h5>
                    <h5 className="text-dark mb-0" style={{ fontSize: '14px' }}>${product.sellingPrice}</h5>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
                        Available: <span className="fw-bold">{product.remainingQuantity}</span>
                    </p>
                    <div className="ms-auto text-warning">
                        {Array.from({ length: Math.floor(product.rating) }, (_, index) => (
                            <MDBIcon key={index} fas icon="star" />
                        ))}
                        {product.rating % 1 !== 0 && <MDBIcon fas icon="star-half-alt" />}
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span>
                        <button
                            className="btn btn-success btn-sm"
                            style={{ backgroundColor: "green" }}
                            onClick={() => navigate(`/product/${product._id}`)}
                        >
                            View
                        </button>
                    </span>
                    <span>
                        <button
                            className="btn btn-warning btn-sm"
                            style={{ backgroundColor: "red" }}
                            onClick={handleAddToCart}
                        >
                            Add To Cart
                        </button>
                    </span>
                </div>
            </MDBCardBody>
        </MDBCard>
    );
}

export default CardComponent;
