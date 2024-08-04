import express from 'express';
import Employee from "../models/employee.model.js";
import {
  restrictToLoggedInUserOnly,
  restrictTo,
} from "../middleware/authorization.js";

import { getAllEmployees, getEmployeeById, getAllEmployeesAdmin, createEmployee, updateEmployee, deleteEmployee, login } from "../controller/employeeController.js";

const router = express.Router();

router.post('/', async (req, res) => {
res.send("Employee Routes")
})

//SignUp
router.post("/signup", async (req, res) => {
  try {
    // Check if Employee already exists with the provided email
    const existingEmployee = await Employee.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res.status(400).json({ error: "Employee already exists" });
    }

    // Create a new Employee
    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    // Save the new Employee document to the database
    const saved = await createEmployee(employee);
    res.status(201).send(saved);
  } catch (error) {
    console.error("Error creating Employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Login and generate JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    // console.debug("Token Generated: ",token);
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(400).json({ "Error during login": err.message });
  }
});

//All Employees (Admin Only)
router
.all(restrictTo(["Admin"]))
   .get("/admin/all",async (req, res) => {
    try {
        const Employees = await getAllEmployeesAdmin();
        res.status(200).json(Employees);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });

//All Employees 
router
   .get("/all",async (req, res) => {
    try {
        const Employees = await getAllEmployees();
        res.status(200).json(Employees);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });


//By ID
router
  .route("/:id")
  .get(async (req, res) => {
    const employeeId = req.params.id;
    console.log(employeeId);
    try {
      const employee = await getEmployeeById(employeeId);
      if (!employee) {
        res.status(404).json({ error: "No Employee with this Id Exist" });
      } else {
        res.status(200).json(employee);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    const employeeId = req.params.id;
    try {
      const updatedEmployee = await updateEmployee(employeeId, req.body);
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  // DELETE operation
  .all(restrictToLoggedInUserOnly)
  .delete(async (req, res) => {
    const employeeId = req.params.id;
    try {
      const message = await deleteEmployee(employeeId);
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


export default router;



// //Logout - Deprecated
// router.get("/logout", restrictToLoggedInUserOnly, (req, res) => {
//   try {
//     // Check if the request includes the authorization header with a token
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.status(400).send("No user logged in");
//     }
//     // Clear the token from the headers
//     delete req.headers["authorization"];

//     res.status(200).send("User logged out");
//   } catch (err) {
//     res.status(500).send({ msg: err.message });
//   }
// });