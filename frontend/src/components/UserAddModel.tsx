import { useRef } from "react";
import Input from "./Input"

export const UserAddModel= ({open , setOpen , edit} :any)=>{
     const usernameRef = useRef<any>("");
    const roleRef = useRef<any>("");
    const statusRef = useRef<any>("");
    const emailRef = useRef<any>("");


    if(open && edit){
        //edit logic
    }
    if(open && !edit){
        //add logic
    }
    return(
        <div className="h-screen w-screen bg-transparent opacity-15">
            <div className="">
                <form >
                    <label>Username:</label>
                    <Input placeholder="Enter username" reference={usernameRef}/>
                    <label>Role:</label>
                    <Input placeholder="Enter username" reference={roleRef}/>
                    <label>Status:</label>
                    <Input placeholder="Enter username" reference={statusRef}/>
                    <label>Email:</label>
                    <Input placeholder="Enter username" reference={emailRef}/>
                </form>
            </div>
        </div>
    )
}