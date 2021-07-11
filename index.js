import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/auth.js";
import cors from "cors";
// import "./db/conn.js";

const app = express();
app.use(cors());


dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5003;
// const PORT = process.env.PORT ;

//mongoose connect
const url = process.env.DATABASE;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const conn = mongoose.connection;
conn.on("open", () => console.log("Mongodb connected"));

//middler ware
// app.use(cors());
app.use(express.json());

// const middleware = (req, res, next) => {};
app.listen(PORT, () => console.log("connected to port 5003"));

app.use("/" , userRouter);


