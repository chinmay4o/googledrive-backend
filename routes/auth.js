import express from "express";
import { Users } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticate from "../middleware/authenticate.js";
import cors from "cors";
// import mongoose from "mongoose";

const router = express.Router();

router.route("/users").get(async (req, res) => {
  res.cookie("jwttt", "token");
  const user = await Users.find();
  res.send(user);
});

//================== SignUp route ==================
router.route("/register").post(async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ message: "pls fill all the fields" });
  }
  try {
    const user = await Users.findOne({ email: email });

    if (user) {
      // return res.status(422).json({ message: "email already exists" });
      res.status(422);
      return res.send("email already exists");
    } else if (password != cpassword) {
      res.status(422);
      return res.send("password doesn't match");
    } else {
      const userReg = new Users({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      await userReg.save();
      res.send("users successfully registered");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//================== login route ==================

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(422);
      return res.send("fill in details");
    }

    const userLogin = await Users.findOne({ email: email });

    if (!userLogin) {
      return res.status(422);
    }

    let token1 = jwt.sign({ _id: userLogin._id }, process.env.SECRET_KEY);
    userLogin.tokens = userLogin.tokens.concat({ token: token1 });
    await userLogin.save();
    // const token = await userLogin.generateAuthToken();
    console.log(token1);

    // saving tokens n cookies
    res.cookie("jwttt", token1, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true
    });

    if (userLogin) {
      const verifyPass = await bcrypt.compare(password, userLogin.password);
      if (!verifyPass) {
        res.status(422);
        res.send("invalid credentials");
      } else {
        res.send("successfull login");
      }
    } else {
      res.status(422);
      return res.send("invalid details");
    }
  } catch (err) {
    console.log(err);
    res.status(422);
    return res.send("invalid details");
  }
});

router
  .route("/users/:id")
  .patch(async (req, res) => {
    const idd = req.params.id;
    const { name, city } = req.body;
    const user = await Users.findById(idd);
    if (name) {
      user.name = name;
    }
    if (city) {
      user.city = city;
    }

    await user.save();
    res.send(user);
  })
  .delete(async (req, res) => {
    const idd = req.params.id;

    try {
      const user = await Users.findById(idd);
      await user.remove();
      res.send(user);
      res.send("user removed");
    } catch (err) {
      res.send(err);
    }
  });

router.get("/about", authenticate, (req, res) => {
  console.log(`Hello my About`);
  // res.send(req.rootUser);
});
export const userRouter = router;
