// controller/balance.js

const Balance = require("../model/balance");
const BankDetail = require("../model/bankDetail");

exports.addMoney = async (req, res) => {
  try {
    const { type, amount, userId, bankId } = req.body;

    if (!type || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Type, amount and userId required",
      });
    }

    if (type === "bank" && bankId) {
      const bank = await BankDetail.findById(bankId);
      if (!bank) {
        return res
          .status(404)
          .json({ success: false, message: "Bank not found" });
      }
      bank.balance += Number(amount);
      await bank.save();
    }

    const transaction = await Balance.create({
      userId,
      type,
      action: "add",
      amount,
      bankId: type === "bank" ? bankId : undefined,
    });

    res.status(201).json({
      success: true,
      message: "Money added successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.purchase = async (req, res) => {
  try {
    const { type, amount, userId, bankId } = req.body;

    if (!type || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Type, amount and userId required",
      });
    }

    if (type === "bank" && bankId) {
      const bank = await BankDetail.findById(bankId);
      if (!bank) {
        return res
          .status(404)
          .json({ success: false, message: "Bank not found" });
      }
      if (bank.balance < Number(amount)) {
        return res
          .status(400)
          .json({ success: false, message: "Insufficient bank balance" });
      }
      bank.balance -= Number(amount);
      await bank.save();
    }

    const transaction = await Balance.create({
      userId,
      type,
      action: "purchase",
      amount,
      bankId: type === "bank" ? bankId : undefined,
    });

    res.status(201).json({
      success: true,
      message: "Purchase recorded successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount, userId, bankId } = req.body;

    if (!amount || !userId || !bankId) {
      return res.status(400).json({
        success: false,
        message: "Amount, userId and bankId required",
      });
    }

    const bank = await BankDetail.findById(bankId);
    if (!bank) {
      return res
        .status(404)
        .json({ success: false, message: "Bank not found" });
    }
    if (bank.balance < Number(amount)) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient bank balance" });
    }
    bank.balance -= Number(amount);
    await bank.save();

    await Balance.create({
      userId,
      type: "bank",
      action: "withdraw",
      amount,
      bankId,
    });

    await Balance.create({
      userId,
      type: "cash",
      action: "add",
      amount,
    });

    res.status(201).json({
      success: true,
      message: "Withdrawal recorded & cash updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sale = async (req, res) => {
  try {
    const { type, amount, userId, bankId } = req.body;

    if (!type || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Type, amount and userId required",
      });
    }

    if (type === "bank" && bankId) {
      const bank = await BankDetail.findById(bankId);
      if (!bank) {
        return res
          .status(404)
          .json({ success: false, message: "Bank not found" });
      }
      bank.balance += Number(amount);
      await bank.save();
    }

    const transaction = await Balance.create({
      userId,
      type,
      action: "sale",
      amount,
      bankId: type === "bank" ? bankId : undefined,
    });

    res.status(201).json({
      success: true,
      message: "Sale recorded successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const { type } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId required" });
    }

    if (type === "bank") {
      const banks = await BankDetail.find({ userId });
      const totalBalance = banks.reduce((sum, b) => sum + (b.balance || 0), 0);
      const transactions = await Balance.find({ userId, type: "bank" }).sort({
        createdAt: -1,
      });

      return res.status(200).json({
        success: true,
        balance: totalBalance,
        banks,
        transactions,
      });
    }

    const transactions = await Balance.find({ userId, type });
    const total = transactions.reduce((sum, t) => {
      if (t.action === "add" || t.action === "sale") {
        return sum + t.amount;
      } else {
        return sum - t.amount;
      }
    }, 0);

    res.status(200).json({
      success: true,
      balance: total,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId required" });
    }

    const transactions = await Balance.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveBankDetail = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId required" });
    }

    const detail = await BankDetail.create(req.body);

    res.status(200).json({
      success: true,
      message: "Bank detail saved",
      data: detail,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBankDetail = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId required" });
    }

    const details = await BankDetail.find({ userId });

    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBankDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await BankDetail.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Bank detail deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
