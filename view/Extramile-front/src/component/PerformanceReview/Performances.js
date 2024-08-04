import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import { useLoginCheck } from '../../auth/authGuard';
import MyContext from '../../context/Context';
//All PRs


 function Performances() {

  useLoginCheck(); // only if user is logged in, else redirect to login

  const state = useContext(MyContext); //Get myContext only display user's PR
  const { userInfo } = state;


  let currentEmployeeId = userInfo?.id; //logged in user's Id
  const [performanceArray, setPerformanceArray] = useState([]);

  const fetchPerformanceArray = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/performance/allPerformanceReviews`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.debug("Performance Reviews: ", data);
      if (res.ok && userInfo?.role !== "Admin") {
        let filteredData = [];
        for (const performance of data) {
          for (const reviewer of performance.reviewers) {
            if (reviewer.employeeId === currentEmployeeId || currentEmployeeId === performance.employeeId) {
              filteredData.push(performance);
              break;
            }
          }
        }
        const filterData = Object.values(filteredData);
        return filterData
      } else {
        return data;
      }
    } catch (error) {
      console.error("Error Fetching Performance Reviews: " + error.message);
    }
  };
  const deletePerformance = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/performance/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      fetchPerformanceArray().then((data) => {
        setPerformanceArray(data);
      });
      console.log("Performance Deleted ",res);
    } else {
      console.error("Error deleting employee");
    }
  } catch (error) {
    console.error("Error deleting employee: " + error.message);
  }
  };

  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchPerformanceArray();
        setPerformanceArray(data);
      };
      fetchData();

  }, [currentEmployeeId]);

  return (
      <div className="p-8">
        <div>
          <h1 className="text-3xl ml-6 mb-3">Performance List </h1>
          {performanceArray?.length > 0 ? (
            <table className="table-auto w-full text-center border-collapse">
              <thead className="bg-white">
                <tr>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Employee ID</th>
                  <th className="py-2 px-4">Performance ID</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {performanceArray.map((performance) => (
                  <tr
                    key={performance.performanceId}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="py-2 px-4">{performance.title}</td>
                    <td className="py-2 px-4">{performance.employeeId}</td>
                    <td className="py-2 px-4">{performance.performanceId}</td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/viewperformance/${performance.performanceId}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                      >
                        View PR
                      </Link>
                      <button
                        onClick={() => deletePerformance(performance.performanceId)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
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
                No Performance to Review
              </p>
            </div>
          )}
        </div>
      </div>
  );
}

export default Performances;