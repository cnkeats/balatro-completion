import React, { useEffect, useState } from 'react';
import './App.css';
import * as jokers from './assets/jokers'
import { Checkbox, ImageList, ImageListItem } from '@mui/material';
import JokerList from './types/JokerList';
import styled from 'styled-components';
import DeckList from './types/DeckList';


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 192px);
    grid-template-rows: repeat(4, 241px);
    outline: 1px solid black;
    grid-gap: 0px;
`

const GridItem = styled.div`
    &:hover {
        outline: 1px solid red;
    }
    display: flex;
    align-items: center;
    justify-content: center;
`

function App() {
  
    const TickBox = (
        <>X</>
    )
  
    const gridItems: JSX.Element[] = [<img />];
  
    DeckList.forEach(d => {
        gridItems.push(<img key={d.name} src={d.image}></img>);
    });
  
    JokerList.forEach(j => {
        gridItems.push(<img key={j.name} src={j.image} />);
        DeckList.forEach(d => {
            gridItems.push(
                <GridItem>
                    <Checkbox 
                        style={{
                            transform: "scale(3)",
                        }}/>
                </GridItem>
            )
        })
    })
  
    return (
        <div className="App">
            <Grid>
                {gridItems}
            </Grid>   
        </div>
    );
}

export default App;
