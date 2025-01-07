import { useContext } from "react";
import { GameType } from "../../../Type/type";
import { ThemeProvider } from "../../../Context/ThemeContext";
import { NavLink } from "react-router-dom";

type Props = {
    games :GameType
}

const DisplayGame = ({ games }: Props) => {
    const {  dark } = (useContext(ThemeProvider) as any) 

    return (
        <div className={`card shadow-xl transform transition-transform duration-300 hover:scale-105 ${dark ? 'bg-[#2C2C2C] ' :" bg-[#FFFFFF] text-black"}`}>
            <figure className="px-2 pt-2 h-[20rem]">
                <img
                    src={games.image}
                    alt={games.name}
                    className="rounded-xl w-full h-full" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">{ games.name}</h2>
                <p>Reating : { games.rating}</p>
                <div className="card-actions ">
                    <NavLink className='w-full' to={`/allGames/${games._id}`}>
                        <button className="btn  w-full btn-primary">Explore Now</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default DisplayGame;