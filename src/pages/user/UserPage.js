
import { useParams } from 'react-router';

function UserPage(props) {

   const { apiKey } = useParams();

    return (
       <div>
          <p>Hello User Page: apiKey: {apiKey} </p>
       </div>);
  }
  
  export default UserPage;