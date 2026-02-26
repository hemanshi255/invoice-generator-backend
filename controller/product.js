// controller/product.js

let PRODUCT = require("../model/product");

exports.createData = async (req, res) => {
  try {
    const product = await PRODUCT.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const products = await PRODUCT.find(filter);
    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const product = await PRODUCT.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.editData = async (req, res) => {
  try {
    const product = await PRODUCT.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
