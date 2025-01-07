import { useContext, useEffect, useState } from "react";
import { GameType } from "../../../Type/type";
import DisplayGame from "./DisplayGame";
import  { ThemeProvider } from "../../../Context/ThemeContext";
import { CommonHeading } from "../../../SharedComponent/CommonHeading";

const AllGames = () => {
    const [gamesData, setGamesData] = useState<GameType[]>([])
    const [loader,setLoader] = useState(true)
    const {dark} = useContext(ThemeProvider)as any
    useEffect(() => {
        fetch(`https://b10-game-review-server.vercel.app/allGames`)
            .then(res => res.json())
            .then(data => {
                setGamesData(data)
                setLoader(false)
            })
    }, [])
    const heading = <div className={` text-center mb-10 ${dark?'text-white':'text-black'}`}>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">Explore Games Section</h1>
                <p> You can Explore details any of them and can add to watch list by clicking</p>
            </div>
    return (
        <div>
            <CommonHeading heading={heading}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-5">
            {
                !loader ?
                    <>
                        {gamesData?.map(games => <DisplayGame
                            key={games._id}
                            games={games}
                        />
                        )}
                    </>
                    :
                    <span className="loading loading-spinner loading-lg text-success "></span>
            }
            </div>
        </div>
    );
};

export default AllGames;