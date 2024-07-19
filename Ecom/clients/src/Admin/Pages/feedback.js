import React, { useEffect, useState } from 'react';
import AdminLayout from '../Components/Layout/AdminLayout.js';
import SideBar from '../Components/navbars/Sidebar.js';
import SearchNavBar from '../Components/navbars/nav.js';
import AdminFooter from '../Components/navbars/footer.js';
import axios from 'axios';
import toast from 'react-hot-toast';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllFeedBack(); // Initialize filtered feedbacks with all feedbacks
  }, []);

  // Function to handle search input change
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = feedbacks.filter((feedback) =>
      feedback.name.toLowerCase().includes(searchTerm) ||
      feedback.product.toLowerCase().includes(searchTerm) ||
      feedback.feedback.toLowerCase().includes(searchTerm)
    );
    setFilteredFeedbacks(filtered);
  };

  const fetchAllFeedBack = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/feedback/fetch-all-feedback`);
      const data = response.data;
      if (data.success) {
        setFeedbacks(data.feedback);
      } else {
        toast.error("Failed to fetch FeedBacks");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const deleteHandle = async (fId) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/feedback/delete-feedback/${fId}`);
      if (data.success) {
        toast.success('FeedBack deleted successfully');
        fetchAllFeedBack();
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="col-lg-11.5 grid-margin" style={{ margin: '2.5%' }}>
        <div className="card shadow-lg" style={{ height: 'auto' }}>
          <div className="card-body">
            <h4 className="card-title">Feedbacks</h4>
            {/* Search Input */}
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name or Product or Feedback"
                value={searchTerm}
                onChange={handleSearch}
                autoFocus
              />
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Feedback</th>
                    <th>Date</th>
                    <th>Ratings</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback.id}>
                      <td>{feedback.userId.email}</td>
                      <td>{feedback.ProductId.productName}</td>
                      <td>{feedback.feedbackText}</td>
                      <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                      <td>{feedback.rating}/5</td>
                      <td>
                    
                      <span style={{ marginLeft: '1.5rem' }}>
                        <button className="btn" style={{ backgroundColor: 'transparent' }} onClick={() => deleteHandle(feedback._id)}>
                          <i className='fa fa-trash' style={{ color: '#696cff' }} />
                        </button>
                      </span>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
