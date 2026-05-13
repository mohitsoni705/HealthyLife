import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import Button from "../components/Button";

const Patients = () => {
  const [data, setData] = useState([]);
  const [singleData , setSingleData] = useState([]);
  const handleEditButton=async(id:any)=>{
      console.log(id);
    try{
        const response = await axios.get(`${BACKEND_URL}/patients/patient/:${id}`);
        setSingleData(response.data);
    }catch(err){
        console.log(err);
    }
  }

  const handlePatientData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/patients/patients`
      );

      setData(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(singleData);
  useEffect(() => {
    handlePatientData();
  }, []);

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
        
        <table className="w-full text-left text-sm text-gray-700">
          
          <thead className="border-b border-gray-200 bg-gray-100 text-black text-md">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold">
                Patient Name
              </th>

              <th scope="col" className="px-6 py-3 font-bold ">
                Phone
              </th>

              <th scope="col" className="px-6 py-3 font-bold">
                Address
              </th>

              <th scope="col" className="px-6 py-3 font-bold">
                Created At
              </th>

              <th scope="col" className="px-6 py-3 font-bold text-right">
                Action
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-right">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map(
              ({
                patient_id,
                patient_name,
                phone,
                address,
                created_at,
              }) => {
                return (
                  <tr
                    key={patient_id}
                    className="border-b border-gray-200 bg-white transition-colors duration-150 hover:bg-blue-100"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                    >
                      {patient_name}
                    </th>

                    <td className="px-6 py-4">
                      {phone}
                    </td>

                    <td className="px-6 py-4">
                      {address}
                    </td>

                    <td className="px-6 py-4">
                      {created_at}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button className="font-medium text-blue-700 hover:text-blue-800 hover:underline dark:text-blue-400" onClick={()=>handleEditButton(patient_id)} >
                        Edit
                        </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-red-400 hover:text-red-500 hover:underline dark:text-red-400"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;