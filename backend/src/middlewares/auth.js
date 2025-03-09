const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    // Verificar se o token está presente no header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    // Extrair o token do header (formato: Bearer TOKEN)
    const [scheme, token] = authHeader.split(" ");
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: "Formato de token inválido" });
    }

    // Verificar se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido" });
      }

      // Verificar se o usuário existe
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      // Adicionar o ID do usuário ao objeto de requisição
      req.userId = decoded.id;
      return next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro na autenticação" });
  }
};
