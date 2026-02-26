const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  category: String,
  casNumber: String,
  price: Number,
  tax: Number,
  hazardLevel: String,
  safetyNotes: String,
});

module.exports = mongoose.model("Product", userSchema);
