import {useState, useCallback} from 'react'

export const useLocationWidget = (_icons) =>{

    const icons = _icons.sort( (lhs, rhs) => { return lhs > rhs ? -1 : rhs > lhs ? 1 : 0 } )

    const [isEdit, setEdit] = useState(false)

    console.log("isEdit state: ", isEdit)

    const [selectedIcons, setSelectedIcons] = useState([])

    const onIconsChange = (icons) =>{ setSelectedIcons([...icons]) }

    const toggleEdit = useCallback(() => setEdit(isEdit => !isEdit), []);

   // const toggleEdit = () => setEdit(isEdit => !isEdit);

    //const toggleButton = useCallback(() => setShowButton(showButton => !showButton), []);

    //const [showButton, setShowButton] = useState(true)

    //console.log("sorted icons: ", icons)
    
    //const setIcons = (icons) => { return icons.sort(lexCompare).map( (icon)=>(  getIcon(icon) ) )}

    return [
        icons, isEdit,
        //showButton, 
      {
        toggleEdit, onIconsChange
       // toggleButton
      }
    ]
}