import { useContext } from "react";
import { WatchListType } from "../../../Type/type";
import { ThemeProvider } from "../../../Context/ThemeContext";

type PropType = {
    watch: WatchListType
    count:number
}

const DisplayWatchList = ({ watch, count }: PropType) => {
    const { dark } = useContext(ThemeProvider) as any
    const { title, image, description, Genres, rating, releaseDate } = watch
    return (
        
        <tr className={`${dark?'':'text-black'}`}>
            <th>{count+1} </th>
            <td>
                <div className="md:flex items-center md:gap-3">
                    <div className="avatar ">
                        <div className=" mask mask-squircle md:h-12 md:w-12 w-10">
                            <img
                                src={image}
                                alt={title} />
                        </div>
                    </div>
                    <div className="">
                        <div className="font-bold">{ title}</div>
                        <div className="text-sm opacity-50">Rating: { rating}.0</div>
                    </div>
                </div>
            </td>
            <td>
                <p> {description}</p>
                <span>{ Genres}</span>
              
            </td>
            <td>{ releaseDate}</td>
            {/* <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th> */}
        </tr>
    );
};

export default DisplayWatchList;