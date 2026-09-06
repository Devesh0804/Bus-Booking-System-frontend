import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BaseApiCaller from '../../utils/BaseApiCaller'

const api = BaseApiCaller()

const emptyForm = {
  source: '',
  destination: '',
  distance: '',
  estimatedDuration: '',
  boardingPoints: '',
  dropingPoints: '',
}

function RouteEditPage() {
  const { routeId } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadRoute() {
      try {
        const url = api.getURL(api.MODULE.ROUTE_OPERATION, api.OPERATIONS.GETONE, routeId)
        const response = await fetch(url)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load route')
        }

        const route = data.route
        setForm({
          source: route.source || '',
          destination: route.destination || '',
          distance: route.distance || '',
          estimatedDuration: route.estimatedDuration || '',
          boardingPoints: (route.boardingPoints || []).join(', '),
          dropingPoints: (route.dropingPoints || []).join(', '),
        })
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    loadRoute()
  }, [routeId])

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submitRoute(event) {
    event.preventDefault()
    if (!form.source || !form.destination || form.source.toLowerCase() === form.destination.toLowerCase()) {
      setError('Source and destination are required and cannot be same.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const url = api.getURL(api.MODULE.ROUTE_OPERATION, api.OPERATIONS.UPDATE, routeId)
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          boardingPoints: form.boardingPoints.split(',').map((item) => item.trim()).filter(Boolean),
          dropingPoints: form.dropingPoints.split(',').map((item) => item.trim()).filter(Boolean),
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update route')
      }

      navigate('/operator/routes')
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <section className="operator-page-stack"><p>Loading route...</p></section>
  }

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Routes</p>
          <h1>Edit Route</h1>
        </div>
        <Link className="operator-secondary-button" to="/operator/routes">Back to routes</Link>
      </div>

      <form className="operator-manage-form" onSubmit={submitRoute}>
        <h2>Update Route</h2>
        <input name="source" placeholder="Source" value={form.source} onChange={updateField} />
        <input name="destination" placeholder="Destination" value={form.destination} onChange={updateField} />
        <input name="distance" placeholder="Distance" value={form.distance} onChange={updateField} />
        <input name="estimatedDuration" placeholder="Estimated Duration" value={form.estimatedDuration} onChange={updateField} />
        <input name="boardingPoints" placeholder="Boarding points, comma separated" value={form.boardingPoints} onChange={updateField} />
        <input name="dropingPoints" placeholder="Dropping points, comma separated" value={form.dropingPoints} onChange={updateField} />
        {error && <div className="operator-form-error">{error}</div>}
        <div className="operator-form-actions">
          <button className="operator-primary-button cursor-pointer" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Update Route'}
          </button>
          <Link className="operator-secondary-button" to="/operator/routes">Cancel</Link>
        </div>
      </form>
    </section>
  )
}

export default RouteEditPage
