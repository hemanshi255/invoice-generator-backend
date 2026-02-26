// controller/invoice.js

const Invoice = require("../model/invoice");
const Inventory = require("../model/inventory");

exports.createData = async (req, res) => {
  try {
    const {
      userId,
      invoiceNumber,
      customer,
      date,
      items,
      subTotal,
      gstAmount,
      grandTotal,
      paymentMethod,
    } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer and items are required",
      });
    }

    for (const item of items) {
      const inventory = await Inventory.findOne({
        product: item.product,
        batch: item.batch,
      });

      if (!inventory) {
        return res.status(404).json({
          success: false,
          message: "Inventory not found",
        });
      }

      if (inventory.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      inventory.quantity -= item.quantity;
      await inventory.save();
    }

    const invoice = await Invoice.create({
      userId,
      invoiceNumber,
      customer,
      date,
      items,
      subTotal,
      gstAmount,
      grandTotal,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const invoices = await Invoice.find(filter)
      .populate("customer")
      .populate("items.product");
    res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id)
      .populate("customer")
      .populate("items.product");
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }
    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }
    for (const item of invoice.items) {
      const inventory = await Inventory.findOne({
        product: item.product,
        batch: item.batch,
      });
      if (inventory) {
        inventory.quantity += item.quantity;
        await inventory.save();
      }
    }
    await Invoice.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
