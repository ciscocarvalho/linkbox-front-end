import { z } from "zod";

const folderSchema = z.object({
  name: z
    .string()
    .refine((v) => !/^\s+$/g.test(v), "Nome não pode ser composto apenas de espaços em branco")
    .refine((v) => !/^\s/g.test(v), "Nome não pode começar com espaço em branco")
    .refine((v) => !/\s$/g.test(v), "Nome não pode terminar com espaço em branco")
    .and(
      z
        .string()
        .trim()
        .min(1, "Nome é obrigatório")
        .max(200, "Nome não pode ter mais que 200 caracteres")
        .refine((v) => !v.includes("/"), 'Nome não pode conter "/"')
    ),
});

export default folderSchema;
