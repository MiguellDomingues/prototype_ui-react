
import Footer from '../../components/footer'
import Header from '../../components/header'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

//import './guestpage.css'

function GuestPage() {

    return (
       <div>
        <Container style={ {border: "1px solid #ccc" , maxWidth: "100%", maxHeight: "100%", height: "85%"} }>
            <Row style={ {border: "1px dashed green" , maxWidth: "100%", maxHeight: "25%", height: "15%"} } >
                <Header/>
            </Row>
            <Row style={ { border: "1px dashed green" , maxWidth: "100%", maxHeight: "70%", height: "70%",box_sizing: "border-box"} } >
                <p>Hello Guest Page</p>
            </Row>
            <Row style={ {border: "1px dashed green" , margin:"0px", maxWidth: "100%", maxHeight: "25%", height: "15%"} }>
                <Footer/>
            </Row>
        </Container>
       </div>);
  }
  
  export default GuestPage;

  //style={ {backgroundColor: "red", margin:"0px", maxWidth: "100%", maxHeight: "85%", height: "85%"} }