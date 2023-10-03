import { ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import './App.css';
import { Button, Checkbox, } from '@mui/material';
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

const BoldLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
`;

const ImportExportLabel = styled.div`
    cursor: pointer;
    display: flex;
    color: #069;
    text-decoration: underline;
    font-weight: bold;
`;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Header = styled.div`
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
            checked[jokerName][deckName] = !checked[jokerName][deckName];
            setChecked({...checked});
        }
        else if (jokerName in checked) {
            checked[jokerName][deckName] = true;
            setChecked({...checked});
        }
        else {
            checked[jokerName] = {}
            checked[jokerName][deckName] = true;
            setChecked({...checked})
        }
        
        window.localStorage.setItem('CHECKED', JSON.stringify(checked));
    }
    
    const download = () => {
        const json = JSON.stringify(checked);
        const blob = new Blob([json], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'joker-export.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }
    
    const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        const files = event.currentTarget.files;
        const file = files?.item(0) as File;
        
        fileReader.readAsText(file, 'utf-8');
        fileReader.onload = (e) => {
            const content = e.target?.result as string;
            const obj = JSON.parse(content);
            setChecked(obj)
        }
    };
    
    const ImportExport = () => {
        return (
            <GridItem key='import-export' style={{display: 'grid'}}>
                <GridItem>
                    <ImportExportLabel onClick={download}>
                        Export
                    </ImportExportLabel>
                </GridItem>
                <GridItem>
                    <ImportExportLabel>
                        Import
                        <VisuallyHiddenInput type="file" onChange={upload} />
                    </ImportExportLabel>
                </GridItem>
            </GridItem>  
        )
    };
    
    const DeckProgress = (deckName: string) => {
        const jokerCount = JokerList.length;
        
        if (Object.keys(checked).length === 0) {
            return (
                <BoldLabel key={`${deckName}-check-count`}>
                    0 / {jokerCount}
                </BoldLabel>
            )
        }
        
        const checkCount = Object.keys(checked).reduce((accumulator, joker) => accumulator + (checked[joker][deckName] ? 1 : 0), 0);
        return (
            <BoldLabel key={`${deckName}-check-count`}>
                {checkCount} / {jokerCount}
            </BoldLabel>
        );
        
    }
    
    const gridItems: JSX.Element[] = [];
    
    // First row
    gridItems.push(<ImportExport key='import-export-item'/>, <GridItem key='1' />);
    
    // Second row
    DeckList.forEach(d => {
        gridItems.push(DeckProgress(d.name));
    })
    
    gridItems.push(<GridItem key='6' />, <GridItem key='5' />);
  
    DeckList.forEach(d => {
        gridItems.push(<GridItem key={`${d.name}-imageItem`}><BoldLabel>{d.name}</BoldLabel></GridItem>);
    });
    
    gridItems.push(<GridItem key='4' />, <GridItem key='3' />);
    DeckList.forEach(d => {
        gridItems.push(<GridItem key={`${d.name}-nameItem`}><img key={d.name} src={d.image}></img></GridItem>);
    });
  
    JokerList.forEach(j => {
        gridItems.push(<GridItem key={`${j.name}-nameItem`}><BoldLabel key={`${j.name}-name`}>{j.name}</BoldLabel></GridItem>);
        gridItems.push(<GridItem key={`${j.name}-imageItem`}><img key={j.name} src={j.image} /></GridItem>);
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
            <Header>
            </Header>
            <Grid>
                {gridItems}
            </Grid>   
        </div>
    );
}

export default App;
