
import { useParams } from 'react-router';

function StoreOwnerPage() {

   const { apiKey } = useParams();

   return (<>

      <div className="guestpage_container">
         hello storeowner page
       {/*
        <div className="map_container col">
          <MyMap context={ map_deps } />
        </div>
        
        <div className="right_container col">
  
          <div className="top_child_list row"> 
            <LocationList context={ locations_deps }/>
          </div>
          
          <div className="bottom_child row">
            <AppointmentList context = {appt_deps}/>
         </div>*/}
      
        </div>
  
     
      </>
        );
  }
  
  export default StoreOwnerPage;