import { useContext, useEffect, useState } from "react";
import { ReviewType } from "../../Type/type";
import DisplayAllReviews from "./DisplayAllReviews";
import CommonBanner from "../CommonComponent/CommonBanner";
import { ThemeProvider } from "../../Context/ThemeContext";

const AllReviews = () => {
    const [reviews, setReviews] = useState<ReviewType[]>([])
    const { dark } = useContext(ThemeProvider) as any
    const [sort, setSort] = useState(false)
    const [selectValue, setSelectValue] = useState('')

    useEffect(() => {
        fetch(`https://b10-game-review-server.vercel.app/reviews`)
            .then(res => res.json())
            .then(data => {
                 if (sort) {
                    const filter = data.sort((a: any, b: any) => b.rating - a.rating)
                    setReviews(filter)
                }
                if (selectValue) {
                    const filterBySelect = data.filter((v: ReviewType) => v.Genres == selectValue)
                     setReviews(filterBySelect)
                }
                else {
                    setReviews(data)
                }
            })
    }, [sort, selectValue])
    console.log(selectValue)

       const header = < header className = "relative h-52 md:h-[20rem] lg:h-[26rem]" >
                <img src="/images/banner5.jpg" alt="" className="w-full  md:h-full h-full xl:rounded-xl brightness-50 " />
                <div className="text-center absolute top-[20%] md:top-[30%] xl:top-[25%] text-white left-[3%] md:left-[10%] lg:left-[10%] xl:left-[18%] space-y-2 md:space-y-5">
                    <h1 className="text-2xl md:text-5xl font-semibold text-gray-300">Welcome to Reviews Collection page ....</h1>
                    <p className="text-gray-300">
                        You can Explore details any of them and can add to watch list by clicking....
                    </p>
                </div>
            </header >
    return (
        <div className="">
            <div className=" max-w-7xl mx-auto ">
                <CommonBanner header={header}/>
            </div>
            <div className="max-w-6xl mx-auto my-10 ">
                <div className="flex justify-end gap-4 pr-5">
                    <select onChange={e => setSelectValue(e.target.value)} className={`select select-primary select-sm md:select-md ${dark ? '' : 'bg-white text-black'}`} value={selectValue}>
                        <option disabled value=''>Genres</option>
                        <option value='Action'>Action</option>
                        <option value='RPG'>RPG</option>
                        <option value='Adventure'>Adventure</option>
                        <option value='Battle'>Battle Royal</option>
                        <option value='Survival'>Survival</option>
                        <option value='Strategy'>Strategy</option>
                    </select>
                    <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`${sort ? 'Normal?' : 'Sort: Assending?'}`}
                        data-tooltip-place="bottom"
                        onClick={() => setSort(!sort)} className="btn btn-accent btn-sm md:btn-md  md:px-5">Sort by rating</button>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  mt-10">
                    {reviews.length ?
                        
                            reviews?.map(review => <DisplayAllReviews key={review._id} review={review} />)
                        :
                        <div>
                            <h1 className="text-xl md:text-4xl font-semibold text-center">Theren is no data based on {selectValue} Genres</h1>
                        </div>
            }
                </div>
            </div>
        </div>
    );
};

export default AllReviews;