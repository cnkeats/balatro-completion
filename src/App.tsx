import React, { useEffect, useState } from 'react';
import './App.css';
import * as jokers from './assets/jokers'
import { Checkbox, ImageList, ImageListItem } from '@mui/material';
import JokerList from './types/JokerList';
import styled from 'styled-components';
import DeckList from './types/DeckList';


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, auto);
    outline: 0px solid black;
    grid-gap: 0px;
    max-width: 710px;
`

const GridItem = styled.div`
    &:hover {
        outline: 0px solid red;
    }
    display: flex;
    align-items: center;
    justify-content: center;
`

const BoldLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
`;

const ImportExportLabel = styled.label`
    cursor: pointer;
    display: flex;
    color: #069;
    text-decoration: underline;
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
        
        // console.table(checked);
        window.localStorage.setItem('CHECKED', JSON.stringify(checked));
    }
    
    const json = JSON.stringify(checked);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    const download = () => {
        const link = document.createElement('a');
        link.href = href;
        link.download = 'joker-export.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }
    
    const gridItems: JSX.Element[] = [<GridItem key='0' />, <GridItem key='1' />];
  
    DeckList.forEach(d => {
        gridItems.push(<GridItem><BoldLabel>{d.name}</BoldLabel></GridItem>);
    });
    
    const ImportExport = () => {
        return (
            <GridItem key='import-export'>
                <GridItem>
                    <ImportExportLabel onClick={download}>
                        Export
                    </ImportExportLabel>
                </GridItem>
                <GridItem>
                    <ImportExportLabel>
                    </ImportExportLabel>
                </GridItem>
            </GridItem>  
        )
    };
    
    gridItems.push(<ImportExport/>, <GridItem key='3' />);
    DeckList.forEach(d => {
        gridItems.push(<GridItem><img key={d.name} src={d.image}></img></GridItem>);
    });
  
    JokerList.forEach(j => {
        gridItems.push(<GridItem><BoldLabel key={`${j.name}-name`}>{j.name}</BoldLabel></GridItem>);
        gridItems.push(<GridItem><img key={j.name} src={j.image} /></GridItem>);
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
