module.exports = (err, req, res, next) => {
  console.error(err);

  // Verificar se é um erro do Prisma
  if (err.code && err.code.startsWith("P")) {
    return res.status(400).json({
      error: "Erro no banco de dados",
      message: err.message,
    });
  }

  // Verificar se é um erro de validação
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Erro de validação",
      message: err.message,
    });
  }

  // Erro padrão
  return res.status(500).json({
    error: "Erro interno do servidor",
    message:
      process.env.NODE_ENV === "production"
        ? "Ocorreu um erro inesperado"
        : err.message,
  });
};
