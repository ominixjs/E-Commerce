import { z } from "zod";
const ProductSchame = z.object({
    name: z
        .string()
        .trim()
        .min(3, "O nome deve possuir pelo menos 3 caracteres")
        .max(150, "O nome deve possuir no máximo 150 caracteres"),
    description: z.string().trim().min(10, "A descrição deve possuir pelo menos 10 caracteres"),
    price: z
        .number()
        .positive("O preço deve ser maior que zero")
        .multipleOf(0.01, "O preço deve possuir no máximo 2 casas decimais"),
    stock: z
        .number()
        .int("O estoque deve ser um número inteiro")
        .nonnegative("O estoque não pode ser negativo"),
    coverUrl: z
        .url("A URL da imagem deve ser válida")
        .max(500, "A URL deve possuir no máximo 500 caracteres")
        .optional(),
    active: z.boolean().default(true),
});

export default ProductSchame;
