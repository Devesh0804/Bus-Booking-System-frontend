import { CalendarDays } from 'lucide-react'
import Input from '../ui/Input'
import Label from '../ui/Label'

function JourneyDatePicker({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="journey-date">Journey date</Label>
      <div className="relative">
        <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-rose-500" />
        <Input
          id="journey-date"
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pl-12"
          
        />
      
            
             
            
      </div>
        
    </div>
  )
}

export default JourneyDatePicker
