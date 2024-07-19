import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [remainingQuantity, setRemainingQuantity] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImg,setproductImg]=useState('');
  const navigate=useNavigate();
  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`);
        if (data?.success) {
          setCategories(data?.allData);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while fetching the categories");
      }
    };
    fetchAllCategory();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic
    try {
      const formData=new FormData();
      formData.append('productName', productName);
      formData.append('categoryId', categoryId);
      formData.append('actualPrice', actualPrice);
      formData.append('sellingPrice', sellingPrice);
      formData.append('totalQuantity', totalQuantity);
      formData.append('remainingQuantity', remainingQuantity);
      formData.append('shortDescription', shortDescription);
      formData.append('productDescription', productDescription);
      formData.append('productImg',productImg)
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,formData);
      if (data?.success) {
        // setCategories(data?.allData);
        toast.success("Product have created");
        navigate('/dashboard/admin/productlist');
      }else{
        toast.error("Product Cant creted")
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the Product");
    }
  };

  return (
    <div className="grid-margin shadow-lg row align-items-center justify-content-center" style={{ margin: "3%",height: 'fit-content' }}>
      <h2 className="mt-4 mb-4 text-primary">Add Product</h2>
      <div className="row">
        <div className="card" style={{ borderRadius: "15px" ,height: 'fit-content'}}> 
          <div className="card-body">
            <form onSubmit={handleSubmit}>
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
                <input
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
                /></label>
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
                <button type="submit" className="btn btn-primary mr-6">Submit</button>
                <span style={{ marginLeft: "10px" }}></span>
                <button type="reset" className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
