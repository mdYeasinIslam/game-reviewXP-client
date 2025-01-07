import AllGames from "./AllGames/AllGames";
import Banner from "./Banner/Banner";
import Fetaures from "./ExtraFeature/Fetaures";
import ReviewsSlider from "./Some_reviews/ReviewsSlider";

const Home = () => {
    return (
        <div>
            <div className="mb-10 ">

            <Banner/>
            </div>
            <div>
                <ReviewsSlider/>
            </div>
            <div className="max-w-7xl mx-auto">
            <AllGames/>
            </div>
            <div>
             <Fetaures/>
            </div>
        </div>
    );
};

export default Home;