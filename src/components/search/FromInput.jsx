import { MapPin } from 'lucide-react'
import Input from '../ui/Input'
import Label from '../ui/Label'

function FromInput({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="from-location">From</Label>
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-rose-500" /> 
        <Input
          id="from-location"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Leaving from"
          className="pl-12"
        />
      </div>
    </div>
  )
}

export default FromInput
