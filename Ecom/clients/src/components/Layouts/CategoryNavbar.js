import React, { useEffect, useState } from 'react';
import '../../Styleheets/categoryNavbar.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// const categories = [
//   { name: 'Electronics', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZdoE7qMMqKUk2BVSZc_LDTOuyx4arn7pBhZjtRM0-Vw&s' },
//   { name: 'Clothing', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2EB3XqhDs84A4NKiVOaze0yVokkdmNAVjuQWiR2edZ3e2JsAI' },
//   { name: 'Home appliances', imageUrl: 'https://etimg.etb2bimg.com/photo/94147047.cms' },
//   { name: 'Books', imageUrl: 'https://www.theglobeandmail.com/resizer/v2/2TEQON33AVGODLO4EMDRAS4VQM.JPG?auth=f92e55525244f840f8f80ec93c81837da7f4d5543ed1e541d51a0ec086eab12b&width=1200&height=800&quality=80' },
//   { name: 'Toys', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMuKOD1UV0MCSEYNPWzUSGo3bYsY5tFvHyacuT3MkH8dfc2O2C3eFbtZ-NAYjRPFHoLk&usqp=CAU' },
//   { name: 'Sports', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFn__xe1MCiEXVINhjC5c6rw0ozmORyzlQd9valVjADZXJ44nKcAasRNi7Nhuflk-AHR8&usqp=CAU' },
//   { name: 'Beauty', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2023/10/356144042/VK/KX/MD/135520142/beauty-cosmetics-500x500.jpg' },
// ];

const CategoryNavbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

  return (
    <div className="category-navbar z-index-3 ">
      {categories.map((category) => (
        <Link to={`/category/${category.slug}`}>
        <div key={category._id} className="category-item">
          <img src={`${process.env.REACT_APP_API}/api/v1/category/get-category-image/${category._id}`} alt={category.name} className="category-image" />
          <a href=""><p className="category-name">{category.name}</p></a>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryNavbar;
