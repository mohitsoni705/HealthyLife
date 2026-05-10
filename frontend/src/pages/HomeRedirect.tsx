import { Navigate } from "react-router-dom"
const HomeRedirect = () => {
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to="/signup"/>
    }else{
        return <Navigate to="/dashboard"/>
    }
}

export default HomeRedirect
