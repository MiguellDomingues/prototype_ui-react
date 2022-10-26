import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";
//AIzaSyDqveqKgLlKG9gO1NCrs-iHmSjx10TUTkE

const Map = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDqveqKgLlKG9gO1NCrs-iHmSjx10TUTkE"
        
    })

    const initialMarkers = [
        {
            position: {
                lat: 28.625485,
                lng: 79.821091
            },
            label: { color: "white", text: "P1" },
            draggable: true
        },
        {
            position: {
                lat: 28.625293,
                lng: 79.817926
            },
            label: { color: "white", text: "P2" },
            draggable: false
        },
        {
            position: {
                lat: 28.625182,
                lng: 79.81464
            },
            label: { color: "white", text: "P3" },
            draggable: true
        },
    ];
    
    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    const [markers, setMarkers] = useState(initialMarkers);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))


    useEffect( () => {
        
       
        
        console.log("useffect", markers)
        
        
      }, );


    if (!isLoaded) {
        return <>Loading</>
      }

    
    



    const containerStyle = {
        width: "100%",
        height: "400px",
    }

    const center = {
        lat: 28.626137,
        lng: 79.821603,
    }

    const mapClicked = (event) => { 
        console.log("mapclicked", event.latLng.lat(), event.latLng.lng()) 
        //setMarkers(initialMarkers)

        const allMarkers = [...markers];
        const marker = {
            position: {
             lat: 28.625043,
                lng: 79.810135
            },
            label: { color: "white", text: "P4" },
            draggable: true
        }
        allMarkers.push(marker);
        setMarkers(allMarkers)

    }

    const markerClicked = (marker, index) => {  
        console.log("marker clicked ", marker, index) 
        setActiveInfoWindow(index)
        console.log(marker, index) 
    }

    const markerDragEnd = (event, index) => { 
        console.log("marker drag end") 
        
        console.log(event.latLng.lat())
        console.log(event.latLng.lng())
    }

    return (<>
        {console.log("rendering map")}
        
            <GoogleMap 
                mapContainerStyle={containerStyle} 
                center={center} 
                zoom={15}
                onClick={mapClicked}
                onLoad={map => setMap(map)}
            >
                {markers.map((marker, index) => (
                    
                    <Marker 
                        key={index} 
                        position={marker.position}
                        label={marker.label}
                        draggable={marker.draggable}
                        onDragEnd={event => markerDragEnd(event, index)}
                        onClick={event => markerClicked(marker, index)} 
                    >
                        {
                            (activeInfoWindow === index)
                            &&
                            <InfoWindow position={marker.position}>
                                <b>{marker.position.lat}, {marker.position.lng}</b>
                            </InfoWindow>
                        }  
                    </Marker>
                    ))}
            </GoogleMap>
        </>
    );
   

    //return(<>hello map</>);
};



//AIzaSyDqveqKgLlKG9gO1NCrs-iHmSjx10TUTkE



export default Map;