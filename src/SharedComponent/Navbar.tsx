import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthProvider } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { ContextType } from "../Type/type";
import { IoHome } from "react-icons/io5";
import { MdPreview, MdRateReview } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
// import { FcAbout } from "react-icons/fc";
import { LiaSignInAltSolid, LiaSignOutAltSolid } from "react-icons/lia";
import { PiSignInDuotone } from "react-icons/pi";
import { ThemeProvider } from "../Context/ThemeContext";
import { FcAbout } from "react-icons/fc";
import './Navbar.css'


const Navbar = () => {
    const { user, signOutAuth } = (useContext(AuthProvider) as any) as ContextType
    const {setDark,dark} = (useContext(ThemeProvider)as any) 
    const navigate = useNavigate()    

    const signOut = () => {
        signOutAuth()
            .then(() => {
                toast('Your are successfully loged out')
                navigate('/signIn')
                // setLoader(false)
                
            }).catch(e => toast.error(e.message))
    } 
   
    const navIcons = <>
        <li ><NavLink className="flex items-center"to={'/'}>
            <IoHome />
            <span>Home</span></NavLink>
        </li>

        <li><NavLink className="flex items-center" to={'/allReviews'}>
            <VscPreview />

            Reviews</NavLink>
        </li>
        <li>
            <NavLink className="flex items-center" to={'/addReviews'}>
                <MdRateReview />
                Add-Reviews
            </NavLink>
        </li>
        <li>
            <NavLink className="flex items-center" to={'/displayMyReviews'}>
                <MdPreview />

                My-Reviews
            </NavLink></li>


        <li>
            <NavLink className="flex items-center" to={'/watchList'}>
                <MdPreview />

                WatchList
            </NavLink></li>
        <li>
            <NavLink className="flex items-center"  to={'/about'}>
                <FcAbout />
                About
            </NavLink></li>
    </>
    const authIcons = <>
        {
            !user ? 
                <ul className={`lg:flex gap-1 xl:gap-3 ${dark ? 'text-white font-medium' : 'text-black font-medium '}`}>
                    <li><NavLink className="flex items-center" to={'signIn'}><LiaSignInAltSolid />
                        Sign In</NavLink></li>
                    <li><NavLink className="flex items-center" to={'signUp'}><PiSignInDuotone />
                        Sign Up</NavLink></li>
                </ul >
                :
                <ul className={`lg:flex gap-4 items-center  ${dark ? 'text-white' : 'text-black font-medium'}`}>
                    <li><button className="flex items-center" onClick={signOut}><LiaSignOutAltSolid className="w-5 h-5" />
                        Sign Out</button></li>  
                    <figure className="">
                        <img className="rounded-full w-9 h-9 " src={`${user?.photoURL}`} />
                        {/* Theme control */}
                    </figure>
                       

                    
                </ul>
        }
    </>

    return (
        <nav className=" fixed z-10 w-full mx-auto">
             <div  className={`navbar max-w-7xl mx-auto  ${dark ? 'bg-[#1F2937] bg-opacity-50' :"bg-[#F5F5F5] bg-opacity-30  "}`}>
            <div className="navbar-start w-full">
                <div className="dropdown z-[10]">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm z-[15]  dropdown-content rounded-box mt-3 w-52 p-2 shadow font-medium ${dark?'text-white bg-base-100':'text-black font-semibold bg-gray-300'}`}>
                        {navIcons}
                        {authIcons}
                    </ul>
                </div>
                <div className="flex items-center">
                    <img src="/logo.webp" className="w-10 md:w-12 lg:w-12 xl:w-16 rounded-xl" alt="" />
                    <span className={`font-semibold  text-xl ${dark?'text-white':'text-black font-semibold'}`}>ReviewXP</span>
                </div>
            </div> 
            <div className="navbar-center  hidden lg:flex ">
                <ul className={` menu-horizontal gap-1 justify-start  lg:gap-5 xl:gap-6 m-0 p-0  ${dark?'text-white font-medium':'text-black font-medium'}`}>
                    {navIcons}
                </ul>
            </div>
            <div className="navbar-end gap-4 w-full ">
                {/* Theme control */}
                <label
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={`${dark ? 'light' : 'dark'}`}
                    data-tooltip-place="left"
                    className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* sun icon */}
                    <svg
                        onClick={()=>setDark(!dark)}
                        className="swap-off h-5 w-5 lg:h-7  lg:w-7 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        onClick={() => setDark(!dark)}
                        className="swap-on h-5 w-5 lg:h-7  lg:w-7 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
                <span className={` hidden lg:block`}>
                    {authIcons}
                   
                </span>
            </div>
        </div>
        </nav>
       
    );
};

export default Navbar;