const seatLetters = ['A', 'B', 'C']

function getSeatType(column) {
  if (column === 1) return 'Window'
  if (column === 2) return 'Aisle'
  return 'Window'
}

function createSeat({ busID, index, deck, deckIndex, layout }) {
  const row = Math.floor(deckIndex / 3) + 1
  const column = (deckIndex % (layout === '2x1' || layout === '2+1' ? 3 : 3)) + 1
  const letter = seatLetters[column - 1]
  const deckSuffix = deck ? `-${deck[0]}` : ''

  return {
    id: `seat-${index + 1}`,
    busID,
    seatNumber: `${row}${letter}${deckSuffix}`,
    seatType: getSeatType(column),
    row,
    column,
    price: 650,
    status: 'Available',
    ...(deck ? { deck } : {}),
  }
}

export function generateSeats({ totalSeats, busID, busType, layout }) {
  const safeTotalSeats = Math.max(0, Number(totalSeats) || 0)
  const isSleeper = busType === 'Sleeper'
  const supportedLayout = layout === '2+1' || layout === '2x1' ? layout : '2x1'
  const upperSeatCount = isSleeper ? Math.ceil(safeTotalSeats / 2) : 0

  return Array.from({ length: safeTotalSeats }, (_, index) => {
    if (!isSleeper) {
      return createSeat({ busID, index, deckIndex: index, layout: supportedLayout })
    }

    const isUpper = index < upperSeatCount
    return createSeat({
      busID,
      index,
      deck: isUpper ? 'Upper' : 'Lower',
      deckIndex: isUpper ? index : index - upperSeatCount,
      layout: supportedLayout,
    })
  })
}

export function groupSeatsByRow(seats) {
  return Object.values(
    seats.reduce((rows, seat) => {
      const key = seat.row
      if (!rows[key]) rows[key] = []
      rows[key].push(seat)
      return rows
    }, {}),
  ).sort((firstRow, secondRow) => firstRow[0].row - secondRow[0].row)
}