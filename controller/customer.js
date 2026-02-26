// controller/customer.js

let USER = require("../model/customer");

exports.createData = async (req, res) => {
  try {
    const createUser = await USER.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Data Create Success",
      data: createUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const data = await USER.find(filter);
    res.status(200).json({
      status: "success",
      message: "Data Get Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const user = await USER.findByIdAndDelete(deleteId);
    res.status(201).json({
      status: "success",
      message: "Data Delete Success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.editData = async (req, res) => {
  try {
    const editId = req.params.id;
    const user = await USER.findByIdAndUpdate(editId, req.body, { new: true });
    res.status(201).json({
      status: "success",
      message: "Data Update Success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
