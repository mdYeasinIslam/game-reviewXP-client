import { FormEvent, useContext, useRef, useState } from "react";
import { AuthProvider } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FirebaseError } from 'firebase/app';
import { ContextType } from "../Type/type";
import { ThemeProvider } from "../Context/ThemeContext";

// https://i.ibb.co.com/d7wmf3q/kitchen-chef-logo-design-vector-53781980.jpg

const SignIn = () => { 
    const { signInAuth, googleAuth ,githubAuth} = (useContext(AuthProvider)as any) as ContextType
    const [error, setError] = useState('')
    const { dark } = (useContext(ThemeProvider) as any) 

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    const formHandler = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        const email = emailRef.current?.value as string
        const password = passRef.current?.value as string
        signInAuth(email, password)
            .then(() => {
                toast.success('WOW ! you are successfully Loged in')
                setError('')
                // navigate('/')
                navigate(from, { replace: true });

            }).catch((e: FirebaseError) => {
                setError(e.message)
                console.error(e)
                console.log(typeof e)
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
                <div className="col-span-1 text-center lg:text-left">
                    <figure className=" w-4/5 mx-auto">
                        <img src="/images/signIn2.svg" alt="" />
                    </figure>
                </div>
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl pt-10">
                    <div>
                        <h1 className="text-4xl font-bold text-center">Login your account!</h1>

                    </div>
                    <form onSubmit={formHandler} className="card-body">
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <label className="label text-red-500">
                                {error && <>{error}</>}
                            </label>
                        </div>
                        <div className="form-control mt-1">
                            <button className="btn btn-accent">Login</button>
                        </div>
                        <div className="link-hover">
                            <NavLink to={'/signUp'}>Don't have any account. Please Create an account</NavLink>
                        </div>
                    </form>
                    <div className="grid xl:grid-cols-2 gap-3 px-[2rem] pb-5 ">
                        <button onClick={googleSignIn} className="btn  w-full h-full py-2">
                            <img className=" w-6  xl:w-8" src="/images/google.png" alt="" />
                            Login with Google</button>
                        <button onClick={githubSignIn} className="btn w-full h-full py-2">
                            <img className="w-6 xl:w-8 bg-white rounded-full" src="/images/github.png" alt="" />
                            Login with gitHub</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;