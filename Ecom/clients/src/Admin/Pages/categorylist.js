import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from 'antd';
import { NavLink, useNavigate } from "react-router-dom";
import Pagination from "../Components/pagination.js";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]); // State for filtered categories
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can set this to a different number if you prefer
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCategory();
  }, [currentPage]);

  useEffect(() => {
    // Update filtered categories whenever categories or searchTerm changes
    const filtered = categories.filter(category => {
      return category.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`, {
        params: { page: currentPage, limit: itemsPerPage }
      });
      if (response.data?.success) {
        setCategories(response.data.allData);
        setTotalItems(response.data.totalItems); // Assuming the API returns total items
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
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selectedCategory._id}`, formData);
      if (response.data?.success) {
        toast.success("Category updated successfully");
        setOpen(false);
        fetchAllCategory();
      } else {
        toast.error("Failed to save category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category");
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setImage('');
    setSelectedCategory(null);
    setOpen(false);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setDescription(category.description);
    setImage(`${process.env.REACT_APP_API}/api/v1/category/get-category-image/${category._id}`);
    setOpen(true);
  };

  const handleDelete = async (catId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${catId}`);
      if (response.data?.success) {
        toast.success('Category deleted successfully');
        fetchAllCategory();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    // Perform filtering based on searchTerm
    const filtered = categories.filter(category => {
      return category.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredCategories(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Toaster />
      <div className="col-lg-11.5 grid-margin" style={{ margin: "2.5%" }}>
        <div className="card shadow-lg" style={{height: "fit-content"}}>
          <div className="card-body">
            <div className="row">
              <span style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <h4 className="card-title">Category Table</h4>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    autoFocus
                  />
                  <button className="btn btn-primary ml-2" onClick={handleSearch}>Search</button>
                </div>
                <NavLink className="btn btn-primary float-right" to={'/dashboard/admin/addcategory'}>
                  Add Category
                </NavLink>
              </span>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="col-1">Image</th>
                    <th className="col-2.5">Category Name</th>
                    <th className="col-2">Status</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category._id}>
                      <td className="py-1">
                        <img
                          className="rounded-circle"
                          src={`${process.env.REACT_APP_API}/api/v1/category/get-category-image/${category._id}`}
                          alt={category.name}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>{category.name}</td>
                      <td>{category.active ? <span className="badge bg-success">Active</span> : <span className="badge bg-danger">Disable</span>}</td>
                      <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn" onClick={() => handleEdit(category)}>
                          <i className="fa fa-pen" />
                        </button>
                        <button className="btn" style={{ marginLeft: "1.5rem" }} onClick={() => handleDelete(category._id)}>
                          <i className="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <Modal open={open} onCancel={resetForm} footer={null}>
              <h2 className="mt-4 mb-4 text-primary">{selectedCategory ? "Edit Category" : "Add Category"}</h2>
              <div className="row">
                <div className="card" style={{ borderRadius: "15px", height: 'fit-content' }}>
                  <div className="card-body">
                    <form onSubmit={handleUpdate}>
                      <div className="form-group">
                        <label htmlFor="categoryName" style={{ color: "#595959", fontWeight: "bold" }}>Category Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="categoryName"
                          placeholder="Enter category name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description" style={{ color: "#595959", fontWeight: "bold" }}>Description</label>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          placeholder="Enter description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="categoryImg" style={{ color: "#595959", fontWeight: "bold" }}>Upload Images</label>
                        <input
                          type="file"
                          className="form-control"
                          id="categoryImg"
                          name="categoryImg"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>
                      {image && typeof image === 'object' ? (
                        <div className="text-center">
                          <img src={URL.createObjectURL(image)} alt="Category Image" height="150px" className="img img-responsive" />
                        </div>
                      ) : image && (
                        <div className="text-center">
                          <img src={image} alt="Category Image" height="150px" className="img img-responsive" />
                        </div>
                      )}
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

export default CategoryList;
