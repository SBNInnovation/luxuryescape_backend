import express, { Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config()

const port = process.env.PORT || 4000;

// app.use(cors({
//     origin:"http://localhost:3000",
//     methods: ['GET,POST,PUT,DELETE,OPTIONS'], // Specify allowed methods
//     credentials: true // Allow sending cookies
// }))
app.use(express.json())
app.use(cookieParser())

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


