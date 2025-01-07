import { useLoaderData } from "react-router-dom";
import { ContextType, WatchListType } from "../../../Type/type";
import { useContext, useEffect, useState } from "react";
import DisplayWatchList from "./DisplayWatchList";
import { AuthProvider } from "../../../Context/AuthContext";
import { ThemeProvider } from "../../../Context/ThemeContext";
import { CommonHeading } from "../../../SharedComponent/CommonHeading";

const AllWatchList = () => {
    const watchList = useLoaderData() as WatchListType[]
    const { dark } = useContext(ThemeProvider) as any

    const { user } = (useContext(AuthProvider) as any) as ContextType
    const [watchData, setWatchData] = useState<WatchListType[]>([])
    const [loader, setLoader] = useState(true)
    useEffect(() => {

        const filter = watchList?.filter(watch => watch.currentUserEmail == user.email)
        setWatchData(filter)
        setLoader(false)

    }, [user.email, watchList])
    // console.log(watchData)

     const heading = <div className={` text-center my-10 ${dark?'text-white':'text-black'}`}>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">{user?.displayName}'s Watchlist</h1>
                <p> You can add review related to the games and can show all of them Review section</p>
            </div>
    return (
        <div className="py-10 lg:max-w-4xl xl:max-w-5xl mx-auto">
            <CommonHeading heading={heading}/>
            <div className="overflow-x-hidden">
                <table className="table">
                    {/* head */}
                    <thead >
                        <tr className={`${!dark && 'text-black'} `}>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Details & Genres</th>
                            <th>Release_Date</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            loader ?
                                <div className="w-full text-center ">

                                    <p className="loading loading-spinner text-success loading-lg "></p>
                                </div>
                                :
                                <>
                                    {
                                        watchData?.map((watch, idx) => <DisplayWatchList
                                            key={idx}
                                            count={idx}
                                            watch={watch}
                                        />)
                                    }
                                </>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllWatchList;