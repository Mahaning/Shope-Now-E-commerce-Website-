import React from 'react';
import { useCart } from '../contxt/cart.js';
import toast from 'react-hot-toast';

function SingleProduct({product}) {
  const [cart,setCart]=useCart();
  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success("Item Added to Cart");
};
  return (
    <div className='row m-0'>
        <div className="col-md-8">
              <div className="row ms-2">
                <div
                  className="col-md-3 shadow-lg"
                  style={{ height: "31rem", borderRadius: "12px" }}
                >
                  <div className="row">
                    <div className="col-md-12 col-6 mb-3 ms-4 mt-4 ">
                      <img
                        src="https://m.media-amazon.com/images/I/71pHAEYmgBL._SL1500_.jpg"
                        className="product-photo-side"
                        alt='img'
                      />
                    </div>
                    <div className="col-md-12 col-6 mb-3 ms-4 mt-1">
                      <img
                        src="https://m.media-amazon.com/images/I/71gJQzNsMlL._SL1500_.jpg"
                        className="product-photo-side shadow-sm"
                        alt='img'
                      />
                    </div>
                    <div className="col-md-12 col-6 mb-3 ms-4 mt-1">
                      <img
                        src="https://m.media-amazon.com/images/I/71YlDPQPOYL._SL1500_.jpg"
                        className="product-photo-side shadow-sm"
                        alt='img'
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  {/* <img src="https://m.media-amazon.com/images/I/71y2uS08E0L._SL1500_.jpg" className="product-photo-center" /> */}
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`}
                    className="product-photo-center shadow-lg"
                    style={{ display: "block" }}
                    alt='img'
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <div className="row justify-content-start">
                    <div className="col-md-10">
                      <i className="fa fa-star star-icon7"> </i>
                      <i className="fa fa-star star-icon7" />
                      <i className="fa fa-star star-icon7" />
                      <i className="fa fa-star star-icon7" />
                      <i className="fa fa-star star-icon7" />
                      &nbsp; &nbsp;
                      <i className="fas fa-heart heart-icon1" />
                      <span className="num-likes">1.2k Likes</span>
                    </div>
                    <div className="col-md-10">
                      <p className="section-title6 mb-0">
                        {product.productName}
                      </p>
                      <p className="section-title2 mb-0 mt-2">
                        Selling Price :₹ {product.sellingPrice}
                      </p>
                      <p className="lines-title">
                        <s>Actual Price :₹ {product.actualPrice}</s>
                      </p>
                    </div>
                    <div className="col-md-10">
                      <p className="lines-title mb-1">
                        {product.productDescription}
                      </p>
                    </div>
                    <div className="col-md-12 mb-3 mt-3">
                      <button className="btn cart-btn2" onClick={() => handleAddToCart(product)}>
                        Add to Cart <i className="ps-2 fas fa-shopping-cart" />
                      </button>
                      <button className="btn buy-btn2 mt-3">
                        Buy Now <i className="ps-2 fas fa-shipping-fast" />
                      </button>
                    </div>
                    <div className="col-md-10 mb-4">
                      <div className="row no-gutter">
                        <div className="col-md-6 col-5">
                          <button className="btn wishlist-btn">
                            <i className="far fa-star" />
                            <p className="mb-0">Wishlist it</p>
                          </button>
                        </div>
                        <div className="col-md-6 col-5">
                          <button className="btn like-btn">
                            <i className="far fa-heart" />
                            <p className="mb-0">Like it</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default SingleProduct