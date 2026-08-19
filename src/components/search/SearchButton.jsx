import { Search } from 'lucide-react'
import Button from '../ui/Button'

function SearchButton() {
  return (
    <Button type="submit" className="h-12 w-full gap-2 px-6 lg:w-auto">
      <Search className="h-5 w-5" />
      Search Buses
    </Button>
  )
}

export default SearchButton
