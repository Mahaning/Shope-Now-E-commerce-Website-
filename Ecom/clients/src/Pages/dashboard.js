import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';

const Dashboard =()=>{
    return (
        <div>

            <Header/>
            {/* <br/>
            <br/>
            <br/>
            <br/>
            <CategoryNavbar/> */}
            <Toaster />

                <main className=' z-index-2 shadow  my-3 start-0 end-0 mx-4 radius-3' style={{minHeight:"150vh"}}> 
                <div>
Dashbord
                </div>
                {/* {children} */}
                </main>
            {/* <Footer/> */}
            <Footer/>
    </div>
    );
}
export default Dashboard;