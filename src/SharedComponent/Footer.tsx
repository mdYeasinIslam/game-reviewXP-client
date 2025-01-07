import { useContext } from "react";
import { ThemeProvider } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { dark } = (useContext(ThemeProvider) as any) 

    return (
        <div>
        <footer className={`footer container mx-auto p-10 bg-neutral mt-10  ${dark?'text-neutral-content':'bg-white text-black border-2'}`}>
             <nav>
               <header className="footer-title">ReviewXP</header>
               <span >Branding</span>
               <span >Design</span>
               <span >Marketing</span>
               <span >Advertisement</span>
             </nav>
             <nav>
               <header className="footer-title">Routes</header>
               <Link to='/' className="link link-hover">Home</Link>
               <Link to='about' className="link link-hover">About us</Link>
               <Link to={'allReviews'} className="link link-hover">Reviews</Link>
               <Link to={'addReviews'} className="link link-hover">Add-Reviews</Link>
               <Link to={'watchList'} className="link link-hover">Watchlist</Link>
             </nav>
             <nav>
               <header className="footer-title">Legal</header>
               <span className="">Terms of use</span>
               <span className="">Privacy policy</span>
               <span className="">Cookie policy</span>
             </nav>
           </footer> 
        </div>
    );
};

export default Footer;