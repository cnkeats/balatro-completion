import { DeckType } from "./types";
import Jokers from './Jokers'

const RedDeck: DeckType = {
    name: 'Red Deck',
    description: '',
    image: Jokers.Joker.image,
    enabled: true
}

const YellowDeck: DeckType = {
    name: 'Yellow Deck',
    description: '',
    image: Jokers.GoldenTicket.image,
    enabled: true
}

const AbandonedDeck: DeckType = {
    name: 'Abandoned Deck',
    description: '',
    image: Jokers.Supernova.image,
    enabled: true
}

export default {
    RedDeck,
    YellowDeck,
    AbandonedDeck
}
