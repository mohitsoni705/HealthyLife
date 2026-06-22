import { useEffect, useRef, useState } from "react";
import Input from "./Input"
import { Loader2, X } from "lucide-react";
import { BACKEND_URL } from "../config";
import axios from "axios";
const DoctorAddModel =({open , setOpen , edit , selectedDoctor , setEdit}:any)=> {
        const usernameRef = useRef<any>("");
        const emailRef = useRef<any>("");
        const licensenoRef = useRef<any>("");
        const consultaionRef = useRef<any>("");
        const specializationRef = useRef<any>("");
        const experienceRef = useRef<any>("");
        const passwordRef = useRef<any>("");
        const [ error , setError] = useState("");
        const [loading , setLoading] = useState(false);
        useEffect(()=>{
          if(open && edit){
            if(usernameRef.current) usernameRef.current.value =  selectedDoctor.username || "";
            if(specializationRef.current) specializationRef.current.value = selectedDoctor.specialization || "";
            if(emailRef.current) emailRef.current.value = selectedDoctor.email || "";
            if(licensenoRef.current) licensenoRef.current.value = selectedDoctor.licensenoRef ||"";
            if(consultaionRef.current) consultaionRef.current.value = selectedDoctor.consultation_fee || "";
            if(experienceRef.current) experienceRef.current.value = selectedDoctor.experience ||"";
            if(passwordRef.current) passwordRef.current.value = selectedDoctor.password || ""; 
            console.log(selectedDoctor);
          }
          if(open && !edit){

          }
        },[open,selectedDoctor,edit])
        
        const token = localStorage.getItem("token");
        const handleSubmitButton=async(e:any)=>{
          e.preventDefault();
          const username = usernameRef.current.value;
          const email = emailRef.current.value;
          const license_no = licensenoRef.current.value;
          const specialization = specializationRef.current.value;
          const consultation_fee = consultaionRef.current.value;
          const password = passwordRef.current.value;
          const experience = experienceRef.current.value;
          console.log(password);
          const role = "doctor";
          if(username ==="" || email  === "" || license_no ==="" || specialization ==="" || consultation_fee ===""  || password ==="" || experience ===""){
            setError("Please enter all details");
            return;
          }
      try{
         const response = await axios.post(`${BACKEND_URL}/doctor`,{
          license_no,
          experience,
          consultation_fee,
          username,
          role,
          email,
          password,
          specialization
        },{
          headers:{
            "authorization":token
          }
        })
        setLoading(true);
        console.log(response);
      }catch(err){
        console.log(err);
      }finally{
        setOpen(false);
        setError("");
        setLoading(false);
      }
    }
  return (
    <div>

    {open && 
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95">
        <button
          onClick={() => {setOpen(false); setEdit(false)}}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          >
          <X size={22}  />
        </button>

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          {edit ? "Edit User" : "Add User"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={(e)=>handleSubmitButton(e)}>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <Input placeholder="Enter username" reference={usernameRef} variant="secondary"/>
            </div>
            <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input placeholder="Enter Password" reference={passwordRef} variant="secondary"/>
            </div>
            <div>
            <label className="text-sm font-medium text-gray-700">
              Specialization
            </label>
            <Input placeholder="Enter Specialization" reference={specializationRef} variant="secondary"/>
            </div>
           <div>
            <label className="text-sm font-medium text-gray-700">
              License No.
            </label>
            <Input placeholder="Enter License No." reference={licensenoRef} variant="secondary" />
           </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input placeholder="Enter email" reference={emailRef} variant="secondary" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Experience
            </label>
            <Input placeholder="Enter Experience" reference={experienceRef} variant="secondary" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Consulation_Fee
            </label>
            <Input placeholder="Enter Consulation_Fee" reference={consultaionRef} variant="secondary" />
          </div>
          <span className="text-red-600">{error}</span>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit" 
              className="w-full flex flex-row items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                <span>
                  {loading &&
                  <Loader2/>  
                  }
                </span>
                <span>
              {edit ? "Update Doctor" : "Add Doctor"}
                </span>
            </button>
            <button
              onClick={() => {setOpen(false); setEdit(false);}}
              className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-semibold transition"
              >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  }
  </div>
  )
}

export default DoctorAddModel
