import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import "../Styleheets/productDetails.css"; // Import CSS for styling
import SimilarProducts from "../components/SimilarProducts.js";
import RatingCard from "../components/RatingCard.js";
import SingleProduct from "../components/SingleProduct.js";
import FeedBack from "../components/FeedBack.js";
import { useCart } from "../contxt/cart.js";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [relatedProduct,setrelatedProduct]=useState([]);
  const params = useParams();
  const navigate=useNavigate();
  const [cart,setCart]=useCart();
  useEffect(() => {
    if (params.id) getProduct();
  }, [params.id]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/fetch-single-product/${params.id}`
      );
      if (data.success) {
        setProduct(data.product);
        getRelatedProducts(data.product.categoryId._id, data.product._id);
      } else {
        toast.error(data.message || "Failed to fetch product details");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product details");
    }
  };
  
  const getRelatedProducts = async (cid, pid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-products/${pid}/${cid}`
      );
      setrelatedProduct(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch related products");
    }
  };

  return (
    <Layout>
      <div className="product-container">
        {product ? (
          <div className="row m-0">
            <SingleProduct product={product}/>
            <RatingCard product={product}/>
          <SimilarProducts relatedProduct={relatedProduct}/>
          <FeedBack/>
          </div>
        ) : (
          //products Ratings

          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}

export default ProductDetail;
