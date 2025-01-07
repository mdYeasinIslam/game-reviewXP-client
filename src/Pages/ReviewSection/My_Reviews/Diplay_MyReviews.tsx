import { useContext, useState } from "react";
import { ReviewType } from "../../../Type/type";
import { ThemeProvider } from "../../../Context/ThemeContext";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import UpdateModal from "./UpdateModal";
type PropType = {
    myReview: ReviewType
    count: number
    afterDelete: (id: string) => void
    afterUpdate: ()=>void

}

const Diplay_MyReviews = ({ myReview, count, afterDelete, afterUpdate }: PropType) => {
    const { dark } = useContext(ThemeProvider) as any
    const {_id, image, title, rating, Genres, releaseDate } = myReview
    const [modalIsOpen, setIsOpen] = useState(false);


    const deleteHandler = () => {
        fetch(`https://b10-game-review-server.vercel.app/reviews/${_id}`, {
            method:"delete"
        })
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                if (resData.acknowledged) {
                    afterDelete(_id)
                    toast('Review deleted successfully')
                }
            }).catch(e => {
                console.error(e)
                toast.error(`${e.message}`)
            })
    }
    const updateHander = (value:boolean) => {
        setIsOpen(value);

    }
    return (
        <tr className={`${dark ? '' : 'text-black'}`}>
            <th>{count + 1} </th>
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
                        <div className="font-bold">{title}</div>
                        <div className="text-sm opacity-50">Rating: {rating}.0</div>
                    </div>
                </div>
            </td>
            <td>
                <p> {releaseDate}</p>
                <span>{Genres}</span>

            </td>
            {/* <td>{releaseDate}</td> */}
            <th>
                <button data-tooltip-id="my-tooltip"
                    data-tooltip-content="Update ?"
                    data-tooltip-place="top"
                    onClick={() => setIsOpen(true)}
                    className="btn btn-ghost btn-xs">
                    <AiFillEdit className="w-6 h-6 text-blue-500" />
                </button>
                <button
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Delete"
                    data-tooltip-place="top"
                    onClick={deleteHandler}
                    className="btn btn-ghost btn-xs"><MdDelete className="w-6 h-6 text-red-500" />
                </button>
                <UpdateModal myReview={myReview} modalIsOpen={modalIsOpen} updateHander={updateHander} afterUpdate={afterUpdate} />
            </th>
        </tr>
    );
};

export default Diplay_MyReviews;