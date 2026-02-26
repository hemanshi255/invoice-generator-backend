const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Inventory", inventorySchema);
