import jwt from "jsonwebtoken";
import {Users} from "../models/usersModel.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwttt;
    console.log(token);
    // next();
  } catch (err) {
    console.log(err.message);
  }
};

export default authenticate;
