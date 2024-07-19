import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal } from 'antd';

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bannersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    

    fetchBanners();
  }, []);
  const fetchBanners = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/banner/get-all-banners`);
      setBanners(data);
    } catch (error) {
      toast.error('Failed to fetch banners');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bannerImage', bannerImage);
    formData.append('description', description);

    try {
      await axios.post(`${process.env.REACT_APP_API}/api/v1/banner/upload-banner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Banner uploaded successfully');
      setVisible(false);
      setBannerImage(null);
      setDescription('');
      setBannerImage(null);
      // Refresh the banner list
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/banner/get-all-banners`);
      setBanners(data);
    } catch (error) {
      toast.error('Failed to upload banner');
    }
  };

  const updateHandler = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API}/api/v1/banner/update-banner-status/${id}`);
      toast.success('Banner status updated successfully');
      fetchBanners();
    } catch (error) {
      toast.error('Failed to update banner status');
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/api/v1/banner/delete-banner/${id}`);
      fetchBanners();
      toast.success('Banner deleted successfully');
      // Refresh the banner list
      fetchBanners();
      
    } catch (error) {
      toast.error('Failed to delete banner');
    }
  };

  const openModal = () => {
    setVisible(true);
  };
  useEffect(() => {
    

    fetchBanners();
  }, []);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.filter(banner => banner.bannerDescription.toLowerCase().includes(searchTerm.toLowerCase())).slice(indexOfFirstBanner, indexOfLastBanner);

  return (
    <div className="col-lg-11.5 grid-margin stretch-card" style={{ margin: "2.5%" }}>
      <div className="card" style={{ height: 'fit-content' }}>
        <div className="card-body">
          <div className='row'>
            <span style={{ display: 'flex', justifyContent: "space-between" }}>
              <h4 className="card-title">Banner List Table</h4>
              <button className='btn btn-primary float-right' onClick={() => openModal()}>Add Banner</button>
            </span>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by banner description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Banner Image</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBanners.map(banner => (
                  <tr key={banner._id}>
                    <td>
                      <img src={`data:${banner.bannerImage.contentType};base64,${banner.bannerImage.data}`} alt="banner" style={{ width: '150px', height: '50px' }} />
                    </td>
                    <td>{banner.bannerDescription}</td>
                    <td>{banner.active ? <span className='text-success'>Active</span> : <span className='text-danger'>Inactive</span>}</td>
                    <td>
                      <span>
                        <button className='btn btn-warning' style={{ backgroundColor: "transparent" }} onClick={() => updateHandler(banner._id)}>
                          <i className='fa fa-pen' style={{ color: '#696cff' }} />
                        </button>
                      </span>
                      <span className='ps-2'>
                        <button className='btn btn-danger' style={{ backgroundColor: "transparent" }} onClick={() => deleteHandler(banner._id)}>
                          <i className='fa fa-trash ' style={{ color: '#ff3e1d' }} />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(banners.length / bannersPerPage) }).map((_, index) => (
                <li key={index} className={index + 1 === currentPage ? "page-item active" : "page-item"}>
                  <a className="page-link" onClick={() => paginate(index + 1)} href="#">
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
            <div className="card-body shadow-lg" style={{ height: 'fit-content' }}>
              <h4 className="card-title text-center">Banner Details</h4>
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="bannerImage">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="bannerImage"
                    name="bannerImage"
                    required
                    onChange={(e) => setBannerImage(e.target.files[0])}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter banner description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button type="reset" className="btn btn-light" onClick={() => setVisible(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default BannerList;
