
const Location = ({ props }) =>{

    const {id, address, x, y} = props

    return (
        <>
        ID: {id}<br/>
        address: {address}<br/>
        x: {x}<br/>
        y: {y}<br/>  
        </>
    );

}

export default Location