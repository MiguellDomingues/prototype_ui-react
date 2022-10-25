import LocationList from '../../features/LocationList'

import './guestpage.css'

function GuestPage() {

    return (<>

    <div className="guestpage_container">

      <div className="map_container col">
          <p>
            <b>content</b> (fills remaining space)
          </p>
          <p>
            <b>content</b> (fills remaining space)
          </p>
          <p>
            <b>content</b> (fills remaining space)
          </p>
          <p>
            <b>content</b> (fills remaining space)
          </p>
      </div>
      
      <div className="right_container col">
        <div className="top_child row"> 
          <LocationList/>
        </div>
        
        <div className="bottom_child row">
          <p>
            <b>BOTTOM STUFF</b> (fills remaining space)
          </p>
          <p>
            <b>BOTTOM STUFF</b> (fills remaining space)
          </p>
        </div>
      </div>

    </div>

    </> );
  }
  
  export default GuestPage;

 