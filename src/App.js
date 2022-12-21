import Header from './components/header/header'
import Footer from './components/footer/footer'
import RouteBuilder from './features/RouteBuilder'

import './App.css';

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