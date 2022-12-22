import {useState} from 'react'

export const useIconPicker = (onIconsChange) =>{

    const [selectedIcons, setIcons] = useState([]);
    
    const selectIcon = (iconName) => {
        return (e) => {
          e.preventDefault();
          console.log("select ICON GP: ", iconName)
          const copyIcons = [...selectedIcons].concat( [iconName] )
          console.log("selected: ", copyIcons)
          setIcons(copyIcons)
          onIconsChange(copyIcons)
      }}
    
      const deSelectIcon = (iconName) => {
        return (e) => {
          e.preventDefault();
          console.log("deselect ICON GP: ", iconName)
          const copyIcons = [...selectedIcons.filter( (element) => {return element !== iconName} )]
          console.log("selected: ", copyIcons)
          setIcons(copyIcons)
          onIconsChange(copyIcons)
      }}

      const toggleIcon = (iconName) => selectedIcons.includes(iconName) ? deSelectIcon(iconName) : selectIcon(iconName)

  return [
    selectedIcons,
    {
        toggleIcon
    },
  ]; 
}































      