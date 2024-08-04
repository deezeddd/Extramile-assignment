import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const useAuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // User is already logged in, redirect to the home page
      console.log("user already logged-in, if unable to logout, kindly clear all the memory from local storage");
      navigate('/home')
    }
  }, [navigate]);
};


export const useLoginCheck = () => {
const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    // User is not logged in, redirect to the home page
    console.log("user not logged-in, kindly log in");
    navigate('/login');
    return false;
  }
  return true;
} 
export const useAdminCheck = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if(token){
    const decodedToke = jwtDecode(token);
    if(decodedToke.role == "Admin"){
    return true;
    }
  }
  navigate('/home')
  return false;
}

