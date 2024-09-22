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
    organizer: {
      type: String,
      required: true,
    },
    participantList: {
      type: [{ type: Schema.Types.ObjectId, ref: "EventRegistr" }],
    },
  },
  { versionKey: false, timestamps: true }
);

const Event = model("Event", eventSchema); 

export default Event;
