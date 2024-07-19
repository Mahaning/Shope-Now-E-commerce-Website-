import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contxt/cart.js';
import toast from 'react-hot-toast';

function SimilarProducts({relatedProduct}) {
    const navigate=useNavigate();
    const [cart,setCart]=useCart();
    const handleAddToCart = (product) => {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success("Item Added to Cart");
  };
    
  return (
    <div>
    {/* <div className="spaces1" />  */}
    <div className="row ms-2 me-1" style={{borderRadius:'12px',backgroundColor:'white'}}>
      <div className="col-md-12 ">
        <p className="section-title4 text-center mt-3"><span className='shadow-lg'>You may also Like</span> </p>
        {/* {JSON.stringify(relatedProduct,null,4)} */}
      </div>
      <div className="col-md-12">
        <div className="discovers-grid">
          {relatedProduct?.map((product)=>(
              <a href=" "  className="shadow-lg" style={{borderRadius:'12px',border:'#8080805e solid 1px',width:'280px'}}>
            <figure>
              <div className="image-icons mt-1">
                <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`} className="mt-1" alt='Productimage'/>
                <i className="far fa-heart heart-icon" />
                <i className="far fa-star star-icon" />
                <i className="fas fa-share-alt share-icon" />
                <button className="cart-btn">Add to Cart <i className="fas fa-shopping-cart" /></button>
              </div>
              <figcaption className="discover-caption">
                <p className="discover-subtitle">{product.shortDescription}</p>
                <p className="discover-title">{product.productName}</p>
                <div className="price-div">
                  <p className="price">₹ {product.actualPrice}</p>
                  <p className="sale-price">₹ {product.sellingPrice}</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <span><small><button className='btn btn-success btn-sm ' style={{backgroundColor:"green"}} onClick={()=> navigate(`/product/${product._id}`)}>View <i className="fas fa-eye ms-1" /></button></small></span>
                    <span><button className='btn btn-warning btn-sm' style={{backgroundColor:"red"}} onClick={() => handleAddToCart(product)}>Buy Now  <i className="fas fa-shipping-fast ms-1" /></button></span>
                  </div>
              </figcaption>
            </figure>
          </a>
            ))
          }
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default SimilarProducts