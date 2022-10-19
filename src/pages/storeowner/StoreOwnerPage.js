
import { useParams } from 'react-router';

function StoreOwnerPage() {

   const { apiKey } = useParams();

    return (
       <div>
          <p>Hello Store Owner Page! apiKey: {apiKey} </p>
       </div>);
  }
  
  export default StoreOwnerPage;