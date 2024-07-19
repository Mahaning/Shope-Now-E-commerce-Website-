
import AdminLayout from '../Components/Layout/AdminLayout.js';
import SideBar from '../Components/navbars/Sidebar.js';
import SearchNavBar from '../Components/navbars/nav.js';
import AdminHome from '../Components/adminhome.js';
import AdminFooter from '../Components/navbars/footer.js';
import { Routes, Route } from 'react-router-dom';
i
import OrderList from './orderlist.js';
import delevryPartnersDashboard from './delevryPartnersDashboard.js'
const Deliverypartners = () => {
    return (
        <>
            <AdminLayout>
                <SideBar />
                <div className="layout-page">
                    <SearchNavBar />
                    <Route path="/dashboard/other" element={<HomePages />}>
                            <Route path="/deliverypartners" element={<delevryPartnersDashboard />} />
                    </Route>
                    <AdminFooter />
                </div>
            </AdminLayout>
        </>
    );
}

export default Deliverypartners;
