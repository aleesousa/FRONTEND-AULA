import { LoginForm } from '../../components/LoginForm'
import styles from './styles.module.css'

export function Login() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1>Chronos Pomodoro</h1>

        <LoginForm />
      </div>
    </main>
  )
}