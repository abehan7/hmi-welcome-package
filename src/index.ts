import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user";
import verifyRouter from "./routes/verify-wallet-owner";
import couponRouter from "./routes/coupon";
import { MONGO_URL } from "./utils";

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", userRouter);
app.use("/verify", verifyRouter);
app.use("/coupon", couponRouter);

const PORT: number = (process.env.PORT as unknown as number) || 5000 || 5001;
// process.env.CONNECTION_URL as string,

mongoose
  .connect(MONGO_URL as string)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`[rest-api]: Bot rest-api is running at PORT ${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
