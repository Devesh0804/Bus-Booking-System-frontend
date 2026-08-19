import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../features/operator-dashboard/styles/operator-dashboard.css'

function OperatorPending() {
  const [status, setStatus] = useState('Pending')

  return (
    <main className="operator-auth-page">
      <section className="operator-auth-card compact">
        <p className="operator-eyebrow">Registration Submitted</p>
        <h1>Registration Submitted!</h1>
        <p>Your Travels registration has been submitted successfully.</p>

        <div className="operator-pending-box">
          <span>Current Status</span>
          <strong>{status} Verification</strong>
        </div>

        <label className="operator-status-switch">
          Mock status switch
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </label>

        <div className="operator-form-actions">
          <Link className="operator-secondary-button" to="/operator/login">Operator Login</Link>
          <Link className="operator-primary-button" to="/operator/dashboard">Continue</Link>
        </div>
      </section>
    </main>
  )
}

export default OperatorPending
