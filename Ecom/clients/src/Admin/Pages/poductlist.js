import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from 'antd';
import { NavLink, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImage, setProductImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [remainingQuantity, setRemainingQuantity] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImg, setProductImg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this value to display different number of items per page
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategory();
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('categoryId', categoryId);
    formData.append('actualPrice', actualPrice);
    formData.append('sellingPrice', sellingPrice);
    formData.append('totalQuantity', totalQuantity);
    formData.append('remainingQuantity', remainingQuantity);
    formData.append('shortDescription', shortDescription);
    formData.append('productDescription', productDescription);
    if (productImg) {
      formData.append('productImg', productImg);
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${selectedProduct._id}`, formData);
      if (response.data?.success) {
        toast.success("Product updated successfully");
        setOpen(false);
        const updatedProducts = products.map(product => {
          if (product._id === selectedProduct._id) {
            return { ...product, ...formData };
          }
          return product;
        });
        setProducts(updatedProducts);
        fetchAllProducts();
      } else {
        toast.error("Failed to save product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  const resetForm = () => {
    setProductName('');
    setCategoryId('');
    setActualPrice('');
    setSellingPrice('');
    setTotalQuantity('');
    setRemainingQuantity('');
    setShortDescription('');
    setProductDescription('');
    setProductImg('');
    setProductImage('');
    setSelectedProduct(null);
    setOpen(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductName(product.productName);
    setCategoryId(product.categoryId._id);
    setActualPrice(product.actualPrice);
    setSellingPrice(product.sellingPrice);
    setTotalQuantity(product.totalQuantity);
    setRemainingQuantity(product.remainingQuantity);
    setShortDescription(product.shortDescription);
    setProductDescription(product.productDescription);
    setProductImg(null);
    setProductImage(`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`);
    setOpen(true);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${productId}`);
      if (response.data?.success) {
        toast.success('Product deleted successfully');
        // Filter out the deleted product from the products array
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter products based on search term
  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current products for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Toaster />
      <div className="col-lg-11.5 grid-margin" style={{ margin: "2.5%" }}>
        <div className="card shadow-lg" style={{ height: 'fit-content' }}>
          <div className="card-body">
            <div className="row">
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 className="card-title">Products Table</h4>
                <NavLink className="btn btn-primary float-right" to={'/dashboard/admin/addproducts'}>
                  Add Product
                </NavLink>
              </span>
            </div>
            {/* Search input */}
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
            </div>
            <div className="table-responsive mt-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="col-1">Image</th>
                    <th className="col-2.5">Product Name</th>
                    <th className="col-2">Category</th>
                    <th className="col-1">Actual Price</th>
                    <th className="col-1">Selling Price</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product) => (
                    <tr key={product._id}>
                      <td className="py-1">
                        <img
                          className="rounded-circle"
                          src={`${process.env.REACT_APP_API}/api/v1/product/get-product-image/${product._id}`}
                          alt={product.productName}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>{product.productName}</td>
                      <td>{product.categoryId.name}</td>
                      <td>{product.actualPrice}</td>
                      <td>{product.sellingPrice}</td>
                      <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn" onClick={() => handleEdit(product)}>
                          <i className="fa fa-pen" />
                        </button>
                        <button className="btn" style={{ marginLeft: "1.5rem" }} onClick={() => handleDelete(product._id)}>
                          <i className="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              {/* Pagination */}
              <ul className="pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map((_, index) => (
                  <li key={index} className="page-item">
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <Modal visible={open} onCancel={resetForm} footer={null}>
              <h2 className="mt-4 mb-4 text-primary">{selectedProduct ? "Edit Product" : "Add Product"}</h2>
              <div className="row">
                <div className="card" style={{ borderRadius: "15px" ,height: 'fit-content' }} >
                  <div className="card-body">
                    <form onSubmit={handleUpdate}>
                    <div className="form-group">
                <label htmlFor="categoryId" style={{ color: "#595959", fontWeight: "bold" }}>Category Name</label>
                <select
                  className="form-control"
                  id="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productName" style={{ color: "#595959", fontWeight: "bold" }}>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="shortDescription" style={{ color: "#595959", fontWeight: "bold" }}>Short Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="shortDescription"
                  placeholder="Enter short description"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="sellingPrice" style={{ color: "#595959", fontWeight: "bold" }}>Selling Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="sellingPrice"
                      placeholder="Enter selling price"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="actualPrice" style={{ color: "#595959", fontWeight: "bold" }}>Actual Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="actualPrice"
                      placeholder="Enter actual price"
                      value={actualPrice}
                      onChange={(e) => setActualPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="totalQuantity" style={{ color: "#595959", fontWeight: "bold" }}>Total Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalQuantity"
                      placeholder="Enter total quantity"
                      value={totalQuantity}
                      onChange={(e) => setTotalQuantity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="remainingQuantity" style={{ color: "#595959", fontWeight: "bold" }}>Remaining Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="remainingQuantity"
                      placeholder="Enter remaining quantity"
                      value={remainingQuantity}
                      onChange={(e) => setRemainingQuantity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="productDescription" style={{ color: "#595959", fontWeight: "bold" }}>Product Description</label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  placeholder="Enter long description"
                  rows="3"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="productImg" style={{ color: "#595959", fontWeight: "bold" }}>Images
                {productImg ? productImg.productName:"Upload Images"}
                {/* <input
                  type="file"
                  className="form-control"
                  id="productImg"
                  name='productImg'
                  accept='image/*'
                  multiple
                  // width={"80%"}
                  onChange={(e)=>{
                    setproductImg(e.target.files[0])
                  }}
                />*/}
                </label> 
              </div>
              <div className="form-group">
                <label htmlFor="productImg" style={{ color: "#595959", fontWeight: "bold" }}>Images
                {productImg &&(
                <div className='text-center'>

                  <img src={URL.createObjectURL(productImg)} alt='Product Image' height={"150px"} className='img img-responsive'/>

                </div>
                )}</label>
              </div>
                      <div className="form-group" style={{ marginTop: "20px" }}>
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button type="reset" className="btn btn-secondary" style={{ marginLeft: "10px" }} onClick={resetForm}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
