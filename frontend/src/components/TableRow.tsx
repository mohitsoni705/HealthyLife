import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";

const TableRow = ({user,setOpen,setEdit,setSelectedUser}:any) => {
    const [deleting , setDeleting] = useState(false);
    const handleDeleteButton=async(id:any)=>{
         try{
            setDeleting(true);
          const response = await axios.delete(`${BACKEND_URL}/user/${id}`);
          console.log(response.data.msg);
        //   fetchUsers();
         }catch(err){
           console.log("Inavlid")
         }finally{
            setDeleting(false);
         }
      }
      
  return (
    <tr key={user.user_id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">👤</span>
                          <span className="text-gray-800 font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                          {user.role || "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={()=>{setSelectedUser(user); setEdit(true); setOpen(true); }} className="text-blue-600 hover:text-blue-800 font-semibold mr-3 transition">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 font-semibold transition" onClick={()=>handleDeleteButton(user.user_id)}>
                         {deleting?"Deleting...":"Delete"}
                        </button>
                      </td>
                    </tr>
  )
}

export default TableRow
