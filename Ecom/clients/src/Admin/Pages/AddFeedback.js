import React from 'react';
import AdminLayout from "../Components/Layout/AdminLayout";

const AddFeedBack = () => {
  return (
    <AdminLayout>
        <div className="content-wrapper shadow-lg">
      <div className="col-md-6 container align-items-center">
        <div className="grid-margin row align-items-center justify-content-center" style={{ margin: "5.5%" }}>
          <div className="card shadow-lg" style={{ height: 'fit-content' }}>
            <div className="card-body">
              <h4 className="card-title">Submit Feedback</h4>
              <form className="forms-sample" >
                <div className="form-group">
                 
                  <div className="form-group">
                  <label htmlFor="rating">User</label>
                  <input
                    type="text"
                    className="form-control"
                    id="User"
                    name="User"
                    // min="1"
                    // max="5"
                    required
                  />
                </div>
                </div>
                <div className="form-group">
                  <label htmlFor="productId">Product</label>
                  <select
                    className="form-control"
                    id="productId"
                    name="productId"
                 
                    required
                  >
                    <option value="">Select Product</option>
                   
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="feedbackText">Feedback</label>
                  <textarea
                    className="form-control"
                    id="feedbackText"
                    name="feedbackText"
                    placeholder="Enter your feedback"
     
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <input
                    type="number"
                    className="form-control"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
                <button type="button" className="btn btn-light" >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AddFeedBack;
