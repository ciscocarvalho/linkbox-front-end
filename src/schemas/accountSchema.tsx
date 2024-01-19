import { z } from "zod";

export const rawAccountSchema = {
  email: z
    .string()
    .min(1, "O email é obrigatório.")
    .email("Insira um email válido."),
  username: z.string().min(1, "O nome de usuário é obrigatório."),
  password: z
    .string()
    .min(1, "A senha é obrigatória.")
    .min(7, "A senha precisa ter mais de 6 caracteres."),
};

const accountSchema = z.object(rawAccountSchema);

export default accountSchema;
