import { useLoaderData } from "react-router-dom";
import CommonBanner from "../../CommonComponent/CommonBanner";
import { ThemeProvider } from "../../../Context/ThemeContext";
import { useContext } from "react";
import { GameType } from "../../../Type/type";

const GameDetails = () => {
    const gameData = useLoaderData() as GameType
    const { dark } = (useContext(ThemeProvider) as any) 
    console.log(gameData)

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
            <div className="max-w-7xl mx-auto">

                <CommonBanner header={header} />
            </div>
            <div className={`card flex-col md:flex-row  max-w-6xl card-side border border-gray-500 my-10 shadow-xl items-center ${dark ? 'bg-base-100 ' : 'text-black'} mx-5 xl:mx-auto`}>
                <figure className=" p-4 h-[400px]">
                    <img
                        className="rounded-xl h-full w-full"
                        src={gameData.image}
                        alt={`${gameData.name}`} />
                </figure>
                <div className="card-body space-y-4">
                    <h2 className="card-title text-2xl">{gameData.developer}</h2>
                    <h2 className="card-title"> Game Title : {gameData.name}</h2>
                    <div className="space-y-2">
                        <p className="font-medium">Genres :{gameData.genres}</p>
                        <p className="font-medium">Rating :{gameData.rating}</p>
                        <p className="font-medium">Realese Date :{gameData.releaseDate}</p>
                        <p ><span className="font-medium">Description : </span>{gameData.reviewDescription}</p>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;