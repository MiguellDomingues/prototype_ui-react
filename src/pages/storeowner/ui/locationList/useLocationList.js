import {useState, useCallback} from 'react'

export const useLocationList = () =>{

    const [showButton, setShowButton] = useState(true)

    const toggleButton = useCallback(() => setShowButton(showButton => !showButton), []);

    return [showButton, 
      {
        toggleButton
      }
    ]
}