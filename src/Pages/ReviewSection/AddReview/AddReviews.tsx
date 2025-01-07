import { useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ThemeProvider } from "../../../Context/ThemeContext"
import { AuthProvider } from "../../../Context/AuthContext"
import { toast } from "react-toastify"
import { CommonHeading } from "../../../SharedComponent/CommonHeading"

type Inputs = {
    exampleRequired: string
    something:string
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
const AddReviews = () => {
    const { register, handleSubmit, formState: { errors },  } = useForm<Inputs>()
    const { dark } = (useContext(ThemeProvider) as any)
    const { user } = (useContext(AuthProvider) as any)
   
    const onSubmit: SubmitHandler<Inputs> = (data, event) => {
        if ( !errors.userEmail?.message) {
           return  toast.error(`User have no email address. Please login with google if your github doesn't provide email address`)
        }
        fetch(`https://b10-game-review-server.vercel.app/reviews`, {
            method: 'post',
            headers: { 
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                if (resData.acknowledged) {
                    toast('Review add to DB successfully')
                    event?.target.reset()                    
                }
            }).catch(e => {
                console.error(e)
                toast.error(`${e.message}`)
            })
            
    }

    const heading = <div className={` text-center my-10 ${dark?'text-white':'text-black'}`}>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">Add Your Games Review</h1>
                <p> You can add review related to the games and can show all of them Review section</p>
            </div>
    return (
        <div className={`${dark ? '' : 'bg-white '} py-16`}>
                <CommonHeading heading={heading}/>
            <form onSubmit={handleSubmit(onSubmit)} className={`md:grid  grid-cols-2 justify-items-center gap-3 mx-5 xl:mx-0 `}>

                <label className={`form-control w-full  max-w-lg `} >
                    <div className={`label `} >
                        <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Games Name/Title: </span>
                    </div>
                    <input  {...register('title', { required: true })} type="text" placeholder="Title" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black '}`} />
                </label>
                <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Games Images URL:</span>
                    </div>
                    <input  {...register('image')} type="url" placeholder="Image URL only" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
                </label>
                <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Release Date :</span>
                    </div>
                    <input  {...register('releaseDate', { required: true })} type="text" placeholder="Release Date" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
                </label>
                <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Ratings :</span>
                    </div>
                    <input  {...register('rating', { required: true })} max='10' min={0}  type="number" placeholder="0" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
                </label>
                <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className={`label-text ${dark ? '' : 'text-black font-medium'}`}>Description:</span>
                    </div>
                    <input  {...register('description', { required: true })} type="text" placeholder="Describe your opinion" className={`input input-bordered w-full max-w-lg ${dark ? '' : 'bg-white text-black'}`} />
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
                        <option disabled defaultValue={'Genres'}>Genres</option>
                        <option>Action</option>
                        <option>RPG</option>
                        <option>Adventure</option>
                        <option>Battle Royal</option>
                        <option>Survival</option>
                        <option>Strategy</option>
                    </select>
                </label>

                {/* errors will return when field validation fails  */}
                {(errors.Genres && errors.email && errors.releaseDate && errors.title && errors.userEmail && errors.userName) && <span>This field is required</span>}
                <div className={`my-3 w-full md:col-span-2 max-w-xl`}>

                <input className={`btn w-full ${dark ? 'btn-accent ' : 'btn-active btn-neutral'} `} type="submit" />
                </div>
            </form>

        </div>
    );
};

export default AddReviews;