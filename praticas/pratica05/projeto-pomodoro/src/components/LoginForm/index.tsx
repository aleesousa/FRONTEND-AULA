import { type FormEvent, useEffect, useRef, useState } from 'react'

import styles from './styles.module.css'
import { useAuth } from '../../contexts/AuthContext/index.tsx';

export function LoginForm() {
  const { dispatch } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [viewMode, setViewMode] = useState<
    'login' | 'register' | 'recover'
  >('login')

  const inputRef = useRef<HTMLInputElement>(null)

  // foco automático
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // limpa mensagem após 3 segundos
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      setMessage('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [message])

  function handleLogin(event: FormEvent) {
    event.preventDefault()

    const mockUser = 'admin'
    const mockPassword = '123456'

    if (
      username === mockUser &&
      password === mockPassword
    ) {
      dispatch({
        type: 'LOGIN',
      })

      setMessage('Login realizado com sucesso!')
      return
    }

    setMessage('Usuário ou senha inválidos')
  }

  function handleRegister() {
    setViewMode('register')
    setMessage('Tela de cadastro em desenvolvimento')
  }

  function handleRecoverPassword() {
    setViewMode('recover')
    setMessage('Recuperação de senha em desenvolvimento')
  }

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleLogin}
      >
        <div className={styles.inputGroup}>
          <label htmlFor="username">
            Usuário
          </label>

          <input
            ref={inputRef}
            id="username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Usuario exemplo: admin"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">
            Senha
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Digite sua senha exemplo: 123456"
          />
        </div>

        <button type="submit">
          Entrar
        </button>
      </form>

      {message && (
        <p className={styles.message}>
          {message}
        </p>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleRegister}
        >
          Não tem conta? Cadastre-se
        </button>

        <button
          type="button"
          onClick={handleRecoverPassword}
        >
          Esqueci minha senha
        </button>
      </div>

      {viewMode === 'register' && (
        <p>Fluxo de cadastro (simulação)</p>
      )}

      {viewMode === 'recover' && (
        <p>Fluxo de recuperação (simulação)</p>
      )}
    </>
  )
}