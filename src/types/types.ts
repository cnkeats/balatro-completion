
interface JokerType {
    name: string,
    description: string,
    image?: string,
    enabled: boolean | false
}

interface DeckType {
    name: string,
    description: string,
    image?: string,
    enabled: boolean | false
}

export type {
    JokerType,
    DeckType
}