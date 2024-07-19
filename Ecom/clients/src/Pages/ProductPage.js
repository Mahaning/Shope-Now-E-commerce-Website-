import React, { useEffect, useState } from 'react';
import Layout from '../components/Layouts/Layout.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import Productcards from '../components/Layouts/productcards.js';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices.js';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  useEffect(() => {
    getAllProducts();
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`);
      if (response.data?.success) {
        setCategories(response.data.allData);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/fetch-all-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching products");
    }
  };

  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
        params: { checked, radio }
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to apply filter");
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
  };

  return (
    <Layout title="All products">
      <div className='row mt-3' style={{ backgroundColor: 'transparent' }}>
        <div className='col-md-3 shadow-lg rounded-3' style={{ marginLeft: '3%' }}>
          <h5 className='text-center'>Filter By Category</h5>
          <div className='d-flex flex-column'>
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                checked={checked.includes(category._id)}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>

          <h5 className='text-center mt-4'>Filter By Price</h5>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
              {Prices?.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array} name="priceRange">{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <br/>
          <div>
            <button className='btn btn-warning' onClick={resetFilters}>Reset Filter</button>
          </div>
        </div>
        <div style={{ width: '0px' }}></div>
        <div className='col-md-8 shadow-lg rounded-3'>
          <h1 className='text-center'>All products</h1>
          <div className='d-flex flex-wrap'>
            <Productcards products={products} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;
