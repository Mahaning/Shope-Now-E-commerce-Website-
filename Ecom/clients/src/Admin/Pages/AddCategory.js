import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/add-category`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success(`${name} Category added successfully`);
        navigate('/dashboard/admin/categorylist');
      } else {
        toast.error(`Failed to create category: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the category");
    }
  };

  return (
    <div className="content-wrapper">
      <div className="col-md-6 container align-items-center">
        <div className="grid-margin row align-items-center justify-content-center" style={{ margin: "2.5%" }}>
          <div className="card shadow" style={{ height: 'fit-content' }}>
            <div className="card-body">
              <h4 className="card-title">Add Category</h4>
              <p className="card-description">Basic form layout</p>
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
