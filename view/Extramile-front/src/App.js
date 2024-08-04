import './App.css';
import Login  from './component/Login';
import SignUp  from "./component/Signup";
import AddPerformance  from './component/PerformanceReview/AddPerformance';
import Performances from "./component/PerformanceReview/Performances";
import  Performance  from "./component/PerformanceReview/Performance";

import Home  from './component/Home';
import Navbar  from './component/Navbar';
import Employee from './component/Employee/Employee';
import NotFound  from './component/NotFound';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProvider from './context/Provider';


function App() {
  return (
    <>
      <MyProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addperformance/:id" element={<AddPerformance />} />
            <Route path="/performance" element={<Performances />} />
            <Route path="/viewperformance/:id" element={<Performance />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MyProvider>
    </>
  );
}

export default App;
