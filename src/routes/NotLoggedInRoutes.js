import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes() {
    const {user} = useSelector((state) => ({...state}));
    //if user exist then go to home page, 
    //if not exist then go to outlet which is logging page defined in app.js
    return user? <Navigate to="/"></Navigate> : <Outlet/>;
}