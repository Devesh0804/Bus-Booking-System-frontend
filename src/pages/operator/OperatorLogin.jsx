import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginOperator } from '../../services/operatorMockService'
import '../../features/operator-dashboard/styles/operator-dashboard.css'

function OperatorLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Email and password are required.')
      return
    }

    setLoading(true)
    const result = await loginOperator(form)
    setLoading(false)

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate('/operator/dashboard')
  }

  return (
    <main className="operator-auth-page">
      <section className="operator-auth-card compact">
        <p className="operator-eyebrow">Operator Login</p>
        <h1>Welcome Back</h1>
        <p>Mock login: operator@example.com / operator123</p>

        <form className="operator-auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} />
          </label>
          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={updateField} />
          </label>
          {error && <div className="operator-form-error">{error}</div>}
          <button className="operator-primary-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="operator-auth-switch">
          Do not have an operator account? <Link to="/operator/register">Register Your Travels</Link>
        </p>
      </section>
    </main>
  )
}

export default OperatorLogin
