import { useState } from 'react'
import './App.css'
import Btn from './component/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Btn btnTitle="click-Me" />
      
    </>
  )
}

export default App
