import { useState } from "react";
import { Link } from "react-router-dom";
import { mockBuses } from "../../data/busData";
import BaseApiCaller from "../../utils/BaseApiCaller.js";
import { useEffect } from "react";




const api = BaseApiCaller();
const Post_url = api.getURL(api.MODULE.BUS_OPERATION,api.OPERATIONS.ADD)
const Get_url = api.getURL(api.MODULE.BUS_OPERATION,api.OPERATIONS.GETDATA)




async function fetchBuses() {
  const response = await fetch(Get_url, {
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



    useEffect(() => {
    async function loadBuses() {
    const data = await fetchBuses();

    if(data.buses){
    setBuses(data.buses);
    }else{
      setError(data)
    }
  }

  loadBuses();
}, [submitBus]); 

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
    
          console.log('final data to send',nextBus);
          
    const response = await fetch(Post_url,{
         method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(nextBus)
    })

    const {message,bus} = await response.json();

    resetForm();
  }

  // function editBus(bus) {
  //   setEditingId(bus.id);
  //   setForm({
  //     busNumber: bus.busNumber,
  //     busName: bus.busName,
  //     busType: bus.busType,
  //     totalSeats: bus.totalSeats,
  //     amenities: bus.amenities.join(", "),
  //   });
  // }

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
          <button className="operator-primary-button" type="submit">
            {editingId ? "Update Bus" : "Add Bus"}
          </button>
          <button
            className="operator-secondary-button"
            type="button"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </form>

      <div className="operator-card-grid">
        {buses.map((bus,index) => (
          <article className="operator-item-card" key={index}>
            <div>
              <strong>{bus.BusNumber}</strong>
              <h2>{bus.BusName}</h2>
              <p>
                {bus.BusType} | {bus.TotalSeats} Seats 
              </p>
              <small>{bus.amenities.join(", ")}</small>
            </div>
            <div className="operator-card-actions">
              <button className="operator-secondary-button" type="button">
                View
              </button>
              <button
                className="operator-secondary-button"
                type="button"
                onClick={() => editBus(bus)}
              >
                Edit
              </button>
              <Link
                className="operator-primary-button"
                to={`/operator/buses/${bus.id}/seats`}
              >
                Manage Seats
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Buses;
