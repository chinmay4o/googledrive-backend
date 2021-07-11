import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// import "./db/conn.js";


dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5003;

const app = express();
// app.use(cors());

var dd = {
  origin : true,
  credentials : true
};
app.use(cors(dd));

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
// app.use(cors(dd));
app.use(express.json());
app.use(cookieParser());
// const middleware = (req, res, next) => {};
app.listen(PORT, () => console.log("connected to port 5003"));

app.use("/" , userRouter);


