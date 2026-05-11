import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";

const MOCK_USER = "admin@admin.com";
const MOCK_PASS = "123456";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [viewMode, setViewMode] = useState("login"); // login | register | recover
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // foco automático no input ao carregar
    const input = document.getElementById("email");
    if (input) input.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      if (email === MOCK_USER && password === MOCK_PASS) {
        setMessage("Login realizado com sucesso (simulação)");
        // aqui você futuramente integra com contexto ou rota protegida
      } else {
        setMessage("Credenciais inválidas (simulação)");
      }
      setIsSubmitting(false);
    }, 800);
  };

  const renderContent = () => {
    if (viewMode === "register") {
      return (
        <>
          <h2>Cadastro</h2>
          <p>Fluxo de cadastro ainda será implementado</p>
          <button onClick={() => setViewMode("login")}>Voltar</button>
        </>
      );
    }

    if (viewMode === "recover") {
      return (
        <>
          <h2>Recuperar senha</h2>
          <p>Fluxo de recuperação ainda será implementado</p>
          <button onClick={() => setViewMode("login")}>Voltar</button>
        </>
      );
    }

    return (
      <>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Usuário</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu usuário"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.links}>
          <span onClick={() => setViewMode("register")}>
            Não tem conta? Cadastre-se
          </span>
          <span onClick={() => setViewMode("recover")}>
            Esqueci minha senha
          </span>
        </div>
      </>
    );
  };

  return <div className={styles.container}>{renderContent()}</div>;
}
