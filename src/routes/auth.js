const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");

router.get("/", authController.usuario_lista);

router.post("/signup", authController.usuario_signup);

router.post("/login", authController.usuario_login);

router.post("/logout", authController.usuario_logout);

module.exports = router;
