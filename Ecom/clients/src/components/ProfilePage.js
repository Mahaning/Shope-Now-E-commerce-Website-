import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contxt/auth';

 const ProfilePage =()=>{
    const [auth, setAuth] = useAuth();
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    // const[password,setPassword]=useState('');
    const [editMode, setEditMode] = useState(false); // State to manage edit mode
    const navigate = useNavigate();
  
    useEffect(() => {
      const { firstName, lastName, email, phoneNumber, address } = auth?.user || {};
      setFirstName(firstName || '');
      setLastName(lastName || '');
      setEmail(email || '');
      setPhoneNumber(phoneNumber || '');
      setAddress(address || '');
      // setPassword(password || '')

    }, [auth?.user]);
  
    const handleEditClick = () => {
      setEditMode(true); // Enable edit mode
    };
  
    const handleCancelClick = () => {
      // Reset fields to original values
      const { firstName, lastName, email, phoneNumber, address } = auth?.user || {};
      setFirstName(firstName || '');
      setLastName(lastName || '');
      setEmail(email || '');
      setPhoneNumber(phoneNumber || '');
      setAddress(address || '');
      // setPassword(password || '');
      setEditMode(false); // Disable edit mode
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/user-profile`, { firstName, lastName, email, phoneNumber, address });
        console.log(process.env.REACT_APP_API);
        if (data?.error) {
          toast.error(data.error);
        } else {
          setAuth({ ...auth, user: data?.updateUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updateUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Updated");
        }
        console.log(firstName, lastName, email, phoneNumber, address);
      } catch (error) {
        console.log(error);
        toast.error("Can't Update");
      }
  };
  return (
    <>
    <div className="content-wrapper">
    <section style={{ backgroundColor: '#eee' }}>
    <form id="formAuthentication" className="mb-3" action="index.html" method="POST" onSubmit={handleSubmit}>
      <MDBContainer className="py-3">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow style={{marginBottom:'0.4rem'}}>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
              <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid
                      />
                      <p className="text-muted mb-1">Full Stack Developer</p>
                      <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                      <div className="d-flex justify-content-center mb-2">
                        {!editMode ? (
                          <button className="btn btn-sm btn-primary" onClick={handleEditClick}>
                            Edit
                          </button>
                        ) : (
                          <>
                            <MDBBtn type="submit">Update</MDBBtn>
                            <MDBBtn onClick={handleCancelClick} className="mx-2">
                              Cancel
                            </MDBBtn>
                          </>
                        )}
                      </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        
          <MDBCol lg="8">
          
            <MDBCard className="mb-4">
            
              <MDBCardBody>
             
              <MDBRow className="align-items-center" style={{marginBottom:'0.4rem'}}>
      <MDBCol sm="3">
        <MDBCardText>First Name</MDBCardText>
      </MDBCol>
      <MDBCol sm="9">
      <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            autoFocus
                            required
                            disabled={!editMode}
                          />
      </MDBCol>
      <MDBCol sm="3">
        <MDBCardText>Last Name</MDBCardText>
      </MDBCol>
      <MDBCol sm="9">
      <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            disabled={!editMode}
                          />
      </MDBCol>
    </MDBRow>
                <hr />
                <MDBRow style={{marginBottom:'0.4rem'}}>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                    <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={!editMode}
                          />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{marginBottom:'0.4rem'}}>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                    <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            disabled={!editMode}
                          />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                {/* <MDBRow style={{marginBottom:'0.4rem'}}>
                  <MDBCol sm="3">
                    <MDBCardText>Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                    <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="**********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={!editMode}
                          />
                          
                    </MDBCardText>
                  </MDBCol>
                </MDBRow> */}
                <hr/>
                <MDBRow style={{marginBottom:'0.4rem'}}>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                    <textarea
                            className="form-control"
                            id="address"
                            name="address"
                            rows="3"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            disabled={!editMode}
                          ></textarea>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{marginBottom:'0.4rem'}}>
                    
                <MDBCardText className="text-muted">
                <button className="btn btn-primary d-grid w-100">Update</button>
                </MDBCardText>
                </MDBRow>
                
              </MDBCardBody>
             
            </MDBCard>
            
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
      </form>
    </section></div>
    </>
  );
}

export default ProfilePage;