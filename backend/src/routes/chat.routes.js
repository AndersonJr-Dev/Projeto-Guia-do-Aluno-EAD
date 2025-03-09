const express = require("express");
const chatController = require("../controllers/chat.controller");

const router = express.Router();

// Rota para enviar mensagem para a IA
router.post("/message", chatController.sendMessage);

// Rota para obter histórico de mensagens
router.get("/history", chatController.getHistory);

// Rota para organizar matérias
router.post("/organize-subjects", chatController.organizeSubjects);

// Rota para analisar desempenho
router.post("/analyze-performance", chatController.analyzePerformance);

module.exports = router;
