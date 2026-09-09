import { z } from 'zod';

const loginSchame = z.object({
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

    termsUseAndPrivacy: z
        .boolean()
        .refine((val) => val === true, 'Você deve aceitar os termos de uso'),
});

export default loginSchame;
