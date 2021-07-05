import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
      type: String
  },
  password: {
      type: String
    //   required: true
  }
});

export const Users = mongoose.model("ref" , userSchema);