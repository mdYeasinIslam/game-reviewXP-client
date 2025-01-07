import { FormEvent, useContext, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import { AuthProvider } from "../Context/AuthContext";
import { FirebaseError } from 'firebase/app';
import { ContextType } from "../Type/type";
import { ThemeProvider } from "../Context/ThemeContext";
 

const SignUp = () => {
    const { signUpAuth, updateAuth, googleAuth, githubAuth } = (useContext(AuthProvider)as any) as ContextType
    const [error, setError] = useState('')
    const { dark } = (useContext(ThemeProvider) as any) 


    const nameRef = useRef<HTMLInputElement>(null)
    const photoRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()


    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const name =nameRef.current?.value  as string
        const photo = photoRef.current?.value as string
        const email = emailRef.current?.value as string
        const password = passRef.current?.value as string
        const profile = { displayName: name, photoURL: photo }
        
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        // Test the password against the regex
        if (!regex.test(password)) {
            setError('Password is invalid. It must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.')
            toast.error('Password must have at least one Uppercase and lowercase letter and length more than 6')
            return false;

        }

        signUpAuth(email, password)
            .then(() => {
                updateAuth(profile)
                    .then(() => {
                        toast.success('WOW! Your account successfully created')
                        
                        setError('')
                        navigate('/')
                    }).catch((e: FirebaseError) => {
                        setError(e.message)
                        console.error(e)
                    })
            })
            .catch((e: FirebaseError)=> {
                setError(e.message)
                console.error(e)
            })


    }
    const googleSignIn = () => {
        googleAuth()
            .then(() => {
                toast.success('WOW! you are successfully Loged in by Google')
                setError('')
                navigate('/')
            }).catch((e: FirebaseError) => {
                setError(e.message)
                console.error(e)
                console.log(typeof e)
            })
    }
    const githubSignIn = () => {
        githubAuth()
            .then(() => {
                toast.success('WOW! you are successfully Loged in by Google')
                setError('')
                navigate('/')
            }).catch((e: FirebaseError) => {
                setError(e.message)
                console.error(e)
                console.log(typeof e)
            }) 
    }
    return (
        <div className={`hero bg-base-200 min-h-screen ${dark?'':'bg-white'}`}>
            <div className="hero-content grid grid-cols-1 md:grid-cols-2">
                <div className="text-center col-span-1">
                    <figure className=" w-4/5 mx-auto">
                        <img src="/images/signUp1.svg" alt="" />
                    </figure>
                   
                </div>
                <div className={`col-span-1 card w-full max-w-lg shrink-0 shadow-2xl bg-base-100`}>
                    <div>
                        <h1 className={`text-4xl font-bold text-center pt-10 `}>Create Your Account</h1>
                    </div>
                    <form onSubmit={formHandler} className={`card-body `}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name </span>
                            </label>
                            <input ref={nameRef} type="text" placeholder="name" className="input input-bordered"  />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL </span>
                            </label>
                            <input ref={photoRef} type="url" placeholder="Only URL" className="input input-bordered"  />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input ref={emailRef} type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input ref={passRef} type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label text-red-500">
                                {error && <>{error }</>}
                            </label>
                        </div>
                        <div className="form-control mt-1">
                            <button className="btn btn-accent">Register</button>
                        </div>
                        <div className="link-hover">
                            <NavLink to={'/signIn'}>Already have an account. Please Log-in</NavLink>
                        </div>
                    </form>
                    <div className="grid xl:grid-cols-2 gap-3 px-[2rem] pb-5 lg:space-x-1">
                        <button onClick={googleSignIn} className="btn w-full h-full py-2">
                            <img className=" w-6  xl:w-8" src="/images/google.png" alt="" />
                            Login with Google</button>
                        <button onClick={githubSignIn} className="btn w-full h-full  py-2">
                            <img className="w-6 xl:w-8 bg-white rounded-full" src="/images/github.png" alt="" />
                            Login with gitHub</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;