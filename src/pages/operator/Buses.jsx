import { useState } from "react";
import { Link } from "react-router-dom";
import BaseApiCaller from "../../utils/BaseApiCaller.js";
import { useEffect } from "react";




const api = BaseApiCaller();
const postUrl = api.getURL(api.MODULE.BUS_OPERATION, api.OPERATIONS.ADD);
const getUrl = api.getURL(api.MODULE.BUS_OPERATION, api.OPERATIONS.GETDATA);




async function fetchBuses() {
  const response = await fetch(getUrl, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch buses");
  }

  const data = await response.json();

  return data;
}

 

// console.log(fetchBuses());


function Buses() {



  const [buses, setBuses] = useState([]);
  const [form, setForm] = useState({
    BusName: "",
    BusNumber: "",
    BusType: "",
    seatLayout: "",
    TotalSeats: "",
    amenities: "",
  });

  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState("");
  const [viewingBus, setViewingBus] = useState(null);



    useEffect(() => {
    loadBuses();
  }, []);

  async function loadBuses() {
    try {
      const data = await fetchBuses();
      setBuses(data.buses || []);
    } catch (loadError) {
      setError(loadError.message);
    }
  }

function updateField(event) {
  setForm((current) => ({
    ...current,
    [event.target.name]: event.target.value,
  }));
}

  // amenities: event.target.value
  //     .split(",")
  //     .map((item) => item.trim())
  //     .filter(Boolean),
  function resetForm() {
    setForm({
      BusName: "",
      BusNumber: "",
      BusType: "",
      seatLayout: "",
      TotalSeats: "",
      amenities:""
    });
    setEditingId("");
    setViewingBus(null);
    setError("");
  }

  async function submitBus(event) {
    event.preventDefault();
    if (
      !form.BusNumber ||
      !form.BusName ||
      !form.BusType ||
      Number(form.TotalSeats) <= 0
    ) {
      setError("Bus number, name, type, and valid seats are required.");
      return;
    }

    // console.log('form',form);

    const nextBus = {
      ...form,
      TotalSeats: Number(form.TotalSeats),
      amenities: form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
          };
               console.log(typeof(editingId));
               
              const url = editingId
              
             ? api.getURL(api.MODULE.BUS_OPERATION, api.OPERATIONS.UPDATE, editingId)
             : postUrl;
             
            
             
              const response = await fetch(url,{
                method: editingId ? "PUT" : "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(nextBus)
    })

    const data = await response.json();
    if (!response.ok) {
      setError(data.message || "Unable to save bus.");
      return;
    }else{
      alert(data.message)
    }

    resetForm();
    await loadBuses();
  }

  function editBus(bus) {
    setViewingBus(null);
    setEditingId(bus._id);
    setForm({
      BusNumber: bus.BusNumber || "",
      BusName: bus.BusName || "",
      BusType: bus.BusType || "",
      seatLayout: bus.seatLayout || "",
      TotalSeats: bus.TotalSeats || "",
      amenities: (bus.amenities || []).join(", "),
    });
    setError("");
  }

  function viewBus(bus) {
    setViewingBus(bus);
    setError("");
  }

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Fleet</p>
          <h1>My Buses</h1>
        </div>
        <span>{buses.length} buses</span>
      </div>

      <form className="operator-manage-form" onSubmit={submitBus}>
        <h2>{editingId ? "Edit Bus" : "Add Bus"}</h2>
        <input
          name="BusNumber"
          placeholder="Bus Number"
          value={form.BusNumber}
          onChange={updateField}
        />
        <input
          name="BusName"
          placeholder="Bus Name"
          value={form.BusName}
          onChange={updateField}
        />
        <select name="BusType" value={form.BusType} onChange={updateField}>
          <option value="">Bus Type</option>
          <option>AC Sleeper</option>
          <option>AC Seater</option>
          <option>Non-AC</option>
          <option>Volvo</option>
        </select>
        <input
          name="TotalSeats"
          type="number"
          placeholder="Total Seats"
          value={form.TotalSeats}
          onChange={updateField}
        />

        <select
          name="seatLayout"
          value={form.seatLayout}
          onChange={updateField}
        >
          <option value="">Seat Layout</option>
          <option>2X2</option>
          <option>2+1</option>
        </select>

        <input
          name="amenities"
          placeholder="Amenities eg: Wifi, Charging, Toilet"
          value={form.amenities}
          onChange={updateField}
        />

        {error && <div className="operator-form-error">{error}</div>}
        <div className="operator-form-actions">
          <button className="operator-primary-button cursor-pointer" type="submit">
            {editingId ? "Update Bus" : "Add Bus"}
          </button>
          <button
            className="operator-secondary-button cursor-pointer"
            type="button"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </form>

      <div className="operator-card-grid">
        {buses.map((bus) => (
          <article className="operator-item-card" key={bus._id}>
            <div>
              <strong>{bus.BusNumber}</strong>
              <h2>{bus.BusName}</h2>
              <p>
                {bus.BusType} | {bus.TotalSeats} Seats 
              </p>
              <small>{(bus.amenities || []).join(", ") || "No amenities listed"}</small>
            </div>
            <div className="operator-card-actions">
                {/* <button
                  className="operator-secondary-button"
                  type="button"
                  onClick={() => viewBus(bus)}
                >
                View
              </button> */}
              <button
                className="operator-primary-button cursor-pointer"
                type="button"
                onClick={() => editBus(bus)}
              >
                Edit
              </button>
              <Link
                className="operator-primary-button cursor-pointer"
                to={`/operator/buses/${bus._id}/seats`} 
              >
                Manage Seats
              </Link>
            </div>
          </article>
        ))}
      </div>

      {viewingBus && (
        <aside className="operator-bus-detail" aria-label="Bus details">
          <div className="operator-bus-detail-header">
            <div>
              <p className="operator-eyebrow">Bus Details</p>
              <h2>{viewingBus.BusName}</h2>
            </div>
            <button className="operator-secondary-button" type="button" onClick={() => setViewingBus(null)}>
              Close
            </button>
          </div>
          <div className="operator-detail-grid">
            <span>Bus Number<strong>{viewingBus.BusNumber}</strong></span>
            <span>Type<strong>{viewingBus.BusType}</strong></span>
            <span>Total Seats<strong>{viewingBus.TotalSeats}</strong></span>
            <span>Seat Layout<strong>{viewingBus.seatLayout}</strong></span>
            <span>Amenities<strong>{(viewingBus.amenities || []).join(", ") || "None"}</strong></span>
          </div>
        </aside>
      )}
    </section>
  );
}

export default Buses;
