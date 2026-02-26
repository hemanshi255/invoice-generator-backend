const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankDetail",
      default: null,
    },
    type: {
      type: String,
      enum: ["cash", "bank"],
      required: true,
    },
    action: {
      type: String,
      enum: ["add", "purchase", "withdraw", "sale"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Balance", balanceSchema);
