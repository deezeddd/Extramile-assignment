import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import { useAdminCheck } from "../../auth/authGuard";
import MyContext from '../../context/Context';

function Employee() {
  useAdminCheck()

  const state = useContext(MyContext);
  const { userInfo, setUserInfo } = state;
  const currentUserId = userInfo?.id;
  const [employees, setEmployees] = useState([]);
   const getAllEmployees = async () => {
     try {
       const res = await fetch(
         `${process.env.REACT_APP_API_URL}/api/employee/all`,
         {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       const data = await res.json();
       console.debug("Employees: ", data);
       if (res.ok) {
        
         const filterData = data.filter(
           (employee) => employee.employeeId != currentUserId && employee.role != "Admin"
         );
         console.log("All Employees fetched ", filterData);
         return filterData;
       } else {
         console.debug({data});
       }
     } catch (error) {
       console.debug("Error Fetching All Employees: " + error.message);
     }
   };

   const deleteEmployee = async (id) => {
     try {
       const res = await fetch(
         `${process.env.REACT_APP_API_URL}/api/employee/${id}`,
         {
           method: "DELETE",

         }
       );
       console.log(res);
       if (res.ok) {
         getAllEmployees().then((data) => {
           setEmployees(data);
         });
       } else {
         console.error("Error deleting employee");
       }
     } catch (error) {
       console.error("Error deleting employee: " + error.message);
     }
   };

  useEffect(() => {
    getAllEmployees().then((data) => {
      setEmployees(data);
    });
  });
  return (
    <div className="p-8">
      <div>
        <h1 className="text-3xl ml-6 mb-3">Employee Table</h1>
        {employees?.length > 0 ? (
          <table className="table-auto w-full text-center border-collapse">
            <thead className="bg-white">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.employeeId}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{employee.name}</td>
                  <td className="py-2 px-4">{employee.email}</td>
                  <td className="py-2 px-4">{employee.employeeId}</td>
                  <td className="py-2 px-4">{employee.role}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/addperformance/${employee.employeeId}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                    >
                      Add PR
                    </Link>
                    <button onClick={() => deleteEmployee(employee.employeeId)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="text-3xl text-center text-red-400 ">
              No Employees Available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;
