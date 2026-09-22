import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1,

    // 1. Função customizada para quando o limite é excedido
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            status: "erro",
            mensagem: "Muitas tentativas. Tente novamente mais tarde.",
        });
    },

    // 3. Função para ignorar o limite sob certas condições
    skip: (req) => {
        // Exemplo: Não aplicar limite se a requisição vier do localhost (ambiente de teste)
        return req.ip === "127.0.0.1" || req.ip === "::1";
    },

    standardHeaders: true, // Adiciona os headers Ratelimit-Limit e Ratelimit-Remaining
    legacyHeaders: false,
});

export default limiter;
