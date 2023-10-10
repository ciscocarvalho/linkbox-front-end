import {
  checkPassword,
  togglePasswordVisibility,
  checkEmailInput,
} from "./Util/AuthForm.js";

const visibilidadeSenhaBtn = document.querySelector(".visibilidade-senha-btn");
const password = document.querySelector("#input-senha");
const form = document.querySelector("form");
const email = document.querySelector("#inputEmail");
const smallEmail = document.querySelector(".emails");
const smallPassword = document.querySelector(".passwordd");

visibilidadeSenhaBtn.addEventListener("click", togglePasswordVisibility);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkEmailInput(email);
  checkPassword(password);
  teste();
});

function teste() {
  if (
    smallEmail.classList.contains("success") &&
    smallPassword.classList.contains("success")
  ) {
    window.location.href = "dashboard";
  }
}