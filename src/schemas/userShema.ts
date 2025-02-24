import { z } from 'zod';

export const userSchema = z
    .object({
        name: z.string().min(1, 'O nome é obrigatório'),
        email: z.string().email('E-mail inválido'),
        password: z
            .string()
            .min(8, 'A senha deve ter pelo menos 8 caracteres')
            .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
            .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
            .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
            .regex(/[@$!%*?&]/, 'A senha deve conter pelo menos um símbolo (@$!%*?&)'),
        confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    });
