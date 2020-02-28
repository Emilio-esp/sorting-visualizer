const setAlgorithmReducer = (algorithm = null, action)=>{
    if (action.type === 'SET_ALGORITHM') {
        return action.payload
    }

    return algorithm
}

const stateAlgorithmReducer = (algorithm = false, action)=>{
    if (action.type === 'TOGGLE_ALGORITHM') {
        return action.payload
    }

    return algorithm
}

const algorithmFinishedReducer = (algorithm = false, action)=>{
    if (action.type === 'FINISHED_ALGORITHM') {
        return action.payload
    }

    return algorithm
}

export {
    setAlgorithmReducer,
    stateAlgorithmReducer,
    algorithmFinishedReducer
}