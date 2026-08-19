import { Armchair, Clock, MapPin, Star, Wifi } from 'lucide-react'
import Button from '../ui/Button'

const buses = [
  {
    id: 1,
    name: 'Royal Express',
    type: 'AC Sleeper',
    from: 'Delhi',
    to: 'Jaipur',
    startTime: '08:30 AM',
    endTime: '01:15 PM',
    duration: '4h 45m',
    seats: 18,
    rating: 4.6,
    price: 699,
  },
  {
    id: 2,
    name: 'Cityline Travels',
    type: 'Non AC Seater',
    from: 'Delhi',
    to: 'Jaipur',
    startTime: '10:00 AM',
    endTime: '03:05 PM',
    duration: '5h 05m',
    seats: 24,
    rating: 4.2,
    price: 449,
  },
  {
    id: 3,
    name: 'Green Miles',
    type: 'AC Seater',
    from: 'Mumbai',
    to: 'Pune',
    startTime: '07:45 AM',
    endTime: '11:00 AM',
    duration: '3h 15m',
    seats: 12,
    rating: 4.5,
    price: 399,
  },
  {
    id: 4,
    name: 'Night Rider',
    type: 'AC Sleeper',
    from: 'Bengaluru',
    to: 'Chennai',
    startTime: '09:30 PM',
    endTime: '04:45 AM',
    duration: '7h 15m',
    seats: 10,
    rating: 4.4,
    price: 899,
  },
]

function BusResultsDashboard({ searchDetails }) {
  const filteredBuses = buses.filter((bus) => {
    const fromMatches =
      searchDetails.from.trim() === '' ||
      bus.from.toLowerCase().includes(searchDetails.from.toLowerCase())
    const toMatches =
      searchDetails.to.trim() === '' ||
      bus.to.toLowerCase().includes(searchDetails.to.toLowerCase())

    return fromMatches && toMatches
  })

  const visibleBuses = filteredBuses.length > 0 ? filteredBuses : buses

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">
            Available buses
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-950 sm:text-2xl">
            {searchDetails.from || 'Your city'} to {searchDetails.to || 'destination'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {searchDetails.date || 'Select date'} - {searchDetails.passengers} passenger
          </p>
        </div>
        <p className="text-sm font-semibold text-slate-700">
          {visibleBuses.length} buses found
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-950">Filters</h3>
            <button className="text-sm font-semibold text-rose-600">Clear</button>
          </div>

          <FilterGroup title="Bus type" options={['AC Sleeper', 'AC Seater', 'Non AC Seater']} />
          <FilterGroup title="Departure time" options={['Morning', 'Afternoon', 'Night']} />
          <FilterGroup title="Amenities" options={['WiFi', 'Charging point', 'Water bottle']} />

          <div className="border-t border-slate-200 pt-4">
            <label htmlFor="price-range" className="text-sm font-semibold text-slate-700">
              Max price
            </label>
            <input
              id="price-range"
              type="range"
              min="300"
              max="1500"
              className="mt-3 w-full accent-rose-600"
            />
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>Rs 300</span>
              <span>Rs 1500</span>
            </div>
          </div>
        </aside>

        <div className="space-y-4">
          {visibleBuses.map((bus) => (
            <article
              key={bus.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-rose-200 hover:shadow-md sm:p-5"
            >
              <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_auto] xl:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-950">{bus.name}</h3>
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                      {bus.type}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                    <Info icon={<Star className="h-4 w-4" />} text={`${bus.rating} rating`} />
                    <Info icon={<Armchair className="h-4 w-4" />} text={`${bus.seats} seats left`} />
                    <Info icon={<Wifi className="h-4 w-4" />} text="WiFi available" />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <TimeBlock time={bus.startTime} place={bus.from} />
                  <div className="text-center">
                    <Clock className="mx-auto h-4 w-4 text-slate-400" />
                    <p className="mt-1 text-xs font-semibold text-slate-500">{bus.duration}</p>
                  </div>
                  <TimeBlock time={bus.endTime} place={bus.to} alignRight />
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 xl:flex-col xl:items-end xl:border-t-0 xl:pt-0">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Starting from</p>
                    <p className="text-2xl font-bold text-slate-950">Rs {bus.price}</p>
                  </div>
                  <Button className="h-11 px-5">View seats</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FilterGroup({ title, options }) {
  return (
    <div className="mb-5 border-b border-slate-200 pb-4">
      <h4 className="mb-3 text-sm font-bold text-slate-800">{title}</h4>
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 text-sm text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-rose-600" />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}

function Info({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {text}
    </span>
  )
}

function TimeBlock({ time, place, alignRight = false }) {
  return (
    <div className={alignRight ? 'text-right' : ''}>
      <p className="text-lg font-bold text-slate-950">{time}</p>
      <p className="mt-1 inline-flex items-center gap-1 text-sm text-slate-500">
        <MapPin className="h-4 w-4 text-rose-500" />
        {place}
      </p>
    </div>
  )
}

export default BusResultsDashboard
