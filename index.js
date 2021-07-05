import express from "express";
import mongoose from "mongoose";
// import {Users} from "./models/users.js";
import {userRouter} from "./routes/user.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5003;
const url = "mongodb+srv://chinmay:chinmay@123@cluster0.zts7c.mongodb.net/USERS";
//mongoose
mongoose.connect(url, { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on("open" , () => console.log("Mongodb connected"));


app.listen(PORT , () => console.log("connected to port 5003"));

//middler ware
app.use(cors());
app.use(express.json());

app.use("/" , userRouter);

app.get("/" , (req , res) => {
    res.send("hello Chinmay");
})

