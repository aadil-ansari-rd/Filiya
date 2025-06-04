const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamps");

let Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  u_image: { type: String, required: false }, 
  u_name: { type: String, required: true },
  u_email: { type: String, required: true, unique: true },
  u_phone: { type: String, required: false },
  u_address: { type: String, required: false },
  u_role: { type: String, default: "user" },
  createdAt: Date,
  updatedAt: Date,
});
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model("User", UserSchema);
