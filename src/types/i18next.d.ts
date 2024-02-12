import I18nOptions from "../i18n/options";
import resources from "../i18n/resources";

type I18nOptions = typeof I18nOptions;

declare module "i18next" {
  interface CustomTypeOptions extends I18nOptions {
    resources: typeof resources;
  }
}

// FIX: Declaration file non-exported types are importable
// https://github.com/microsoft/TypeScript/issues/38592
export {};
