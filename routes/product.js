const express = require("express");
const router = express.Router();

var CC = require("../controller/product");

router.post("/createData", CC.createData);
router.get("/", CC.get);
router.delete("/deleteData/:id", CC.deleteData);
router.patch("/editData/:id", CC.editData);

module.exports = router;
