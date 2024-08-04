import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../context/Context";
import { useAuthGuard } from "../auth/authGuard"

function Login() {
  useAuthGuard();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = useContext(MyContext);
  const { setToken } = state;  //via Context from MyProvider
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(process.env);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/employee/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        if(localStorage.getItem('token')){
          localStorage.removeItem('token');
        }
        else{
          localStorage.setItem("token", data.token);
        }
        setToken(data.token);
        window.location.reload();
        navigate("/home");
      } else {
        console.debug(data);
        console.error("Error, please retry");
      }
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  
  return (
    <div className="flex justify-center items-center h-[50rem]">
      <div className="flex flex-col items-center w-[30%] h-[50%] p-5 border-2 rounded-lg">
        <h1 className="text-4xl p-3 mb-7"> Login</h1>
        <div className="border-2 p-1 w-[90%] mb-3 rounded-lg">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-[100%] h-10 text-xl pl-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="border-2 p-1 w-[90%] mb-3 rounded-lg ">
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-[100%] h-10 text-xl pl-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <button
          disabled={!email.includes("@") || password === ""}
          className={`px-6 py-2 my-3 rounded-lg bg-blue-500 hover:bg-blue-700 text-white ${
            !email.includes("@") || password === ""
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleLogin}
        >
          Login
        </button>
        <Link
          to="/signup"
          className={`px-6 py-2 my-3 rounded-lg text-red-500 hover:bg-white`}
        >
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;