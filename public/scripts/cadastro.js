import {
  checkPassword,
  togglePasswordVisibility,
  checkUsernameInput,
  checkEmailInput,
} from "./Util/AuthForm.js";

const visibilidadeSenhaBtn = document.querySelector(".visibilidade-senha-btn");
const password = document.querySelector("#input-senha");
const form = document.querySelector("form");
const email = document.querySelector("#input-email");
const smallEmail = document.querySelector(".smalEmails");
const smallPassword = document.querySelector(".smallPasswordd");
const smallUsername = document.querySelector(".smallUsernamee");
const username = document.querySelector("#input-nome");
const check = document.querySelector(".termos input[type=checkbox]");

visibilidadeSenhaBtn.addEventListener("click", togglePasswordVisibility);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkUsernameInput(username);
  checkEmailInput(email);
  checkPassword(password);
  teste();
});

function teste() {
  if (
    smallEmail.classList.contains("success") &&
    smallPassword.classList.contains("success") &&
    smallUsername.classList.contains("success") &&
    check.checked
  ) {
    alert("Você foi cadastrado");
    window.location.href = "login";
  }
}
