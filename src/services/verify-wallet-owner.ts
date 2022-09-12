import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import verifyRouter from "../routes/verify-wallet-owner";
import { MONGO_URL } from "../utils";

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

const whitelist = ["http://localhost:3000", "http://localhost:8080/"];

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/v1/verify", verifyRouter);

const PORT: number = (process.env.PORT as unknown as number) || 8080 || 8081;

mongoose
  .connect(MONGO_URL as string)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`[rest-api]: Bot rest-api is running at PORT ${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
