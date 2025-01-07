import {  createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User, GithubAuthProvider } from 'firebase/auth'
import { ChildrenType, ContextType } from "../Type/type";
import app from "../firebase/firebase.config";

export const AuthProvider = createContext<ContextType | null>(null)
const GoogleProvider = new GoogleAuthProvider()
const gitHubProvider =  new GithubAuthProvider();
const auth = getAuth(app) 


const AuthContext = ({ children }:ChildrenType) => {
    const [user, setUser] = useState<User>({} as User)
    const [loader, setLoader] = useState(true)
    
    //sign Up
    const signUpAuth = (email: string, password: string) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //sing In
    const signInAuth = (email:string, password:string) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const updateAuth = (profile: object):Promise<void> => {
            setLoader(true)
            return updateProfile(auth.currentUser as User,profile)
        
    }
    const signOutAuth = () => {
        setLoader(true)
        return signOut(auth)
    }

    const googleAuth = () => {
        setLoader(true)
        return signInWithPopup(auth,GoogleProvider)
    }
    const githubAuth = () => {
        setLoader(true)
        return signInWithPopup(auth,gitHubProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const user = currentUser as User
            // if (user?.email) {
            // }
            setUser(user)
            setLoader(false)
        })
        return ()=>unSubscribe()
    },[])
    console.log(user)
    const info = { user, signUpAuth, signInAuth, signOutAuth, updateAuth, googleAuth,githubAuth,loader }
    return (
        <AuthProvider.Provider value={info}>
            {children}
        </AuthProvider.Provider>
    );
};

export default AuthContext;