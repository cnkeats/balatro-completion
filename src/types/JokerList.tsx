import Jokers from './Jokers'

const JokerList = Object.values(Jokers).filter(j => j.enabled).sort((a, b) => a.image ?? '' < (b.image ?? '') ? 1 : -1).map(j => {
    return j
})

export default JokerList;