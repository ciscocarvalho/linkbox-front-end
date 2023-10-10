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
const checkBox = document.querySelectorAll("#sla");
const check = document.querySelector("#sla");

visibilidadeSenhaBtn.addEventListener("click", togglePasswordVisibility);

let selecionado = 0;

check.addEventListener("click", (e) => {
  selecionado = 0;
  checkBox.forEach((ele) => {
    if (ele.checked) {
      selecionado++;
    }
  });
});

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
    selecionado === 1
  ) {
    alert("Você foi cadastrado");
    window.location.href = "login";
  }
}
