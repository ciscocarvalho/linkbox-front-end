const checkEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
};

const setSuccessForPassaword = (input) => {
  const formsControl = input.parentElement;
  const small = formsControl.querySelector("small");

  small.classList.add("success");
  small.classList.remove("error");
};

const setErrorFor = (input, message) => {
  const formsControl = input.parentElement;
  const small = formsControl.querySelector("small");

  small.innerText = message;
  small.classList.add("error");
};

const setSuccessForEmail = (input) => {
  const formsControl = input.parentElement;
  const small = formsControl.querySelector("small");

  small.classList.add("success");
  small.classList.remove("error");
};

const setSuccessForUsername = (input) => {
  const formsControl = input.parentElement;
  const small = formsControl.querySelector("small");
  small.classList.add("success");
  small.classList.remove("error");
};

export const checkPassword = (passwordInput) => {
  const passwordValue = passwordInput.value;

  if (passwordValue === "") {
    setErrorFor(passwordInput, "A senha é obrigatória.");
  } else if (passwordValue.length < 7) {
    setErrorFor(passwordInput, "A senha precisa ter mais de 7 caracteries.");
  }

  setSuccessForPassaword(passwordInput);
};

export const togglePasswordVisibility = (e) => {
  e.preventDefault();
  const inputSenha = document.querySelector("#input-senha");
  const span = visibilidadeSenhaBtn.getElementsByTagName("span")[0];
  const visible = span.innerText === "visibility";

  if (visible) {
    inputSenha.type = "password";
    span.innerText = "visibility_off";
  } else {
    inputSenha.type = "text";
    span.innerText = "visibility";
  }

  inputSenha.focus();
};

export const checkUsernameInput = (usernameInput) => {
  const usernameValue = usernameInput.value;

  if (usernameValue === "") {
    setErrorFor(usernameInput, "Nome de usuario é obrigatório");
  } else {
    setSuccessForUsername(usernameInput);
  }
};

export const checkEmailInput = (emailInput) => {
  const emailValue = emailInput.value;

  if (emailValue === "") {
    setErrorFor(emailInput, "O email é obrigatório");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(emailInput, "Por favor insira um email válido.");
  } else {
    setSuccessForEmail(emailInput);
  }
};
