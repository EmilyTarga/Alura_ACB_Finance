const express = require("express");
const router = express.Router();

const despesaController = require("../controllers/despesaController");

router.get("/", despesaController.despesa_lista);

router.post("/", despesaController.despesa_nova);

router.get("/:id", despesaController.despesa_detalhes);

router.delete("/:id", despesaController.despesa_deletada);

router.put("/:id", despesaController.despesa_atualizada);

module.exports = router;
