


const  BaseApiCaller = ()=>{
    const BaseRoute = "http://localhost:4000/bus-booking/"



    const MODULE = {
        BUS_OPERATION : "bus-operations",

    }



    const OPERATIONS = {
        ADD:"save-data",
        GETDATA:"get-data"


    }


    const getURL = (module,operations,id)=>{
         if(module,operations,id){
             
              
              return `${BaseRoute}${module}/${operations}/${id}`
            } 
        else{
            return `${BaseRoute}${module}/${operations}`
            }
    }

      return{
          MODULE,
          OPERATIONS,
          getURL
        }   
}



export default BaseApiCaller;