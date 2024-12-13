import express from "express";
import multer from "multer";
import addTours from "../../controllers/tours.controllers/addtour.controller.js";
import { Request } from "express";


const addTourRouter = express.Router();

interface MulterRequest extends Request {
    files: {
      thumbnail?: Express.Multer.File[],
      destinationPhoto?: Express.Multer.File[],
      highlightPicture?: Express.Multer.File[],
      itineraryDayPhoto?: Express.Multer.File[],
      accommodationPics?: Express.Multer.File[]
    }
  }

  const uploader = multer({
    storage: multer.diskStorage({}),
  })

const upload =[
    { name: "destinationPhoto", maxCount: 1 },
    { name: "highlightPicture", maxCount: 1 },
    { name: "itineraryDayPhoto", maxCount: 1 },
    { name: "accommodationPics", maxCount: 5 },
];


addTourRouter.post("/add-tours",uploader.fields(upload),(req,res)=>{
    addTours(req as MulterRequest,res)
})


 export default addTourRouter