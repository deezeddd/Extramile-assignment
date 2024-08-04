import connectDB from "./dbconnection.js";
import express from 'express';
import employeeRouter from "./routes/employeeRoutes.js";
import performanceRouter from "./routes/performanceRoutes.js";
import feedbackRouter from "./routes/feedbackRoutes.js"
import cors from "cors"
connectDB() // db connection

const app = express(); // express app
const PORT = process.env.PORT || 3000;

//Middleware
app.use( cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/employee", employeeRouter);
app.use("/api/performance", performanceRouter);
app.use("/api/feedback", feedbackRouter);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})

