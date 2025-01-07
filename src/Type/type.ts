import { User, UserCredential } from "firebase/auth";
import React from "react"

export type ChildrenType = {
    children : React.ReactNode
}
export type ContextType = {
    user: User;
    loader: boolean
    setLoader?: React.Dispatch<React.SetStateAction<boolean>>
    signUpAuth: (email: string, password: string) => Promise<UserCredential>;
    signInAuth: (email: string, password: string) => Promise<UserCredential>;
    googleAuth: () => Promise<UserCredential>
    githubAuth: () => Promise<UserCredential>
    signOutAuth: () => Promise<void>;
    updateAuth: (profile: object) => Promise<void> ;

}

export type GameType = {
    developer:string
    genres:[]
    image:string
    name:string
    platforms:[]
    rating:number
    releaseDate:string
    reviewDescription:string
    _id:string
}

export type ReviewType = {
    _id: string
    title: string
    image: string
    releaseDate: string
    rating: string
    description: string
    userEmail: string
    userName: string
    Genres: string
}
export type WatchListType = {
    _id: string
    title: string
    image: string
    releaseDate: string
    rating: string
    description: string
    currentUserEmail: string
    currentUserName: string
    Genres: string
}