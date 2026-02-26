const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String },
    gst: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Company", companySchema);
