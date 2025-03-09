const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Rota para registro de usuário
router.post("/register", authController.register);

// Rota para login
router.post("/login", authController.login);

module.exports = router;
