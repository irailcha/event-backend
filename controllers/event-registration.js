import EventRegistr from "../models/EventRegistr.js";


const eventRegistration= async (req, res, next) => {
    const { fullname, email, date_of_birth, source } = req.body;
    const newRegistration =new EventRegistr({
      fullname, email, date_of_birth, source
    })
    try {
    await newRegistration.save()
    return res.status(201).json({ message: 'Registration successful!' });
    
    } catch (error) {
      next(error);
    }
  };
  


  export default eventRegistration;