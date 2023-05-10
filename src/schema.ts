import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Must have an email"],
  },
  message: {
    type: String,
    required: [true, "Must have a message"],
  },
});

module.exports = mongoose.model("Mail", mailSchema);
