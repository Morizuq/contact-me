import { NextFunction, Response } from "express";

const Mail = require("./schema");

import { SendEmail } from "./email";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Mail.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        response,
      },
    });

    await new SendEmail(response).sendMail();
  } catch (error) {
    console.log(error);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await Mail.find();
    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
