
const LocationWidget = (props) =>{

    const {id, address, info} = props.location
    const {lat, lng} = props.location.LatLng

    return (
        <li onClick={ (e) => {props.selectedHandler(e, id)} }>
        ID: {id}<br/>
        address: {address}<br/>
        lat: {lat}<br/>
        lng: {lng}<br/> 
        info: {info} <br/>
        </li>
    );

}

export default LocationWidget