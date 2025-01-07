import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar";
import Footer from "../SharedComponent/Footer";

const Main = () => {
    const {pathname} = useLocation()
    console.log(pathname)
    return (
        <div>
            {
                !(pathname=='/signUp' || pathname =='/signIn') && <div className="fixed z-10 w-full mx-auto"><Navbar /></div>
            }
           
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;