import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {userRouter} from "./routes/user.js";
import cors from "cors";

dotenv.config({path : "./config.env"});
const PORT = process.env.PORT || 5003;
const url = process.env.DATABASE;


const app = express();

//mongoose
mongoose.connect(url, { 
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true ,
    useFindAndModify: false
});
const conn = mongoose.connection;
conn.on("open" , () => console.log("Mongodb connected"));

const middleware = (req, res , next) => {

}
app.listen(PORT , () => console.log("connected to port 5003"));

//middler ware
app.use(cors());
app.use(express.json());

