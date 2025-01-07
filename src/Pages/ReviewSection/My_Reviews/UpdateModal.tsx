import Modal from 'react-modal';
import { useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ThemeProvider } from "../../../Context/ThemeContext"
import { AuthProvider } from "../../../Context/AuthContext"
import { toast } from 'react-toastify';
import { ReviewType } from '../../../Type/type';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "gray",
        maxHeight: '90vh',
        overFlowY: 'auto'
    },
};
type PropType = {
    updateHander: (value: boolean) => void
    modalIsOpen: boolean
    myReview: ReviewType
    afterUpdate: ()=>void
}
type Inputs = {
    exampleRequired: string
    something: string
    email: string
    title: string
    image: string
    releaseDate: string
    userEmail: string
    userName: string
    Genres: string
    rating: string
    description: string
}
const UpdateModal = ({ updateHander, modalIsOpen, myReview, afterUpdate }: PropType) => {
    const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>()
    const { dark } = (useContext(ThemeProvider) as any)
    const { user } = (useContext(AuthProvider) as any)
    const { _id, image, title, rating, Genres, releaseDate,description } = myReview

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // console.log(data)
        fetch(`https://b10-game-review-server.vercel.app/reviews/${_id}`, {
        method: 'put',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(resData => {
            if (resData.acknowledged) {
                afterUpdate()
                closeModal()
                toast('Review Updated successfully')
            }
        }).catch(e => {
            console.error(e)
            toast.error(`${e.message}`)
        })

    }


    function closeModal() {
        updateHander(false)
    }

    return (
        <div className=''>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}

            >
                <div className={` ${dark ? 'bg-base-100' : 'bg-white '}`}>
                    <h1 className='text-center'>{user?.displayName}</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className={`grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 justify-items-center   `}>
                        <label className={`form-control w-full  max-w-lg `} >
                            <div className={`label `} >
                                <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Games Name/Title: </span>
                            </div>
                            <input defaultValue={title} {...register('title', { required: true })} type="text" placeholder="Title" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black '}`} />
                        </label>
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Games Images URL:</span>
                            </div>
                            <input defaultValue={image}  {...register('image')} type="url" placeholder="image URL only" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
                        </label>
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Release Date :</span>
                            </div>
                            <input defaultValue={releaseDate} {...register('releaseDate', { required: true })} type="text" placeholder="release Date" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
                        </label>
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Ratings :</span>
                            </div>
                            <input defaultValue={rating} {...register('rating', { required: true })} max='10' min={0} type="number" placeholder="0" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
                        </label>
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Description:</span>
                            </div>
                            <input defaultValue={description} {...register('description', { required: true })} type="text" placeholder="description" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
                        </label>
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>User Email :</span>
                            </div>
                            <input defaultValue={user?.email} readOnly {...register('userEmail', { required: true })} type="email" placeholder="user Email" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
                        </label>
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>User Name: </span>
                            </div>
                            <input defaultValue={user?.displayName} readOnly {...register('userName', { required: true })} type="text" placeholder="user name" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
                        </label>
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Genres :</span>
                            </div>
                            <select {...register('Genres', { required: true })} className={`select select-primary w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`}>
                                <option disabled defaultValue={Genres}>Genres</option>
                                <option>Action</option>
                                <option>RPG</option>
                                <option>Adventure</option>
                                <option>Battle Royal</option>
                                <option>Survival</option>
                                <option>Strategy</option>
                            </select>
                        </label>


                        {(errors.Genres && errors.email && errors.releaseDate && errors.title && errors.userEmail && errors.userName) && <span>This field is required</span>}

                        <input  className={`btn ${dark ? 'btn-primary ' : 'btn-active btn-neutral'} my-3 w-full col-span-1 max-w-6xl`} type="submit" value="Update" />

                        <button onClick={closeModal} className={`btn ${dark ? 'btn-primary ' : 'btn-active btn-neutral'} my-3 w-full col-span-1 max-w-6xl`}>Close</button>
                    </form>
                </div>                
            </Modal>
        </div>
    );
}

export default UpdateModal;