const mongoose = require("mongoose");

const bankDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bankName: { type: String },
    accountHolder: { type: String },
    accountNumber: { type: String },
    ifsc: { type: String },
    branch: { type: String },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BankDetail", bankDetailSchema);
