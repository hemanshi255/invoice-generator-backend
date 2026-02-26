// controller/company.js

const Company = require("../model/company");

exports.saveCompany = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: "failed",
        message: "userId required",
      });
    }

    const existing = await Company.findOne({ userId });

    let company;
    if (existing) {
      company = await Company.findByIdAndUpdate(existing._id, req.body, {
        new: true,
      });
    } else {
      company = await Company.create(req.body);
    }

    res.status(200).json({
      status: "success",
      message: "Company profile saved",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        status: "failed",
        message: "userId required",
      });
    }

    const company = await Company.findOne({ userId });

    res.status(200).json({
      status: "success",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
