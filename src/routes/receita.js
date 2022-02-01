const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const receitaController = require("../controllers/receitaController");

router.get(
  "/",
  authController.usuario_autenticado,
  receitaController.receita_lista
);

router.post(
  "/",
  authController.usuario_autenticado,
  receitaController.receita_nova
);

router.get(
  "/:id",
  authController.usuario_autenticado,
  receitaController.receita_detalhes
);

router.delete(
  "/:id",
  authController.usuario_autenticado,
  receitaController.receita_deletada
);

router.put(
  "/:id",
  authController.usuario_autenticado,
  receitaController.receita_atualizada
);

router.get(
  "/:ano/:mes",
  authController.usuario_autenticado,
  receitaController.receita_anoMes
);

module.exports = router;
