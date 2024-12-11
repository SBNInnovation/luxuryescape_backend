import express, { Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import addTourRouter from "./admin/routes/tour.routes/tourRoute";
import dbConnection from "./mongoDb/mongoDbConnection";

const app = express();
dotenv.config()

const port = process.env.PORT || 4000;

// Connect to the database
dbConnection();

// app.use(cors({
//     origin:"http://localhost:3000",
//     methods: ['GET,POST,PUT,DELETE,OPTIONS'], // Specify allowed methods
//     credentials: true // Allow sending cookies
// }))
app.use(express.json())
app.use(cookieParser())
app.use(addTourRouter)

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


