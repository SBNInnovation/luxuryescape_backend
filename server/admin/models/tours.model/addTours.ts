import mongoose, { Schema } from "mongoose";

const destinationSchema = new Schema(
  {
    destinationDays: { type: String, required: true },
    destinationPlace: { type: String, required: true }, 
    destinationPhoto: { type: String, required: true }
  },
  {
    _id: false
  }
);

const highlightsPicandTitle = new Schema(
  {
    highlightTitle: { type: String, required: true },
    highlightPicture: { type: String, required: true }
  },
  {
    _id: false
  }
);


const accommodationDetails = new Schema(
  {
    accommodationTitle: { type: String, required: true }, 
    accommodationPics: { type: [String], default: [] }, 
    accomodationDescription: { type: String, required: true }
  },
  {
    _id: false
  }
);

const itineraryDetails = new Schema(
  {
    day: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    itineraryDayPhoto: { type: String, required: true },
    accommodation: [accommodationDetails] 
  },
  {
    _id: false
  }
);

const faqDetails = new Schema(
  {
    question: { type: String, default:"" },
    answer: { type: String, default:"" }
  },
  {
    _id: false
  }
);

const addTour = new Schema(
  {
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    idealTime: { type: String, required: true },
    cost: { type: String, required: true },
    tourTypes: {type:String, required:true},
    destination: [destinationSchema],
    tourOverview: { type: String, required: true },
    keyHighlights: { type: [String], default: [] },
    tourHighlights: [highlightsPicandTitle],
    tourInclusion: { type: [String], default: [] },
    tourItinerary:  {
        mainOverview: { type: String, required: true },
        itinerary: [itineraryDetails] 
    },
    faq: [faqDetails]
  },
  {
    timestamps: true
  }
);

const Tours = mongoose.model("Tours", addTour);

export default Tours;
