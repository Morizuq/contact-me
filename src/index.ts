const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
import { Request, Response } from "express";

require("dotenv").config();

const mail = require("./router");

const app = express();

const port = process.env.PORT || 3412;

app.get("/favicon", (req: Request, res: Response) => res.status(204));

app.use(express.json());

app.use("/api/v1/mail", mail);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

//Start the server after connecting to the database
start();
