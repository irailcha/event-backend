import { Schema, model } from "mongoose";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const EventParticipantSchema=new Schema(
    {
        fullname: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          match: emailRegexp,
          unique: true,
          required: true,
        },
        date_of_birth: {
          type: Date,
          required: true,
        },
        source: { 
          type: String, 
          required: true },
    
    },
    { versionKey: false, timestamps: true }
)

const EventRegistr = model("EventRegistr", EventParticipantSchema);


export default EventRegistr;
