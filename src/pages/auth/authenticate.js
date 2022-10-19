import Header from '../../components/header'
import Footer from '../../components/footer'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Authenticate() {

    return (<div>
      <Container style={ {border: "1px solid #ccc" , maxWidth: "100%", maxHeight: "100%", height: "85%"} }>
          <Row style={ {border: "1px dashed green" , maxWidth: "100%", maxHeight: "25%", height: "15%"} } >
              <Header/>
          </Row>
          <Row style={ { border: "1px dashed green" , maxWidth: "100%", maxHeight: "70%", height: "70%",box_sizing: "border-box"} } >
              <p>Hello Athenticate!</p>
          </Row>
          <Row style={ {border: "1px dashed green" , margin:"0px", maxWidth: "100%", maxHeight: "25%", height: "15%"} }>
              <Footer/>
          </Row>
      </Container>
     </div>);
  }
  
  export default Authenticate;

  /*
      (<div>
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
  */