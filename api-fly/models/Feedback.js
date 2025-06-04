const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamps");
const User = require("./User");
let Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
  title: { type: String, required: true },
  feedback: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: Date,
  updatedAt: Date,

});

FeedbackSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model("Feedback", FeedbackSchema);
