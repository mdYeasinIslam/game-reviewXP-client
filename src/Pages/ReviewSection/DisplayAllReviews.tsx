import { useContext } from "react";
import {  ReviewType } from "../../Type/type";
import { ThemeProvider } from "../../Context/ThemeContext";
import { NavLink } from "react-router-dom";

type Props = {
    review: ReviewType
} 

const DisplayAllReviews = ({ review }: Props) => {
    const { dark } = (useContext(ThemeProvider) as any)
    
    
    return (
        <div className={`card mx-auto image-full p-3  shadow-xl transform transition-transform duration-300 hover:scale-105 ${dark ? '' : ''}`}>
            <figure className="w-full h-[22rem] ">
                <img
                    className="w-full h-full"
                    src={review.image}
                    alt={review.title} />
            </figure>
            <div className="card-body justify-center ">

                <h2 className={`card-title text-2xl ${dark ? '' : 'text-white'}`}>{review.userName}</h2>
                <h2 className={`card-title ${dark ? '' : 'text-white'}`}>Games: {review.title}</h2>
                <div className={`space-y-2 ${dark ? '' : 'text-white'}`}>
                    <p className="m-0 p-0"><span className="font-semibold">Rating</span>: {review.rating}.0</p>
                    <p><span className="font-semibold">Description</span> :{review.description.slice(0,50)}...</p>
                </div>

                <div className="card-actions justify-end">
                    <NavLink to={`/allReviews/${review._id}`}> <button className="btn btn-primary">Explore Details</button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default DisplayAllReviews;