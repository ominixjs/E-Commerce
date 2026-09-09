import { z } from 'zod';

const registerSchame = z
    .object({
        name: z
            .string()
            .min(3, 'O nome deve ter pelo menos 3 caracteres')
            .max(50, 'O nome deve ter no máximo 50 caracteres')
            .transform((val) => val.trim())
            // Permite apenas letras (incluindo acentos) e espaços. Bloqueia números e ícones/emojis.
            .refine(
                (val) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(val),
                'O nome não deve conter números ou caracteres especiais/ícones',
            ),

        email: z
            .string()
            .email('Insira um endereço de e-mail válido')
            .toLowerCase()
            .transform((val) => val.trim()),

        password: z
            .string()
            .min(8, 'A senha deve ter pelo menos 8 caracteres')
            .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
            .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
            .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
            .regex(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial'),

        confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória'),

        birthday: z
            .string()
            .min(1, 'A data de nascimento é obrigatória')
            .pipe(
                z.coerce.date({
                    errorMap: () => ({ message: 'Insira uma data válida' }),
                }),
            )
            .refine((data) => data <= new Date(), {
                message: 'A data de nascimento não pode ser no futuro',
            }),

        termsUseAndPrivacy: z
            .boolean()
            .refine((val) => val === true, 'Você deve aceitar os termos de uso'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'], // Define qual campo receberá o erro
    });

export default registerSchame;
