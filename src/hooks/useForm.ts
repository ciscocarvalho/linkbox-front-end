import { useReducer, useRef } from "react";

export type Form = {
  [k: string]: {
    value: any,
    error?: any,
    validate?: (v: any) => string,
  }
};

type FormAction<T extends Form, Field = FormField<T>> = {
  type: "set_value",
  field: Field,
  value: any,
} | {
  type: "set_error",
  field: Field,
  error: any,
} | {
  type: "validate",
  force?: boolean,
};

type FormField<T extends Form> = Extract<keyof T, string>;

type FieldValue<T extends Form, Field extends FormField<T>> = T[Field]["value"];

type IsUnknown<T> = T extends unknown ? unknown extends T ? true : false : false;

type FieldError<T extends Form, Field extends FormField<T>> =
  IsUnknown<T[Field]["error"]> extends true
    ? string
    : T[Field]["error"];

type Setters<T extends Form> = {
  [Field in FormField<T>]: (v: FieldValue<T, Field>) => void;
}

type ErrorSetters<T extends Form> = {
  [Field in FormField<T>]: (v: FieldError<T, Field>) => void;
}

type Getters<T extends Form> = {
  [Field in FormField<T>]: () => FieldValue<T, Field>;
}

type ErrorGetters<T extends Form> = {
  [Field in FormField<T>]: () => FieldError<T, Field>;
}

type Context<T extends Form> = {
  form: T;
  setValue: <Field extends FormField<T>>(field: Field, value: FieldValue<T, Field>) => void;
  validate: (force?: boolean) => void;
  hasErrors: () => boolean;
  onSubmit: React.DOMAttributes<HTMLFormElement>["onSubmit"];
  getValue: <Field extends FormField<T>>(field: Field) => FieldValue<T, Field>;
  setError: <Field extends FormField<T>>(field: Field, error: FieldError<T, Field>) => void;
  getError: <Field extends FormField<T>>(field: Field) => FieldError<T, Field>;
  setters: Setters<T>;
  getters: Getters<T>;
  errorSetters: ErrorSetters<T>;
  errorGetters: ErrorGetters<T>;
  formChanged: boolean;
}

export type FormSubmit<T extends Form = Form> = (event: React.FormEvent<HTMLFormElement>, context: Context<T>) => void;

export const useForm = <T extends Form>(handleSubmit: FormSubmit<T>, initialForm: T) => {
  for (let k in initialForm) {
    initialForm[k] = {
      error: "",
      validate: () => "",
      ...initialForm[k],
    };
  }

  const previousValues = useRef({ ...initialForm });
  const formChanged = useRef(false);

  const updateValue =
    <T extends Form, Field extends FormField<T>>
    (form: T, field: Field, newValue: FieldValue<T, Field>) => {
      const currentValue = form[field].value;

      if (currentValue === newValue) {
        return;
      }

      previousValues.current[field] = currentValue;
      form[field].value = newValue;
      formChanged.current = true;
    };

  const valueChanged =
    <T extends Form, Field extends FormField<T>>
    (form: T, field: Field) => {
      const current = form[field].value;
      const previous = previousValues.current[field].value;
      const result = current !== previous;
      return result;
    }

  const validateOne =
    <T extends Form, Field extends FormField<T>>
    (form: T, field: Field, force?: boolean) => {
      const v = form[field];
      if (v.validate && (force || valueChanged(form, field))) {
        v.error = v.validate(v.value);
      }
    }

  const validateAll = (form: T, force?: boolean) => {
    for (let field in form) {
      validateOne(form, field, force);
    }
  }

  const currentForm = useRef(initialForm);

  const formReducer = (form: typeof initialForm, action: FormAction<typeof initialForm>) => {
    form = { ...form };

    switch (action.type) {
      case "set_value": {
        const { field, value: newValue } = action;
        updateValue(form, field, newValue);
        validateAll(form);
        break;
      }
      case "set_error": {
        const { field, error } = action;
        form[field].error = error;
        break;
      }
      case "validate": {
        validateAll(form, action.force);
        break;
      }
    }

    currentForm.current = form;

    return form;
  }

  const [form, dispatchForm] = useReducer(formReducer, initialForm);

  const setValue: Context<T>["setValue"] = (field, value) => {
    dispatchForm({ type: "set_value", field, value });
  }

  const validate: Context<T>["validate"] = (force?: boolean) => dispatchForm({ type: "validate", force });

  const hasErrors: Context<T>["hasErrors"] = () => {
    return Object.values(currentForm.current).some((v) => v.error !== "");
  }

  const getValue: Context<T>["getValue"] = (field) => form[field].value;

  const setError: Context<T>["setError"] = (field, error) => {
    dispatchForm({ type: "set_error", field, error });
  }

  const getError: Context<T>["getError"] = (field) => {
    return form[field].error
  };

  let setters: Context<T>["setters"] = {} as any;

  for (let field in form) {
    setters[field] = (value) => setValue(field, value);
  }

  let getters: Context<T>["getters"] = {} as any;

  for (let field in form) {
    getters[field] = () => getValue(field);
  }

  let errorSetters: Context<T>["errorSetters"] = {} as any;

  for (let field in form) {
    errorSetters[field] = (value) => setError(field, value);
  }

  let errorGetters: Context<T>["errorGetters"] = {} as any;

  for (let field in form) {
    errorGetters[field] = () => getError(field);
  }

  let context: Context<T>;

  let onSubmit: Context<T>["onSubmit"] = (e) => {
    e.preventDefault();

    if (!hasErrors()) {
      handleSubmit(e, context);
    }

    formChanged.current = false;
  }

  context = {
    form,
    hasErrors,
    setValue,
    validate,
    onSubmit,
    getValue,
    setError,
    getError,
    setters,
    getters,
    errorSetters,
    errorGetters,
    formChanged: formChanged.current,
  }

  return context;
}
