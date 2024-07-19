
import { Routes, Route } from 'react-router-dom';
import ProfilePage from '../../components/ProfilePage.js';
import UserLayout from '../Components/Layout/UserLayout.js';
import UserSideBar from '../Components/navbars/UserSideBar.js';
import UserOrders from '../../Pages/UserOrders.js';

const UserDashboard = () => {
    return (
        <>
        <UserLayout>
            <UserSideBar/>
            <div className="layout-page">
                    <Routes>
                        <Route path="user" element={<ProfilePage/>} />
                        <Route path="user/order" element={<UserOrders />} />
                    </Routes>

                <ProfilePage/>
                </div>
                </UserLayout>
        </>
    );
}

export default UserDashboard;
