import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockOnboardingDraft } from '../../data/operatorData'
import { submitOperatorOnboarding } from '../../services/operatorMockService'
import '../../features/operator-dashboard/styles/operator-dashboard.css'

const serviceOptions = ['AC Sleeper', 'AC Seater', 'Non-AC', 'Volvo']

function validateStep(step, form) {
  const errors = {}

  if (step === 1) {
    if (!form.businessName.trim()) errors.businessName = 'Business name is required.'
    if (!form.businessPhone.trim()) errors.businessPhone = 'Business phone is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.businessEmail)) errors.businessEmail = 'Enter a valid email.'
    if (!form.officeAddress.trim()) errors.officeAddress = 'Office address is required.'
    if (!form.city.trim()) errors.city = 'City is required.'
    if (!form.state.trim()) errors.state = 'State is required.'
  }

  if (step === 2) {
    if (!form.fleetSize) errors.fleetSize = 'Select your fleet size.'
    if (form.services.length === 0) errors.services = 'Select at least one service.'
    if (!form.operatingCity.trim()) errors.operatingCity = 'Operating city is required.'
  }

  if (step === 3 && !form.documentName) {
    errors.documentName = 'Choose a document for frontend verification preview.'
  }

  return errors
}

function OperatorOnboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(mockOnboardingDraft)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function toggleService(service) {
    setForm((current) => {
      const hasService = current.services.includes(service)
      return {
        ...current,
        services: hasService
          ? current.services.filter((item) => item !== service)
          : [...current.services, service],
      }
    })
  }

  function continueStep() {
    const nextErrors = validateStep(step, form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setStep((current) => current + 1)
  }

  async function submitWizard(event) {
    event.preventDefault()
    const nextErrors = validateStep(step, form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    await submitOperatorOnboarding(form)
    setLoading(false)
    navigate('/operator/pending')
  }

  return (
    <main className="operator-auth-page">
      <section className="operator-auth-card wide">
        <p className="operator-eyebrow">Business Onboarding</p>
        <h1>Complete your operator profile</h1>

        <div className="operator-stepper" aria-label="Onboarding progress">
          {[1, 2, 3].map((item) => (
            <span className={step >= item ? 'active' : ''} key={item}>
              {item} {item === 1 ? 'Business' : item === 2 ? 'Details' : 'Verification'}
            </span>
          ))}
        </div>

        <form className="operator-auth-form grid" onSubmit={submitWizard}>
          {step === 1 && (
            <>
              <h2>Tell us about your Travels</h2>
              <label>Travels / Business Name<input name="businessName" value={form.businessName} onChange={updateField} />{errors.businessName && <span>{errors.businessName}</span>}</label>
              <label>Business Type<input name="businessType" value={form.businessType} onChange={updateField} /></label>
              <label>Business Phone<input name="businessPhone" value={form.businessPhone} onChange={updateField} />{errors.businessPhone && <span>{errors.businessPhone}</span>}</label>
              <label>Business Email<input name="businessEmail" type="email" value={form.businessEmail} onChange={updateField} />{errors.businessEmail && <span>{errors.businessEmail}</span>}</label>
              <label className="full">Office Address<input name="officeAddress" value={form.officeAddress} onChange={updateField} />{errors.officeAddress && <span>{errors.officeAddress}</span>}</label>
              <label>City<input name="city" value={form.city} onChange={updateField} />{errors.city && <span>{errors.city}</span>}</label>
              <label>State<input name="state" value={form.state} onChange={updateField} />{errors.state && <span>{errors.state}</span>}</label>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Business Details</h2>
              <label>
                How many buses do you operate?
                <select name="fleetSize" value={form.fleetSize} onChange={updateField}>
                  <option>1 - 5</option>
                  <option>6 - 15</option>
                  <option>16 - 30</option>
                  <option>30+</option>
                </select>
                {errors.fleetSize && <span>{errors.fleetSize}</span>}
              </label>
              <fieldset className="operator-service-options">
                <legend>Bus Services</legend>
                {serviceOptions.map((service) => (
                  <label key={service}>
                    <input
                      checked={form.services.includes(service)}
                      onChange={() => toggleService(service)}
                      type="checkbox"
                    />
                    {service}
                  </label>
                ))}
                {errors.services && <span>{errors.services}</span>}
              </fieldset>
              <label>Operating City<input name="operatingCity" value={form.operatingCity} onChange={updateField} />{errors.operatingCity && <span>{errors.operatingCity}</span>}</label>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Document / Verification UI</h2>
              <div className="operator-upload-box">
                <strong>Business Document</strong>
                <p>Upload Document</p>
                <input
                  type="file"
                  onChange={(event) => {
                    const fileName = event.target.files?.[0]?.name || ''
                    setForm((current) => ({ ...current, documentName: fileName }))
                  }}
                />
                {form.documentName && <small>Selected: {form.documentName}</small>}
                {errors.documentName && <span>{errors.documentName}</span>}
              </div>
            </>
          )}

          <div className="operator-form-actions">
            {step > 1 && (
              <button className="operator-secondary-button" type="button" onClick={() => setStep((current) => current - 1)}>
                Back
              </button>
            )}
            {step < 3 ? (
              <button className="operator-primary-button" type="button" onClick={continueStep}>
                Continue
              </button>
            ) : (
              <button className="operator-primary-button" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  )
}

export default OperatorOnboarding
