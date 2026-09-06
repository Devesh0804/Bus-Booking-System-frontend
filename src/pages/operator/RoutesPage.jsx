import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BaseApiCaller from '../../utils/BaseApiCaller'

const api = BaseApiCaller();
const url = api.getURL(api.MODULE.ROUTE_OPERATION,api.OPERATIONS.ADD)



function RoutesPage() {
  const [routes, setRoutes] = useState([])
  const [form, setForm] = useState({ source: '', destination: '', distance: '', estimatedDuration: '', boardingPoints: '', dropingPoints: '' })
  const [error, setError] = useState('')



  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

 
 

  async function fetchRoutes(){
     const url = api.getURL(api.MODULE.ROUTE_OPERATION,api.OPERATIONS.GETDATA);
     const response = await fetch(url,{
      method:"GET"
     }) 
     
     if (!response.ok) {
    throw new Error("Failed to fetch routes");
  }
     const data = await response.json();
     
     return data.route || []
     
  }
 useEffect(()=>{
     loadRoutes();
     },[])
 
async function loadRoutes(){
   try {
     const data = await fetchRoutes()
     setRoutes(data)
   } catch (loadError) {
     setError(loadError.message)
   }
   
   
}

async function handleDelete(route) {
  if (!window.confirm(`Delete the route from ${route.source} to ${route.destination}?`)) {
    return
  }

  try {
    const deleteUrl = api.getURL(api.MODULE.ROUTE_OPERATION, 'delete', route._id)
    const response = await fetch(deleteUrl, { method: 'DELETE' })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Unable to delete route')
    }

    setRoutes((currentRoutes) => currentRoutes.filter((currentRoute) => currentRoute._id !== route._id))
    setError('')
  } catch (deleteError) {
    setError(deleteError.message)
  }
}


 
  async function submitRoute(event) {
    event.preventDefault()
    if (!form.source || !form.destination || form.source.toLowerCase() === form.destination.toLowerCase()) {
      setError('Source and destination are required and cannot be same.')
      return
    }
  
   
    const NextRoute = {
      ...form,
      source:form.source,
      destination:form.destination,
      distance:form.distance,
      estimatedDuration:form.estimatedDuration,
      boardingPoints:form.boardingPoints.split(",").map((item)=>item.trim()).filter(Boolean),
      dropingPoints: form.dropingPoints.split(',').map((item) => item.trim()).filter(Boolean)
    }
  
    

     const response = await fetch(url,{
      method:'POST',
       headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(NextRoute)
    })
      
    const data = await response.json();
    if(!response.ok){
      setError(data.message || 'unable to add route')
      return
    }else{
      alert(data.message)
    }
    
    ResetForm();
    await loadRoutes();

    function ResetForm(){
      setForm({ source: '', destination: '', distance: '', estimatedDuration: '', boardingPoints: '', dropingPoints: '' })
    }
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
        <input name="estimatedDuration" placeholder="Estimated Duration" value={form.estimatedDuration} onChange={updateField} />
        <input name="boardingPoints" placeholder="boarding Points, comma separated" value={form.boardingPoints} onChange={updateField} />
        <input name="dropingPoints" placeholder="droping Points, comma separated" value={form.dropingPoints} onChange={updateField} />
        {error && <div className="operator-form-error">{error}</div>}
        <button className="operator-primary-button" type="submit">Save Route</button>
      </form>
       

       <div className="operator-card-grid ">
        {routes.map((route,index) => (
          
          <article className="operator-item-card" key={route._id || index}>
            
            <h2>{route.source} to {route.destination}</h2>
            <p>{route.distance} | {route.estimatedDuration}</p>
            <small>Boarding points: {(route.boardingPoints || []).join(', ') || 'Not specified'}</small>
            <small>Dropping points: {(route.dropingPoints || []).join(', ') || 'Not specified'}</small>
          <div className='operator-card-actions'>  <Link
              className="operator-primary-button cursor-pointer"
              to={`/operator/routes/${route._id}/edit`}
            >
              Edit
            </Link>
            <button
              className="operator-secondary-button cursor-pointer"
              type="button"
              onClick={() => handleDelete(route)}
            >
              Delete
            </button></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RoutesPage
