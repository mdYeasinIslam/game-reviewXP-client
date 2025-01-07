import { useContext, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { ReviewType } from "../../../Type/type";
import DetailsSlider from "./DetailsSlider";
import { ThemeProvider } from "../../../Context/ThemeContext";

const ReviewsSlider = () => {
    const [reviews, setReviews] = useState<ReviewType[]>([])
    const { dark } = useContext(ThemeProvider) as any
    useEffect(() => {
        fetch(`https://b10-game-review-server.vercel.app/reviews`)
            .then(res => res.json())
            .then(data => {
                const filter = data.filter((rev: ReviewType) => rev.image.length > 0)
                setReviews(filter)

            })
    }, [])
    return (
        <div className="lg:max-w-4xl xl:max-w-screen-lg mx-auto my-10 md:space-y-5">
            <div className={`ml-2 md:ml-5 lg:ml-0 ${dark ? 'text-white' : 'text-black'} text-center`}>
                <h1  className={`text-3xl  font-semibold  `}>Some Review with Marquee </h1>
                <p>You can Explore details any of them and can add to watch list by clicking</p>
            </div>
            <Marquee pauseOnHover className="h-[15rem] ">
                <div className="flex lg:gap-10 ">
                    {reviews?.map(review => <DetailsSlider key={review?._id} review={review} />)}
                </div>
            </Marquee>
        </div>
    );
};

export default ReviewsSlider;