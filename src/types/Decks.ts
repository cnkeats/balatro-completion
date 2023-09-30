import { abandonedDeck, blackDeck, blueDeck, braidedDeck, checkeredDeck, erraticDeck, foilDeck, greenDeck, magicDeck, nebulaDeck, polychromeDeck, redDeck, silverDeck, yellowDeck } from "../assets/decks";
import { DeckType } from "./types";

const AbandonedDeck: DeckType = {
    name: 'Abandoned Deck',
    description: '',
    image: abandonedDeck,
    enabled: true
}
const BlackDeck: DeckType = {
    name: 'Black Deck',
    description: '',
    image: blackDeck,
    enabled: false
}
const BlueDeck: DeckType = {
    name: 'Blue Deck',
    description: '',
    image: blueDeck,
    enabled: false
}
const BraidedDeck: DeckType = {
    name: 'Braided Deck',
    description: '',
    image: braidedDeck,
    enabled: false
}
const CheckeredDeck: DeckType = {
    name: 'Checkered Deck',
    description: '',
    image: checkeredDeck,
    enabled: false
}
const ErraticDeck: DeckType = {
    name: 'Erratic Deck',
    description: '',
    image: erraticDeck,
    enabled: false
}
const FoilDeck: DeckType = {
    name: 'Foil Deck',
    description: '',
    image: foilDeck,
    enabled: false
}
const GreenDeck: DeckType = {
    name: 'Green Deck',
    description: '',
    image: greenDeck,
    enabled: false
}
const MagicDeck: DeckType = {
    name: 'Magic Deck',
    description: '',
    image: magicDeck,
    enabled: false
}
const NebulaDeck: DeckType = {
    name: 'Nebula Deck',
    description: '',
    image: nebulaDeck,
    enabled: false
}
const PolychromeDeck: DeckType = {
    name: 'Polychrome Deck',
    description: '',
    image: polychromeDeck,
    enabled: false
}
const RedDeck: DeckType = {
    name: 'Red Deck',
    description: '',
    image: redDeck,
    enabled: true
}
const SilverDeck: DeckType = {
    name: 'Silver Deck',
    description: '',
    image: silverDeck,
    enabled: false
}
const YellowDeck: DeckType = {
    name: 'Yellow Deck',
    description: '',
    image: yellowDeck,
    enabled: true
}

export default {
    RedDeck,
    YellowDeck,
    AbandonedDeck
}
