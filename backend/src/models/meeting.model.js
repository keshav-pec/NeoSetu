const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const meetingSchema = new Schema({
  user_id: String,
  meetingCode: { type: String, reuired: true },
  date: { type: Date, default: Date.now, required: true },
});

const Meeting = mongoose.model("meeting", meetingSchema);

module.exports = { Meeting };
