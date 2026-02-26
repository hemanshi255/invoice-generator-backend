const express = require("express");
const router = express.Router();

const IC = require("../controller/invoice");

router.post("/createData", IC.createData);
router.get("/", IC.get);
router.get("/:id", IC.getById);
router.delete("/:id", IC.deleteById);

module.exports = router;
