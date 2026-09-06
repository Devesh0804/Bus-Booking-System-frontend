import { groupSeatsByRow } from '../../utils/seatManagement'

function isSleeperBus(busType) {
  return String(busType || '').toLowerCase().includes('sleeper')
}

function Seat({ seat, selected, onSelect, sleeper }) {
  return (
    <button
      className={`operator-seat operator-seat-${sleeper ? 'sleeper' : 'seater'} ${seat.status.toLowerCase()}${selected ? ' selected' : ''}`}
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(seat)}
    >
      <strong>{seat.seatNumber}</strong>
      {sleeper && <span>{seat.deck}</span>}
    </button>
  )
}

function SeatRows({ seats, selectedSeatId, onSelect, sleeper }) {
  return groupSeatsByRow(seats).map((rowSeats) => {
    const leftSeat = rowSeats.find((seat) => seat.column === 1)
    const rightSeats = rowSeats.filter((seat) => seat.column > 1)

    return (
      <div className="operator-seat-row" key={`${rowSeats[0].deck || 'seater'}-${rowSeats[0].row}`}>
        <div className="operator-seat-side operator-seat-side-left mt-2">
          {leftSeat && (
            <Seat seat={leftSeat} selected={selectedSeatId === leftSeat.id} onSelect={onSelect} sleeper={sleeper} />
          )}
        </div>
        <div className="operator-seat-aisle" aria-hidden="true" />
        <div className="operator-seat-side operator-seat-side-right">
          {rightSeats.map((seat) => (
            <Seat key={seat.id} seat={seat} selected={selectedSeatId === seat.id} onSelect={onSelect} sleeper={sleeper}  />
          ))}
        </div>
      </div>
    )
  })
}

function Deck({ name, seats, selectedSeatId, onSelect }) {
  return (
    <section className="operator-deck">
      <h3>{name} Deck</h3>
      <SeatRows seats={seats} selectedSeatId={selectedSeatId} onSelect={onSelect} sleeper />
    </section>
  )
}

function BusSeatLayout({ seats, busType, selectedSeatId, onSelect }) {
  const isSleeper = isSleeperBus(busType)
  const upperSeats = seats.filter((seat) => seat.deck === 'Upper')
  const lowerSeats = seats.filter((seat) => seat.deck === 'Lower')

  return (
    <section className="operator-bus-layout-panel" aria-label="Bus seat layout">
      {isSleeper ? (
        <div className="operator-sleeper-decks">
          <Deck name="Upper" seats={upperSeats} selectedSeatId={selectedSeatId} onSelect={onSelect} />
          <Deck name="Lower" seats={lowerSeats} selectedSeatId={selectedSeatId} onSelect={onSelect} />
        </div>
      ) : (
        <div className="operator-bus-shell">
          <div className="operator-bus-direction">FRONT</div>
          <div className="operator-driver-area">DRIVER</div>
          <div className="operator-bus-seats">
            <SeatRows seats={seats} selectedSeatId={selectedSeatId} onSelect={onSelect} sleeper={false} />
          </div>
          <div className="operator-bus-direction">REAR</div>
        </div>
      )}
      <div className="operator-legend" aria-label="Seat status legend ">
        <span className="available">Available</span>
        <span className="booked">Booked</span>
        <span className="locked">Locked</span>
        <span className="selected">Selected</span>
      </div>
    </section>
  )
}

export default BusSeatLayout