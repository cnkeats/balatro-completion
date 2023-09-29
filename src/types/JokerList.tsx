import Jokers from './Jokers'

const JokerList = Object.values(Jokers).filter(j => j.enabled).map(j => {
    return j
})

export default JokerList;