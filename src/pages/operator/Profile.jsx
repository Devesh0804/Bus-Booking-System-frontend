import { useState } from 'react'
import { getMockOperator } from '../../services/operatorMockService'

function Profile() {
  const operator = getMockOperator()
  const [profile, setProfile] = useState({
    businessName: operator.businessName,
    name: operator.name,
    phone: operator.phone,
    email: operator.email,
    city: operator.city,
    state: operator.state,
    status: operator.status,
  })
  const [saved, setSaved] = useState(false)

  function updateField(event) {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }))
    setSaved(false)
  }

  function submitProfile(event) {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Profile</p>
          <h1>Business Profile</h1>
        </div>
      </div>
      <form className="operator-manage-form" onSubmit={submitProfile}>
        <label>Travels Name<input name="businessName" value={profile.businessName} onChange={updateField} /></label>
        <label>Owner Name<input name="name" value={profile.name} onChange={updateField} /></label>
        <label>Phone<input name="phone" value={profile.phone} onChange={updateField} /></label>
        <label>Email<input name="email" type="email" value={profile.email} onChange={updateField} /></label>
        <label>City<input name="city" value={profile.city} onChange={updateField} /></label>
        <label>State<input name="state" value={profile.state} onChange={updateField} /></label>
        <label>Status<input name="status" value={profile.status} onChange={updateField} /></label>
        {saved && <div className="operator-success-message">Profile updated in frontend state.</div>}
        <button className="operator-primary-button" type="submit">Save Profile</button>
      </form>
    </section>
  )
}

export default Profile
