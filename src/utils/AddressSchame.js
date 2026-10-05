import { z } from "zod";

const addressSchema = z.object({
    zip: z
        .string()
        .min(8, "O CEP deve ter 8 caracteres")
        .max(8, "O CEP deve ter 8 caracteres")
        .regex(/^\d{8}$/, "O CEP deve conter apenas números"),

    street: z
        .string()
        .min(3, "A rua deve ter pelo menos 3 caracteres")
        .max(150, "A rua deve ter no máximo 150 caracteres"),

    number: z
        .string()
        .min(1, "O número é obrigatório")
        .max(20, "O número deve ter no máximo 20 caracteres"),

    complement: z
        .string()
        .max(100, "O complemento deve ter no máximo 100 caracteres")
        .optional()
        .or(z.literal("")),

    city: z
        .string()
        .min(2, "A cidade deve ter pelo menos 2 caracteres")
        .max(100, "A cidade deve ter no máximo 100 caracteres"),

    state: z
        .string()
        .length(2, "O estado deve possuir 2 caracteres")
        .regex(/^[A-Za-z]{2}$/, "Estado inválido")
        .transform((value) => value.toUpperCase()),

    type: z.enum(["casa", "trabalho", "outro"]),

    isDefault: z.boolean(),
});

export default addressSchema;
