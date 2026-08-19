import { data } from "react-router-dom";
import BaseApiCaller from "../utils/BaseApiCaller.js"

const api = BaseApiCaller();
const Get_url = api.getURL(api.MODULE.BUS_OPERATION,api.OPERATIONS.GETDATA)

async function fetchBuses(){
  const response = await fetch(Get_url,{
   method: 'GET',
})

if(response.ok){
  return response.json();
}
  
}



export const mockData = fetchBuses();

export const mockBuses = [
  // {
  //   id: 'bus-001',
  //   busNumber: 'MP09AB1234',
  //   busName: 'Volvo Multi Axle',
  //   busType: 'AC Sleeper',
  //   totalSeats: 40,
  //   amenities: ['Wi-Fi', 'Charging', 'Blanket'],
  //   status: 'Active',
  // },
  // {
  //   id: 'bus-002',
  //   busNumber: 'MP09CD5678',
  //   busName: 'Scania Comfort',
  //   busType: 'AC Seater',
  //   totalSeats: 45,
  //   amenities: ['Charging', 'Water Bottle'],
  //   status: 'Active',
  // },
]
