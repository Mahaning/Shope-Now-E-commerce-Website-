import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePages from './Pages/HomePages';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import PageNotFound from './Pages/PageNotFaound';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Signin } from './Pages/signin.js';
import { Signup } from './Pages/signup.js';

import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/Layouts/Routes/Private.js';
import AdminRoute from './components/Layouts/Routes/AdminRoute.js';
import AdminDashboard from './Admin/Pages/admindashboard.js';
import UserList from './Admin/Pages/user.js';
// import ProductList from './Admin/Pages/categorylist.js';
import CategoryList from './Admin/Pages/categorylist.js';
import ProductList from './Admin/Pages/poductlist.js';
import CoupanList from './Admin/Pages/coupanlist.js';
import AddCategory from './Admin/Pages/AddCategory.js';
import AddProducts from './Admin/Pages/AddProducts.js';
import AddCoupan from './Admin/Pages/AddCoupan.js';
import OrderList from './Admin/Pages/orderlist.js';
import FeedbackList from './Admin/Pages/feedback.js';
import AddFeedBack from './Admin/Pages/AddFeedback.js';
import ProductPage from './Pages/ProductPage.js';
import Search from './Pages/Search.js';
import ProductDetail from './Pages/ProductDetail.js';
import CategoryProduct from './Pages/CategoryProduct.js';
import CartPage from './Pages/cartPage.js';
import UserDashboard from './Admin/Pages/userDashboard.js';
import UserOrders from './Pages/UserOrders.js';
import CustomerReport from './Admin/Pages/CustomerReport.js';
import SalesReport from './Admin/Pages/SalesReport.js';
import BannerList from './Admin/Pages/Bannerlist.js';
import { ResetPassword } from './Pages/ResetPassword.js';
import DelevryPartnersDashboard from './Admin/Pages/delevryPartnersDashboard.js';




function App() {
  return (
    
    <>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 5000 }} containerStyle={{
          zIndex: 999999999999999,
        }}/>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/dashboard/" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/order" element={<UserOrders />} />
          
          {/* <Route path="user/dashboard/user" element={<Profile />} /> */}
        </Route>

        <Route path="/deliverypartners/dashboard" element={<DelevryPartnersDashboard/>} />

        <Route path="/dashboard/" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/userlist" element={<UserList />} />
          <Route path="admin/categorylist" element={<CategoryList />} />
          <Route path="admin/addcategory" element={<AddCategory />} />
          <Route path="admin/addproducts" element={<AddProducts />} />
          <Route path="admin/productlist" element={<ProductList />} />
          <Route path="admin/coupanlist" element={<CoupanList />} />
          <Route path="admin/addcoupan" element={<AddCoupan />} />
          <Route path="admin/orderlist" element={<OrderList />} />
          <Route path="admin/feedbacks" element={<FeedbackList />} />
          <Route path="admin/customer-reports" element={<CustomerReport />} />
          <Route path="admin/sales-reports" element={<SalesReport />} />
          <Route path="admin/settings/banners" element={<BannerList />} />
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/all-products" element={<ProductPage/>} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/feedback" element={<AddFeedBack />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart-items" element={<CartPage/>}/>
        <Route path="/search" element={<Search/>} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
