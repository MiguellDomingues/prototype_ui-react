import Header from './components/header'
import Footer from './components/footer'
import RouteBuilder from './features/RouteBuilder'

//importing the mock miragejs server creation func
import { makeServer } from './mockserver/server';

import './App.css';

//this code executes at very start of app running
if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
} 

function App() {

  return (<>

  <div className="app_container">
        <div className="row header_child">
          <Header/>
        </div>
        <div className="row content_child">
          <RouteBuilder/>    
        </div>
        <div className="row footer_child">
          <Footer/>
        </div>
  </div>

  </>);
}

export default App;