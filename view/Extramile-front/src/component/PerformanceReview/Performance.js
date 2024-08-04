import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { useLoginCheck } from "../../auth/authGuard";
import MyContext from "../../context/Context";



//Single Employee PR

function Performance() {
  
  useLoginCheck(); // only if user is logged in, else redirect to login

  const { id } = useParams();  // Get ID from URL

  const state = useContext(MyContext);
  const { userInfo } = state;
  const { id: currentId, name, role } = userInfo; //Current user name and Id

  console.debug(currentId, name);

  const [performance, setPerformance] = useState(null);
  const [feedbackArray, setFeedbackArray] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const [employee, setEmployee] = useState(null);

  //Employee Details fetched via ID
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
        console.error("error fetching user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Current Performance Details fetched via ID
  const fetchPerformanceById = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/performance/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      console.debug("Performance Reviews: ", data);
      if (res.ok) {
        console.log("All Performance Reviews fetched ", data);
        return data;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      alert("Error Fetching Performance Reviews: " + error.message);
    }
  };

  // Comment and Rating Flag (not allowed to add comment and rating on your PR)
  const commentAndRatingFlag = (employeeId, currentId) => {
    if (employeeId === currentId || role == "Admin") {
      return false;
    }
    return true;
  };
  const handleAddFeedback = async (e) => {
    try {
      e.preventDefault();
      const performanceId = id;
      const employeeId = currentId;
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/feedback/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            performanceId,
            comment,
            rating,
            name,
            employeeId,
          }),
        }
      );

      const data = await res.json();

      console.debug("Feedback: ", data);
      if (res.ok) {
        console.log("Feedback added successfully ", data);
        fetchPerformanceById(id).then((data) => {
          setFeedbackArray(data.feedback);
        });
        e.target.rating.value = '';
        e.target.comment.value = '';
        return data;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      alert("Error Fetching Performance Reviews: " + error.message);
    }
  };

  //Used for Async Nature of fetchPerformanceById
  useEffect(() => {
    if (id) {
      fetchPerformanceById(id).then((data) => {
        setPerformance(data);                  // set the state of performance
        setFeedbackArray(data.feedback);       // set the state of all the feedbacks
        fetchEmployeeById(data.employeeId).then((data) => {
          setEmployee(data);
        });
      });
    }
  }, [id]);
  const { title, employeeId, description } = performance || {};

  return (
    <div className="p-8">
      <h1 className="text-3xl ml-6 mb-3">Performance Review</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Title</h2>
          <p>{title}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p>{description}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Employee Id: {employeeId}</h2>
          <p>Name: {employee?.name}</p>
        </div>
        {feedbackArray?.length > 0 ? (
          <div className="p-4 bg-white rounded shadow col-span-3">
            <h2 className="text-xl font-bold mb-2">Reviews</h2>
            <div className="flex items-center mb-2">
              <div className="w-1/3">Name</div>
              <div className="w-1/3">ID (Employee)</div>

              <div className="w-2/3">
                <div className="flex items-center">
                  <div className="w-1/2">Rating</div>
                  <div className="text-right">Comment</div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300"></div>
            {feedbackArray.map((feedback) => (
              <div key={feedback.employeeId} className="flex items-center mt-2">
                <div className="w-1/3">{feedback.name}</div>
                <div className="w-1/3">{feedback.employeeId}</div>

                <div className="w-2/3">
                  <div className="flex items-center">
                    <div className="w-1/2">{feedback.rating}</div>
                    <div
                      className="overflow-x-auto whitespace-nowrap pt-4 "
                      style={{ scrollbarWidth: "thin" }}
                    >
                      <div className="h-10">{feedback.comment}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-3xl ml-4 text-red-400 ">No Feedbacks Yet</p>
          </div>
        )}
      </div>
      {commentAndRatingFlag(currentId, employeeId) ? (
        <div className="mt-10">
          <h2 className="text-xl font-bold">Add Feedback</h2>
          <form className="flex items-center mt-5">
            <div className="w-1/3 block text-sm font-xl text-gray-700 ">
              <h1 className="text-xl">Comment</h1>
              <div className="mt-3 border-2 rounded-md shadow-md">
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  className="shadow-sm text-xl block w-full  rounded-md p-3 "
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            <div className="w-[8%] ml-4 ">
              <h1 className="text-xl">Rating</h1>
              <div className=" h-16 ">
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  className="mt-9 h-10 p-4 text-lg  block w-full border-2 rounded-md shadow-md"
                  min="1"
                  max="5"
                  defaultValue={1}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/3 ml-4 ">
              <button
                className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={handleAddFeedback}
              >
                Add Feedback
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Performance;
