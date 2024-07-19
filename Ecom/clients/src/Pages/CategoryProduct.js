import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from "../components/Layouts/Layout";
import Productcards from '../components/Layouts/productcards.js';

import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useCart } from '../contxt/cart.js';

function CategoryProduct() {
  const [cart,setCart]=useCart();
  const styles = {
    card: {
      padding: '10px',
      textAlign: 'center',
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '4px',
      margin: '10px',
      width: '240px',
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
    },
    container: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      padding: '10px'
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
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success("Item Added to Cart");
};

  useEffect(()=>{
    if(page===1) return;
      loadMore();
  },[page])
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product//product-List/${page}`);
      
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast.error("Something went wrong fetching products");
    }
  };

  const getTotal=async()=>{
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching products");
    }
  }


  useEffect(() => {
    if (params?.slug) {
      getProductByCat();
    }
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  return (
    <Layout>
      <div className=' d-flex flex-wrap' style={{ backgroundColor: 'transparent' }}>
        {/* <h1>Category: {category.name}</h1> */}
        
    {/* <div className="spaces1" />  */}
    {products.map(product => (
          <div key={product._id} className="product-card">
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
                      <h5 className="mb-0" style={{ fontSize: '14px' }}>{product.productName}</h5><br/>
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
                    {product.rating % 1 !== 0 && <MDBIcon fas icon="star" />}
                  </div>: 4.5 {product.rating}
                </div>
                <div className='d-flex justify-content-between mb-2'>
                  <span><small><button className='btn btn-success btn-sm' style={{backgroundColor:"green"}} onClick={()=> navigate(`/product/${product._id}`)}>View</button></small></span>
                  <span><button className='btn btn-warning btn-sm' style={{backgroundColor:"red"}} onClick={() => handleAddToCart(product)}>Add To Cart</button></span>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
  </div>
  <div>
      </div>
    </Layout>
  );
}

export default CategoryProduct;
