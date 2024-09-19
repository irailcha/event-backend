import { Schema, model } from "mongoose";


const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    event_date: {
      type: Date,
      required: true,
    },
    organizer:{
        type: String,
        required: true,
    }
  
  
  },
  { versionKey: false, timestamps: true }
);

const Event = model("events", eventSchema);

export default Event;
