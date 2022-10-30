//import React from "react";

//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';

import Header from './components/header'
import Footer from './components/footer'
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