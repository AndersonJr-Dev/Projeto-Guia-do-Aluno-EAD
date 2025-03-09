const { OpenAI } = require("openai");

// Inicializar o cliente da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  // Função para enviar mensagem para a API da OpenAI
  async sendMessage(message, context = []) {
    try {
      // Preparar as mensagens para enviar à API
      const messages = [
        {
          role: "system",
          content:
            "Você é um assistente educacional útil e amigável. Seu objetivo é ajudar estudantes a entender melhor suas matérias, organizar seus estudos e responder dúvidas sobre conteúdos acadêmicos.",
        },
        ...context,
        {
          role: "user",
          content: message,
        },
      ];

      // Fazer a chamada à API
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      // Retornar a resposta da API
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Erro ao chamar a API da OpenAI:", error);
      throw new Error("Erro ao processar sua mensagem");
    }
  },

  // Função para organizar matérias e sugerir ordem de estudos
  async organizeSubjects(subjects) {
    try {
      const subjectsText = subjects
        .map((s) => `${s.name}: ${s.description || "Sem descrição"}`)
        .join("\n");

      const prompt = `
        Analise as seguintes matérias de um estudante e sugira uma ordem de estudos eficiente, 
        considerando a complexidade e interdependência entre elas:
        
        ${subjectsText}
        
        Por favor, organize-as em uma ordem lógica de estudos e explique brevemente o motivo da ordem sugerida.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Você é um assistente educacional especializado em metodologias de estudo e organização acadêmica.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 800,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("Erro ao organizar matérias:", error);
      throw new Error("Erro ao organizar suas matérias");
    }
  },

  // Função para analisar o desempenho do aluno com base nas notas
  async analyzePerformance(grades, subjects) {
    try {
      // Preparar os dados para enviar à API
      const subjectsWithGrades = subjects
        .map((subject) => {
          const subjectGrades = grades.filter(
            (grade) => grade.subjectId === subject.id
          );
          const gradeTexts = subjectGrades
            .map((g) => `${g.name}: ${g.value} (peso ${g.weight})`)
            .join(", ");

          return `${subject.name}: ${gradeTexts}`;
        })
        .join("\n");

      const prompt = `
        Analise o desempenho do estudante nas seguintes matérias com base nas notas:
        
        ${subjectsWithGrades}
        
        Por favor, forneça:
        1. Uma análise do desempenho geral
        2. Identificação de áreas fortes e fracas
        3. Sugestões para melhorar nas áreas com desempenho mais baixo
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Você é um assistente educacional especializado em análise de desempenho acadêmico.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 800,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("Erro ao analisar desempenho:", error);
      throw new Error("Erro ao analisar seu desempenho");
    }
  },
};
