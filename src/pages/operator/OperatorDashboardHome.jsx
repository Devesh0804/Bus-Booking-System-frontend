import { getMockOperator } from '../../services/operatorMockService'

function OperatorDashboardHome() {
  const operator = getMockOperator()

  return (
    <section className="operator-page-card">
      <p className="operator-eyebrow">Phase 1 Dashboard Preview</p>
      <h1>Welcome back, {operator.businessName}</h1>
      <p>
        Your operator account flow is ready. Bus, seat, route, trip, booking,
        review, profile, and settings management will be added in the next phases.
      </p>

      <div className="operator-status-grid">
        <article>
          <span>Registration</span>
          <strong>Submitted</strong>
        </article>
        <article>
          <span>Verification</span>
          <strong>Approved Mock</strong>
        </article>
        <article>
          <span>Data Source</span>
          <strong>Frontend State</strong>
        </article>
      </div>
    </section>
  )
}

export default OperatorDashboardHome
