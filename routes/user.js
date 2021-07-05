import express from "express";
import { Users } from "../models/users.js";
// import mongoose from "mongoose";

const router = express.Router();

router
  .route("/users")
  .get(async (req, res) => {
    const user = await Users.find();
    res.send(user);
  })
  .post(async (req, res) => {
    const adduser = req.body;
    const user = new Users(adduser);

    await user.save();
    res.send(user);
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
      res.send("user removed")
    } catch (err) {
      res.send(err);
    }
  });

  

export const userRouter = router;
