import { z } from "zod";

const linkSchema = z.object({
  title: z
    .string()
    .refine((v) => !/^\s+$/g.test(v), "Título não pode ser composto apenas de espaços em branco")
    .refine((v) => !/^\s/g.test(v), "Título não pode começar com espaço em branco")
    .refine((v) => !/\s$/g.test(v), "Título não pode terminar com espaço em branco")
    .and(
      z
        .string()
        .trim()
        .min(1, "Título é obrigatório")
        // About page title length limit: https://www.mediawiki.org/wiki/Page_title_size_limitations
        .max(300, "Título não pode ter mais que 300 caracteres")
    )
  ,
  url: z
    .string()
    .refine((v) => !/^\s+$/g.test(v), "URL não pode ser composta apenas de espaços em branco")
    .refine((v) => !/^\s/g.test(v), "URL não pode começar com espaço em branco")
    .refine((v) => !/\s$/g.test(v), "URL não pode terminar com espaço em branco")
    .and(
      z
        .string()
        .trim()
        .min(1, "URL é obrigatória")
        // About url length limit: https://stackoverflow.com/a/417184
        .max(2000, "URL não pode ter mais que 2000 caracteres")
    ),
});

export default linkSchema;
