import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import MyContext from "../context/Context";

 function Navbar(){

  const state = useContext(MyContext);
  const navigate = useNavigate();

  const {token, setToken, userInfo} = state;
  useEffect(() => {
    if(!token){
      navigate("/login");
    }
  }, [token]);

    return (
      <nav className="bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="">
              <Link to="/home" className="text-white text-3xl">Reviewer App</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {token ? (
                  <>
                    <Link
                      to="/performance"
                      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700"
                    >
                      Performance
                    </Link>
                    {userInfo?.role == "Admin"? <Link
                      to="/employees"
                      className=" px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700"
                    >
                      Employees
                    </Link>: null}
                    <Link to="/home"
                      className="px-3 py-2 rounded-md text-sm text-red-300 font-medium hover:text-red-400 hover:bg-gray-700"
                      onClick={() => {localStorage.removeItem("token"); setToken(null);}}
                    >
                      Logout
                    </Link>
                    {/* TODO User Page */}
                    <Link
                      className={`px-3 py-2 rounded-md text-md font-medium text-white hover:text-white ${userInfo?.role == "Admin" ? " hover:bg-red-700" : "hover:bg-gray-700"} `}
                    >
                      {userInfo?.name}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700"
                    >
                      Sign-up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
