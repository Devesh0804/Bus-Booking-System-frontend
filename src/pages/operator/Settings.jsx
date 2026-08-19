import { useState } from 'react'
import { Link } from 'react-router-dom'

function Settings() {
  const [settings, setSettings] = useState({
    bookingNotifications: true,
    tripNotifications: true,
    cancellationNotifications: true,
    theme: 'System',
  })

  function toggle(event) {
    const { name, checked } = event.target
    setSettings((current) => ({ ...current, [name]: checked }))
  }

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Settings</p>
          <h1>Operator Settings</h1>
        </div>
      </div>
      <article className="operator-page-card">
        <h2>Notifications</h2>
        <div className="operator-settings-list">
          <label><input name="bookingNotifications" type="checkbox" checked={settings.bookingNotifications} onChange={toggle} /> Booking Notifications</label>
          <label><input name="tripNotifications" type="checkbox" checked={settings.tripNotifications} onChange={toggle} /> Trip Notifications</label>
          <label><input name="cancellationNotifications" type="checkbox" checked={settings.cancellationNotifications} onChange={toggle} /> Cancellation Notifications</label>
        </div>
      </article>
      <article className="operator-page-card">
        <h2>Appearance</h2>
        <select value={settings.theme} onChange={(event) => setSettings((current) => ({ ...current, theme: event.target.value }))}>
          <option>System</option>
          <option>Light</option>
          <option>Dark</option>
        </select>
      </article>
      <article className="operator-page-card">
        <h2>Account</h2>
        <div className="operator-form-actions">
          <button className="operator-secondary-button" type="button">Change Password</button>
          <Link className="operator-primary-button" to="/operator/login">Logout</Link>
        </div>
      </article>
    </section>
  )
}

export default Settings
