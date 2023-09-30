import Decks from './Decks'

const DeckList = Object.values(Decks).filter(d => d.enabled).map(d => {
    return d
})

export default DeckList;