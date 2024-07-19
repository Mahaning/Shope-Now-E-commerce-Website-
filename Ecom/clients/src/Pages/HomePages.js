import React, { useEffect, useState } from 'react';
import Layout from '../components/Layouts/Layout';
import BannerSlider from '../components/Layouts/BannerSlider';
import { useAuth } from '../contxt/auth';
import ProductCarousel from '../components/Layouts/productCarousel';
import DiscountedProducts from '../components/Layouts/discountedProductCards';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function HomePages() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/fetch-all-product`);
      if (response.data?.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  const productsGroupedByCategory = products.reduce((acc, product) => {
    const categoryName = product.categoryId ? product.categoryId.name : 'Uncategorized';
    acc[categoryName] = acc[categoryName] || [];
    acc[categoryName].push(product);
    return acc;
  }, {});
  
  // Now you have products grouped by category
  console.log(productsGroupedByCategory);

  return (
    <div>
      <Layout>
        <BannerSlider />
        <DiscountedProducts products={products} discountPercentage={50} />
        {Object.entries(productsGroupedByCategory).map(([category, products]) => (
          <div key={category} className='shadow-lg' >
            <ProductCarousel products={products} category={category} />
           
          </div>
        ))}
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      </Layout>
    </div>
  );
}

