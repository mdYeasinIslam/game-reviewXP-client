import { NavLink } from 'react-router-dom';
import { ReviewType } from '../../../Type/type';

type PropType = {
    review:ReviewType
}
const DetailsSlider = ({ review }:PropType) => {
    return (
        <div className="border-2 w-32 md:w-40 ml-5 bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg ">
            <NavLink to={`allReviews/${review._id}`} className="">
                <img className=" w-full h-full brightness-75" src={review?.image} alt="" />
            </NavLink>
        </div>
    );
};

export default DetailsSlider;