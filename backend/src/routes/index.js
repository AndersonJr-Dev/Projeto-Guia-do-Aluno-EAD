const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const subjectRoutes = require("./subject.routes");
const reminderRoutes = require("./reminder.routes");
const gradeRoutes = require("./grade.routes");
const chatRoutes = require("./chat.routes");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Rotas públicas
router.use("/auth", authRoutes);

// Middleware de autenticação para rotas protegidas
router.use(authMiddleware);

// Rotas protegidas
router.use("/users", userRoutes);
router.use("/subjects", subjectRoutes);
router.use("/reminders", reminderRoutes);
router.use("/grades", gradeRoutes);
router.use("/chat", chatRoutes);

module.exports = router;
