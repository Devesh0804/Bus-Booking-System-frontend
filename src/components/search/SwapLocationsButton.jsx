import { ArrowLeftRight } from 'lucide-react'
import Button from '../ui/Button'

function SwapLocationsButton({ onSwap }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onSwap}
      aria-label="Swap from and to locations"
      className="h-12 w-12 rounded-full p-0 lg:mb-0"
    >
      <ArrowLeftRight className="h-5 w-5" />
    </Button>
  )
}

export default SwapLocationsButton
