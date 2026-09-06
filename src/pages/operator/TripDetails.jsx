import { Link, useParams } from "react-router-dom";
import BaseApiCaller from "../../utils/BaseApiCaller.js";
import { useState } from "react";
import { useEffect } from "react";
import BusSeatLayout from "../../components/seat-management/BusSeatLayout";
import SeatForm from "../../components/seat-management/SeatForm";
const api = BaseApiCaller();

function TripDetails() {

  const { tripId } = useParams();
  // Changed: useState returns an array, so array destructuring is required here.
  const [trip, setTrip] = useState(null);
  // Changed: store the seats fetched for this trip's bus for the existing seat layout UI.
  const [seats, setSeats] = useState([]);
  const [selectedSeatId, setSelectedSeatId] = useState(null)
  
  useEffect(()=>{
      async function FetchTripDetails() {
   try {
     const url = api.getURL(api.MODULE.TRIP_OPERATION, api.OPERATIONS.GETONE,tripId);
    console.log(url);
    
    const response = await fetch(url,{
      method : "GET"
    })

    const data = await response.json()
    const fetchedTrip = data.trip;
    // console.log(fetchedTrip);
    setTrip(fetchedTrip)
    

      const busId = fetchedTrip.busId._id;
  

      const seatURL = api.getURL(api.MODULE.BUS_OPERATION,`${busId}/seats`);
      const res = await fetch(seatURL,{
        method:"GET"
      })

      const seatData = await res.json();
      const fetchedSeats = seatData.seats;
      // Changed: BusSeatLayout uses id, while MongoDB returns the identifier as _id.
      setSeats((fetchedSeats || []).map((seat) => ({
        ...seat,
        id: seat._id,
        busID: seat.busID || seat.busId,
        column: seat.column ?? seat.columns,
      })));
    
       
  } catch (error) {
   console.error("Failed to load trip details", error);
   setTrip(null);
   }
   
  

}
FetchTripDetails();
},[tripId])




  // Changed: use the populated backend objects instead of the old mock trip shape.
  const routeName = trip?.routeId
    ? `${trip.routeId.source} to ${trip.routeId.destination}`
    : "Loading trip...";
  const date = trip?.departureDate
    ? new Date(trip.departureDate).toLocaleDateString()
    : "Not provided";
  // Changed: format the remaining timestamp fields from the fetched trip.
  const formatDateTime = (value) => value
    ? new Date(value).toLocaleString()
    : "Not provided";
  const stops = trip?.stops || [];



   const selectedSeat = seats.find((seat) => seat.id === selectedSeatId)

  // Changed: use the same seat update flow as SeatManagement for the selected seat form.
  async function updateSeat(updatedSeat) {
    try {
      const response = await fetch(api.getURL(api.MODULE.BUS_OPERATION, "seats", updatedSeat.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSeat),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to update seat.");

      const savedSeat = {
        ...data.seat,
        id: data.seat._id,
        busID: data.seat.busID || data.seat.busId,
        column: data.seat.column ?? data.seat.columns,
      };
      setSeats((current) => current.map((seat) => (seat.id === savedSeat.id ? savedSeat : seat)));
      setSelectedSeatId(null);
    } catch (error) {
      console.error("Failed to update seat", error);
    }
  }

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Trip Details</p>
          <h1>{routeName}</h1>
        </div>
        <Link className="operator-secondary-button" to="/operator/trips">
          Back to Trips
        </Link>
      </div>
      <article className="operator-page-card">
        <div className="operator-detail-grid">
          <span>
            Bus<strong>{trip?.busId?.BusNumber || "Not provided"}</strong>
          </span>
          <span>
            Date<strong>{date}</strong>
          </span>
          <span>
            Departure<strong>{trip?.departureTime || "Not provided"}</strong>
          </span>
          <span>
            Arrival<strong>{trip?.arrivalTime || "Not provided"}</strong>
          </span>
          <span>
            Price<strong>Not provided</strong>
          </span>
          <span>
            Seats
            <strong>
              Not provided / {trip?.busId?.TotalSeats || "Not provided"}
            </strong>
          </span>
          <span>
            Status<strong>Not provided</strong>
          </span>
          {/* Changed: show the remaining populated bus and route information. */}
          <span>
            Bus Name<strong>{trip?.busId?.BusName || "Not provided"}</strong>
          </span>
          <span>
            Bus Type<strong>{trip?.busId?.BusType || "Not provided"}</strong>
          </span>
          <span>
            Route Distance<strong>{trip?.routeId?.distance || "Not provided"}</strong>
          </span>
          <span>
            Route Duration<strong>{trip?.routeId?.estimatedDuration || "Not provided"}</strong>
          </span>
          <span>
            Amenities<strong>{trip?.busId?.amenities?.join(", ") || "Not provided"}</strong>
          </span>
          <span>
            Created At<strong>{formatDateTime(trip?.createdAt)}</strong>
          </span>
          <span>
            Updated At<strong>{formatDateTime(trip?.updatedAt)}</strong>
          </span>
        </div>
      </article>
      {/* Changed: display every stop returned inside fetchedTrip.stops. */}
      <article className="operator-page-card">
        <h2>Trip Stops</h2>
        {stops.length > 0 ? (
          <div className="operator-detail-grid">
            {stops.map((stop, index) => (
              <span key={`${stop.stopName}-${index}`}>
                Stop {index + 1}
                <strong>{stop.stopName}</strong>
                <small>Arrival: {stop.arrivalTime}</small>
                <small>Departure: {stop.departureTime}</small>
                <small>{stop.canBoard ? "Boarding available" : "Boarding unavailable"}</small>
                <small>{stop.canDrop ? "Drop available" : "Drop unavailable"}</small>
              </span>
            ))}
          </div>
        ) : (
          <p>No stops provided for this trip.</p>
        )}
      </article>
      <article className="operator-page-card">
        <h2>Seat Preview</h2>
        {/* Changed: reuse the same seat-management UI with the seats fetched for this bus. */}
        <div className="operator-seat-workspace">
          <div>
            <BusSeatLayout
              seats={seats}
              busType={trip?.busId?.BusType}
              selectedSeatId={selectedSeatId}
              onSelect={(seat) => setSelectedSeatId(seat.id)}
            />
          </div>
          {/* Changed: show the selected seat details in the same side form as SeatManagement. */}
          {selectedSeat ? (
            <SeatForm
              key={selectedSeat.id}
              seat={selectedSeat}
              seats={seats}
              busType={trip?.busId?.BusType}
              onSave={updateSeat}
              onCancel={() => setSelectedSeatId(null)}
            />
          ) : (
            <aside className="operator-seat-empty-panel">
              <p className="operator-eyebrow">Seat Editor</p>
              <h2>Select a seat to edit</h2>
              <p>Choose any seat in the layout to review or update its details.</p>
            </aside>
          )}
        </div>
      </article>
    </section>

  
  );
}

export default TripDetails;
