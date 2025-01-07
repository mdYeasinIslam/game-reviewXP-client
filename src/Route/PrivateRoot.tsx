import {  useContext } from "react";
import { AuthProvider } from "../Context/AuthContext";
import { ChildrenType, ContextType } from "../Type/type";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoot = ({children}:ChildrenType) => {
    const {user,loader} = (useContext(AuthProvider)as any) as ContextType
    const location = useLocation()
    if (loader) {
        return <span className="loading loading-spinner loading-lg text-success "></span>
    }
    if (user) {
        return children
    }
    return <Navigate to="/signIn" state={{ from: location }} replace />;

};

export default PrivateRoot;