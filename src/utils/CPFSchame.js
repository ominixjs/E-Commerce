import { z } from "zod";

const cpfSchema = z
    .string()
    .trim()
    .refine(
        (cpf) => {
            const value = cpf.replace(/\D/g, "");

            if (value.length !== 11) return false;

            // Impede CPFs como 00000000000, 11111111111, etc.
            if (/^(\d)\1{10}$/.test(value)) return false;

            // Primeiro dígito verificador
            let sum = 0;

            for (let i = 0; i < 9; i++) {
                sum += Number(value[i]) * (10 - i);
            }

            let digit = (sum * 10) % 11;

            if (digit === 10) digit = 0;

            if (digit !== Number(value[9])) return false;

            // Segundo dígito verificador
            sum = 0;

            for (let i = 0; i < 10; i++) {
                sum += Number(value[i]) * (11 - i);
            }

            digit = (sum * 10) % 11;

            if (digit === 10) digit = 0;

            return digit === Number(value[10]);
        },
        {
            error: "CPF inválido",
        },
    );

export default cpfSchema;
