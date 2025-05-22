import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import { login } from "@/services/authService";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("password");
    const icon = document.getElementById("passwordIcon");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.src = "/images/not-view-password.svg";
    } else {
      passwordInput.type = "password";
      icon.src = "/images/not-view-password-bloqued.svg";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // limpa mensagem de erro anterior

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = await login(email, password);

    if (result.success) {
      localStorage.setItem("token", result.data.token);
      window.location.href = "/home";
    } else {
      setErrorMessage(result.error || "Erro desconhecido. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img
          src="/images/bg2.png"
          alt="Imagem de login"
          className={styles.image}
        />
      </div>
      <div className={styles.formSection}>
        <h1 className={styles.title}>Bem-Vindo!</h1>
        <p className={styles.description}>
          Faça login com os dados inseridos durante seu cadastro.
        </p>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              required
              className={styles.input}
              placeholder=" "
            />
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <span className={styles.icon}>
              <img src="/images/icon_email.svg" alt="Ícone de Email" />
            </span>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              required
              className={styles.input}
              placeholder=" "
            />
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <span
              className={styles.icon}
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              <img
                id="passwordIcon"
                src="/images/not-view-password-bloqued.svg"
                alt="Ícone de senha"
              />
            </span>
          </div>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          <button onClick={handleLogin} className={styles.loginButton}>
            Log in
          </button>
        </form>
        <a href="/forgot-password" className={styles.forgotPassword}>
          Esqueci minha senha
        </a>
      </div>
    </div>
  );
}
