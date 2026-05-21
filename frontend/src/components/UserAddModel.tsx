import { useRef, useEffect, useState } from "react";
import Input from "./Input"
import { X } from "lucide-react";
import Button from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const UserAddModel= ({open , setOpen , edit, setEdit, selectedUser} :any)=>{
     const usernameRef = useRef<any>(null);
    const roleRef = useRef<any>(null);
    const statusRef = useRef<any>(null);
    const emailRef = useRef<any>(null);
    const [loading , setLoading] = useState(false);

    useEffect(() => {
      if (!open) {
        return;
      }

      if (edit && selectedUser) {
        if (usernameRef.current) usernameRef.current.value = selectedUser.username || "";
        if (emailRef.current) emailRef.current.value = selectedUser.email || "";
        if (roleRef.current) roleRef.current.value = selectedUser.role || "";
        if (statusRef.current) statusRef.current.value = selectedUser.status || "";


      }

    }, [open, edit, selectedUser]);

    const handleSubmitButton=async(e:any)=>{
      e.preventDefault();
      setLoading(true)
      const username = usernameRef.current.value;
      const role = roleRef.current.value;
      const status = statusRef.current.value;
      const email = emailRef.current.value;
      try{
         const response = await axios.put(`${BACKEND_URL}/user/${selectedUser.user_id}`,{
          username,
          role,
          status,
          email
        })
        console.log(response);
      }catch(err){
        console.log("error");
      }finally{
        setOpen(false);
        setLoading(false);
      }
    }
    return(
      <div>
      {open &&
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95">
        <button
          onClick={() => {
            setOpen(false);
            setEdit(false);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          {edit ? "Edit User" : "Add User"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmitButton}>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <Input placeholder="Enter username" reference={usernameRef} />
          </div>

          <div className="flex flex-row gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 ">
              Role
            </label>
            <select className=" flex bg-gray-300/50 items-center gap-3 p-2 rounded-sm border border-gray-300 focus-within:border-gray-800 transition-all text-gray-700 " ref={roleRef}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="reception">Reception</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Status
            </label>
            <select className="flex bg-gray-300/50 items-center gap-3 p-2 rounded-sm border border-gray-300 focus-within:border-gray-800 transition-all text-gray-700" ref={statusRef}>
              <option value="active">Active</option>
              <option value="Inactive">InActive</option>
            </select>
          </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input placeholder="Enter email" reference={emailRef} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button className="bg-gradient-to-r from-blue-600 px-10 py-2 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg" type="submit">
              {loading ?"Updating...":"Update User"}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setEdit(false);
              }}
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