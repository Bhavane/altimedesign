import React from 'react'
import {useState} from 'react'

const Abra = () => {
    const[show,setShow] = useState(true)

    const change = () => {
        setShow(!show)
    }
  return (
    <div>
        <h1>This si the main head</h1>
        {show && <p>hI THIS SI SBAG</p>}
        <button onClick={change}>CHANGW</button>
    </div>
  )
}

export default Abra;