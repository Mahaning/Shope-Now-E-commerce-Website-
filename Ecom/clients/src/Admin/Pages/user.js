import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contxt/auth";
import { NavLink } from "react-router-dom";

const UserList = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-users`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter users based on search term
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="col-lg-11.5 grid-margin" style={{ margin: "2.5%" }}>
        <div className="card shadow-lg" style={{ height: 'fit-content' }}>
          <div className="card-body">
            <h4 className="card-title">Users Table</h4>
            {/* Search input */}
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by email or full name"
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
            </div>
            <div className="table-responsive mt-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Joined On</th>
                    {/* <th>Status</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping through filteredUsers instead of users */}
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.address}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      {/* <td>
                        <span className={`btn btn-sm ${user.active ? 'btn-primary' : 'btn-danger'}`}>
                          {user.active ? 'Active' : 'Deactivated'}
                        </span>
                      </td> */}
                      <td>
                        <NavLink to='/dashboard/admin/orderlist'>
                        <i className="fa fa-eye btn btn-sm btn-secondary" />
                        </NavLink>
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

export default UserList;
