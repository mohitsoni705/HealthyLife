import { useRef } from "react";
import Input from "./Input";

const PatientAddModel = ({open , setOpen , edit}:any) => {
    const usernameRef = useRef<any>("");
    const addressRef = useRef<any>("");
    const phoneRef = useRef<any>("");

    if(open && edit){
        
    }
    if(open && !edit){

    }
  return (
      <div className="h-screen w-screen bg-transparent opacity-15">
            <div className="">
                <form >
                    <label>Username:</label>
                    <Input placeholder="Enter username" reference={usernameRef}/>
                    <label>Address:</label>
                    <Input placeholder="Enter username" reference={addressRef}/>
                    <label>Phone:</label>
                    <Input placeholder="Enter username" reference={phoneRef}/>
                </form>
            </div>
        </div>
  )
}

export default PatientAddModel
