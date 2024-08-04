import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

 function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

const handleSignUp = async (e) => {
  e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/employee/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role, name }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        console.debug(data);
        navigate("/login");
      } else {
        console.debug(data);
      }
    } catch (error) {
      console.error("Error logging in: " + error.message);
    }
}

  return (
    <div className="flex justify-center items-center h-[50rem]">
      <div className="flex flex-col items-center w-[30%]  p-5 border-2 rounded-lg">
        <h1 className="text-4xl p-3 mb-7"> SIGN UP</h1>
        <div className="border-2 p-1 w-[90%] mb-3 rounded-lg ">
          <input
            type="text"
            placeholder="Name"
            className="w-[100%] h-10 text-md pl-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className="border-2 p-1 w-[90%] mb-3 rounded-lg ">
          <input
            type="email"
            placeholder="Email"
            className="w-[100%] h-10 text-md pl-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="border-2 p-1 w-[90%] mb-3 rounded-lg ">
          <input
            type="password"
            placeholder="Password"
            className="w-[100%] h-10 text-md pl-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="border-2 p-1 w-[90%] mb-3 rounded-lg ">
          <select
            className="w-[100%] h-10 text-md pl-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="User">Employee</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button
          disabled={!name || !email.includes("@") || !password || !role}
          className={`px-6 py-2 my-3 rounded-lg bg-red-500  text-white ${
            !name || !email.includes("@") || !password || !role
              ? "opacity-50 cursor-not-allowed hover:bg-red-600"
              : ""
          }`}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <Link
          to="/login"
          className={`px-6 py-2 my-3 rounded-lg text-blue-500 hover:bg-white`}
        >
          Have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
