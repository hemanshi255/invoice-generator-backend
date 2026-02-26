const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  organization: String,
  phone: String,
  email: String,
  gst: String,
});

module.exports = mongoose.model("Customer", userSchema);
