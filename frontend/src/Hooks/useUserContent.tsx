import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface userContent{
    name:string,
    email:string,
    role:string,
    status:string
}
const useUserContent = () => {
    const [contents , setContent] = useState<userContent[]>([]);

    const refresh=()=>{
        axios.get(`${BACKEND_URL}/users`)
        .then((response)=>{
            setContent(response.data.user || []);
        })
    }
useEffect(()=>{
    refresh();
    let interval = setInterval(()=>{
        refresh();
    },3*1000)
    return()=>{
        clearInterval(interval);    
    }
},[])
return {contents , refresh} 
}

export default useUserContent
