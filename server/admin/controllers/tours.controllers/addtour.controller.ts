// import { Request, Response } from "express";
// import Tours from "../../models/tours.model/addTours";
// import { uploadFile } from "../../../utility/cloudinary";
// import { Multer } from "multer";

// // interface MulterRequest extends Request {
// //     files?: { [fieldname: string]: Express.Multer.File[] } | undefined;
// //     file?: Express.Multer.File; // For single file uploads
// // }

// const addTours = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const {
//             name,
//             duration,
//             idealTime,
//             cost,
//             tourOverview,
//             destiDays,
//             destinationPlace,
//             keyHighlights,
//             highlightTitle,
//             tourInclusion,
//             mainOverview,
//             day,
//             title,
//             description,
//             accomodationTitle,
//             accDescription,
//             question,
//             answer,
//         } = req.body;

//         // Validate required fields in req.body using OR operator
//         if (!name || !duration || !idealTime || !cost || !tourOverview || !destiDays || 
//             !destinationPlace || !keyHighlights || !highlightTitle || !tourInclusion || 
//             !mainOverview || !day || !title || !description || !accomodationTitle || 
//             !accDescription || !question || !answer) {
//             res.status(400).json({ success: false, message: "All fields are required." });
//             return 
//         }

//         // // Validate required files
//         // const destinationPhotos = req.files?.["destinationPhotos"]?.[0];
//         // const highlightPicture = req.files?.["highlightPicture"]?.[0];
//         // const photo = req.files?.["photo"]?.[0];
//         // const accomodationPics = req.files?.["accomodationPics"];

//         // if (!destinationPhotos || !highlightPicture || !photo || !accomodationPics) {
//         //     res.status(400).json({
//         //         success: false,
//         //         message: "Missing required files: destinationPhotos, highlightPicture, photo, or accomodationPics"
//         //     });
//         //     return
//         // }

//         // // Upload files to Cloudinary
//         // const uploadedDestinationPhoto = await uploadFile(destinationPhotos.path, "LuxuryEscape");
//         // const uploadedHighlightPicture = await uploadFile(highlightPicture.path, "LuxuryEscape");
//         // const uploadedPhoto = await uploadFile(photo.path, "LuxuryEscape");

//         // const uploadedAccomodationPics = await Promise.all(
//         //     accomodationPics.map((file) => uploadFile(file.path, "LuxuryEscape"))
//         // );

//         // const accomodationPicUrls = uploadedAccomodationPics.map((img) => img?.url || "");

//         // Create tour in the database
//         const tour = await Tours.create({
//             name,
//             duration,
//             idealTime,
//             cost,
//             tourOverview,
//             destination: {
//                 destiDays,
//                 destinationPlace,
//                 // destinationPhotos: uploadedDestinationPhoto?.url || "",
//             },
//             tourHighlights: {
//                 keyHighlights,
//                 highlightImages: {
//                     highlightTitle,
//                     // highlightPicture: uploadedHighlightPicture?.url || "",
//                 },
//             },
//             tourInclusion,
//             tourItinerary: {
//                 mainOverview,
//                 itinerary: {
//                     day,
//                     title,
//                     description,
//                     // photo: uploadedPhoto?.url || "",
//                     accomodation: [
//                         {
//                             accomodationTitle,
//                             accDescription,
//                             // accomodationPic: accomodationPicUrls,
//                         },
//                     ],
//                 },
//             },
//             faq: {
//                 question,
//                 answer,
//             },
//         });

//         res.status(200).json({
//             success: true,
//             message: "Tour added successfully!",
//             tour,
//         });
//     } catch (error: any) {
//         console.error("Error adding tour:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to add tour. Please try again later.",
//             error: error.message,
//         });
//     }
// };

// export default addTours;




import { Request, Response } from "express";
import Tours from "../../models/tours.model/addTours";

const addTours = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            name,
            thumbnail,
            duration,
            idealTime,
            cost,
            tourOverview,
            destination,
            keyHighlights,
            tourHighlights,
            tourInclusion,
            tourItinerary,
            faq,
        } = req.body;

        // Validate required fields
        if (
            !name || !thumbnail || !duration || !idealTime || !cost || !tourOverview ||
            !destination || !keyHighlights || !tourHighlights || !tourInclusion || !tourItinerary
        ) {
            res.status(400).json({
                success: false,
                message: "All required fields must be provided. Please check your input.",
            });
            return;
        }

        // Validate and structure the destination
        if (!Array.isArray(destination)) {
            res.status(400).json({
                success: false,
                message: "Each destination must have 'destiDays', 'destinationPlace', and 'destinationPhotos'.",
            });
            return;
        }

        // Validate and structure the tour highlights
        if (!Array.isArray(tourHighlights)) {
            res.status(400).json({
                success: false,
                message: "Each highlight must have 'highlightTitle' and 'highlightPicture'.",
            });
            return;
        }

        // Validate and structure the itinerary
        if (!Array.isArray(tourItinerary.itinerary)) {
            res.status(400).json({
                success: false,
                message: "Each itinerary item must have 'day', 'title', 'description', 'photo', and 'accommodation'.",
            });
            return;
        }

        // Validate FAQ
        if (!Array.isArray(faq)) {
            res.status(400).json({
                success: false,
                message: "Each FAQ must have 'question' and 'answer'.",
            });
            return;
        }

        // Build the tour object
        const tourData = {
            name,
            thumbnail,
            duration,
            idealTime,
            cost,
            tourOverview,
            destination,
            tourHighlights,
            tourInclusion,
            tourItinerary,
            faq
        };

        // Create tour in the database
        const tour = await Tours.create(tourData);

        // Success response
        res.status(200).json({
            success: true,
            message: "Tour added successfully!",
            tour,
        });
    } catch (error: any) {
        console.error("Error adding tour:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add tour. Please try again later.",
            error: error.message,
        });
    }
};

export default addTours;
