import { useState } from 'react'
import './App.css'
import { ImageList, ImageListItem } from '@mui/material'
import joker from '../src/assets/jokers/joker.png'

function App() {
  const [count, setCount] = useState(0)
  
  const itemData = [];

  return (
    <>
      <img src={joker}></img>
    </>
  )
}

export default App
