import React, { useEffect, useState } from 'react';
import './App.css';
import * as jokers from './assets/jokers'
import { Checkbox, ImageList, ImageListItem } from '@mui/material';
import JokerList from './types/JokerList';
import styled from 'styled-components';
import DeckList from './types/DeckList';


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 142px);
    outline: 0px solid black;
    grid-gap: 0px;
`

const GridItem = styled.div`
    &:hover {
        outline: 0px solid red;
    }
    display: flex;
    align-items: center;
    justify-content: center;
`

const JokerName = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
`;


function App() {
    
    type JokerCheckStatus = Record<string, Record<string, boolean>>;
    
    const [checked, setChecked] = useState<JokerCheckStatus>({});
    
    
    useEffect(() => {
        const data = window.localStorage.getItem('CHECKED');
        if ( data !== null ) {
            setChecked(JSON.parse(data));
        }
    }, []);
    
    const toggle = (jokerName: string, deckName: string) => {
        if (jokerName in checked! && deckName in checked[jokerName]) {
            // console.log('fully exists!');
            const temp = checked;
            temp[jokerName][deckName] = !checked[jokerName][deckName];
            setChecked({...temp});
        }
        else if (jokerName in checked) {
            // console.log('joker exists!');
            const temp = checked;
            temp[jokerName][deckName] = true;
            setChecked({...temp});
        }
        else {
            // console.log('nothing exists!')
            const temp = checked;
            temp[jokerName] = {}
            temp[jokerName][deckName] = true;
            setChecked({...temp})
        }
        
        console.table(checked);
        window.localStorage.setItem('CHECKED', JSON.stringify(checked));
    }
    
    const gridItems: JSX.Element[] = [<GridItem key='0' />, <GridItem key='1' />];
  
    DeckList.forEach(d => {
        gridItems.push(<GridItem><JokerName>{d.name}</JokerName></GridItem>);
    });
    gridItems.push(<GridItem key='0' />, <GridItem key='0' />);
    DeckList.forEach(d => {
        gridItems.push(<GridItem><img key={d.name} src={d.image}></img></GridItem>);
    });
  
    JokerList.forEach(j => {
        gridItems.push(<JokerName key={`${j.name}-name`}>{j.name}</JokerName>);
        gridItems.push(<img key={j.name} src={j.image} />);
        DeckList.forEach(d => {
            const jokerRecord = checked[j.name];
            const checkVal = jokerRecord ? jokerRecord[d.name] : false;
            gridItems.push(
                <GridItem key={`${j.name}-${d.name}`}>
                    <Checkbox key={`${j.name}-${d.name}-checkbox`}
                        style={{
                            transform: "scale(3)",
                        }}
                        onClick={(e) => {
                            toggle(j.name, d.name);
                        }}
                        checked={!!checkVal}
                    />
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
