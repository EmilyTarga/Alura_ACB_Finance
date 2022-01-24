const express = require("express");
const router = express.Router();

const receitaController = require("../controllers/receitaController");

router.get("/", receitaController.receita_lista);

router.post("/", receitaController.receita_nova);

router.get("/:id", receitaController.receita_detalhes);

router.delete("/:id", receitaController.receita_deletada);

router.put("/:id", receitaController.receita_atualizada);

router.get("/:ano/:mes", receitaController.receita_anoMes);

module.exports = router;
