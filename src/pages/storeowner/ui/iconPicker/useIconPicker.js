import {useState, useEffect, useRef} from 'react'

export const useIconPicker = (onIconsChange, inputIcons) =>{

    const [selectedIcons, setIcons] = useState(inputIcons && inputIcons.length > 0 ? [...inputIcons] : []);


    
    const selectIcon = (iconName) => {
        return (e) => {
          e.preventDefault();
          const copyIcons = [...selectedIcons].concat( [iconName] )
          setIcons(copyIcons)
          onIconsChange(copyIcons)
      }}
    
      const deSelectIcon = (iconName) => {
        return (e) => {
          e.preventDefault();
         
          const copyIcons = [...selectedIcons.filter( (element) => {return element !== iconName} )]
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































      