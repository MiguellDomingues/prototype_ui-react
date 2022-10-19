import { useParams } from 'react-router';

function AdminPage() {

   const { apiKey } = useParams();

    return (
       <div>
          <p>Hello Admin Page! apiKey: {apiKey} </p>
       </div>);
  }
  
  export default AdminPage;