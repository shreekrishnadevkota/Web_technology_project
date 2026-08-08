// import { useState } from 'react'
import './App.css'
import Btn from './component/button'
import ProductCard from './component/ProductCard'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Btn btnTitle="CLICK" />
      <ProductCard productName='pikachu panting' price="Rs.100"/>
      
    </>
  )
}

export default App
