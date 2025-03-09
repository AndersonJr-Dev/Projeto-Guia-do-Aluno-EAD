const { PrismaClient } = require("@prisma/client");
const openaiService = require("../services/openai.service");

const prisma = new PrismaClient();

module.exports = {
  // Enviar mensagem para a IA
  async sendMessage(req, res) {
    const { message } = req.body;
    const userId = req.userId;

    if (!message) {
      return res.status(400).json({ error: "Mensagem é obrigatória" });
    }

    try {
      // Buscar histórico de mensagens recentes para contexto
      const messageHistory = await prisma.chatMessage.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 10,
      });

      // Formatar histórico para o formato da OpenAI
      const context = messageHistory.reverse().map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content,
      }));

      // Enviar mensagem para a OpenAI
      const aiResponse = await openaiService.sendMessage(message, context);

      // Salvar a mensagem do usuário
      await prisma.chatMessage.create({
        data: {
          userId,
          content: message,
          isUser: true,
        },
      });

      // Salvar a resposta da IA
      const savedResponse = await prisma.chatMessage.create({
        data: {
          userId,
          content: aiResponse,
          isUser: false,
        },
      });

      return res.json({
        id: savedResponse.id,
        content: aiResponse,
        createdAt: savedResponse.createdAt,
      });
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      return res.status(500).json({ error: "Erro ao processar mensagem" });
    }
  },

  // Obter histórico de mensagens
  async getHistory(req, res) {
    const userId = req.userId;

    try {
      const messages = await prisma.chatMessage.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" },
      });

      return res.json(messages);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      return res
        .status(500)
        .json({ error: "Erro ao buscar histórico de mensagens" });
    }
  },

  // Organizar matérias
  async organizeSubjects(req, res) {
    const userId = req.userId;

    try {
      // Buscar matérias do usuário
      const subjects = await prisma.subject.findMany({
        where: { userId },
      });

      if (subjects.length === 0) {
        return res.status(400).json({ error: "Nenhuma matéria cadastrada" });
      }

      // Enviar para a OpenAI organizar
      const organization = await openaiService.organizeSubjects(subjects);

      return res.json({ organization });
    } catch (error) {
      console.error("Erro ao organizar matérias:", error);
      return res.status(500).json({ error: "Erro ao organizar matérias" });
    }
  },

  // Analisar desempenho
  async analyzePerformance(req, res) {
    const userId = req.userId;

    try {
      // Buscar matérias do usuário
      const subjects = await prisma.subject.findMany({
        where: { userId },
      });

      if (subjects.length === 0) {
        return res.status(400).json({ error: "Nenhuma matéria cadastrada" });
      }

      // Buscar notas do usuário
      const grades = await prisma.grade.findMany({
        where: { userId },
      });

      if (grades.length === 0) {
        return res.status(400).json({ error: "Nenhuma nota cadastrada" });
      }

      // Enviar para a OpenAI analisar
      const analysis = await openaiService.analyzePerformance(grades, subjects);

      return res.json({ analysis });
    } catch (error) {
      console.error("Erro ao analisar desempenho:", error);
      return res.status(500).json({ error: "Erro ao analisar desempenho" });
    }
  },
};
