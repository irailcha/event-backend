import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import eventRouter from "./routes/event-routes.js";



const app = express();

dotenv.config();

app.use(morgan("combined"));
app.use("*", cors());
app.use(express.json());

app.use('/events', eventRouter);


app.use((req, res) => {
  res
    .status(404)
    .json({ message: "Unfortunately, we cannot fulfill your request" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Status error" } = err;
  res.status(status).json({ message });
});

export default app;
