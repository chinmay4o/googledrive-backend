import mongoose from "mongoose";

//mongoose
const url = process.env.DATABASE;

mongoose.connect(url, { 
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true ,
    useFindAndModify: false
})
const conn = mongoose.connection;
conn.on("open" , () => console.log("Mongodb1111 connected"));