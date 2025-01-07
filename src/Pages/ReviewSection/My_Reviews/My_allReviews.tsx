// import { useLoaderData } from "react-router-dom";
import { ContextType, ReviewType } from "../../../Type/type";
import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../../Context/AuthContext";
import { ThemeProvider } from "../../../Context/ThemeContext";
import Diplay_MyReviews from "./Diplay_MyReviews";
import { CommonHeading } from "../../../SharedComponent/CommonHeading";

const My_allReviews = () => {
    // const myReviewsData = useLoaderData() as ReviewType[]
    const {user} = useContext(AuthProvider)as ContextType
    const [myReviews,setMyReviews] =useState<ReviewType[]>([])
    const { dark } = useContext(ThemeProvider) as any
    const [loader, setLoader] = useState(true)
    const [isUpdate, setIsUpdate] = useState(true)

    useEffect(() => { 
        fetch(`https://b10-game-review-server.vercel.app/reviews`)
            .then(res => res.json())
            .then(data => {
                const filter = data?.filter((revieiw:ReviewType) => revieiw.userEmail == user.email)
                if (isUpdate) {
                    setMyReviews(filter)
                     setLoader(false)
                }
                else {
                    setMyReviews(filter)
                    setLoader(false)
                }

            })

    }, [user,isUpdate])

    const afterDelete = (id:string) => {
        const filter = myReviews?.filter(rev => rev._id != id)
        setMyReviews(filter)
        
    }
    const afterUpdate = () => {
        setIsUpdate(!isUpdate)

    }

     const heading = <div className={` text-center my-10 ${dark?'text-white':'text-black'}`}>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">{user?.displayName}'s Games Reviews</h1>
                <p> You can add review related to the games and can show all of them Review section</p>
            </div>
    return (
        <div className="py-10 lg:max-w-4xl xl:max-w-5xl mx-auto">
            <CommonHeading heading={heading}/>
            <div className="overflow-x-hidden ">
                <table className="table">
                    {/* head */}
                    {
                        myReviews.length && 
                    <thead >
                        <tr className={`${!dark && 'text-black'} `}>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Release_Date & Genres</th>
                            {/* <th>Release_Date</th> */}
                            <th>Update/Delete</th>
                        </tr>
                    </thead>
                    }
                    <tbody>
                        {/* row 1 */}
                        {
                            !myReviews.length ?
                                <div>
                                    <h1 className={`text-xl ${dark?'':'text-black'}`}>No review is founded. Please add review from reviews page</h1>
                                </div>
                                :
                                <>
                                    {
                            loader ?
                                <div className="w-full text-center ">

                                    <p className="loading loading-spinner text-success loading-lg "></p>
                                </div>
                                :
                                <>
                                    {
                                        myReviews?.map((myReview, idx) => <Diplay_MyReviews
                                            key={idx}
                                            count={idx}
                                            myReview={myReview}
                                            afterDelete={afterDelete}
                                            afterUpdate={afterUpdate}
                                        />)
                                    }
                                </>
                        }
                                </>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default My_allReviews;