import { useState } from 'react'
import { mockRoutes } from '../../data/routeData'

function RoutesPage() {
  const [routes, setRoutes] = useState(mockRoutes)
  const [form, setForm] = useState({ source: '', destination: '', distance: '', duration: '', boarding: '', dropping: '' })
  const [error, setError] = useState('')

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function submitRoute(event) {
    event.preventDefault()
    if (!form.source || !form.destination || form.source.toLowerCase() === form.destination.toLowerCase()) {
      setError('Source and destination are required and cannot be same.')
      return
    }

    setRoutes((current) => [
      {
        id: `route-${Date.now()}`,
        source: form.source,
        destination: form.destination,
        distance: form.distance,
        duration: form.duration,
        boardingPoints: form.boarding.split(',').map((item) => item.trim()).filter(Boolean),
        droppingPoints: form.dropping.split(',').map((item) => item.trim()).filter(Boolean),
      },
      ...current,
    ])
    setForm({ source: '', destination: '', distance: '', duration: '', boarding: '', dropping: '' })
    setError('')
  }

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Routes</p>
          <h1>My Routes</h1>
        </div>
      </div>

      <form className="operator-manage-form" onSubmit={submitRoute}>
        <h2>Create Route</h2>
        <input name="source" placeholder="Source" value={form.source} onChange={updateField} />
        <input name="destination" placeholder="Destination" value={form.destination} onChange={updateField} />
        <input name="distance" placeholder="Distance" value={form.distance} onChange={updateField} />
        <input name="duration" placeholder="Estimated Duration" value={form.duration} onChange={updateField} />
        <input name="boarding" placeholder="Boarding Points, comma separated" value={form.boarding} onChange={updateField} />
        <input name="dropping" placeholder="Dropping Points, comma separated" value={form.dropping} onChange={updateField} />
        {error && <div className="operator-form-error">{error}</div>}
        <button className="operator-primary-button" type="submit">Save Route</button>
      </form>

      <div className="operator-card-grid">
        {routes.map((route) => (
          <article className="operator-item-card" key={route.id}>
            <h2>{route.source} to {route.destination}</h2>
            <p>{route.distance} | {route.duration}</p>
            <small>Boarding: {route.boardingPoints.join(', ')}</small>
            <small>Dropping: {route.droppingPoints.join(', ')}</small>
            <button className="operator-secondary-button" type="button">Edit</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RoutesPage
