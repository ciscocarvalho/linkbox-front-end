import { t } from "i18next";
import { z } from "zod";

const titleMaxCharacters = 300;
const urlMaxCharacters = 2000;

export const getLinkSchema = () =>
  z.object({
    title: z
      .string()
      .refine(
        (v) => !/^\s+$/g.test(v),
        t("shared.input.error.link.title.whitespace-only")
      )
      .refine(
        (v) => !/^\s/g.test(v),
        t("shared.input.error.link.title.whitespace-start")
      )
      .refine(
        (v) => !/\s$/g.test(v),
        t("shared.input.error.link.title.whitespace-end")
      )
      .and(
        z
          .string()
          .trim()
          .min(1, t("shared.input.error.link.title.required"))
          // About page title length limit: https://www.mediawiki.org/wiki/Page_title_size_limitations
          .max(
            titleMaxCharacters,
            t("shared.input.error.link.title.max-characters-exceeded", {
              data: { amount: titleMaxCharacters },
            })
          )
      ),
    url: z
      .string()
      .refine(
        (v) => !/^\s+$/g.test(v),
        t("shared.input.error.link.url.whitespace-only")
      )
      .refine(
        (v) => !/^\s/g.test(v),
        t("shared.input.error.link.url.whitespace-start")
      )
      .refine(
        (v) => !/\s$/g.test(v),
        t("shared.input.error.link.url.whitespace-end")
      )
      .and(
        z
          .string()
          .trim()
          .min(1, t("shared.input.error.link.url.required"))
          // About url length limit: https://stackoverflow.com/a/417184
          .max(
            urlMaxCharacters,
            t("shared.input.error.link.url.max-characters-exceeded", {
              data: { amount: urlMaxCharacters },
            })
          )
      ),
  });

export type LinkSchema = ReturnType<typeof getLinkSchema>;
