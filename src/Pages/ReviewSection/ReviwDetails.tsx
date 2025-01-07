// import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ContextType, ReviewType } from "../../Type/type";
import { ThemeProvider } from "../../Context/ThemeContext";
import {  useContext } from "react";
import { IoEye } from "react-icons/io5";
import { AuthProvider } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import CommonBanner from "../CommonComponent/CommonBanner";

const ReviwDetails = () => {
    const detailsData = useLoaderData() as ReviewType
    const { user} = (useContext(AuthProvider)as any)as ContextType
    const {  dark } = (useContext(ThemeProvider) as any) 

    // const [reviewDetails ,setReviewDetails] =useState<ReviewType>(detailsData)

    const {image,_id,Genres,title,releaseDate,description,rating} = detailsData
    const watchListHandler = () => {
        const reviewData = {
            reviewId:_id,title,image,releaseDate,rating,description,Genres,currentUserEmail:user.email,currentUserName:user.displayName
        }
        console.log(reviewData)
        fetch(`https://b10-game-review-server.vercel.app/watchlist`, {
            method: "post",
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                if (resData.acknowledged) {
                    toast('Review add to Wacth_list successfully')
                }
            }).catch(e => {
                console.error(e)
                toast.error(`${e.message}`)
            })
    }

    const header = < header className="relative h-52 md:h-[20rem] lg:h-[26rem]" >
        <img src='/images/banner4.jpg' alt="" className="w-full h-full  md:h-full xl:rounded-xl brightness-50 " />
        <div className="text-center absolute top-[20%] md:top-[30%] xl:top-[25%]  left-[3%] lg:left-[8%] xl:left-[17%] space-y-2 md:space-y-5">
            <h1 className="text-2xl md:text-5xl font-semibold text-gray-300">Welcome to the Review details page ....</h1>
            <p className="text-gray-300">
                You can Explore details any of them and can add to watch list by clicking....
            </p>
        </div>
    </header >
    return (
        <div>
            <div className="max-w-7xl mx-auto lg:mt-10">

            <CommonBanner header={header} />
            </div>
        <div className={`card flex-col md:flex-row  max-w-6xl mx-auto card-side border border-gray-500 my-10 shadow-xl items-center ${dark ?'bg-base-100 ':'text-black'}`}>
            <figure className=" p-4 h-[400px]">
                <img
                    className="rounded-xl h-full w-full"
                    src={detailsData.image}
                    alt="Movie" />
            </figure>
            <div className="card-body space-y-4">
                <h2 className="card-title text-2xl"> Game Title : {detailsData.title}</h2>
                <h2 className="card-title text-xl">Reviewer : {detailsData.userName}</h2>
                <div className="space-y-2">
                    <p  className="font-medium">Genres :{detailsData.Genres}</p>
                    <p className="font-medium">Rating :{detailsData.rating}</p>
                    <p className="font-medium">Realese Date :{detailsData.releaseDate}</p>
                    <p ><span className="font-medium">Description : </span>{detailsData.description}</p>
                    

                </div>
                <div className="card-actions ">
                    <button onClick={watchListHandler} className="btn btn-primary">Add to Watchlist <IoEye />
</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ReviwDetails;