import jwt from "jsonwebtoken";
import {Users} from "../models/usersModel.js";

const authenticate = async (req, res, next) => {
  try {
    // next();
    // const token = req.cookies.jwttt;
    // // jwt.verify(token , sev)
    // console.log(token);
    
  } catch (err) {
    console.log(err.message);
  }
};

export default authenticate;
