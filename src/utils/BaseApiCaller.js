


const  BaseApiCaller = ()=>{
    const BaseRoute = "http://localhost:4000/bus-booking/"



    const MODULE = {
        BUS_OPERATION : "bus-operations",
        ROUTE_OPERATION : "route-operations",
        TRIP_OPERATION :"trip-operations"

    }



    const OPERATIONS = {
        ADD:"save-data",
        GETDATA:"get-data",
        GETONE:"get-one",
        UPDATE:"update"
    }


    const getURL = (module,operations,id)=>{
        const url = operations ? `${BaseRoute}${module}/${operations}` : `${BaseRoute}${module}/    `;
        return id ? `${url}/${id}` : url;
    }

      return{
          MODULE,
          OPERATIONS,
          getURL
        }   
}



export default BaseApiCaller;