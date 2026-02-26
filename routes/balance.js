const express = require("express");
const router = express.Router();
const BC = require("../controller/balance");

router.post("/add", BC.addMoney);
router.post("/purchase", BC.purchase);
router.post("/withdraw", BC.withdraw);
router.post("/sale", BC.sale);
router.get("/getBalance/:type", BC.getBalance);
router.get("/", BC.getAll);
router.post("/saveBankDetail", BC.saveBankDetail);
router.get("/getBankDetail", BC.getBankDetail);
router.delete("/deleteBankDetail/:id", BC.deleteBankDetail);

module.exports = router;
