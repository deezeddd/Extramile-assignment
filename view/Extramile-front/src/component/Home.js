import { useState } from "react";

 function Home(){
   const [dark, setDark] = useState(false);
   return (
     <div
       className={`${
         dark ? "bg-black text-white" : "bg-white text-black"
       } p-10`}
     >
       <button
         className="p-2 border-2 shadow-lg "
         onClick={() => setDark(!dark)}
       >
         Dark Mode
       </button>
       <div className="text-2xl mt-5">
         <h1 className="text-6xl text-center">Home</h1>
         <div className="text-2xl mt-3">
           <h1 className="underline text-orange-400">Routes (Front-end): </h1>
           <ul className={`${"text-blue-400"} mt-4`}>
             <li className="mb-2">
               /employees :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 Get all employees details (Admin Only)
               </span>
             </li>
             <li className="mb-2">
               /performance :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 Get all performance reviews for current user || Get all
                 performance reviews (Admin Only)
               </span>
             </li>
             <li className="mb-2">
               /viewperformance/:employeeId :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 View Performance for specific employee along with feedbacks,
                 reviewers are allowed to share feedback and view other
                 feedbacks{" "}
               </span>
             </li>
             <li className="mb-2">
               /addperformance/:employeeId :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 Add performance review for specific employee (Admin Only)
               </span>
             </li>
             <li className="mb-2">
               /signup :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 User/Admin can signup
               </span>
             </li>
             <li className="mb-2">
               /login :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 User/Admin can Login
               </span>
             </li>
             <li className="mb-2">
               /home :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 Home Page
               </span>
             </li>
           </ul>
         </div>
         <div className="text-2xl mt-4">
           <h1 className="underline text-orange-400">Routes (Backend-end): </h1>
           <ul className="text-blue-400 mt-4 ">
             <li className="mb-2">
               /api/employees :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 All the endpoints related to employees
               </span>
             </li>
             <li className="mb-2">
               /api/feedback :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 All the endpoints related to feedback
               </span>
             </li>
             <li className="mb-2">
               /api/performance :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 All the endpoints related to Performance
               </span>
             </li>
             <h1 className="text-3xl mt-4 underline text-orange-400">
               Application Assumptions and Flow
             </h1>
             <li className="mb-2 mt-4">
               Signup :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 User/Admin can signup, password is hashed for security.
               </span>
             </li>
             <li className="mb-2">
               login :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 User/Admin can Login, JWT is assigned to them and stored in
                 localStorage of browser.
               </span>
             </li>
             <li className="mb-2">
               Admin :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 Can view, delete or raise Performance Review (PR) and add
                 reviewers (Employees) to it. Admin can also view, delete or add Employee
               </span>
             </li>
             <li className="mb-2">
               Employee :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 Can View PR either assigned to them or for them.
               </span>
             </li>
             <li className="mb-2">
               Assumption :-{" "}
               <span className={`${dark ? "text-white" : "text-black"}`}>
                 <br />
                 1) Employee can only view their own PRs and the one assigned to
                 them.
                 <br />
                 2) Employee can feedback on assigned PRs
                 <br />
                 3) Admin can assign multiple reviewers
                 <br />
                 4) Admin can perform delete operations on Employees and
                 add/delete PRs
               </span>
             </li>
           </ul>
         </div>
       </div>
     </div>
   );
}

export default Home;
