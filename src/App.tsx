import React, { useEffect, useState } from 'react';
import './App.css';
import * as jokers from './assets/jokers'
import { Checkbox, ImageList, ImageListItem } from '@mui/material';
import JokerList from './types/JokerList';
import styled from 'styled-components';
import DeckList from './types/DeckList';


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 240px);s
  outline: 1px solid black;
`

function App() {
  
  const decks = DeckList.map(d => {
    return (
      <img key={d.name} src={d.image}/>
    )
  });
  
  const rows = JokerList.filter(j => j.image !== '').map(j => {
    return(
      <>
        <img key={j.name} src={j.image} />
        <Checkbox key={`${j.name}0`}/>
        <Checkbox key={`${j.name}1`}/>
        <Checkbox key={`${j.name}2`}/>
      </>
    );
  })
  
  return (
    <div className="App">
      <Grid>
        <img />
        {decks}
        {rows}
      </Grid>   
    </div>
  );
}

export default App;
