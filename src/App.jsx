import { useState } from 'react'
import './App.css'
import RealTimeClock from './RealTimeClock'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <RealTimeClock/>
    </div>
  )
}

export default App
