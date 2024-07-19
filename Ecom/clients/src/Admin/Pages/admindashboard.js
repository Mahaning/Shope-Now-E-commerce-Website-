import AdminLayout from '../Components/Layout/AdminLayout.js';
import SideBar from '../Components/navbars/Sidebar.js';
import SearchNavBar from '../Components/navbars/nav.js';
import AdminHome from '../Components/adminhome.js';
import AdminFooter from '../Components/navbars/footer.js';
import { Routes, Route } from 'react-router-dom';
import UserList from './user.js';
import CategoryList from './categorylist.js';
import AddCategory from './AddCategory.js';
import AddProducts from './AddProducts.js';
import ProductList from './poductlist.js';
import CoupanList from './coupanlist.js';
import AddCoupan from './AddCoupan.js';
import OrderList from './orderlist.js';
import FeedbackList from './feedback.js';
import toast, { Toaster } from 'react-hot-toast';
import CustomerReport from './CustomerReport.js';
import SalesReport from './SalesReport.js';
import BannerList from './Bannerlist.js';

const AdminDashboard = () => {
    return (
        <>
            <AdminLayout>

                <SideBar />
                <div className="layout-page">
                    <SearchNavBar />
                    <Routes>
                        <Route path="admin" element={<AdminHome />} />
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
                    </Routes>
                    <AdminFooter />
                </div>

            </AdminLayout>
        </>
    );
}

export default AdminDashboard;
