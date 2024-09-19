import mongoose from "mongoose";

import app from "./app.js";
const port = process.env.PORT || 3000;


mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
