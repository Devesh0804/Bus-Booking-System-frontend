import { useState } from 'react'
import FromInput from './FromInput'
import JourneyDatePicker from './JourneyDatePicker'
import PassengerSelector from './PassengerSelector'
import SearchButton from './SearchButton'
import SearchCard from './SearchCard'
import SwapLocationsButton from './SwapLocationsButton'
import ToInput from './ToInput'

function SearchSection({ onSearch }) {
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [journeyDate, setJourneyDate] = useState('')
  const [passengerCount, setPassengerCount] = useState('1')

  function handleSwapLocations() {
    setFromLocation(toLocation)
    setToLocation(fromLocation)
  }

  function handleSearchSubmit(event) {
    event.preventDefault()
    onSearch({
      from: fromLocation,
      to: toLocation,
      date: journeyDate,
      passengers: passengerCount,
    })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">
          Search buses
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Plan your next journey
        </h2>
      </div>

      <SearchCard onSubmit={handleSearchSubmit}>
        <FromInput value={fromLocation} onChange={setFromLocation} />
        <div className="flex justify-center lg:pb-0">
          <SwapLocationsButton onSwap={handleSwapLocations} /> 
        </div>
        <ToInput value={toLocation} onChange={setToLocation} />
        <JourneyDatePicker value={journeyDate} onChange={setJourneyDate} />
        <PassengerSelector value={passengerCount} onChange={setPassengerCount} />
        <SearchButton />
      </SearchCard>
    </section>
  )
}

export default SearchSection
