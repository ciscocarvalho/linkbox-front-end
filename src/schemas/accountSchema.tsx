import { t } from "i18next";
import { z } from "zod";

const minCharacters = 7;

export const getAccountSchema = () => {
  return z.object({
    email: z
      .string()
      .min(1, t("shared.input.error.email.required"))
      .email(t("shared.input.error.email.invalid")),
    username: z
      .string()
      .min(1, t("shared.input.error.username.required")),
    password: z
      .string()
      .min(1, t("shared.input.error.password.required"))
      .min(
        minCharacters,
        t("shared.input.error.password.min-characters-not-filled", {
          data: { amountMinusOne: minCharacters - 1 },
        })
      ),
  });
};

export type AccountSchema = ReturnType<typeof getAccountSchema>;
