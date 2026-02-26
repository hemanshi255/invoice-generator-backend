const express = require("express");
const router = express.Router();

const CC = require("../controller/company");

router.get("/", CC.getCompany);
router.post("/save", CC.saveCompany);

module.exports = router;
