import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createOperatorAccount } from '../../services/operatorMockService'
import '../../features/operator-dashboard/styles/operator-dashboard.css'

const initialForm = {
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
}

function validateRegister(values) {
  const errors = {}

  if (!values.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!/^[6-9]\d{9}$/.test(values.mobile)) errors.mobile = 'Enter a valid 10 digit mobile number.'
  if (values.password.length < 8) errors.password = 'Password must be at least 8 characters.'
  if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords must match.'

  return errors
}

function OperatorRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateRegister(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    await createOperatorAccount(form)
    setLoading(false)
    navigate('/operator/onboarding')
  }

  return (
    <main className="operator-auth-page">
      <section className="operator-auth-card">
        <p className="operator-eyebrow">Are you a Bus Operator?</p>
        <h1>Register Your Travels</h1>
        <p>Start accepting online bookings and grow your bus business.</p>

        <form className="operator-auth-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input name="fullName" value={form.fullName} onChange={updateField} />
            {errors.fullName && <span>{errors.fullName}</span>}
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} />
            {errors.email && <span>{errors.email}</span>}
          </label>
          <label>
            Mobile Number
            <input name="mobile" value={form.mobile} onChange={updateField} />
            {errors.mobile && <span>{errors.mobile}</span>}
          </label>
          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={updateField} />
            {errors.password && <span>{errors.password}</span>}
          </label>
          <label>
            Confirm Password
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </label>

          <button className="operator-primary-button" type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Operator Account'}
          </button>
        </form>

        <p className="operator-auth-switch">
          Already registered? <Link to="/operator/login">Login</Link>
        </p>
      </section>
    </main>
  )
}

export default OperatorRegister
