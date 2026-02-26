const express = require("express");
const router = express.Router();

var IC = require("../controller/inventory");

router.post("/createData", IC.createData);
router.get("/", IC.get);
router.delete("/deleteData/:id", IC.deleteData);
router.patch("/editData/:id", IC.editData);

module.exports = router;
