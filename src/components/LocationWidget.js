
const LocationWidget = (props) =>{

    const {id, address, x, y} = props.location

    return (
        <li onClick={ (e) => {props.selectedHandler(e, id)} }>
        ID: {id}<br/>
        address: {address}<br/>
        x: {x}<br/>
        y: {y}<br/>  
        </li>
    );

}

export default LocationWidget