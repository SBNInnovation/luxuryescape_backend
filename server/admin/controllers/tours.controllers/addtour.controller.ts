import { Request, Response } from "express";
import { uploadFile } from "../../../utility/cloudinary.js";
import Tours from "../../models/tours.model/addTours.js";
// import {Multer} from "multer"

// interface MulterRequest extends Request {
//     files?: { [fieldname: string]: Express.Multer.File[] };
// }

// const addTours = async (req: MulterRequest, res: Response): Promise<void> => {
//     try {
//         const {
//             name,
//             duration,
//             idealTime,
//             cost,
//             tourTypes,
//             tourOverview,
//             destinationDays,
//             destinationPlace,
//             keyHighlights,
//             highlightTitle,
//             tourInclusion,
//             mainOverview,
//             faq,
//             day,
//             title,
//             description,
//             accommodationTitle,
//             accomodationDescription,
//             destinationPhoto, highlightPicture, itineraryDayPhoto, accommodationPics, thumbnail
//         } = req.body;

//         // Validate required fields
//         const requiredFields = [
//             name,
//             duration,
//             idealTime,
//             cost,
//             tourTypes,
//             tourOverview,
//             destinationDays,
//             destinationPlace,
//             keyHighlights,
//             highlightTitle,
//             tourInclusion,
//             mainOverview,
//             day,
//             title,
//             description,
//             accommodationTitle,
//             accomodationDescription,
//             destinationPhoto, highlightPicture, itineraryDayPhoto, accommodationPics,
//             thumbnail
//         ];

//         if (requiredFields.some(field => !field)) {
//             res.status(400).json({
//                 success: false,
//                 message: "All required fields must be provided. Please check your input.",
//             });
//             return;
//         }

//         // Validate FAQ format
//         if (faq && !Array.isArray(faq)) {
//             res.status(400).json({
//                 success: false,
//                 message: "FAQ must be an array of objects with 'question' and 'answer'.",
//             });
//             return;
//         }

//         // Handle files
//         // const { destinationPhoto, highlightPicture, itineraryDayPhoto, accommodationPics, thumbnail } = req.files || {};

//         // if (!destinationPhoto || !highlightPicture || !itineraryDayPhoto || !accommodationPics || !thumbnail) {
//         //     res.status(400).json({
//         //         success: false,
//         //         message: "Missing required files: destinationPhoto, highlightPicture, itineraryDayPhoto, or accommodationPics",
//         //     });
//         //     return;
//         // }

//         // Upload files
//         // const uploadedDestinationPhoto = await uploadFile(destinationPhoto[0].path, "LuxuryEscape");
//         // const uploadedHighlightPicture = await uploadFile(highlightPicture[0].path, "LuxuryEscape");
//         // const uploadedItineraryDayPhoto = await uploadFile(itineraryDayPhoto[0].path, "LuxuryEscape");
//         // const uploadedThumbnail = await uploadFile(thumbnail[0].path, "LuxuryEscape");
//         // const uploadedAccommodationPics = await Promise.all(
//         //     accommodationPics.map(file => uploadFile(file.path, "LuxuryEscape"))
//         // );

//         // Construct nested objects/arrays
//         const destinationArray = {
//             destinationDays,
//             destinationPlace,
//             destinationPhoto
//             // destinationPhoto: uploadedDestinationPhoto
//         };

//         const tourHighlightsArray = {
//             highlightTitle,
//             highlightPicture
//             // highlightPicture: uploadedHighlightPicture
//         };

//         const accommodationArray = {
//             accommodationTitle,
//             accommodationPics,
//             // accommodationPics: uploadedAccommodationPics,
//             accomodationDescription
//         };

//         const tourItineraryArray = {
//             day,
//             title,
//             description,
//             itineraryDayPhoto,
//             // itineraryDayPhoto: uploadedItineraryDayPhoto,
//             accommodation: accommodationArray
//         };

//         // Build the tour object
//         const tourData = {
//             name,
//             thumbnail,
//             // thumbnail: uploadedThumbnail,
//             duration,
//             idealTime,
//             cost,
//             tourTypes,
//             tourOverview,
//             destination: destinationArray,
//             keyHighlights,
//             tourHighlights: tourHighlightsArray,
//             tourInclusion,
//             mainOverview,
//             tourItinerary: tourItineraryArray,
//             faq
//         };

//         // Create tour in the database
//         const tour = await Tours.create(tourData);

//         // Success response
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

interface MulterRequest extends Request {
    files: {
      thumbnail?: Express.Multer.File[]
      destinationPhoto?: Express.Multer.File[]
      highlightPicture?: Express.Multer.File[]
      itineraryDayPhoto?: Express.Multer.File[]
      accommodationPics?: Express.Multer.File[]
    }
  }

const addTours = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        const {
            name, duration, idealTime, cost, tourTypes, tourOverview, destination, keyHighlights, tourHighlights,
            tourInclusion, faq, tourItinerary
        } = req.body;

        // Inline validation for required fields
        if (!name || !duration || !cost || !tourTypes || !tourOverview) {
             res.status(400).json({
                success: false,
                message: "Missing required fields: name, duration, cost, tourTypes, and tourOverview are mandatory.",
            });
            return
        }

        const { thumbnail, destinationPhoto, highlightPicture, itineraryDayPhoto, accommodationPics } = req.files || {};

        // Handle file uploads
        const uploadedThumbnail = thumbnail && await uploadFile(thumbnail[0].path, "LuxuryEscape");
        const uploadedDestinationPhoto = destinationPhoto && await uploadFile(destinationPhoto[0].path, "LuxuryEscape");
        const uploadedHighlightPicture = highlightPicture && await uploadFile(highlightPicture[0].path, "LuxuryEscape");
        const uploadedItineraryDayPhoto = itineraryDayPhoto && await uploadFile(itineraryDayPhoto[0].path, "LuxuryEscape");
        const uploadedAccommodationPics = accommodationPics
            ? await Promise.all(accommodationPics.map(file => uploadFile(file.path, "LuxuryEscape")))
            : [];

        // Build the tour data object
        const tourData = {
            name,
            thumbnail: uploadedThumbnail || thumbnail,
            duration,
            idealTime,
            cost,
            tourTypes,
            tourOverview,
            destination: destination?.map((d: any, index: number) => ({
                ...d,
                destinationPhoto: uploadedDestinationPhoto || destinationPhoto?.[index]?.path,
            })) || [],
            keyHighlights,
            tourHighlights: tourHighlights?.map((h: any, index: number) => ({
                ...h,
                highlightPicture: uploadedHighlightPicture || highlightPicture?.[index]?.path,
            })) || [],
            tourInclusion,
            faq: faq || [],
            tourItinerary: {
                ...tourItinerary,
                itinerary: tourItinerary?.itinerary?.map((i: any, index: number) => ({
                    ...i,
                    itineraryDayPhoto: uploadedItineraryDayPhoto || itineraryDayPhoto?.[index]?.path,
                    accommodation: i.accommodation?.map((a: any, accIndex: number) => ({
                        ...a,
                        accommodationPics: uploadedAccommodationPics[accIndex] || accommodationPics?.[accIndex]?.path,
                    })) || [],
                })) || [],
            },
        };

        // Create new tour
        const tour = await Tours.create(tourData);

        // Respond with success
        res.status(201).json({
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

