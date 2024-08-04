import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//ADD Performance

function AddPerformance() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [reviewers, setReviewers] = useState([]); //array of employees except the current employee
  const [selectedReviewers, setSelectedReviewers] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/performance/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      console.debug("Performance Review: ", data);
      if (res.ok) {
        console.log("Performance Review Added", data);
        if (selectedReviewers) {
          addReviewers(selectedReviewers, data.performanceId);
        }
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error Adding PR: " + error.message);
    }
  };
  //Run for each Id and add reviewer
  const addReviewers = async (reviewers, id) => {
    console.log(" => ", reviewers);
    for (const employeeId of reviewers) {
      console.log(
        `${process.env.REACT_APP_API_URL}/api/feedback/reviewer?employeeId=${employeeId}&performanceId=${id}`
      );
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/feedback/reviewer?employeeId=${employeeId}&performanceId=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        console.log("PR added successfully", res);
        navigate("/performance");
      }
      if (!res.ok) {
        const error = await res.json();
        console.warn(`Error adding reviewer: ${error.message}`);
      }
    }
  };

  const getAllEmployees = async (id) => {
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
        console.log("All Employees fetched ", data);
        const filterData = data.filter(
          (employee) => employee.employeeId != id && employee.role != "Admin"
        );
        return filterData;
      }
    } catch (error) {
      console.warn("Error Fetching All Employees: " + error.message);
    }
  };

  useEffect(() => {
    fetchEmployeeById(id).then((data) => {
      setEmployee(data);
    });
    getAllEmployees(id).then((data) => {
      const filterData = data.filter((emp) => emp.employeeId != id);
      setReviewers(filterData);
    });
  }, [id]);

  const fetchEmployeeById = async (employeeId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/employee/${employeeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        console.log("Employee Fetched ", data);
        return await data;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.warn("Error Fetching Employee: " + error.message);
    }
  };

  return (
    <div className="max-w-md mt-8 mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
      <form className="flex flex-col gap-4 p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Add Performance Review</h2>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-slate-700">Title:</label>
          <input
            className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            type="text"
            name="title"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-slate-700">Description:</label>
          <textarea
            className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            name="description"
            rows="4"
            cols="50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-slate-700">
            Reviewers (Select atleast one):{" "}
          </label>
          <div className="flex flex-col h-24 overflow-y-auto">
            <div className="scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 h-[100px] overflow-y-auto">
              <input type="hidden" name="reviewers" value={selectedReviewers} />
              {reviewers.map((reviewer) => (
                <div key={reviewer.employeeId} className="flex items-center">
                  <input
                    type="checkbox"
                    value={reviewer.employeeId}
                    onChange={(e) => {
                      const updatedReviewers = e.target.checked
                        ? [...selectedReviewers, reviewer.employeeId]
                        : selectedReviewers.filter(
                            (selectedReviewer) =>
                              selectedReviewer !== reviewer.employeeId
                          );
                      setSelectedReviewers(updatedReviewers);
                    }}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="font-medium text-slate-700">
                    {reviewer.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col  ">
          <label className="font-bold text-xl mb-2 text-slate-700">
            For Employee:
          </label>
          <div className="flex flex-col gap-1 ml-6">
            <h1 className="text-lg">
              <span className="font-bold">Name:</span> {employee?.name}
            </h1>
            <input
              className="hidden"
              value={employee?.employeeId}
              name="employeeId"
              required
            />
            <h1 className="text-lg">
              {" "}
              <span className="font-bold">Employee Id: </span>
              {employee?.employeeId}
            </h1>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={selectedReviewers?.length === 0}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPerformance;
