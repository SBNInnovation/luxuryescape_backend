import express from "express";
// import multer from "multer";
import addTours from "../../controllers/tours.controllers/addtour.controller";

const addTourRouter = express.Router();

// const upload = multer({ dest: "uploads/" }).fields([
//     { name: "destinationPhotos", maxCount: 1 }, // Single file
//     { name: "highlightPicture", maxCount: 1 }, // Single file
//     { name: "photo", maxCount: 1 }, // Single file
//     { name: "accomodationPic", maxCount: 10 }, // Multiple files
// ]);


// addTourRouter.route("/add-tours").post(upload, addTours)
addTourRouter.route("/add-tours").post(addTours)


 export default addTourRouter