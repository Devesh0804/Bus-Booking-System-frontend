import { useState } from "react";
import { Link } from "react-router-dom";
import { mockTrips } from "../../data/tripData";
import BaseApiCaller from "../../utils/BaseApiCaller";
import { useEffect } from "react";

const api = BaseApiCaller();
 

 
const emptyStop = {
  stopName: "",
  arrivalTime: "",
  departureTime: "",
  canBoard: true,
  canDrop: true,
};

function Trips() {
  async function fetchBus_Routes_Trips() {
    const BusURL = api.getURL(api.MODULE.BUS_OPERATION, api.OPERATIONS.GETDATA);
    const RouteURL = api.getURL(api.MODULE.ROUTE_OPERATION, api.OPERATIONS.GETDATA);
    const TripURL = api.getURL(api.MODULE.TRIP_OPERATION,api.OPERATIONS.GETDATA)

    const BusResponse = await fetch(BusURL, {
      method: "GET",
    });

    const RouteResponse = await fetch(RouteURL, {
      method: "GET",
    });

    const TripResponse = await fetch(TripURL, {
      method: "GET",
    });

    if (!BusResponse.ok) {
      throw new Error("Failed to fetch buses");
    }
    if (!RouteResponse.ok) {
      throw new Error("Failed to fetch routes");
    }
     if (!TripResponse.ok) {
      throw new Error("Failed to fetch trips");
    }



    const buses = await BusResponse.json();
    const routes = await RouteResponse.json();
    const trips = await TripResponse.json();
    
    

    return {
      buses,
      routes,
      trips
    };
  }

  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({
    busId: "",
    routeId: "",
    date: "",
    departure: "",
    arrival: "",
    price: "",
    stops: [],
  });
  const [stopDraft, setStopDraft] = useState({ ...emptyStop });
  const [editingStopIndex, setEditingStopIndex] = useState(null);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const [busList, setBusList] = useState([]);
  const [routeList, setRoutList] = useState([]);
  const [Price,setPrice] = useState(0)
  const [seat,setSeat] = useState([])
  async function load_Bus_Routes() {
    const data = await fetchBus_Routes_Trips();

    setBusList(data.buses.buses || []);
    setRoutList(data.routes.route || []);
    setTrips(data.trips.trips || [])
    setSeat(data.trips.seat || [])

    if(data.trips.seatPrice){
     const result = data.trips.seatPrice.every(value => value === data.trips.seatPrice[0])
     if(result){
        setPrice(data.trips.seatPrice[0])
     }
    }
  }

  useEffect(() => {
    load_Bus_Routes();
  }, []);

  const visibleTrips =
    filter === "All" ? trips : trips.filter((trip) => trip.status === filter);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function updateStop(field, value) {
    setStopDraft((current) => ({ ...current, [field]: value }));
  }

function saveStop() {
    if (!stopDraft.stopName.trim()) {
      setError("Stop name is required before adding a stop.");
      return;
    }

    setForm((current) => ({
      ...current,
      stops:
        editingStopIndex === null
          ? [...current.stops, { ...stopDraft }]
          : current.stops.map((stop, index) =>
              index === editingStopIndex ? { ...stopDraft } : stop,
            ),
    }));

    setStopDraft({ ...emptyStop });
    setEditingStopIndex(null);
    setError("");
  }

  function editStop(index) {
    setStopDraft({ ...form.stops[index] });
    setEditingStopIndex(index);
    setError("");
  }

  function removeStop(index) {
    setForm((current) => ({
      ...current,
      stops: current.stops.filter((_, stopIndex) => stopIndex !== index),
    }));
    if (editingStopIndex === index) {
      setStopDraft({ ...emptyStop });
      setEditingStopIndex(null);
    }
  }

  async function submitTrip(event) {
    event.preventDefault();
    if (
      !form.busId ||
      !form.routeId ||
      !form.date ||
      !form.departure ||
      Number(form.price) <= 0
    ) {
      setError("Bus, route, date, departure, and valid price are required.");

      return;
    }
     console.log(form);
     const postURL = api.getURL(api.MODULE.TRIP_OPERATION, api.OPERATIONS.ADD)



     const response = await fetch(postURL,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(form)
     })
     

     const data = await response.json()
     if (!response.ok) {
      setError(data.message || "Unable to save Trip");
      return;
    }else{
      alert(data.message)
    }


    setForm({
      busId: "",
      routeId: "",
      date: "",
      departure: "",
      arrival: "",
      price: "",
      stops: [],
    });
    setStopDraft({ ...emptyStop });
    setEditingStopIndex(null);
    setError("");
  }

  function cancelTrip(tripId) {
    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId ? { ...trip, status: "Cancelled" } : trip,
      ),
    );
  }

  return (
    <section className="operator-page-stack">
      <style>{`
        .trips-stops-panel {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: minmax(260px, 0.75fr) minmax(0, 1.45fr);
          gap: 24px;
          border: 1px solid var(--operator-line);
          border-radius: 14px;
          background: linear-gradient(135deg, #f8fcfb 0%, #ffffff 52%);
          padding: 22px;
        }

        .trips-create-form {
          width: 100%;
          max-width: none;
          min-width: 0;
          box-sizing: border-box;
        }

        .trips-trip-details {
          width: 100%;
          box-sizing: border-box;
        }

        .trips-stop-editor,
        .trips-stop-list {
          min-width: 0;
          border: 1px solid var(--operator-line);
          border-radius: 10px;
          background: #ffffff;
          padding: 18px;
        }

        .trips-stop-editor {
          align-self: start;
          box-shadow: 0 8px 20px rgba(31, 67, 66, 0.06);
        }

        .trips-stop-list {
          overflow: hidden;
        }

        .trips-stop-panel-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .trips-stop-panel-heading h3 {
          margin: 0;
          color: var(--operator-text);
          font-size: 1.08rem;
        }

        .trips-stop-panel-heading p {
          margin: 4px 0 0;
          color: var(--operator-muted);
          font-size: 0.84rem;
          line-height: 1.5;
        }

        .trips-stop-fields {
          display: grid;
          gap: 14px;
        }

        .trips-stop-fields label {
          display: grid;
          gap: 7px;
          color: #2c3a42;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .trips-stop-times {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .trips-stop-options {
          display: grid;
          gap: 10px;
          border-top: 1px solid var(--operator-line);
          margin-top: 2px;
          padding-top: 14px;
        }

        .trips-stop-options .operator-checkbox {
          min-height: 24px;
          margin: 0;
        }

        .trips-stop-editor .operator-form-actions {
          margin-top: 18px;
        }

        .trips-stop-list .operator-table-wrap {
          margin: 0;
          border: 1px solid var(--operator-line);
          border-radius: 8px;
        }

        .trips-stop-list table {
          width: 100%;
          min-width: 620px;
          border-collapse: collapse;
        }

        .trips-stop-list th {
          background: var(--operator-soft);
          color: var(--operator-muted);
          font-size: 0.73rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .trips-stop-list th,
        .trips-stop-list td {
          padding: 12px 14px;
          text-align: left;
          white-space: nowrap;
        }

        .trips-stop-list td {
          border-top: 1px solid var(--operator-line);
          color: var(--operator-text);
          font-size: 0.88rem;
        }

        .trips-stop-list td:first-child {
          font-weight: 800;
        }

        .trips-stop-list .operator-card-actions {
          gap: 8px;
        }

        .trips-stop-list .operator-secondary-button {
          min-height: 34px;
          padding: 7px 10px;
          font-size: 0.78rem;
        }

        .trips-empty-stops {
          padding: 28px 16px !important;
          color: var(--operator-muted) !important;
          text-align: center !important;
        }

        @media (max-width: 900px) {
          .trips-stops-panel {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .trips-stops-panel {
            gap: 14px;
            padding: 14px;
          }

          .trips-stop-editor,
          .trips-stop-list {
            padding: 14px;
          }

          .trips-stop-times {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Trips</p>
          <h1>Trip Management</h1>
        </div>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option>All</option>
          <option>Booking Open</option>
          <option>Cancelled</option>
        </select>
      </div>

      <form className="operator-manage-form trips-create-form" onSubmit={submitTrip}>
        <div className="operator-form-heading">
          <div>
            <p className="operator-eyebrow">Schedule a service</p>
            <h2>Create Trip</h2>
          </div>
          <span className="operator-status-pill">New trip</span>
        </div>

        <div className="operator-form-layout trips-trip-details trips-stops-panel">
          <label htmlFor="trip-bus">
            Select Bus
            <select
              id="trip-bus"
              name="busId"
              value={form.busId}
              onChange={updateField}
            >
              <option>Select Bus</option>
              {busList.map((bus) => (
                <option key={bus._id} value={bus._id}>
                  {bus.BusNumber}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="trip-route">
            Select Route
            <select
              id="trip-route"
              name="routeId"
              value={form.routeId}
              onChange={updateField}
            >
              <option>Select Route</option>
              {routeList.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.source} to {route.destination}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="trip-date">
            Date
            <input
              id="trip-date"
              name="date"
              type="date"
              value={form.date}
              onChange={updateField}
            />
          </label>
          <label htmlFor="trip-departure">
            Departure Time
            <input
              id="trip-departure"
              name="departure"
              type="time"
              value={form.departure}
              onChange={updateField}
            />
          </label>
          <label htmlFor="trip-arrival">
            Arrival Time
            <input
              id="trip-arrival"
              name="arrival"
              type="time"
              value={form.arrival}
              onChange={updateField}
            />
          </label>
          <label htmlFor="trip-price">
            Ticket Price
            <input
              id="trip-price"
              name="price"
              type="number"
              placeholder="Ticket Price"
              value={form.price}
              onChange={updateField}
            />
          </label>
        </div>

        {error && <div className="operator-form-error">{error}</div>}

        <div className="operator-form-section-heading">
          <div>
            <p className="operator-eyebrow">Journey checkpoints</p>
            <h2>Route Stops</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span>
              {form.stops.length} stop{form.stops.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <div className="trips-stops-panel">
          <div className="trips-stop-editor">
            <div className="trips-stop-panel-heading">
              <div>
                <h3>{editingStopIndex === null ? "Add a stop" : "Edit stop"}</h3>
                <p>Set the stop timing and passenger access.</p>
              </div>
            </div>
            <div className="trips-stop-fields">
              <label htmlFor="stop-name">
                Stop Name
                <input
                  id="stop-name"
                  type="text"
                  placeholder="Enter stop"
                  value={stopDraft.stopName}
                  onChange={(e) => updateStop("stopName", e.target.value)}
                />
              </label>
              <div className="trips-stop-times">
                <label htmlFor="stop-arrival">
                  Arrival Time
                  <input
                    id="stop-arrival"
                    type="time"
                    value={stopDraft.arrivalTime}
                    onChange={(e) => updateStop("arrivalTime", e.target.value)}
                  />
                </label>
                <label htmlFor="stop-departure">
                  Departure Time
                  <input
                    id="stop-departure"
                    type="time"
                    value={stopDraft.departureTime}
                    onChange={(e) =>
                      updateStop("departureTime", e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="trips-stop-options">
                <label className="operator-checkbox">
                  <input
                    type="checkbox"
                    checked={stopDraft.canBoard}
                    onChange={(e) => updateStop("canBoard", e.target.checked)}
                  />
                  Boarding Point
                </label>
                <label className="operator-checkbox">
                  <input
                    type="checkbox"
                    checked={stopDraft.canDrop}
                    onChange={(e) => updateStop("canDrop", e.target.checked)}
                  />
                  Dropping Point
                </label>
              </div>
            </div>
            <div className="operator-form-actions">
              <button className="operator-primary-button" type="button" onClick={saveStop}>
                {editingStopIndex === null ? "Add Stop" : "Save Stop"}
              </button>
              {editingStopIndex !== null && (
                <button
                  className="operator-secondary-button"
                  type="button"
                  onClick={() => {
                    setStopDraft({ ...emptyStop });
                    setEditingStopIndex(null);
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="trips-stop-list">
            <div className="trips-stop-panel-heading">
              <div>
                <h3>Added stops</h3>
                <p>Review and adjust the stops in this trip.</p>
              </div>
              <span className="operator-status-pill">{form.stops.length}</span>
            </div>
            <div className="operator-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Stop</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Boarding</th>
                <th>Dropping</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {form.stops.length === 0 ? (
                <tr>
                  <td className="trips-empty-stops" colSpan="6">
                    No stops added yet.
                  </td>
                </tr>
              ) : (
                form.stops.map((stop, index) => (
                  <tr key={index}>
                    <td>{stop.stopName}</td>
                    <td>{stop.arrivalTime || "-"}</td>
                    <td>{stop.departureTime || "-"}</td>
                    <td>{stop.canBoard ? "Yes" : "No"}</td>
                    <td>{stop.canDrop ? "Yes" : "No"}</td>
                    <td>
                      <div className="operator-card-actions">
                        <button
                          className="operator-secondary-button"
                          type="button"
                          onClick={() => editStop(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="operator-secondary-button danger"
                          type="button"
                          onClick={() => removeStop(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
            </div>
          </div>
        </div>

        <div className="operator-form-actions" style={{ marginTop: "8px" }}>
          <button className="operator-primary-button" type="submit">
            Create Trip
          </button>
        </div>
      </form>

      <div className="operator-card-grid">
        {visibleTrips.map((trip,index) => (
          <article className="operator-item-card" key={index}>
            <h2>{trip.routeId.source} to {trip.routeId.destination}</h2>
            <p>Bus: {trip.busId.BusNumber}</p>
            <p>
              {new Date(trip.departureDate).toLocaleDateString("en-IN",{
                day:"numeric",
                month:"short",
                year:"numeric"
              })} | {trip.departureTime} to {trip.arrivalTime}
            </p>
            <strong>Rs {Price}</strong>
            <small>
              {trip.bookedSeats} / {trip.totalSeats} seats booked |{" "}
              {seat.status}
            </small>
            <div className="operator-card-actions">
              <Link
                className="operator-secondary-button"
                to={`/operator/trips/${trip._id}`}
              >
                View
              </Link>
              <button className="operator-secondary-button" type="button">
                Edit
              </button>
              <button
                className="operator-secondary-button danger"
                type="button"
                onClick={() => cancelTrip(trip.id)}
              >
                Cancel
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Trips;
