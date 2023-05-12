const express = require("express");
import { NextFunction, Request, Response } from "express";
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const mail = require("./router");

const app = express();

const port = process.env.PORT || 3412;

app.get("/favicon", (req: Request, res: Response) => res.status(204));

// app.use(function (req: Request, res: Response, next: NextFunction) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Contact Me"));

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
