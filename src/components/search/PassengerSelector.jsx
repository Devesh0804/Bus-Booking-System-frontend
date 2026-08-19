import { Users } from 'lucide-react'
import Label from '../ui/Label'

function PassengerSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="passenger-count">Passengers</Label>
      <div className="relative">
        <Users className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-rose-500" />
        <select
          id="passenger-count"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-12 text-sm text-slate-950 shadow-sm transition focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-100"
        >
          <option value="1">1 passenger</option>
          <option value="2">2 passengers</option>
          <option value="3">3 passengers</option>
          <option value="4">4 passengers</option>
          <option value="5">5 passengers</option>
          <option value="6">6 passengers</option>
        </select>
      </div>
    </div>
  )
}

export default PassengerSelector
