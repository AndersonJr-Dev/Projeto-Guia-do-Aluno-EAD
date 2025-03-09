const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Função para gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  // Registro de usuário
  async register(req, res) {
    const { name, email, password } = req.body;

    // Verificar se todos os campos foram fornecidos
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    try {
      // Verificar se o usuário já existe
      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: "Usuário já cadastrado" });
      }

      // Criptografar a senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Criar o usuário
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Retornar os dados do usuário e o token
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  },

  // Login de usuário
  async login(req, res) {
    const { email, password } = req.body;

    // Verificar se todos os campos foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    try {
      // Verificar se o usuário existe
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Verificar se a senha está correta
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Retornar os dados do usuário e o token
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao fazer login" });
    }
  },
};
