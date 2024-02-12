import { t } from "i18next";
import { z } from "zod";

const maxCharacters = 200;

const invalidCharacter = "/";

export const getFolderSchema = () =>
  z.object({
    name: z
      .string()
      .refine(
        (v) => !/^\s+$/g.test(v),
        t("shared.input.error.folder.name.whitespace-only")
      )
      .refine(
        (v) => !/^\s/g.test(v),
        t("shared.input.error.folder.name.whitespace-start")
      )
      .refine(
        (v) => !/\s$/g.test(v),
        t("shared.input.error.folder.name.whitespace-end")
      )
      .and(
        z
          .string()
          .trim()
          .min(1, t("shared.input.error.folder.name.required"))
          .max(
            maxCharacters,
            t("shared.input.error.folder.name.max-characters-exceeded", {
              data: { amount: maxCharacters },
            })
          )
          .refine(
            (v) => !v.includes(invalidCharacter),
            t("shared.input.error.folder.name.invalid-character", {
              data: { character: invalidCharacter },
            })
          )
      ),
  });

export type FolderSchema = ReturnType<typeof getFolderSchema>;
