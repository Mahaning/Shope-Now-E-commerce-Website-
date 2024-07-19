import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contxt/cart";
import toast from "react-hot-toast";

function Productcards({ products }) {
  const navigate=useNavigate();
  const [cart,setCart]=useCart();
  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success("Item Added to Cart");
};
  const styles = {
    card: {
      padding: '10px',
      textAlign: 'center',
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '4px',
      margin: '10px',
      width:'250px',
      // maxWidth: '300px'
      margin:'10px'
    },
    imageContainer: {
      height: '125px',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    title: {
      fontSize: '16px',
      margin: '10px 0'
    },
    description: {
      fontSize: '14px',
      color: '#333'
    },
    viewMore: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      fontSize: '16px'
    },
    arrow: {
      color: '#000',
      width: '40px',
      height: '40px',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)'
    },
    arrowHover: {
      color: '#444'
    }
  };

  return (
    <MDBContainer fluid className="my-5">
      <MDBRow>
        {products.map((product) => (
          <MDBCol key={product.id} md="12" lg="4" className="mb-4 mb-lg-0 d-flex justify-content-center">
            <MDBCard style={styles.card}>
              <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0">{product.offer}</p>
                <div
                  className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                  style={{ width: "35px", height: "35px" }}
                >
                  <p className="text-white mb-0 small">{`x${product.quantity}`}</p>
                </div>
              </div>
              <div style={styles.imageContainer}>
                <MDBCardImage
                  src={`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`}
                  position="top"
                  alt={product.productName}
                  style={styles.image}
                />
              </div>
              <MDBCardBody>
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a href="#!" className="text-muted">
                      {/* {product.category} */}
                      <h5 className="mb-0 text-dark" style={styles.title}>{product.productName}</h5>
                    </a>
                  </p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                <s className="text-danger">${product.actualPrice}</s>
                  <h5 className="text-dark mb-0">${product.sellingPrice}</h5>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <p className="text-dark mb-0" style={styles.description}>
                    Available: <span className="fw-bold">{product.remainingQuantity}</span>
                  </p>
                  <div className="ms-auto text-warning">
                    {Array.from({ length: Math.floor(product.rating) }, (_, index) => (
                      <MDBIcon key={index} fas icon="star" /> 
                    ))}
                    {product.rating % 1 !== 0 && <MDBIcon fas icon="star" />}<span className="text-dark">: 4.5</span>
                  </div>
                </div>
                <div className='d-flex justify-content-between mb-2'>
                  <span><small><button className='btn btn-success btn-sm' style={{backgroundColor:"green"}} onClick={()=> navigate(`/product/${product._id}`)}>View</button></small></span>
                  <span><button className='btn btn-warning btn-sm' style={{backgroundColor:"red"}} onClick={() => handleAddToCart(product)}>Add To Cart</button></span>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default Productcards;
