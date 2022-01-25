const express = require("express");
const router = express.Router();

const resumoController = require("../controllers/resumoController");

router.get("/:ano/:mes", resumoController.resumo_geral);

module.exports = router;
