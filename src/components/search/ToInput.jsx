import { Navigation } from 'lucide-react'
import Input from '../ui/Input'
import Label from '../ui/Label'

function ToInput({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="to-location">To</Label>
      <div className="relative">
        <Navigation className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-rose-500" />
        <Input
          id="to-location"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Going to"
          className="pl-12"
        />
      </div>
    </div>
  )
}

export default ToInput
