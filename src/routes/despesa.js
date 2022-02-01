const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const despesaController = require("../controllers/despesaController");

router.get(
  "/",
  authController.usuario_autenticado,
  despesaController.despesa_lista
);

router.post(
  "/",
  authController.usuario_autenticado,
  despesaController.despesa_nova
);

router.get(
  "/:id",
  authController.usuario_autenticado,
  despesaController.despesa_detalhes
);

router.delete(
  "/:id",
  authController.usuario_autenticado,
  despesaController.despesa_deletada
);

router.put(
  "/:id",
  authController.usuario_autenticado,
  despesaController.despesa_atualizada
);

router.get(
  "/:ano/:mes",
  authController.usuario_autenticado,
  despesaController.despesa_anoMes
);

module.exports = router;
