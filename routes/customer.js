const express = require("express");
const router = express.Router();

var CC = require("../controller/customer");
const customer = require("../model/customer");

router.post("/createData", CC.createData);
router.get("/", CC.get);
router.delete("/deleteData/:id", CC.deleteData);
router.patch("/editData/:id", CC.editData);

module.exports = router;
