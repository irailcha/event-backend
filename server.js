import mongoose from "mongoose";

import app from "./app.js";
const port = process.env.PORT || 3000;


mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
