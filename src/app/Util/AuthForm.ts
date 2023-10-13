const checkEmail = (email: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
};

const setSuccessForInput = (input: HTMLInputElement) => {
  const formsControl = input.parentElement;
  const small = formsControl?.querySelector("small");

  small?.classList.add("success");
  small?.classList.remove("error");
}

const setErrorForInput = (input: HTMLInputElement, message: string) => {
  const formsControl = input.parentElement;
  const small = formsControl?.querySelector("small");

  if (small) {
    small.innerText = message;
    small.classList.add("error");
  }
};

export const checkPasswordInput = (passwordInput: HTMLInputElement) => {
  const passwordValue = passwordInput.value;

  if (passwordValue === "") {
    setErrorForInput(passwordInput, "A senha é obrigatória.");
  } else if (passwordValue.length < 7) {
    setErrorForInput(passwordInput, "A senha precisa ter mais de 7 caracteries.");
  } else {
    setSuccessForInput(passwordInput);
  }
};

export const checkUsernameInput = (usernameInput: HTMLInputElement) => {
  const usernameValue = usernameInput.value;

  if (usernameValue === "") {
    setErrorForInput(usernameInput, "Nome de usuario é obrigatório");
  } else {
    setSuccessForInput(usernameInput);
  }
};

export const checkEmailInput = (emailInput: HTMLInputElement) => {
  const emailValue = emailInput.value;

  if (emailValue === "") {
    setErrorForInput(emailInput, "O email é obrigatório");
  } else if (!checkEmail(emailValue)) {
    setErrorForInput(emailInput, "Por favor insira um email válido.");
  } else {
    setSuccessForInput(emailInput);
  }
};
