const buses = [
  {
    name: 'Royal Express',
    registration: 'MH 12 AB 3456',
    type: 'AC Sleeper',
    seats: 42,
    driver: 'Amit Sharma',
  },
  {
    name: 'Coastal Cruiser',
    registration: 'GA 08 CD 2211',
    type: 'Volvo Multi-Axle',
    seats: 48,
    driver: 'Ravi Nair',
  },
  {
    name: 'City Link',
    registration: 'DL 01 EF 7788',
    type: 'AC Seater',
    seats: 36,
    driver: 'Manoj Kumar',
  },
  {
    name: 'Night Rider',
    registration: 'KA 03 GH 9090',
    type: 'Non-AC Sleeper',
    seats: 40,
    driver: 'Suresh Rao',
  },
]

const schedules = [
  {
    bus: 'Royal Express',
    route: 'Pune to Bengaluru',
    time: '21:30 - 07:15',
    repeat: 'Daily',
    status: 'Active',
  },
  {
    bus: 'Coastal Cruiser',
    route: 'Mumbai to Goa',
    time: '22:00 - 08:30',
    repeat: 'Weekends',
    status: 'Active',
  },
  {
    bus: 'City Link',
    route: 'Delhi to Jaipur',
    time: '06:45 - 12:30',
    repeat: 'Weekdays',
    status: 'Draft',
  },
]

const sections = document.querySelectorAll('.section-panel')
const navItems = document.querySelectorAll('[data-section]')
const sectionTriggers = document.querySelectorAll('[data-section-trigger]')
const busForm = document.querySelector('#bus-form')
const tripForm = document.querySelector('#trip-form')
const busTable = document.querySelector('#bus-table')
const busSelect = document.querySelector('#bus-select')
const scheduleList = document.querySelector('#schedule-list')
const totalBuses = document.querySelector('#total-buses')
const totalTrips = document.querySelector('#total-trips')
const fleetCount = document.querySelector('#fleet-count')

function setActiveSection(sectionId) {
  sections.forEach((section) => {
    section.classList.toggle('active', section.id === sectionId)
  })

  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.section === sectionId)
  })

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function renderBuses() {
  busTable.innerHTML = buses
    .map(
      (bus) => `
        <tr>
          <td>${bus.name}</td>
          <td>${bus.registration}</td>
          <td>${bus.type}</td>
          <td>${bus.seats}</td>
          <td>${bus.driver}</td>
        </tr>
      `,
    )
    .join('')

  busSelect.innerHTML = buses
    .map((bus) => `<option value="${bus.name}">${bus.name} - ${bus.registration}</option>`)
    .join('')

  totalBuses.textContent = buses.length
  fleetCount.textContent = `${buses.length} buses`
}

function renderSchedules() {
  scheduleList.innerHTML = schedules
    .map(
      (schedule) => `
        <div class="schedule-row">
          <div>
            <strong>${schedule.route}</strong>
          <small>${schedule.bus} | ${schedule.time} | ${schedule.repeat}</small>
          </div>
          <span class="status-pill">${schedule.status}</span>
        </div>
      `,
    )
    .join('')

  totalTrips.textContent = schedules.length
}

navItems.forEach((item) => {
  item.addEventListener('click', () => setActiveSection(item.dataset.section))
})

sectionTriggers.forEach((button) => {
  button.addEventListener('click', () => setActiveSection(button.dataset.sectionTrigger))
})

busForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(busForm)

  buses.unshift({
    name: data.get('busName'),
    registration: data.get('registration'),
    type: data.get('busType'),
    seats: data.get('seats'),
    driver: data.get('driver'),
  })

  renderBuses()
  busForm.reset()
})

tripForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(tripForm)

  schedules.unshift({
    bus: data.get('bus'),
    route: `${data.get('from')} to ${data.get('to')}`,
    time: `${data.get('departure')} - ${data.get('arrival')}`,
    repeat: data.get('repeat'),
    status: data.get('status'),
  })

  renderSchedules()
  tripForm.reset()
  setActiveSection('overview')
})

renderBuses()
renderSchedules()
