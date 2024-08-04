import Employee from "../models/employee.model.js";

// CREATE operation
const createEmployee = async (EmployeeData) => {
  try {
    const newEmployee = new Employee(EmployeeData);
    console.log(newEmployee, EmployeeData);
    const savedEmployee = await newEmployee.save();
    return savedEmployee;
  } catch (error) {
    throw new Error("Could not create Employee: " + error.message);
  }
};

//Login Employee
const login = async(email, password) =>{
  const token = await Employee.matchPasswordAndGenerateToken(email, password);
  return token;
}


// READ operation (get all Employees)
const getAllEmployeesAdmin = async () => {
  try {
    const Employees = await Employee.find();
    return Employees;
  } catch (error) {
    throw new Error("Could not fetch Employees: " + error.message);
  }
};
const getAllEmployees = async () => {
  try {
    const Employees = await Employee.find();
    //Without sensitive information
        const formattedEmployees = Employees.map((employee) => ({
          employeeId: employee.employeeId,
          role: employee.role,
          email: employee.email,
          name: employee.name,
        }));

    return formattedEmployees;
  } catch (error) {
    throw new Error("Could not fetch Employees: " + error.message);
  }
};

// READ operation (get Employee by ID)
const getEmployeeById = async (employeeId) => {
  try {
    const employee = await Employee.findOne({employeeId});
    if(!employee) return null;
    const formattedEmployee = {
      employeeId: employee.employeeId,
      role: employee.role,
      email: employee.email,
      name: employee.name,
    };
    return formattedEmployee;
  } catch (error) {
    throw new Error("Could not fetch Employee: " + error.message);
  }
};

// UPDATE operation
const updateEmployee = async (employeeId, updatedData) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { employeeId },
      updatedData,
      { new: true }
    );
    return employee;
  } catch (error) {
    throw new Error("Could not update Employee: " + error.message);
  }
};

// DELETE operation
const deleteEmployee = async (employeeId) => {
  try {
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return "Employee Does not Exist";
    }
    await Employee.findOneAndDelete({ employeeId });

    return "Employee deleted successfully";
  } catch (error) {
    throw new Error("Could not delete Employee: " + error.message);
  }
};


export {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  getAllEmployeesAdmin, 
  updateEmployee,
  deleteEmployee,
  login,
};
