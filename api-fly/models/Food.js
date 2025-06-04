const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamps");
let Schema = mongoose.Schema;
const FoodSchema = new Schema({
  f_image: { type: String, required: false },
  f_name: { type: String, required: true },
  f_description: { type: String, required: true },
  f_price: { type: Number, required: true },
  f_category: { type: String, required: true },
  f_availability: { type: Boolean, default: true },
  f_rating: { type: Number, default: 0 },
  createdAt: Date,
  updatedAt: Date,
});

FoodSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model("Food", FoodSchema);
